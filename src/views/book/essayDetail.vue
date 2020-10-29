<template>
  <div>
    <van-button>短文详情</van-button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      detail: {}
    }
  },
  created () {
    const detail = JSON.parse(decodeURIComponent(this.$route.query.item));
    console.log(detail)
  }
}
</script>

<style lang="less"></style>
