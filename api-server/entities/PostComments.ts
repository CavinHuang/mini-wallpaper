import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("post_comments", { schema: "test1" })
export class PostComments {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { name: "post_id" })
  postId: number;

  @Column("text", { name: "content", comment: "评论内容", default: () => "''" })
  content: string;

  @Column("int", { name: "reply_id", comment: "回复那条评论" })
  replyId: number;

  @Column("tinyint", {
    name: "status",
    comment: "文章状态：0 未审核 1 通过 2 驳回 3 下架",
    default: () => "'1'",
  })
  status: number;

  @Column("datetime", { name: "create_at", comment: "文章创建时间" })
  createAt: Date;

  @Column("datetime", { name: "update_at", comment: "文章最后修改时间" })
  updateAt: Date;

  @Column("datetime", { name: "delete_at", comment: "文章删除时间" })
  deleteAt: Date;
}
