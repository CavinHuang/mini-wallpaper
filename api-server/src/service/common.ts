import { redisSet, redisGet } from './../core/redis/index';
// import { CatgoryService } from './catgory';
import { ContentBanner } from '../models/entity/contentBanner';
import { SiteConfigService } from './siteService';
import { SiteConfig } from '../models/entity/siteConfig';

export interface IConfig {
  site?: SiteConfig
  banner?: ContentBanner[]
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
    if (!siteConfig) return false
    // const categoryService = new CatgoryService()
    // const categories = await categoryService.getCategoryByAppid(siteConfig.appid)

    const resource_cdn_url = siteConfig.resource_cdn_url

    siteConfig.resource_cdn_url = (() => {
      try {
        return JSON.parse(resource_cdn_url)
      } catch (e) {
        console.log(e)
        return ''
      }
    })()

    const categorytype = siteConfig.categorytype
    siteConfig.categorytype = (() => {
      try {
        return JSON.parse(categorytype)
      } catch (e) {
        console.log(e)
        return ''
      }
    })()

    const background = siteConfig.background
    siteConfig.background = (() => {
      try {
        return JSON.parse(background)
      } catch (e) {
        console.log(e)
        return ''
      }
    })()

    config.site = siteConfig

    // for (const key in categories) {
    //   if (Object.prototype.hasOwnProperty.call(categories, key)) {
    //     const element = categories[key];
    //     config[key] = element
    //   }
    // }

    // banner
    // const banners = await (new BannerService).getBannerByAppid(siteConfig.appid)

    // config.banner = banners

    // 存redis
    redisSet(`${CONFIG_REDIS_KEY}${siteConfig.appid}`, config)
    redisSet(`${CONFIG_VERSION_REDIS_KEY}${siteConfig.appid}`, siteConfig.version)

    // category
    // redisSet(`${CONFIG_CATEGORY_REDIS_KEY}${siteConfig.appid}`, categories)
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

  static async getRedisConfig(appid = '') {
    const key = `${CONFIG_REDIS_KEY}${appid}`
    return await redisGet<IConfig>(key)
  }
}