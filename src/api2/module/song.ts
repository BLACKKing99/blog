import lRequest from '../index'

export interface IHotType {
  limit?:number,
  cat?:string,
  offset?:number,
  order?:'hot'|'new'
}
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
export const getSheetList = (params?:ISheetDetail) => {
  return lRequest.lrequest({
    url: '/playlist/track/all',
    params
  })
}

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

export const getBoutique = (params?:IBoutique) => {
  return lRequest.lrequest({
    url: '/top/playlist/highquality',
    params
  })
}
