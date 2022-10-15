import { ROUTE_PARAMS_SOURCE, TAGS } from "../constants"

const register = (type: string | Symbol) => (name?: string) => (
  target: any,
  targetKey: string,
  indexOrPropertyDescriptor: number | TypedPropertyDescriptor<any>
) => {
  if(typeof indexOrPropertyDescriptor === 'number') {
    // 定义参数信息 
    const metadata = Reflect.getMetadata(TAGS.ROUTE_PARAMS, target.constructor, targetKey) || []
    metadata.push({
      name,
      target: target,
      method: targetKey,
      type,
      index: indexOrPropertyDescriptor
    })
    Reflect.defineMetadata(TAGS.ROUTE_PARAMS, metadata, target.constructor, targetKey)
  }
}

export const Params = register(ROUTE_PARAMS_SOURCE.PARAMS)
export const Query = register(ROUTE_PARAMS_SOURCE.QUERY)
export const Body = register(ROUTE_PARAMS_SOURCE.BODY)
export const AllParams = register(ROUTE_PARAMS_SOURCE.ALL_PARAMS)
export const Req = Query
export const Header = register(ROUTE_PARAMS_SOURCE.HEADER)
export const Context = register(ROUTE_PARAMS_SOURCE.CONTEXT)
