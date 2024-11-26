import { ORDER_STATE_TYPE } from "src/common/constants/common-constants";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

export class Migration1732078504824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const PROCESSING = uuidv5(ORDER_STATE_TYPE.PROCESSING, process.env.UUID_NAMESPACE);
        const IN_DELIVERY = uuidv5(ORDER_STATE_TYPE.IN_DELIVERY, process.env.UUID_NAMESPACE);
        const COMPLETE = uuidv5(ORDER_STATE_TYPE.COMPLETE, process.env.UUID_NAMESPACE);

        const userList = await queryRunner.query(`SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com')`)

        await queryRunner.query(`INSERT INTO "order" ("orderStateId", "userId", "orderDate") VALUES ('${PROCESSING}', '${userList[0].id}', NOW())`)
        await queryRunner.query(`INSERT INTO "order" ("orderStateId", "userId", "orderDate") VALUES ('${COMPLETE}', '${userList[0].id}', NOW() - INTERVAL '1' DAY)`)
        await queryRunner.query(`INSERT INTO "order" ("orderStateId", "userId", "orderDate") VALUES ('${IN_DELIVERY}', '${userList[1].id}', NOW())`)
        await queryRunner.query(`INSERT INTO "order" ("orderStateId", "userId", "orderDate") VALUES ('${COMPLETE}', '${userList[1].id}', NOW() - INTERVAL '1' DAY)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "order" WHERE "userId" IN (SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com'))`)
    }

}
