import { v5 as uuidv5 } from 'uuid';
import { GENDER_TYPE } from '../constants/common-constants';

export class UuidTransformer {
  constructor() {}

  toUuid(value: string): string {
    return uuidv5(value, process.env.UUID_NAMESPACE);
  }
}