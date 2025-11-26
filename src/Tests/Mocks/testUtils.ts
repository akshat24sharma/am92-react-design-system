/**
 * Test utilities with design system theme applied by default
 * 
 * Usage:
 * ```tsx
 * import { render, screen } from '../../Tests/Mocks/testUtils';
 * 
 * // This automatically includes your design system theme (light mode by default)
 * render(<DsCheckbox />)
 * 
 * // To test with different color schemes
 * render(<DsCheckbox />, { colorScheme: 'dark' })
 * 
 * // To test WITHOUT theme (edge case)
 * renderWithoutTheme(<DsCheckbox />)
 * ```
 */

// Re-export everything from setupTests for convenience
export * from './setupTests';

// Additional utilities specific to design system testing
export { renderWithTheme, testAllThemes } from './themeTestUtils';
