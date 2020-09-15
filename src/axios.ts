import { AxiosInstance, AxiosRequestConfig } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const ctx = new Axios(config)
  const instance = Axios.prototype.request.bind(ctx) // 将request函数取出

  extend(instance, ctx)

  return instance as AxiosInstance
}

export default createInstance(defaults)
