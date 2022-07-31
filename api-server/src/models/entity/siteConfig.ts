/**
 * site config model
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class SiteConfig {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 200,
    comment: '小程序appid，用于区分小程序'
  })
  appid: string

  @Column({
    length: 200,
    comment: '站点名称'
  })
  name: string

  @Column({
    length: 200,
    comment: '备案'
  })
  beian: string

  @Column({
    length: 200,
    comment: '资源cdn(保留字段)'
  })
  resource_cdn_url: string

  @Column({
    length: 200,
    comment: 'config版本'
  })
  version: string

  @Column({
    comment: '分类配置, {key: {}}',
    type: 'longtext'
  })
  categorytype: string

  @Column({
    comment: '背景颜色配置',
  })
  background: string

  @Column({
    type: 'datetime'
  })
  create_at: Date
}
