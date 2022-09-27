import { Repo } from "@/core/decorator";
import { Entity, Index, PrimaryColumn } from "typeorm";

@Repo('AdminAuthRoleUser')
@Entity({})
@Index(['role_id', 'user_id'], { unique: true })
export class AdminAuthRoleUser {
  @Index()
  @PrimaryColumn({
    unsigned: true,
    comment: '角色id'
  })
  @Index()
  role_id: number

  @Index()
  @PrimaryColumn({
    unsigned: true,
    comment: '用户id'
  })
  @Index()
  user_id: number
}