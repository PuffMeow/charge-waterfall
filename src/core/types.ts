export interface TOptions {
  container: string | Element | null
  data: imgList[]
  count?: number  //列数
  gap?: number  //间距
}

interface imgList {
  src: string
}