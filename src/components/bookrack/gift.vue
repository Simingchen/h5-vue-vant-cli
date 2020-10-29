<template>
  <div :class="['gift-dialog', value ? '' : 'gift-dialog-hide']">
    <p class="arrow" @click="handleClick">
      <van-icon name="arrow" size="12" />
    </p>
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
  </div>
</template>

<script>
export default {
  name: 'gift',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('input', !this.value)
    },
  },
}
</script>

<style lang="less" scoped>
.gift-dialog-hide {
  width: 0 !important;
  overflow: hidden;
}

.gift-dialog {
  position: absolute;
  right: 0;
  top: 74px;
  z-index: 3;
  width: 370px;
  display: flex;
  background: #fff;
  transition: width 0.3s linear;
  overflow: hidden;

  .arrow {
    width: 32px;
    background: #f9f9f9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gift-content {
    width: 338px;
    padding: 34px 20px;
    font-size: 24px;
    color: #323232;
    flex-shrink: 0;
  }
  .gift-item + .gift-item {
    margin-top: 25px;
  }

  .gift-icon {
    width: 40px;
    margin-right: 20px;
    vertical-align: middle;
  }
}
</style>