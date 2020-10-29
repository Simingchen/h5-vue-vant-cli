<template>
  <section class="wrapper">
    <div class="wrapper-content">
      <div class="radio-box flex-row-center" v-for="(label, l) in labels" :key="l">
        <p class="radio" v-for="(item, i) in label" :key="i">
          <input type="radio" name="label" :id="item.id" @change="handleRadioChange" />
          <label class="label" :for="item.id">{{ item.name }}</label>
        </p>
      </div>

      <van-field class="textarea" v-model="content" rows="3" autosize type="textarea" maxlength="200" placeholder="请输入反馈意见" show-word-limit />

      <van-uploader class="upload-box" v-model="fileList" multiple :max-count="3" :after-read="onAfterRead">
        <div class="custom-upload"></div>
      </van-uploader>
    </div>

    <van-button class="submit" round :color="$config.primaryColor" @click="handleSubmit">确定</van-button>
  </section>
</template>

<script>
export default {
  props: {
    // [[{id:1,name:'xxx'}]], 二维数组
    labels: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      type: '', //选中标签的id
      content: '',
      fileList: [],
    }
  },
  methods: {
    handleRadioChange(e) {
      console.log(e)
      this.type = e.target.id
    },
    onAfterRead(file) {
      // todo
    },
    handleSubmit() {
      if (!this.content) {
        this.$toast('请填写反馈意见')
        return
      }
      // todo
      this.$emit('submit')
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper-content {
  background: #fff;
  padding: 32px;
}

.radio-box {
  padding-bottom: 36px;
  & + .radio-box {
    border-bottom: 1px @border solid;
  }
  .radio {
    display: inline-block;
  }
  .label {
    display: block;
    width: 212px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border: 1px solid @border;
    border-radius: 24px;
    color: #646464;
    font-size: 28px;
  }
}

input[type='radio'] {
  display: none;
  &:checked + .label {
    border-color: @primary;
    color: @primary;
  }
}

.textarea {
  margin-top: 46px;
  background: #fbfbfb;
  border-radius: 12px;
  color: #323232;
}
.upload-box {
  margin-top: 32px;
}

.custom-upload {
  width: 128px;
  height: 128px;
  background: url(../../assets/img/feedback_uploader.png) 0 0 no-repeat;
  background-size: 100% 100%;
}

.submit {
  display: block;
  margin: 48px auto 0;
  width: 432px;
  height: 80px;
}

// 覆盖样式
/deep/.van-uploader__preview-image {
  width: 128px;
  height: 128px;
  border-radius: 10px;
}

/deep/.van-uploader__preview-delete {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  top: -16px;
  right: -16px;
  background: rgba(200, 200, 200, 0.7);
}

/deep/.van-uploader__preview-delete-icon {
  top: 0;
  right: 0;
}
</style>