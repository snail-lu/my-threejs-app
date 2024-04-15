import * as VueRouter from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/basic', component: () => import('../views/Basic.vue') },
    { path: '/stats', component: () => import('../views/Stats.vue') },
    { path: '/light', component: () => import('../views/Light.vue') },
    { path: '/lil-gui', component: () => import('../views/Gui.vue') },
    { path: '/texture', component: () => import('../views/Texture.vue') },
  ]
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

export default router;