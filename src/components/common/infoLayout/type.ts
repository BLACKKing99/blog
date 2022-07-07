import { IUserInfoType } from '@/sotre/module/account'
export interface IOptions{
    value:string,
    label:string,
  }
export interface ILayout{
      id: number,
      title: string,
      content: string,
      pid?:keyof IUserInfoType
      type:'input'|'content'|'select'|'radio'
      placeholder?:string,
      options?:IOptions[]
  }
