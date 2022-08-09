import { IMusicInfo } from '@/sotre/module/music'
import { IMusicDetailInfo } from './types'

export const dealMusicData = (value:IMusicDetailInfo):IMusicInfo => {
  const { cover, singerInfo, songName, id, totalTime } = value
  const obj = {
    totalTime,
    musicName: songName,
    singer: singerInfo.name,
    singerId: singerInfo.id,
    cover,
    id,
    url: ''
  }
  return obj
}
