import { S3Client } from '@aws-sdk/client-s3';
import { CreateImageDto, UploadImageDto } from 'src/image/dto/create-image.dto';

export interface IAwsService {
  imageUpload(createImageDto: CreateImageDto): Promise<UploadImageDto>;
  getImage(filename: string): Promise<string>;
}
