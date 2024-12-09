import { Repository } from "typeorm";
import { Category } from "./category.entity";

export interface ICategoryRepository extends Repository<Category> {
    
}