import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Repo('AdminRole')
@Entity({})
@Index(['role_id', 'menu_id'], { unique: true })
@Index('role_id', { unique: true })
@Index('menu_id', { unique: true })
export class AdminAuthRole {
  @Column({
    unsigned: true,
    comment: '角色id'
  })
  role_id: number

  @Column({
    unsigned: true,
    comment: '菜单id'
  })
  menu_id: number
}