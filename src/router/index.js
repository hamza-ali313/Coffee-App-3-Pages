import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', redirect: { name: 'artist', params: { slug: 'suzanne-lycett' } } },
    { path: '/art/artist/:slug', name: 'artist', component: () => import('@/views/ArtistView.vue'), props: true },
    { path: '/art/exhibitions', name: 'exhibitions', component: () => import('@/views/ExhibitionsView.vue') },
    { path: '/art/artwork/:id', name: 'artwork', component: () => import('@/views/ArtworkView.vue'), props: true }
  ]
})
