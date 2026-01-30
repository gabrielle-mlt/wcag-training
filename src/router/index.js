import { createRouter, createWebHistory } from 'vue-router'
import Presentation from '../views/Presentation.vue'
import BadPage from '../views/BadPage.vue'
import RulesPage from '../views/RulesPage.vue'

const routes = [
  {
    path: '/',
    name: 'Presentation',
    component: Presentation
  },
  {
    path: '/playground',
    name: 'BadPage',
    component: BadPage
  },
  {
    path: '/rules',
    name: 'RulesPage',
    component: RulesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
