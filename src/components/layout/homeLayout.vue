// 三个TabBar 页面
<template>
  <div>
    <router-view />
    <div class="tab-list">
      <van-tabbar v-model="active">
        <van-tabbar-item replace :to="item.url" v-for="(item, index) in tabList" :key="index">
          <span>{{ item.name }}</span>
          <template #icon="props">
            <img :src="props.active ? item.activeIcon : item.icon" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      tabList: [
        {
          name: '书架',
          url: '/bookrack',
          icon: require('@img/t0.png'),
          activeIcon: require('@img/t01.png'),
        },
        {
          name: '书城',
          url: '/',
          icon: require('@img/t1.png'),
          activeIcon: require('@img/t11.png'),
        },
        {
          name: '我的',
          url: '/mine',
          icon: require('@img/t2.png'),
          activeIcon: require('@img/t21.png'),
        },
      ],
    }
  },
  created() {
    // 保持 tabbar 标签对应
    let pathIndex = ['/bookrack/bookrack', '/bookHome', '/mine'].indexOf(this.$route.path)

    if (pathIndex == -1) pathIndex = 1
    this.active = pathIndex
  },
}
</script>

<style lang="less" scoped>
.tab-list {
  height: 100px;
}
.van-tabbar-item {
  letter-spacing: 0.24px;
  color: #8e93a1;
  font-size: 20px;
}
.van-tabbar-item--active {
  color: #ff5252;
}
.van-hairline--top-bottom::after {
  border-bottom: 0;
}
.van-tabbar-item__icon img {
  width: 64px;
  height: 64px;
}
</style>
