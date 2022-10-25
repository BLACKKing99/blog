import { defineStore } from 'pinia'
import { getMusicLyric, getMusicUrl } from '@/api/module/music'
import LocalCatch from '@/util/LocalCatch'
import { IMusicLyric } from '@/api/types/music'
import { handleLyric } from '@/util/music.util'

export interface IMusicInfo{
    id:number,
    url:string,
    singer:string,
    musicName:string,
    cover:string,
    totalTime:number
    singerId:number
}

const musicList: IMusicInfo[] = LocalCatch.getItem('musicList') || []
const musicHistoryList: IMusicInfo[] = LocalCatch.getItem('musicHistoryList') || []
export const useMusicStore = defineStore('music', {
  state: () => {
    return {
      // 音乐是否打开关闭
      isPlayMusic: false,
      // 当前播放的音乐
      currentMusicInfo: (musicHistoryList[0] || {}) as IMusicInfo,
      // 音乐播放的列表
      musicList: musicList,
      // 历史音乐播放列表
      musicHistoryList: musicHistoryList,
      // 音乐ref
      audioRef: undefined as HTMLAudioElement | undefined,
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
    setCurrentMusicToList (index:number) {
      // 不请求数据 从musicList 中获取获取的信息
      if (this.playType === 'list') {
        this.currentMusicInfo = this.musicList[index]
      } else {
        this.currentMusicInfo = this.musicHistoryList[index]
      }
    },
    setCurrentMusic (data:IMusicInfo) {
      // 设置当前播放的音乐  大概率是用于历史播放
      this.currentMusicInfo = data
    },
    async addMusicList (id:number, obj:IMusicInfo) {
      // 将储存的信息更新一下
      this.regetLocalData()
      // 看下历史播放列表里面是否有这首歌
      const index = this.musicHistoryList.findIndex(item => item.id === id)
      const music = { ...obj }
      if (index === -1) {
        // 没有，请求数据
        const { data } = await getMusicUrl(id)
        music.url = data[0].url
      } else {
        // 有，直接从历史记录中获取url
        music.url = this.musicHistoryList[index].url
      }
      this.setMusicList(id, music)
    },
    async setCurrentMusicInfo (id:number, obj:IMusicInfo) {
      console.log(22222222)

      // 将储存的信息更新一下
      this.regetLocalData()
      // 从历史列表中查找 是否有缓存 如果说有缓存就没必要请求数据了
      const index = this.musicHistoryList.findIndex(item => item.id === id)
      const music = { ...obj }
      if (index === -1) {
        // 说明列表里面没有 再去请求数据
        const { data } = await getMusicUrl(id)
        music.url = data[0]?.url
      } else {
        // 有，直接从历史记录中获取url
        music.url = this.musicHistoryList[index]?.url
      }
      this.setCurrentMusic(music)
      this.setMusicHistoryList(id, music)
    },
    setMusicList (id:number, obj:IMusicInfo) {
      // 设置播放列表
      const index = this.musicList.findIndex(item => {
        return item.id === id
      })
      if (index !== -1) {
        // 说明播放列表里面有这首音乐 并且将它放到第一首
        ElMessage.error('该列表中已有这首歌')
      } else {
        this.musicList.push(obj)
      }
      LocalCatch.setItem('musicList', this.musicList)
    },
    setMusicHistoryList (id:number, obj:IMusicInfo) {
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
