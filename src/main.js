import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/common.less'

import { Form, FormItem, Input, Table, TableColumn, Button, DatePicker, TimePicker, Switch, Dialog } from 'element-ui'
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Button)
Vue.use(TimePicker)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Switch)

Vue.prototype.$ELEMENT = { size: 'mini', zIndex: 3000 }

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
