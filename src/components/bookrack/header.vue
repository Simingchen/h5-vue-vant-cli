<template>
  <section class="header-wrapper">
    <img src="@img/bookrack_head_bg.jpg" alt="书架背景图" class="bg" />
    <van-sticky @scroll="onScroll" :class="showHeader ? '' : 'hide'">
      <header class="header flex-row-center" :class="isFixed ? 'header-fixed' : ''">
        <img :src="require(`@img/bookrack_head_list_${value === 'row' ? '1' : '2'}.png`)" alt="icon" class="trigger icon" @click="handleChangeType" />
        <img src="@img/bookrack_head_logo.png" alt="书架logo" class="logo" />
        <p class="icon-box flex-row-center">
          <img src="@img/bookrack_head_play.png" alt="书架听书" class="play icon" />
          <img src="@img/bookrack_head_search.png" alt="书架搜索" class="search icon" v-url="`/search`" />
          <img src="@img/bookrack_head_add.png" alt="书架扩展" class="add icon" @click="showExpasion = !showExpasion" />
        </p>
      </header>
    </van-sticky>

    <div class="middle flex-row-center">
      <div class="today" @click="handleShowReadTime">
        <h1 class="day">30 <span class="point"></span></h1>
        <p>今日阅读/分钟</p>
      </div>
      <img src="@img/icon_gift.png" alt="gift" class="gift" @click="handleShowNoviceGift" />
    </div>

    <div class="bottom">
      <div class="notice flex-row-center" v-url="{ path: '/setting/noticeDetail', query: { id: 1 } }">
        <div class="date-box flex-column-center">
          <p class="day">23</p>
          <p class="month">Oct</p>
        </div>
        <div class="content">
          <p class="van-multi-ellipsis--l2">下周二米兔阅读将进行新版本更新，本次更新修复了BUG，并杀了一个程序员祭天。</p>
          <p class="content-tip">-- 米兔阅读官方</p>
        </div>
        <!-- <van-icon name="arrow" /> -->
      </div>
      <div class="book-box flex-row-center">
        <p class="limit">当前书架上限5/{{ limit }}</p>
        <p class="vertical-middle" v-url="`/bookrack/signIn`">
          <img src="@img/icon_coin.png" alt="签到" class="sign-in" />
          <span class="sign-text">签到有礼</span>
        </p>
      </div>
    </div>

    <div class="expansion" v-show="showExpasion">
      <p class="ex-item" @click="handleShowExpansion">扩充书架</p>
      <p class="ex-item" @click="handleArrangeBooks">整理书架</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'b-header',
  props: {
    value: String, //type
    limit: [Number, String], //书架上限
  },
  data() {
    return {
      isFixed: false,
      showHeader: true,
      showExpasion: false,
    }
  },
  created() {
    this.$eventBus.$on('booklist-longpress', (value) => {
      this.showHeader = value
    })
  },
  methods: {
    onScroll(e) {
      const offset = (window.innerWidth / 375) * 140
      if (e.scrollTop >= offset) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    },
    handleChangeType() {
      this.$emit('input', this.value === 'row' ? 'col' : 'row')
    },
    handleShowReadTime() {
      this.$emit('onShowReadTime')
    },
    handleShowNoviceGift() {
      this.$emit('onShowNoviceGift')
    },
    handleShowExpansion() {
      this.$emit('onShowExpansion')
      this.showExpasion = false
    },
    handleArrangeBooks() {
      this.$eventBus.$emit('arrangeBooks', true)
      this.showExpasion = false
    },
  },
}
</script>

<style lang="less" scoped>
.header-wrapper {
  position: relative;
}
.hide {
  opacity: 0;
}
.bg {
  width: 100%;
  height: 600px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

.header-fixed {
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 32px;
  background: #fff;

  .icon,
  .logo {
    filter: invert(50%);
  }
}

.header {
  width: 100%;
  height: 88px;
  line-height: 88px;
  padding: 20px 32px;

  .icon {
    width: 48px;
    height: auto;

    & + .icon {
      margin-left: 16px;
    }
  }
  .search {
    width: 64px;
  }
  .add {
    width: 56px;
  }
  .logo {
    width: 144px;
    margin-left: 120px;
  }
}

.middle {
  margin: 110px 32px 0;
  color: #fff;
  .day {
    font-family: DINAlternate-Bold;
    font-size: 108px;
    font-weight: bold;
    line-height: 1;
    position: relative;
    text-align: center;
  }
  p {
    font-size: 24px;
    opacity: 0.8;
    line-height: 46px;
  }
  .point {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: @primary;
    position: absolute;
    right: 30px;
    top: 0;
  }

  .gift {
    width: 80px;
  }
}

.bottom {
  margin: 12px 32px 0;
  padding: 0 32px;
  background: #fff;
  box-shadow: 0 0 16px 0 rgba(255, 187, 193, 0.42);
  border-radius: 8px;

  .notice {
    padding: 32px 0 16px 0;
    font-size: 28px;
    line-height: 44px;
    color: #323232;
    border-bottom: 1px solid @border;

    .date-box {
      width: 84px;
      height: 84px;
      margin-right: 24px;
      text-align: center;
      background: url(../../assets/img/bookrack_date_border.png) 0 0 no-repeat;
      background-size: 100% 100%;
      .day {
        font-size: 40px;
        line-height: 1;
        font-weight: bold;
        color: #323232;
      }
      .month {
        font-size: 24px;
        line-height: 1;
        color: #b7b7b7;
      }
    }

    .content {
      width: 80%;
      flex-shrink: 0;
    }

    .content-tip {
      text-align: right;
      font-size: 24px;
      line-height: 34px;
      color: #b7b7b7;
      margin-top: 12px;
    }
  }

  .book-box {
    line-height: 98px;
    font-size: 28px;

    .limit {
      color: #8e93a1;
    }

    .sign-in {
      width: 48px;
    }
    .sign-text {
      color: @primary;
    }
  }
}

.expansion {
  position: fixed;
  top: 106px;
  right: 32px;
  width: 228px;
  background: #ffffff;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 2;

  .ex-item {
    line-height: 72px;
    text-align: center;
    color: #4a90e2;
    font-size: 28px;
  }
}
</style>