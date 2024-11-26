import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731992682330 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const clothingTop = await queryRunner.query(`SELECT id FROM category WHERE name = '상의'`);
        const clothingBottom = await queryRunner.query(`SELECT id FROM category WHERE name = '하의'`);
        const clothingOuter = await queryRunner.query(`SELECT id FROM category WHERE name = '아우터'`);

        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 100000, 20, '상의_의류1', 5, '상의_의류1_설명', '${clothingTop[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 110000, 21, '상의_의류2', 6, '상의_의류2_설명', '${clothingTop[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 120000, 22, '상의_의류3', 7, '상의_의류3_설명', '${clothingTop[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 130000, 23, '상의_의류4', 8, '상의_의류4_설명', '${clothingTop[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 140000, 24, '상의_의류5', 9, '상의_의류5_설명', '${clothingTop[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 150000, 25, '상의_의류6', 10, '상의_의류6_설명', '${clothingTop[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 160000, 26, '상의_의류7', 11, '상의_의류7_설명', '${clothingTop[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 170000, 27, '상의_의류8', 12, '상의_의류8_설명', '${clothingTop[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 180000, 28, '상의_의류9', 13, '상의_의류9_설명', '${clothingTop[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 190000, 29, '상의_의류10', 14, '상의_의류10_설명', '${clothingTop[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
 
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 200000, 10, '하의_의류1', 1, '하의_의류1_설명', '${clothingBottom[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 210000, 11, '하의_의류2', 2, '하의_의류2_설명', '${clothingBottom[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 220000, 12, '하의_의류3', 3, '하의_의류3_설명', '${clothingBottom[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 230000, 13, '하의_의류4', 4, '하의_의류4_설명', '${clothingBottom[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 240000, 14, '하의_의류5', 5, '하의_의류5_설명', '${clothingBottom[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 250000, 15, '하의_의류6', 6, '하의_의류6_설명', '${clothingBottom[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 260000, 16, '하의_의류7', 7, '하의_의류7_설명', '${clothingBottom[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 270000, 17, '하의_의류8', 8, '하의_의류8_설명', '${clothingBottom[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 280000, 18, '하의_의류9', 9, '하의_의류9_설명', '${clothingBottom[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 290000, 19, '하의_의류10', 100, '하의_의류10_설명', '${clothingBottom[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
 
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 300000, 40, '아우터_의류1', 8, '아우터_의류1_설명', '${clothingOuter[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 310000, 41, '아우터_의류2', 9, '아우터_의류2_설명', '${clothingOuter[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 320000, 42, '아우터_의류3', 10, '아우터_의류3_설명', '${clothingOuter[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 330000, 43, '아우터_의류4', 11, '아우터_의류4_설명', '${clothingOuter[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 340000, 44, '아우터_의류5', 20, '아우터_의류5_설명', '${clothingOuter[0].id}', 'e62d70af-f34b-5c16-9a22-80c0f81b301e'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 350000, 45, '아우터_의류6', 35, '아우터_의류6_설명', '${clothingOuter[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 360000, 46, '아우터_의류7', 37, '아우터_의류7_설명', '${clothingOuter[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 370000, 47, '아우터_의류8', 38, '아우터_의류8_설명', '${clothingOuter[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 380000, 48, '아우터_의류9', 40, '아우터_의류9_설명', '${clothingOuter[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
        await queryRunner.query(`INSERT INTO product (price, quantity, name, view, description, "categoryId", "genderId") SELECT 390000, 49, '아우터_의류10', 1, '아우터_의류10_설명', '${clothingOuter[0].id}', '90870a34-1c11-5881-9844-e8807eee9764'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product WHERE id IN (SELECT A.id FROM product A JOIN category B ON B.id = A."categoryId" WHERE B."name" IN ('상의', '하의', '아우터'))`);
    }

}
