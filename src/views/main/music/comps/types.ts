// 弹窗相关的类型
export interface ISheetDetail {
  cover?: string
  name?: string
  description?: string
  tags?: string[]
}
export interface ISingerInfo {
  id: number
  songName: string
  singerInfo: {
    id: number
    name: string
    cover: string
  }
}
