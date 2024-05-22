import * as VueRouter from 'vue-router'

const routes = [
    {  
      path: '/', 
      component: () => import('../views/Home.vue'),
      meta: {
        title: '首页'
      }
    },
    { 
      path: '/basic', 
      component: () => import('../views/Basic.vue'),
      meta: {
        title: '基础入门'
      }
    },
    { 
      path: '/orbit-controls', 
      component: () => import('../views/OrbitControls.vue'),
      meta: {
        title: '轨道控制器'
      } 
    },
    { 
      path: '/stats', 
      component: () => import('../views/Stats.vue'),
      meta: {
        title: '性能监视器'
      }
    },
    { 
      path: '/light', 
      component: () => import('../views/Light.vue'),
      meta: {
        title: '光源'
      } 
    },
    { 
      path: '/lil-gui', 
      component: () => import('../views/Gui.vue'),
      meta: {
        title: 'lil-gui使用'
      }
    },
    { 
      path: '/texture', 
      component: () => import('../views/Texture.vue'),
      meta: {
        title: '纹理贴图'
      }
    },
    { 
      path: '/geometry', 
      component: () => import('../views/Geometry.vue'),
      meta: {
        title: '几何体'
      }
    },
  ]
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;