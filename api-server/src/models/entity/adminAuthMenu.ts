import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminAuthRole } from './adminAuthRole';

@Repo('AdminAuthMenu')
@Entity({})
export class AdminAuthMenu {
  @PrimaryGeneratedColumn({
    comment: '角色菜单主键id'
  })
  id: number

  @Index()
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
  menu_name: string

  @Column({
    comment: '角色菜单路由地址',
    default: '',
    nullable: false
  })
  path: string

  @Column({
    comment: 'api接口地址',
    default: '',
    nullable: false
  })
  api_url: string

  @Column({
    comment: '提交方式POST GET PUT DELETE',
    default: '',
    nullable: false
  })
  methods: string

  @Column({
    comment: '参数',
    default: '[]',
    nullable: false
  })
  params: string

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
    comment: '子管理员是否可用',
    type: 'tinyint',
    default: 1,
    nullable: false
  })
  access: number

  @Column({
    comment: '是否为菜单 1菜单 2功能',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  auth_type: number

  @Column({
    comment: '标记角色菜单是否隐藏不显示在侧边栏（1 隐藏 0 显示）',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  hidden: number

  @Column({
    comment: '前台唯一标识',
    default: '',
    nullable: false
  })
  unique_auth: string

  @Column({
    comment: '标记角色菜单是否被缓存（1 缓存 0 不缓存）',
    type: 'tinyint',
    default: 0,
    nullable: false
  })
  no_cache: number

  @Column({
    comment: '角色菜单排序',
    type: 'mediumint',
    default: 1,
    nullable: false
  })
  sort: number


  @Column({
    comment: '菜单状态',
    type: 'tinyint',
    default: 1
  })
  status: number

  @ManyToMany(type => AdminAuthRole, role => role.menus, { cascade: true, createForeignKeyConstraints: false })
  roles: AdminAuthRole[]

  @CreateDateColumn({
    comment: '创建时间'
  })
  create_at: Date

  @UpdateDateColumn({
    comment: '最后更新时间'
  })
  update_at: Date

  @Column({
    comment: '删除时间'
  })
  delete_at: Date
}