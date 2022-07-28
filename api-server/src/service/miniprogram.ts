/**
 * 小程序
 */
import { M } from '@/models';
import { BaseService } from './baseService';
import { MiniProgram as MiniProgramEntity } from '../models/entity/miniprogram'
export class MiniProgram extends BaseService {
  static getInfoByAppid(appId: string) {
    return M(MiniProgramEntity).findOne({
      where: { appid: appId }
    })
  }
}
