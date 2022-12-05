import { Column, Entity } from "typeorm";

@Entity("post_with_tags", { schema: "test1" })
export class PostWithTags {
  @Column("int", { name: "post_id" })
  postId: number;

  @Column("int", { name: "tag_id" })
  tagId: number;
}
