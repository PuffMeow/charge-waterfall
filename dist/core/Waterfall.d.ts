import { TDataSource } from "../../dist/index";
import type { TOptions } from "./types";
export default class Waterfall {
    private options;
    private items;
    private itemHeight;
    private store;
    constructor(options: TOptions);
    private initDefaultValue;
    private init;
    private initImage;
    private createContent;
    private computePosition;
    private refreshContainerHeight;
    private resize;
    onReachBottom: (reachBottomCallback: () => void) => void;
    loadMore: (dataSource: TDataSource[]) => Promise<void>;
    destroy: () => void;
}
