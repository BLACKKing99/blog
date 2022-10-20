import http from '../index'
import { IArticleInfo } from '../types/article'
import type { IRegisterType, IUploadInfo, IUserBackData, IUserInfoType } from '../types/user'
export const register = (data:IRegisterType) => {
  return http.request<IUserBackData>({
    url: '/register',
    method: 'POST',
    data
  })
}

export const login = (data:Omit<IRegisterType, 'email'|'username'>) => {
  return http.request<IUserBackData>({
    url: '/login',
    method: 'POST',
    data
  })
}

export const uploadAvatar = (data:FormData) => {
  return http.request<IUploadInfo>({
    url: '/upload/avatar',
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return http.request<IUserInfoType>({
    url: '/user',
    method: 'GET'
  })
}

export const updateUserInfo = (data:Partial<IUserInfoType>) => {
  return http.request<IUserInfoType>({
    url: '/user',
    method: 'PUT',
    data
  })
}

export const collectArticle = (data:{
  articleId:number,
  type:'1'|'2' // 1 收藏 2 取消收藏
}) => {
  return http.request({
    url: 'user/collect',
    method: 'POST',
    data
  })
}

export const getCollect = (id?:number) => {
  return http.request<IArticleInfo[]>({
    url: 'user/collect',
    method: 'GET',
    params: {
      id
    }
  })
}
