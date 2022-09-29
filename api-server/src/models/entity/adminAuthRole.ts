import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdminAuthMenu } from './adminAuthMenu';
import { AdminUser } from './adminUser';
@Repo('AdminAuthRole')
@Entity()
export class AdminAuthRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '角色名',
    nullable: false
  })
  role_name: string

  @Column({
    comment: '角色编码',
    nullable: false
  })
  role_code: string

  @Column({
    comment: '角色说明',
    nullable: false
  })
  remark: string

  @Column({
    comment: '状态',
    default: 1
  })
  status: number

  @ManyToMany(type => AdminAuthMenu, menu => menu.roles, { createForeignKeyConstraints: false })
  @JoinTable({
    name: 'admin_auth_role_menu',
    joinColumns: [
      { name: 'role_id' }
    ],
    inverseJoinColumns: [
      { name: 'menu_id' }
    ]
  })
  menus: AdminAuthMenu[]

  @ManyToMany(type => AdminUser, user => user.roles, { cascade: true, createForeignKeyConstraints: false })
  users: AdminUser[];

  @CreateDateColumn({
    comment: '创建时间'
  })
  create_at: Date

  @UpdateDateColumn({
    comment: '最后更新时间'
  })
  update_at: Date

  @Column({
    comment: '删除时间',
    default: null
  })
  delete_at: Date
}