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
// import Waterfall from 'charge-waterfall'
import Waterfall from '../../../dist/index.js'
export default {
  name: 'Waterfall',
  data() {
    return {
      isLoading: false,
      waterfall: null,
      initialData: [
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0606%252F04a3d0f7j00qu8tsb001hc000hs00qoc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=9859b8d0ec4fe8a8cf1c44583f324c88',
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
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fc%2F64%2F52911497794.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636018780&t=30680621f7289dd8c56cdd4effa5a0b7',
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
        name: 'fadeInRight',
        duration: 1,
      },
      resizable: true,
      defaultImgUrl:
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Ffbf18a5314f750da671711dfb176cf8791fbc687153d-g7YSBF_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636300149&t=84cd1f7a4fe131edd66638bd44f3496d',
      render: (dataSource) =>
        `<div>这是${dataSource.data?.name}</div>
        <div>哈哈哈哈哈</div>
        <div>测试测试</div>
        <div>测试测试</div>
        <div>测试测试</div>
        <div>测试测试</div>
        <div>测试测试</div>
        `,
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
