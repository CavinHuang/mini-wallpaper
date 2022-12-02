import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostsWithTags1669980345908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'post_with_cates',
        columns: [
          { name: 'post_id', type: 'int' },
          { name: 'cate_id', type: 'int' }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('post_with_cates')
    }
}
