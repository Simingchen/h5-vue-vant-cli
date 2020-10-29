
<template>
  <van-overlay :show="value" z-index="99">
    <section class="wrapper">
      <div class="wrapper-inner">
        <img src="@img/img_read_reward_dialog_header.png" alt="背景图" class="bg" />
        <p class="content">
          <span class="minute">{{ minute }}</span>
          今日已阅读/分钟
        </p>

        <div class="minute-wrapper">
          <div
            :class="['minute-item flex-row-center', minute >= lists[i].minute ? 'minute-item-act' : '']"
            v-for="(item, i) in lists"
            :key="i"
          >
            <div class="number-box">
              <div class="gift-box" @click="handleShowGift(item.giftList)">
                <p class="gift" v-if="item.giftList">
                  <img src="@img/icon_gift.png" alt="礼物" class="gift-img" />
                  <span class="gift-num">X{{ item.boxNum }}</span>
                </p>
              </div>
              <p class="point">
                <span class="point-start"></span>
              </p>
              <p class="coin-box">
                <span class="coin" v-if="i !== 0">{{ item.minute }}分</span>
              </p>
            </div>
            <p class="line" v-if="i % 7 !== 6 && i + 1 !== lists.length"></p>
          </div>
        </div>
        <!-- 礼物弹窗 -->
        <gift v-model="showGift" />

        <p class="tip">继续阅读15分钟即可获得奖励</p>
      </div>
      <van-icon name="close" color="#ffffff" size="40" @click="handleClose" />
    </section>
  </van-overlay>
</template>

<script>
import gift from '@/components/bookrack/gift'
export default {
  name: 'read-time',
  components: {
    gift,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      minute: 30,
      lists: [
        { id: 1, boxNum: 0, minute: 0 },
        { id: 1, boxNum: 0, minute: 20 },
        { id: 1, boxNum: 0, minute: 40 },
        { id: 1, boxNum: 1, minute: 60, giftList: [{ giftName: '币:100', giftType: 1 }] },
        { id: 1, boxNum: 0, minute: 90 },
        { id: 1, boxNum: 0, minute: 120 },
      ],
      showGift: false,
    }
  },
  methods: {
    handleShowGift(data) {
      // todo
      this.showGift = true
    },
    handleClose() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.wrapper-inner {
  width: 560px;
  padding: 0 32px;
  margin-bottom: 72px;
  position: relative;
  background: #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  .bg {
    position: absolute;
    width: 100%;
    left: 0;
    top: -54px;
    z-index: 1;
  }
  .content {
    padding-top: 350px;
    color: #323232;
    font-size: 28px;
    vertical-align: bottom;
    line-height: 1;

    .minute {
      font-size: 144px;
      font-weight: normal;
      font-family: DINAlternate-Bold;
    }
  }

  .tip {
    font-size: 24px;
    color: #b7b7b7;
    line-height: 34px;
    text-align: center;
    padding-bottom: 48px;
  }
}

.minute-wrapper {
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: height 0.3s linear;
  overflow: hidden;

  .minute-item {
    display: flex;
  }

  .minute-item-act {
    .point {
      color: #323232;
    }
    .point-start {
      background: #323232;
    }
    .line {
      background: #323232;
    }
    .coin {
      color: #ffbf49;
    }
  }

  .number-box {
    font-size: 24px;
    color: #b7b7b7;
    width: 40px;
    min-height: 150px;
    text-align: center;
  }
  .gift-box {
    min-height: 60px;
    width: 80px;
    .gift-img {
      width: 42px;
    }
    .gift-num {
      color: @primary;
      font-size: 20px;
      transform: scale(0.5);
      vertical-align: bottom;
    }
  }
  .coin-box {
    min-height: 60px;
    line-height: 60px;
    font-size: 20px;
    width: 80px;
    margin-left: -20px;
  }
  .point-start {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #b7b7b7;
    border-radius: 50%;
  }
  .line {
    width: 46px;
    height: 4px;
    background: #b7b7b7;
  }
}
</style>