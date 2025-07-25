import { createApp } from 'vue'
import App from './index.vue'
import add from '$common/utils'

add(1, 2)

const app = createApp(App)
app.mount('#app')
