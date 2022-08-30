import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '../mock'

// eslint-disable-next-line import/prefer-default-export
export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
      app
  }
}
