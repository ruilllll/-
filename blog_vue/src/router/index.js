import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    redirect: '/home/new',
    children: [
      {
        path: '/home/new',
        name: 'NewPart',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/NewPart.vue')
      },
      {
        path: '/home/hot',
        name: 'HotPart',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/HotPart.vue')
      },
      {
        path: '/home/all',
        name: 'AllPart',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/AllPart.vue')
      },
      {
        path: '/home/message',
        name: 'MessagePart',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/MessagePart.vue')
      },
      {
        path: '/home/about',
        name: 'AboutPart',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/AboutPart.vue')
      },
      {
        path: '/home/taglist/:value',
        name: 'ArtTaglist',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/ArtTaglist.vue')
      },
      {
        path: '/home/artdetails',
        name: 'Arttadeils',
        component: () => import(/* webpackChunkName: "about" */ '../views/home/Art-details.vue')
      },
      {
        path: '/home/setting',
        name: 'SettingPart',
        component: () => import(/* webpackChunkName: "about" */ '../views/SettingPart.vue'),
        children: [
          {
            path: '/home/setting/user',
            name: 'AdminUser',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminUser.vue')
          },
          {
            path: '/home/setting/comment',
            name: 'AdminComment',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminComment.vue')
          },
          {
            path: '/home/setting/art',
            name: 'AdminArt',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminArt.vue')
          },
          {
            path: '/home/setting/msg',
            name: 'AdminMsg',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminMsg.vue')
          },
          {
            path: '/home/setting/myaccount',
            name: 'MyAccount',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/MyAccount.vue')
          },
          {
            path: '/home/setting/myCollection',
            name: 'MyCollection',
            component: () => import(/* webpackChunkName: "about" */ '../views/admin/MyCollection.vue')
          }
        ]
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.afterEach((to, form) => {
  if (!to.path.includes('setting')) return
  if (store.state.token) {
    if (to.path === '/home/setting') {
      if (store.state.user.rights === 0) {
        router.push('/home/setting/user')
      } else {
        router.push('/home/setting/myaccount')
      }
    }
  } else {
    Vue.prototype.$message.error('未登录，请先登录')
    router.push(form.path)
    setTimeout(() => {
      location.reload()
    }, 500)
  }
})
export default router
