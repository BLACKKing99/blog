import axios, { AxiosInstance } from 'axios'
import type { LAxiosRequestConfig, LInterceptors } from '@/api/types/index'
import { ElLoading } from 'element-plus'
import { router } from '@/router/index'
import LocalCatch from './LocalCatch'

class LRequest {
  instance: AxiosInstance
  interceptors: LInterceptors | undefined
  loading:any
  isLoading?: boolean
  constructor (config: LAxiosRequestConfig) {
    // 创建axios 实例
    this.instance = axios.create(config)
    // 创建axios 每个接口地址的拦截器
    this.interceptors = config.interceptors
    // 创建 loading
    this.isLoading = config.isLoading ?? true
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsErr
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptors
    )

    // 所有请求的拦截器
    this.instance.interceptors.request.use(
      (res) => {
        if (this.isLoading) {
          // Todo  是否有动画 默认是没有
          this.loading = ElLoading.service({
            lock: false,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return res
      },
      (err) => {
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (res:any) => {
        if (res?.response?.status === 400) {
          ElMessage({
            type: 'error',
            message: res.response.data.errors[0]
          })
        } else if (res?.response?.status === 401) {
          ElMessage({
            type: 'error',
            message: res.response.data
          })
        } else if (res?.response?.status === 403) {
          ElMessage({
            type: 'error',
            message: '请重新登录'
          })
          router.push({
            name: 'login',
            query: {
              redirect: router.currentRoute.value.fullPath
            }
          })
          LocalCatch.removeItem('lzf_blog')
        }
        if (this.isLoading) {
          // todo 在这边关闭 loading
          this.loading.close()
        }
        return res
      },
      (err) => {
        if (this.isLoading) {
          // todo 在这边关闭 loading
          this.loading.close()
        }
        return Promise.reject(err)
      }
    )
  }
  // return <T = any>() => {
  //   return res as unknown as T
  // }

  lrequest (config: LAxiosRequestConfig) {
    if (!config.isLoading) {
      this.isLoading = false
    }
    return this.instance.request(config)
  }
}

export default LRequest
