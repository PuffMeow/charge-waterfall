export declare function throttle(fn: Function, wait?: number): (this: any, ...args: any[]) => void;
export declare function debounce(fn: Function, wait?: number): (this: any, ...args: any[]) => void;
export declare function loadAsyncImage(imageUrl: string): Promise<HTMLImageElement>;
