/**
 * 业务错误
 */

export enum BUSINESS_ERROR_CODE {
  NOT_FOUND = 40004,
  PASSWORD_ERROR = 40003
}

export class BusinessError extends Error {

  public code = 200
  public message = ''

  constructor(code, message) {
    super()
    this.code = code
    this.message = message
  }
}