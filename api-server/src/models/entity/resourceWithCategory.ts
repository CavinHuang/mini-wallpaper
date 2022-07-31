/**
 * user model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ResourceWithCategory {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'int',
    default: 1
  })
  resource_id: number

  @Column({
    type: 'int',
    default: 1
  })
  category_id: number
}
