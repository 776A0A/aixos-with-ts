const toString = Object.prototype.toString

// 类型谓词，可以使得在进入成功的条件分支时带有提示功能
// 这整个函数就是一个谓词
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return typeof val === 'object' && val
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// 交叉类型
export function extend<T, U>(t: T, u: U): T & U {
  for (const key in u) {
    ;(t as T & U)[key] = u[key] as any
  }
  return t as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.entries(obj).forEach(([key, val]) => {
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) result[key] = deepMerge(result[key], val)
          else result[key] = deepMerge(val)
        } else result[key] = val
      })
    }
  })

  return result
}
