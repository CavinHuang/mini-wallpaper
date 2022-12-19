import { Repo } from "@/core/decorator";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ArrayStringTransformer } from "../transformer/arrayString";
import { Category } from "./catgory";
import { PostsLikeLog } from "./postLikeLog";
import { Tag } from "./tag";

@Repo('Posts')
@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "title", comment: "文章标题", length: 500 })
  title: string;

  @Column("text", { name: "excerpt", comment: "文章摘要" })
  excerpt: string;

  @Column("int", { name: "comment_count", comment: "评论条数", default: () => "'0'" })
  commentCount: number;

  @Column("longtext", { name: "thumbnail", comment: "缩略图的组合", transformer: new ArrayStringTransformer([]) })
  thumbnail: string[];

  @Column("tinyint", {
    name: "show_header",
    comment: "是否显示顶部图片",
    default: () => "'1'",
  })
  showHeader: number;

  @Column("int", { name: "views", comment: "访问量", default: () => "'0'" })
  views: number;

  @Column("int", {
    name: "like_count",
    comment: "点赞量",
    default: () => "'0'",
  })
  likeCount: number;

  @Column("int", { name: "favorites", comment: "收藏量", default: () => "'0'" })
  favorites: number;

  @Column("tinyint", {
    name: "switch_comment",
    comment: "评论开关",
    default: () => "'1'",
  })
  switchComment: number;

  @Column("decimal", {
    name: "require_score",
    comment: "需要多少积分",
    precision: 10,
    scale: 0,
    default: () => "'0'",
  })
  requireScore: string;

  @Column("tinyint", {
    name: "switch_score",
    comment: "是否需要积分",
    default: () => "'0'",
  })
  switchScore: number;

  @Column("tinyint", {
    name: "switch_jili",
    comment: "是否需要查看激励广告",
    default: () => "'0'",
  })
  switchJili: number;

  @Column("tinyint", {
    name: "switch_password",
    comment: "是否需要密码",
    default: () => "'0'",
  })
  switchPassword: number;

  @Column("tinyint", {
    name: "direct_link_switch",
    comment: "是否开启跳转",
    default: () => "'0'",
  })
  directLinkSwitch: number;

  @Column("text", { name: "direct_link", comment: "跳转的链接" })
  directLink: string;

  @Column("longtext", {
    name: "content",
    comment: "文章内容",
    default: () => "''",
  })
  content: string;

  @Column("varchar", {
    name: "badge",
    comment: "文章热点标识",
    length: 255,
    default: () => "''",
  })
  badge: string;

  @Column("tinyint", {
    name: "status",
    comment: "文章状态：0 未审核 1 通过 2 驳回 3 下架",
    default: () => "'1'",
  })
  status: number;

  @CreateDateColumn({ name: "create_at", comment: "文章创建时间", nullable: true })
  createAt: Date;

  @UpdateDateColumn({ name: "update_at", comment: "文章最后修改时间", nullable: true })
  updateAt: Date;

  @DeleteDateColumn({ name: "delete_at", comment: "文章删除时间", nullable: true })
  delete_at: Date;

  @ManyToMany(() => Tag, tag => tag.posts)
  @JoinTable({
    name: 'posts_with_tags',
    joinColumns: [
      { name: 'post_id' }
    ],
    inverseJoinColumns: [
      { name: 'tag_id' }
    ]
  })
  tags: Tag[];

  // @OneToMany(type => LikeLog, tag => tag.relation_id, { createForeignKeyConstraints: false })
  // likes: LikeLog[];
  @OneToMany(type => PostsLikeLog, like => like.posts, { createForeignKeyConstraints: false })
  likes: PostsLikeLog[];

  @ManyToMany(type => Category, cate => cate.posts)
  @JoinTable({
    name: 'posts_with_cates',
    joinColumns: [
      { name: 'post_id' }
    ],
    inverseJoinColumns: [
      { name: 'cate_id' }
    ]
  })
  categories: Category[]
}
