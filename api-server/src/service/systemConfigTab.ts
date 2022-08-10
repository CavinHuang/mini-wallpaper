import { M } from "@/models";
import { SystemConfigTab } from "@/models/entity/systemCOnfigTab";
import { getTreeChildren } from "@/utils/data";

export class SystemConfigTabService {

  /**
   * 获取所有的数据
   * @returns 
   */
  public static async getAll() {
    const model = M(SystemConfigTab)
    const list = await model.find()
    const treeData = getTreeChildren(list)
    return {
      list, treeData
    }
  }

  /**
   * 创建
   * @param raw 
   * @returns 
   */
  public static create(raw: Partial<SystemConfigTab>) {
    const model = M(SystemConfigTab)
    const data = model.create(raw)
    return model.save(data)
  }

  /**
   * 更新
   * @param raw 
   * @returns 
   */
  public static update(id: number, raw: Partial<SystemConfigTab>) {
    const model = M(SystemConfigTab)
    const rawData = model.findOne({
      where: {
        id
      }
    })
    const data = Object.assign(rawData, raw)
    return model.save(data)
  }
  
}