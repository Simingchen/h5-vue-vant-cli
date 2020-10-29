<template>
  <van-overlay :show="value" z-index="99">
    <div class="wrapper">
      <div class="type-one" v-show="type === 1">
        <div class="header flex-column-center">
          <h2 class="title">选择需要扩容的书架格数</h2>
          <p class="limit">（上限{{ limit }}）</p>
        </div>
        <van-cell-group>
          <van-cell
            v-for="(cell, i) in cellLists"
            :key="i"
            @click="handleClick(cell)"
            :title="`增加${cell.num}格`"
            :value="`花费${cell.cost}币`"
            is-link
          />
          <van-cell :border="false" title="其他" value="自定义" is-link @click="type = 3" />
        </van-cell-group>
        <van-button class="cancel" color="#F5F5F5" @click="handleCancel">取消</van-button>
      </div>

      <div class="type-other" v-show="type !== 1">
        <van-nav-bar
          :title="type === 2 ? '确认扩容' : '选择需要扩容的书架格数'"
          left-arrow
          @click-left="onChangeType(1)"
        />
        <p class="cell-content" v-show="type === 2">确定增加{{ currentCell.num }}格吗</p>
        <!-- 自定义 -->
        <div class="custom-box" v-show="type === 3">
          <van-stepper
            v-model="customNum"
            min="0"
            :max="limit"
            integer
            theme="round"
            button-size="36"
          />
          <p class="tip">需要花费{{ customCost }}币</p>
        </div>
        <van-button class="confirm" :color="$config.primaryColor" @click="handlerConfirmExp">确认</van-button>
        <van-button class="cancel" color="#F5F5F5" @click="handleCancel">取消</van-button>
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'expansion',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      limit: 1000,
      cellLists: [
        { num: 10, cost: 100 },
        { num: 50, cost: 500 },
        { num: 100, cost: 1000 },
      ],
      currentCell: {},
      customNum: 0,
      // costomCost: 10, // 假设1个格子 10个金币
      type: 1, // 1. 所有扩容书架格数； 2. 单个 格数，3.自定义
    }
  },
  computed: {
    customCost() {
      return this.customNum * 10 || 0
    },
  },
  methods: {
    handleClick(cell) {
      this.currentCell = cell
      this.type = 2
    },
    onChangeType(type) {
      this.type = type
    },
    handleCancel() {
      this.$emit('input', !this.value)
    },
    handlerConfirmExp() {
      if (this.type === 3) {
        // 自定义
        if (this.customNum === 0) {
          this.$toast('请输入要扩充的数量')
          return
        }
        this.currentCell = { num: this.customNum, cost: this.customCost }
      }
      this.$dialog
        .confirm({
          title: '书架扩充',
          message: `是否消耗${this.currentCell.cost}币来扩展书架数量，使书架+${this.currentCell.num}格？`,
        })
        .then(() => {
          // todo
          this.type = 1
          this.customNum = 0
          this.$emit('confirm', this.currentCell)
        })
        .catch()
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  padding-bottom: 60px;
  background: #fff;
  border-radius: 24px 24px 0 0;
  overflow: hidden;

  .header {
    height: 134px;
    text-align: center;

    .title {
      font-size: 28px;
      line-height: 2;
      color: #464646;
    }

    .limit {
      font-size: 20px;
      color: #b7b7b7;
    }
  }

  .cell-content {
    line-height: 108px;
    font-size: 32px;
    color: #646464;
    text-align: center;
    border-top: 1px solid @border;
    border-bottom: 1px solid @border;
  }

  .cancel {
    display: block;
    width: 686px;
    height: 92px;
    border-radius: 16px;
    color: #8e93a1 !important;
    margin: 0 auto;
  }

  .confirm {
    display: block;
    width: 686px;
    height: 92px;
    border-radius: 16px;
    margin: 30px auto 16px;
  }

  .custom-box {
    padding: 48px 0;
    text-align: center;

    .tip {
      font-size: 24px;
      line-height: 34px;
      color: #b7b7b7;
      padding-top: 80px;
    }
  }
}

// 覆盖
/deep/.van-cell {
  padding: 32px;
}
/deep/.van-cell::after {
  left: 0;
  right: 0;
}

/deep/.van-cell__title {
  color: #8e93a1;
  font-size: 32px;
  font-weight: bold;
}

/deep/.van-stepper__input {
  width: 120px;
  font-size: 60px;
}

/deep/.van-stepper--round .van-stepper__minus,
/deep/.van-stepper--round .van-stepper__plus {
  background-color: rgba(255, 82, 82, 0.1);
  border: none;
}

/deep/.van-stepper__minus::after,
/deep/.van-stepper__minus::before,
/deep/.van-stepper__plus::after,
/deep/.van-stepper__plus::before {
  background-color: @primary;
}
</style>