/*
 * @Name: 指令的方法
 */
import Vue from 'vue'
import router from '@/router'

// url 指令，标签内使用 v-url="{path:'xxx',query:{}}", 即可路由跳转
Vue.directive('url', {
  bind(el, binding, vnode) {
    el.addEventListener('click', () => {
      console.log(binding.value)
      if (!binding.value) return
      router.push(binding.value);
      // router.push('login')
    })
  },
})


// longtouch 模拟长按事件

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

Vue.directive('longpress', {
  bind(el, binding, vnode) {
    let startTime = 0;
    let endTime = 0;
    let timer = null;
    let time = 700;
    let startY = 0;
    el.removeEventListener('touchstart', touchStart);
    el.removeEventListener('touchmove', touchMove);
    el.removeEventListener('touchend', touchEnd);
    const touchStart = (e) => {
      e.stopPropagation();
      // e.preventDefault();
      startTime = +new Date()
      startY = e.targetTouches[0].pageY;
      timer = setTimeout(() => {
        if (typeof binding.value === 'function') {
          binding.value(e);
        }
        timer = null;
      }, time)
    }

    const touchMove = (e) => {
      e.stopPropagation();
      if (Math.abs(e.targetTouches[0].pageY - startY) > 5) {
        clearTimeout(timer);
        timer = null;
      }
    }

    const touchEnd = (e) => {
      e.stopPropagation();
      endTime = +new Date()
      if (endTime - startTime < time) {
        clearTimeout(timer);
        timer = null;
      }
      startTime = endTime = 0;

    }
    el.addEventListener('touchstart', touchStart, false);
    el.addEventListener('touchmove', touchMove, false);
    el.addEventListener('touchend', touchEnd, false);

  }
})
