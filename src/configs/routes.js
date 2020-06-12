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
    title: "Home | Sample App",
    component: "Home",
    path: "/home",
    isProtected: true,
  },
  {
    title: "Register | Sample App",
    component: "Register",
    path: "/register",
    isProtected: true,
  },
  {
    title: "Chart | Sample App",
    component: "Chart",
    path: "/chart",
    isProtected: true,
  },
  {
    title: "Password | Sample App",
    component: "Password",
    path: "/password",
    isProtected: true,
  },
  {
    title: "Table | Sample App",
    component: "Table",
    path: "/table",
    isProtected: true,
  },
  {
    title: "Profile | Sample App",
    component: "Profile",
    path: "/profile",
    isProtected: true,
  },
];
