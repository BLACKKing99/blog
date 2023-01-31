import { App } from 'vue'
import { setupGlobal } from './global'
// 引入vue-router
import Router from '@/router/index'
// 引入pinia
import Store from '@/sotre'
import { setupTailWind } from './tailwindcss'
import { setThemeColor } from './theme'
export const setupPlugin = (app:App) => {
  setupGlobal(app)
  setThemeColor('#ff2e63')
  setupTailWind()
  Router(app)
  Store(app)
}
