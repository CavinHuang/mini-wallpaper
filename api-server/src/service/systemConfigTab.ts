import { M } from "@/models";
import { SystemConfigTab } from "@/models/entity/systemConfigTab";
import { getTreeChildren, sortListTier } from "@/utils/data";

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
   * 获取所有的
   * @returns 
   */
  public static getConfigTabAll() {
    return M(SystemConfigTab).find()
  }

  /**
   * 获取下拉选项
   * @returns 
   */
  public static async getSelectForm() {
    const menuList = await SystemConfigTabService.getConfigTabAll()
    console.log(menuList)
    const list = sortListTier(menuList, 0, 'pid', 'id')
    const menus = [{ value: 0, label: '顶级按钮' }]

    list.forEach(menu => {
      menus.push({ value: menu.id, label: menu.html + menu.title })
    })

    return menus
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