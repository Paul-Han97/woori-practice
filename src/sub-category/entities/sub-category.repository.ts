import { CustomRepository } from "src/common/typeorm/custom-decorator";
import { Repository } from "typeorm";
import { SubCategory } from "./sub-category.entity";

@CustomRepository(SubCategory)
export class SubCategoryRepository extends Repository<SubCategory> {

}