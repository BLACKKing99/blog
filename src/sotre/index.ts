import { App } from 'vue'
import { createPinia } from 'pinia'
import { useArticleStore } from './module/article'

const store = createPinia()
export default (app: App<Element>) => {
  app.use(store)
  useArticleStore().setCategory()
}

export { store }
