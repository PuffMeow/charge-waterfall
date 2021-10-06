export interface TOptions {
  /** 装载图片的父容器 */
  container: string | Element | null
  /** 图片数据源 [{src: "xxx"}] */
  dataSource: TImageList[]
  imgContainerClass?: string
  imgClass?: string
  /**每一列的宽度 */
  width?: number
  /** 水平方向展示的列数 */
  count?: number
  /** 水平间距 */
  gapX?: number
  /** 垂直间距 */
  gapY?: number
  /** 是否响应式改变布局宽度 */
  resizable?: boolean
}

export interface TImageList {
  /** 图片url地址 */
  src: string
  alt?: string
}