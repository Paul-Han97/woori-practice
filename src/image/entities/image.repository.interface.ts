import { Repository } from "typeorm";
import { Image } from "./image.entity";


export interface IImageRepository extends Repository<Image> {
    
}