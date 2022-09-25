import deepMerge from "deepmerge";
import { debounce, loadAsyncImage, throttle } from "../libs/utils";
import animationMap from "../animations/index";
import { options as defaultOptions } from "./default";
import type { TOptions, TDataSource } from "./types";

export default class Waterfall {
  private options: TOptions;
  private items: HTMLElement[] = []; //存储子元素
  private imageHeightTrack: number[] = []; //每列的高度
  private eventStore: any = {};

  constructor(options: TOptions) {
    this.options = deepMerge(defaultOptions, options);
    this.init();
  }

  private init = async () => {
    const { resizable, initialData = [], column } = this.options;
    if (typeof this.options.container === "string") {
      if (
        !this.options.container.startsWith(".") &&
        !this.options.container.startsWith("#")
      ) {
        throw new Error(
          `传入的 ${this.options.container} 不符合标准 DOM 查询规范， 请按照标准的 DOM 查询规范传入，如'.container' 或 '#container'`
        );
      }

      this.options.container = document.querySelector<HTMLElement>(
        this.options.container
      );
    }

    if (!this.options.container) {
      throw new Error(
        `container: ${this.options.container} 实例不存在，请检查`
      );
    }

    (this.options.container as HTMLElement).style.overflowX = "hidden";
    this.imageHeightTrack = new Array(column).fill(0);
    (this.options.container as HTMLElement).style.position = "relative";
    resizable && this.resize();
    this.initImage(initialData);
  };

  private initImage = async (dataSource: TDataSource[]) => {
    const containerChildrens = await this.createContent(dataSource);
    this.items = this.items.concat(containerChildrens);
    this.computePosition(containerChildrens);
  };

  private createContent = async (dataSource: TDataSource[] = []) => {
    const {
      onClick,
      imgClass,
      imgContainerClass,
      bottomContainerClass,
      render,
      defaultImgUrl = "",
    } = this.options;
    const res = await Promise.allSettled(
      dataSource.map((data) => data?.src && loadAsyncImage(data.src))
    );
    const containerChildrens: HTMLElement[] = [];
    const fragment = document.createDocumentFragment();

    for (let [index, data] of dataSource.entries()) {
      const div = document.createElement("div");
      div.className = imgContainerClass!;
      if (data?.src) {
        const img = document.createElement("img");
        img.style.verticalAlign = "bottom";
        img.src = data.src;
        if (res[index].status === "rejected") {
          try {
            const defaultImg = await loadAsyncImage(defaultImgUrl);
            img.src = defaultImg.src;
          } catch (e) {
            console.error(`该默认图片加载失败：${defaultImgUrl}, ${e}`);
          }
        }
        img.alt = data?.alt || "image";
        img.className = imgClass!;
        div.appendChild(img);
      }
      if (render) {
        const bottomBox = document.createElement("div");
        bottomBox.className = bottomContainerClass!;
        bottomBox.innerHTML = render(data);
        div.appendChild(bottomBox);
      }

      div.onclick = (e) => {
        onClick?.(data, e);
      };
      containerChildrens.push(div);
      fragment.appendChild(div);
    }
    (this.options.container as HTMLElement).appendChild(fragment);

    return containerChildrens;
  };

  private computePosition = (
    containerChildrens: HTMLElement[],
    isResize: boolean = false
  ) => {
    requestAnimationFrame(() => {
      let {
        options: {
          gapX,
          gapY,
          column,
          width,
          bottomContainerClass,
          render,
          animation,
        },
      } = this;
      width =
        width ?? (this.options.container as HTMLElement).clientWidth / column!;

      isResize && (this.imageHeightTrack = new Array(column).fill(0));

      for (let item of containerChildrens) {
        if (animation!.name !== "none") {
          item.style.opacity = "0";
          item.style.transform = animationMap[animation!.name!].start;
        }
        const img = item.getElementsByTagName("img")[0];
        if (img) {
          img.style.width = width + "px";
        }
        let imgContainerHeight: number;
        item.style.width = width + "px";
        item.style.position = "absolute";
        // 兼容没有传入图片src的模式
        if (render) {
          const bottomContainer = item.querySelector(
            `.${bottomContainerClass}`
          ) as HTMLElement;
          bottomContainer.style.width = width + "px";
          if (img) {
            imgContainerHeight =
              (img?.height || 30) + (bottomContainer?.clientHeight || 0);
          } else {
            imgContainerHeight = bottomContainer?.clientHeight || 0;
          }
        } else {
          imgContainerHeight = img?.height || 0;
        }

        // 寻找高度最低的那一列轨道
        let idx = this.imageHeightTrack.indexOf(
          Math.min(...this.imageHeightTrack)
        );
        item.style.left = idx * (width! + gapX!) + "px";
        item.style.top = this.imageHeightTrack[idx] + "px";

        this.imageHeightTrack[idx] += Math.ceil(
          (imgContainerHeight! * width!) / width! + gapY!
        );

        if (animation!.name !== "none") {
          item.style.transition = `transform ${animation!.duration}s ease`;
          item.style.opacity = "1";
          item.style.transform = animationMap[animation!.name!].end;
        }
      }

      this.refreshContainerHeight();
    });
  };

  private refreshContainerHeight = () => {
    const max = Math.max(...this.imageHeightTrack);
    (this.options.container as HTMLElement).style.height = max + "px";
  };

  private resize = () => {
    window.addEventListener(
      "resize",
      (this.eventStore.throttleResize = throttle(() => {
        this.computePosition(this.items, true);
      }))
    );
  };

  /** 触底时的回调函数 */
  onReachBottom = (callback?: () => void) => {
    const { bottomDistance = 150 } = this.options;
    if (bottomDistance < 150) {
      throw new Error("bottomDistance 属性不能小于15");
    }

    window.addEventListener(
      "scroll",
      (this.eventStore.debounceScroll = debounce(() => {
        const { clientHeight, scrollTop, scrollHeight } =
          document.documentElement;
        if (clientHeight + scrollTop + bottomDistance >= scrollHeight) {
          callback?.();
        }
      }))
    );
  };

  /** 触底加载更多 */
  loadMore = async (dataSource: TDataSource[]) => {
    this.initImage(dataSource);
  };

  /** 销毁监听的scroll事件和resize事件 */
  destroy = () => {
    window.removeEventListener("resize", this.eventStore.throttleResize);
    window.removeEventListener("scroll", this.eventStore.debounceScroll);
  };
}
