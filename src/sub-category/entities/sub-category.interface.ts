import { Repository } from "typeorm";
import { SubCategory } from "./sub-category.entity";

export interface ISubCategoryRepository extends Repository<SubCategory> {
    
}