import LHttp from '@/util/axios'

const http = new LHttp({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000
})

export default http
