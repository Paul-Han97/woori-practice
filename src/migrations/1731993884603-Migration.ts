import { CLOTHING_SIZE_TYPE } from "src/common/constants/common-constants";
import { Product } from "src/product/entities/product.entity";
import { MigrationInterface, QueryRunner } from "typeorm";
import { v5 as uuidv5 } from 'uuid';

export class Migration1731993884603 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const clothingSizeIdList = [];

        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.XS, process.env.UUID_NAMESPACE));
        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.S, process.env.UUID_NAMESPACE));
        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.M, process.env.UUID_NAMESPACE));
        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.L, process.env.UUID_NAMESPACE));
        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.XL, process.env.UUID_NAMESPACE));
        clothingSizeIdList.push(uuidv5(CLOTHING_SIZE_TYPE.XXL, process.env.UUID_NAMESPACE));

        const productList: Product[] = await queryRunner.query(`SELECT A.id FROM product A JOIN category B ON B.id = A."categoryId" WHERE B."name" IN ('상의', '하의', '아우터')`);

        for(let i = 0; i < productList.length; i++) {
            for(let j = 0; j < clothingSizeIdList.length; j++) {
                await queryRunner.query(`INSERT INTO product_clothing_size ("clothingSizeId", "productId") VALUES ('${clothingSizeIdList[j]}', '${productList[i].id}')`);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM product_clothing_size WHERE "productId" IN (SELECT A.id FROM product A JOIN category B ON B.id = A."categoryId" WHERE B."name" IN ('상의', '하의', '아우터'))`);
    }

}
