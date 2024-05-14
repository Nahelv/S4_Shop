<script setup>
import { useCartStore } from "@/stores/cart.js";
const cartStore = useCartStore();
</script>

<template>
  <section>
    <h3 class="text-xl mb-4">
      Votre panier ({{ cartStore.nbProducts <= 1 ? cartStore.nbProducts + ' produit' : cartStore.nbProducts + ' produits' }})
    </h3>

    <div class="flex flex-col" v-if="cartStore.nbProducts !== 0">
      <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table
                class="min-w-full border border-neutral-200 text-center text-sm font-light text-surface">
              <thead
                  class="border-b border-neutral-200 font-medium">
              <tr>
                <th colspan="2" scope="col" class="border-e border-neutral-200 px-6 py-4">
                  <span class="font-bold">Produit</span>
                </th>
                <th scope="col" class="border-e border-neutral-200 px-6 py-4">
                  <span class="font-bold">Prix unitaire</span>
                </th>
                <th scope="col" class="border-e border-neutral-200 px-6 py-4">
                  <span class="font-bold">Quantité</span>
                </th>
                <th scope="col" class="border-e border-neutral-200 px-6 py-4">
                  <span class="font-bold">Total</span>
                </th>
                <th scope="col" class="px-6 py-4">
                  <span class="font-bold">Actions</span>
                </th>
              </tr>
              </thead>
              <tbody>
              <tr class="border-b border-neutral-200" v-for="product in cartStore.getProducts" :key="product.id">
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  <img :src="product.product.image" class="w-full h-10 object-cover" :alt="product.product.title">
                </td>
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  {{ product.product.title }}
                </td>
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  {{ product.product.price.toFixed(2).replace('.', ',') }} €
                </td>
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  <input
                      type="number"
                      min="1"
                      v-model.number="product.quantity"
                      @change="cartStore.changeQuantity(product.product, product.quantity)"
                      class="w-16 text-center border border-neutral-300 rounded"
                  />
                </td>
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  {{ (product.product.price * product.quantity).toFixed(2).replace('.', ',') }} €
                </td>
                <td>
                  <div class="flex justify-center gap-2">
                    <router-link
                        :to="{ name: 'view_product', params: { id: product.product.id } }"
                        class="bg-gray-200 text-black border-2 border-transparent px-4 py-2 rounded block text-center hover:bg-transparent hover:border-gray-200"
                        target='_blank'
                    ><i class="fa-solid fa-eye"></i></router-link>
                    <button
                        @click="cartStore.deleteProduct(product.product)"
                        class="bg-red-500 text-white px-4 py-2 rounded block text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="border-b border-neutral-200">
                <td colspan="4" class="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-bold">
                  Total à payer
                </td>
                <td class="whitespace-nowrap border-e border-neutral-200 px-6 py-4">
                  {{ cartStore.getTotalProductPrice.toFixed(2).replace('.', ',') }} €
                </td>
                <td>
                  <div class="flex justify-center items-center">
                    <button
                        @click="cartStore.resetCart"
                        class="flex justify-center items-center gap-2 bg-red-500 text-white px-2 py-2 rounded text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                      </svg>
                      Vider le panier
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Votre panier est actuellement vide.</p>
    </div>
  </section>
</template>