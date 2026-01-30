import { createRouter, createWebHistory } from 'vue-router'
import Presentation from '../views/Presentation.vue'
import BadPage from '../views/BadPage.vue'
import RulesPage from '../views/RulesPage.vue'
import SimulationPage from '../views/SimulationPage.vue'

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
  },
  {
    path: '/simulation',
    name: 'SimulationPage',
    component: SimulationPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
