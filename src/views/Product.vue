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
    <div class="rounded overflow-hidden shadow-lg bg-white">
      <img :src="product.thumbnail" alt="{{ product.title }}" class="w-full h-[500px] object-cover">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ product.title }}</div>
        <p class="text-base">{{ product.description }}</p>
        <h3 class="text-2xl mt-2">{{ product.price }} €</h3>
      </div>
    </div>

    <div class="mt-4 flex justify-center flex-wrap gap-4">
      <img v-for="image in product.images" :src="image" alt="{{ product.title }}" class="w-[150px] h-[150px] object-cover">
    </div>
  </div>
</template>

<style scoped>

</style>