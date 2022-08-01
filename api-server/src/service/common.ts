import { redisSet, redisGet } from './../core/redis/index';
import { BannerService } from './banner';
import { CatgoryService } from './catgory';
import { Banner } from './../models/entity/banner';
import { BusinessError, BUSINESS_ERROR_CODE } from './../core/error/businessError';
import { M } from "../models";
import { redisClient } from '../core/redis';
import { SiteConfigService } from './siteService';
import { SiteConfig } from '../models/entity/siteConfig';

interface IConfig {
  site?: SiteConfig
  banner?: Banner[]
  [key: string]: any
}

export const CONFIG_REDIS_KEY = 'config_'
export const CONFIG_VERSION_REDIS_KEY = 'config_key_'
export const CONFIG_CATEGORY_REDIS_KEY = 'category_key_'

export class CommonService {

  public async setCache() {
    const config: Record<string, IConfig> = {}

    const sitConfigService = new SiteConfigService()
    const siteConfigs = await sitConfigService.getSiteConfig()

    const siteConfig = siteConfigs[0]
    const categoryService = new CatgoryService()
    const categories = await categoryService.getCategoryByAppid(siteConfig.appid)

    config.site = siteConfig

    for (const key in categories) {
      if (Object.prototype.hasOwnProperty.call(categories, key)) {
        const element = categories[key];
        config[key] = element
      }
    }

    // banner
    const banners = await (new BannerService).getBannerByAppid(siteConfig.appid)

    config.banner = banners

    // 存redis
    redisSet(`${CONFIG_REDIS_KEY}${siteConfig.appid}`, config)
    redisSet(`${CONFIG_VERSION_REDIS_KEY}${siteConfig.appid}`, siteConfig.version)

    // category
    redisSet(`${CONFIG_CATEGORY_REDIS_KEY}${siteConfig.appid}`, categories)
    return true
  }

  public async initCache(appid: string) {
    const key = `${CONFIG_REDIS_KEY}${appid}`
    const redisRes = await redisGet<IConfig>(key)
    const redisConfigVersion = await redisGet(`${CONFIG_VERSION_REDIS_KEY}${appid}`)
    if (redisRes && redisConfigVersion === redisRes.site.version) {
      return true
    }

    return this.setCache()
  }
}