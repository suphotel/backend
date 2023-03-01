import { HttpStatus, HttpException } from '@nestjs/common';

export class RelationException extends HttpException {
  constructor(message: string) {
    super(message ? message : 'Relation not found', HttpStatus.NOT_FOUND);
  }
}
