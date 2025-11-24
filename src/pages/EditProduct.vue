<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4" style="color:#000080;">Edit Product</h2>
    <form v-if="product" @submit.prevent="handleEdit">
      <input v-model="title" type="text" placeholder="Title" class="w-full border p-2 rounded mb-2" required />
      <textarea v-model="description" placeholder="Description" class="w-full border p-2 rounded mb-2" required></textarea>
      <input v-model="category" type="text" placeholder="Category" class="w-full border p-2 rounded mb-2" required />
      <div class="mb-2 flex space-x-2">
        <input v-model.number="price" type="number" placeholder="Price" class="w-1/2 border p-2 rounded" required />
        <input v-model.number="stock" type="number" placeholder="Stock" class="w-1/2 border p-2 rounded" required />
      </div>
      <input v-model="thumbnail" type="url" placeholder="Thumbnail URL" class="w-full border p-2 rounded mb-2" required />
      <button :disabled="loading" class="bg-primary text-white px-4 py-2 rounded w-full mb-2">Save Changes</button>
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
    </form>
    <div v-else class="text-center py-8">Loading product...</div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../stores/products'

const route = useRoute()
const store = useProductStore()
const router = useRouter()

const product = ref(null)
const title = ref('')
const description = ref('')
const category = ref('')
const price = ref(0)
const stock = ref(0)
const thumbnail = ref('')
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  const data = await store.fetchProductById(route.params.id)
  loading.value = false
  if (data) {
    product.value = data
    title.value = data.title
    description.value = data.description
    category.value = data.category
    price.value = data.price
    stock.value = data.stock
    thumbnail.value = data.thumbnail
  } else {
    error.value = store.error
  }
})

const handleEdit = async () => {
  loading.value = true
  error.value = null
  const ok = await store.updateProduct(product.value.id, {
    title: title.value,
    description: description.value,
    category: category.value,
    price: price.value,
    stock: stock.value,
    thumbnail: thumbnail.value
  })
  loading.value = false
  if (ok) router.push(`/products/${product.value.id}`)
  else error.value = store.error
}
</script>
