import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostsComments1669980555003 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'post_comments',
        columns: [
          { name: 'id', isGenerated: true, type: 'int', isPrimary: true, generationStrategy: 'increment' },
          { name: 'user_id', type: 'int', isPrimary: true },
          { name: 'post_id', type: 'int'},
          { name: 'content', type: 'text', default: "''", comment: '评论内容' },
          { name: 'reply_id', type: 'int', default: null, comment: '回复那条评论' },
          { name: 'status', type: 'tinyint', default: 1, comment: '文章状态：0 未审核 1 通过 2 驳回 3 下架' },
          { name: 'create_at', type: 'datetime', default: null, comment: '文章创建时间' },
          { name: 'update_at', type: 'datetime', default: null, comment: '文章最后修改时间' },
          { name: 'delete_at', type: 'datetime', default: null, comment: '文章删除时间' },
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('post_comments')
    }

}
