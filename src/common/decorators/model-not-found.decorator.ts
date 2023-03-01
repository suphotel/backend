import { SetMetadata } from '@nestjs/common';

export type ModelNotFoundParams = {
  model: string;
  field: string;
};

export const ModelNotFound = (args: ModelNotFoundParams[]) =>
  SetMetadata('modelNotFoundParams', args);
