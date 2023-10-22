import vuePlugin from "@vitejs/plugin-vue";

const { defineConfig } = require("vite");

export default defineConfig({
    plugins: [vuePlugin()],
    build: {
        manifest: true,
        outDir: 'public/assets',
        rollupOptions: {
            input: 'assets/js/main.js',
            output: {
                entryFileNames: 'js/[name]-[hash].js'
            }
        }
    }
});