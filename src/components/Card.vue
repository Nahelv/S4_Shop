<script setup>
import { useCartStore } from "@/stores/cart.js";
import {computed, defineProps, reactive} from "vue";

const props = defineProps({
  id: Number,
  title: String,
  description: String,
  image: String,
  price: Number
});

const product = reactive({
  id: props.id,
  title: props.title,
  description: props.description,
  image: props.image,
  price: props.price
});

const cartStore = useCartStore();

function addToCart() {
  cartStore.addProduct(product);
}

const shortDescription = computed(() => {
  return props.description.length > 45
      ? props.description.substring(0, 45) + "..."
      : props.description;
});
</script>

<template>
  <div class="rounded overflow-hidden shadow-lg bg-white">
    <img :src="props.image" :alt="props.title" class="w-full h-[250px] object-cover">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ props.title }}</div>
      <p class="text-black text-base">{{ shortDescription }}</p>
      <h3 class="text-2xl mt-2 font-bold green">{{ props.price }} €</h3>

      <div class="flex gap-2">
        <router-link
            :to="{ name: 'view_product', params: { id: props.id } }"
            class="mt-4 bg-gray-200 text-black border-2 border-transparent px-4 py-2 rounded block text-center hover:bg-transparent hover:border-gray-200"
        >
          <i class="fa-solid fa-eye"></i> Voir
        </router-link>
        <button @click="addToCart"
                class="mt-4 bg-gray-800 text-white px-4 py-2 rounded block text-center hover:bg-gray-400 hover:transition-shadow">Ajouter
          au panier</button>
      </div>
    </div>
  </div>
</template>
