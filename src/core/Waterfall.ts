import { TDataSource } from "../../dist/index";
import { debounce, loadAsyncImage, throttle } from "../utils/index";
import type { TOptions } from "./types";

export default class Waterfall {
  private options: TOptions = {
    container: null,
    initialData: [],
    imgClass: 'waterfall-img',
    imgContainerClass: 'waterfall-img-container',
    bottomContainerClass: 'waterfall-bottom-container',
    column: 2,
    gapX: 0,
    gapY: 0,
    bottomDistance: 50,
    resizable: true
  }
  private items: HTMLElement[] = []  //存储子元素
  private itemHeight: number[] = []  //每列的高度
  private store: any = {}

  constructor(options: TOptions) {
    this.options = Object.assign(this.options, options)
    this.init()
  }

  private init = async () => {
    let { resizable, initialData, column } = this.options
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
      console.warn(`container中存在其它元素，使用时请确保container为空的容器。当前已为您清空该容器。`)
      this.options.container.innerHTML = ''
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
      render,
      defaultImgUrl = ''
    } = this.options
    const res = await Promise.allSettled(dataSource.map(item => item.src && loadAsyncImage(item.src)))
    const containerChildrens: HTMLElement[] = []
    const fragment = document.createDocumentFragment();

    for (let [index, item] of dataSource.entries()) {
      const div = document.createElement('div')
      div.className = imgContainerClass!
      if (item.src) {
        const img = document.createElement('img')
        img.style.verticalAlign = 'bottom'
        img.src = item.src
        if (res[index].status === 'rejected') {
          try {
            const defaultImg = await loadAsyncImage(defaultImgUrl)
            img.src = defaultImg.src
          } catch (e) {
            console.error(`该默认图片加载失败：${defaultImgUrl}`)
          }
        }
        img.alt = item?.alt || 'image'
        img.className = imgClass!
        div.appendChild(img)
      }
      if (render) {
        const bottomBox = document.createElement('div')
        bottomBox.className = bottomContainerClass!
        bottomBox.innerHTML = render(item)
        div.appendChild(bottomBox)
      }

      div.onclick = (e) => {
        onClick?.(item, e)
      }
      containerChildrens.push(div)
      fragment.appendChild(div)
    }
    (this.options.container as HTMLElement).append(fragment)

    return containerChildrens
  }

  private computePosition = (containerChildrens: HTMLElement[], isResize: boolean = false) => {
    requestAnimationFrame(() => {
      let { options: { gapX, gapY, column, width, bottomContainerClass, render } } = this
      width = width || (this.options.container as HTMLElement).clientWidth / column!

      isResize && (this.itemHeight = new Array(column).fill(0))

      containerChildrens.forEach(item => {
        item.style.opacity = '0'
        const img = item.querySelector('img') as HTMLImageElement
        if (img) img.style.width = width + 'px'
        let imgContainerHeight: number
        item.style.width = width + 'px'
        item.style.position = 'absolute'
        // 兼容没有传入图片src的模式
        if (render) {
          const bottomContainer = item.querySelector(`.${bottomContainerClass}`) as HTMLElement
          bottomContainer.style.width = width + 'px'
          if (img) {
            imgContainerHeight = (img?.height || 30) + (bottomContainer?.clientHeight || 0)
          } else {
            imgContainerHeight = bottomContainer?.clientHeight || 0
          }
        } else {
          imgContainerHeight = img?.height || 0
        }

        let idx = this.itemHeight.indexOf(Math.min(...this.itemHeight))  //找到高度最小的元素的下标
        item.style.left = idx * (width! + gapX!) + 'px'
        item.style.top = this.itemHeight[idx] + 'px'
        this.itemHeight[idx] += Math.round((imgContainerHeight! * width! / width!) + gapY!)
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

  /** 触底时的回调函数 */
  onReachBottom = (reachBottomCallback: () => void) => {
    const { bottomDistance } = this.options
    if (bottomDistance! < 50) {
      throw Error('bottomDistance，触底事件离底部触发的距离不能小于50')
    }
    window.addEventListener('scroll', this.store.debounceScroll = debounce(() => {
      const { clientHeight, scrollTop, scrollHeight } = document.documentElement

      if ((clientHeight + scrollTop + bottomDistance! >= scrollHeight)) {
        reachBottomCallback()
      }
    }, 100))
  }

  /** 触底加载更多 */
  loadMore = (dataSource: TDataSource[]) => {
    this.initImage(dataSource);
  }

  /** 销毁监听的scroll事件和resize事件 */
  destroy = () => {
    window.removeEventListener('resize', this.store.throttleResize)
    window.removeEventListener('scroll', this.store.debounceScroll)
  }
}