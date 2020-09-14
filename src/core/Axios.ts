import { AxiosRequestConfig, AxiosPromise, Method } from '../types/index'
import dispatchRequest from './dispatchRequest'

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
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
