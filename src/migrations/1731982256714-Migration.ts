import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731982256714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO category (name) VALUES ('상의')`);
        await queryRunner.query(`INSERT INTO category (name) VALUES ('하의')`);
        await queryRunner.query(`INSERT INTO category (name) VALUES ('아우터')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM category WHERE name = '상의'`);
        await queryRunner.query(`DELETE FROM category WHERE name = '하의'`);
        await queryRunner.query(`DELETE FROM category WHERE name = '아우터'`);
    }

}
