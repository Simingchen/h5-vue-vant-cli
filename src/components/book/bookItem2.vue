// 书籍 item 左右结构样式，含评分
<template>
  <div>
    <div class="book-list">
      <div
        class="book-item flex-box"
        v-for="(item, index) in computedList"
        :key="index"
        @click="mixinBookDetail(item)"
      >
        <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
        <div class="con">
          <div class="tit ellipsis">{{ item.name }}</div>
          <div class="desc">{{ item.intro }}</div>
          <div class="flex-row-center bot">
            <div class="type">{{ item.clsName }} | {{ item.author }}</div>
            <van-button class="score" plain :color="$config.primaryColor">{{ item.strScore }}分</van-button>
          </div>
        </div>
      </div>
    </div>
    <div class="change-bar flex-center van-hairline--top" v-if="isChange" @click="change">
      换一换
      <van-icon class="change" name="replay" />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    limit: {
      // 切换下显示失效
      type: Number,
      default: 0,
    },
    isChange: {
      // 是否可切换
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      changeNum: 3, // 换一换数量
      changeIndex: 0, // 换一换索引
      inithangeList: cloneDeep(this.list), // 换一换保留数据
    }
  },
  computed: {
    computedList() {
      const tempList = Object.freeze(this.list || [])
      // 截取60个文字
      tempList.forEach((item) => {
        item.intro = item.intro.slice(0, 60)
      })

      if (!this.limit) return tempList
      // 有换一换情况下取3个
      return tempList.slice(0, this.isChange ? this.changeNum : this.limit)
    },
  },
  methods: {
    // 等分数组
    group(array, subGroupLength) {
      let index = 0
      let newArray = []
      while (index < array.length) {
        newArray.push(array.slice(index, (index += subGroupLength)))
      }
      return newArray
    },
    // 换一换，在原始保留数据下切分成等比多维数组再循环显示
    change() {
      var tempList = this.group(this.inithangeList, 3)

      this.changeIndex++
      if (this.changeIndex > tempList.length - 1) {
        this.changeIndex = 0
      }
      console.log(tempList)
      this.list = tempList[this.changeIndex]
    },
  },
}
</script>

<style lang="less" scoped>
.change-bar {
  height: 88px;
  color: @primary;
  .change {
    transform: rotate(90deg);
  }
}
.book-list {
  padding: 0 32px;
  overflow: hidden;
}
.book-item {
  position: relative;
  flex-wrap: wrap;
  margin-bottom: 32px;
  .con {
    width: 446px;
  }
  .tit {
    font-size: 32px;
    color: #323232;
    line-height: 44px;
    font-weight: 600;
  }
  .desc {
    height: 120px;
    margin-top: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /*! autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    color: #8e93a1;
    line-height: 40px;
    font-size: 28px;
  }
  .img {
    width: 192px;
    height: 256px;
    margin-right: 48px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
  .type {
    font-size: 24px;
    color: #b7b7b7;
  }
  .bot {
    margin-top: 44px;
  }
  .score {
    min-width: 80px;
    padding: 0;
    height: 36px;
    opacity: 0.6;
    border-radius: 6px;
    font-size: 20px;
  }
}
</style>
