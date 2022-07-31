import { BusinessError, BUSINESS_ERROR_CODE } from './../core/error/businessError';
import { M } from "../models";
import { SiteConfig } from '../models/entity/siteConfig'
import { redisClient } from '../core/redis';

export class SiteConfigService {

  public async getSiteConfigByAppid(appid: string) {
      const siteConfig = await M(SiteConfig).findOne({ where: { appid } })
    if (!SiteConfig) {
      throw new BusinessError(BUSINESS_ERROR_CODE.NOT_FOUND, '没有这样的中的站点配置')
    }
    return SiteConfig
  }

  public async getSiteConfig() {
    return await M(SiteConfig).find()
  }

  public async init() {
    const siteConfigs = await M(SiteConfig).find()

    siteConfigs.forEach(config => {
      redisClient.set(config.appid, JSON.stringify(config))
    })

    return true
  }
}