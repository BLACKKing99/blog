import { IArticleInfo } from './article'
export interface IRegisterType {
    password?: string
    email?: string,
    name?: string,
    account?: number | string
}

export interface IUserInfoType extends IRegisterType {
    collect: IArticleInfo[]
    createdAt: string
    identity: 'member' | 'admin'
    sex: string,
    bio: string,
    qq:string
    weixin:string
    career:string
    id: number,
    avatar:string
}

export interface IUserBackData {
    user:IUserInfoType,
    token:string
}
export interface IUploadInfo {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
  url: string;
}
