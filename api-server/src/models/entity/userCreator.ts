import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('UserCreator')
@Entity()
export class UserCreator {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  user_id: number

  @Column()
  code: string

  @Column({
    comment: '1 审核中， 2 审核通过，3 审核不通过'
  })
  status: number

  @Column()
  remark: string

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date

  @UpdateDateColumn({
    type: 'datetime'
  })
  update_at: Date

  @Column({
    type: 'datetime',
    nullable: true
  })
  delete_at: Date
}