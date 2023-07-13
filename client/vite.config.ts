import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://traineetasker-server.vercel.app",
        changeOrigin: true,
      },
    },
    cors: {
      credentials: true,
    },
  },
  plugins: [react()],
});
