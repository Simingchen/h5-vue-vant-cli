<template>
  <div class="collectList-page pt90">
    <van-nav-bar
      v-if="!isEdit"
      title="我的收藏"
      fixed
      left-arrow
      right-text="管理"
      @click-left="minxinNavLeft"
      @click-right="isEdit = true"
    />
    <van-nav-bar
      v-if="isEdit"
      left-text="取消"
      :title="`已选${selectList.length}本`"
      fixed
      right-text="完成"
      @click-left="minxinNavLeft"
      @click-right="isEdit = false"
    />
    <van-list
      v-model="curTab.loading"
      :finished="curTab.finished"
      :finished-text="curTab.list.length && '没有更多了'"
    >
      <essay-item :list="curTab.list" />
      <van-empty
        v-if="!curTab.list.length"
        :image="require('@img/icon_request_empty.png')"
        description="此处尚无数据"
      />
    </van-list>
    <div v-if="isEdit" class="btns-bottom">
      <div class="btns flex-box">
        <div class="item flex-item flex-center">全选</div>
        <div class="item flex-item flex-center">删除</div>
      </div>
    </div>
  </div>
</template>
<script>
import essayItem from '@components/book/essayItem.vue'
export default {
  components: {essayItem},
  data() {
    return {
      isEdit: false, // 是否编辑模式
      curTab: {
        name: '短文',
        loading: false,
        isLoaded: false,
        finished: false,
        loadStatus: 'loading', // 加载状态
        page: {
          // 页码
          page: 0,
          size: 10,
          finished: false,
        },
        list: [],
      },
      selectList: [], // 已选择
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onNavRight() {},

    // 获取列表
    getList () {
      var list = [
        {
          img: require("@img/icon_cover_6.jpg"),
          title: '一棍平天下-听听那冷雨的概述图听听那冷雨的概述图',
          desc: '一棍平天下-听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图听听那冷雨的概述图',
          tag: '古代言情',
          author: '苏小懒',
          isAdd: true,
          time: '2017.12.12 16:08:09',
        },
      ]
      this.curTab.list = [...list, ...list]
      this.curTab.loading = false
      this.curTab.finished = true

    },
  },
}
</script>

<style lang="less" scoped>
.collectList-page {
  min-height: 100vh;
  background: #f5f5f5;
}
.van-list {
  padding-top: 28px;
}
.btns-bottom {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.btns {
  width: 100%;
  height: 96px;
  background: #fff;
  text-align: center;
  font-size: 32px;
  .item:last-child {
    color: #fff;
    background: @primary;
  }
}
</style>
<style lang="less">
.collectList-page {
  .van-tabs__nav {
    justify-content: center;
  }
  .van-tab {
    flex: none;
    width: 190px;
    font-size: 32px;
    color: #646464;
  }
  .van-tab--active {
    color: @primary;
  }
  .van-tabs__line {
    width: 32px;
    background-color: @primary;
  }
}
</style>
