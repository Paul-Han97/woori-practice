import {
  Body,
  Controller,
  Logger,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { AwsService } from 'src/aws/aws.service';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './image.service';
import { Auth } from 'src/common/guards/auth.decotrator';

@Controller('images')
export class ImageController {
  public static readonly logger = new Logger(ImageController.name);

  constructor(
    private readonly imageService: ImageService,
    private readonly awsService: AwsService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @Auth()
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadAndCreate(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImageDto: CreateImageDto,
    @Request() req: any,
  ) {
    ImageController.logger.log('ImageController.uploadAndCreate() 시작');

    createImageDto.file = file;
    const uploadImageDto = await this.awsService.imageUpload(createImageDto);
    
    const result = await this.imageService.create(createImageDto, uploadImageDto, req.user);

    ImageController.logger.log('ImageController.uploadAndCreate() 종료');
    return result;
  }
}
