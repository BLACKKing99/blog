import { Ref } from 'vue'
import dynamics from 'dynamics.js'

interface IAniOptions {
  translateX:string
  opacity:number
  duration:number
  bounciness: number
  elasticity: number
  delay: number
}

export const useAnimation = (optoins = {
  duration: 500,
  bounciness: 279,
  elasticity: 89,
  delay: 350,
  translateX: '150%',
  opacity: 1
} as IAniOptions) => {
  const { bounciness, delay, duration, elasticity, opacity, translateX } = optoins
  const addClass = <T = HTMLDivElement>(htmlRef:Ref<T[] | null>) => {
    for (let i = 0; i < htmlRef.value!.length; i++) {
      dynamics.animate(htmlRef.value![i], {
        translateX,
        opacity
      }, {
        type: dynamics.gravity,
        duration,
        bounciness,
        elasticity,
        delay: i * delay
      })
    }
  }
  return {
    addClass
  }
}
