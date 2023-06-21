import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type UserConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const userConfig: UserConfig = {}

  const commonPlugins = [ 
    vue(), 
    dts({ include: './package' })
  ]

  if (mode === 'lib') {
    userConfig.build = {
      lib: {
        entry: fileURLToPath(new URL('./package/index.ts', import.meta.url)),
        name: 'RothkoJs',
        fileName: 'rothko-js'
      },
      outDir: 'lib',
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
    userConfig.plugins = [ ...commonPlugins ]
  }

  return {
    ...userConfig,
    
    plugins: commonPlugins,
    
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./package', import.meta.url)),
        '~': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
