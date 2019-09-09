import Vue from 'vue'
import Router from 'vue-router'

import GoogleMap from '@/components/GoogleMap'

import Index from '@/components/index'
import Login from '@/components/login'
import Products from '@/components/products'
import Content from '@/components/content'
import CustomerCart from '@/components/CustomerCart'
import Checkout from '@/components/CheckoutCard'
import PersonalProfile from '@/components/PersonalProfile'
import OrderManger from '@/components/OrderManger'

import Dormitory from '@/components/dormitory'
import TempProduct from '@/components/TempProduct'

import Dashboard from '@/components/Dashboard/dashboard'
import Dashboardproducts from '@/components/Dashboard/products'
import Dashboardcoupon from '@/components/Dashboard/coupon'
import Dashboardorderlist from '@/components/Dashboard/orderlist'
import Dashboardanalysis from '@/components/Dashboard/analysis'



Vue.use(Router)

export default new Router({
  routes: [

    {
      path:'*',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'indexpage',
      component: Index,
      children:[
        {
          path: '/index',
          name: 'content',
          component: Content,
        },
        {
          path: '/products',
          name: 'products',
          component: Products,
          children:[
            {
              name:'dormitory',
              path:'/',
              component: Dormitory ,
            },
          ],
        },
        {
          name:'Tempproduct',
          path:'/tempproduct/:id',
          component:TempProduct,
        },
        {
          name:'customercart',
          path:'/customercart',
          component:CustomerCart,
          children:[
            {
              name:'checkout',
              path:'/',
              component:Checkout,
            },
            {
              name:'personalprofile',
              path:'personalprofile',
              component:PersonalProfile,
            },
          ]
        },
        {
          name:'ordermanger',
          path:'/ordermanger',
          component: OrderManger,
        },
        {
          path:'/googlemap',
          name:'googlemap',
          component: GoogleMap,
        },
        {
          name:'login',
          path:'/login',
          component: Login,
        },
      ]
    },

    {
          name:'dashboard',
          path:'/admin/Dashboard/',
          component: Dashboard ,
          meta:{requiresAuth:true},
          children:[
            {
              name:'products',
              path:'products',
              component: Dashboardproducts ,
              meta:{requiresAuth:true},
            },
            {
              name:'coupon',
              path:'coupon',
              component: Dashboardcoupon ,
              meta:{requiresAuth:true},
            },
            {
              name:'orderlist',
              path:'orderlist',
              component: Dashboardorderlist ,
              meta:{requiresAuth:true},
            },
            {
              name:'analysis',
              path:'analysis',
              component: Dashboardanalysis ,
              meta:{requiresAuth:true},
            },
          ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
