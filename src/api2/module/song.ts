import lRequest from '../index'

export interface IHotType {
  limit?:number,
  cat?:string,
  offset?:number,
  order?:'hot'|'new'
}

// 获取热门歌单
export const getHotType = (params?:IHotType) => {
  return lRequest.lrequest({
    url: '/top/playlist',
    params
  })
}

export interface ISheetDetail {
  id:number
  limit?:number
  offset?:number
}

// 获取每个热门歌单列表
export const getSheetList = (params?:ISheetDetail) => {
  return lRequest.lrequest({
    url: '/playlist/track/all',
    params
  })
}

// 获取每个热门歌单详情
export const getSheetDetail = (params:{id:number}) => {
  return lRequest.lrequest({
    url: '/playlist/detail',
    params
  })
}

export interface IVocalist{
  limit?:number
  offset?:number
  type?:'-1'|'1'|'2'|'3' // -1 全部 1 男歌手 2 女歌手 3 乐队
  area?:'-1'|'7'|'96'|'8'|'16'|'0' // -1全部 7华语 96欧美 8日本 16韩国 0其他
}

// 获取歌手推荐
export const getVocalist = (params?:IVocalist) => {
  return lRequest.lrequest({
    url: '/artist/list',
    params
  })
}

export interface IBoutique{
  limit?:number
  before?:number | undefined
  cat?:string
}

// 获取精品推荐
export const getBoutique = (params?:IBoutique) => {
  return lRequest.lrequest({
    url: '/top/playlist/highquality',
    params
  })
}

// 获取音乐 url
export const getMusicUrl = (id:number) => {
  return lRequest.lrequest({
    url: `/song/url?id=${id}`
  })
}

// 获取单首音乐详情
export const getMusicDetail = (id:number) => {
  return lRequest.lrequest({
    url: `/song/detail?ids=${id}`
  })
}

// 获取歌词
export const getMusicLyric = (id:number) => {
  return lRequest.lrequest({
    url: '/lyric',
    params: {
      id
    }
  })
}

// 获取歌手全部歌曲
// 获取歌手单曲
// export interface ISingerList {
//   order?:'hot'|'time',
//   limit?:number,
//   offset?:number,
//   id:number
// }
export const getSingerList = (id:number) => {
  return lRequest.lrequest({
    url: '/artists',
    params: {
      id
    }
  })
}
