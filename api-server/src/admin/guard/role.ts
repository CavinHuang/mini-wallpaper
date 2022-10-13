import { getPropertyMetadata, Guard, IGuard, savePropertyMetadata } from "@/core/decorator";

export const ROLE_META_KEY = 'role:name'

export function Role(roleName: string | string[]): MethodDecorator {
  return (target, propertyKey, descriptor) => {
    roleName = [].concat(roleName);
    // 只保存元数据
    savePropertyMetadata(ROLE_META_KEY, roleName, target, propertyKey);
  };
}

@Guard()
export class AuthGuard implements IGuard<any> {
  canActivate(ctx: any, supplierClz: new (...args: any[]) => any, methodName: string): boolean | Promise<boolean> {
    // 从类元数据上获取角色信息
    const roleNameList = getPropertyMetadata<string[]>(ROLE_META_KEY, supplierClz, methodName);
    if (roleNameList && roleNameList.length && ctx.user.role) {
      // 假设中间件已经拿到了用户角色信息，保存到了 ctx.user.role 中
      // 直接判断是否包含改角色
      return roleNameList.includes(ctx.user.role);
    }
    return false
  }
}