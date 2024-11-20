import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class Migration1731997343746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('Elice123!', 10);
    await queryRunner.query(`INSERT INTO admin (username, password) VALUES ('admin', '${password}')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM admin WHERE username = 'admin'`);
  }
}
