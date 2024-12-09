import { Injectable } from '@nestjs/common';
import { ObjectFormatter } from './object-formatter.util';
import { PasswordManager } from './password-manager.util';
import { ResponseFormatter } from './response-formatter.util';
import { UuidGenerator } from './uuid-generator.util';

@Injectable()
export class UtilService {
  constructor(
    public readonly objectFormatter: ObjectFormatter,
    public readonly passwordManager: PasswordManager,
    public readonly uuidGenerator: UuidGenerator,
    public readonly responseFormatter: ResponseFormatter,
  ) {}
}
