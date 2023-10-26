import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1698323159177 implements MigrationInterface {
    name = 'Migrations1698323159177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`access_token\` \`access_token\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`bio\` \`bio\` varchar(200) NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`birthday\` \`birthday\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`photo\` \`photo\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`photo\` \`photo\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`birthday\` \`birthday\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`profile\` CHANGE \`bio\` \`bio\` varchar(200) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`access_token\` \`access_token\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`social\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
    }

}
