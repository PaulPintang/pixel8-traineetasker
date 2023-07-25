import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        // target: "https://traineetasker.up.railway.app",
        target: "http://localhost:5000",
      },
      "/socket.io": {
        target: "ws://localhost:5000",
        // target: "wss://traineetasker.up.railway.app",
      },
    },
  },
  plugins: [react()],
});
