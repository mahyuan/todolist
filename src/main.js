import Vue from 'vue';
import App from './App.vue';
// import Header from './components/header.vue'
// import Sidebar from './components/sidebar'
// import Insert from './components/insert.vue';
// import List from './components/list.vue';
import ElementUI from 'element-ui';

// Vue.component("Insert", Insert);
// Vue.component('List', List);
// Vue.component('Header', Header )
// Vue.component('Sidebar', Sidebar)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});
