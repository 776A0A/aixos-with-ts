import { isPlainObject } from './util'

// 统一headerName规范
function normalizedHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name.toLocaleUpperCase() === normalizedName.toLocaleUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizedHeaderName(headers, 'Content-Type')
  // 设置默认值
  if (isPlainObject(data) && headers && !headers['Content-Type'])
    headers['Content-Type'] = 'application/json;charset=utf-8'
  return headers
}

export function parseHeaders(headers: string): void {
  if (!headers) return

  const parsed = Object.create(null)

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLocaleLowerCase()
    if (!key) return
    val && (val = val.trim())
    parsed[key] = val
  })

  return parsed
}
