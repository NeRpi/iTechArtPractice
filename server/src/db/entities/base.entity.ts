import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryColumn("uuid", { default: () => "uuid_generate_v4()" })
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
