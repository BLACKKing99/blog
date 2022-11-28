import { Ref } from 'vue'
import dynamics from 'dynamics.js'

export const useAnimation = () => {
  const addClass = <T = HTMLDivElement>(htmlRef:Ref<T[] | null>) => {
    for (let i = 0; i < htmlRef.value!.length; i++) {
      dynamics.animate(htmlRef.value![i], {
        translateX: '150%',
        opacity: 1
      }, {
        type: dynamics.gravity,
        duration: 500,
        bounciness: 279,
        elasticity: 89,
        delay: i * 350
      })
    }
  }
  return {
    addClass
  }
}
