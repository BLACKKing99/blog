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
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $imgUrl:string
    AuthHeader:()=>string
  }
}

const app = createApp(App)

app.config.globalProperties.$imgUrl = 'http://127.0.0.1:3000'
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
