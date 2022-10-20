import http from '../index'
import { IArticle, IArticleInfo, IArticleType, ICommentData, ICommentType } from '../types/article'
export const getArticleType = () => {
  return http.request<IArticleType[]>({
    url: 'category',
    method: 'GET'
  })
}

export const createArticle = (data:IArticle) => {
  return http.request({
    url: 'article',
    method: 'POST',
    data
  })
}

export const getArticle = () => {
  return http.request<IArticleInfo[]>({
    url: 'article',
    method: 'GET'
  })
}

export const getArticleInfo = (id:string) => {
  return http.request<IArticleInfo>({
    url: 'article/info',
    method: 'GET',
    params: {
      id
    }
  })
}

export const getAllComment = (id:number) => {
  return http.request<ICommentData>({
    url: 'comment',
    method: 'GET',
    params: {
      id
    }
  })
}

export const createComment = (data:ICommentType) => {
  return http.request({
    url: 'comment',
    method: 'POST',
    data
  })
}

export const recomendArticle = () => {
  return http.request<IArticleInfo[]>({
    url: 'article/recommend',
    method: 'GET'
  })
}

export const populateArticle = () => {
  return http.request<IArticleInfo[]>({
    url: 'article/populate',
    method: 'GET'
  })
}
