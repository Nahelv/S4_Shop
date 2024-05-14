<script setup>
import Card from "@/components/Card.vue";
import axios from "axios";
import {onMounted, ref, computed, watch} from "vue";

let recherche = ref('');
let products = ref([]);
let categories = ref([]);
let selectedCategory = ref('');

onMounted(async () => {
  await axios.get("https://dummyjson.com/products").then((response) => {
    products.value = response.data.products;
  });
  await axios.get("https://dummyjson.com/products/categories").then((response) => {
    categories.value = response.data;
  });
});

watch(selectedCategory, async (filterCategory) => {
  if (filterCategory) {
    await axios.get(`https://dummyjson.com/products/category/${filterCategory}`).then((response) => {
      products.value = response.data.products;
    });
  } else {
    await axios.get("https://dummyjson.com/products").then((response) => {
      products.value = response.data.products;
    });
  }
});

let filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return product.title.toLowerCase().includes(recherche.value.toLowerCase())
  });
});
</script>

<template>
  <section>
    <h3 class="text-xl mb-4">Nos derniers produits</h3>
    <input type="text" v-model="recherche" id="recherche"
           class="w-full my-2 px-3 py-2 border-2 rounded-xl outline-0" placeholder="Rechercher un produit..">
    <select v-model="selectedCategory" class="w-full mb-7 px-3 py-2 border-2 rounded-xl outline-0">
      <option value="">Toutes les catégories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5">
      <Card v-for="product in filteredProducts" :key="product.id" :id="product.id" :title="product.title"
            :description="product.description" :image="product.thumbnail" :price="product.price">
      </Card>
    </div>
  </section>
</template>
