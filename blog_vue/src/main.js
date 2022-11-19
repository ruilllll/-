import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import dayjs from 'dayjs'
import mavonEditor from 'mavon-editor'
import infiniteScroll from 'vue-infinite-scroll'
import 'mavon-editor/dist/css/index.css'
import {
  Button,
  Menu,
  MenuItem,
  Input,
  Tag,
  Dialog,
  Form,
  FormItem,
  Message,
  Container,
  Aside,
  Main,
  Table,
  TableColumn,
  Pagination,
  Option,
  Drawer,
  Select,
  Upload,
  Popconfirm,
  Tooltip,
  MessageBox,
  Backtop,
  Icon,
  Timeline,
  TimelineItem,
  Card,
  Descriptions,
  DescriptionsItem
} from 'element-ui'

Vue.use(DescriptionsItem)
Vue.use(Descriptions)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Card)
Vue.use(Icon)
Vue.use(Backtop)
Vue.use(Tooltip)
Vue.use(Popconfirm)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Drawer)
Vue.use(Option)
Vue.use(Pagination)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Container)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(infiniteScroll)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.prototype.$http = axios
Vue.prototype.$dayjs = dayjs
Vue.prototype.$currentimgurl = 'http://localhost:3000'
Vue.config.productionTip = false
Vue.use(mavonEditor)
axios.interceptors.request.use(config => {
  if (localStorage.token) {
    config.headers.token = localStorage.token
  }
  return config
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
