/**
 * common api
 */
import { request } from '../index'

const http = request({
  baseURL: '/api'
})

export class CommonApi {
  static qiniuToken() {
    return http.get<string>('/qiniu/token')
  }

  static getDict() {
    return http.get<Dict>('/dict/all')
  }
}
