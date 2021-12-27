import { EventEmitter } from "../helper/eventEmitter";
import type { TOptions, TDataSource } from "./types";
export default class Waterfall extends EventEmitter {
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
    private onTouchBottom;
    /** 触底加载更多 */
    loadMore: (dataSource: TDataSource[]) => Promise<void>;
    /** 销毁监听的scroll事件和resize事件 */
    destroy: () => void;
}
