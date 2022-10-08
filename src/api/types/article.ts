import { IUserInfoType } from './user'
// 文章类型的interface
export interface IArticleType {
    id: number
    title: string
    createdAt?:Date
    updatedAt?:Date
    tips?:string
}

// 文章需要出给后端的数据结构
export interface ICommentType {
    // 当前文章id
    articleId: number,
    content: string,
    pid?:number
}

// 文章信息的interface
export interface IArticle {
    [propName:string]:string
}

export interface IComment {
    id: number;
    content: string;
    articleId: number;
    pid: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    author:IUserInfoType
}
export interface ICommentData {
    comment:IComment[],
    backComment:IComment[]
}

export interface IArticleInfo {
  id: number;
  title: string;
  content: string;
  tips: string;
  order: number;
  cover: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
}
