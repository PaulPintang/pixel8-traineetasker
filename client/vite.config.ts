import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://traineetasker.up.railway.app",
      },
      "/socket.io": {
        target: "wss://traineetasker.up.railway.app",
      },
    },
  },
  plugins: [react()],
});
