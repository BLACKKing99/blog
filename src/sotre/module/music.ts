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

export const useMusicStore = defineStore('music', {
  state: () => {
    return {
      currentMusicInfo: LocalCatch.getItem('musicList') ? LocalCatch.getItem('musicList')[0] : {} as ICurrentMusicInfo,
      musicList: LocalCatch.getItem('musicList') as ICurrentMusicInfo[]
    }
  },
  actions: {
    setCurrentMusic (index:number) {
      // 不请求数据 从musicList 中获取获取的信息
      this.currentMusicInfo = this.musicList[index]
    },
    setCurrentMusicInfo (id:number) {
      this.getMusicUrlData(id)
      console.log('zhix', id)
    },
    async getMusicUrlData (id:number) {
      const { data } = await getMusicUrl(id)
      this.currentMusicInfo.url = data.data[0].url
      this.currentMusicInfo.id = id
      setTimeout(() => {
        this.setMusicList(this.currentMusicInfo)
      }, 300)
    },
    setMusicList (value:ICurrentMusicInfo) {
      if (!this.musicList) {
        this.musicList = []
      }

      const index = this.musicList.findIndex(item => {
        return item.id === value.id
      })
      console.log(value, this.musicList, index)
      if (index !== -1) {
        // 说明播放列表里面有这首音乐 并且将它放到第一首
        this.musicList.splice(index, 1)
        this.musicList.unshift(value)
      } else {
        // 说明没有这首应音乐
        this.musicList.push(value)
      }
      LocalCatch.setItem('musicList', this.musicList)
    }
  }
})
