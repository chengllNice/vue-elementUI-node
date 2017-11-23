import Vue from 'vue'
import Router from 'vue-router'
import activePublic from '@/view/activePublic/index'
import PublicPage1 from '@/view/activePublic/page1'
import PublicPage2 from '@/view/activePublic/page2'
import PublicPage3 from '@/view/activePublic/page3'
import PublicPage4 from '@/view/activePublic/page4'
import activeManage from '@/view/activeManage/index'
import ManagePage1 from '@/view/activeManage/page1'
import ManagePage2 from '@/view/activeManage/page2'
import ManagePage3 from '@/view/activeManage/page3'
import ManagePage4 from '@/view/activeManage/page4'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/activePublic',
      name: 'activePublic',
      component: activePublic,
      children:[
        {
          path:'',
          component:PublicPage1
        },
        {
          path:'page2',
          component:PublicPage2
        },
        {
          path:'page3',
          component:PublicPage3
        },
        {
          path:'page4',
          component:PublicPage4
        }
      ]
    },
    {
      path:'/activeManage',
      name:'activeManage',
      component:activeManage,
      children:[
        {
          path:'',
          component:ManagePage1
        },
        {
          path:'page2',
          component:ManagePage2
        },
        {
          path:'page3',
          component:ManagePage3
        },
        {
          path:'page4',
          component:ManagePage4
        }
      ]
    },
    {
      path:'/helloWorld',
      name:'HelloWorld',
      component:HelloWorld
    }
  ]
})
