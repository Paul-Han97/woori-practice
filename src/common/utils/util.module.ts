import { Global, Module } from '@nestjs/common';
import { UuidGenerator } from './uuid-generator.util';
import { PasswordManager } from './password-manager.util';
import { ObjectFormatter } from './object-formatter.util';

@Global()
@Module({
  providers: [UuidGenerator, PasswordManager, ObjectFormatter],
  exports: [UuidGenerator, PasswordManager, ObjectFormatter],
})
export class UtilModule {}
