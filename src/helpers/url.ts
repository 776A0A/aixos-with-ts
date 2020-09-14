import { isDate, isObject } from './util'

function encode(val: string): string {
  // 保留一些特殊字符不要序列化
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+') // 将空格替换为+号
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 将params拼接到url后面
export default function buildURL(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val == null) return // 参数值为 null 或者 undefined 时直接略过该参数
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]' // 值为数组，给键值添加一个[]
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`) // 注意序列化字符
    })
  })

  const serializedParams = parts.join('&')
  const hashIndex = url.indexOf('#')
  if (hashIndex !== -1) url = url.slice(0, hashIndex) // 去掉hash后的字符
  url += url.includes('?') ? '&' : '?' + serializedParams

  return url
}
