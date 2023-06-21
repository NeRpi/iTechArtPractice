import { Entity, DeleteDateColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.ts";
import { UserEntity } from "./user.entity.ts";

@Entity("roles")
export class RoleEntity extends BaseEntity {
  @Column()
  role: string;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany("UserEntity", "role")
  users: UserEntity[];
}
