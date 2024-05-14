<script setup>
import Card from "@/components/Card.vue";
import axios from "axios";
import { onMounted, ref } from "vue";

let products = ref([]);
onMounted(async () => {
  await axios.get("https://dummyjson.com/products").then((response) => {
    products.value = response.data;
  })
})
</script>

<template>
  <section>
    <h3 class="text-xl mb-4">Nos derniers produits</h3>
    <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
      <Card v-for="product in products.products" :key="product.id" :id="product.id" :title="product.title"
            :description="product.description" :image="product.thumbnail" :price="product.price">
      </Card>
    </div>
  </section>
</template>