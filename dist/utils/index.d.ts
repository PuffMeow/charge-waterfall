declare type DataType = 'undefined' | 'null' | 'boolean' | 'string' | 'number' | 'bigint' | 'object' | 'symbol' | 'array';
export declare function getTypeof(data: any): DataType;
export declare function isPlainObject(data: any): data is Object;
export declare function throttle(fn: Function, wait?: number): (this: any, ...args: any[]) => void;
export declare function debounce(fn: Function, wait?: number): (this: any, ...args: any[]) => void;
export declare function loadAsyncImage(imageUrl: string): Promise<HTMLImageElement>;
export declare function deepMerge(...objs: any[]): any;
export {};
