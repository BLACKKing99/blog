import { defineStore } from 'pinia'
import { getMusicLyric, getMusicUrl } from '@/api/module/music'
import LocalCatch from '@/util/LocalCatch'
import { IMusicLyric } from '@/api/types/music'
import { handleLyric } from '@/util/music.util'
import { IMusicDetailInfo } from '@/views/main/music/comps/types'

const playList: IMusicDetailInfo[] = LocalCatch.getItem('playList') || []
const musicHistoryList: IMusicDetailInfo[] = LocalCatch.getItem('musicHistoryList') || []
const currentUrl = LocalCatch.getItem('currentUrl') || ''

export const useMusicStore = defineStore('music', {
  state: () => {
    return {
      palyList: playList,
      // 当前音乐的url
      currentUrl,
      // 当前播放的音乐
      currentMusicInfo: (musicHistoryList[0] || {}) as IMusicDetailInfo,
      // 音乐播放的列表
      // 历史音乐播放列表
      musicHistoryList: musicHistoryList,
      // 当前音乐的歌词
      currentLyric: [] as IMusicLyric[],
      // 当前音乐播放的时间
      currentMusicTime: 0 as number,
      // 当前播放选择的列表
      playType: 'list' as 'list'|'history'
    }
  },
  actions: {
    initMusicInfo () {
      this.getCurrentLyric(this.currentMusicInfo.id)
    },
    async getCurrentLyric (id:number) {
      if (id) {
        const { data } = await getMusicLyric(id)
        const lyric = data.lrc.lyric
        this.currentLyric = handleLyric(lyric)
      }
    },
    async addMusicList (obj:IMusicDetailInfo) {
      this.palyList.push(obj)
    },
    // 设置当前音乐信息
    async setCurrentMusicInfo (id:number, obj:IMusicDetailInfo) {
      // 将储存的信息更新一下
      this.regetLocalData()
      // 将当前音乐信息保存至store中
      this.currentMusicInfo = obj
      this.getMusicUrlData(id)
      this.setMusicHistoryList(id, obj)
    },
    playMusic (obj:IMusicDetailInfo) {
      this.currentMusicInfo = obj
      this.getMusicUrlData(obj.id)
      this.setMusicHistoryList(obj.id, obj)
    },
    async getMusicUrlData (id:number) {
      const { code, data } = await getMusicUrl(id)
      if (code === 0) {
        if (data[0].url === null) {
          ElMessage.error('暂无音乐源')
        }
        this.currentUrl = data[0].url
        LocalCatch.setItem('currentUrl', data[0].url)
      }
    },
    setMusicHistoryList (id:number, obj:IMusicDetailInfo) {
      // 历史播放列表
      const index = this.musicHistoryList.findIndex(item => {
        return item.id === id
      })
      if (index !== -1) {
        // 说明播放列表里面有这首音乐 并且将它放到第一首
        this.musicHistoryList.splice(index, 1)
      }
      this.musicHistoryList.unshift(obj)
      LocalCatch.setItem('musicHistoryList', this.musicHistoryList)
    },
    regetLocalData () {
      this.musicHistoryList = LocalCatch.getItem('musicHistoryList') || []
    }
  }
})
