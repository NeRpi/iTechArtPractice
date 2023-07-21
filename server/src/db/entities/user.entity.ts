import { Entity, DeleteDateColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.ts";
import { RoleEntity } from "./role.entity.ts";
import { GameEntity } from "./game.entity.js";

@Entity("users")
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column({ nullable: true, type: "date" })
  DoB: string;

  @Column()
  email: string;

  @Column({ default: 1000 })
  elo: number;

  @Column()
  password: string;

  @Column({ nullable: true })
  roleId: string;

  @ManyToOne("RoleEntity", "users")
  role: RoleEntity;

  @DeleteDateColumn()
  deleted_at: Date;
}
