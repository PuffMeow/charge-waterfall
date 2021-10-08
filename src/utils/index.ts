export function throttle(fn: Function, wait: number = 100) {
  let prev = +new Date()

  return function (this: any, ...args: any[]) {
    let now = +new Date()

    if (now - prev > wait) {
      fn.apply(this, args)
      prev = +new Date()
    }
  }
}

export function debounce(fn: Function, wait: number = 100) {
  let timer: NodeJS.Timeout | null = null

  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

export function loadAsyncImage(imageUrl: string, defaultUrl: string) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = imageUrl
    img.onload = resolve
    img.onerror = (e) => {
      img.src = defaultUrl
      reject(e)
    }
  })
}