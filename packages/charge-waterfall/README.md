### 简介

一个使用纯**TypeScript**编写的瀑布流工具插件，定宽不定高。简单好用，配置方便，纯中文提示，即插即用。适用于 JS、Vue、React、Angular(暂时没提供 Demo)。具体的 Vue 和 React 相关 Demo 可以查看[Git 仓库](https://github.com/JiquanWang99/charge-waterfall)。**维护不易，欢迎大家多多 ♥star⭐♥，也欢迎各位发现了问题给我提 issue**

### 安装

npm：

```
npm install --save charge-waterfall
```

yarn：

```
yarn add charge-waterfall
```

### 特性

- 纯 TS 编写，拥有完善的类型提示
- 拥有多个配置项
- 自动定图片宽高
- 默认占位图
- 支持有图/无图模式
- 支持开启图片加载完成后的淡入动画
- 触底加载更多
- 支持响应式渲染

### 使用

在 TS 中使用可以引入类型，如果没有用到 TS 可以不需要导入类型

```typescript
import Waterfall, { TOptions, TDataSource } from "charge-waterfall";

const options: TOptions = {
  //具体的选项请看下面
};

const waterfall = new Waterfall(options);

//纯JS的话
const waterfall = new Waterfall({
  //具体选项
});
```

### 使用的注意事项

- container 父盒子容器必须是个空容器，里面不能有其它的内容
- 使用触底加载更多进行请求时记得加个锁（具体可以看下面的例子代码），否则有可能会进行重复请求

#### TOptions 字段

| 属性                 | 描述                                                                                                   | 默认值                      |      | 类型                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------- | ---- | --------------------------------------------------- |
| container            | 装载图片的父容器，必须是一个空的元素，如.container 或者 document.querySelector('.container')           | null                        | 必填 | HTMLElement \| string \| null                       |
| initialData          | 初始化数据源                                                                                           | []                          | 必填 | TDataSource[]                                       |
| column               | 水平方向展示的列数                                                                                     | 2                           | 可选 | number                                              |
| width                | 每一列的宽度                                                                                           | 容器宽度 / 列数             | 可选 | number                                              |
| gapX                 | 元素水平间距                                                                                           | 0                           | 可选 | number                                              |
| gapY                 | 元素垂直间距                                                                                           | 0                           | 可选 | number                                              |
| animation            | 淡入动画配置， animation: {name: "动画名称", duration: "动画持续时间(单位: 秒 s)"}                     | 具体看下方                  | 可选 | TAnimationOptions                                   |
| defaultImgUrl        | 有图模式下，图片渲染失败时会显示默认占位图，如果默认占位图显示也失败就会显示 alt 设置的默认字段`image` | 无                          | 可选 | string                                              |
| resizable            | 是否开启响应式改变布局宽度                                                                             | true                        | 可选 | boolean                                             |
| bottomDistance       | 触底事件触发时离底部的距离                                                                             | 100(单位:"px")，最小值: 100 | 可选 | number                                              |
| imgContainerClass    | 渲染出来的图片容器的 class 属性                                                                        | waterfall-img-container     | 可选 | string                                              |
| imgClass             | 渲染出来的图片的 class 属性                                                                            | waterfall-img               | 可选 | string                                              |
| bottomContainerClass | 装载 img 标签图片底部内容盒子的 c                                                                      | waterfall-bottom-container  | 可选 | string                                              |
| onClick              | 点击对应的项，回调参数是对应项的 dataSource 和点击 event 事件                                          | 无                          | 可选 | (_dataSource_: TDataSource, _event_: Event) => void |
| render               | _传入要渲染的元素模板字符串，例如 `<div>Title</div>`_，回调参数是对应项的 dataSource                   | 无                          | 可选 | (_dataSource_: TDataSource) => string               |

#### TDataSource 类型

```typescript
new Waterfall({
  //...其它配置项,
  initialData: [
    {
      src: "图片url地址",
      data: {
        //存放的自定义数据
      },
      alt: "图片裂开时加载的文字",
    },
  ],
});
```

```
interface TDataSource<T = any> {
  /** 图片url地址 */
  src?: string
  /** 自定义的data数据，如果在TS中使用可以通过泛型来定义data中的类型 */
  data: T
  alt?: string
}
```

#### TAnimationOptions 动画配置

```typescript
new Waterfall({
  //...其它配置项,
  animation: {
    name: "fadeInDown",
    duration: 0.5,
  },
});
```

目前支持 4 种动画效果，动画名称默认值为 none(不开启动画)，duration 持续时间默认值为 0.5

- 从上往下淡入 fadeInDown
- 从下往上淡入 fadeInUp
- 从左往右淡入 fadeInLeft
- 从右往左淡入 fadeInRight

```typescript
type TAnimationNames =
  | "none"
  | "fadeInDown"
  | "fadeInUp"
  | "fadeInLeft"
  | "fadeInRight";

interface TAnimationOptions {
  /** 动画名称 */
  name?: TAnimationNames;
  /** 动画持续时间，单位(秒:s) */
  duration?: number;
}
```

#### 实例上的方法

```typescript
waterfall.onReachBottom(() => {
  //回调函数
});
waterfall.loadMore([]);
waterfall.destroy();
```

| 方法名称      | 描述                                 | 入参类型                                |
| ------------- | ------------------------------------ | --------------------------------------- |
| onReachBottom | 触底时触发的事件                     | 回调函数 () => void                     |
| loadMore      | 加载更多元素，用来往容器中塞新数据   | 和 initialData 一样的类型 TDataSource[] |
| destroy       | 销毁监听的 scroll 事件和 resize 事件 | 无                                      |

### 默认生成的 DOM 结构

```html
<div class="container">
  <div class="waterfall-img-container">
    <img class="waterfall-img" />
    //只有在render模式下才会渲染该标签
    <div class="waterfall-bottom-container">//render属性里的内容</div>
  </div>
</div>
```

### 使用方式

关于更加详尽的使用方式可以打开[Git 仓库](https://github.com/JiquanWang99/charge-waterfall)，查看相关的 demo。

#### 关于 Vue

可以`git clone https://github.com/JiquanWang99/charge-waterfall.git`，把仓库克隆到本地之后，然后`cd demo/vue-demo`，然后执行`npm install`，再执行`npm run dev`便可以在本地查看 demo。

#### 关于 React

把仓库克隆到本地后，`cd demo/react-demo`，然后`npm install`，执行`npm run dev`，可以在本地查看 demo。

### Vue 中的使用方式

```vue
<script setup>
import { onMounted, ref } from "vue";
import Waterfall from "charge-waterfall";
const waterfall = ref();
const isLoading = ref(false);

const sleep = (wait = 1000) => {
  return new Promise((resolve) => {
    setTimeout(resolve, wait);
  });
};

onMounted(() => {
  waterfall.value = new Waterfall({
    container: ".container",
    initialData: [
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Ff%2F6f%2F54671164988.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666666622&t=95db3cae5629d7e558f836e2320038f6",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F23f17e4aaa6cb3efc5811b3fa4926445bad168857e3ef-vnIVkW_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668009&t=0feeb63a4d37695a0e4da365a14620c3",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
      },
    ],
    resizable: true,
    bottomDistance: 200,
    column: 2,
    defaultImgUrl:
      "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d",
    render: () => `<div>哈哈哈哈哈</div>`,
    onClick: (data, event) => {
      console.log(data, event);
    },
  });

  waterfall.value.onReachBottom(async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    console.log("触底");
    isLoading.value = true;
    // 模拟一个异步请求，拿到异步请求的数据之后塞进loadMore里面
    await sleep(2000);

    // 异步请求拿到数据之后就可以通过loadMore方法插入了
    waterfall.value.loadMore([
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621124255%2F210416124255-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=38137d81528162e28293c8a64d5caa56",
        data: {
          name: `${Math.floor(Math.random() * 100)}`,
        },
      },
      {
        src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I024%2F2012311I024-4.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=71b04264cbf60717c407550a0db1fef0",
        data: {
          name: `${Math.floor(Math.random() * 100)}`,
        },
      },
    ]);
    isLoading.value = false;
  });
});
</script>

<template>
  <div class="container"></div>
  <div v-if="isLoading" style="text-align: center; padding: 20px">
    加载更多中...
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
</style>
```

### React 中的使用方式

```jsx
import { useEffect, useState } from "react";
import Waterfall from "charge-waterfall";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const sleep = (wait = 1000) => {
    return new Promise((resolve) => {
      setTimeout(resolve, wait);
    });
  };

  useEffect(() => {
    const waterfall = new Waterfall({
      container: ".container",
      initialData: [
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Ff%2F6f%2F54671164988.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666666622&t=95db3cae5629d7e558f836e2320038f6",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huabanimg.com%2F23f17e4aaa6cb3efc5811b3fa4926445bad168857e3ef-vnIVkW_fw658&refer=http%3A%2F%2Fhbimg.huabanimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668009&t=0feeb63a4d37695a0e4da365a14620c3",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fplc.jj20.com%2Fup%2Fallimg%2Fmx14%2F031121231931%2F210311231931-5.jpg&refer=http%3A%2F%2Fplc.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=f6cdaf8a52d7f442631c30cade98d8da",
        },
      ],
      resizable: true,
      bottomDistance: 200,
      column: 2,
      defaultImgUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d",
      render: () => `<div>哈哈哈哈哈</div>`,
      onClick: (data, event) => {
        console.log(data, event);
      },
    });

    // 这里的_isLoading是防止触底重复多次请求的
    let _isLoading = false;
    waterfall.onReachBottom(async () => {
      if (_isLoading) return;
      _isLoading = true;
      console.log("触底");
      // 这里的setIsLoading是用来做Loading状态渲染的
      setIsLoading(true);
      // 模拟一个异步请求，拿到异步请求的数据之后塞进loadMore里面
      await sleep(2000);
      setIsLoading(false);
      // 异步请求拿到数据之后就可以通过loadMore方法插入了
      waterfall.loadMore([
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flmg.jj20.com%2Fup%2Fallimg%2F1114%2F041621124255%2F210416124255-1-1200.jpg&refer=http%3A%2F%2Flmg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=38137d81528162e28293c8a64d5caa56",
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
        {
          src: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I024%2F2012311I024-4.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666668021&t=71b04264cbf60717c407550a0db1fef0",
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
      ]);
      _isLoading = false;
    });

    return () => {
      waterfall.destroy();
    };
  }, []);

  return (
    <>
      <div className="container"></div>
      {isLoading && (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
          }}
        >
          加载更多中...
        </div>
      )}
    </>
  );
}

export default App;
```
