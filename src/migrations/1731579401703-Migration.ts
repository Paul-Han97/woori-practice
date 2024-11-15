import { CLOTHING_SIZE_TYPE } from "src/common/constants/common-constants";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

export class Migration1731579401703 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const XS = uuidv5(CLOTHING_SIZE_TYPE.XS, process.env.UUID_NAMESPACE);
        const S = uuidv5(CLOTHING_SIZE_TYPE.S, process.env.UUID_NAMESPACE);
        const M = uuidv5(CLOTHING_SIZE_TYPE.M, process.env.UUID_NAMESPACE);
        const L = uuidv5(CLOTHING_SIZE_TYPE.L, process.env.UUID_NAMESPACE);
        const XL = uuidv5(CLOTHING_SIZE_TYPE.XL, process.env.UUID_NAMESPACE);
        const XXL = uuidv5(CLOTHING_SIZE_TYPE.XXL, process.env.UUID_NAMESPACE);

        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${XS}', '${CLOTHING_SIZE_TYPE.XS}')`);
        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${S}', '${CLOTHING_SIZE_TYPE.S}')`);
        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${M}', '${CLOTHING_SIZE_TYPE.M}')`);
        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${L}', '${CLOTHING_SIZE_TYPE.L}')`);
        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${XL}', '${CLOTHING_SIZE_TYPE.XL}')`);
        await queryRunner.query(`INSERT INTO clothing_size (id, type) VALUES ('${XXL}', '${CLOTHING_SIZE_TYPE.XXL}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM clothing_size`);
    }

}
