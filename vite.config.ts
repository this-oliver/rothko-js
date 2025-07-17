import type { UserConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let userConfig: UserConfig = {};

  const commonPlugins = [vue()];

  if (mode === "src") {
    userConfig = {
      build: {
        lib: {
          entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
          name: "RothkoJs",
          fileName: "index"
        },
        outDir: "package",
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
  } else if (mode === "demo") {
    userConfig = {
      root: "./demo",
      build: {
        outDir: "../dist",
        emptyOutDir: true
      },
      resolve: {
        alias: {
          // used for importing files from the src folder in the demo folder
          // important: alias must match alias in tsconfig
          "@lib": fileURLToPath(new URL("./src", import.meta.url))
        }
      }
    };
  }

  return {
    ...userConfig,

    plugins: [...commonPlugins, ...(userConfig.plugins || [])]
  };
});
