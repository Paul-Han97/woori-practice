import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731996762108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userList = await queryRunner.query(`SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com')`)
        await queryRunner.query(`INSERT INTO delivery_address (name, address, rank, "userId") VALUES ('집', 'OO시 OO구 OO로', 0, '${userList[0].id}')`);
        await queryRunner.query(`INSERT INTO delivery_address (name, address, rank, "userId") VALUES ('사무실', 'OO시 OO구 OO로', 1, '${userList[0].id}')`);
        await queryRunner.query(`INSERT INTO delivery_address (name, address, rank, "userId") VALUES ('집', 'OO시 OO구 OO로', 0, '${userList[1].id}')`);
        await queryRunner.query(`INSERT INTO delivery_address (name, address, rank, "userId") VALUES ('사무실', 'OO시 OO구 OO로', 1, '${userList[1].id}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM delivery_address WHERE "userId" IN (SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com'))`)
    }

}
