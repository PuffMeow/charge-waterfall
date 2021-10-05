export function throttle(fn: Function, wait: number = 300) {
  let prev = +new Date()

  return function (this: any, ...args: any[]) {
    let now = +new Date()

    if (now - prev > wait) {
      fn.apply(this, args)
      prev = +new Date()
    }
  }
}