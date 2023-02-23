import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import LoginSignup from '../views/LoginSignup.vue'
import NotFound from '../views/NotFound.vue'
import MyPosts from '../views/MyPosts.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create-post',
    name: 'create',
    component: CreateView
  },
  {
    path: '/login-signup',
    name: 'LoginSignup',
    component: LoginSignup
  },
  {
    path: '/myposts',
    name: 'MyPosts',
    component: MyPosts
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFound
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
