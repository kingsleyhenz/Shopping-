/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{vue,js,ts}",
      "./layouts/**/*.{vue,js,ts}",
      "./pages/**/*.{vue,js,ts}",
      "./composables/**/*.{js,ts}",
      "./plugins/**/*.{js,ts}",
      "./App.{js,ts,vue}",
      "./app.{js,ts,vue}",
    ],
    theme: {
      extend: {
        backgroundImage: {
          "hero-image": "./assets/images/hero.jpg"
        }
      },
    },
    plugins: [],
  };
  