import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import {
  ElementPlusResolver,
  VueUseComponentsResolver,
  ElementUiResolver
} from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      'components/': `${resolve(__dirname, 'src/components')}/`,
      'views/': `${resolve(__dirname, 'src/views')}/`,
      'api/': `${resolve(__dirname, 'src/api')}/`
    }
  },
  plugins: [
    vue(),
    AutoImport({
      dts: './presets/types/auto-imports.d.ts',
      imports: ['vue', 'vue-router'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dts: './presets/types/components.d.ts',
      resolvers: [ElementPlusResolver(), VueUseComponentsResolver(), ElementUiResolver()]
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true,
    hmr: true,
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'http://127.0.0.1:3000', // 后端服务实际地址
        changeOrigin: true, // 开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variable.scss";'
      }
    }

  }
})
