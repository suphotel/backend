import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ModelNotFoundInterceptor implements NestInterceptor {
  constructor(
    private reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const { params } = context.switchToHttp().getRequest();

    const param = this.reflector.get<string[]>(
      'modelNotFoundParams',
      context.getHandler(),
    );

    const model = param[0];
    const paramId = param[1];

    if (!model || !paramId) {
      throw new Error(
        'ModelNotFoundInterceptor: model or paramId is not defined',
      );
    }

    const entity = await this.prismaService[model].findUnique({
      where: {
        id: parseInt(params[paramId]),
      },
    });

    if (!entity) {
      throw new NotFoundException();
    }

    return next.handle();
  }
}
