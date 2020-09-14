import { AxiosRequestConfig, AxiosResponse } from '../types/index'

export class AxiosError extends Error {
  isAxiosError: boolean = true
  constructor(
    public message: string,
    public config: AxiosRequestConfig,
    public code?: string | number | null,
    public request?: any,
    public response?: AxiosResponse
  ) {
    super(message)

    // 当继承原生类时可能会无法调用到该实例原型上的自定义方法，或者使用instanceof的时候返回false
    // 官方给出的解决方法就是这个
    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}

export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | number | null,
  request?: any,
  response?: AxiosResponse
): AxiosError {
  return new AxiosError(message, config, code, request, response)
}
