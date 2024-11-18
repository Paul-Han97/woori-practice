import { CustomRepository } from "src/common/typeorm/custom.decorator";
import { Repository } from "typeorm";
import { Image } from "./image.entity";

@CustomRepository(Image)
export class ImageRepository extends Repository<Image> {

}