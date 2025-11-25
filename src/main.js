import { createApp } from 'vue'

// Simple test app
const app = createApp({
  template: `
    <div style="padding: 20px;">
      <h1 style="color: green;">Vue is working!</h1>
      <p>If you see this, Vue mounted successfully</p>
    </div>
  `
})

app.mount('#app')
alert('Vue app mounted!')
