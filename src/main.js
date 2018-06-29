import Vue from 'vue';
import App from './App.vue';
import insert from './components/insert.vue';
import list from './components/list.vue';
import ElementUI from 'element-ui';

Vue.component("Insert", insert);
Vue.component('List', list);
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
