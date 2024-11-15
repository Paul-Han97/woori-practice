import { CustomRepository } from "src/common/typeorm/custom-decorator";
import { Repository } from "typeorm";
import { Category } from "./category.entity";

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {

}