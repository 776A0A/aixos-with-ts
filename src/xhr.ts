import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'
import { parseHeaders } from './helpers/header'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout = 0 } = config
    const request = new XMLHttpRequest()

    responseType && (request.responseType = responseType)
    timeout && (request.timeout = timeout)

    request.open(method.toLocaleUpperCase(), url, true)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return
      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 拿到的结果是一个字符串，所以需要转换为对象
      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      handleResponse(response)
    }

    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    data &&
      Object.entries(headers).forEach(([name, val]) => {
        request.setRequestHeader(name, val as string)
      })
    request.send(data)

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) resolve(response)
      else
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            response.status,
            request,
            response
          )
        )
    }
  })
}
