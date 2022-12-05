import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class UpdateLikeLog1669981391047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('like_log', new TableColumn({
        name: 'like_type',
        default: "'resource'",
        type: 'varchar',
        length: '128',
        comment: '增加点赞类型'
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('like_log', 'like_type')
    }

}
