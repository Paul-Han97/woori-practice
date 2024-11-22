import { Exclude } from "class-transformer";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const SYSTEM = 'SYSTEM';

export class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: SYSTEM,
        nullable: true
    })
    createdUser: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column({
        default: SYSTEM,
        nullable: true
    })
    updatedUser: string;

    @UpdateDateColumn()
    updatedDate: Date;

    toJSON() {
        delete this.createdUser;
        delete this.createdDate;
        delete this.updatedUser;
        delete this.updatedDate;
        return this;
    }
}