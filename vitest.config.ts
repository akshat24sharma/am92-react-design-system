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
    setupFiles: ['./src/Tests/Mocks/setupTests.ts'],
    // server: {
    //   deps: {
    //     inline: ['@am92/react-design-system']
    //   }
    // },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['lib', 'node_modules'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.{test,spec}.{js,jsx,ts,tsx}',
        'src/**/__tests__/**/*',
        'src/Tests/**/*',
        'src/**/types.ts',
        'src/**/index.ts', 
        'src/vite-env.d.ts',
        'src/**/*.stories.{js,jsx,ts,tsx}',
        'src/**/*.d.ts'
      ],
      // Coverage thresholds - DISABLED during test development phase
      // TODO: Re-enable once test suite is complete
      // thresholds: {
      //   global: {
      //     branches: 80,
      //     functions: 80,
      //     lines: 80,
      //     statements: 80
      //   },
      //   // Per-file thresholds for components
      //   'src/Components/**/!(*.test|*.spec).{js,jsx,ts,tsx}': {
      //     branches: 90,
      //     functions: 90,
      //     lines: 90,
      //     statements: 90
      //   }
      // },
      // Fail if coverage is below thresholds
      skipFull: false,
      all: true
    }
  },
  resolve: {
    alias: {
      '~/src': '/src'
    }
  }
})
