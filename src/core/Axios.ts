import {
  AxiosRequestConfig,
  AxiosPromise,
  Method,
  AxiosResponse,
  ResolvedFn,
  RejectedFn
} from '../types/index'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => void)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>()
  }

  constructor(public defaults: AxiosRequestConfig) {}

  request(url: any, config: any = {}): AxiosPromise {
    if (typeof url === 'string') config.url = url
    else config = url

    config = mergeConfig(this.defaults, config)

    // 制造一条链，以发请求send作为分隔，以此执行请求和响应拦截器
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]

    // 添加请求拦截器，后添加的先执行
    this.interceptors.request.forEach(interceptor => chain.unshift(interceptor))
    // 添加响应拦截器，后添加的后执行
    this.interceptors.response.forEach(interceptor => chain.push(interceptor))

    let promise = Promise.resolve(config)

    // 用then来拼接调用链
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config)
  }
  delete(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }
  head(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    return this.request(Object.assign(config, { method: 'head', url }))
  }
  options(url: string, config: AxiosRequestConfig = {}): AxiosPromise {
    return this.request(Object.assign(config, { method: 'options', url }))
  }

  post(url: string, data?: any, config: AxiosRequestConfig = {}): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config: AxiosRequestConfig = {}): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config: AxiosRequestConfig = {}): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return this.request(Object.assign(config, { method, url, data }))
  }
  _requestMethodWithoutData(
    method: Method,
    url: string,
    config: AxiosRequestConfig = {}
  ): AxiosPromise {
    return this.request(Object.assign(config, { method, url }))
  }
}
