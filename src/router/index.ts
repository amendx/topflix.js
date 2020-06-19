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
    name: 'Filmes',
    component: Movies
  },
  {
    path: '/details/:type/:id',
    name: 'Detalhes',
    component: DetailsPage
  },
  {
    path: '/favorites',
    name: 'Favoritos',
    component: Favorites
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
