import { Entity, DeleteDateColumn, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity.js";
import { RoleEntity } from "./role.entity.js";

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

  @Column()
  password: string;

  @Column({ nullable: true })
  roleId: string;

  @ManyToOne("RoleEntity", "users")
  role: RoleEntity;

  @DeleteDateColumn()
  deleted_at: Date;
}
