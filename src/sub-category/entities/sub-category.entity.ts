import { Category } from "src/category/entities/category.entity";
import { CommonEntity } from "src/common/typeorm/common-entity";
import { Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class SubCategory extends CommonEntity {
    @ManyToOne(() => Category)
    @JoinColumn({ referencedColumnName: 'id' })
    category: Category;
}
