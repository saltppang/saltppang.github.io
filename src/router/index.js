import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import PortList from '../components/PortList.vue';
import PortView from '../components/PortView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/portList",
      component: PortList,
    },
    {
      path: "/PortView/:id",
      component: PortView,
    },
    
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      } else {
        return { top: 0 }
    }
  }
});




export default router;

