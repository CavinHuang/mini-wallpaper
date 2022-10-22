import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserCreator {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn()
  user_id: number

  @Column()
  code: string

  @Column()
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