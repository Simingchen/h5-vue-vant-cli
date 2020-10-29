<template>
  <div class="pt90">
    <van-nav-bar v-if="!isEdit" title="我的信息" fixed left-arrow @click-left="minxinNavLeft" />
    <van-cell title="头像" center is-link>
      <van-uploader :after-read="afterRead">
        <van-image
          width="2.4rem"
          height="2.4rem"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-uploader>
    </van-cell>
    <van-cell title="昵称" value="彭于晏" is-link to="/userCenter/userInfoEdit" />
    <van-cell class="cell-id" title="ID" value="12345" is-link />
    <van-cell title="性别" :value="userInfo.sex" is-link @click="isShowSexPop = !isShowSexPop" />

    <!-- 性别弹窗 -->
    <van-popup v-model="isShowSexPop" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="isShowSexPop = !isShowSexPop"
        @confirm="onConfirmSex"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      userInfo: {
        sex: '女'
      },
      columns: [
        { text: '男' },
        { text: '女' },
        { text: '未知' },
      ],
      isShowSexPop: false,
    }
  },
  created() {
    console.log("created")
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    // 确定选择性别
    onConfirmSex(item, index) {
      console.log(item, index)
      this.userInfo.sex = item.text
      this.isShowSexPop = false
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__title {
  font-size: 32px;
}
.van-cell__value {
  font-size: 24px;
  color: #8e93a1;
}
.cell-id .van-icon-arrow::before {
  display: none;
}
</style>
