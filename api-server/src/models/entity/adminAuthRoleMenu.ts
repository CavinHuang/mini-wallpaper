import { Repo } from "@/core/decorator";
import { Entity, Index, PrimaryColumn } from "typeorm";

@Repo('AdminAuthRoleMenu')
@Entity({})
@Index(['role_id', 'menu_id'])
export class AdminAuthRoleMenu {
  @Index()
  @PrimaryColumn({
    unsigned: true,
    comment: '角色id'
  })
  role_id: number

  @Index()
  @PrimaryColumn({
    unsigned: true,
    comment: '菜单id'
  })
  menu_id: number
}