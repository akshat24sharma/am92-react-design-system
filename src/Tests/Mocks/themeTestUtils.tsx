/**
 * Theme testing utilities for component tests
 * Provides your actual design system theme to test environment
 * Note: Using ThemeProvider instead of deprecated CssVarsProvider
 */
import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { getTheme } from '../../Theme';
import { DsBox } from '../../Components';

// Create theme instance once for reuse
const theme = getTheme();



/**
 * Render component with your actual design system theme
 * This ensures tests use your real CSS Variables and custom properties
 * @param component - The React component to render
 * @param colorScheme - The color scheme to apply (light, dark, or highContrast)
 * @returns The render result from testing-library
 */
export function renderWithTheme(
  component: React.ReactElement,
  colorScheme: 'light' | 'dark' | 'highContrast' = 'light'
) {
  return render(
    <ThemeProvider theme={theme}>
      <DsBox data-mui-color-scheme={colorScheme}>
        {component}
      </DsBox>
    </ThemeProvider>
  );
}

/**
 * Test a component across all your design system's color schemes
 * @param renderComponent - Function that returns a component for each theme
 * @param testCallback - Function to run assertions for each theme
 */
export function testAllThemes(
  renderComponent: (colorScheme: 'light' | 'dark' | 'highContrast') => React.ReactElement,
  testCallback: (container: HTMLElement, colorScheme: string) => void
) {
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  colorSchemes.forEach(colorScheme => {
    const { container } = renderWithTheme(renderComponent(colorScheme), colorScheme);
    testCallback(container, colorScheme);
  });
}
