import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SystemConfig {
  @PrimaryGeneratedColumn({
    comment: '配置分类id'
  })
  id: number

  @Column({
    comment: '字段名称'
  })
  menu_name: string

  @Column({
    comment: '类型(文本框,单选按钮...)'
  })
  type: string

  @Column({
    comment: '表单类型'
  })
  input_type: string

  @Column({
    comment: '配置分类id'
  })
  config_tab_id: number

  @Column({
    comment: '规则 单选框和多选框'
  })
  parameter: string

  @Column({
    comment: '上传文件格式1单图2多图3文件'
  })
  upload_type: number

  @Column({
    comment: '规则'
  })
  required: string

  @Column({
    comment: '多行文本框的宽度'
  })
  width: number

  @Column({
    comment: '多行文框的高度'
  })
  height: number

  @Column({
    comment: '默认值'
  })
  value: string

  @Column({
    comment: '配置名称'
  })
  name: string

  @Column({
    comment: '配置简介'
  })
  desc: string

  @Column({
    comment: '排序'
  })
  sort: number

  @Column({
    comment: '是否隐藏'
  })
  status: boolean
}