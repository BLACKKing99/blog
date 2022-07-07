import LRequest from '@/util/request'

const lRequest = new LRequest({
  baseURL: '/api',
  timeout: 10000,
  interceptors: {
    // 单独一个url的请求器
    requestInterceptors (config: any) {
      return config
    },
    requestInterceptorsErr (err) {
      return err
    },
    responseInterceptors (res) {
      return res
    },
    responseInterceptorsErr (err) {
      return err
    }
  }
})

export default lRequest
