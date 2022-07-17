// 弹窗相关的类型
export interface ISheetDetail {
  cover?: string
  name?: string
  description?: string
  tags?: string[]
}
export interface IMusicInfo {
  id: number
  songName: string
  cover:string
  totalTime:number
  singerInfo: {
    id: number
    name: string
    cover: string
  }
}
