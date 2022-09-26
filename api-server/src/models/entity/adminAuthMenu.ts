import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('AdminAuthMenu')
@Entity()
export class AdminAuthMenu {
  @PrimaryGeneratedColumn({
    comment: '角色菜单主键id'
  })
  id: number

  @Column({
    type: 'int',
    default: 0,
    comment: '角色菜单上级id'
  })
  pid: number

  @Column({
    comment: '角色菜单路由名字',
    default: '',
    nullable: false
  })
  name: string

  @Column({
    comment: '角色菜单侧边栏和面包屑展示的名称',
    default: '',
    nullable: false
  })
  title: string

  @Column({
    comment: '角色菜单路由地址',
    default: '',
    nullable: false
  })
  path: string

  @Column({
    comment: '角色菜单文件所在路径（为空则为Layout）',
    default: '',
    nullable: false
  })
  url: string

  @Column({
    comment: '角色菜单重定向地址',
    default: '',
    nullable: false
  })
  redirect: string

  @Column({
    comment: '角色菜单的图标',
    default: '',
    nullable: false
  })
  icon: string

  @Column({
    comment: '标记角色菜单是否为链接',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  is_link: number

  @Column({
    comment: '标记角色菜单是否隐藏不显示在侧边栏（1 隐藏 0 显示）',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  hidden: number

  @Column({
    comment: '标记角色菜单是否可以在面包屑中点击',
    type: 'tinyint',
    default: 1,
    nullable: false
  })
  is_click_in_breadcrumb: number

  @Column({
    comment: '标记角色菜单是否总是显示在侧边栏（1 永远显示 0 不显示）',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  always_show: number

  @Column({
    comment: '标记角色菜单是否被缓存（1 缓存 0 不缓存）',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  no_cache: number

  @Column({
    comment: '标记角色菜单是否显示在面包屑（1 显示在面包屑 0 不显示在面包屑）',
    type: 'tinyint',
    default: 1,
    nullable: false
  })
  breadcrumb_show: number

  @Column({
    comment: '标记角色菜单是否为公共菜单',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  public_menu: number

   @Column({
    comment: '角色菜单排序',
    type: 'mediumint',
    default: 1,
    nullable: false
  })
  sort: number

  @Column({
    comment: '角色说明',
    nullable: false
  })
  remark: string

  @Column({
    comment: '角色菜单状态',
    type: 'tinyint',
    default: 1
  })
  status: number

  @CreateDateColumn({
    comment: '创建时间'
  })
  create_at: Date

  @UpdateDateColumn({
    comment: '最后更新时间'
  })
  update_at: Date

  @Column({
    comment: '最后操作人'
  })
  delete_at: number
}