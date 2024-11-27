import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1732078941281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const userList = await queryRunner.query(`SELECT id FROM "user" WHERE email IN ('male@elice.com', 'female@elice.com')`)

        const productList1 = await queryRunner.query(`SELECT id FROM "product" WHERE "name" IN ('상의_의류1', '하의_의류2')`);
        const productList2 = await queryRunner.query(`SELECT id FROM "product" WHERE "name" IN ('상의_의류3', '하의_의류4')`);
        const productList3 = await queryRunner.query(`SELECT id FROM "product" WHERE "name" IN ('상의_의류5', '하의_의류6')`);
        const productList4 = await queryRunner.query(`SELECT id FROM "product" WHERE "name" IN ('상의_의류7', '하의_의류8')`);

        const orderList1 = await queryRunner.query(`SELECT id FROM "order" WHERE "userId" = '${userList[0].id}'`);
        const orderList2 = await queryRunner.query(`SELECT id FROM "order" WHERE "userId" = '${userList[1].id}'`);

        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (1, '${orderList1[0].id}', '${productList1[0].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (2, '${orderList1[0].id}', '${productList1[1].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (1, '${orderList1[1].id}', '${productList2[0].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (3, '${orderList1[1].id}', '${productList2[1].id}')`);

        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (1, '${orderList2[0].id}', '${productList3[0].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (2, '${orderList2[0].id}', '${productList3[1].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (1, '${orderList2[1].id}', '${productList4[0].id}')`);
        await queryRunner.query(`INSERT INTO "order_product" (count, "orderId", "productId") VALUES (4, '${orderList2[1].id}', '${productList4[1].id}')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "order_product" WHERE "orderId" IN (SELECT B.id FROM "user" A JOIN "order" B ON B."userId" = A.id WHERE email IN ('male@elice.com', 'female@elice.com'))`)
    }

}
