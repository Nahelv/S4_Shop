import { defineStore } from 'pinia'
import {computed, ref} from "vue";

export const useCartStore = defineStore('cart', () => {
    const cart = ref([])
    const products = ref([])

    const nbProducts = computed(() => {
        return products.value.length
    })

    const getProducts = computed(() => {
        localStorage.getItem('cart') ? products.value = JSON.parse(localStorage.getItem('cart')) : products.value = []
        return products.value
    })

    function addProduct(product) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id)
        if (productIndex !== -1) {
            products.value[productIndex].quantity++
        } else {
            products.value.push({
                product: product,
                quantity: 1
            })
        }
        localStorage.setItem('cart', JSON.stringify(products.value))
    }

    function changeQuantity(product, quantity) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id)
        if (productIndex !== -1) {
            products.value[productIndex].quantity = quantity
        }
        localStorage.setItem('cart', JSON.stringify(products.value))
    }

    function deleteProduct(product) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id)
        if (productIndex !== -1) {
            products.value.splice(productIndex, 1)
        }
        localStorage.setItem('cart', JSON.stringify(products.value))
    }

    return { nbProducts, getProducts, addProduct, changeQuantity, deleteProduct }
})