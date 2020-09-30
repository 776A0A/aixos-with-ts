import { CancelExecutor, CancelTokenSource, Canceler } from '../types/index'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}
// 本身并没有取消请求的功能，只是通过状态的改变来达到触发then，在then中执行取消
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise

    this.promise = new Promise<Cancel>(resolve => {
      resolvePromise = resolve
    })

    /**
     * 这里传入的这个函数就相当于文档中写的c，将这个c传入，就相当于将控制权交给了用户
     * 用户调用了c就会将内部的promise状态改写为fulfilled
     */

    executor(message => {
      if (this.reason) return

      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequest() {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => {
      cancel = c
    })
    return { cancel, token }
  }
}
