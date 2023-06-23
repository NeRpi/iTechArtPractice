import { MigrationInterface, QueryRunner } from "typeorm";
import {BaseRoles1687184231607} from "../consts/roles/1687184231607-base-roles.js";

export class RoleNameEnum1687511505514 implements MigrationInterface {
    name = 'RoleNameEnum1687511505514'
    baseRoles = new BaseRoles1687184231607();

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query('TRUNCATE "users"')
        await queryRunner.query('TRUNCATE "roles"')
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "role"`);
        await queryRunner.query(`CREATE TYPE "public"."roles_role_enum" AS ENUM('user', 'admin', 'SuperAdmin')`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "role" "public"."roles_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await this.baseRoles.up(queryRunner);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_368e146b785b574f42ae9e53d5e"`);
        await queryRunner.query('TRUNCATE "roles"')
        await queryRunner.query('TRUNCATE "users"')
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "role" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await this.baseRoles.up(queryRunner);
    }

}
