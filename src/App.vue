<script setup>
import {useCartStore} from "@/stores/cart.js";
const store = useCartStore();
</script>

<template>
  <nav class="flex gap-3">
    <router-link to="/">Accueil</router-link>
    <router-link to="/categories">Catégories</router-link>
    <router-link to="/cart">Panier ({{ store.nbProducts }})</router-link>
  </nav>
  <div class="container">
    <h1 class="text-3xl mt-4 mb-5">Boutique</h1>
    <router-view />
  </div>
</template>