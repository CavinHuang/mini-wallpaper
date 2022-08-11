import { M } from '@/models';
import { SystemConfig } from '@/models/entity/systemConfig';
import { FindOptionsWhere } from 'typeorm';

export class SystemConfigService {
  public static async getConfigList(extral: {
    where: FindOptionsWhere<SystemConfig>
  }) {
    const model = M(SystemConfig)
    const list = await model.find({
      where: extral.where
    })

    console.log(list)

    const tidySrr = []
    list.forEach((item: any, index) => {
      item.value = item.value ? JSON.stringify(item.value) : ''
      if (item.type === 'radio' || item.type === 'checkbox') {
        item.value = SystemConfigService.getRadioOrCheckboxValueInfo(item.menu_name, item.value)
      }

      if (item.type === 'upload' && item.value) {
        if (item.upload_type === 1 || item.upload_type === 3) {
          item.value = '' + item.value
        } else if (item.upload_type == 2) {
          item.value = '' + item.value
        }

        item.value.forEach((value, key) => {
          tidySrr[key]['filePath'] = value
          tidySrr[key]['filename'] = value
        })
        item.value = tidySrr
      }
    })

    return list
  }

  public static getRadioOrCheckboxValueInfo(menuName: string, value) {
    const options = {}
    const configOne = {
      parameter: ''
    }

    if (!configOne) return ''
    const parmeter = configOne.parameter.split('\n')

    parmeter.forEach((v, k) => {
      if (v && v.length > 0) {
        const data = v.split('=>')
        options[data[0]] = data[1]
      }
    })

    let str = ''
    if (Array.isArray(value)) {
      value.forEach(v => {
        str += options[v] + ','
      })
    } else {
      str += value ? options[value] ?? '' : options[0] ?? ''
    }

    return str
  }

  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public static create(raw: Partial<SystemConfig>) {
    const model = M(SystemConfig)
    const data = model.create(raw)
    return model.save(data)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public static update(id: number, raw: Partial<SystemConfig>) {
    const model = M(SystemConfig)
    const rawData = model.findOne({
      where: {
        id
      }
    })
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }
}