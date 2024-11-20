import { Repository } from "typeorm";
import { ProductImage } from "./product-image.entity";

export interface IProductImageRepository extends Repository<ProductImage> {
    
}