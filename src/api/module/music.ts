import http from '../index'
import { IBoutique, IRequestHotType, ISheetDetailBack, ILyric, IVocalist, IHotType, IRequestVocalist, IRequestBoutique, IRequestSheetList, ISheetList, ISingerList, ISingerDetail, ISingerRequestAllList, ISingerAllList, IMusicUrlInfo, IRequestAlbum, IAlbumList, IMvList, IRequestAllMv, IAllMv, IMvDetail } from '../types/music'

// 获取热门歌单
export const getHotType = (params?: IRequestHotType) => {
  return http.request<IHotType>({
    url: '/music/top/playlist',
    params
  })
}

// 获取每个热门歌单列表
export const getSheetList = (params?: IRequestSheetList) => {
  return http.request<ISheetList>({
    url: '/music/playlist/track/all',
    params
  })
}

// 获取每个热门歌单详情
export const getSheetDetail = (params: { id: number }) => {
  return http.request<ISheetDetailBack>({
    url: '/music/playlist/detail',
    params
  })
}

// 获取歌手推荐
export const getVocalist = (params?: IRequestVocalist) => {
  return http.request<IVocalist>({
    url: '/music/artist/list',
    params
  })
}

// 获取精品推荐
export const getBoutique = (params?: IRequestBoutique) => {
  return http.request<IBoutique>({
    url: '/music/top/playlist/highquality',
    params
  })
}

// 获取音乐 url
export const getMusicUrl = (id: number) => {
  return http.request<IMusicUrlInfo[]>({
    url: `/music/song/url?id=${id}`
  })
}

// 获取单首音乐详情
export const getMusicDetail = (id: number) => {
  return http.request({
    url: `/music/song/detail?ids=${id}`
  })
}

// 获取歌词
export const getMusicLyric = (id: number) => {
  return http.request<ILyric>({
    url: '/music/lyric',
    params: {
      id
    }
  })
}

// 获取歌手全部歌曲
// export interface ISingerList {
//   order?:'hot'|'time',
//   limit?:number,
//   offset?:number,
//   id:number
// }

// 获取歌手单曲
export const getSingerList = (id: number) => {
  return http.request<ISingerList>({
    url: '/music/artists',
    params: {
      id
    }
  })
}

// 获取歌手所有单曲
export const getSingerAllList = (params:ISingerRequestAllList) => {
  return http.request<ISingerAllList>({
    url: '/music/artist/songs',
    params
  })
}

// 获取歌手详情
export const getSingerDetail = (id: number) => {
  return http.request<ISingerDetail>({
    url: '/music/artist/detail',
    params: {
      id
    }
  })
}

// 获取歌手详情
export const getAlbum = (params:IRequestAlbum) => {
  return http.request<IAlbumList>({
    url: '/music/artist/album',
    params
  })
}

// 获取歌手详情
export const getMv = (id:number) => {
  return http.request<IMvList>({
    url: '/music/artist/mv',
    params: {
      id
    }
  })
}

// 获取歌手详情
export const getAllMv = (params?:IRequestAllMv) => {
  return http.request<IAllMv[]>({
    url: '/music/mv/all',
    params
  })
}

// 获取mv详情
export const getMvDetail = (id?:number) => {
  return http.request<IMvDetail>({
    url: '/music/mv/detail',
    params: {
      id
    }
  })
}
