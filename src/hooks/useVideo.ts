import useTimeFormat from './useTimeFormat'
import { useFullscreen } from '@vueuse/core'
import { Ref } from 'vue'
export const useVideo = (url:Ref<string>) => {
  // 视频实例
  const videoRef = ref<HTMLVideoElement|null>(null)
  // 视频最大化方法
  const { toggle } = useFullscreen(videoRef)
  // 是否在播放音乐
  const isVideoPlay = ref<boolean>(false)
  // 视频播放的时间（百分比）
  const videoTime = ref<number>(0)
  // 视频播放更新的时间
  const updateTime = ref<string>('00:00')

  const { formatTimeTodo } = useTimeFormat()
  watch(() => url.value, () => {
    // 视频播放暂停
    videoRef.value?.addEventListener('pause', () => {
      isVideoPlay.value = false
    })
    // 视频播放开始
    videoRef.value?.addEventListener('play', () => {
      isVideoPlay.value = true
    })
    // 视频播放时间更新
    videoRef.value?.addEventListener('timeupdate', () => {
      updateTime.value = formatTimeTodo((videoRef.value?.currentTime as number) * 1000, 'mm:ss')
      videoTime.value = Number(((videoRef.value?.currentTime || 0) / (videoRef.value?.duration || 1) * 100).toFixed(2))
    })
  })

  onUnmounted(() => {
    videoRef.value?.removeEventListener('pause', () => {
      isVideoPlay.value = false
    })
    // 视频播放开始
    videoRef.value?.removeEventListener('play', () => {
      isVideoPlay.value = true
    })
    // 视频播放时间更新
    videoRef.value?.removeEventListener('timeupdate', () => {
      updateTime.value = formatTimeTodo((videoRef.value?.currentTime as number) * 1000, 'mm:ss')
      videoTime.value = Number(((videoRef.value?.currentTime || 0) / (videoRef.value?.duration || 1) * 100).toFixed(2))
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
