/**
 * Test model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Repo('Test')
@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: 'remark'
  })
  remark: string

  @Column({
    default: 1
  })
  sort: number

  @Column({
    type: 'tinyint',
    default: 1
  })
  status: number

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
