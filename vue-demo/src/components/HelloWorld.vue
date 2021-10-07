<template>
  <div class="hello">
    <div class="container"></div>
  </div>
</template>

<script>
import Waterfall, { TDataSource } from '../../../dist/index'
export default {
  name: 'HelloWorld',
  data() {
    return {
      waterfall: null,
      dataSource: [
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0606%252F04a3d0f7j00qu8tsb001hc000hs00qoc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=9859b8d0ec4fe8a8cf1c44583f324c88',
          data: {
            name: '1',
          },
        },
        {
          src: 'https://img14.360buyimg.com/pop/jfs/t1/194578/27/13360/226560/60f26ec7E79671fbb/0eada5dcb4437eac.jpg',
          data: {
            name: '2',
          },
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919233114%2F1Z629233114-5.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636017833&t=4ddaf1b496ec72d9a24a0d21f9019733',
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fpic%2Fc%2F64%2F52911497794.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636018780&t=30680621f7289dd8c56cdd4effa5a0b7',
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0611%252F6aa41275j00quifmd0059c000u00190g.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102630&t=34becf9263282695f04ba1955cf410de',
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F062919232S7%2F1Z629232S7-6.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=af57df8f67ad1a368fdb32453262a49e',
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F123120192I5%2F201231192I5-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=d4343c530fd669f622d259984974a365',
        },
        {
          src: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.jj20.com%2Fup%2Fallimg%2Fmn02%2F1231201I446%2F2012311I446-0.jpg&refer=http%3A%2F%2Fpic.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636102674&t=49e67d02c3b37f236149e1541f4f1abf',
        },
      ],
    }
  },
  mounted() {
    this.waterfall = new Waterfall({
      container: '.container',
      dataSource: this.dataSource,
      count: 2,
      resizable: true,
      render: (dataSource) => `<div>Test${
        dataSource.data?.name || Math.random() * 100
      }</div>
        <div>哈哈哈哈哈</div>
        <div>test</div>`,
    })
  },

  destroyed() {
    this.waterfall.destroy()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
