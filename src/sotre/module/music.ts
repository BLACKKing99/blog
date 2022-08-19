import { defineStore } from 'pinia'
import { getMusicLyric, getMusicUrl } from '@/api2/module/song'
import LocalCatch from '@/util/LocalCatch'

export interface IMusicInfo{
    id:number,
    url:string,
    singer:string,
    musicName:string,
    cover:string,
    totalTime:number
    singerId:number
}

export interface IMusicLyric {
  lrc: string
  mill: string
  min: string
  sec: string
  time: number
  active:boolean
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
        const lyric = data.lrc.lyric as string
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
      // 看下历史播放列表里面是否有这首歌
      const index = this.musicHistoryList.findIndex(item => item.id === id)
      const music = { ...obj }
      if (index === -1) {
        // 没有，请求数据
        const { data } = await getMusicUrl(id)
        console.log(data, '2222333')

        music.url = data.data[0].url
      } else {
        // 有，直接从历史记录中获取url
        music.url = this.musicHistoryList[index].url
      }
      this.setMusicList(id, music)
    },
    async setCurrentMusicInfo (id:number, obj:IMusicInfo) {
      // 从历史列表中查找 是否有缓存 如果说有缓存就没必要请求数据了
      const index = this.musicHistoryList.findIndex(item => item.id === id)
      const music = { ...obj }
      if (index === -1) {
        // 说明列表里面没有 再去请求数据
        const { data } = await getMusicUrl(id)
        music.url = data.data[0].url
      } else {
        // 有，直接从历史记录中获取url
        music.url = this.musicHistoryList[index].url
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
    }
  }
})

const handleLyric = (str:string) => {
  let arr = str.split(/[(\f\n)\r\t\v]/).map((item, i) => { // 用正则的换行符分割
    const min = item.slice(1, 3)
    const sec = item.slice(4, 6)
    let mill = item.slice(7, 10)
    let lrc = item.slice(11, item.length)
    const active = false
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
    if (isNaN(Number(mill))) { // 判断是不是数字 不是的话进行二次分割  有些还是这种格式的 53]
      mill = item.slice(7, 9)
      lrc = item.slice(10, item.length)
      time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill) // 把分钟变成秒，秒变成毫秒
    }
    return { min, sec, mill, lrc, time, active }
  })
  arr.forEach((item, i) => { // 由于后端返回的数据中，可能会有空的歌词，会让高亮的短暂消失，这边处理下
    if (item.lrc === '' && i !== 0) {
      arr[i - 1] = {
        ...arr[i - 1],
        ...item,
        time: arr[i - 1].time,
        lrc: arr[i - 1].lrc
      }
    }
  })

  arr = arr.filter(item => item.lrc)
  return arr
}
