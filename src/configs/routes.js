// isProtected: các route cần được bảo vệ
// Có thể thêm giá trị vào đây
export default [
  {
    title: 'Login Page | Sample App',
    component: 'login',
    path: '/login',
    isProtected: false
  },
  {
    title: 'Home | Sample App',
    component: 'home',
    path: '/home',
    isProtected: true
  },
  {
    title: 'Register | Sample App',
    component: 'register',
    path: '/register',
    isProtected: true
  }
]