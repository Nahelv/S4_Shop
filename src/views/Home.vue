<script setup>
import Card from "@/components/Card.vue";
import axios from "axios";
import { onMounted, ref, computed, watch } from "vue";

let recherche = ref('');
let products = ref([]);
let categories = ref([]);
let selectedCategory = ref('');

let limit = ref(8);
let skip = ref(0);
let totalProducts = ref(0);

const fetchProducts = async () => {
  let url = `https://dummyjson.com/products?limit=${limit.value}&skip=${skip.value}`;
  if (selectedCategory.value) {
    url = `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${limit.value}&skip=${skip.value}`;
  }
  await axios.get(url).then((response) => {
    products.value = response.data.products;
    totalProducts.value = response.data.total;
  });
};

onMounted(async () => {
  await fetchProducts();
  await axios.get("https://dummyjson.com/products/categories").then((response) => {
    categories.value = response.data;
  });
});

watch([selectedCategory, skip], async () => {
  await fetchProducts();
});

let filteredProducts = computed(() => {
  return products.value.filter((product) => {
    return product.title.toLowerCase().includes(recherche.value.toLowerCase()) ||
        product.description.toLowerCase().includes(recherche.value.toLowerCase());
  });
});

const nextPage = () => {
  if (skip.value + limit.value < totalProducts.value) {
    skip.value += limit.value;
  }
};

const prevPage = () => {
  if (skip.value > 0) {
    skip.value -= limit.value;
  }
};
</script>

<template>
  <section>
    <h3 class="text-xl mb-4">Nos derniers produits</h3>
    <input type="text" v-model="recherche" id="recherche"
           class="w-full my-2 px-3 py-2 border-2 rounded-xl outline-0" placeholder="Rechercher un produit..">
    <select v-model="selectedCategory" class="w-full mb-2 px-3 py-2 border-2 rounded-xl outline-0">
      <option value="">Toutes les catégories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <div class="flex justify-between mt-3 mb-5">
      <button @click="prevPage" :disabled="skip === 0" class="px-4 py-2 bg-gray-200 rounded-lg">Précédent</button>
      <button @click="nextPage" :disabled="skip + limit >= totalProducts" class="px-4 py-2 bg-gray-200 rounded-lg">Suivant</button>
    </div>
    <div class="grid xl:grid-cols-4 md:grid-cols-3 gap-5 mb-4">
      <Card v-for="product in filteredProducts" :key="product.id" :id="product.id" :title="product.title"
            :description="product.description" :image="product.thumbnail" :price="product.price">
      </Card>
    </div>
  </section>
</template>
