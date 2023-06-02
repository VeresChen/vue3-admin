import axios from "@/axios";

// 发出登陆请求,返回token
export function login(username, password) {
  return axios.post("/admin/login", {
    username,
    password,
  });
}

// 获取人员信息
export function getinfo() {
  return axios.post("/admin/getinfo");
}

// 退出登录
export function logout() {
  return axios.post("/admin/logout");
}

// 修改密码
export function updatepassword(data) {
  return axios.post("/admin/updatepassword", data);
}
