// 路由守卫,权限验证
import router from "@/router";
import { getToken } from "@/composables/auth";
import { hideFullLoading, showFullLoading, toast } from "@/composables/util";
import store from "@/store";

// 全局前置守卫（Global Before Guards）：在路由变化前触发，可以用于进行全局的身份验证或其他操作
router.beforeEach(async (to, from, next) => {
  // 显示loading
  showFullLoading();

  const token = getToken();

  // 没有登录强制调整回登陆页
  if (!token && to.path != "/login") {
    toast("请先登录", "error");
    return next({ path: "/login" });
  }

  // 防止重复登录
  if (token && to.path == "/login") {
    toast("请勿重复登录", "error");
    return next({ path: from.path ? from.path : "/" });
  }

  // 如果用户登录了,自动获取用户信息,并存储在vuex当中
  if (token) {
    await store.dispatch("getinfo");
  }

  // 页面标题
  let title = to.meta.title ? to.meta.title : "" + "vue3后台管理系统";
  document.title = title;

  next();
});

// 全局后置守卫
router.afterEach((to, from) => hideFullLoading());
