import { Global, Module } from '@nestjs/common';
import { UtilService } from './util.service';
import { ObjectFormatter } from './object-formatter.util';
import { PasswordManager } from './password-manager.util';
import { ResponseFormatter } from './response-formatter.util';
import { UuidGenerator } from './uuid-generator.util';

@Global()
@Module({
  providers: [UtilService, ObjectFormatter, PasswordManager, ResponseFormatter, UuidGenerator],
  exports: [UtilService],
})
export class UtilModule {}
