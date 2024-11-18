import { ObjectFormatter } from './object-formatter.util';
import { PasswordManager } from './password-manager.util';
import { ResponseFormatter } from './response-formatter.util';
import { UuidGenerator } from './uuid-generator.util';

export class CommonUtils {
  public readonly objectFormatter = new ObjectFormatter();
  public readonly passwordManager = new PasswordManager();
  public readonly uuidGenerator = new UuidGenerator();
  public readonly responseFormatter = new ResponseFormatter();
}
