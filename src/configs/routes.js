// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
export default [
  {
    title: 'Login Page | Sample App',
    component: 'Login',
    path: '/login',
    isProtected: false
  },
  {
    title: 'Home | Sample App',
    component: 'Home',
    path: '/home',
    isProtected: true
  },
  {
    title: 'Register | Sample App',
    component: 'Register',
    path: '/register',
    isProtected: true
  }
]