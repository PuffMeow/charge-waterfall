import { TDataSource } from "../../dist/index";
import type { TOptions } from "./types";
export default class Waterfall {
    private options;
    private items;
    private itemHeight;
    private store;
    constructor(options: TOptions);
    private init;
    private initImage;
    private createContent;
    private computePosition;
    private refreshContainerHeight;
    private resize;
    /** 触底时的回调函数 */
    onReachBottom: (reachBottomCallback: () => void) => void;
    /** 触底加载更多 */
    loadMore: (dataSource: TDataSource[]) => void;
    /** 销毁监听的scroll事件和resize事件 */
    destroy: () => void;
}
