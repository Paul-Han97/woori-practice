import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Query } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-user.dto';
import { ERROR_MESSAGE } from 'src/common/constants/common-constants';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '1명의 유저 생성',
    description: `
    - email: email 형식을 띄고 있어야 한다.
    - password: 아래의 조건을 충족해야 한다.
      - 최소 길이: 8
      - 소문자: 1개 이상
      - 대문자: 1개 이상
      - 숫자: 1개 이상
      - 특수문자: 1개 이상
    - gender: MALE 또는 FEMALE 로 전달해야 한다.
    `,
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: `회원가입 성공`,
  })
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '유저 조회',
    description: `
    - query string으로 user를 조회한다.
    `,
  })
  @ApiQuery({
    name: 'email',
    description: 'email 형식으로 유저를 조회 한다.',
  })
  @ApiOkResponse({
    description: `유저를 성공적으로 조회 되었다.`,
  })
  async find(@Query() getUserDto: GetUserDto) {
    return await this.userService.findByEmail(getUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
