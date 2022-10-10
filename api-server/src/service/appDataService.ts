/**
 * app data 处理逻辑
 */
import { Inject, Service } from "@/core/container";
import { SystemGroupDataService } from '@/admin/service/systemGroupData';

const appDataKey = 'app_data'

export interface AppDataItem {
  title: string
  key: string
  label: string
  value: string
  desc: string
}

@Service()
export class AppDataService {
  @Inject()
  protected systemGroupDataService: SystemGroupDataService

  private _appData: Record<string, AppDataItem> = {}

  getItemByKey(key: string) {
    return Object.prototype.hasOwnProperty.call(this._appData, key) ? this._appData[key] : null
  }

  async getAll() {
    await this._init()
    return this._appData
  }

  private async _init() {
    // if (Object.keys(this._appData).length) return this._appData
    const appData = await this.systemGroupDataService.getConfigNameValue(appDataKey)
    appData.forEach(item => {
      this._appData[item.key] = item
    })
  }

  public _injectAbleKey = ''
  public _injectHandler = '_init'
}