import { IUserBackData } from '@/api/types/user'
import { router } from '@/router/index'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElLoading } from 'element-plus'
import LocalCatch from '../LocalCatch'
// 响应结果的数据类型
import { IAxiosRequestConfig, IResponse } from './types'

class LHttp {
  // axios 实例
  private instance
  private isLoading:boolean
  private loading:any
  constructor (config:AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.isLoading = false
    // 触发请求拦截器和响应拦截器
    this.interceptors()
  }

  public request<T> (config:IAxiosRequestConfig):Promise<IResponse<T>> {
    return new Promise((resolve, reject) => {
      try {
        this.instance.request<IResponse<T>>(config).then((res:AxiosResponse) => {
          this.isLoading = this.isLoading === true
          resolve(res.data)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  //   拦截器
  private interceptors () {
    this.interceptorsRequest()
    this.interceptorsResponce()
  }

  //   请求拦截器
  private interceptorsRequest () {
    this.instance.interceptors.request.use(
      (config) => {
        const res = LocalCatch.getItem('lzf_blog') as IUserBackData
        if (res?.token) {
          config.headers!.Authorization = `Bearer ${res?.token}`
        }
        // 在发送请求之前做些什么
        if (this.isLoading) {
          // Todo  是否有动画 默认是没有
          this.loading = ElLoading.service({
            lock: false,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      }, (error) => {
      // 对请求错误做些什么
        return Promise.reject(error)
      })
  }

  //   响应拦截器
  private interceptorsResponce () {
    this.instance.interceptors.response.use(
      (response) => {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
        if (this.isLoading) {
        // todo 在这边关闭 loading
          this.loading.close()
        }
        return response
      }, (error) => {
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
        if (error.response.status === 400) {
          let str:string = ''
          for (const value of error.response.data.data) {
            str === ''
              ? str = Object.values(value).join('')
              : str = `${str},${Object.values(value).join('')}`
          }
          ElMessage.error(str)
        }
        if (error.response.status === 401) {
          ElMessage.error('身份验证过期')
          const currentPaht = router.currentRoute.value.fullPath
          router.push({
            name: 'login',
            query: {
              redirect: currentPaht
            }
          })
          // ElMessageBox.confirm(
          //   '身份验证过期,是否跳转登录页?',
          //   '提示',
          //   {
          //     confirmButtonText: '是',
          //     cancelButtonText: '否',
          //     type: 'warning'
          //   }
          // ).then(() => {
          //   const currentPaht = router.currentRoute.value.fullPath
          //   router.push({
          //     name: 'login',
          //     query: {
          //       redirect: currentPaht
          //     }
          //   })
          // }).catch(() => {

          // })
        }
        if (error.response.status === 500) {
          ElMessage.error('服务端错误')
        }
        if (this.isLoading) {
        // todo 在这边关闭 loading
          this.loading.close()
        }
        return error
      })
  }
}

export default LHttp
