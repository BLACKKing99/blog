import lRequest from '../index'

export const getRecomendSong = () => {
  return lRequest.lrequest({
    url: '/song/url?id=1960624524'
  })
}
