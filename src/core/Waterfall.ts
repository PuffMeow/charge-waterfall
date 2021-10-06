import { debounce, throttle } from "../utils/index";
import type { TOptions } from "./types";

export default class Waterfall {
  private options
  private items: HTMLElement[] = []  //存储子元素
  private itemHeight: number[] = []  //每列的宽度

  constructor(options: TOptions) {
    this.options = options
    this.init()
  }

  private init = () => {
    let { resizable = false } = this.options
    if (typeof this.options.container === 'string') {
      if (!this.options.container.startsWith('.') && !this.options.container.startsWith('#')) {
        throw Error(`请按照标准的dom查询条件传入，如'.container'或'#container'`)
      }

      this.options.container = document.querySelector<HTMLElement>(this.options.container)
    }

    if (!this.options.container) {
      throw Error('container实例不存在，请检查')
    }

    this.createImg()
    this.items = Array.from((this.options.container as HTMLElement).children) as HTMLElement[]
    resizable && this.resize()

    window.onload = () => {
      this.computePosition()
    }
  }

  private createImg = () => {
    const { dataSource, onClick, imgContainerClass = 'waterfall-img-container', imgClass = 'waterfall-img' } = this.options
    const fragment = document.createDocumentFragment()
    dataSource.forEach((item, index) => {
      const div = document.createElement('div')
      div.className = imgContainerClass
      const img = document.createElement('img')
      img.src = item.src
      img.alt = item?.alt || 'image'
      img.className = imgClass
      div.onclick = (e) => {
        onClick?.(index, item.src, e)
      }
      div.appendChild(img)
      fragment.appendChild(div)
    });
    (Array.from(fragment.children) as HTMLElement[]).forEach(child => {
      child.style.opacity = '0'
    });
    (this.options.container as HTMLElement).append(fragment)
  }

  private computePosition = () => {
    let { items, options: { gapX = 0, gapY = 0, count = 2, width } } = this
    width = width || (this.options.container as HTMLElement).clientWidth / count || document.body.clientWidth || document.documentElement.clientWidth
    this.itemHeight = new Array(count).fill(0)

    items.forEach(item => {
      const img = item.querySelector('img') as HTMLImageElement
      item.style.width = width + 'px'
      item.style.position = 'absolute'
      img.style.width = width + 'px'
      if (!img) {
        throw Error('container容器中不存在img元素')
      }
      let idx = this.itemHeight.indexOf(Math.min(...this.itemHeight))  //找到高度最小的元素的下标
      item.style.left = idx * (width! + gapX) + 'px'
      item.style.top = this.itemHeight[idx] + 'px'
      this.itemHeight[idx] += (img.height * width! / img.width) + gapY

      item.style.transition = 'opacity 0.3s'
      item.style.opacity = '1'
    });

    this.refreshContainerHeight()
  }

  private refreshContainerHeight = () => {
    (this.options.container as HTMLElement).style.height = Math.max(...this.itemHeight) + 'px'
  }

  private throttleResize = throttle(() => {
    this.computePosition()
  }, 100)

  private resize = () => {
    window.addEventListener('resize', this.throttleResize)
  }

  onReachBottom = (reachBottomCallback: () => void) => {
    window.addEventListener('scroll', debounce(() => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement

      if ((clientHeight + scrollTop + 100 >= scrollHeight)) {
        reachBottomCallback()
      }
    }, 150))
  }

  destroy = () => {
    window.removeEventListener('resize', this.throttleResize)
  }
}