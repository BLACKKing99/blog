import lRequest from '../index'
import { IArticle, ICommentType } from '../types/article'
export const getArticleType = () => {
  return lRequest.lrequest({
    url: 'article/type',
    method: 'GET'
  })
}

export const createArticle = (data:IArticle) => {
  return lRequest.lrequest({
    url: 'article/create',
    method: 'POST',
    data
  })
}

export const getArticle = () => {
  return lRequest.lrequest({
    url: 'article',
    method: 'GET'
  })
}

export const getArticleInfo = (id:string) => {
  return lRequest.lrequest({
    url: 'article/info',
    method: 'GET',
    params: {
      id
    }
  })
}

export const createArticleComment = (data:ICommentType) => {
  return lRequest.lrequest({
    url: 'comment/create',
    method: 'POST',
    data
  })
}

export const createBackComment = (data:ICommentType) => {
  return lRequest.lrequest({
    url: 'comment/back',
    method: 'POST',
    data
  })
}

export const collectArticle = (data:{
  id:string,
  type:'1'|'2' // 1 收藏 2 取消收藏
}) => {
  return lRequest.lrequest({
    url: 'article/collect',
    method: 'POST',
    data
  })
}

export const recomendArticle = () => {
  return lRequest.lrequest({
    url: 'article/recommend',
    method: 'GET'
  })
}

export const populateArticle = () => {
  return lRequest.lrequest({
    url: 'article/populate',
    method: 'GET'
  })
}
