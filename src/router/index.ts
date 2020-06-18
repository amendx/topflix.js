import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Favorites from '../views/Favorites.vue'
import DetailsPage from '../views/DetailsPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: DetailsPage
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
