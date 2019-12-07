import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/',
    component: () => import('@/components/common/Home.vue'),
    meta: { title: '首页' },
    children: [
      {
        path: '/dashboard',
        component: () => import('@/page/dashboard/Dashboard.vue'),
        meta: { title: '系统首页' }
      },
      {
        path: '/alg',
        component: () => import('@/page/alg/Alg.vue'),
        meta: { title: '算法管理' }
      },
      {
        path: '/strategy-list',
        component: () => import('@/page/strategy-list/StrategyList'),
        meta: { title: '策略列表' }
      },
      {
        path: '/strategy-add',
        component: () => import('@/page/strategy-add/StrategyAdd'),
        meta: { title: '添加策略' }
      },
      {
        path: '/scene-list',
        component: () => import('@/page/scene-list/SceneList'),
        meta: { title: '场景列表' }
      },
      {
        path: '/scene-add',
        component: () => import('@/page/scene-add/SceneAdd'),
        meta: { title: '添加场景' }
      },
      {
        path: '/rec-list',
        component: () => import('@/page/rec-list/RecList'),
        meta: { title: '推荐列表' }
      },
      {
        path: '/rec-analysis',
        component: () => import('@/page/rec-analysis/RecAnalysis'),
        meta: { title: '推荐分析' }
      },
      {
        path: '/search-analysis',
        component: () => import('@/page/search-analysis/SearchAnalysis'),
        meta: { title: '搜索关键字分析' }
      },
      {
        path: '/artical-list',
        component: () => import('@/page/artical-list/ArticalList'),
        meta: { title: '文章列表' }
      },
      {
        path: '/artical-profile',
        component: () => import('@/page/artical-profile/ArticalProfile'),
        meta: { title: '文章画像' }
      },
      {
        path: '/artical-add',
        component: () => import('@/page/artical-add/ArticalAdd'),
        meta: { title: '添加文章' }
      },
      {
        path: '/user-list',
        component: () => import('@/page/user-list/UserList'),
        meta: { title: '用户列表' }
      },
      {
        path: '/user-profile',
        component: () => import('@/page/user-profile/UserProfile'),
        meta: { title: '用户画像' }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/page/login/Login.vue'),
    meta: { title: '登录' }
  }
];

export default new Router({
  routes
});
