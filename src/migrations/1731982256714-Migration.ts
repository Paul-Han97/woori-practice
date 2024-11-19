import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731982256714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`INSERT INTO category (name) VALUES ('상의')`);
        queryRunner.query(`INSERT INTO category (name) VALUES ('하의')`);
        queryRunner.query(`INSERT INTO category (name) VALUES ('아우터')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DELETE FROM category WHERE name = '상의'`);
        queryRunner.query(`DELETE FROM category WHERE name = '하의'`);
        queryRunner.query(`DELETE FROM category WHERE name = '아우터'`);
    }

}
