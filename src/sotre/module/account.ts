import { defineStore } from 'pinia'
import { register, login } from '@/api/module/user'
import { IRegisterType, IUserBackData, IUserInfoType } from '@/api/types/user'
import { router } from '@/router/index'
import LocalCatch from '@/util/LocalCatch'
import { ElMessage } from 'element-plus'
import { IResponse } from '@/util/axios/types'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      userInfo: LocalCatch.getItem('lzf_blog')?.userInfo as IUserInfoType | null,
      token: LocalCatch.getItem('lzf_blog')?.token,
      isLoading: false
    }
  },
  getters: {},
  actions: {
    async loginTodo (userInfo:IRegisterType, type:'login'|'register') {
      try {
        let res:IResponse<IUserBackData>
        if (type === 'login') {
          res = await login(userInfo)
        } else {
          res = await register(userInfo)
        }
        console.log(res, '3433333333')

        if (res.code === 0) {
          this.$patch((state) => {
            state.userInfo = res.data.user
            state.token = res.data.token
          })
          LocalCatch.setItem('lzf_blog', { token: res.data.token, userInfo: res.data.user })
          ElMessage({
            type: 'success',
            message: type === 'login' ? '登录成功' : '注册成功'
          })
          if (type === 'register') {
            ElNotification({
              title: '账号',
              message: `您的账号是${res.data.user.account}`,
              type: 'success'
            })
          }
          this.isLoading = false
          if (router.currentRoute.value.query.redirect) {
            router.push(router.currentRoute.value.query.redirect as string)
          } else {
            router.push({
              name: 'preview'
            })
          }
        } else {
          this.isLoading = false
        }
      } catch (error) {
        this.isLoading = false
      }
    }
  }
})
