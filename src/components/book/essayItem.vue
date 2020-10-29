// 短文 item
<template>
  <div>
    <div class="essay-item" v-for="(item, index) in list" :key="index">
      <div class="tit ellipsis">{{item.title}}</div>
      <div class="desc ellipsis2">{{item.desc}}</div>
      <div class="flex-row-center">
        <van-tag class="time" round type="primary" color="#f5f5f5">{{item.time}}</van-tag>
        <div class="author">{{item.author}}</div>
      </div>
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
.essay-item {
  position: relative;
  width: 694px;
  height: 260px;
  margin: 0 auto 28px;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  .tit {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 56px;
  }
  .desc {
    height: 80px;
    margin-top: 10px;
    color: #999ead;
    line-height: 40px;
  }
  .author {
    margin-left: 32px;
    font-size: 24px;
    color: #999ead;
  }

  .time {
    width: 244px;
    height: 40px;
    margin-top: 24px;
    margin-bottom: 24px;
    font-size: 24px;
    color: #999ead;
    justify-content: center;
  }
}
</style>
