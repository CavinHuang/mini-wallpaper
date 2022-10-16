/**
 * app配置
 */
import { AdminAuth } from '@/admin/middlewares/auth';

export const appConfig = {
  modules: ['admin', 'api'],
  controller: {
    admin: 'controller'
  },
  moduleConfig: {
    admin: {
      middlewares: {
        before: [AdminAuth]
      }
    }
  }
}