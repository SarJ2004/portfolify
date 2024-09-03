import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/gfgapi": {
        target: "https://geeks-for-geeks-api.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gfgapi/, ""),
      },
    },
  },
});
