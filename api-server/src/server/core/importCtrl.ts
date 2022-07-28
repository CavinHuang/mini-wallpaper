import { isDev, dirController } from '../../config'
import ReaddirRecur from 'fs-readdir-recursive'
import path from 'path'

const appendExt = isDev ? '.api.ts' : '.api.js'

export const initRoute = async (pathAPP) => {
  const filesAPP = ReaddirRecur(pathAPP)
  await filesAPP.filter((file) => file.endsWith(appendExt)).forEach(async(file) => {
    const filePath = path.join(dirController, file)
    console.log(filePath)
    await import(filePath)
  })
}