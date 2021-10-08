import { TDataSource } from "../../dist/index";
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
    const { imgContainerClass, imgClass, bottomContainerClass, column } = this.options
    if (!column) this.options.column = 2
    if (!imgContainerClass) this.options.imgContainerClass = 'waterfall-img-container'
    if (!imgClass) this.options.imgClass = 'waterfall-img'
    if (!bottomContainerClass) this.options.bottomContainerClass = 'waterfall-bottom-container'
  }

  private init = async () => {
    let { resizable = false, initialData, column } = this.options
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
    this.itemHeight = new Array(column).fill(0);
    (this.options.container as HTMLElement).style.position = 'relative'
    resizable && this.resize()
    this.initImage(initialData)
  }

  private initImage = async (dataSource: TDataSource[]) => {
    const containerChildrens = await this.createContent(dataSource);
    this.items = this.items.concat(containerChildrens)
    this.computePosition(containerChildrens)
  }

  private createContent = async (dataSource: TDataSource[] = []) => {
    const {
      onClick,
      imgClass,
      imgContainerClass,
      bottomContainerClass,
      render
    } = this.options
    await Promise.allSettled(dataSource.map(item => item.src && loadAsyncImage(item.src)))
    const containerChildrens: HTMLElement[] = []
    const fragment = document.createDocumentFragment();
    dataSource.forEach(item => {
      const div = document.createElement('div')
      div.className = imgContainerClass!
      if (item.src) {
        const img = document.createElement('img')
        img.src = item.src
        img.alt = item?.alt || 'image'
        img.className = imgClass!
        div.appendChild(img)
      }
      if (render) {
        const bottomBox = document.createElement('div')
        bottomBox.className = bottomContainerClass!
        if (item.src) bottomBox.style.marginTop = '-4px'
        bottomBox.innerHTML = render(item)
        div.appendChild(bottomBox)
      }

      div.onclick = (e) => {
        onClick?.(item, e)
      }
      containerChildrens.push(div)
      fragment.appendChild(div)
    });
    (this.options.container as HTMLElement).append(fragment)

    return containerChildrens
  }

  private computePosition = (containerChildrens: HTMLElement[], isResize: boolean = false) => {
    requestAnimationFrame(() => {
      let { options: { gapX = 0, gapY = 0, column, width, bottomContainerClass, render } } = this
      width = width || (this.options.container as HTMLElement).clientWidth / column!

      isResize && (this.itemHeight = new Array(column).fill(0))

      containerChildrens.forEach(item => {
        item.style.opacity = '0'
        const img = item.querySelector('img') as HTMLImageElement
        if (img) img.style.width = width + 'px'
        let imgContainerHeight
        item.style.width = width + 'px'
        item.style.position = 'absolute'
        // 兼容没有传入图片src的模式
        if (render) {
          const bottomContainer = item.querySelector(`.${bottomContainerClass}`) as HTMLElement
          bottomContainer.style.width = width + 'px'
          imgContainerHeight = (img?.height || 0) + (bottomContainer?.clientHeight || 0)
        } else {
          imgContainerHeight = img?.height || 0
        }

        let idx = this.itemHeight.indexOf(Math.min(...this.itemHeight))  //找到高度最小的元素的下标
        item.style.left = idx * (width! + gapX) + 'px'
        item.style.top = this.itemHeight[idx] + 'px'
        this.itemHeight[idx] += Math.round((imgContainerHeight * width! / width!) + gapY)
        item.style.transition = 'opacity 0.2s'
        item.style.opacity = '1'
      });

      this.refreshContainerHeight()
    })
  }

  private refreshContainerHeight = () => {
    (this.options.container as HTMLElement).style.height = Math.max(...this.itemHeight) + 'px'
  }

  private resize = () => {
    window.addEventListener('resize', this.store.throttleResize = throttle(() => {
      this.computePosition(this.items, true)
    }, 50))
  }

  onReachBottom = (reachBottomCallback: () => void) => {
    const { bottomDistance = 100 } = this.options
    if (bottomDistance < 100) {
      throw Error('bottomDistance，触底事件离底部触发的距离不能小于100')
    }
    window.addEventListener('scroll', this.store.debounceScroll = debounce(() => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement

      if ((clientHeight + scrollTop + bottomDistance >= scrollHeight)) {
        reachBottomCallback()
      }
    }, 100))
  }

  // TODO: 加载更多数据，现在存在问题，在移动端加载了新的数据之后滚动条会滚回顶部
  loadMore = async (dataSource: TDataSource[]) => {
    this.initImage(dataSource);
  }

  destroy = () => {
    window.removeEventListener('resize', this.store.throttleResize)
    window.removeEventListener('scroll', this.store.debounceScroll)
  }
}