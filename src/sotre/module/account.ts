import { defineStore } from 'pinia'
import { register, login } from '@/api/module/user'
import { IRegisterType } from '@/api/types/user'
import { router } from '@/router/index'
import LocalCatch from '@/util/LocalCatch'
import { ElMessage } from 'element-plus'

export interface IUserInfoType {
  account: number
  collectArticle: string[]
  bio:string
  createdAt: string
  email: string
  identity: string
  password: string
  sex: string
  career?:string
  qq:string
  weixin:string
  username: string
  __v?: number
  _id: string
}

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      userInfo: LocalCatch.getItem('lzf_blog')?.userInfo as IUserInfoType | null,
      token: LocalCatch.getItem('lzf_blog')?.token
    }
  },
  getters: {},
  actions: {
    async loginTodo (userInfo:IRegisterType, type:'login'|'register') {
      let res:any
      if (type === 'login') {
        res = await login(userInfo)
      } else {
        res = await register(userInfo)
      }
      if (res.status === 200) {
        this.$patch((state) => {
          state.userInfo = res.data.user
          state.token = res.data.token
        })
        LocalCatch.setItem('lzf_blog', { token: res.data.token, userInfo: res.data.user })
        ElMessage({
          type: 'success',
          message: res.data.msg
        })
        if (router.currentRoute.value.query.redirect) {
          router.push(router.currentRoute.value.query.redirect as string)
        } else {
          router.push({
            name: 'preview'
          })
        }
        return new Promise((resolve) => {
          resolve(true)
        })
      }
    }
  }
})
