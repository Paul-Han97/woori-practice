import { ORDER_STATE_TYPE } from "src/common/constants/common-constants";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

export class Migration1732078504824 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const PROCESSING = uuidv5(ORDER_STATE_TYPE.PROCESSING, process.env.UUID_NAMESPACE);
        const IN_DELIVERY = uuidv5(ORDER_STATE_TYPE.IN_DELIVERY, process.env.UUID_NAMESPACE);
        const COMPLETE = uuidv5(ORDER_STATE_TYPE.COMPLETE, process.env.UUID_NAMESPACE);

        const userList = await queryRunner.query(`SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com')`);

        const deliveryAddressList1 = await queryRunner.query(`SELECT id FROM "delivery_address" WHERE "userId" = '${userList[0].id}'`);
        const deliveryAddressList2 = await queryRunner.query(`SELECT id FROM "delivery_address" WHERE "userId" = '${userList[1].id}'`);

        await queryRunner.query(`INSERT INTO "order" ("recipient", "recipientPhone", "orderStateId", "userId", "deliveryAddressId", "orderDate") VALUES ('테스트 수취인', '010-0000-0000', '${PROCESSING}', '${userList[0].id}', '${deliveryAddressList1[0].id}', NOW())`)
        await queryRunner.query(`INSERT INTO "order" ("recipient", "recipientPhone", "orderStateId", "userId", "deliveryAddressId", "orderDate") VALUES ('테스트 수취인', '010-0000-0000', '${COMPLETE}', '${userList[0].id}', '${deliveryAddressList1[1].id}', NOW() - INTERVAL '1' DAY)`)
        await queryRunner.query(`INSERT INTO "order" ("recipient", "recipientPhone", "orderStateId", "userId", "deliveryAddressId", "orderDate") VALUES ('테스트 수취인', '010-0000-0000', '${IN_DELIVERY}', '${userList[1].id}', '${deliveryAddressList2[0].id}', NOW())`)
        await queryRunner.query(`INSERT INTO "order" ("recipient", "recipientPhone", "orderStateId", "userId", "deliveryAddressId", "orderDate") VALUES ('테스트 수취인', '010-0000-0000', '${COMPLETE}', '${userList[1].id}', '${deliveryAddressList2[1].id}', NOW() - INTERVAL '1' DAY)`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "order" WHERE "userId" IN (SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com'))`)
    }

}
