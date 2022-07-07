import { IUserInfoType } from './user'
// 文章类型的interface
export interface IArticleType {
    id: number
    label: string
    value: string
}

export interface ICommentType {
    id: string,
    content: string,
}

// 文章信息的interface
export interface IArticle {
    [propName:string]:string
}

export interface ICommentInfoType{
    articleId: string
    author: IUserInfoType
    childrenComments?:Partial<ICommentInfoType>[]
    content: string
    createdAt: string
    __v: number
    _id: string
}

export interface IArticleInfo {
    author: string
    commentStatus: boolean
    content: string
    createdAt: string
    sort: string
    cover:string
    tips: string
    title: string
    totalComment: ICommentInfoType[]
    type: string
    __v: number
    _id: string
}
