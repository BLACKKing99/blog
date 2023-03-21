import { App } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
export const setupMotions = (app:App) => {
  app.use(MotionPlugin)
}
