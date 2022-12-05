import { Column, Entity } from "typeorm";

@Entity("post_with_cates", { schema: "test1" })
export class PostWithCates {
  @Column("int", { name: "post_id" })
  postId: number;

  @Column("int", { name: "cate_id" })
  cateId: number;
}
