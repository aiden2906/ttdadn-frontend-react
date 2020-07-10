// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
export default [
  {
    title: "Login Page | Sample App",
    component: "Login",
    path: "/login",
    isProtected: false,
  },
  {
    title: "Register | Sample App",
    component: "Register",
    path: "/register",
    isProtected: false,
  },
  {
    title: "Password | Sample App",
    component: "Password",
    path: "/password",
    isProtected: false,
  },
  {
    title: "Reset Password | Sample App",
    component: "ResetPassword",
    path: "/reset-password",
    isProtected: false,
  },
  {
    title: "Home | Sample App",
    component: "Home",
    path: "/home",
    isProtected: true,
  },
  {
    title: "Chart | Sample App",
    component: "Chart",
    path: "/chart",
    isProtected: true,
  },
  {
    title: "Profile | Sample App",
    component: "Profile",
    path: "/profile",
    isProtected: true,
  },
  {
    title: "Controller | Sample App",
    component: "Controller",
    path: "/controller",
    isProtected: true,
  },
  {
    title: "Admin | Sample App",
    component: "Admin",
    path: "/admin",
    isProtected: true,
  },
  {
    title: "Notification | Sample App",
    component: "Notification",
    path: "/notification",
    isProtected: true,
  },
];
