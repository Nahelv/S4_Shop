import { defineStore } from 'pinia';
import {computed, ref} from "vue";

export const useCartStore = defineStore('cart', () => {
    const products = ref([]);

    const initializeCart = () => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            products.value = JSON.parse(storedCart);
        }
    };

    initializeCart();

    const nbProducts = computed(() => products.value.length);

    const getProducts = computed(() => products.value);

    const getTotalProductPrice = computed(() => {
        return products.value.reduce((acc, product) => acc + product.totalPrice, 0);
    })

    function addProduct(product) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id);
        if (productIndex !== -1) {
            products.value[productIndex].quantity++;
            products.value[productIndex].totalPrice = getTotalPrice(products.value[productIndex].product, products.value[productIndex].quantity);
        } else {
            products.value.push({
                product: product,
                quantity: 1,
                totalPrice: getTotalPrice(product, 1)
            });
        }
        localStorage.setItem('cart', JSON.stringify(products.value));
    }

    function getTotalPrice(product, quantity) {
        return product.price * quantity;
    }

    function changeQuantity(product, quantity) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id);
        if (productIndex !== -1) {
            if (quantity === 0) {
                products.value.splice(productIndex, 1);
            } else {
                products.value[productIndex].quantity = quantity;
            }
        }
        localStorage.setItem('cart', JSON.stringify(products.value));
    }

    function deleteProduct(product) {
        const productIndex = products.value.findIndex(p => p.product.id === product.id);
        if (productIndex !== -1) {
            products.value.splice(productIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(products.value));
    }

    function resetCart() {
        products.value = [];
        localStorage.setItem('cart', JSON.stringify(products.value));
    }

    return { nbProducts, getProducts, getTotalProductPrice, addProduct, changeQuantity, deleteProduct, resetCart };
});