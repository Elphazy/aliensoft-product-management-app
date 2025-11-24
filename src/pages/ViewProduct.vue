<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
    <div v-if="loading" class="flex justify-center items-center py-8">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="product">
      <div class="flex items-center space-x-4 mb-6">
        <img :src="product.thumbnail" alt="Thumbnail" class="w-24 h-24 rounded-full object-cover border" />
        <div>
          <h2 class="text-2xl font-bold mb-2" style="color:#000080;">{{ product.title }}</h2>
          <span class="text-gray-500">{{ product.category }}</span>
        </div>
      </div>
      <div class="mb-2">
        <strong>Description:</strong>
        <div class="text-gray-700">{{ product.description }}</div>
      </div>
      <div class="mb-2"><strong>Price:</strong> <span class="text-blue-700">${{ product.price }}</span></div>
      <div class="mb-2"><strong>Stock:</strong> {{ product.stock }}</div>
      <div class="mb-2"><strong>Rating:</strong> {{ product.rating }}</div>
      <div class="mb-2"><strong>Discount:</strong> {{ product.discountPercentage }}%</div>
      <!-- Edit/Delete buttons for detail view too -->
      <div class="flex gap-2 mt-4">
        <router-link :to="`/products/${product.id}/edit`">
          <button class="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
        </router-link>
        <button @click="confirmDelete(product.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
    <div v-else class="text-center py-8">Product not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const store = useProductStore()
const product = ref(null)
const loading = ref(false)
const error = ref(null)

onMounted(async () => {
  loading.value = true
  const data = await store.fetchProductById(route.params.id)
  loading.value = false
  if (data) {
    product.value = data
  } else {
    error.value = store.error
  }
})

const confirmDelete = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    const ok = await store.deleteProduct(id);
    if (ok) router.push('/products')
    else alert(store.error)
  }
}
</script>
