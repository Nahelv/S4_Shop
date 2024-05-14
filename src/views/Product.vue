<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

let product = ref();
onMounted(async () => {
  await axios.get("https://dummyjson.com/products/" + id).then((response) => {
    product.value = response.data;
  });
});
</script>

<template>
  <div class="container" v-if="product">
    <h3 class="text-xl mb-4">Fiche du produit {{ product.title }}</h3>
    <div class="flex rounded overflow-hidden shadow-lg bg-white">
      <img :src="product.thumbnail" alt="{{ product.title }}" class="w-full h-[500px] object-cover">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ product.title }}</div>
        <p class="text-base">{{ product.description }}</p>
        <h3 class="text-2xl mt-3 mb-5 font-bold green">{{ product.price }} €</h3>
        <hr>
        <p class="mt-5">
          <span class="font-semibold">Catégorie</span> : {{ product.category }} <br>
          <span class="font-semibold">Stock</span> : <span class="font-medium">{{ product.stock }}</span> disponibles <br>
          <span class="font-semibold">Marque</span> : {{ product.brand }}
        </p>
      </div>
    </div>

    <div class="mt-5 flex justify-center flex-wrap gap-3">
      <img v-for="image in product.images" :src="image" alt="{{ product.title }}"
           class="w-[200px] h-[150px] object-cover">
    </div>
  </div>
</template>

<style scoped>

</style>