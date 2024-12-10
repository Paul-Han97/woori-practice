import { ResponseData } from 'src/common/type/response.type';
import { User } from 'src/user/entities/user.entity';
import { CreateImageDto, UploadImageDto } from './dto/create-image.dto';

export interface IImageService {
  create(
    createImageDto: CreateImageDto,
    uploadImageDto: UploadImageDto,
    user: User,
  ): Promise<ResponseData>;
}
