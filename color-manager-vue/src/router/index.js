import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/color',
    component: () => import('../views/index'),
    children: [
      { name: 'colourSpectrum', path: 'colourSpectrum', component: () => import('../views/colourSpectrum') },
      { name: 'setting', path: 'setting', component: () => import('../views/setting') },
      { name: 'project', path: 'project', component: () => import('../views/project') },
      { name: 'colourMatching', path: 'colourMatching', component: () => import('../views/colourMatching') },
      { name: 'colorRandom', path: 'colorRandom', component: () => import('../views/colorRandom') },
      { name: 'colorPicker', path: 'colorPicker', component: () => import('../views/colorPicker') },
      { name: 'gradient', path: 'gradient', component: () => import('../views/gradient') },
      { name: 'projectInfo', path: 'projectInfo', component: () => import('../views/projectInfo'), props: route => ({ projectId: route.query.projectId }) },
      { name: 'gradientEdit', path: 'gradientEdit', component: () => import('../views/gradientEdit'), props: route => ({ color: route.query.color }) },
      { name: 'user', path: 'user', component: () => import('../views/user') }
    ]
  },
  { path: '/', redirect: '/color/colourSpectrum' },
  { name: 'welcome', path: '/welcome', component: () => import('../views/welcome'), props: route => ({ first: route.query.first }) }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router
