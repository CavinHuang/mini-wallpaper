import { Banner } from './../models/entity/banner';
import { M } from "../models";

export class BannerService {
  public async getBannerByAppid(appid: string) {
    const banners = await M(Banner).find({
      where: { appid }
    })
    return banners
  }
}