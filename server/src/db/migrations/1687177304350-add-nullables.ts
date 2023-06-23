import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullables1687177304350 implements MigrationInterface {
  name = "AddNullables1687177304350";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "surname" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "DoB" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "DoB" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "surname" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "name" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
