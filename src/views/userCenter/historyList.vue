<template>
  <div class="historyList-page pt90">
    <van-nav-bar
      title="阅读历史"
      fixed
      left-arrow
      right-text="清空"
      @click-left="minxinNavLeft"
      @click-right="clearAll"
      active
    />
    <van-tabs v-model="active">
      <van-tab :title="tab.name" v-for="(tab, index) in tabList" :key="index">
        <van-list
          v-model="tab.loading"
          :finished="tab.finished"
          :finished-text="tab.list.length && '没有更多了'"
        >
          <div v-show="active == 0">
            <div
              class="book-item flex-start van-hairline--bottom"
              v-for="(item, index) in tab.list"
              :key="index"
            >
              <img v-lazy="item.img" class="img" />
              <div class="con">
                <div class="tit ellipsis">{{item.title}}</div>
                <div class="des-box flex-row-center">
                  <div class="flex-start">
                    <van-tag class="tag" round :color="$config.primaryColor">{{item.tag}}</van-tag>
                    <div class="author">{{item.author}}</div>
                  </div>
                  <van-button
                    class="add-btn"
                    plain
                    :color="!item.isAdd ? $config.primaryColor : '#999EAD'"
                    @click="addBookRack(item)"
                  >{{item.isAdd ? '已加入书架' : '加入书架'}}</van-button>
                </div>
                <van-tag class="time" round type="primary" color="#f5f5f5">{{item.time}}</van-tag>
              </div>
            </div>
          </div>
          <!-- 短文 -->
          <essay-item v-show="active == 1" :list="tab.list" />
          <van-empty
            v-if="!tab.list.length"
            :image="require('@img/icon_request_empty.png')"
            description="此处尚无数据"
          />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import essayItem from '@components/book/essayItem.vue'
export default {
  components: {essayItem},
  name: 'asfd',
  data() {
    return {
      active: 0,
      tabList: [
        {
          name: '小说',
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
        {
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
      ],
    }
  },
  created() {
    this.getList()
  },
  methods: {
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
      this.tabList[0].list = [...list, ...list]
      this.tabList[0].loading = true
      this.tabList[0].finished = true

      this.tabList[1].list = [...list, ...list]
      this.tabList[1].loading = true
      this.tabList[1].finished = true
    },
    // 清空
    clearAll() {
      this.$dialog.confirm({
        title: '提示',
        message: `是否清空当前${this.active == 0 ? '小说' : '短文'}阅读历史`,
      }).then(() => {
        // on confirm
        console.log("确认", this.active)
        this.tabList[this.active].list = []
      })
    },
    // 加入书架
    addBookRack (item) {
      if (item.isAdd) {
        this.$dialog.confirm({
          title: '提示',
          message: '是否取消加入书架',
        }).then(() => {
          // on confirm
          console.log("确认")
          item.isAdd = false
          this.$toast("取消成功")

          console.log(this.tabList[0].list)
        })
      } else {
        item.isAdd = true
        this.$toast("加入成功")
      }

      
    }
  },
}
</script>

<style lang="less" scoped>
.historyList-page {
  min-height: 100vh;
  background: #f5f5f5;
  .van-tab {
    flex: none;
  }
}
.book-item {
  position: relative;
  height: 230px;
  padding-left: 32px;
  background: #fff;
  &:last-child {
    &:after {
      display: none;
    }
  }
  .con {
    width: 530px;
  }
  .img {
    width: 134px;
    height: 180px;
    margin-right: 24px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
  .tit {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 64px;
  }
  .tag {
    opacity: 0.6;
    min-width: 120px;
    height: 40px;
    text-align: center;
    justify-content: center;
  }
  .author {
    margin-left: 32px;
    font-size: 24px;
    color: #999ead;
  }
  .add-btn {
    width: 144px;
    height: 40px;
    padding: 0;
    border-radius: 8px;
    font-size: 24px;
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
<style lang="less">
.historyList-page {
  .van-tabs__wrap {
    padding-bottom: 20px;
    margin-bottom: 16px;
  }
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
