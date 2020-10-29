<template>
  <van-overlay :show="value" z-index="99">
    <section class="wrapper">
      <div class="wrapper-inner">
        <img src="@img/new_gift_bg.png" alt="背景图" class="bg" />
        <img src="@img/icon_new_gift.png" alt="背景图-礼物" class="bg-gift" />

        <div class="gift-content">
          <p class="gift-item">
            <img class="gift-icon" src="@img/ic_reward_ad_privilege.png" alt="广告" />
            <span>免广告特权3天</span>
          </p>
          <p class="gift-item">
            <img class="gift-icon" src="@img/ic_reward_coin.png" alt="兔币" />
            <span>币10</span>
          </p>
          <p class="gift-item">
            <img class="gift-icon" src="@img/ic_reward_book.png" alt="书" />
            <span>神秘书籍1本</span>
          </p>
          <p class="gift-item">
            <img class="gift-icon" src="@img/ic_reward_font.png" alt="字体" />
            <span>特殊字体：雅酷黑体</span>
          </p>
        </div>

        <img src="@img/icon_fetch.png" alt="领取按钮" class="submit" />

        <p class="tip">
          <input class="remember" type="checkbox" name id />
          记住我的选择，不再提示
        </p>
      </div>
      <van-icon name="close" color="#ffffff" size="40" @click="handleClose" />
    </section>
  </van-overlay>
</template>

<script>
export default {
  name: 'novice-gift',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose() {
      this.$emit('input', !this.value)
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
  min-height: 600px;
  margin-bottom: 72px;
  position: relative;
  background: #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  .bg {
    position: absolute;
    width: 536px;
    top: 0;
    right: 0;
    z-index: 0;
  }
  .bg-gift {
    position: absolute;
    width: 644px;
    max-width: 750px;
    left: -24px;
    top: -86px;
    z-index: 1;
  }

  .submit {
    display: block;
    width: 184px;
    height: 70px;
    margin: 0 auto;
  }

  .tip {
    padding: 22px 0 32px;
    font-size: 24px;
    color: #b7b7b7;
    line-height: 34px;
    text-align: center;

    input[type='checkbox'] {
      width: 24px;
      height: 24px;
      border: 2px solid #76a9ff;
      border-radius: 50%;
      vertical-align: middle;

      &:checked {
        background: rgba(118, 169, 255, 0.5);
        position: relative;
        // border: 4px solid rgba(118, 169, 255, 0.5);

        &::after {
          content: '';
          width: 12px;
          height: 12px;
          background: #76a9ff;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 4px;
        }
      }
    }
  }
}

.gift-content {
  padding: 190px 0 0 92px;
  position: relative;
  z-index: 1;
  .gift-item {
    margin-bottom: 30px;
    font-size: 32px;
    line-height: 44px;
    vertical-align: middle;
    color: #323232;
  }

  .gift-icon {
    width: auto;
    height: 48px;
    margin-right: 32px;
  }
}
</style>