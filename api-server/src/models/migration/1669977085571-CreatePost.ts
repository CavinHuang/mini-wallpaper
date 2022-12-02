import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePost1669977085571 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'posts',
        columns: [
          { name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: 'increment' },
          { name: 'title', type: 'varchar', length: '500', comment: '文章标题' },
          { name: 'excerpt', type: 'text', comment: '文章摘要' },
          { name: 'comment_count', type: 'int', length: '10', comment: '评论条数'},
          { name: 'thumbnail', type: 'longtext', comment: '缩略图的组合' },
          { name: 'show_header', type: 'tinyint', default: 1, comment: '是否显示顶部图片' },
          { name: 'views', type: 'int', default: 0, comment: '访问量' },
          { name: 'like_count', type: 'int', default: 0, comment: '点赞量' },
          { name: 'favorites', type: 'int', default: 0, comment: '收藏量' },
          { name: 'switch_comment', type: 'tinyint', default: 1, comment: '评论开关' },
          { name: 'require_score', type: 'decimal', default: 0, comment: '需要多少积分' },
          { name: 'switch_score', type: 'tinyint', default: 0, comment: '是否需要积分' },
          { name: 'switch_jili', type: 'tinyint', default: 0, comment: '是否需要查看激励广告' },
          { name: 'switch_password', type: 'tinyint', default: 0, comment: '是否需要密码' },
          { name: 'direct_link_switch', type: 'tinyint', default: 0, comment: '是否开启跳转' },
          { name: 'direct_link', type: 'text', default: '', comment: '跳转的链接' },
          { name: 'content', type: 'longtext', default: '', comment: '文章内容' },
          { name: 'badge', type: 'varchar', default: '', comment: '文章热点标识' },
          { name: 'cate_id', type: 'int', default: null, comment: '文章分类' },
          { name: 'status', type: 'tinyint', default: 1, comment: '文章状态：0 未审核 1 通过 2 驳回 3 下架' },
          { name: 'create_at', type: 'datetime', default: '', comment: '文章创建时间' },
          { name: 'update_at', type: 'datetime', default: '', comment: '文章最后修改时间' },
          { name: 'delete_at', type: 'datetime', default: null, comment: '文章删除时间' },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('posts')
    }

}
