import { useMusicStore } from '@/sotre/module/music'
import { IMusicDetailInfo } from '@/views/main/music/comps/types'
import { dealMusicData } from '@/views/main/music/comps/util'
import { useEventBus } from './useEventBus'

export const useMusic = () => {
  const musicStore = useMusicStore()
  const { Busemit } = useEventBus()
  const musicPlay = (value:IMusicDetailInfo) => {
    // 处理播放音乐
    const obj = dealMusicData(value)
    musicStore.setCurrentMusicInfo(value.id, obj)
    setTimeout(() => {
      Busemit('play-music')
    }, 100)
  }

  const musicDownload = () => {
    ElNotification.success({
      title: '提示',
      message: '暂时不支持下载哦~~~',
      showClose: false
    })
  }

  const musicAdd = (value:IMusicDetailInfo) => {
    const obj = dealMusicData(value)
    musicStore.currentMusicInfo = reactive({
      ...musicStore.currentMusicInfo,
      ...obj
    })
    musicStore.addMusicList(value.id, obj)
  }

  return {
    musicPlay,
    musicDownload,
    musicAdd
  }
}
