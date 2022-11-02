import { App } from 'vue'
import LocalCatch from '@/util/LocalCatch'
import { baseURL } from '@/api'
export const setupGlobal = (app:App) => {
  // 挂载全局对象
  app.config.globalProperties.$imgUrl = baseURL
  app.config.globalProperties.AuthHeader = () => {
    const token = LocalCatch.getItem('lzf_blog')?.token
    if (token) {
      return {
        Authorization: `Bearer ${token}`
      }
    }
  }
}
