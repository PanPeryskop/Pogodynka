import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/',
//   preview: {
//     host: true, // Enable all interfaces
//     port: 30785,
//     https: false
//   },
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets'
//   }
// })
