import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseRoles1687184231607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO "roles" ("role") VALUES('user')`);
    await queryRunner.query(`INSERT INTO "roles" ("role") VALUES('admin')`);
    await queryRunner.query(`INSERT INTO "roles" ("role") VALUES('SuperAdmin')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "roles" WHERE "role" = 'user'`);
    await queryRunner.query(`DELETE FROM "roles" WHERE "role" = 'admin'`);
    await queryRunner.query(`DELETE FROM "roles" WHERE "role" = 'SuperAdmin'`);
  }
}
