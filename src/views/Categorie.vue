<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";

let categories = ref([]);
onMounted(async () => {
  await axios.get("https://dummyjson.com/products/categories").then((response) => {
    categories.value = response.data;
  });
});
</script>

<template>
  <div class="container">
    <h3 class="text-xl mb-4">Nos catégories</h3>
    <div class="px-3 py-6 bg-gray-50 shadow-md mb-2 rounded" v-for="cat in categories">{{ cat
      }}</div>
  </div>
</template>