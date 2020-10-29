// 评论 item 左右单行滑动样式
<template>
  <div class="commemt-list">
    <div
      class="item"
      v-for="(item, index) in list.comments"
      :key="index"
      :class="{oneItem: list.comments && list.comments.length == 1}"
    >
      <div class="flex-row-center">
        <div class="avatar-box flex-row-center">
          <!-- <img class="img" v-lazy="$config.imgBookUrl + item.photoPath" /> -->
          <van-image
            class="avatar"
            width="1rem"
            height="1rem"
            fit="fill"
            round
            :src="$config.imgUrl + item.headImg"
          />
          <div class="name ellipsis">{{item.nickName}}</div>
          <van-button class="lab" size="mini" color="#a7c2e1">{{item.titleName}}</van-button>
          <div class="tag flex-center">
            <img class="icon" :src="require('@img/icon_level_2.png')" />
            50
          </div>
        </div>
        <div class="time">{{item.createTime}}</div>
      </div>
      <van-rate
        :value="(item.star)"
        allow-half
        void-icon="star"
        void-color="#b7b7b7"
        size="10"
        :color="$config.primaryColor"
      />
      <div class="message">{{item.msg}}</div>

      <div class="bot-info flex-start">
        <div class="flex-start">
          <img class="icon" :src="require('@img/icon_comment.png')" />
          {{item.back}}
        </div>
        <div class="flex-start">
          <img class="icon" :src="require('@img/icon_favour.png')" />
          {{item.up}}
        </div>
      </div>
    </div>
    <van-empty
      v-if="!list.comments.length"
      :image="require('@img/icon_request_empty.png')"
      description="暂无书评，写书评参与更多互动吧"
    />
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed: {
    computedList() {
      const tempList = Object.freeze(this.list || [])
      if (!this.limit) return tempList
      return tempList.slice(0, this.limit)
    },
  },
}
</script>

<style lang="less" scoped>
.commemt-list {
  padding: 0 32px;
  overflow: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  background: #fff;
}
.item {
  display: inline-block;
  width: 600px;
  height: 360px;
  padding: 30px;
  margin-right: 24px;
  border-radius: 20px;
  color: @txt;
  &.oneItem {
    width: 686px;
  }
  background: #f5f5f5;
  &:last-child {
    margin-right: 0;
  }
  .avatar {
    margin-right: 20px;
  }
  .name {
    max-width: 120px;
    font-size: 24px;
    color: #8f653e;
  }
  .tit {
    font-size: 32px;
    color: #4a4a4a;
    line-height: 56px;
    font-weight: 600;
  }
  .desc {
    height: 40px;
    font-size: 24px;
    color: #8e93a1;
    line-height: 40px;
  }
  // .img {
  //   width: 172px;
  //   height: 240px;
  //   box-shadow: 0 4px 8px 0 rgba(80, 80, 80, 0.2);
  // }
  .lab {
    height: 34px;
    font-size: 24px;
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
  .time {
    font-size: 24px;
  }
  .van-rate {
    margin-top: 18px;
  }
  .message {
    height: 120px;
    margin-top: 24px;
    line-height: 40px;
    font-size: 28px;
    color: #323232;
  }
  .bot-info {
    margin-top: 24px;
    flex-direction: row-reverse;
    .flex-start {
      margin-left: 48px;
    }
    .icon {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
  }
}
</style>
