import LHttp from '@/util/axios'
import config from '@/config'

export const baseURL = config.onlineURL

const http = new LHttp({
  baseURL: baseURL + config.noCross,
  timeout: 10000
})

export default http
