import type { UserConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let userConfig: UserConfig = {};

  const commonPlugins = [vue()];

  if (mode === "lib") {
    userConfig = {
      build: {
        lib: {
          entry: fileURLToPath(new URL("./lib/index.ts", import.meta.url)),
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
        dts({ include: "./lib" })
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
          // used for importing files from the lib folder in the demo folder
          // important: alias must match alias in tsconfig
          "@lib": fileURLToPath(new URL("./lib", import.meta.url))
        }
      }
    };
  }

  return {
    ...userConfig,

    plugins: [...commonPlugins, ...(userConfig.plugins || [])]
  };
});
