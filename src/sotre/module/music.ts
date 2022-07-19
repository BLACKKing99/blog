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
export const useMusicStore = defineStore('music', {
  state: () => {
    return {
      currentMusicInfo: (musicList[0] || {}) as ICurrentMusicInfo,
      musicList: musicList
    }
  },
  actions: {
    setCurrentMusic (index:number) {
      // 不请求数据 从musicList 中获取获取的信息
      this.currentMusicInfo = this.musicList[index]
    },
    setCurrentMusicInfo (id:number, obj:ICurrentMusicInfo) {
      this.getMusicUrlData(id, obj)
    },
    async getMusicUrlData (id:number, obj:ICurrentMusicInfo) {
      const obj2 = { ...obj }
      const { data } = await getMusicUrl(id)
      this.currentMusicInfo.url = data.data[0].url
      obj2.url = data.data[0].url
      this.setMusicList(id, obj2)
    },
    setMusicList (id:number, obj:ICurrentMusicInfo) {
      const index = this.musicList.findIndex(item => {
        return item.id === id
      })
      if (index !== -1) {
        // 说明播放列表里面有这首音乐 并且将它放到第一首
        this.musicList.splice(index, 1)
      }
      this.musicList.unshift(obj)
      LocalCatch.setItem('musicList', this.musicList)
    }
  }
})
