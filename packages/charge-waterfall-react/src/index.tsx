import React, { memo, useEffect } from "react";
import Render from "react-dom/server";
import WaterfallLayout, {
  TAnimationOptions,
  TDataSource,
  TAnimationNames,
  TOptions,
} from "charge-waterfall";

interface IProps<T> {
  /** 装载img标签的外层盒子class属性，默认 waterfall-img-container */
  imgContainerClass?: string;
  /** 装载img标签图片底部内容盒子的class属性，默认 waterfall-bottom-container */
  bottomContainerClass?: string;
  /** img标签的class属性，默认 waterfall-img */
  imgClass?: string;
  /** 数据源 */
  dataSource?: () => TDataSource<T>[] | TDataSource<T>[];
  /**每一列的宽度 */
  width?: number;
  /** 元素水平间距 */
  gapX?: number;
  /** 元素垂直间距 */
  gapY?: number;
  /** 水平方向展示的列数 */
  column?: number;
  /** 动画配置项 */
  animation?: TAnimationOptions;
  /** 外层容器样式 */
  style?: React.CSSProperties;
  /** 是否响应式改变布局宽度 */
  resizable?: boolean;
  /** 图片加载失败时会加载这里设置的默认占位图 */
  defaultImgUrl?: string;
  /** 触底事件触发时离底部的距离 */
  bottomDistance?: number;
  /** 点击对应的项，回调参数是对应项的dataSource和点击event事件 */
  onClick?: (data: TDataSource<T>, event: Event) => void;
  /** 滚动到底部的时候触发的回调 */
  onReachBottom?: () => void;
  /** 渲染图片底部的元素 */
  bottomRender?: (data: TDataSource<T>) => React.ReactNode | React.ReactNode;
}

const Waterfall = <T,>({
  dataSource,
  imgClass = "waterfall-img",
  defaultImgUrl,
  imgContainerClass = "waterfall-img-container",
  bottomContainerClass = "waterfall-bottom-container",
  width,
  gapX = 0,
  gapY = 0,
  column = 2,
  bottomDistance = 200,
  onClick,
  onReachBottom,
  animation,
  bottomRender,
}: IProps<T>) => {
  useEffect(() => {
    const waterfall = new WaterfallLayout({
      container: ".charge-waterfall-container",
      initialData: typeof dataSource === "function" ? dataSource() : dataSource,
      width,
      gapX,
      gapY,
      defaultImgUrl,
      imgClass,
      imgContainerClass,
      bottomContainerClass,
      bottomDistance,
      column,
      render: (data) => {
        if (!bottomRender) return "";
        const elements = bottomRender(data) as React.ReactElement;
        return Render.renderToString(elements);
      },
      onClick,
    });

    if (onReachBottom) {
      waterfall.onReachBottom(onReachBottom);
    }

    return () => {
      waterfall.destroy();
    };
  }, [gapX, gapY, width, column]);

  return <div className="charge-waterfall-container"></div>;
};

export default memo(Waterfall) as typeof Waterfall;
export { TAnimationOptions, TDataSource, TAnimationNames, TOptions };
