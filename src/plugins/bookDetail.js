import bookDetailVue from '@components/common/bookDetailPop.vue';

// 定义插件对象
const object = {};
// vue的install方法，用于定义vue插件
object.install = function (Vue, options) {
  const objectInstance = Vue.extend(bookDetailVue);
  let currentInstance;
  const initInstance = () => {
    // 实例化vue实例
    currentInstance = new objectInstance();
    let element = currentInstance.$mount().$el;
    document.body.appendChild(element);
  };

  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$bookDetail = function (options) {
    console.log(options)
    if (!currentInstance) {
      initInstance();
    }
    if (typeof options === 'string') {
      currentInstance.content = options;
    } else if (typeof options === 'object') {
      Object.assign(currentInstance, options);
    }
    return currentInstance; // 为了链式调用
  };
  Vue.prototype.$bookDetail = function (options) {
    if (!currentInstance) {
      initInstance();
    }
    if (typeof options === 'string') {
      currentInstance.content = options;
    } else if (typeof options === 'object') {
      Object.assign(currentInstance, options);
    }
    return currentInstance; // 为了链式调用
  }
};

export default object;