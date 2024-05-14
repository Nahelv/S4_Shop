<script setup>
import { useCartStore } from "@/stores/cart.js";

const store = useCartStore();
console.log(store.getProducts);
</script>

<template>
  <section>
    <h3 class="text-xl mb-4">
      Votre panier ({{ store.nbProducts <= 1 ? store.nbProducts + ' produit' : store.nbProducts + ' produits' }})
    </h3>

  </section>
</template>