import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TableView from '@/views/TableView.vue'
// import tableView from '@/components/tableView.vue'
import ZoneSelect from '@/components/Zone/ZoneSelect.vue'
import CenterView from '@/components/Center/CenterSelect.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/table',
    name: 'table',
    component: TableView
  },
  {
    path: '/center',
    name: 'center',
    component: CenterView
  },
  {
    path: '/zone/:zoneName',
    name: 'zone',
    component: ZoneSelect
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
