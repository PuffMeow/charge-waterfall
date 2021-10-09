export interface TOptions {
  /** 装载图片的父容器 */
  container: string | Element | null
  /** 初始化数据源 */
  initialData: TDataSource[]
  /** 装载img标签的外层盒子class属性，默认 waterfall-img-container */
  imgContainerClass?: string
  /** img标签的class属性，默认 waterfall-img */
  imgClass?: string
  /** 装载img标签图片底部内容盒子的class属性，默认 waterfall-bottom-container */
  bottomContainerClass?: string
  /**每一列的宽度 */
  width?: number
  /** 水平方向展示的列数 */
  column?: number
  /** 元素水平间距 */
  gapX?: number
  /** 元素垂直间距 */
  gapY?: number
  /** 图片加载失败时会加载这里设置的默认占位图 */
  defaultImgUrl?: string
  /** 是否响应式改变布局宽度 */
  resizable?: boolean
  /** 触底事件触发时离底部的距离 */
  bottomDistance?: number
  /** 点击对应的项，回调参数是对应项的dataSource和点击event事件 */
  onClick?: (dataSource: TDataSource, event: Event) => void
  /** 传入要渲染的元素模板字符串，例如 `<div>Title</div>` */
  render?: (dataSource: TDataSource) => string
}

export interface TDataSource<T = any> {
  /** 图片url地址 */
  src?: string
  /** 自定义的data数据，如果在TS中使用可以通过泛型来定义data中的类型 */
  data: T
  alt?: string
}