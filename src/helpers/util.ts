const toString = Object.prototype.toString

// 返回一个类型谓词，可以使得在进入成功的条件分支时带有提示功能
export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return typeof val === 'object' && val
}
