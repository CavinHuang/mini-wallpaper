import { commonService } from '../config/servicePort'
import { crudBuilder } from '../apiCreator'

export namespace SystemGroup {
  export interface Item {
    id: number
    name: string
    info: string
    config_name: string
    fields: string
  }
}

export namespace SystemGroupData {
  export interface Item {
    id: number
    name: string
    info: string
    config_name: string
    fields: string
  }
}

export const SystemGroupApi = crudBuilder<SystemGroup.Item>('/admin/system-group')

export const SystemGroupDataApi = crudBuilder<SystemGroupData.Item>('/admin/system-group-data')
