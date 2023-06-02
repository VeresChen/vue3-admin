<template>
  <div class="f-header">
    <!-- 左边区域-->
    <span class="logo">
      <el-icon class="mr-1"><eleme-filled /></el-icon>
      Vue3后台管理系统
    </span>

    <el-tooltip effect="dark" content="收起" placement="bottom">
      <el-icon class="icon-btn">
        <fold />
      </el-icon>
    </el-tooltip>

    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh">
        <refresh />
      </el-icon>
    </el-tooltip>

    <!-- 右边区域 -->
    <div class="ml-auto flex items-center">
      <!-- 全屏 -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <full-screen v-if="!isFullscreen" />
          <aim v-else />
        </el-icon>
      </el-tooltip>

      <!-- 下拉菜单 -->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="flex items-center text-light-50">
          <!-- 头像 -->
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <!-- 修改密码 -->
  <el-drawer
    v-model="showDrawer"
    title="修改密码"
    size="45%"
    :close-on-click-modal="false"
  >
    <el-form
      ref="formRef"
      :model="formRef"
      :rules="rules"
      label-width="80px"
      size="small"
    >
      <!-- 旧密码 -->
      <el-form-item prop="oldpassword" label="旧密码:">
        <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>

      <!-- 新密码 -->
      <el-form-item prop="password" label="新密码:">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          show-password
        >
        </el-input>
      </el-form-item>

      <!-- 确认密码 -->
      <el-form-item prop="repassword" label="确认密码:">
        <el-input
          type="password"
          v-model="form.repassword"
          placeholder="请输入确认密码"
          show-password
        >
        </el-input>
      </el-form-item>

      <!-- 登陆按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading"
        >提交
        </el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { showModal, toast } from "@/composables/util";
import { logout, updatepassword } from "@/api/manager";
import { useFullscreen } from "@vueuse/core";

import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, reactive } from "vue";

const router = useRouter();
const store = useStore();
const { isFullscreen, toggle } = useFullscreen();

// 修改密码
const showDrawer = ref(false);

const handleCommand = (c) => {
  switch (c) {
    case "logout":
      handlelogout();
      break;
    case "rePassword":
      console.log("修改密码");
      showDrawer.value = true;
      break;
  }
};

// 退出登录
function handlelogout() {
  showModal("是否要退出登录?").then((res) => {
    logout().finally(() => {
      store.dispatch("logout");

      // 跳转回登陆页
      router.push("/login");

      // 提示退出登录成功
      toast("退出登录成功");
    });
  });
}

// 刷新
const handleRefresh = () => location.reload();

// form表单
const formRef = ref(null);
const loading = ref(false);

const form = reactive({
  oldpassword: "",
  password: "",
  repassword: ""
});

// 点击登录按钮
const onSubmit = () => {
  formRef.value.validate((valid) => {
    // 表单有问题就退出
    if (!valid) {
      return false;
    }
    loading.value = true;
    updatepassword(form).then(res => {
      toast("修改密码成功,请重新登陆");
      store.dispatch("logout")
      router.push("/login")
    }).finally(() => {
      loading.value = false;
    });
  });
  console.log("submit!");
};

// 验证规则
const rules = {
  oldpassword: [
    {
      require: true,
      message: "旧密码不能为空",
      trigger: "blur"
    }
  ],
  password: [
    {
      require: true,
      message: "密码不能为空",
      trigger: "blur"
    }
  ],
  repassword: [
    {
      require: true,
      message: "新密码不能为空",
      trigger: "blur"
    }
  ]
};
</script>

<style scoped>
.f-header {
    @apply flex items-center bg-indigo-700 text-light-50 fixed top-0 left-0 right-0;
    height: 64px;
}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-600;
}

.f-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
