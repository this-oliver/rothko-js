import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const userConfig: UserConfig = {}

  const commonPlugins = [ 
    vue(),
  ]

  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: fileURLToPath(new URL('./lib/index.ts', import.meta.url)),
        name: 'RothkoJs',
        fileName: 'index'
      },
      outDir: 'package',
      emptyOutDir: true,
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        external: [ 'vue' ],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }

    // add type declaration
    commonPlugins.push(
      dts({ include: './lib' })
    )
  }

  return {
    ...userConfig,
    
    plugins: commonPlugins,
  }
})
