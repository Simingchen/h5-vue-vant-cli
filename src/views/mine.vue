<template>
  <div class="mine-index-page">
    <div class="tool-bar flex-start">
      <div class="item flex-center" @click="$router.push('/setting')">
        <img class="icon" :src="require('@img/icon_me_setting.png')" />
      </div>
    </div>
    <div class="panel">
      <div class="user-info flex-box" @click="$router.push('/userCenter/userInfo')">
        <div class="avatar-box">
          <img class="avatar" :src="require('@img/ic_avatar_male.png')" />
        </div>
        <div class="con">
          <div class="flex-center">
            <router-link class="login" to="login">登录/注册</router-link>
            <img class="edit" :src="require('@img/ic_edit.png')" />
            <div class="tag flex-center">
              <img class="icon" :src="require('@img/icon_level_2.png')" />
              50
            </div>
          </div>
          <div class="lab flex-center">兔小妹</div>
        </div>
      </div>
      <van-tabbar class="info-list" :fixed="false" value="3" :border="false">
        <van-tabbar-item>
          <div class="num">{{ 12000 | filterCount }}</div>
          <div class="txt">币</div>
        </van-tabbar-item>
        <van-tabbar-item badge="4">
          <div class="num">{{ 489 | filterCount }}</div>
          <div class="txt">书评</div>
        </van-tabbar-item>
        <van-tabbar-item>
          <div class="num">{{ 5879 | filterCount }}</div>
          <div class="txt">时长(小时)</div>
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <div class="panel" @click="tips">
      <van-tabbar class="nav-list" :fixed="false" value="3" :border="false">
        <van-tabbar-item v-for="(item, index) in navList" :key="index">
          <span class="txt">{{ item.name }}</span>
          <template #icon>
            <img class="img" :src="require(`@img/${item.icon}`)" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
      <van-cell class="ad-cell" center is-link>
        <template #title>
          <img class="img-tit" :src="require('@img/font_ad_limit.png')" />
          <span class="txt-tit">新手礼包，获得免广告特权</span>
        </template>
        <img class="ad-value" :src="require('@img/icon_mine_gift.png')" />
      </van-cell>
    </div>
    <div class="panel">
      <div class="tool-list flex-box">
        <div
          class="item flex-start"
          v-for="(item, index) in toolList"
          :key="index"
          @click="goUrl(item)"
        >
          <img class="img" :src="require(`@img/${item.icon}`)" />
          <div class="txt">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 任务块 -->
    <div class="task-bar flex-start" @click="tips">
      <div class="txt">今日任务</div>
      <div class="boll flex-center">0/4</div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'homeLayout',
  components: {},
  data() {
    return {
      navList: [
        {
          name: '我要分享',
          icon: 'icon_mine_share.png',
        },
        {
          name: '我的装扮',
          icon: 'icon_mine_dress_up.png',
        },
        {
          name: '我的等级',
          icon: 'icon_mine_level.png',
        },
        {
          name: '我要签到',
          icon: 'icon_mine_check_in.png',
        },
      ],
      toolList: [
        {
          name: '阅读历史',
          icon: 'icon_mine_history.png',
          url: '/userCenter/historyList',
        },
        {
          name: '短文收藏',
          icon: 'icon_collect.png',
          url: '/userCenter/collectList',
        },
        {
          name: '我的下载',
          icon: 'icon_mine_download.png',
        },
        {
          name: '兔兔公告',
          icon: 'icon_mine_official.png',
          url: '/setting/notice',
        },
        {
          name: '在线客服',
          icon: 'icon_mine_online.png',
        },
        {
          name: '反馈与帮助',
          icon: 'icon_mine_help.png',
          url: '/setting/feedbackCenter',
        },
      ],
    }
  },
  methods: {
    tips() {
      this.$toast('功能开发中')
    },
    // 跳转链接
    goUrl(item) {
      if (item.url) {
        this.$router.push(item.url)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.mine-index-page {
  padding-top: 300px;
  background: url('../assets/img/login_bg@3x.jpg') 0 0 no-repeat;
  background-size: 750px 450px;
}
.panel {
  width: 690px;
  margin: 0 auto 30px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 1px 20px #e7e7e7;
  position: relative;
  overflow: hidden;
}
.tool-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 88px;
  flex-direction: row-reverse;
  .item {
    width: 88px;
    height: 88px;
    margin-right: 10px;
  }
  .icon {
    width: 48px;
    height: 48px;
  }
}
.user-info {
  padding: 40px 20px 20px 40px;
  .con {
    padding-top: 16px;
  }
  .login {
    font-size: 24px;
    color: #7d6554;
  }
  .lab {
    width: 96px;
    margin-top: 10px;
    font-size: 20px;
    color: #ffffff;
    text-align: center;
    line-height: 28px;
    background: #a7c2e1;
    border-radius: 4px;
  }
  .edit {
    width: 32px;
    height: 32px;
    margin-left: 20px;
  }
  .tag {
    height: 28px;
    padding-right: 20px;
    margin-left: 20px;
    border-radius: 28px;
    color: #fff;
    background: #ffcfa2;
    font-size: 20px;
    .icon {
      width: 28px;
      height: 28px;
      margin-left: -8px;
    }
  }
}
.avatar-box {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 30px;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
.info-list {
  height: auto;
  text-align: center;
  padding-bottom: 20px;
  .txt {
    font-size: 24px;
    color: #8e93a1;
    line-height: 46px;
  }
  .num {
    font-size: 44px;
    color: #323232;
    font-weight: 500;
    line-height: 52px;
  }
}
.nav-list {
  height: auto;
  padding: 40px 20px 0;
  box-sizing: border-box;
  .txt {
    font-size: 24px;
    color: #323232;
    line-height: 46px;
  }
  .img {
    width: 48px;
    height: 48px;
  }
}
.tool-list {
  flex-wrap: wrap;
  padding-bottom: 20px;
  .item {
    flex-direction: column;
    flex-basis: 25%;
    padding-top: 40px;
    font-size: 24px;
    color: #8e93a1;
    line-height: 60px;
  }
  .img {
    width: 50px;
    height: 50px;
  }
}
.ad-cell {
  height: 90px;
  margin-top: 20px;
  border-top: 2px dashed #e3e3e3;
  .van-cell__title {
    flex: none;
    display: flex;
    align-items: center;
  }
  .van-cell__value {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .img-tit {
    width: 140px;
    height: 28px;
    margin-right: 24px;
  }
  .txt-tit {
    font-size: 24px;
    color: #b7b7b7;
  }
  .ad-value {
    height: 32px;
  }
}
.task-bar {
  position: fixed;
  right: 0;
  bottom: 200px;
  width: 64px;
  height: 230px;
  padding-top: 10px;
  color: #fff;
  flex-direction: column;
  background-image: linear-gradient(180deg, rgba(255, 189, 189, 0.7) 0%, rgba(255, 82, 82, 0.8) 96%);
  border-radius: 64px 0 100px 100px;
  .txt {
    padding: 16px;
    font-size: 32px;
  }
  .boll {
    width: 48px;
    height: 48px;
    border-radius: 48px;
    font-size: 20px;
    color: #ff5252;
    background: #fff;
  }
}
</style>
<style lang="less">
.mine-index-page {
  .van-info {
    right: auto;
  }
}
</style>
