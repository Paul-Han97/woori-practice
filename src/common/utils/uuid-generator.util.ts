import { Injectable } from '@nestjs/common';
import { v5 as uuidv5, v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidGenerator {
  generate(): string;
  generate(value: string): string;

  generate(value?: string): string {
    if(value) return uuidv5(value, process.env.UUID_NAMESPACE);
    return uuidv4();
  }
}
