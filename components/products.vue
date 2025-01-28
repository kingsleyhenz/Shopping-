<template>
  <div class="w-full h-auto bg-gray-50 p-4 flex flex-wrap gap-10">
    <div
      v-for="product in products"
      :key="product.id"
      class="product-card h-[225px] w-[22%] bg-white rounded-lg p-2 transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3 cursor-pointer border-1 border-gray-200"
      @click="openModal(product)"
    >
      <img :src="product.image" alt="" class="h-[120px] w-full object-contain mb-2" />
      <h2 class="text-sm font-bold truncate">{{ product.title }}</h2>
      <p class="text-xs text-gray-500">{{ product.category }}</p>
      <p class="text-sm font-semibold text-gray-800 mt-1">
        ${{ (product.price * 1.022).toFixed(2) }}
      </p>
    </div>
    <div v-if="selectedProduct" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg relative">
        <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
          ✕
        </button>
        <img :src="selectedProduct.image" alt="product image" class="h-[200px] w-full object-contain mb-4" />
        <h2 class="text-lg font-bold mb-2">{{ selectedProduct.title }}</h2>
        <p class="text-sm text-gray-500 mb-2">{{ selectedProduct.category }}</p>
        <p class="text-base text-gray-800 mb-4">
          ${{ (selectedProduct.price * 1.022).toFixed(2) }}
        </p>
        <svg
          class="w-8 text-gray-800 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          @click="addToCart(selectedProduct)"
        >
          <path
            fill-rule="evenodd"
            d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      selectedProduct: null,
    };
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
    },
    closeModal() {
      this.selectedProduct = null;
    },
    addToCart(product) {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const foundProduct = cart.some((item) => item.id === product.id);
        const updatedProduct = { ...product, price: product.price * 1.022 };

        if (foundProduct) {
          Toastify({
            text: "Product already exists inside the cart.",
            duration: 3000,
            close: true,
            gravity: "top",
            // position: "center",
            position: "right",
            style: {
              background: "#f59e0b",
            },
          }).showToast();
        } else {
          cart.push(updatedProduct);
          localStorage.setItem("cart", JSON.stringify(cart));
          Toastify({
            text: "Product added to cart.",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            style: {
              background: "#10b981",
            },
          }).showToast();
        }
      } catch (error) {
        Toastify({
          text: "Sorry, an error occurred while adding your product to the cart. Kindly try again.",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          style: {
            background: "#ef4444",
          },
        }).showToast();
      }
    },
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
