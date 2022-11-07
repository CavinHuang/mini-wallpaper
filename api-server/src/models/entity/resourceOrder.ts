/**
 * catgory model
 */
import { Repo } from '@/core/decorator'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Resource } from './resource'
import { User } from './user';

@Repo('ResourceOrder')
@Entity()
export class ResourceOrder {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(type => User, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn({
    name: 'user_id'
  })
  user: User

  @ManyToOne(type => Resource, resource => resource.likes, { cascade: true, createForeignKeyConstraints: false })
  @JoinColumn()
  resource: Resource

  @Column({
    comment: '订单原始金额',
    type: 'decimal'
  })
  orgin_price: number

  @Column({
    comment: '订单现有金额',
    type: 'decimal'
  })
  price: number

  @Column({
    comment: '订单折扣',
    type: 'text'
  })
  discount: string

  @Column({
    comment: '订单状态',
    type: 'tinyint'
  })
  status: number

  @CreateDateColumn({
    type: 'datetime'
  })
  create_at: Date
}
