import { Repository } from "typeorm";
import { Category } from "./Category.entity";

export interface ICategoryRepository extends Repository<Category> {
    
}