import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePostTags1670205812351 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'post_with_tags',
        columns: [
          { name: 'post_id', type: 'int' },
          { name: 'tag_id', type: 'int' }
        ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('post_with_tags')
    }

}
