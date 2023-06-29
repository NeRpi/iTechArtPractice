import { MigrationInterface, QueryRunner } from "typeorm";
import {BaseRoles1687184231607} from "../consts/roles/1687184231607-base-roles.js";

export class RoleNameEnum1687522057492 implements MigrationInterface {
    name = 'RoleNameEnum1687522057492'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."roles_role_enum" AS ENUM('user', 'admin', 'SuperAdmin')`);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "role" TYPE "public"."roles_role_enum" USING "role"::"public"."roles_role_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "role" TYPE character varying USING "role"::"varchar";`);
        await queryRunner.query(`DROP TYPE "public"."roles_role_enum"`);
    }

}
