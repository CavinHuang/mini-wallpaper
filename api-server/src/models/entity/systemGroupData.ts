import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Repo('SystemGroupData')
@Entity()
export class SystemGroupData {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '对应的数据组id'
  })
  gid: number

  @Column({
    comment: '数据组对应的数据值（json数据）',
    type: 'text'
  })
  value: string

  @CreateDateColumn({
    comment: '添加数据时间'
  })
  add_time: Date

  @Column({
    comment: '数据排序'
  })
  sort: number

  @Column({
    comment: '状态（1：开启；2：关闭；）',
    type: 'tinyint',
    default: 1
  })
  status: string

  @Column({
    comment: '删除时间',
    nullable: true
  })
  delete_at: Date
}