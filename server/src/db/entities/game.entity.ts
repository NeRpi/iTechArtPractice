import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "./base.entity.ts";
import { UserEntity } from "./user.entity.ts";
import { GameTypeEnum } from "../enums/game.type.enum.ts";

@Entity("games")
export class GameEntity extends BaseEntity {
  @Column({ default: "" })
  moves: string = "";

  @Column({ type: "enum", enum: GameTypeEnum })
  type: GameTypeEnum;

  @Column({ nullable: true })
  result: number;

  @ManyToMany("UserEntity")
  @JoinTable({name: "games_users"})
  users: UserEntity[];
}
