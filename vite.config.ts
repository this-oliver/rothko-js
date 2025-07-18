import type { UserConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const userConfig: UserConfig = {
    build: {
      lib: {
        entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
        name: "RothkoJs",
        fileName: "index"
      },
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      }
    },

    plugins: [
      // add type declaration
      dts({ include: "./src" })
    ]
  };

  const commonPlugins = [vue()];

  return {
    ...userConfig,
    plugins: [...commonPlugins, ...(userConfig.plugins || [])]
  };
});
