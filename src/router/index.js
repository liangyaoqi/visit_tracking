import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import HomeView from "../views/HomeView.vue";
import Login from "../components/Login.vue";
import Registry from "../components/Registry.vue";
import ManageOperator from "../views/ManageOperator.vue";
import AnnouncedView from "../views/AnnouncedView.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: HomeView },
  {
    path: "/admin",
    component: AdminView,
    meta: {
      requiresAuth: true, //设置需要授权的页面
    },
  },
  { path: "/user", component: UserView },
  { path: "/login", component: Login },
  { path: "/registry", component: Registry },
  {
    path: "/manage",
    component: ManageOperator,
  },
  {
    path: "/announced",
    component: AnnouncedView,
  },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

/* router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = localStorage.getItem("token"); //此处使用 localStorage 存储 token

  if (requiresAuth && !isLoggedIn) {
    // 如果未登录且页面需要授权，则跳转到登录页面
    next("/login");
  } else {
    // 否则继续执行路由
    next();
  }
}); */

export default router;
