<template xmlns="">
  <el-row class="login-container">
    <!-- 左侧区域 -->
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>这是一个基于vue3的管理系统</div>
      </div>
    </el-col>

    <!-- 右侧内容区-->
    <!-- 提示栏-->
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>

      <!-- 表单-->
      <el-form ref="formRef" :model="form" class="w-[250px]" :rules="rules">
        <!-- 账户框 -->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon class="el-input__icon">
                <user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
          >
            <template #prefix>
              <el-icon class="el-input__icon">
                <lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <!-- 登陆按钮 -->
        <el-form-item>
          <el-button
            round
            color="#6466e9"
            class="w-[250px]"
            type="primary"
            @click="onSubmit"
            :loading="loading"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeMount } from "vue";
import { toast } from "@/composables/util";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const formRef = ref(null);
const loading = ref(false);

// form表单
const form = reactive({
  username: "",
  password: "",
});

// 点击登录按钮
const onSubmit = () => {
  formRef.value.validate((valid) => {
    // 表单有问题就退出
    if (!valid) {
      return false;
    }
    loading.value = true;

    store
      .dispatch("login", form)
      .then((res) => {
        toast("登陆成功");
        router.push("/");
      })
      .finally(() => {
        loading.value = false;
      });
  });
  console.log("submit!");
};

// 验证规则
const rules = {
  username: [
    {
      require: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      require: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],
};

// 监听回车事件
function onKeyUp(event) {
  if (event.key === "Enter") {
    onSubmit();
  }
}

// 添加键盘监听
onMounted(() => {
  document.addEventListener("keyup", onKeyUp);
});

onBeforeMount(() => {
  document.removeEventListener("keyup", onKeyUp);
});
</script>

<style scoped>
.login-container {
  @apply min-h-screen bg-indigo-500;
}

.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50 flex-col;
}

.left > div > div:first-child {
  @apply font-bold text-5xl text-light-50 mb-4;
}

.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}

.right > div {
  @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}

.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
