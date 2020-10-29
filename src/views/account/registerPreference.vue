<template>
  <div class="registerPreference-page">
    <van-button
      v-if="pageType < 3"
      class="skip-btn"
      plain
      round
      color="#ddd"
      @click="skip"
      size="small"
    >跳过</van-button>
    <!-- 选择性别 -->
    <template v-if="pageType == 1">
      <div class="select-tit">
        选择性别
        <div class="txt">根据您的偏好推荐好书</div>
      </div>
      <div class="sex-list">
        <div
          class="item"
          @click="selectType(item, 'Sex')"
          v-for="(item, index) in sexList"
          :key="index"
        >
          <img
            :src="require(`../../assets/img/${selectSexList.indexOf(item.id) == -1 ? item.icon : item.activeIcon}`)"
          />
          <div class="txt">{{item.name}}</div>
        </div>
      </div>
      <van-button
        class="login-btn"
        round
        :color="(!selectSexList.length) ? '#cecece'  : $config.primaryColor"
        @click="skip"
      >下一步</van-button>
    </template>
    <!-- 选择类型 -->
    <template v-if="pageType == 2">
      <div class="select-tit">
        选择喜欢的选择
        <div class="txt">可多选</div>
      </div>
      <div class="type-list flex-row-center">
        <div
          class="item"
          @click="selectType(item, 'Type')"
          v-for="(item, index) in typeList"
          :key="index"
          :style="{backgroundImage: `url(${item.url})`}"
        >
          {{item.name}}
          <van-icon
            name="checked"
            :color="selectTypeList.indexOf(item.id) == -1 ? '#ddd' : $config.primaryColor"
          />
        </div>
      </div>
      <van-button
        class="login-btn"
        round
        :color="(!selectTypeList.length) ? '#cecece'  : $config.primaryColor"
        @click="skip"
      >下一步</van-button>
    </template>
    <!-- 选择所有类型 -->
    <template v-if="pageType == 3">
      <div class="type-list flex-row-center">
        <div
          class="item"
          @click="selectType(item, 'Sort')"
          v-for="(item, index) in sortList"
          :key="index"
          :style="{backgroundImage: `url(${item.url})`}"
        >
          {{item.name}}
          <van-icon
            name="checked"
            :color="selectSortList.indexOf(item.id) == -1 ? '#ddd' : $config.primaryColor"
          />
        </div>
      </div>
      <van-button
        class="login-btn"
        round
        :color="(!selectSortList.length) ? '#cecece'  : $config.primaryColor"
        @click="skip"
      >{{pageType > 2 ? '完成' : '下一步'}}</van-button>
    </template>

    <!-- <van-popup v-model="isShowTip" closeable close-icon="close">内容</van-popup> -->
    <van-dialog
      v-model="isShowTip"
      title="用户隐私政策提示"
      show-cancel-button
      confirm-button-text="同意"
      cancel-button-text="再看看"
    >
      欢迎使用阅读，为了更好地保护您的隐私和个人信息安全，根据国家相关法律规定拟定了
      <router-link class="primary" to="/article/agreement">《用户协议》</router-link>
      <router-link class="primary" to="/article/privacy">《隐私协议》</router-link>，请您在使用前仔细阅读并同意。
    </van-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isShowTip: true,   // 提示
      pageType: 1,   // 页面类型 1：性别 2：类型
      selectSexList: [],
      sexList: [
        {
          id: 2,
          name: '女士',
          icon: 'icon_sex_woman_d.jpg',
          activeIcon: 'icon_sex_woman_s.jpg'
        },
        {
          id: 1,
          name: '男士',
          icon: 'icon_sex_man_d.jpg',
          activeIcon: 'icon_sex_man_s.jpg'
        },
        
      ],
      typeList: [
        {
          id: 1,
          url: '',
          name: '都市'
        },
        {
          id: 2,
          url: '',
          name: '玄幻'
        }
      ],
      selectTypeList: [],  // 已选择的类型
      sortList: [
        {
          id: 1,
          url: '',
          name: '都市'
        },
        {
          id: 2,
          url: '',
          name: '都市'
        },
        {
          id: 3,
          url: '',
          name: '都市'
        },
        {
          id: 4,
          url: '',
          name: '玄幻'
        }
      ],
      selectSortList: [],  // 已选择的类型
      phone: '',
      phoneCode: '+86',
      verifyCode: '',
      inviteCode: '',
      isSend: false,
      checked: true,
      isNext: false,  // 是否下一部
      password: '',
      password2: '',
    }
  },

  methods: {
    // 跳过
    skip () {
      if (this.pageType > 2) {
        this.$toast('完成偏好选择，请重新登录')
        this.$router.push('login')
        return false
      }
      this.pageType ++
    },
    // 选择类型
    selectType (item, type) {
      let list = this[`select${type}List`]
      if (list.indexOf(item.id) == -1) {
        // 性别只能单选，因此删除原有值
        if (type == 'Sex') {
          list.shift()
        }
        list.push(item.id)
      } else {
        const index = list.findIndex(i => i == item.id)
        list.splice(index, 1)
      }
    },
    // 发送验证码
    sendCode () {
      if (this.isSend) return;

      const phone = this.phone
      if (!phone.length) {
        return this.$toast('手机号码不能为空')
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return this.$toast('手机号码输入有误')
      }
      this.isSend = true
      this.$refs.countDown.start();
    },
    // 倒计时结束
    finishTime () {
      this.isSend = false
    },
    // 注册
    confirm () {
      const phone = this.phone
      const verifyCode = this.verifyCode
      if (!phone.length) {
        return this.$toast('手机号码不能为空')
      }
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return this.$toast('手机号码输入有误')
      }
      if (!verifyCode.length) {
        return this.$toast('请输入验证码')
      }
      if (!this.checked) {
        return this.$toast('请先阅读并同意服务条款')
      }

      // 下一步操作
      this.isNext = true
    },
    // 下一步
    next () {
      if (!this.checked) {
        return this.$toast('请先阅读并同意服务条款')
      }
      const password = this.password
      const password2 = this.password2
      if (!password.length) {
        return this.$toast('设置密码不能为空')
      }
      if (password.length < 6) {
        return this.$toast('密码长度不可少于6位')
      }
      
      if (!password2.length) {
        return this.$toast('确认密码不能为空')
      }

      if (password != password2) {
        return this.$toast('确认密码不一致输入有误')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.skip-btn {
  position: fixed;
  top: 48px;
  right: 48px;
  width: 112px;
  height: 48px;
}
.select-tit {
  padding-top: 360px;
  color: #323232;
  font-size: 60px;
  text-align: center;
  .txt {
    margin-top: 18px;
    color: #8e93a1;
    font-size: 28px;
  }
}
.login-btn {
  display: block;
  width: 320px;
  height: 80px;
  margin: 64px auto;
  font-size: 32px;
}
.type-list {
  width: 588px;
  padding-top: 92px;
  margin: 0 auto;
  flex-wrap: wrap;
  .item {
    position: relative;
    width: 272px;
    height: 140px;
    padding-left: 32px;
    padding-top: 52px;
    margin-bottom: 48px;
    color: #fff;
    background: #eee;
    border-radius: 10px;
    font-size: 36px;
  }
  .van-icon {
    position: absolute;
    right: -10px;
    width: 40px;
    height: 40px;
    border: 4px solid #fff;
    border-radius: 40px;
  }
}
.sex-list {
  width: 400px;
  margin: 92px auto 0;
  .item {
    position: relative;
    width: 400px;
    height: 240px;
    line-height: 240px;
    border-radius: 10px;
    margin-bottom: 80px;
  }
  .txt {
    position: absolute;
    top: 0;
    left: 0;
    width: 400px;
    height: 240px;
    color: #fff;
    line-height: 240px;
    padding-left: 242px;
    font-size: 48px;
  }
}
</style>
<style lang="less">
.registerPreference-page {
  .van-dialog__content {
    padding: 36px 40px 48px;
    opacity: 0.8;
    font-size: 28px;
    color: #646464;
    letter-spacing: 0;
    text-align: center;
    line-height: 40px;
  }
  .van-dialog__footer {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    .van-dialog__confirm {
      width: 432px;
      height: 80px;
      color: #fff;
      background: @primary;
      border-radius: 100px;
    }
    .van-dialog__cancel {
      margin-bottom: 20px;
      color: #8e93a1;
      font-size: 28px;
    }
  }
  .van-hairline--top::after {
    display: none;
  }
}
</style>
