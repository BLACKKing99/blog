import { useMusicStore } from '@/sotre/module/music'
import useTimeFormat from './useTimeFormat'

const audioRef = ref<HTMLAudioElement | null>(null)
// 是否在播放音乐
const isAudioPlay = ref<boolean>(false)
// 视频播放的时间（百分比）
const audioTime = ref<number>(0)
// 视频播放更新的时间
const updateTime = ref<string>('00:00')

const activeLrc = ref<number>(0)

export const useAudio = () => {
  const musicStore = useMusicStore()

  const setActiveLrc = ():number => {
    for (const key in musicStore.currentLyric) {
      if ((audioRef.value?.currentTime as number) <= musicStore.currentLyric[key].time) {
        return +key - 1
      }
    }
    return musicStore.currentLyric.length - 1
  }

  const { formatTimeTodo } = useTimeFormat()
  watch(() => musicStore.currentUrl, () => {
    // 视频播放暂停
    audioRef.value?.addEventListener('pause', () => {
      isAudioPlay.value = false
    })
    // 视频播放开始
    audioRef.value?.addEventListener('play', () => {
      isAudioPlay.value = true
    })
    // 视频播放时间更新
    audioRef.value?.addEventListener('timeupdate', () => {
      updateTime.value = formatTimeTodo((audioRef.value?.currentTime as number) * 1000, 'mm:ss')
      audioTime.value = Number(((audioRef.value?.currentTime || 0) / (audioRef.value?.duration || 1) * 100).toFixed(2))

      activeLrc.value = setActiveLrc()
    })
  })

  onMounted(() => {
    // 视频播放暂停
    audioRef.value?.addEventListener('pause', () => {
      isAudioPlay.value = false
    })
    // 视频播放开始
    audioRef.value?.addEventListener('play', () => {
      isAudioPlay.value = true
    })
    audioRef.value?.addEventListener('error', () => {
      musicStore.getMusicUrlData(musicStore.currentMusicInfo.id)
    })
    // 视频播放时间更新
    audioRef.value?.addEventListener('timeupdate', () => {
      // 计算变化时间
      updateTime.value = formatTimeTodo((audioRef.value?.currentTime as number) * 1000, 'mm:ss')
      // 计算百分比
      audioTime.value = Number(((audioRef.value?.currentTime || 0) / (audioRef.value?.duration || 1) * 100).toFixed(2))

      // 获取当前播放的歌词
      activeLrc.value = setActiveLrc()
    })
  })
  return {
    audioRef,
    isAudioPlay,
    audioTime,
    updateTime,
    activeLrc
  }
}
