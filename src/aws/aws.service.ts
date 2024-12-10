import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { UtilService } from 'src/common/utils/util.service';
import { CreateImageDto, UploadImageDto } from 'src/image/dto/create-image.dto';
import { IAwsService } from './aws.service.interface';

@Injectable()
export class AwsService implements IAwsService {
  public static readonly logger = new Logger(AwsService.name);

  private s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly utilService: UtilService,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_S3_ACCESS'),
        secretAccessKey: this.configService.get<string>('AWS_S3_SECRET'),
      },
    });

    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
    this.region = this.configService.get<string>('AWS_REGION');
  }

  async imageUpload(createImageDto: CreateImageDto): Promise<UploadImageDto> {
    AwsService.logger.log('AwsService.imageUpload() 시작');

    const PRIMARY_MAX_SIZE = 200;

    // fileName: string, file: Express.Multer.File, ext: string
    const uuid = this.utilService.uuidGenerator.generate();
    const filename = `${createImageDto.productId}/${uuid}`;
    const ext = this.getFileExt(createImageDto.file);

    const imageSharp = sharp(createImageDto.file.buffer);
    const metadata = await imageSharp.metadata();
    const width = metadata.width;
    const height = metadata.height;

    console.log(width, height);

    const buffer = await imageSharp
      .resize({
        width: width > PRIMARY_MAX_SIZE ? PRIMARY_MAX_SIZE : width,
        height: height > PRIMARY_MAX_SIZE ? PRIMARY_MAX_SIZE : height,
      })
      .toBuffer();

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
      Body: buffer,
      ContentType: `image/${ext}`,
    });

    const reuslt = await this.s3Client.send(command);
    AwsService.logger.debug(
      `result:`,
      this.utilService.objectFormatter.format(reuslt),
    );

    const data: UploadImageDto = {
      filename: filename,
      url: `https://s3.${this.region}.amazonaws.com/${this.bucketName}/${filename}}`,
    };

    AwsService.logger.log('AwsService.imageUpload() 종료');
    return data;
  }

  async getImage(filename: string) {
    AwsService.logger.log('AwsService.getImage() 시작');
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: filename,
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });

    AwsService.logger.log('AwsService.getImage() 종료');
    return url;
  }

  private getFileExt(file: Express.Multer.File): string {
    const filename = file.originalname;
    const index = filename.lastIndexOf('.');
    return filename.slice(index + 1);
  }
}
