import { Injectable } from '@nestjs/common';
import { v5 as uuidv5 } from 'uuid';

@Injectable()
export class UuidGenerator {
  constructor() {}

  generate(value: string): string {
    return uuidv5(value, process.env.UUID_NAMESPACE);
  }
}