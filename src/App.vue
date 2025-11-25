<template>
  <router-view />
  <div>
    <h1 style="color: red; font-size: 24px; padding: 20px;">AlienSoft App - Testing</h1>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    alert('App.vue mounted!')
  }
}
</script>
