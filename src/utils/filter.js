/*
 * @Name: filter 的方法
 */
import Vue from 'vue'

const filters = {
  /**
   * 格式化数量，超过千以千单位显示，超过万以万单位显示
   * @param {Number} val 数量
   */
  filterCount(val) {
    if (!val || isNaN(val) || val < 0) {
      return 0
    } else if (val >= 10000) {
      return parseFloat(String(val / 10000)).toFixed(1) + 'W'
    } else {
      return val
    }
  },
  /**
   * 日期转换：<1min:刚刚； <1h: xx分钟前； < 1d: xx小时前 >1d: 不用转换
   * @param {*} date 日期
   */
  filterDateTs(date) {
    if (!date) return '';
    const now = new Date().getTime();
    const dateTime = new Date(date).getTime();
    const range = now - dateTime;
    if (range < 0) return date; // 时间有误
    if (range <= 1 * 60 * 1000) return '刚刚';
    if (range < 1 * 60 * 60 * 1000) return parseInt(range / (1 * 60 * 60 * 1000)) % 60 + '分钟前';
    if (range < 1 * 60 * 60 * 1000 * 24) return parseInt(range / (1 * 60 * 60 * 1000)) % 24 + '小时前';
    return date;
  }
}

// 批量引入过滤器
Object.keys(filters).forEach((item) => {
  Vue.filter(item, filters[item])
})
