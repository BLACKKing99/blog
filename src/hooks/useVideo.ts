import useTimeFormat from './useTimeFormat'
import { useFullscreen } from '@vueuse/core'
export const useVideo = () => {
  const videoRef = ref<HTMLVideoElement|null>(null)
  const { toggle } = useFullscreen(videoRef)
  const isVideoPlay = ref<boolean>(false)
  const videoTime = ref<number>(0)
  const updateTime = ref<string>('00:00')
  const { formatTimeTodo } = useTimeFormat()
  onMounted(() => {
    videoRef.value?.addEventListener('pause', () => {
      isVideoPlay.value = false
    })
    videoRef.value?.addEventListener('play', () => {
      isVideoPlay.value = true
    })
    videoRef.value?.addEventListener('timeupdate', () => {
      updateTime.value = formatTimeTodo((videoRef.value?.currentTime as number) * 1000, 'mm:ss')
    })
  })
  return {
    videoRef,
    isVideoPlay,
    videoTime,
    updateTime,
    toggle
  }
}
