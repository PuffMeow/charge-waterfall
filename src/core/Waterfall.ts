import { throttle } from "../utils/index";
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
      if (!this.options.container.startsWith('.') && !this.options.container.startsWith('#')) {
        throw Error(`请按照标准的dom查询条件传入，如'.container'或'#container'`)
      }

      this.options.container = document.querySelector<HTMLElement>(this.options.container)
    }
    if (!this.options.container) {
      throw Error('container实例不存在，请检查')
    }

    this.items = Array.from(this.options.container.children) as HTMLElement[]
    console.log(this.items)
    this.reset()
    this.render()
  }


  private reset = () => {
    const { count = 2 } = this.options
    this.flag = document.createDocumentFragment()
    this.width = (this.options.container as HTMLElement).clientWidth / count;
    console.log('width', this.width)
    this.itemHeight = new Array(count).fill(0);
    (this.options.container as HTMLElement).innerHTML = ''
  }

  private render = () => {
    const { width, items, itemHeight, flag, options: { gap = 0 } } = this
    requestAnimationFrame(() => {
      items.forEach(item => {
        item.style.width = width + 'px'
        item.style.position = 'absolute'

        const img = (item.querySelector('img') || item) as HTMLImageElement
        if (!img) {
          throw Error('container容器中不存在img元素')
        }
        if (img?.complete) {
          const idx = itemHeight.indexOf(Math.min(...itemHeight))  //找到高度最小的元素的下标
          item.style.left = idx * (width + gap) + 'px'
          item.style.top = itemHeight[idx] + 'px'

          itemHeight[idx] += img.height * width / img.width + gap
          flag?.appendChild(item)
        } else {
          img.addEventListener('load', () => {
            console.log(item.clientHeight)
            const idx = itemHeight.indexOf(Math.min(...itemHeight))  //找到高度最小的元素的下标
            item.style.left = idx * (width + gap) + 'px'
            item.style.top = itemHeight[idx] + 'px'
            itemHeight[idx] += img.height * width / img.width + gap
            flag?.appendChild(item);
            (this.options.container as HTMLElement).append(flag as DocumentFragment)
          })
        }
      });
      (this.options.container as HTMLElement).append(flag as DocumentFragment)
    })
  }

  resize = () => {
    window.addEventListener('resize', throttle(() => {
      this.reset()
      this.render()
    }))
  }
}