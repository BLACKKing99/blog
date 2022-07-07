import lRequest from '../index'
export const getSwiper = () => {
  return lRequest.lrequest({
    url: '/preview/swiper',
    method: 'GET'
  })
}

export const getBanner = () => {
  return lRequest.lrequest({
    url: '/preview/banner',
    method: 'GET'
  })
}

export const getPhotos = (params?:{
  page?: number,
  limit?: number
}) => {
  return lRequest.lrequest({
    url: '/preview/photos',
    method: 'GET',
    params
  })
}
