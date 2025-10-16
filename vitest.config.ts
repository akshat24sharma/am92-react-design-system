import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        resources: 'usable'
      }
    },
    pool: 'forks',
    setupFiles: ['./src/Mocks/setupTests.ts'],
    // server: {
    //   deps: {
    //     inline: ['@am92/react-design-system']
    //   }
    // },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['lib', 'node_modules'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/test/**/*',
        'src/vite-env.d.ts'
      ]
    }
  },
  resolve: {
    alias: {
      '~/src': '/src'
    }
  }
})
