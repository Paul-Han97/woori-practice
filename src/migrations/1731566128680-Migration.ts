import { GENDER_TYPE } from "src/common/constants/common-constants";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

export class Migration1731566128680 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const maleId = uuidv5(GENDER_TYPE.MALE, process.env.UUID_NAMESPACE);
        const femaleId = uuidv5(GENDER_TYPE.FEMALE, process.env.UUID_NAMESPACE);

        await queryRunner.query(`INSERT INTO gender (id, type) VALUES ('${maleId}', '${GENDER_TYPE.MALE}')`);
        await queryRunner.query(`INSERT INTO gender (id, type) VALUES ('${femaleId}', '${GENDER_TYPE.FEMALE}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM gender`);
    }

}
