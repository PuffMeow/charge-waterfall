import { debounce, loadAsyncImage, throttle } from "../utils/index";
import type { TOptions } from "./types";

export default class Waterfall {
  private options
  private items: HTMLElement[] = []  //存储子元素
  private itemHeight: number[] = []  //每列的宽度
  private store: any = {}

  constructor(options: TOptions) {
    this.options = options
    this.initDefaultValue()
    this.init()
  }

  private initDefaultValue = () => {
    const { imgContainerClass, imgClass, bottomContainerClass } = this.options
    if (!imgContainerClass) this.options.imgContainerClass = 'waterfall-img-container'
    if (!imgClass) this.options.imgClass = 'waterfall-img'
    if (!bottomContainerClass) this.options.bottomContainerClass = 'waterfall-bottom-container'
  }

  private init = async () => {
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

    const items = Array.from((this.options.container as HTMLElement).children) as HTMLElement[]
    if (items.length) {
      throw Error('container中存在其它元素，请确保container容器中没有其它子元素')
    }

    await this.createContent()
    this.items = Array.from((this.options.container as HTMLElement).children) as HTMLElement[];
    (this.options.container as HTMLElement).style.position = 'relative'
    resizable && this.resize()
    this.computePosition()
  }

  private createContent = async () => {
    const { dataSource,
      onClick,
      imgClass,
      imgContainerClass,
      bottomContainerClass,
      render
    } = this.options
    await Promise.allSettled(this.options.dataSource.map(item => loadAsyncImage(item.src)))

    const fragment = document.createDocumentFragment();
    dataSource.forEach((item, index) => {
      const div = document.createElement('div')
      div.className = imgContainerClass!
      const img = document.createElement('img')
      img.src = item.src
      img.alt = item?.alt || 'image'
      img.className = imgClass!
      div.onclick = (e) => {
        onClick?.(index, item, e)
      }
      div.appendChild(img)

      if (render) {
        const bottomBox = document.createElement('div')
        bottomBox.className = bottomContainerClass!
        bottomBox.style.marginTop = '-4px'
        bottomBox.innerHTML = render(item)
        div.appendChild(bottomBox)
      }

      fragment.appendChild(div)
    });
    (this.options.container as HTMLElement).append(fragment)

  }

  private computePosition = () => {
    requestAnimationFrame(() => {
      let { items, options: { gapX = 0, gapY = 0, count = 2, width, bottomContainerClass, render } } = this
      width = width || (this.options.container as HTMLElement).clientWidth / count || document.body.clientWidth || document.documentElement.clientWidth
      this.itemHeight = new Array(count).fill(0)

      items.forEach(item => {
        item.style.opacity = '0'
        const img = item.querySelector('img') as HTMLImageElement
        let imgContainerHeight
        item.style.width = width + 'px'
        item.style.position = 'absolute'
        img.style.width = width + 'px'

        if (render) {
          const bottomContainer = item.querySelector(`.${bottomContainerClass}`) as HTMLElement
          imgContainerHeight = img.height + (bottomContainer?.clientHeight || 0)
        } else {
          imgContainerHeight = img.height
        }

        let idx = this.itemHeight.indexOf(Math.min(...this.itemHeight))  //找到高度最小的元素的下标
        item.style.left = idx * (width! + gapX) + 'px'
        item.style.top = this.itemHeight[idx] + 'px'
        this.itemHeight[idx] += (imgContainerHeight * width! / width!) + gapY
        item.style.transition = 'opacity 0.3s'
        item.style.opacity = '1'
      });

      this.refreshContainerHeight()
    })
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
    window.addEventListener('scroll', this.store.debounceScroll = debounce(() => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement

      if ((clientHeight + scrollTop + 100 >= scrollHeight)) {
        reachBottomCallback()
      }
    }, 150))
  }

  destroy = () => {
    window.removeEventListener('resize', this.throttleResize)
    window.removeEventListener('scroll', this.store.debounceScroll)
  }
}