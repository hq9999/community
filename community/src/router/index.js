import Vue from 'vue'
import Router from 'vue-router'

const index=()=>import('../pages/index.vue')
const login=()=>import('../pages/login.vue')
const manage=()=>import('../pages/manage.vue')
const welcome=()=>import('../pages/welcome.vue')
const manageList=()=>import('../pages/manageList.vue')
const bannerManage=()=>import('../pages/bannerManage.vue')
const jiajiaoM=()=>import('../pages/jiajiaoM.vue')
const jiazhengM=()=>import('../pages/jiazhengM.vue')
const weixiuM=()=>import('../pages/weixiuM.vue')
const shuizhanM=()=>import('../pages/shuizhanM.vue')
const reset=()=>import('../pages/reset.vue')


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
      children:[
        {
          path:"manage",
          component:manage,
          children:[
            {
              path:"manageList",
              name:"超级管理",
              component:manageList,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='0'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='1'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"bannerManage",
              name:"banner管理",
              component:bannerManage,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"jiajiaoM",
              name:"家教管理",
              component:jiajiaoM,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"jiazhengM",
              name:"家政管理",
              component:jiazhengM,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"weixiuM",
              name:"维修管理",
              component:weixiuM,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"shuizhanM",
              name:"水站管理",
              component:shuizhanM,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
            {
              path:"reset",
              name:"修改密码",
              component:reset,
              beforeEnter:(to,from,next)=>{
                if(localStorage.getItem("isType")=='1'){
                  next();
                  return;
                }else if(localStorage.getItem("isType")=='0'){
                  next("/index/welcome")
                }
              },
            },
          ]
        },
        {
          path:"welcome",
          component:welcome,
        },
        {
          path:"",
          redirect:"welcome"
        }
      ]
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '*',
      redirect: "/login",
    },
  ]
})
