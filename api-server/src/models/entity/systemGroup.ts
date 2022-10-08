import { Repo } from "@/core/decorator";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Repo('SystemGroup')
@Entity()
export class SystemGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '分类id'
  })
  cate_id: number

  @Column({
    comment: '数据组名称',
    length: 50
  })
  name: string

  @Column({
    comment: '数据提示',
    length: 256
  })
  info: string

  @Column({
    comment: '数据字段',
    length: 50
  })
  @Index({unique: true})
  config_name: string

  @Column({
    comment: '数据组字段以及类型（json数据）',
    type: 'text'
  })
  fields: string

  @Column({
    comment: '删除时间',
    nullable: true
  })
  delete_at: Date
}