<template>
  <section class="list-wrapper mt-16">
    <h2 class="header vertical-middle">
      <span class="line"></span>
      <span class="name">用户评论</span>
      <span class="number">999+</span>
    </h2>
    <div class="list-content">
      <div class="list-item" v-for="(item, i) in lists" :key="i">
        <img
          v-lazy="{
            src: '',
            error: require('@img/icon_official_header_2.jpg'),
          }"
          alt="头像"
          class="headImg"
        />
        <div class="item-info">
          <div class="info-head vertical-middle">
            <span class="name">度娘的小企鹅</span>
            <span class="nickName">兔小妹</span>
            <span class="level">30</span>
          </div>
          <p class="info-content">此app非常不错，可以看一辈子，永远别收费就行了。</p>
          <div class="reply-box">
            <p class="reply-item">
              <span class="guan">官</span>
              <span class="name">小编:</span>
              <span class="reply">nice!</span>
            </p>
          </div>
          <p class="time">2020-10-23</p>
        </div>
      </div>
    </div>

    <no-data v-if="lists.length == 0 || !lists"></no-data>

    <!-- 回到头部 -->
    <div class="to-top" v-if="showTop">
      <van-icon name="back-top" size="20" color="#B7B7B7" @click="handleToTop" />
    </div>

    <!-- 输入框 -->
    <div class="comment-input">
      <van-field class="input" v-model="comment" placeholder="写评论...">
        <template #button>
          <span class="submit">发送</span>
        </template>
      </van-field>
    </div>
  </section>
</template>

<script>
import noData from '@/components/common/noData'
export default {
  name: 'comment',
  props: {
    lists: {
      type: Array,
      default: () => [],
    },
    showTop: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    noData,
  },
  methods: {
    handleToTop() {
      // 如果没有效果，应该是样式有问题，body 要设置overflow-y: scroll ; 其他父级不要设置scroll
      document.documentElement.scrollTop = 0
    },
  },
}
</script>

<style lang="less" scoped>
.list-wrapper {
  background: #fff;
}
.header {
  padding: 32px;
  color: @primary;

  .line {
    width: 10px;
    height: 30px;
    border-radius: 5px;
    background: #ffbbc1;
  }
  .name {
    font-size: 32px;
    padding: 0 12px;
  }
  .number {
    min-width: 96px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border-radius: 16px;
    font-size: 24px;
    background: #faf0f3;
  }
}

.list-content {
  margin-bottom: 100px;
}

.list-item {
  padding-top: 28px;
  display: flex;

  .headImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 18px 0 32px;
    flex-shrink: 0;
  }
  .item-info {
    width: 100%;
    padding-bottom: 30px;
    border-bottom: 1px solid @border;
  }
  .info-head {
    line-height: 60px;

    span + span {
      margin-left: 12px;
    }

    .name {
      font-size: 24px;
      color: #8f653e;
    }
    .nickName {
      min-width: 96px;
      height: 30px;
      line-height: 30px;
      background: #a7c2e1;
      color: #fff;
      font-size: 24px;
      text-align: center;
      box-shadow: 0 0 8px 0 rgba(80, 80, 80, 0.08);
      border-radius: 4px;
    }

    .level {
      min-width: 52px;
      height: 28px;
      line-height: 28px;
      font-size: 24px;
      text-align: center;
      color: #fff;
      border-radius: 14px;
      background: #ffcfa2;
    }
  }

  .info-content {
    font-size: 28px;
    line-height: 40px;
    color: #8e93a1;
    padding: 16px 0;
  }
  .reply-box {
    width: 606px;
    background: @background;
    border-radius: 8px;
    padding: 0 34px;

    .reply-item {
      line-height: 72px;
    }
    .guan {
      display: inline-block;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 2px;
      background: #4a90e2;
      font-size: 24px;
      text-align: center;
      color: #fff;
      margin-right: 10px;
    }
    .name {
      font-size: 28px;
      color: #4a90e2;
    }
    .reply {
      font-size: 28px;
      color: #464646;
    }
  }

  .time {
    font-size: 24px;
    color: #8e93a1;
    line-height: 1;
    margin-top: 16px;
  }
}

.comment-input {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.06);
  line-height: 100px;
  background: #fff;
  padding-bottom: constant(safe-area-inset-bottom); //兼容IOS < 11.2
  padding-bottom: env(safe-area-inset-bottom); //兼容IOS > 11.2

  .submit {
    color: @primary;
    font-size: 36px;
    font-weight: bold;
  }
}

.to-top {
  position: fixed;
  right: 40px;
  bottom: 200px;
  width: 84px;
  height: 84px;
  border: 1px solid @border;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

/deep/.van-field__control {
  border-radius: 32px;
  height: 64px;
  line-height: 64px;
  background: @background;
  text-indent: 16px;
}
</style>