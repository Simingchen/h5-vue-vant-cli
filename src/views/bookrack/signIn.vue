
<template>
  <section class="container">
    <van-nav-bar fixed title="签到" left-arrow @click-left="minxinNavLeft" />
    <div class="group">
      <header class="header">
        <h1 class="title">
          每日签到
          <img src="@img/icon_coin.png" alt="签到" class="coin" />
        </h1>
        <p class="tip">币奖励多多，可扩展书架数量哦～</p>
      </header>
      <sign-in></sign-in>
      <div class="coin-box flex-row-center">
        <div class="coin-left flex-row-center">
          <img src="@img/ic_yt_coin.png" alt="金币" class="coin" />
          <div class="text-box">
            <p class="title">我的币</p>
            <p class="text">点滴珍贵，重在积累</p>
          </div>
        </div>
        <p class="number">120个</p>
      </div>
    </div>

    <div class="rules-box mt-16">
      <h1 class="title">规则说明</h1>
      <p class="rule-item">
        <span class="point"></span> 连续签到，币递增赚不停。
      </p>
      <p class="rule-item">
        <span class="point"></span> 首次签到得5个币，连续签到每次递增5个币，最高递增至100币，如有中断从5个币开始累积。
      </p>
      <p class="rule-item">
        <span class="point"></span> 如有作弊行为（如同一用户使用多账号、多设备等行为），则无法领取币。
      </p>
      <p class="rule-item">
        <span class="point"></span> 游客用户和注册用户兔币数量不同步。
      </p>
    </div>
  </section>
</template>

<script>
import signIn from '@/components/bookrack/signIn'

export default {
  components: {
    signIn,
  },
}
</script>

<style lang="less" scoped>
.group {
  background: #fff;
  padding: 0 48px;
  border-top: 1px solid transparent;
}
.header {
  margin: 152px 0 52px;
  .title {
    font-size: 44px;
    line-height: 60px;
    color: #323232;
  }
  .coin {
    width: 48px;
    height: 48px;
  }
  .tip {
    font-size: 28px;
    line-height: 40px;
    color: #8e93a1;
    padding-top: 8px;
  }
}

.coin-box {
  padding: 48px 0;

  .coin {
    width: 64px;
    height: 64px;
    margin-right: 24px;
    vertical-align: middle;
  }

  .text-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    font-size: 32px;
    color: #323232;
    line-height: 44px;
  }
  .text {
    font-size: 28px;
    line-height: 40px;
    color: #9c9bad;
  }

  .number {
    font-size: 32px;
    color: @primary;
  }
}

.rules-box {
  padding-left: 48px;
  background: #fff;

  .title {
    line-height: 120px;
    border-bottom: 1px solid @border;
    font-size: 32px;
    color: #323232;
    font-weight: bold;
  }

  .rule-item {
    display: flex;
    font-size: 14px;
    line-height: 40px;
    color: #646464;
    margin-top: 32px;

    .point {
      display: inline-block;
      width: 12px;
      height: 12px;
      margin-right: 8px;
      background: #8e93a1;
      vertical-align: middle;
      flex-shrink: 0;
      margin-top: 10px;
    }
  }
}
</style>