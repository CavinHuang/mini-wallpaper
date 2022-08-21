import { Repository } from "@/core/decorator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Repository('TestReopsitory')
@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}