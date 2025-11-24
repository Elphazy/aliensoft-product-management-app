import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    error: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const { data } = await axios.post("https://dummyjson.com/auth/login", {
          username, password
        });
        this.token = data.token;
        this.user = data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        this.error = null;
        return true;
      } catch (e) {
        this.error = e.response?.data?.message || "Login failed";
        return false;
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.clear();
    }
  }
})
