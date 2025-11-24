<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <form @submit.prevent="handleLogin" class="bg-white p-8 rounded shadow w-80">
      <h2 class="mb-4 text-2xl font-bold text-center" style="color:#000080;">Login</h2>
      <input v-model="username" type="text" placeholder="Username" class="mb-2 w-full p-2 rounded border" />
      <input v-model="password" type="password" placeholder="Password" class="mb-2 w-full p-2 rounded border" />
      <button :disabled="loading" class="w-full py-2 bg-primary text-white rounded mt-2">Login</button>
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()
const error = ref(null)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  error.value = null
  const success = await auth.login(username.value, password.value)
  loading.value = false
  if (success) router.push('/products')
  else error.value = auth.error
}
</script>
