import { Entity, DeleteDateColumn, Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity.ts";
import { UserEntity } from "./user.entity.ts";
import { Roles } from "../enums/role.enum.js";

@Entity("roles")
export class RoleEntity extends BaseEntity {
  @Column({ type: "enum", enum: Roles })
  role: Roles;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany("UserEntity", "role")
  users: UserEntity[];
}
