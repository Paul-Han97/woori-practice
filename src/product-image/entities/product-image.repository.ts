import { CustomRepository } from "src/common/typeorm/custom-decorator";
import { Repository } from "typeorm";
import { ProductImage } from "./product-image.entity";

@CustomRepository(ProductImage)
export class ProductImageRepository extends Repository<ProductImage> {

}