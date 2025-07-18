import type { UserConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(() => {
  const userConfig: UserConfig = {
    root: ".",
    base: "./", // Make asset paths relative for file:// usage
    build: {
      outDir: "dist",
      emptyOutDir: true
    },
    resolve: {
      alias: {
      // used for importing files from the src folder in the demo folder
      // important: alias must match alias in tsconfig
        "@src": fileURLToPath(new URL("../src", import.meta.url))
      }
    }
  };

  const commonPlugins = [vue()];

  return {
    ...userConfig,
    plugins: [...commonPlugins, ...(userConfig.plugins || [])]
  };
});
