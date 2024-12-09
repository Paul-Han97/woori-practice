import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty()
  @IsUUID()
  productId: string;
}

export class CreateImageFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: any;
}

export class UploadImageDto {
  filename: string;
  url: string;
}
