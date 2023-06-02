import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { createPinia } from "pinia";
import { createApp } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "virtual:windi.css";
import "nprogress/nprogress.css";

import App from "./App.vue";
import store from "@/store";
import router from "./router";
import "./permission";

const app = createApp(App);

app.use(createPinia()); // pinia
app.use(router); // 路由
app.use(store); // store

app.use(ElementPlus);
app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
