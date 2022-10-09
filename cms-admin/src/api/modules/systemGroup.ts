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
    gid: number
    value: string
    add_time: Date
    sort: number
    status: number
  }
  export interface TableHeaderItem {
    key?: string
    slot?: string
    title: string
    minWidth: number
  }
  export interface SystemGroupFileds {
    name: string
    params: string
    title: string
    type: string
  }
}

export const SystemGroupApi = crudBuilder<SystemGroup.Item>('/admin/system-group')

export const SystemGroupDataCurd = crudBuilder<SystemGroupData.Item>('/admin/system-group-data')

export const SystemGroupDataApi = {
  ...SystemGroupDataCurd,
  tableHeader: (gid: number) => {
    return SystemGroupDataCurd.http.get<{
      header: SystemGroupData.TableHeaderItem[]
      fields: SystemGroupData.SystemGroupFileds[]
    }>('/header/' + gid)
  }
} as const
