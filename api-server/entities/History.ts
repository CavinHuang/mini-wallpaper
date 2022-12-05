import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("history", { schema: "test1" })
export class History {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("bigint", { name: "timestamp" })
  timestamp: string;

  @Column("varchar", { name: "name", length: 255 })
  name: string;
}
