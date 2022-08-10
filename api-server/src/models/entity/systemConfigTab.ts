import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SystemConfigTab {
  @PrimaryGeneratedColumn({
    comment: '配置分类id'
  })
  id: number

  @Column({
    comment: '上级分类id'
  })
  pid: number

  @Column({
    comment: '配置分类名称'
  })
  title: string

  @Column({
    comment: '配置分类英文名称'
  })
  eng_title: string

  @Column({
    comment: '配置分类状态'
  })
  status: boolean

  @Column({
    comment: '配置分类是否显示'
  })
  display: boolean

  @Column({
    length: 50,
    comment: '图标'
  })
  icon: string

  @Column({
    comment: '配置类型'
  })
  type: number

  @Column({
    comment: '排序'
  })
  sort: number
}