import { createApp } from 'vue'
import App from './App.vue'
// 引入vue-router
import Router from './router/index'
// 引入pinia
import Store from './sotre/index'
// 引入默认的css
import '@/assets/css/index.css'
// 引入自己写的css
import '@/styles/index.scss'

import './tailwindcss/index.css'

import LocalCatch from './util/LocalCatch'
import { baseURL } from './api'

const app = createApp(App)

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

Router(app)
Store(app)

app.mount('#app')
