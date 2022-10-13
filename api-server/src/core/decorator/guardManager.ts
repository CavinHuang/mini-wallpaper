import { CommonGuardUnion, IGuard } from './interface';
import { getClassMetadata, getPropertyMetadata } from '../decorator';
import { AppContext } from '@/interface';
import { GUARD_KEY } from './constant';

export class GuardManager<
  CTX extends AppContext = AppContext
> extends Array<new (...args) => IGuard<any>> {
  public addGlobalGuard(guards: CommonGuardUnion<CTX>) {
    if (!Array.isArray(guards)) {
      this.push(guards);
    } else {
      this.push(...guards);
    }
  }

  public async runGuard(
    ctx: CTX,
    supplierClz: new (...args) => any,
    methodName: string
  ) {
    // check global guard
    for (const Guard of this) {
      const isPassed = await (async() => {
        return (new Guard).canActivate(ctx, supplierClz, methodName)
      })()
      if (!isPassed) {
        return false;
      }
    }

    // check class Guard
    const classGuardList = getClassMetadata(GUARD_KEY, supplierClz);
    if (classGuardList) {
      for (const Guard of classGuardList) {
        const isPassed = await (async() => {
          return (new Guard).canActivate(ctx, supplierClz, methodName)
        })()
        console.log("🚀 ~ file: guardManager.ts ~ line 39 ~ isPassed ~ isPassed", isPassed)
        if (!isPassed) {
          return false;
        }
      }
    }

    // check method Guard
    const methodGuardList = getPropertyMetadata(
      GUARD_KEY,
      supplierClz,
      methodName
    );
    if (methodGuardList) {
      // for (const Guard of methodGuardList) {
      //   const guard = await ctx.requestContext.getAsync<IGuard<any>>(Guard);
      //   const isPassed = await guard.canActivate(ctx, supplierClz, methodName);
      //   if (!isPassed) {
      //     return false;
      //   }
      // }
    }
    return true;
  }
}
