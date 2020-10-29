<template>
  <section class="list-wrapper">
    <div :class="type === 'row' ? 'list-row' : 'list-col'">
      <div :class="type === 'row' ? 'list-item-row' : 'list-item-col'" v-for="(item, i) in dataList" :key="i" v-longpress="onLongTouch">
        <div class="img-box">
          <img v-lazy="item.photoPath" alt="书籍" class="thumb" />
          <p class="update">
            <span>更新</span>
          </p>
          <img src="@img/ic_shelf_audio.png" alt="" class="listen" />
          <!-- 多选 -->
          <input v-show="isLongTouch" class="van-icon checkbox" type="checkbox" v-model="item.checked" name="" id="" />
        </div>
        <div v-show="type === 'row'">
          <h5 class="title van-ellipsis">{{ item.name }}</h5>
          <p class="author">{{ item.author }}</p>
        </div>

        <div class="item-info" v-show="type === 'col'">
          <h3 class="title van-ellipsis">{{ item.name }}</h3>
          <p class="type">{{ item.clsName }} | {{ item.author }}</p>
          <p class="dec van-ellipsis">更新 第一千四百三十章信息互换除恶乎好...</p>
          <div class="has-read">
            <span class="process">{{ item.readPercent }}</span>
            <span class="read">已读</span>
          </div>
        </div>
      </div>
      <div class="list-item-row add-box" v-show="type === 'row'" v-url="{ path: '/' }">
        <van-icon name="plus" :color="$config.primaryColor" size="50" />
        <!-- <img src="@img/icon_shelf_add.png" alt="添加" class="add-icon" /> -->
      </div>
    </div>

    <!-- 长按功能区 -->
    <van-sticky @scroll="onScroll" v-show="isLongTouch">
      <div class="top-bar flex-row-center" :class="isFixed ? 'top-bar-fixed' : ''">
        <span @click="handleCheckAll">全选</span>
        <span class="title">已选择{{ checkeds }}本</span>
        <span @click="handleCancel">取消</span>
      </div>
    </van-sticky>

    <van-tabbar v-model="tabIndex" z-index="99" active-color="#323232" v-show="isLongTouch">
      <van-tabbar-item v-for="(item, index) in tabLists" :key="index" fixed @click="handleChangeBar">
        <span>{{ item.name }}</span>
        <template #icon>
          <img class="tabbar-img" :src="item.icon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <!-- 删除弹窗 -->
    <van-overlay :show="showDel" z-index="100">
      <div class="del-wrapper">
        <h2 class="title">{{ checkeds }}本书将从书架删除</h2>
        <p class="content" @click="handleDelConfirm">删除书籍</p>
        <van-button class="cancel" color="#F5F5F5" @click="handleDelCancel">取消</van-button>
      </div>
    </van-overlay>

    <!-- 书籍详情 -->
    <van-overlay :show="showDetail" z-index="100">
      <div class="detail-wrapper">
        <div class="swiper-box flex-row-center">
          <van-swipe ref="swipe" @change="onSwipeChange" style="width: 16rem" :show-indicators="false">
            <van-swipe-item class="swipe-item" v-for="(swipe, s) in swipeLists" :key="s" style="width: 16rem">
              <img v-lazy="swipe.photoPath" alt="" class="thumb" />
              <div class="swipe-info">
                <h3 class="title">{{ swipe.name }}</h3>
                <p class="author">作者: {{ swipe.author }}</p>
                <p class="size">大小: 3KB</p>
              </div>
            </van-swipe-item>
          </van-swipe>
          <van-icon name="arrow" size="20" @click="handleNextSwipe" />
        </div>
        <p class="indicator">{{ swipeIndex }}/{{ swipeLists.length }}</p>
        <p class="content">
          <van-icon class="icon" name="orders-o" size="25" color="#323232" />
          更换封面
        </p>
        <van-button class="cancel" color="#F5F5F5" @click="handleDetailCancel">取消</van-button>
      </div>
    </van-overlay>
  </section>
</template>

<script>
export default {
  name: 'book-list',
  props: {
    type: {
      // 列表类型 row or col
      type: String,
      default: 'row',
    },
    lists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLongTouch: false,
      isFixed: false, // 滚动固定
      tabIndex: 0, //功能栏index
      tabLists: [
        {
          name: '删除',
          icon: require('@img/icon_shelf_operation_delete.png'),
        },
        {
          name: '移动至',
          icon: require('@img/icon_shelf_operation_move.png'),
        },
        {
          name: '书籍详情',
          icon: require('@img/icon_shelf_operation_detail.png'),
        },
        {
          name: '整理书架',
          icon: require('@img/icon_shelf_operation_tidy.png'),
        },
      ],
      dataList: [],
      showDel: false, // 显示删除弹窗
      showDetail: false, //显示详情弹窗
      swipeIndex: 1, //
    }
  },
  computed: {
    checkeds() {
      let rs = 0
      this.dataList.forEach((item) => {
        if (item.checked) rs += 1
      })
      return rs
    },
    swipeLists() {
      return this.dataList.filter((item) => item.checked)
    },
  },
  watch: {
    isLongTouch(val) {
      this.$eventBus.$emit('booklist-longpress', !val)
    },
    lists: {
      handler(val) {
        this.dataList = val
      },
      immediate: true,
    },
  },
  created() {
    this.$eventBus.$on('arrangeBooks', (val) => {
      this.isLongTouch = val
    })
  },
  methods: {
    onLongTouch(e) {
      console.log(e)
      if (this.type === 'col') return
      this.isLongTouch = true
    },
    onScroll(e) {
      const offset = (window.innerWidth / 375) * 140
      if (e.scrollTop >= offset) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    // 取消功能区
    handleCancel() {
      this.isLongTouch = false
      this.dataList.forEach((item) => (item.checked = false))
    },
    // 全选
    handleCheckAll() {
      this.dataList.forEach((item) => (item.checked = true))
    },
    handleChangeBar() {
      switch (this.tabIndex) {
        case 0:
          this.delBooks()
          break
        case 1:
          this.removeBooks()
          break
        case 2:
          this.bookDetail()
          break
        case 3:
          this.arrangeBooks()
          break
      }
    },
    delBooks() {
      // todo
      if (this.checkeds === 0) {
        this.$toast('请选择删除的书')
        return
      }
      this.showDel = true
    },
    // 取消删除
    handleDelCancel() {
      this.showDel = false
    },
    handleDelConfirm() {
      // todo
      this.dataList = this.dataList.filter((item) => !item.checked)
      this.$toast('删除成功')
      this.showDel = false
    },
    removeBooks() {
      // todo
      this.minxinTips()
    },
    //  详情弹窗 start =============
    bookDetail() {
      // todo
      if (this.checkeds === 0) {
        this.$toast('请选择要查看的书')
        return
      }
      this.showDetail = true
      //  swipe 组件和弹窗组件在一起使用，会有bug,找不到rect对象，需要重新初始化
      setTimeout(() => {
        this.$refs['swipe'].initialize()
      }, 100)
    },
    //
    onSwipeChange(index) {
      console.log(index)
      this.swipeIndex = index + 1
    },
    //
    handleNextSwipe() {
      this.$refs['swipe'].next()
    },
    //  取消--详情弹窗
    handleDetailCancel() {
      this.showDetail = false
    },
    //  详情弹窗 end ============
    arrangeBooks() {
      // todo
      this.minxinTips()
    },
  },
}
</script>

<style lang="less" scoped>
* {
  user-select: none;
}
img {
  pointer-events: none; /* 禁止长按图片保存 */
}
.list-row {
  padding: 0 32px;
  display: flex;
  flex-wrap: wrap;
}

.update {
  position: absolute;
  left: 0;
  top: 0;
  min-width: 100px;
  height: 30px;
  line-height: 30px;
  background: url(../../assets/img/icon_update_act.png) 0 0 no-repeat;
  background-size: 100% 100%;
  text-align: center;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: @primary;
    position: absolute;
    left: 10px;
    top: 11px;
  }

  // & ::after {
  //   content: '';
  //   position: absolute;
  //   right: -30px;
  //   bottom: 0px;
  //   width: 0;
  //   height: 0;
  //   border-top: 30px solid rgba(0, 0, 0, 0.5);
  //   border-right: 30px solid transparent;
  // }

  span {
    font-size: 20px;
    color: #fff;
    transform: scale(0.1);
  }
}

.listen {
  width: 48px;
  height: 48px;
  position: absolute;
  left: 8px;
  bottom: 8px;
}

.checkbox {
  position: absolute;
  top: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border: 1px solid #fff;
  border-radius: 50%;
  background: rgba(116, 116, 116, 0.8);

  &:checked {
    background: @primary;

    &::before {
      content: '\F0C8';
      color: #fff;
    }
  }
}

.list-item-row {
  width: 194px;
  margin-top: 32px;

  &:nth-child(3n + 2) {
    margin: 32px 48px 0;
  }

  .img-box {
    width: 100%;
    height: 256px;
    box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
    position: relative;
  }

  .title {
    font-size: 28px;
    font-weight: bold;
    color: #323232;
    line-height: 40px;
    padding: 16px 0 4px 0;
  }

  .author {
    font-size: 24px;
    color: #8e93a1;
    line-height: 34px;
  }
}

.add-box {
  width: 192px;
  height: 256px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @background;

  .add-icon {
    width: 80px;
    height: 80px;
  }
}

// col
.list-col {
  width: 100%;
}
.list-item-col {
  padding: 25px 0 0 32px;
  display: flex;
  align-items: center;

  .img-box {
    width: 112px;
    height: 140px;
    margin-right: 24px;
    box-shadow: 0 4px 4px 0 rgba(80, 80, 80, 0.2);
    position: relative;
    flex-shrink: 0;

    .thumb {
      width: 100%;
      height: 100%;
    }
  }
  .item-info {
    font-size: 24px;
    color: #8e93a1;
    line-height: 28px;
    border-bottom: 1px solid @border;
    position: relative;
    flex: 1;
  }
  .title {
    width: 70%;
    padding: 28px 0 14px 0;
    font-size: 32px;
    line-height: 48px;
    color: #323232;
    font-weight: bold;
  }
  .type {
    padding-bottom: 14px;
  }
  .dec {
    width: 90%;
    padding-bottom: 24px;
  }
  .has-read {
    position: absolute;
    right: -4px;
    top: 16px;
    width: 180px;
    height: 60px;
    line-height: 60px;
    background: url(../../assets/img/bookrack_has_read.png) 0 0 no-repeat;
    background-size: 100% 100%;
    color: #fff;
    font-size: 24px;
    text-indent: 15px;
    .read {
      display: inline-block;
      transform: scale(0.8);
    }
    .process {
      font-weight: bold;
    }
  }
}

.top-bar-fixed {
  background: #fff;
  color: #323232 !important;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  padding: 0 32px;
  height: 86px;
  line-height: 86px;
  color: #fff;
  font-size: 28px;

  .title {
    font-size: 36px;
  }
}
.tabbar-img {
  width: 48px;
}

.del-wrapper,
.detail-wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding-bottom: 60px;
  background: #fff;
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  text-align: center;

  .content {
    line-height: 108px;
    font-size: 32px;
    color: @primary;
    border-top: 1px solid @border;
    border-bottom: 1px solid @border;
  }

  .cancel {
    display: block;
    width: 686px;
    height: 92px;
    border-radius: 16px;
    color: #8e93a1 !important;
    margin: 48px auto 0;
  }
}

.del-wrapper {
  .title {
    height: 134px;
    font-size: 28px;
    line-height: 134px;
  }
}

.detail-wrapper {
  .content {
    color: #323232;
    text-align: left;

    .icon {
      vertical-align: middle;
      padding: 0 32px;
    }
  }
  .swiper-box {
    padding: 48px 32px 0;
  }
  .swipe-item {
    display: flex;
    padding-left: 4px;
  }
  .thumb {
    width: 124px;
    height: 164px;
    box-shadow: 0 4px 4px 0 rgba(80, 80, 80, 0.2);
    margin-right: 26px;
  }
  .swipe-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 28px;
    color: #8e93a1;
    text-align: left;
    align-items: flex-start;

    .title {
      font-size: 36px;
      color: #323232;
    }
  }

  .indicator {
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    padding: 24px 0;
    color: #c7c7c7;
  }
}
</style>