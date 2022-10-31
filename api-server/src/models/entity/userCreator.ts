import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Repo('UserCreator')
@Entity()
export class UserCreator {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, user => user.creator, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

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