### 简介

一个使用纯**TypeScript**编写的适用于**PC端**(移动端暂时未兼容)的瀑布流工具插件，定宽不定高。简单好用，配置方便，纯中文提示，即插即用。适用于JS、Vue、React、Angular(暂时没提供Demo)。具体的Vue和React相关Demo可以查看[Git仓库](https://github.com/JiquanWang99/charge-waterfall)。**维护不易，欢迎大家多多♥star⭐♥，也欢迎各位发现了问题给我提issue**

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

- 纯TS编写，拥有完善的类型提示
- 拥有多个配置项
- 自动定图片宽高
- 默认占位图
- 支持有图/无图模式
- 支持开启图片加载完成后的淡入动画
- 触底加载更多
- 支持响应式渲染

### 使用

在TS中使用可以引入类型，如果没有用到TS可以不需要导入类型

```typescript
import Waterfall, { TOptions, TDataSource } from 'charge-waterfall'

const options: TOptions = {
    //具体的选项请看下面
}

const waterfall = new Waterfall(options)

//纯JS的话
const waterfall = new Waterfall({
    //具体选项
})
```

### 使用的注意事项

- container父盒子容器必须是个空容器，里面不能有其它的内容
- 使用触底加载更多进行请求时记得加个锁（具体可以看下面的例子代码），否则有可能会进行重复请求

#### TOptions字段

| 属性                 | 描述                                                         | 默认值                     |      | 类型                                                |
| -------------------- | ------------------------------------------------------------ | -------------------------- | ---- | --------------------------------------------------- |
| container            | 装载图片的父容器，必须是一个空的元素，如.container或者 document.querySelector('.container') | null                       | 必填 | HTMLElement \| string \| null                       |
| initialData          | 初始化数据源                                                 | []                         | 必填 | TDataSource[]                                       |
| column               | 水平方向展示的列数                                           | 2                          | 可选 | number                                              |
| width                | 每一列的宽度                                                 | 容器宽度 / 列数            | 可选 | number                                              |
| gapX                 | 元素水平间距                                                 | 0                          | 可选 | number                                              |
| gapY                 | 元素垂直间距                                                 | 0                          | 可选 | number                                              |
| animation            | 淡入动画配置， animation: {name: "动画名称", duration: "动画持续时间(单位: 秒s)"} | 具体看下方                 | 可选 | TAnimationOptions                                   |
| defaultImgUrl        | 有图模式下，图片渲染失败时会显示默认占位图，如果默认占位图显示也失败就会显示alt设置的默认字段`image` | 无                         | 可选 | string                                              |
| resizable            | 是否开启响应式改变布局宽度                                   | true                       | 可选 | boolean                                             |
| bottomDistance       | 触底事件触发时离底部的距离                                   | 50(单位"px")               | 可选 | number                                              |
| imgContainerClass    | 渲染出来的图片容器的class属性                                | waterfall-img-container    | 可选 | string                                              |
| imgClass             | 渲染出来的图片的class属性                                    | waterfall-img              | 可选 | string                                              |
| bottomContainerClass | 装载img标签图片底部内容盒子的c                               | waterfall-bottom-container | 可选 | string                                              |
| onClick              | 点击对应的项，回调参数是对应项的dataSource和点击event事件    | 无                         | 可选 | (*dataSource*: TDataSource, *event*: Event) => void |
| render               | *传入要渲染的元素模板字符串，例如  `<div>Title</div>`*，回调参数是对应项的dataSource | 无                         | 可选 | (*dataSource*: TDataSource) => string               |

#### TDataSource类型

```typescript
new Waterfall({
    //...其它配置项,
    initialData: [
        {
            src: '图片url地址',
            data: {
                //存放的自定义数据
            },
            alt: '图片裂开时加载的文字'
        }
    ]
})
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

#### TAnimationOptions动画配置

```typescript
new Waterfall({
    //...其它配置项,
    animation: {
        name: 'fadeInDown',
        duration: 0.5
    }
})
```

目前支持4种动画效果，动画名称默认值为none(不开启动画)，duration持续时间默认值为0.5

- 从上往下淡入fadeInDown
- 从下往上淡入fadeInUp
- 从左往右淡入fadeInLeft
- 从右往左淡入fadeInRight

```typescript
type TAnimationNames = 'none' | 'fadeInDown' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight'

interface TAnimationOptions {
  /** 动画名称 */
  name?: TAnimationNames
  /** 动画持续时间，单位(秒:s) */
  duration?: number
}
```

#### 实例上的方法

```typescript
waterfall.onReachBottom(()=> {
    //回调函数
})
waterfall.loadMore([])
waterfall.destroy()
```

| 方法名称      | 描述                               | 入参类型                             |
| ------------- | ---------------------------------- | ------------------------------------ |
| onReachBottom | 触底时触发的事件                   | 回调函数  () => void                 |
| loadMore      | 加载更多元素，用来往容器中塞新数据 | 和initialData一样的类型TDataSource[] |
| destroy       | 销毁监听的scroll事件和resize事件   | 无                                   |

### 默认生成的DOM结构

```html
<div class="container">
    <div class="waterfall-img-container">
        <img class="waterfall-img">
        //只有在render模式下才会渲染该标签
        <div class="waterfall-bottom-container">
            //render属性里的内容
        </div>
    </div>
</div>
```

### 使用方式

关于更加详尽的使用方式可以打开[Git仓库](https://github.com/JiquanWang99/charge-waterfall)，查看相关的demo。

#### 关于Vue

可以`git clone https://github.com/JiquanWang99/charge-waterfall.git`，把仓库克隆到本地之后，然后`cd demo-vue`，然后执行`npm install`，再执行`npm run serve`便可以在本地8080端口查看demo。

#### 关于React

把仓库克隆到本地后，`cd demo-react`，然后`yarn install/npm install`，执行`npm run start`，可以在本地3000端口查看demo。

### Vue中的使用方式

```vue
<template>
  <div class="hello">
    <!-- 装图片的容器 ，必须是空的-->
    <div class="container"></div>

    <!-- 这里的内容是Loading图片 -->
    <div
      v-if="isLoading"
      style="display: flex; justify-content: center; align-items: center"
    >
      <svg
        width="50"
        height="20"
        viewBox="0 0 120 30"
        xmlns="http://www.w3.org/2000/svg"
        fill="#000"
      >
        <circle cx="15" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="60" cy="15" r="9" fill-opacity="0.3">
          <animate
            attributeName="r"
            from="9"
            to="9"
            begin="0s"
            dur="0.8s"
            values="9;15;9"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="0.5"
            to="0.5"
            begin="0s"
            dur="0.8s"
            values=".5;1;.5"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="105" cy="15" r="15">
          <animate
            attributeName="r"
            from="15"
            to="15"
            begin="0s"
            dur="0.8s"
            values="15;9;15"
            calcMode="linear"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            from="1"
            to="1"
            begin="0s"
            dur="0.8s"
            values="1;.5;1"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  </div>
</template>

<script>
import Waterfall from 'charge-waterfall'
// import Waterfall from '../../../dist/index.js'
export default {
  name: 'Waterfall',
  data() {
    return {
      isLoading: false,
      waterfall: null,
      initialData: [
        {
          // gimg2.
          src: 'https://baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0606%252F04a3d0f7j00qu8tsb001hc000hs00qoc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=9859b8d0ec4fe8a8cf1c44583f324c88',
          data: {
            name: '第一张图',
          },
        },
        {
          src: 'https://img14.360buyimg.com/pop/jfs/t1/194578/27/13360/226560/60f26ec7E79671fbb/0eada5dcb4437eac.jpg',
          data: {
            name: '第二张图',
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
          data: {
            name: '第三张图',
          },
        },
        {
          src: 'https://.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fc%2F64%2F52911497794.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636018780&t=30680621f7289dd8c56cdd4effa5a0b7',
          data: {
            name: '第四张图',
          },
        },
        {
          data: {
            name: '第五张图，这是无图模式',
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919232S7%2F1Z629232S7-6.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=af57df8f67ad1a368fdb32453262a49e',
          data: {
            name: '第六张图',
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
          data: {
            name: '第七张图',
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I446%2F2012311I446-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=49e67d02c3b37f236149e1541f4f1abf',
          data: {
            name: '第八张图',
          },
        },
      ],
    }
  },
  mounted() {
    this.waterfall = new Waterfall({
      container: '.container',
      initialData: this.initialData,
      column: 2,
      animation: {
        name: 'fadeInDown',
        duration: 1,
      },
      resizable: true,
      defaultImgUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d',
      render: (dataSource) =>
        `<div>这是${dataSource.data?.name}</div>
        <div>哈哈哈哈哈</div>`,
      onClick: (data, event) => {
        console.log(data, event)
      },
    })

    this.waterfall.onReachBottom(async () => {
      if (this.isLoading) return
      // 加锁防止重复请求
      this.isLoading = true
      console.log('触底')
      // 模拟一个异步请求，拿到异步请求的数据之后塞进loadMore里面
      await this.sleep(2000)
      this.waterfall.loadMore([
        {
          src: 'https://baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
      ])
      this.isLoading = false
    })
  },

  methods: {
    sleep(wait) {
      return new Promise((resolve) => {
        setTimeout(resolve, wait)
      })
    },
  },

  destroyed() {
    this.waterfall.destroy()
  },
}
</script>

<style scoped>
</style>

```

### React中的使用方式

```jsx
import React, { useEffect, useState, useRef } from 'react'
import Waterfall from 'charge-waterfall'
import './App.css'


function App() {
  const [initialData, setInitialData] = useState([
    {

      src: 'https://baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0606%252F04a3d0f7j00qu8tsb001hc000hs00qoc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=9859b8d0ec4fe8a8cf1c44583f324c88',
      data: {
        name: '第一张图',
      },
    },
    {
      src: 'https://img14.360buyimg.com/pop/jfs/t1/194578/27/13360/226560/60f26ec7E79671fbb/0eada5dcb4437eac.jpg',
      data: {
        name: '第二张图',
      },
    },
    {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
      data: {
        name: '第三张图',
      },
    },
    {
      src: 'https://.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fc%2F64%2F52911497794.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636018780&t=30680621f7289dd8c56cdd4effa5a0b7',
      data: {
        name: '第四张图',
      },
    },
    {
      data: {
        name: '第五张图',
      },
    },
    {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919232S7%2F1Z629232S7-6.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=af57df8f67ad1a368fdb32453262a49e',
      data: {
        name: '第六张图',
      },
    },
    {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
      data: {
        name: '第七张图',
      },
    },
    {
      src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I446%2F2012311I446-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=49e67d02c3b37f236149e1541f4f1abf',
      data: {
        name: '第八张图',
      },
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const waterfall = new Waterfall({
      container: '.container',
      initialData: initialData,
      resizable: true,
      bottomDistance: 200,
      column: 3,
      defaultImgUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d',
      render: (dataSource) =>
        `<div>这是${dataSource.data?.name}</div>
        <div>哈哈哈哈哈</div>`,
      onClick: (data, event) => {
        console.log(data, event)
      },
    })

    // 这里的_isLoading是防止触底重复多次请求的
    let _isLoading = false
    waterfall.onReachBottom(async () => {
      if (_isLoading) return
      _isLoading = true
      console.log('触底')
      // 这里的setIsLoading是用来做Loading状态的SVG图片渲染的
      setIsLoading(true)
      // 模拟一个异步请求，拿到异步请求的数据之后塞进loadMore里面
      await sleep(2000)
      setIsLoading(false)
      // 异步请求拿到数据之后就可以通过loadMore方法插入了
      waterfall.loadMore([
        {
          src: 'https://baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
          data: {
            name: `${Math.floor(Math.random() * 100)}`,
          },
        },
      ])
      _isLoading = false
    })

    return () => {
      waterfall.destroy()
    }
  }, [])

  const sleep = (wait) => {
    return new Promise((resolve) => {
      setTimeout(resolve, wait);
    })
  }

  return (
    <div className="App">
      {/* 装载图片的空容器 */}
      <div className='container'></div>


	  {/* 这里的内容是Loading图片 */}
      {isLoading && <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <svg
          width="50"
          height="20"
          viewBox="0 0 120 30"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
        >
          <circle cx="15" cy="15" r="15">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="15" r="9" fillOpacity="0.3">
            <animate
              attributeName="r"
              from="9"
              to="9"
              begin="0s"
              dur="0.8s"
              values="9;15;9"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="0.5"
              to="0.5"
              begin="0s"
              dur="0.8s"
              values=".5;1;.5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="105" cy="15" r="15">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      }
    </div>
  );
}

export default App;
```

