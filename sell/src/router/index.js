import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import rotings from '@/components/rotings/rotings'
import seller from '@/components/seller/seller'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/goods',
      component: goods
    },
    {
      path: '/rotings',
      component: rotings
    },
    {
      path: '/seller',
      component: seller
    }
  ]
})
