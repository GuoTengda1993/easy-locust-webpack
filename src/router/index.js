import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '@/components/About.vue'
import Api from '@/components/Api.vue'
import Slave from '@/components/Slave.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'about',
        components: {
          Content: About
        },
        meta: {
          title: 'About'
        }
      },
      {
        path: '/apis',
        name: 'api',
        components: {
          Content: Api
        },
        meta: {
          title: 'Apis'
        }
      },
      {
        path: '/slaves',
        name: 'slave',
        components: {
          Content: Slave
        },
        meta: {
          title: 'Slaves'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
