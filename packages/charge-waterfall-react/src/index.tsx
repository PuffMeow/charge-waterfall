import React, { memo, useEffect } from "react";
import Render from "react-dom/client";
import WaterfallLayout, { TDataSource } from "charge-waterfall";

interface IProps<T = any> {
  width?: number;
  gapX?: number;
  gapY?: number;
  column?: number;
  renderBottom?: (data: TDataSource<T>) => React.ReactNode | React.ReactNode;
}

const Waterfall = <T,>({
  width,
  gapX = 0,
  gapY = 0,
  column = 2,
}: IProps<T>) => {
  useEffect(() => {
    const waterfall = new WaterfallLayout({
      container: ".charge-waterfall-container",
      width,
      gapX,
      gapY,
      column,
    });
  }, [gapX, gapY, width, column]);

  return <div className="charge-waterfall-container"></div>;
};

export default memo(Waterfall) as typeof Waterfall;
