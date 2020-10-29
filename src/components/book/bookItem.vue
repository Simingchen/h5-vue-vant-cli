// 书籍 item 上下结构样式
<template>
  <div>
    <div class="book-list">
      <div
        class="book-item"
        v-for="(item, index) in computedList"
        :key="index"
        @click="mixinBookDetail(item)"
      >
        <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" />
        <div class="tit ellipsis">{{ item.name }}</div>
        <div class="desc ellipsis">{{ item.author }}</div>
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
  // color: @primary;
  .change {
    transform: rotate(90deg);
  }
}
.book-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 32px;
}
.book-item {
  position: relative;
  width: 192px;
  margin-right: 54px;
  // height: 260px;
  margin-bottom: 20px;
  &:nth-child(3n) {
    margin-right: 0;
  }
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
    line-height: 40px;
  }
  .img {
    width: 192px;
    height: 256px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  }
}
</style>
