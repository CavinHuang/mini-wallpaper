import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('AdminRole')
@Entity({})
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
    comment: '状态'
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
    comment: '删除时间',
    default: null
  })
  delete_at: Date
}