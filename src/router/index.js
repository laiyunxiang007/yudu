import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WaterWorksDetail from "@/components/WaterWorksDetail";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/waterWorksDetail',
    name: 'waterWorksDetail',
    component: WaterWorksDetail
  },
]

const router = new VueRouter({
  base:'/',
  routes
})

export default router
