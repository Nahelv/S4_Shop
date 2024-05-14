import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Home from "@/views/Home.vue";
import Product from "@/views/Product.vue";
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia())

const router = new createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/categories', component: () => import('@/views/Categorie.vue') },
        { path: '/product/:id', component: Product, name: 'view_product' },
        { path: '/cart', component: () => import('@/views/Cart.vue') },
    ]
})

app.use(router)
app.mount('#app')