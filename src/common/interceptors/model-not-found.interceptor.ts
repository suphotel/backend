import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from '../../providers/prisma';
import { Reflector } from '@nestjs/core';
import { ModelNotFoundParams } from '../decorators/model-not-found.decorator';

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

    const param = this.reflector.get<ModelNotFoundParams[]>(
      'modelNotFoundParams',
      context.getHandler(),
    );

    if (!param) {
      throw new Error('ModelNotFoundInterceptor: param is not defined');
    }

    for (const p of param) {
      const { model, field } = p;

      const entity = await this.prismaService[model].findUnique({
        where: {
          id: parseInt(params[field]),
        },
      });

      if (!entity) {
        throw new NotFoundException(`${model} not found`);
      }
    }

    return next.handle();
  }
}
