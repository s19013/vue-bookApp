import { createRouter, createWebHistory } from 'vue-router'
import BookIndex from '@/pages/BookIndex.vue'
import BookSearch from '@/pages/BookSearch.vue'
import BookEdit from '@/pages/BookEdit.vue'

const routes = [
  {
    path: '/',
    name: 'BookIndex',
    component: BookIndex
  },
  {
    path: '/search',
    name: 'BookSearch',
    component: BookSearch
  },
  {
    path: '/edit',
    name: 'BookEdit',
    component: BookEdit
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router