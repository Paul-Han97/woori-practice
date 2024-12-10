import { ResponseData } from './common/type/response.type';
import { LoginDto } from './dto/login.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { VerificationDto } from './dto/verification.dto';

export interface IAppService {
  sendEmail(sendEmailDto: SendEmailDto): Promise<ResponseData>;
  verification(verificationDto: VerificationDto): Promise<ResponseData>;
  login(loginDto: LoginDto): Promise<ResponseData>;
}
