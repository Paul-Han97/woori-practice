import { CommonEntity } from "src/common/typeorm/common-entity";
import { Column, Entity } from "typeorm";

@Entity()
export class Category extends CommonEntity {
    @Column()
    name: string;
}
