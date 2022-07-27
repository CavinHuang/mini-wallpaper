
export interface IUser {
  id?: number
  username?: string
  password?: string
  email?: string
  status?: number
  avatar?: string
  desc?: string
  token?: string
  user_roles?: number[]
}
export interface IEmail {
  id?: number
  email: string
  code?: string
  exp?: number
}

export interface ILog {
  id?: number
  user_id?: number
  api_user_agent?: string
  api_sql_duration?: number
  api_from?: number
  api_ip?: string
  api_hostname?: string
  api_method?: string
  api_path?: string
  api_query?: string
  api_body?: string
  api_err_msg?: string
  api_err_stack?: string
}

/**
 * api options
 */
export interface ApiOptions {
  skipPerm: boolean
  parseResult: boolean
}
