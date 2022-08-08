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
      currentMusicInfo: (musicList[0] || {}) as IMusicInfo,
      // 音乐播放的列表
      musicList: musicList,
      // 历史音乐播放列表
      musicHistoryList: musicHistoryList,
      // 音乐ref
      audioRef: undefined as HTMLAudioElement | undefined,
      // 当前音乐的歌词
      currentLyric: [] as IMusicLyric[],
      // 当前音乐播放的时间
      currentMusicTime: 0 as number
    }
  },
  actions: {
    initMusicInfo () {
      this.getCurrentLyric(this.currentMusicInfo.id)
    },
    async getCurrentLyric (id:number) {
      const { data } = await getMusicLyric(id)
      const lyric = data.lrc.lyric as string
      this.currentLyric = handleLyric(lyric)
    },
    setCurrentMusicToList (index:number) {
      // 不请求数据 从musicList 中获取获取的信息
      this.currentMusicInfo = this.musicList[index]
    },
    setCurrentMusic (data:IMusicInfo) {
      this.currentMusicInfo = data
    },
    setCurrentMusicInfo (id:number, obj:IMusicInfo, type:'add'|'history') {
      this.getMusicUrlData(id, obj, type)
    },
    async getMusicUrlData (id:number, obj:IMusicInfo, type:'add'|'history') {
      try {
        // 从历史列表中查找 是否有缓存 如果说有缓存就没必要请求数据了
        const index = this.musicHistoryList.findIndex(item => item.id === id)
        const obj2 = { ...obj }
        if (index === -1) {
        // 说明列表里面没有 再去请求数据
          const { data } = await getMusicUrl(id)
          obj2.url = data.data[0].url
          if (type === 'history') {
            this.currentMusicInfo = obj2
          }
        }
        if (type === 'add') {
        // 当点击的是添加音乐列表的时候 再去
          this.setMusicList(id, obj2)
        } else {
          this.setMusicHistoryList(id, obj2)
        }
      } catch (error) {
        ElMessage.error('啊哦~出错了！！')
      }
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
