import { createApp } from 'vue'
import App from './App.vue'
import components from '@/components/UI'
import router from "@/router/router";
import myDirectives from "@/directives";
import store from "@/store";

const app = createApp(App)
components.forEach(component=>{
    app.component(component.name, component)
})

myDirectives.forEach(direct=>{
    app.directive(direct.name, direct)
})

app.use(router).use(store).mount('#app')



