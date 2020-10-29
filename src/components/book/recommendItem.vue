// 书城推荐 item
<template>
  <div class="recommend-list">
    <div class="recommend-item" v-for="(item, index) in list" :key="index">
      <div class="tit ellipsis">{{item.theName}}</div>
      <div class="desc ellipsis">{{item.theIntr}}</div>
      <img class="img" :src="$config.imgUrl + item.theImg" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default () {
        return []
      },
    },
  },
  data() {
    return {
      
    }
  },
}
</script>

<style lang="less" scoped>
.recommend-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px 32px 0;
}
.recommend-item {
  position: relative;
  width: 324px;
  // height: 260px;
  margin-bottom: 32px;
  .tit {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 56px;
    font-weight: 600;
  }
  .desc {
    height: 40px;
    font-size: 24px;
    color: #8e93a1;
    line-height: 34px;
  }
  .img {
    width: 328px;
    height: 126px;
  }
}
</style>
