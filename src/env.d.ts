/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'particles.js'

declare module 'aplayer'

// eslint-disable-next-line no-unused-vars
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // 更多环境变量...
}

declare module '@/components/particles/util/particles.js'

declare module 'dynamics.js'

declare module 'mavon-editor'
