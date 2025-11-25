import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Products from '../pages/Products.vue'
import AddProduct from '../pages/AddProduct.vue'
import ViewProduct from '../pages/ViewProduct.vue'
import EditProduct from '../pages/EditProduct.vue'
import { useAuthStore } from '../stores/auth'

const routes = [
  { path: '/login', component: Login, name: 'Login' },
  { path: '/', redirect: '/products' },
  { path: '/products', component: Products, name: 'Products' },
  { path: '/products/add', component: AddProduct, name: 'AddProduct' },
  { path: '/products/:id', component: ViewProduct, name: 'ViewProduct', props: true },
  { path: '/products/:id/edit', component: EditProduct, name: 'EditProduct', props: true }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // ← FIX THIS LINE
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (!auth.token && to.path !== '/login') {
    next('/login')
  } else if (auth.token && to.path === '/login') {
    next('/products')
  } else {
    next()
  }
})

export default router
