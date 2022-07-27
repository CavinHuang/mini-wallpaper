import { Server } from '../Server'

/** 加载中间件 */
export async function initHTTPMares($: Server) {
  const {
    config: { middleware },
    logWarn
  } = $

  const maresBefore = []
  const maresAfter = []

  for (const initerMare_ of middleware?.before ?? []) {
    try {
      let initerMare = initerMare_

      if (typeof initerMare_ == 'string') {
        initerMare = (await import(`./lib/mare/${initerMare_}.ts`)).default
      }

      maresBefore.push(await initerMare($))
    } catch (error) {
      logWarn('加载~[HTTP接口前置中间件]', error)
    }
  }
  for (const initerMare_ of middleware?.after ?? []) {
    try {
      let initerMare = initerMare_

      if (typeof initerMare_ == 'string') {
        initerMare = (await import(`./lib/mare/${initerMare_}.js`)).default
      }

      maresAfter.push(await initerMare($))
    } catch (error) {
      logWarn('加载~[HTTP接口后置中间件]', error)
    }
  }

  return [maresBefore, maresAfter]
}
