import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Logger,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AppService } from './app.service';
import {
  ERROR_MESSAGE,
  SUCCESS_MESSAGE,
} from './common/constants/common-constants';
import { LoginDto } from './dto/login.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { VerificationDto } from './dto/verification.dto';
import { IAppService } from './app.service.interface';

@Controller()
export class AppController {
  public static logger = new Logger(AppController.name);

  constructor(
    @Inject(AppService)
    private readonly appService: IAppService,
  ) {}

  @ApiOperation({
    summary: '이메일을 전송',
    description: `
    - reciver에게 10000 ~ 99999 사이의 인증코드를 전송한다.
    - 인증코드는 reciver를 key 값으로 메모리에 적재한다.`,
  })
  @ApiOkResponse({
    description: SUCCESS_MESSAGE.S003,
    example: {},
  })
  @Post('send-email')
  @HttpCode(200)
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    AppController.logger.log('AppController.sendEmail() 시작');
    const result = await this.appService.sendEmail(sendEmailDto);
    AppController.logger.log('AppController.sendEmail() 종료');
    return result;
  }

  @ApiOperation({
    summary: '인증코드를 확인',
    description: `
    - 이메일과 인증코드를 받아서 메모리에 적재된 인증코드와 비교하여 유효한지 확인한다.
    - 해당 이메일로 적재된 인증코드가 존재하지 않으면 BadRequest를 응답한다.
    - 인증코드를 비교하여 유효하지 않으면 NotFound를 응답한다.`,
  })
  @ApiOkResponse({
    description: SUCCESS_MESSAGE.S003,
  })
  @ApiBadRequestResponse({
    description: ERROR_MESSAGE.E002,
  })
  @ApiNotFoundResponse({
    description: ERROR_MESSAGE.E005,
  })
  @Post('verification')
  @HttpCode(200)
  async verification(@Body() verificationDto: VerificationDto) {
    AppController.logger.log('AppController.verification() 시작');
    const result = await this.appService.verification(verificationDto);
    AppController.logger.log('AppController.verification() 종료');
    return result;
  }

  @ApiOperation({
    summary: '로그인',
    description: `
    - DB에 user가 존재하는지 여부를 확인한다.
    - DB의 user와 password를 비교하여 일치하는지 확인한다.
    - user가 존재하지 않거나 password가 불일치하면 BadRequest를 응답한다.
    - jwt token을 생성하여 응답한다.`,
  })
  @ApiCreatedResponse({
    example: {
      body: {
        status: 'Created',
        message: '요청이 성공적으로 완료 되었습니다.',
        data: {
          access:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE3NDJjNTMwLTY0YTMtNDI0Ny04NDc5LTA5MGE4MWRiZjgxNCIsImVtYWlsIjoid3RnLnBhdWxoYW5AZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MzE5MTIwNzEsImV4cCI6MTczMTkxNTY3MX0.9lyiifWys5WjuI4d2y5QjWot2__S6QbwCGzV8l23l0w',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    example: {
      body: {
        status: 'Bad Request',
        message: 'Bad Request Exception',
        data: null,
      },
    },
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {
    AppController.logger.log('AppController.login() 시작');
    const result = await this.appService.login(loginDto);
    AppController.logger.log('AppController.login() 종료');
    return result;
  }
}
