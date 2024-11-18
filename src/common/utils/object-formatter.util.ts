import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjectFormatter {
  constructor() {}

  format(data: any) {
    return JSON.stringify(data, null, 2);
  }
}
