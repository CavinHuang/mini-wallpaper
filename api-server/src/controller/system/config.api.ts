import { SystemConfigService } from '@/service/systemConfig';
import { SystemConfigTab } from '@/models/entity/systemConfigTab';
import { Controller, Get, Post } from '@/core/decorator';
import { Response } from '@/core/responce';
import { SystemConfigTabService } from '@/service/systemConfigTab';
import { SystemConfig as SystemConfigEntity } from '@/models/entity/systemConfig';
import { ControllerParams } from '@/interfaces';

@Controller('/system', { skipPerm: true })
class SystemConfig {

  @Get('/config-class')
  public async configTab() {
    const { treeData } = await SystemConfigTabService.getAll()

    console.log(treeData)

    return Response.success(treeData, Response.successMessage)
  }

  @Post('/config-tab/create')
  public async createConfigTab(raw: Partial<SystemConfigTab>) {
    return Response.success(await SystemConfigTabService.create(raw), Response.successMessage)
  }

  @Post('/config-tab/update')
  public async updateConfigTab(raw: Partial<SystemConfigTab>) {
    return Response.success(await SystemConfigTabService.update(raw.id, raw), Response.successMessage)
  }

  @Post('/config-tab/changeStatus')
  public async changeStatus(raw: ControllerParams<any, { ids: number[] } & Partial<SystemConfigTab>>) {
    const { body } = raw
    const { ids } = body
    delete body.ids
    return Response.success(await SystemConfigTabService.updateAll(ids, body), Response.successMessage)
  }

  @Get('/getSelectOptions')
  public async getSelectOptions() {
    const data = await SystemConfigTabService.getSelectForm()
    return Response.success(data, Response.successMessage)
  }

  @Get('/config/list')
  public async configList({ tab_id }: { tab_id: number }) {
    const list = await SystemConfigService.getConfigList({
      where: {
        config_tab_id: tab_id
      }
    })
    console.log(list)

    return Response.success(list, Response.successMessage)
  }
}