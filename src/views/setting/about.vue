<template>
  <section class="container">
    <van-nav-bar title="关于我们" left-arrow @click-left="minxinNavLeft" />

    <div class="info-content">
      <img src="@img/icon_me_head.png" alt="阅读logo" class="logo" />
      <p class="title">阅读</p>
      <p class="title-sub">文学魅力 不止于此</p>

      <div class="btns-box">
        <van-button
          class="btn"
          round
          plain
          color="#646464"
          :to="{ path: '/article/agreement' }"
        >版权说明</van-button>
        <van-button class="btn" round plain color="#646464" :to="{ path: '/article/privacy' }">隐私说明</van-button>
      </div>
    </div>

    <p class="version">版本: {{ $config.version }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>

<style lang="less" scoped>
.container {
  background: #fff;
}

.info-content {
  margin-top: 290px;
  text-align: center;

  .logo {
    width: 276px;
    height: auto;
  }

  .title {
    font-size: 36px;
    line-height: 50px;
    color: #666;
    font-weight: bold;
  }

  .title-sub {
    font-size: 24px;
    line-height: 36px;
    margin-top: 8px;
  }

  .btns-box {
    margin-top: 200px;

    .btn {
      display: block;
      margin: 0 auto;
      height: 80px;
      border-radius: 40px;
    }

    .btn + .btn {
      margin-top: 48px;
    }
  }
}

.version {
  position: absolute;
  left: 0;
  bottom: 48px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #999;
}
</style>