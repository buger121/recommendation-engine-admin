export default {
  install(Vue) {
    Vue.prototype.TimeFormat = function(timeStr) {
      return timeStr.split(' ')[0];
    };
  }
};
