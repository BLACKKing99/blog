import { defineStore } from 'pinia'
import { getMusicUrl } from '@/api2/module/song'
import LocalCatch from '@/util/LocalCatch'

export interface ICurrentMusicInfo{
    id:number,
    url:string,
    singer:string,
    musicName:string,
    cover:string,
    totalTime:number
}
const musicList: ICurrentMusicInfo[] = LocalCatch.getItem('musicList') || []
const musicHistoryList: ICurrentMusicInfo[] = LocalCatch.getItem('musicHistoryList') || []
export const useMusicStore = defineStore('music', {
  state: () => {
    return {
      isPlayMusic: false,
      currentMusicInfo: (musicList[0] || {}) as ICurrentMusicInfo,
      musicList: musicList,
      musicHistoryList: musicHistoryList
    }
  },
  actions: {
    setCurrentMusic (index:number) {
      // 不请求数据 从musicList 中获取获取的信息
      this.currentMusicInfo = this.musicList[index]
    },
    setCurrentMusicInfo (id:number, obj:ICurrentMusicInfo, type:'add'|'history') {
      this.getMusicUrlData(id, obj, type)
    },
    async getMusicUrlData (id:number, obj:ICurrentMusicInfo, type:'add'|'history') {
      const obj2 = { ...obj }
      const { data } = await getMusicUrl(id)
      this.currentMusicInfo.url = data.data[0].url
      obj2.url = data.data[0].url
      if (type === 'add') {
        // 当点击的是添加音乐列表的时候 再去
        this.setMusicList(id, obj2)
      } else {
        this.setMusicHistoryList(id, obj2)
      }
    },
    setMusicList (id:number, obj:ICurrentMusicInfo) {
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
    setMusicHistoryList (id:number, obj:ICurrentMusicInfo) {
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
