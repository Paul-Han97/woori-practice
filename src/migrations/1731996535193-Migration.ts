import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class Migration1731996535193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = await bcrypt.hash('Elice123!', 10);
        await queryRunner.query(`INSERT INTO "user" (email, password, name, "genderId") VALUES ('male@elice.com', '${password}', 'male', 'e62d70af-f34b-5c16-9a22-80c0f81b301e')`);
        await queryRunner.query(`INSERT INTO "user" (email, password, name, "genderId") VALUES ('female@elice.com', '${password}', 'female', '90870a34-1c11-5881-9844-e8807eee9764')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com')`);
    }
}
