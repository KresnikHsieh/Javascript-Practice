import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld';
import Dashboard from '@/components/Dashboard';
import Login from '@/components/pages/Login';
import Products from '@/components/pages/Products';

Vue.use(Router)

export default new Router({
  routes: [
    { 
      path:'*', //當路由不是指定的路徑時
      redirect:'login', //將路徑redirect到login page
    },
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld,
    //   meta: { requiresAuth: true },
    // },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [ 
        { //建立巢狀的router-view
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    }
  ]
})
