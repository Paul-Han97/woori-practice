import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1731278722779 implements MigrationInterface {
    name = 'Migration1731278722779'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "gender" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying(6) NOT NULL, CONSTRAINT "PK_98a711129bc073e6312d08364e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "genderId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clothing_size" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying(3) NOT NULL, CONSTRAINT "PK_44fff2013dfebb907e06e266a5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "delivery_address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "rank" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_00581098daef1f881bb3d17a0cd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "url" character varying NOT NULL, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_state" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "type" character varying(11) NOT NULL, CONSTRAINT "PK_88c450fe640950274892dbda5e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "orderDate" TIMESTAMP NOT NULL, "orderStateId" uuid, "userId" uuid, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "price" integer NOT NULL, "quantity" integer NOT NULL, "name" character varying NOT NULL, "view" integer NOT NULL, "subCategoryId" uuid, "genderId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid, "productId" uuid, CONSTRAINT "PK_539ede39e518562dfdadfddb492" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_clothing_size" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "clothingSizeId" uuid, "productId" uuid, CONSTRAINT "PK_dfb6b22f6841dbd901cd8d6427b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_image" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdUser" character varying DEFAULT 'ADMIN', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedUser" character varying DEFAULT 'ADMIN', "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "rank" integer NOT NULL, "productId" uuid, "imageId" uuid, CONSTRAINT "PK_99d98a80f57857d51b5f63c8240" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_6273b1aa12d5d17f8e1284200be" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "delivery_address" ADD CONSTRAINT "FK_ca525ca0026c745ead794e7d301" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_312e84147a507a76ea2aed85621" FOREIGN KEY ("orderStateId") REFERENCES "order_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_463d24f6d4905c488bd509164e6" FOREIGN KEY ("subCategoryId") REFERENCES "sub_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_941bbc83bcfd16622efb012c119" FOREIGN KEY ("genderId") REFERENCES "gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_073c85ed133e05241040bd70f02" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_clothing_size" ADD CONSTRAINT "FK_c95f5fc5f099d5fc974116515bc" FOREIGN KEY ("clothingSizeId") REFERENCES "clothing_size"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_clothing_size" ADD CONSTRAINT "FK_3d2f10ebd4c90e9c23da48c796c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_image" ADD CONSTRAINT "FK_0f1034e692982516dc32f35e7f6" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_0f1034e692982516dc32f35e7f6"`);
        await queryRunner.query(`ALTER TABLE "product_image" DROP CONSTRAINT "FK_40ca0cd115ef1ff35351bed8da2"`);
        await queryRunner.query(`ALTER TABLE "product_clothing_size" DROP CONSTRAINT "FK_3d2f10ebd4c90e9c23da48c796c"`);
        await queryRunner.query(`ALTER TABLE "product_clothing_size" DROP CONSTRAINT "FK_c95f5fc5f099d5fc974116515bc"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_073c85ed133e05241040bd70f02"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_941bbc83bcfd16622efb012c119"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_463d24f6d4905c488bd509164e6"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_312e84147a507a76ea2aed85621"`);
        await queryRunner.query(`ALTER TABLE "delivery_address" DROP CONSTRAINT "FK_ca525ca0026c745ead794e7d301"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_6273b1aa12d5d17f8e1284200be"`);
        await queryRunner.query(`DROP TABLE "product_image"`);
        await queryRunner.query(`DROP TABLE "product_clothing_size"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_state"`);
        await queryRunner.query(`DROP TABLE "image"`);
        await queryRunner.query(`DROP TABLE "delivery_address"`);
        await queryRunner.query(`DROP TABLE "clothing_size"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "gender"`);
    }

}
