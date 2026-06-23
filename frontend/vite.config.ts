import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true, //split routes and downloads them laizily
    }),
    react(),
    tailwindcss(),
  ], //vite works with frameworks through plugins
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // affects the app during dev.
  // server: {
  //   port: 3000, //changes the port
  //   proxy: {
  //     "/api": {
  //       target: process.env.VITE_API_URL,
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  // },
});
