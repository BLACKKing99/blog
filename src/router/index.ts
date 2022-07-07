import { createRouter, RouteRecordRaw, RouterView, createWebHistory } from 'vue-router'
import { App } from 'vue'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import LocalCatch from '@/util/LocalCatch'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/components/layout/index.vue'),
    redirect: '/main',
    children: [
      {
        path: 'main',
        redirect: '/main/preview',
        name: 'main',
        component: RouterView,
        children: [
          {
            path: 'preview',
            name: 'preview',
            component: () => import('@/views/main/home/Preview.vue')
          },
          {
            path: 'create',
            name: 'create',
            component: () => import('@/views/main/home/Create.vue'),
            meta: {
              isAuth: true
            }
          }
        ]
      },
      {
        path: 'music',
        name: 'music',
        component: () => import('@/views/main/music/Index.vue'),
        meta: {
          keepAlive: true
        }
      },
      {
        path: 'other',
        name: 'other',
        component: RouterView,
        children: [
          {
            path: 'about',
            name: 'about',
            component: () => import('@/views/main/other/About.vue')
          },
          {
            path: 'photos',
            name: 'photos',
            component: () => import('@/views/main/other/Photos.vue')
          },
          {
            path: 'contact',
            name: 'contact',
            component: () => import('@/views/main/other/Contact.vue')
          }
        ]
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/components/layout/users/userHeader.vue'),
        children: [
          {
            path: 'collect',
            name: 'collect',
            component: () => import('@/views/main/user/Collect.vue'),
            meta: {
              isAuth: true
            }
          },
          {
            path: 'info',
            name: 'info',
            component: () => import('@/views/main/user/Info.vue'),
            meta: {
              isAuth: true
            }
          },
          {
            path: 'firstpage',
            name: 'firstpage',
            component: () => import('@/views/main/user/FirstPage.vue'),
            meta: {
              isAuth: true
            }
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    component: () => import('@/views/article/Index.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notfind',
    component: () => import('@/views/notFind/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  Nprogress.start()
  const isLogin = !!LocalCatch.getItem('lzf_blog')
  if (!isLogin && to.meta.isAuth) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
  next()
})

router.afterEach((to, from) => {
  Nprogress.done()
})

export { router }

export default (app: App<Element>) => {
  app.use(router)
}
