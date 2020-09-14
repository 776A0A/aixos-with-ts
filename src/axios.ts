import { AxiosInstance } from './types/index'
import Axios from './core/Axios'
import { extend } from './helpers/util'

function createInstance(): AxiosInstance {
  const ctx = new Axios()
  const instance = Axios.prototype.request.bind(ctx) // 将request函数取出

  extend(instance, ctx)

  return instance as AxiosInstance
}

export default createInstance()
