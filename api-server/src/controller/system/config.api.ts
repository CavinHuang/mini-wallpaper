import { Controller, Get } from '@/core/decorator';
import { SystemConfigTabService } from '@/service/systemConfigTab';
import { SystemConfig as SystemConfigEntity } from '../../models/entity/systemConfig';

@Controller('/system', { skipPerm: true })
class SystemConfig {

  @Get('/config-class')
  public async configTab() {
    const { treeData } = await SystemConfigTabService.getAll()

    console.log(treeData)
  }
}