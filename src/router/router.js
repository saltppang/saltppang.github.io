import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue"; 
import PortList from '../components/PortList.vue';
import PortView from '../components/PortView.vue';

console.log("Router loaded");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/PortList",
    name: "portlist",
    component: PortList,
  },
  {
    path: "/view/:id",
    name: "portview",
    component: PortView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 항상 페이지 이동 시 스크롤 맨 위로
    console.log('scrollBehavior triggered');
    return { top: 0 };
  },
});
console.log("Router loaded");


export default router;