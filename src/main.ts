import { createApp } from 'vue'
import App from './App.vue'

// 引入默认的css
import '@/assets/css/index.css'
// 引入自己写的css
import '@/styles/index.scss'
import { setupPlugin } from './plugin'

const mountedApp = () => {
  const app = createApp(App)
  setupPlugin(app)
  app.mount('#app')
}

mountedApp()
