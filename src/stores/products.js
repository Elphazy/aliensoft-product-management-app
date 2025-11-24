import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    categories: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchProducts(query, filters = {}) {
      this.isLoading = true;
      try {
        let url = 'https://dummyjson.com/products';
        if (query) url += `/search?q=${encodeURIComponent(query)}`;
        const { data } = await axios.get(url);
        let result = data.products;
        // Filters: category, min price, max price
        if (filters.category) result = result.filter(p => p.category === filters.category);
        if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice);
        if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
        this.products = result;
        this.categories = [...new Set(data.products.map(p => p.category))];
        this.error = null;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProductById(id) {
      this.isLoading = true;
      try {
        const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
        this.error = null;
        return data;
      } catch (e) {
        this.error = e.message;
        return null;
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(payload) {
      const auth = useAuthStore();
      this.isLoading = true;
      try {
        const { data } = await axios.post(
          'https://dummyjson.com/products/add',
          payload,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        this.products.unshift(data);
        this.error = null;
        return true;
      } catch (e) {
        this.error = e.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async updateProduct(id, payload) {
      const auth = useAuthStore();
      this.isLoading = true;
      try {
        const { data } = await axios.patch(
          `https://dummyjson.com/products/${id}`,
          payload,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        const idx = this.products.findIndex(p => p.id === id);
        if (idx >= 0) this.products[idx] = { ...this.products[idx], ...data };
        this.error = null;
        return true;
      } catch (e) {
        this.error = e.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProduct(id) {
      const auth = useAuthStore();
      this.isLoading = true;
      try {
        await axios.delete(
          `https://dummyjson.com/products/${id}`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        this.products = this.products.filter(p => p.id !== id);
        this.error = null;
        return true;
      } catch (e) {
        this.error = e.message;
        return false;
      } finally {
        this.isLoading = false;
      }
    }
  }
})
