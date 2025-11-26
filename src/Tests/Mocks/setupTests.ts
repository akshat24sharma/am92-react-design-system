/**
 * Setup tests for the application
 * Mock redux store, api requests using msw
 * cleanup after each test
 */
import '@testing-library/jest-dom'
import { cleanup, render as rtlRender } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'
import { ReactElement } from 'react'
import { renderWithTheme } from './themeTestUtils'

// Override the default render function globally to use theme
const customRender = (
  ui: ReactElement,
  options?: { colorScheme?: 'light' | 'dark' | 'highContrast' }
) => {
  const { colorScheme = 'light' } = options || {}
  return renderWithTheme(ui, colorScheme)
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
// Override render with our themed version
export { customRender as render }
// Keep the original render available for edge cases
export { rtlRender as renderWithoutTheme }

// MSW Server for mock api requests
// import { server } from './server'

// Mock window.matchMedia for MUI components that use media queries
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false, // Default to false for all media queries
    media: query || '',
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

beforeAll(() => {
  // server.listen({ onUnhandledRequest: 'error' })
})

afterEach(() => {
  // server.resetHandlers()
  cleanup()
  // Don't restore all mocks to keep essential mocks like matchMedia and ResizeObserver
  // vi.restoreAllMocks()
})
