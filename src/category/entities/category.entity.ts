import { CommonEntity } from "src/common/typeorm/common.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Category extends CommonEntity {
    @Column()
    name: string;

    @OneToMany(() => Product, product => product.category)
    product: Product[];
}
