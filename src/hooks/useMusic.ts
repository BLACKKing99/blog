import { useMusicStore } from '@/sotre/module/music'
import LocalCatch from '@/util/LocalCatch'
import { IMusicDetailInfo } from '@/views/main/music/comps/types'
import { useAudio } from './useAudio'

export const useMusic = () => {
  const musicStore = useMusicStore()
  const { audioRef } = useAudio()
  const musicPlay = (value:IMusicDetailInfo, list?:IMusicDetailInfo[]) => {
    // 处理播放音乐
    musicStore.setCurrentMusicInfo(value.id, value)
    if (list) {
      musicStore.palyList = list
      LocalCatch.removeItem('playList')
      LocalCatch.setItem('playList', list)
    }
  }

  const handlePlay = () => {
    // 处理音乐播放或者暂停
    if (!audioRef.value?.src) {
      musicPlay(musicStore.currentMusicInfo)
    }
    if (audioRef.value?.paused) {
      audioRef.value?.play()
    } else {
      audioRef.value?.pause()
    }
  }

  const play = (value:IMusicDetailInfo, list?:IMusicDetailInfo[]) => {
    // 写了多次 总结出来的 具体也不知道咋写
    if (value.id === musicStore.currentMusicInfo.id) {
      handlePlay()
    } else {
      musicPlay(value, list)
    }
  }

  const musicDownload = () => {
    // 音乐下载
    ElNotification.success({
      title: '提示',
      message: '暂时不支持下载哦~~~',
      showClose: false
    })
  }

  const musicAdd = (value:IMusicDetailInfo) => {
    // 将音乐添加到播放列表中
    musicStore.addMusicList(value)
  }

  return {
    musicPlay,
    musicDownload,
    musicAdd,
    handlePlay,
    play
  }
}
