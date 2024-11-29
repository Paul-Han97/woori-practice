import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import { SendEmailDto } from './dto/send-email.dto';
import { UtilService } from './common/utils/util.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { VerificationDto } from './dto/verification.dto';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from './common/constants/common-constants';
import { ResponseData } from './common/type/response.type';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from './user/entities/user.repository';
import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from './user/entities/user.interface';

@Injectable()
export class AppService {
  public static logger = new Logger(AppService.name);

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly utilService: UtilService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async sendEmail(sendEmailDto: SendEmailDto) {
    AppService.logger.log('AppService.sendEmail() 시작');

    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });

    const verificationCode = Math.floor(
      Math.random() * (99999 - 10000) + 10000,
    );

    const template = `<div style="margin: 0 auto; width: 200px; height: 300px;">
        <span style="display: block; text-align:center;">Woori Service</span>
        <span style="display: block; text-align:center;">인증코드</span>
        <span style="display: block; text-align:center; margin-top: 10px; font-size: larger; font-weight: bold; letter-spacing: 5px;">${verificationCode}</span>
    </div>`;

    const mailOptions: MailOptions = {
      from: `Woori <${this.configService.get<string>('EMAIL_USERNAME')}>`,
      to: sendEmailDto.reciver,
      subject: `Woori Service 인증코드`,
      html: template,
    };

    const result = await transporter.sendMail(mailOptions);

    if (!result) {
      throw new InternalServerErrorException();
    }

    await this.cacheManager.del(sendEmailDto.reciver);

    await this.cacheManager.set(
      sendEmailDto.reciver,
      verificationCode.toString(),
    );

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null,
    };
    
    AppService.logger.log(
      'AppService.sendEmail() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );

    return result;
  }

  async verification(verificationDto: VerificationDto) {
    AppService.logger.log('AppService.verification() 시작');
    const memoryCode = await this.cacheManager.get<string>(
      verificationDto.email,
    );

    if (!memoryCode) {
      throw new BadRequestException(ERROR_MESSAGE.E002);
    }

    if (memoryCode !== verificationDto.code) {
      throw new NotFoundException(ERROR_MESSAGE.E005);
    }

    await this.cacheManager.del(verificationDto.email);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: null,
    };

    AppService.logger.log(
      'AppService.verification() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }

  async login(loginDto: LoginDto) {
    AppService.logger.log('AppService.login() 시작');

    const user = await this.userRepository.findOneBy({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException(ERROR_MESSAGE.E006);
    }

    const isMatch = await this.utilService.passwordManager.compare(
      loginDto.password,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException(ERROR_MESSAGE.E006);
    }

    AppService.logger.debug(`userId: ${user.id}`);

    const payload = {
      id: user.id,
      email: user.email,
      role: 'USER',
    };

    const token = this.jwtService.sign(payload);

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.S003,
      data: {
        access: token,
        userId: user.id,
      },
    };

    AppService.logger.log(
      'AppService.login() 종료',
      `반환 값:\n${this.utilService.objectFormatter.format(resData)}`,
    );
    return resData;
  }
}
