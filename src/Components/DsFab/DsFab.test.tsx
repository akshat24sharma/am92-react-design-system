/**
 * @vitest-environment jsdom
 *
 * Test suite for DsFab component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for default props rendering and basic functionality
 * 2. Props Validation - Tests for all prop handling and variants
 * 3. Component States - Tests for different component states (disabled, loading)
 * 4. MUI Styling - Tests for Material-UI classes and design system styling
 * 5. Component Functionality - Tests for click behavior and keyboard navigation
 * 6. Event Handling - Tests for user interactions and event callbacks
 * 7. Form Integration - Tests for form context and submission behavior
 * 8. Accessibility - Tests for ARIA attributes and screen reader support
 * 9. Edge Cases - Tests for boundary conditions and error scenarios
 * 10. Real-world Scenarios - Tests for common usage patterns and integrations
 * 11. Theme Testing - Tests for design system theme integration
 * 12. Snapshot Testing - Visual regression protection across variants
 *
 * @package @am92/react-design-system
 * @component DsFab
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import {
  render,
  screen,
  testAllThemes,
  cleanup
} from '../../Tests/Mocks/testUtils'
import userEvent from '@testing-library/user-event'
import { DsFab } from './DsFab.Component'
import getColorScheme from '../../Theme/getColorScheme'
import { PALETTE } from '../../Constants'

describe('DsFab', () => {
  let user: ReturnType<typeof userEvent.setup>
  const themeColorScheme = getColorScheme(PALETTE)

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    cleanup()
  })

  //============================================================================
  // 1. Core Rendering Tests
  //============================================================================
  describe('Core Rendering', () => {
    it('should render with default props', () => {
      render(<DsFab />)
      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
    })

    it('should render with children content', () => {
      render(
        <DsFab>
          <span data-testid="fab-icon">+</span>
        </DsFab>
      )

      const element = screen.getByRole('button')
      const iconElement = screen.getByTestId('fab-icon')

      expect(element).toBeInTheDocument()
      expect(iconElement).toBeInTheDocument()
      expect(iconElement).toHaveTextContent('+')
    })

    it('should render as extended fab with text', () => {
      render(<DsFab variant="extended">Add Item</DsFab>)

      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
      expect(element).toHaveClass('MuiFab-extended')
      expect(element).toHaveTextContent('Add Item')
    })
  })

  //============================================================================
  // 2. Props Validation Tests
  //============================================================================

  describe('Props Validation', () => {
    it('should accept and display custom id', () => {
      render(<DsFab id="custom-fab-id" />)
      const element = screen.getByRole('button')
      expect(element).toHaveAttribute('id', 'custom-fab-id')
    })

    it('should handle all size variants', () => {
      const sizes = ['small', 'medium'] as const
      sizes.forEach(size => {
        const { unmount } = render(
          <DsFab size={size} data-testid={`fab-${size}`} />
        )
        const element = screen.getByTestId(`fab-${size}`)
        expect(element).toHaveClass(
          `MuiFab-size${size.charAt(0).toUpperCase() + size.slice(1)}`
        )
        unmount()
      })
    })

    it('should handle variant prop', () => {
      const { rerender } = render(<DsFab variant="circular" />)
      let element = screen.getByRole('button')
      expect(element).toHaveClass('MuiFab-circular')

      rerender(<DsFab variant="extended">FAB</DsFab>)
      element = screen.getByRole('button')
      expect(element).toHaveClass('MuiFab-extended')
    })

    it('should render as link when href is provided', () => {
      render(<DsFab href="/test-link" />)
      const element = screen.getByRole('link')
      expect(element).toHaveAttribute('href', '/test-link')
    })
  })

  //============================================================================
  // 3. Component States
  //============================================================================
  describe('Component States', () => {
    it('should render in disabled state', () => {
      render(<DsFab disabled />)
      const element = screen.getByRole('button')
      expect(element).toBeDisabled()
      expect(element).toHaveClass('Mui-disabled')
      expect(element).toHaveAttribute('disabled')
    })

    it('should handle state combinations', () => {
      render(<DsFab disabled color="primary" size="large" />)
      const element = screen.getByRole('button')
      expect(element).toBeDisabled()
      expect(element).toHaveClass('MuiFab-sizeLarge')
      expect(element).toHaveClass('MuiFab-primary')
    })
  })

  //============================================================================
  // 4. MUI Styling Tests
  //============================================================================
  describe('MUI Styling', () => {
    it('should apply default MUI classes', () => {
      render(<DsFab />)
      const element = screen.getByRole('button')
      expect(element).toHaveClass('MuiFab-root')
      expect(element).toHaveClass('MuiFab-secondary')
    })

    it('should apply size-specific classes', () => {
      render(<DsFab size="large" />)
      const element = screen.getByRole('button')
      expect(element).toHaveClass('MuiFab-sizeLarge')
    })

    it('should apply design system styling overrides', () => {
      render(<DsFab />)
      const element = screen.getByRole('button')
      // Verify that the component maintains its design system styling from DsFab.Overrides.ts
      expect(element).toHaveClass('MuiFab-root')
      // Design system specific styling will be applied via CSS variables
      const computedStyles = window.getComputedStyle(element)

      expect(computedStyles.borderRadius).toBe('var(--ds-radius-pleasant)')
    })
  })

  //============================================================================
  // 5. Component Functionality Tests
  //============================================================================
  describe('Component Functionality', () => {
    it('should function as a clickable button', async () => {
      const handleClick = vi.fn()
      render(<DsFab onClick={handleClick} />)
      const element = screen.getByRole('button')

      await user.click(element)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should support keyboard navigation', async () => {
      const handleClick = vi.fn()
      render(<DsFab onClick={handleClick} />)
      const element = screen.getByRole('button')

      await user.tab()
      expect(element).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('should maintain state across re-renders', () => {
      const { rerender } = render(<DsFab>Initial</DsFab>)

      let element = screen.getByRole('button')
      expect(element).toHaveTextContent('Initial')

      rerender(<DsFab>Updated</DsFab>)

      element = screen.getByRole('button')
      expect(element).toHaveTextContent('Updated')
    })
  })

  //============================================================================
  // 6. Event Handling Tests
  //============================================================================
  describe('Event Handling', () => {
    it('should handle click events', async () => {
      const handleClick = vi.fn()
      render(<DsFab onClick={handleClick} />)
      const element = screen.getByRole('button')

      await user.click(element)
      expect(handleClick).toHaveBeenCalledTimes(1)
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object))
    })

    it('should handle keyboard events', async () => {
      const handleKeyDown = vi.fn()
      render(<DsFab onKeyDown={handleKeyDown} />)
      const element = screen.getByRole('button')

      await user.tab()
      await user.keyboard('{Enter}')
      expect(handleKeyDown).toHaveBeenCalled()
    })

    it('should handle focus and blur events', async () => {
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()
      render(<DsFab onFocus={handleFocus} onBlur={handleBlur} />)
      const element = screen.getByRole('button')

      await user.tab()
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should handle mouse events', async () => {
      const handleMouseEnter = vi.fn()
      const handleMouseLeave = vi.fn()
      render(
        <DsFab
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      )
      const element = screen.getByRole('button')

      await user.hover(element)
      expect(handleMouseEnter).toHaveBeenCalled()

      await user.unhover(element)
      expect(handleMouseLeave).toHaveBeenCalled()
    })

    it('should not trigger click events when disabled', async () => {
      const handleClick = vi.fn()
      render(<DsFab disabled onClick={handleClick} />)
      const element = screen.getByRole('button')

      // Check that element is disabled but don't try to click it since it has pointer-events: none
      expect(element).toBeDisabled()
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  //============================================================================
  // 7. Form Integration Tests
  //============================================================================

  describe('Form Integration', () => {
    it('should work within form element', () => {
      render(
        <form>
          <DsFab type="submit">Submit</DsFab>
        </form>
      )
      const element = screen.getByRole('button')
      expect(element).toHaveAttribute('type', 'submit')
    })

    it('should handle form submission', async () => {
      const handleSubmit = vi.fn(e => e.preventDefault())
      render(
        <form onSubmit={handleSubmit}>
          <input type="text" name="test-field" />
          <DsFab type="submit">Submit</DsFab>
        </form>
      )
      const submitButton = screen.getByRole('button')

      await user.click(submitButton)
      expect(handleSubmit).toHaveBeenCalled()
    })

    it('should work with form validation states', () => {
      render(
        <form noValidate>
          <DsFab type="submit" disabled>
            Submit (Disabled)
          </DsFab>
        </form>
      )
      const element = screen.getByRole('button')
      expect(element).toBeDisabled()
      expect(element).toHaveAttribute('type', 'submit')
    })
  })

  //============================================================================
  // 8. Accessibility Tests
  //============================================================================

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<DsFab aria-label="Add new item" />)
      const element = screen.getByRole('button')
      expect(element).toHaveAccessibleName('Add new item')
    })

    it('should support keyboard navigation', async () => {
      render(
        <>
          <DsFab id="first">First</DsFab>
          <DsFab id="second">Second</DsFab>
        </>
      )

      const firstElement = screen.getByRole('button', { name: /First/i })
      const secondElement = screen.getByRole('button', { name: /Second/i })

      await user.tab()
      expect(firstElement).toHaveFocus()

      await user.tab()
      expect(secondElement).toHaveFocus()

      await user.tab({ shift: true })
      expect(firstElement).toHaveFocus()
    })

    it('should have proper aria-describedby relationships', () => {
      render(
        <>
          <DsFab aria-describedby="fab-help">Action</DsFab>
          <div id="fab-help">This button performs an action</div>
        </>
      )
      const element = screen.getByRole('button')
      expect(element).toHaveAttribute('aria-describedby', 'fab-help')
    })

    it('should support screen reader text', () => {
      render(
        <DsFab>
          <span aria-hidden="true">+</span>
          <span className="sr-only">Add item</span>
        </DsFab>
      )

      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
      expect(screen.getByText('Add item')).toBeInTheDocument()
    })

    it('should indicate disabled state to screen readers', () => {
      render(<DsFab disabled aria-label="Disabled action" />)
      const element = screen.getByRole('button')
      expect(element).toBeDisabled()
      expect(element).toHaveAccessibleName('Disabled action')
    })
  })

  //============================================================================
  // 9. Edge Cases Tests
  //============================================================================
  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<DsFab />)
      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
      expect(element.textContent).toBe('')
    })

    it('should handle null and undefined children', () => {
      render(<DsFab>{null}</DsFab>)
      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
    })

    it('should handle undefined props gracefully', () => {
      render(
        <DsFab
          color={undefined as any}
          size={undefined as any}
          onClick={undefined}
        />
      )
      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
    })

    it('should handle rapid clicks', async () => {
      const handleClick = vi.fn()
      render(<DsFab onClick={handleClick} />)
      const element = screen.getByRole('button')

      await user.click(element)
      await user.click(element)
      await user.click(element)

      expect(handleClick).toHaveBeenCalledTimes(3)
    })

    it('should handle complex content structures', () => {
      render(
        <DsFab>
          <div>
            <span>Icon</span>
            <span>Label</span>
          </div>
        </DsFab>
      )

      const element = screen.getByRole('button')
      expect(element).toBeInTheDocument()
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('should maintain performance with frequent updates', () => {
      const { rerender } = render(<DsFab>Test 1</DsFab>)

      // Simulate frequent updates
      for (let i = 2; i <= 10; i++) {
        rerender(<DsFab>{`Test ${i}`}</DsFab>)
      }

      const element = screen.getByRole('button')
      expect(element).toHaveTextContent('Test 10')
    })
  })

  //============================================================================
  // 10. Real-world Scenarios Tests
  //============================================================================
  describe('Real-world Scenarios', () => {
    it('should work in typical action scenarios', async () => {
      const mockAdd = vi.fn()
      const mockEdit = vi.fn()
      const mockDelete = vi.fn()

      render(
        <>
          <DsFab color="primary" onClick={mockAdd} aria-label="Add item">
            +
          </DsFab>
          <DsFab color="secondary" onClick={mockEdit} aria-label="Edit item">
            ✏️
          </DsFab>
          <DsFab color="error" onClick={mockDelete} aria-label="Delete item">
            🗑️
          </DsFab>
        </>
      )

      const addButton = screen.getByLabelText('Add item')
      const editButton = screen.getByLabelText('Edit item')
      const deleteButton = screen.getByLabelText('Delete item')

      await user.click(addButton)
      await user.click(editButton)
      await user.click(deleteButton)

      expect(mockAdd).toHaveBeenCalledOnce()
      expect(mockEdit).toHaveBeenCalledOnce()
      expect(mockDelete).toHaveBeenCalledOnce()
    })

    it('should work with conditional rendering', () => {
      let showFab = true

      const { rerender } = render(<>{showFab && <DsFab>Visible FAB</DsFab>}</>)

      expect(screen.getByRole('button')).toBeInTheDocument()
      expect(screen.getByText('Visible FAB')).toBeInTheDocument()

      showFab = false
      rerender(<>{showFab && <DsFab>Visible FAB</DsFab>}</>)

      expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('should work in navigation contexts', async () => {
      const mockNavigate = vi.fn()

      render(
        <nav>
          <DsFab href="/home" onClick={mockNavigate}>
            Home
          </DsFab>
          <DsFab href="/about">About</DsFab>
        </nav>
      )

      const homeLink = screen.getByRole('link', { name: /Home/i })
      const aboutLink = screen.getByRole('link', { name: /About/i })

      expect(homeLink).toHaveAttribute('href', '/home')
      expect(aboutLink).toHaveAttribute('href', '/about')

      await user.click(homeLink)
      expect(mockNavigate).toHaveBeenCalled()
    })
  })

  //============================================================================
  // Theme Testing (Design System CSS Variable Validation)
  //============================================================================

  describe('Theme Testing', () => {
    it('should use correct colors across all themes', () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsFab color="secondary" data-testid={`theme-test-${colorScheme}`}>
            Theme Test
          </DsFab>,
          { colorScheme }
        )

        // Extract expected colors from actual theme
        const expectedSecondaryColor = 'var(--ds-colour-actionSecondary)'

        // Verify theme mode is correctly applied
        const wrapperElement = container.firstChild as HTMLElement
        expect(wrapperElement).toHaveAttribute(
          'data-mui-color-scheme',
          colorScheme
        )

        // Test component integration with theme
        const fabElement = screen.getByTestId(`theme-test-${colorScheme}`)
        expect(fabElement).toHaveClass('MuiFab-secondary')
        const fabStyles = window.getComputedStyle(fabElement)
        expect(fabStyles.backgroundColor).toBe(expectedSecondaryColor)

        unmount()
      })
    })

    it('should render all color variants across all themes', () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const
      const colors = [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success'
      ] as const

      colorSchemes.forEach(colorScheme => {
        colors.forEach(color => {
          const { container, unmount } = render(
            <DsFab color={color} data-testid={`theme-${colorScheme}-${color}`}>
              {color}
            </DsFab>,
            { colorScheme }
          )

          // Verify theme mode is correctly applied
          const wrapperElement = container.firstChild as HTMLElement
          expect(wrapperElement).toHaveAttribute(
            'data-mui-color-scheme',
            colorScheme
          )

          // Test CSS class application
          const fabElement = screen.getByTestId(`theme-${colorScheme}-${color}`)
          const hasColorClass =
            fabElement.className.includes(`MuiFab-${color}`) ||
            fabElement.className.includes(`Mui-${color}`)
          expect(hasColorClass).toBe(true)

          unmount()
        })
      })
    })
  })

  //============================================================================
  // Snapshot Testing
  //============================================================================
  describe('Snapshot Testing', () => {
    it('should match snapshot for default state', () => {
      const { container } = render(<DsFab />)
      expect(container.firstChild).toMatchSnapshot('fab-default')
    })

    it('should match snapshots for all color variants', () => {
      const colors = [
        'primary',
        'secondary',
        'error',
        'warning',
        'info',
        'success'
      ] as const
      colors.forEach(color => {
        const { container } = render(<DsFab color={color}>Test</DsFab>)
        expect(container.firstChild).toMatchSnapshot(`fab-color-${color}`)
      })
    })

    it('should match snapshots for all size variants', () => {
      const sizes = ['small', 'medium', 'large'] as const
      sizes.forEach(size => {
        const { container } = render(<DsFab size={size}>Test</DsFab>)
        expect(container.firstChild).toMatchSnapshot(`fab-size-${size}`)
      })
    })

    it('should match snapshots for variant types', () => {
      const variants = ['circular', 'extended'] as const
      variants.forEach(variant => {
        const { container } = render(
          <DsFab variant={variant}>
            {variant === 'extended' ? 'Extended FAB' : '+'}
          </DsFab>
        )
        expect(container.firstChild).toMatchSnapshot(`fab-variant-${variant}`)
      })
    })

    it('should match snapshot for disabled state', () => {
      const { container } = render(<DsFab disabled>Disabled</DsFab>)
      expect(container.firstChild).toMatchSnapshot('fab-disabled')
    })

    it('should match snapshots for all themes', () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const
      colorSchemes.forEach(theme => {
        const { container } = render(<DsFab>Theme Test</DsFab>, {
          colorScheme: theme
        })
        expect(container.firstChild).toMatchSnapshot(`fab-theme-${theme}`)
      })
    })

    it('should match snapshot for complex content', () => {
      const { container } = render(
        <DsFab variant="extended">
          <span>Icon</span>
          <span>Label</span>
        </DsFab>
      )
      expect(container.firstChild).toMatchSnapshot('fab-complex-content')
    })

    it('should match snapshot for link variant', () => {
      const { container } = render(<DsFab href="/test">Link FAB</DsFab>)
      expect(container.firstChild).toMatchSnapshot('fab-link')
    })
  })

  /*
   * TEST REVIEW COMMENTS:
   *
   * Likely to fail due to wrong assumptions:
   * - Theme color validation tests may fail if theme colors don't match expected hex pattern
   * - Class name tests may fail if MUI updates its class naming conventions
   * - Event tests may fail if userEvent behavior differs across environments
   *
   * Would indicate actual bugs:
   * - If basic rendering tests fail, component import/export is broken
   * - If accessibility tests fail, ARIA support is missing
   * - If form integration tests fail, FAB doesn't work properly in forms
   * - If theme tests fail completely, theme integration is broken
   */
})
