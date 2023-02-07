<script setup lang="ts">
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
