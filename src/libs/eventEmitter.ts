interface IEvents {
  [key: string]: Function[];
}

export class EventEmitter {
  private events: IEvents = {};

  //订阅
  on(eventName: string, fn: Function) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    // 防止添加重复事件
    if (!this.events[eventName].includes(fn)) {
      this.events[eventName].push(fn);
    }
  }

  protected emit(eventName: string, ...args: any) {
    const fns = this.events[eventName];
    if (!fns) return;
    fns.forEach((fn) => {
      fn.apply(this, args);
    });
  }

  protected off(eventName: string, fn?: Function) {
    const fns = this.events[eventName];
    if (!fns) return;

    if (!fn) {
      delete this.events[eventName];
      return;
    }

    const index = this.events[eventName].indexOf(fn);
    fns.splice(index, 1);
  }

  protected once(eventName: string, fn: Function) {
    const _once = (...args: any[]) => {
      fn.apply(this, args);
      this.off(eventName, _once);
    };

    this.emit(eventName, _once);
  }
}
