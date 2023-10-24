import { MigrationInterface, QueryRunner } from "typeorm";

export class EloField1689014482871 implements MigrationInterface {
  name = "EloField1689014482871";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "elo" integer NOT NULL DEFAULT '1000'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "elo"`);
  }
}
