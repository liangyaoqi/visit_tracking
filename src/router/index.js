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

const routes = [
  { path: "/home", component: HomeView },
  { path: "/admin", component: AdminView },
  { path: "/user", component: UserView },
  { path: "/login", component: Login },
  { path: "/registry", component: Registry },
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
