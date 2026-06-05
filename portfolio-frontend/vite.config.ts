import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // ভার্সেল যেন টাইপস্ক্রিপ্ট এরর ইগনোর করে
  build: {
    chunkSizeWarningLimit: 1600,
  }
});