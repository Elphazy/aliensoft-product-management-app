<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4" style="color:#000080;">Add New Product</h2>
    <form @submit.prevent="handleAdd">
      <input v-model="title" type="text" placeholder="Title" class="w-full border p-2 rounded mb-2" required />
      <textarea v-model="description" placeholder="Description" class="w-full border p-2 rounded mb-2" required></textarea>
      <input v-model="category" type="text" placeholder="Category" class="w-full border p-2 rounded mb-2" required />
      <div class="mb-2 flex space-x-2">
        <input v-model.number="price" type="number" placeholder="Price" class="w-1/2 border p-2 rounded" required />
        <input v-model.number="stock" type="number" placeholder="Stock" class="w-1/2 border p-2 rounded" required />
      </div>
      <input v-model="thumbnail" type="url" placeholder="Thumbnail URL" class="w-full border p-2 rounded mb-2" required />
      <button :disabled="loading" class="bg-primary text-white px-4 py-2 rounded w-full mb-2">Add Product</button>
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'

const store = useProductStore()
const router = useRouter()

const title = ref('')
const description = ref('')
const category = ref('')
const price = ref(0)
const stock = ref(0)
const thumbnail = ref('')

const loading = ref(false)
const error = ref(null)

const handleAdd = async () => {
  loading.value = true
  error.value = null
  const ok = await store.addProduct({
    title: title.value,
    description: description.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    thumbnail: thumbnail.value
  })
  loading.value = false
  if (ok) router.push('/products')
  else error.value = store.error
}
</script>
