import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGame1692981116089 implements MigrationInterface {
    name = 'CreateGame1692981116089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."games_type_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "moves" character varying NOT NULL DEFAULT '', "type" "public"."games_type_enum" NOT NULL, "result" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "games_users" ("gamesId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_2a61de4ef18079d764daef1b8ad" PRIMARY KEY ("gamesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d00bad29b65df173e8c826d3fe" ON "games_users" ("gamesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_adab3d6b67375043ff666d8476" ON "games_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "games_users" ADD CONSTRAINT "FK_d00bad29b65df173e8c826d3fe6" FOREIGN KEY ("gamesId") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "games_users" ADD CONSTRAINT "FK_adab3d6b67375043ff666d84760" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games_users" DROP CONSTRAINT "FK_adab3d6b67375043ff666d84760"`);
        await queryRunner.query(`ALTER TABLE "games_users" DROP CONSTRAINT "FK_d00bad29b65df173e8c826d3fe6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_adab3d6b67375043ff666d8476"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d00bad29b65df173e8c826d3fe"`);
        await queryRunner.query(`DROP TABLE "games_users"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TYPE "public"."games_type_enum"`);
    }

}
