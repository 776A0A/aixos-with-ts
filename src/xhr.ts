import { AxiosRequestConfig } from './types/index'

export default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()
  request.open(method.toLocaleUpperCase(), url, true)
  data &&
    Object.entries(headers).forEach(([name, val]) => {
      request.setRequestHeader(name, val as string)
    })
  request.send(data)
}
