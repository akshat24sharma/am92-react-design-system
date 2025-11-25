/**
 * Global declarations for theme testing utilities
 * These functions are available in all test files without imports
 */
declare global {
  /**
   * Render a component with your actual design system theme
   * @param component - The React component to render
   * @param colorScheme - The color scheme to apply (light, dark, or highContrast)
   * @returns The render result from testing-library
   */
  function renderWithTheme(
    component: React.ReactElement,
    colorScheme?: 'light' | 'dark' | 'highContrast'
  ): import('@testing-library/react').RenderResult;

  /**
   * Test a component across all design system color schemes
   * @param renderComponent - Function that returns a component for each theme
   * @param testCallback - Function to run assertions for each theme
   */
  function testAllThemes(
    renderComponent: (colorScheme: 'light' | 'dark' | 'highContrast') => React.ReactElement,
    testCallback: (container: HTMLElement, colorScheme: string) => void
  ): void;
}

export {};
