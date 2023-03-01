import { SetMetadata } from '@nestjs/common';

export const ModelNotFound = (args: Array<string>) =>
  SetMetadata('modelNotFoundParams', args);
