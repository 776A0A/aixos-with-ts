// 类型别名
export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'options'
  | 'OPTIONS'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 继承Promise泛型接口，这里代表resolve的时候传入的是AxiosResponse
export interface AxiosPromise extends Promise<AxiosResponse> {}

// 除了原有的错误信息，还需要添加一些额外的信息以提供用户处理错误
export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | number | null
  request?: any
  response?: AxiosResponse
}
