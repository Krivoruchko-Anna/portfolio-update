import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about-chunk" */ '../components/About.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about-chunk" */ '../components/About.vue'),
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () =>
      import(/* webpackChunkName: "experience-chunk" */ '../components/experience/Experience.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () =>
      import(/* webpackChunkName: "projects-chunk" */ '../components/projects/Projects.vue'),
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
})

export default router
