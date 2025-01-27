<template>
    <div class="w-full h-auto bg-gray-50 p-4 flex flex-wrap gap-10">
      <div
        v-for="product in products"
        :key="product.id"
        class="product-card h-[225px] w-[22%] bg-white rounded-lg p-2 transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3 cursor-pointer"
      >
        <img
          :src="product.image"
          alt="product image"
          class="h-[120px] w-full object-contain mb-2"
        />
        <h2 class="text-sm font-bold truncate">{{ product.title }}</h2>
        <p class="text-xs text-gray-500">{{ product.category }}</p>
        <p class="text-sm font-semibold text-gray-800 mt-1">
          ${{ (product.price * 1.022).toFixed(2) }}
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "Products",
    data() {
      return {
        products: [],
      };
    },
    async mounted() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  };
  </script>
  