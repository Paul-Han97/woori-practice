import { SetMetadata } from '@nestjs/common';
import { CUSTOM_REPOSITORY } from 'src/common/constants/common-constants';

export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(CUSTOM_REPOSITORY, entity);
}
