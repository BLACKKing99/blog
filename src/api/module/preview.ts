import http from '../index'
import { IPreviewPhtot, IPreviewSwiper } from '../types'
export const getSwiper = () => {
  return http.request<IPreviewSwiper[]>({
    url: '/preview/swiper',
    method: 'GET'
  })
}

export const getBanner = () => {
  return http.request<string>({
    url: '/preview/banner',
    method: 'GET'
  })
}

export const getPhotos = (params?:IPreviewPhtot) => {
  return http.request<string[]>({
    url: '/preview/photos',
    method: 'GET',
    params
  })
}
