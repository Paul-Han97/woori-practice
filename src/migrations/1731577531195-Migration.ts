import { ORDER_STATE_TYPE } from "src/common/constants/common-constants";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid'

export class Migration1731577531195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const PROCESSING = uuidv5(ORDER_STATE_TYPE.PROCESSING, process.env.UUID_NAMESPACE);
        const IN_DELIVERY = uuidv5(ORDER_STATE_TYPE.IN_DELIVERY, process.env.UUID_NAMESPACE);
        const COMPLETE = uuidv5(ORDER_STATE_TYPE.COMPLETE, process.env.UUID_NAMESPACE);

        await queryRunner.query(`INSERT INTO order_state (id, type) VALUES ('${PROCESSING}', '${ORDER_STATE_TYPE.PROCESSING}')`);
        await queryRunner.query(`INSERT INTO order_state (id, type) VALUES ('${IN_DELIVERY}', '${ORDER_STATE_TYPE.IN_DELIVERY}')`);
        await queryRunner.query(`INSERT INTO order_state (id, type) VALUES ('${COMPLETE}', '${ORDER_STATE_TYPE.COMPLETE}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM order_state`);
    }

}
