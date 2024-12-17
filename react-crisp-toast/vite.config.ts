import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.tsx", "index.ts"],
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "ReactCrispToast",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.ts"),
      },
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"), // @src 별칭을 src 폴더에 매핑
    },
  },
  test: {
    setupFiles:["./vitest.setup.ts"],
    globals: true,
    environment: 'jsdom',
    include: ['__tests__/**/*.{ts,tsx}'],  
    coverage: {
      provider: 'istanbul',
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],  
      exclude: ['src/components/CloseIcon.tsx', 'src/utils/sound.ts'], 
      lines: 60,
    },
    alias: {
      '@src': '/src',  
    },
  },
});
