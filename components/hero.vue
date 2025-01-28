<template>
    <div class="w-full h-[350px] flex gap-10 justify-center flex-col items-center bg-gray-800 text-white relative">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Shopping Spree</h1>
        <p class="text-sm sm:text-base md:text-lg">ChigiSoft Task Done By Kingsley Henshaw</p>
        <button @click="toggleCart"
            class="w-40 h-[50px] bg-gray-900 text-white rounded-md flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path
                    d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
            </svg>
        </button>
        <div v-if="isCartOpen" @click="toggleCart" class="fixed inset-0 bg-black/50 z-10"></div>

        <div class="fixed top-0 right-0 h-full w-[400px] bg-white transform transition-transform z-20 pl-8 sm:pl-5 md:pl-4 sm:w-[400px]"
            :class="{ 'translate-x-0': isCartOpen, 'translate-x-full': !isCartOpen }">
            <div class="p-4 flex justify-between items-center border-b">
                <h2 class="text-lg font-bold text-black">My Cart</h2>
                <button @click="toggleCart" class="text-gray-500 hover:text-gray-800 transition duration-200">
                    ✕
                </button>
            </div>
            <div class="p-4 overflow-y-scroll overflow-x-hidden max-h-[calc(100vh-150px)] ">
                <div v-if="cartItems.length > 0">
                    <div v-for="item in cartItems" :key="item.id"
                        class="flex justify-between items-center border-b py-2 text-black mb-4 p-4 border-gray-300 rounded-lg">
                        <div class="w-1/4 mr-4">
                            <img :src="item.image" alt="" class="h-24 w-full object-contain" />
                        </div>
                        <div class="flex-1">
                            <p class="font-bold text-sm">{{ item.title }}</p>
                            <p class="text-xs text-gray-500">{{ item.category }}</p>
                            <p class="mt-2 font-semibold text-gray-800">${{ item.price.toFixed(2) }}</p>
                        </div>
                    </div>
                </div>
                <p v-else class="text-gray-500">Your cart is empty!</p>
            </div>
            <div class="ml-3 mt-2.5">
                <p class="font-bold text-black">
                    Total: ${{ cartTotal.toFixed(2) }}
                </p>
            </div>
            <button @click="checkout" class="w-40 bg-green-500 text-white py-2 mt-2 ml-3 rounded cursor-pointer"
                :disabled="isCheckingOut">
                {{ isCheckingOut ? "Checking Out..." : "Checkout" }}
            </button>
        </div>
    </div>
</template>

<script>
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default {
    data() {
        return {
            cartItems: [],
            isCartOpen: false,
            isCheckingOut: false,
        };
    },
    computed: {
        cartTotal() {
            return this.cartItems.reduce((total, item) => total + item.price, 0);
        },
    },
    methods: {
        toggleCart() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length > 0) {
                this.cartItems = cart;
            }
            this.isCartOpen = !this.isCartOpen;
        },
        checkout() {
            this.isCheckingOut = true;
            setTimeout(() => {
                localStorage.removeItem("cart");
                this.cartItems = [];
                this.isCheckingOut = false;
                Toastify({
                    text: "Checkout complete!",
                    duration: 3000,
                    close: true,
                    backgroundColor: "blue",
                }).showToast();
            }, 3000);
        },
    },
};
</script>