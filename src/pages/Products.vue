<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <div class="flex flex-wrap items-end gap-4 mb-4">
      <input v-model="search" @input="doSearch" class="border p-2 rounded" placeholder="Search by title..." />
      <select v-model="category" @change="doSearch" class="border p-2 rounded">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <input v-model.number="minPrice" type="number" placeholder="Min Price" class="border p-2 rounded w-32" @input="doSearch" />
      <input v-model.number="maxPrice" type="number" placeholder="Max Price" class="border p-2 rounded w-32" @input="doSearch" />
      <router-link to="/products/add" class="ml-auto">
        <button class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded">Add New Product</button>
      </router-link>
    </div>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <span>Loading...</span>
    </div>
    <div v-if="error" class="text-red-500 mb-2">{{ error }}</div>
    <table v-if="products.length" class="w-full border-collapse">
      <thead>
        <tr class="bg-primary text-white">
          <th class="px-4 py-2">Image</th>
          <th class="px-4 py-2">Title & Description</th>
          <th class="px-4 py-2">Category</th>
          <th class="px-4 py-2">Price</th>
          <th class="px-4 py-2">Stock</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id" class="hover:bg-gray-100">
          <td class="py-2 px-4">
            <img :src="product.thumbnail" alt="Image" class="h-12 w-12 rounded-full object-cover" />
          </td>
          <td class="py-2 px-4">
            <strong>{{ product.title }}</strong>
            <div class="text-gray-500">{{ product.description.slice(0, 80) }}{{ product.description.length > 80 ? '…' : '' }}</div>
          </td>
          <td class="py-2 px-4">{{ product.category }}</td>
          <td class="py-2 px-4">${{ product.price }}</td>
          <td class="py-2 px-4">{{ product.stock }}</td>
          <td class="py-2 px-4 flex gap-2">
            <router-link :to="`/products/${product.id}`">
              <button class="bg-blue-500 text-white px-3 py-1 rounded">View</button>
            </router-link>
            <router-link :to="`/products/${product.id}/edit`">
              <button class="bg-green-500 text-white px-3 py-1 rounded">Edit</button>
            </router-link>
            <button @click="confirmDelete(product.id)" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!loading && !products.length" class="py-8 text-center text-gray-500">No products found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useProductStore } from '../stores/products'

const store = useProductStore()
const search = ref('')
const category = ref('')
const minPrice = ref()
const maxPrice = ref()
const products = computed(() => store.products)
const categories = computed(() => store.categories)
const loading = computed(() => store.isLoading)
const error = computed(() => store.error)

const doSearch = () => {
  store.fetchProducts(search.value, { category: category.value, minPrice: minPrice.value, maxPrice: maxPrice.value })
}
onMounted(() => {
  store.fetchProducts()
})

const confirmDelete = async (id) => {
  if (confirm("Are you sure you want to delete this product?")) {
    const ok = await store.deleteProduct(id);
    if (!ok) alert(store.error)
  }
}
</script>
