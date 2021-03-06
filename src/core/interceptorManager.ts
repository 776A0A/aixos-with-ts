import { ResolvedFn, RejectedFn } from '../types/index'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 只做保存拦截器
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null> = []

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length - 1
  }

  eject(id: number): void {
    if (this.interceptors[id]) this.interceptors[id] = null
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor)
    })
  }
}
