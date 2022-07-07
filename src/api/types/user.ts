import { IArticleInfo } from './article'
export interface IRegisterType {
    password?: string
    email?: string,
    username?: string,
    account?: number | string
}

export interface IUserInfoType extends IRegisterType {
    collectArticle: IArticleInfo[]
    createdAt: string
    identity: 'member' | 'admin'
    sex: string,
    bio: string,
    qq:string
    weixin:string
    career:string
    __v: 0
    _id: string,
    avatar:string
}
