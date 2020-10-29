<template>
  <section class="wrapper">
    <img src="@img/new_gift_bg.png" alt=" 背景图" class="bg" />
    <img src="@img/img_sign_in_bird.png" alt="鸟" class="bird" />
    <div class="date-box">
      <p class="week">星期六</p>
      <p class="date">2020.10</p>
      <p class="day">24</p>
    </div>

    <!-- 日历 -->
    <div :class="['calendar-wrapper', trigger ? '' : 'calendar-height-limit']">
      <div
        :class="['calender-item flex-row-center', i <= hasSignDay ? 'calender-item-act' : '']"
        v-for="(item, i) in days"
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
            <span class="point-start" v-if="i === 0"></span>
            <span v-else>{{ item.day }}</span>
          </p>
          <p class="coin-box">
            <span class="coin" v-if="i !== 0">{{ item.coin }}币</span>
          </p>
        </div>
        <p class="line" v-if="i % 8 !== 7 && i + 1 !== days.length"></p>
      </div>
    </div>
    <p class="arrow" @click="trigger = !trigger">
      <van-icon :name="trigger ? 'arrow-up' : 'arrow-down'" color="#323232" />
    </p>
    <van-button round class="sign-btn" color="#FFBBC1">已连续签到{{ hasSignDay }}天</van-button>
    <img src="@img/icon_reward_ad.png" alt="广告" class="ad" />

    <!-- 礼物弹窗 -->
    <gift v-model="showGift" />
  </section>
</template>

<script>
import gift from '@/components/bookrack/gift'

export default {
  name: 'sign-in',
  components: {
    gift,
  },
  data() {
    return {
      hasSignDay: 7, //连续签到次数
      trigger: false, //展开or收起
      showGift: false, // 是否显示礼物弹窗
      days: [
        {},
        { boxNum: 0, coin: 0, day: 1, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 2, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 3, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 4, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 5, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 6, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 7, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 8, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 9, isCheckFlag: 0 },
        { boxNum: 1, coin: 30, day: 10, giftList: [{ giftName: '币:100', giftType: 1 }], isCheckFlag: 1 },
        { boxNum: 0, coin: 0, day: 11, isCheckFlag: 0 },
        { boxNum: 0, coin: 30, day: 12, isCheckFlag: 1 },
        { boxNum: 0, coin: 0, day: 13, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 14, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 15, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 16, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 17, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 18, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 19, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 20, isCheckFlag: 0 },
        { boxNum: 0, coin: 0, day: 21, isCheckFlag: 0 },
        { boxNum: 0, coin: 30, day: 22, isCheckFlag: 1 },
        { boxNum: 0, coin: 40, day: 23, isCheckFlag: 1 },
        {
          boxNum: 2,
          coin: 50,
          day: 24,
          giftList: [
            { giftName: '币:250', giftType: 1 },
            { giftName: '免广告特权8天', giftType: 3 },
          ],
          isCheckFlag: 1,
        },
        { boxNum: 0, coin: 60, day: 25, isCheckFlag: 0 },
        {
          boxNum: 3,
          coin: 70,
          day: 26,
          giftList: [
            { giftName: '免广告特权7天', giftType: 3 },
            { giftName: '币:800', giftType: 1 },
            { giftName: '特殊字体:活动奖励字体', giftType: 4 },
          ],
          isCheckFlag: 0,
        },
        { boxNum: 0, coin: 80, day: 27, isCheckFlag: 0 },
        { boxNum: 0, coin: 80, day: 28, isCheckFlag: 0 },
        { boxNum: 0, coin: 80, day: 29, isCheckFlag: 0 },
        { boxNum: 0, coin: 80, day: 30, isCheckFlag: 0 },
        { boxNum: 0, coin: 80, day: 31, isCheckFlag: 0 },
      ],
    }
  },
  methods: {
    handleShowGift(list) {
      this.showGift = true
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  position: relative;
  background: #ffffff;
  box-shadow: 0 8px 16px 2px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  padding-bottom: 72px;

  .bg {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    width: 536px;
    height: 242px;
  }

  .bird {
    position: absolute;
    top: -28px;
    right: 0;
    z-index: 2;
    width: 300px;
    height: 300px;
  }
}

.date-box {
  padding: 48px 20px 72px;
  color: #323232;
  line-height: 1;
  font-weight: 400;
  .week {
    font-size: 32px;
  }
  .date {
    font-size: 28px;
  }
  .day {
    font-size: 144px;
    font-weight: bold;
  }
}

.calendar-height-limit {
  height: 150px !important;
  overflow: hidden;
}

.calendar-wrapper {
  padding: 0 40px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  transition: height 0.3s linear;
  overflow: hidden;

  .calender-item {
    display: flex;
  }

  .calender-item-act {
    .point {
      color: #323232;
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
    background: #323232;
    border-radius: 50%;
  }
  .line {
    width: 36px;
    height: 4px;
    background: #b7b7b7;
  }
}

.arrow {
  line-height: 32px;
  text-align: center;
}

.sign-btn {
  display: block;
  width: 560px;
  height: 80px;
  margin: 32px auto 0;
}

.ad {
  width: 100%;
  height: 196px;
}
</style>