// 路由配置
import Admin from "@/layouts/admin.vue";
import NotFound from "@/pages/404.vue";
import Index from "@/pages/index.vue";
import Login from "@/pages/login.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: Admin,
    // 子路由
    children: [
      {
        path: "/",
        component: Index,
        meta: {
          title: "后台首页",
        },
      },
    ],
  },
  {
    path: "/login",
    component: Login,
    meta: {
      title: "登陆",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export default router;
