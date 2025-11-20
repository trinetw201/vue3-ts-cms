import { createApp } from "vue"
import "normalize.css"
import "./assets/css/index.less"
import App from "./App.vue"
import router from "./router"
import pinia from "./store"
import registerIcons from "./global/register-icons"

//elementPlus
// import ElementPlus from "element-plus"
// import "element-plus/dist/index.css"

// const app = createApp(App)
// app.use(ElementPlus)
// app.mount("#app")

const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount("#app")
