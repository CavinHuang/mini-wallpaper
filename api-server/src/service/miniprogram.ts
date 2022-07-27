/**
 * 小程序
 */
import { M } from '@/models';
import { BaseService } from './baseService';

export class MiniProgram extends BaseService {
  static getInfoByAppid(appId: string) {
    return M(MiniProgram).findOne({
      where: { appid: appId }
    })
  }
}
