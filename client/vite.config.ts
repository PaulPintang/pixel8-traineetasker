import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://traineetasker-server.vercel.app",
      // "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
