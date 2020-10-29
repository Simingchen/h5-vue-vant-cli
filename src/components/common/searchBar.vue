<template>
  <section class="wrapper">
    <van-nav-bar fixed left-text="取消" right-text="搜索" @click-left="onCancel" @click-right="onSearch">
      <template #title>
        <van-search v-model="searchKey" shape="round" placeholder="请输入书名或者作者名" @focus="onFocus" />
      </template>
    </van-nav-bar>
    <!-- 历史记录 -->
    <div class="search-history" v-show="showHistory">
      <div class="history-head flex-row-center">
        <span class="history">搜索历史</span>
        <p class="clear vertical-middle" @click="handleClear">
          <van-icon name="delete" size="20" />
          <span>清空记录</span>
        </p>
      </div>
      <div class="history-list">
        <p class="history-item vertical-middle" v-for="(item, i) in historyList" :key="i" @click="handleSearchItem(item)">
          <van-icon name="underway-o" />
          <span>{{ item }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'search-bar',
  data() {
    return {
      searchKey: '',
      showHistory: false,
      historyList: [],
    }
  },
  created() {
    const history = window.localStorage.getItem('youtuReader_search_history')
    if (history) {
      this.historyList = JSON.parse(history)
    }
  },
  methods: {
    onSearch() {
      // todo
      if (!this.searchKey) {
        this.$toast('请输入关键字进行查询！')
        return
      }
      this.historyList.push(this.searchKey)
      window.localStorage.setItem('youtuReader_search_history', JSON.stringify(this.historyList))
      this.$emit('onSearch', this.searchKey)
    },
    onFocus() {
      this.showHistory = true
    },
    onCancel() {
      if (this.showHistory) {
        this.showHistory = false
      } else {
        this.$router.go(-1)
      }
    },
    handleClear() {
      this.historyList = []
      window.localStorage.setItem('youtuReader_search_history', '')
    },
    /**
     * @description: 单个点击搜索，入口： 搜索记录，大家都在搜，链接进入搜索
     * @param {*} item
     * @param {*} flag 是否保存记录
     * @return {*}
     */
    handleSearchItem(item, flag) {
      this.searchKey = item
      this.showHistory = false
      if (flag) {
        this.historyList.push(this.searchKey)
        window.localStorage.setItem('youtuReader_search_history', JSON.stringify(this.historyList))
      }
      this.$emit('onSearch', this.searchKey)
    },
  },
}
</script>

<style lang="less" scoped>
.search-history {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 0;
  z-index: 2;
  margin: auto;
  padding: 20px 30px;
  background: #fff;

  .history-head {
    .history {
      font-size: 32px;
      color: #323232;
      font-weight: bold;
    }
    .clear {
      font-size: 28px;
      color: #8e93a1;
    }
  }

  .history-list {
    margin-top: 40px;
    font-size: 28px;
    color: rgb(142, 147, 161);
  }
  .history-item {
    margin-bottom: 40px;

    span {
      margin-left: 20px;
    }
  }
}

/deep/.van-nav-bar__title {
  max-width: 520px;
  width: 520px;
}
/deep/.van-search {
  padding: 0;
}
/deep/.van-nav-bar__right .van-nav-bar__text {
  color: @primary;
}
</style>