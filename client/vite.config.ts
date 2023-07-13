import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      // "/api": "http://localhost:5000",
      "/api": "https://traineetasker-server.vercel.app",
    },
  },
  plugins: [react()],
});
