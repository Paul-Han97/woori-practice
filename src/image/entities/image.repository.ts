import { CustomRepository } from "src/common/typeorm/custom.decorator";
import { Repository } from "typeorm";
import { Image } from "./image.entity";
import { IImageRepository } from "./image.repository.interface";

@CustomRepository(Image)
export class ImageRepository extends Repository<Image> implements IImageRepository {

}