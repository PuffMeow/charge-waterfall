type DataType =
  | "undefined"
  | "null"
  | "boolean"
  | "string"
  | "number"
  | "bigint"
  | "object"
  | "symbol"
  | "array"
  | "date"
  | string;

export function getTypeof(data: any): DataType {
  if (!data) return "null";
  return Object.prototype.toString
    .call(data)
    .toLocaleLowerCase()
    .slice(8, -1) as DataType;
}

export function isPlainObject(data: any): data is Object {
  return getTypeof(data) === "object";
}

export function throttle(fn: Function, wait: number = 100) {
  let prev = +new Date();

  return function (this: any, ...args: any[]) {
    let now = +new Date();

    if (now - prev > wait) {
      fn.apply(this, args);
      prev = +new Date();
    }
  };
}

export function debounce(fn: Function, wait: number = 100) {
  let timer: NodeJS.Timeout | null = null;

  return function (this: any, ...args: any[]) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export function loadAsyncImage(imageUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageUrl;
    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => {
        resolve(img);
      };
    }
    img.onerror = (e) => {
      reject(e);
    };
  });
}