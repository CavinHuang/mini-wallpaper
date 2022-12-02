import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostsWithTags1669980345908 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'post_with_tags',
        columns: [
          { name: 'post_id', type: 'int', isPrimary: true },
          { name: 'tag_id', type: 'int', isPrimary: true }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('post_with_tags')
    }
}