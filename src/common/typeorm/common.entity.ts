import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

const ADMIN = 'ADMIN';

export class CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: ADMIN,
        nullable: true
    })
    createdUser: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column({
        default: ADMIN,
        nullable: true
    })
    updatedUser: string;

    @UpdateDateColumn()
    updatedDate: Date;
}