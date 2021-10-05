import type { TOptions } from "./types";

export default class Waterfall {
  private options
  private width = 0 //每一列的宽度
  private flag: DocumentFragment | null = null  //虚拟节点集合
  private items: HTMLElement[] = []  //存储子元素
  private itemHeight: number[] = []  //每列的宽度

  constructor(options: TOptions) {
    this.options = options
    this.init()
  }

  private init = () => {
    if (typeof this.options.container === 'string') {
      this.options.container = document.querySelector(this.options.container) as HTMLElement
    }
    if (!this.options.container) {
      throw Error('container实例不存在，请检查')
    }

    this.items = Array.from(this.options.container.children) as HTMLElement[]
    this.reset()
    this.render()
  }


  private reset = () => {
    const { count = 2 } = this.options
    this.flag = document.createDocumentFragment()
    this.width = (this.options.container as Element).clientWidth / count
    this.itemHeight = new Array(count).fill(0);
    (this.options.container as Element).innerHTML = ''
  }

  private render = () => {
    const { width, items, itemHeight, flag, options: { gap = 0, data } } = this
  }
}