import { AxiosRequestConfig } from 'axios'

export interface IResponse <T = any>{
    code:number,
    message:string,
    data:T
}

export interface IAxiosRequestConfig extends AxiosRequestConfig {
    isLoading?:boolean
}
