import Vue from 'vue'
import Router from 'vue-router'
import BookIndex from '@/views/BookIndex.vue'
import BookSearch from '@/views/BookSearch.vue'
import BookEdit from '@/views/BookEdit.vue'


Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
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
          path: '/edit/:id',
          name: 'BookEdit',
          component: BookEdit
        },
      ]
})
