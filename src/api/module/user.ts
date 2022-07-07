import lRequest from '../index'
import type { IRegisterType, IUserInfoType } from '../types/user'
export const register = (data:IRegisterType) => {
  return lRequest.lrequest({
    url: '/register',
    method: 'POST',
    data
  })
}

export const login = (data:Omit<IRegisterType, 'email'|'username'>) => {
  return lRequest.lrequest({
    url: '/login',
    method: 'POST',
    data
  })
}

export const uploadAvatar = (data:FormData) => {
  return lRequest.lrequest({
    url: '/upload/avatar',
    method: 'POST',
    data
  })
}

export const getUserInfo = () => {
  return lRequest.lrequest({
    url: '/user',
    method: 'GET'
  })
}

export const updateUserInfo = (data:Partial<IUserInfoType>) => {
  return lRequest.lrequest({
    url: '/user',
    method: 'PUT',
    data
  })
}
