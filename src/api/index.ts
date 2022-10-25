import LHttp from '@/util/axios'
import config from '@/config'
import { apiUtil } from '@/util/api.util'

export const baseURL = apiUtil()

const http = new LHttp({
  baseURL: baseURL + config.noCross,
  timeout: 10000
})

export default http
