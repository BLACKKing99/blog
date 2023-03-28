export interface IList {
    id:number
    icon:string
    title:string
}

export const list:IList[] = [
  {
    id: 1,
    icon: 'icon-shouye2',
    title: '个人中心'
  },
  {
    id: 2,
    icon: 'icon-tuichu',
    title: '退出登录'
  }
]

export interface IgirdList {
    value:'follow'| 'dynamic'
    count:number
    title:string
}

export const girdList:IgirdList[] = reactive([
  {
    value: 'follow',
    count: 0,
    title: '收藏'
  },
  {
    value: 'dynamic',
    count: 0,
    title: '动态'
  }
])
