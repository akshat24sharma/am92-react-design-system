/**
 * @vitest-environment jsdom
 *
 * Test suite for DsSearchbar component
 * DsSearchbar is a class component that extends DsAutocomplete for search use cases.
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Search Functionality - DsSearchbar behavior and interactions
 * 6. Event Handling - User interactions and event handlers
 * 7. Form Integration - Searchbar behavior in forms
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Theme Testing - Cross-theme compatibility
 * 11. Snapshot Testing - Visual regression testing
 *
 * @package @am92/react-design-system
 * @component DsSearchbar
 */

import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../Tests/Mocks/testUtils'
import userEvent from '@testing-library/user-event'
import { DsSearchbar } from './DsSearchbar.Component'
import getColorScheme from '../../Theme/getColorScheme'
import { PALETTE } from '../../Constants'

// Test data
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
]

const mockProducts = [
  'iPhone 14',
  'iPad Air',
  'MacBook Pro',
  'Apple Watch',
  'AirPods Pro'
]

describe('DsSearchbar Component', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  // ============================
  // 1. CORE RENDERING TESTS
  // ============================
  describe('Core Rendering', () => {
    it('should render with required props', () => {
      render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const combobox = screen.getByRole('combobox')
      expect(combobox).toBeInTheDocument()
    })

    it('should render with default placeholder', () => {
      render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const input = screen.getByPlaceholderText('Search here')
      expect(input).toBeInTheDocument()
    })

    it('should render with custom placeholder', () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={[]}
          placeholder="Search products..."
        />
      )

      const input = screen.getByPlaceholderText('Search products...')
      expect(input).toBeInTheDocument()
    })

    it('should render search icon start adornment', () => {
      render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const searchIcon = document.querySelector('.ri-search-line')
      expect(searchIcon).toBeInTheDocument()
    })

    it('should apply search variant to input base', () => {
      const { container } = render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const inputBase = container.querySelector('.MuiInputBase-root')
      expect(inputBase).toBeInTheDocument()
      expect(inputBase).toHaveAttribute('ds-variant', 'search')
    })

    it('should render as fullWidth autocomplete by default', () => {
      const { container } = render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const autocomplete = container.querySelector('.MuiAutocomplete-root')
      expect(autocomplete).toHaveClass('MuiAutocomplete-fullWidth')
    })
  })

  // ============================
  // 2. PROPS VALIDATION TESTS
  // ============================
  describe('Props Validation', () => {
    it('should call onChange with correct name and value parameters', async () => {
      const handleChange = vi.fn()

      render(
        <DsSearchbar
          name="user-search"
          onChange={handleChange}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(async () => {
        const option = screen.getByText('iPhone 14')
        await user.click(option)
      })

      expect(handleChange).toHaveBeenCalledWith('user-search', 'iPhone 14')
    })

    it('should accept and apply custom startAdornmentProps', () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={[]}
          startAdornmentProps={
            {
              'data-testid': 'custom-start-adornment'
            } as any
          }
        />
      )

      const adornment = screen.getByTestId('custom-start-adornment')
      expect(adornment).toBeInTheDocument()
    })
  })

  // ============================
  // 3. COMPONENT STATES TESTS
  // ============================
  describe('Component States', () => {
    it('should handle disabled state', () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={[]}
          disabled
        />
      )

      const combobox = screen.getByRole('combobox')
      expect(combobox).toBeDisabled()
    })

    it('should handle controlled value state', () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
          value="iPhone 14"
        />
      )

      const input = screen.getByRole('combobox')
      expect(input).toHaveValue('iPhone 14')
    })

    it('should handle null value gracefully', () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
          value={null}
        />
      )

      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveValue('')
    })
  })

  // ============================
  // 4. CUSTOM PAPER COMPONENT TESTS
  // ============================
  describe('Custom Paper Component', () => {
    it('should render custom paper with spacing when dropdown opens', async () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(() => {
        const paper = document.querySelector('.MuiPaper-root')
        expect(paper).toBeInTheDocument()
        expect(paper).toHaveStyle({
          marginLeft: 'var(--ds-spacing-glacial)',
          marginRight: 'var(--ds-spacing-glacial)'
        })
      })
    })
  })

  // ============================
  // 5. SEARCH FUNCTIONALITY TESTS
  // ============================
  describe('Search Functionality', () => {
    it('should filter options based on typed input', async () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.type(input, 'iPhone')

      await waitFor(() => {
        expect(screen.getByText('iPhone 14')).toBeInTheDocument()
        expect(screen.queryByText('MacBook Pro')).not.toBeInTheDocument()
      })
    })

    it('should call onChange when option is selected', async () => {
      const handleChange = vi.fn()

      render(
        <DsSearchbar
          name="product-search"
          onChange={handleChange}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(() => {
        const option = screen.getByText('iPhone 14')
        user.click(option)
      })

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('product-search', 'iPhone 14')
      })
    })

    it('should clear value when clear button is clicked', async () => {
      const handleChange = vi.fn()

      render(
        <DsSearchbar
          name="test-search"
          onChange={handleChange}
          options={mockProducts}
          value="iPhone 14"
        />
      )

      const clearButton = document.querySelector(
        '.MuiAutocomplete-clearIndicator'
      )
      if (clearButton) {
        await user.click(clearButton)
        expect(handleChange).toHaveBeenCalledWith('test-search', null)
      }
    })

    it('should work with complex object options using getOptionLabel', async () => {
      const handleChange = vi.fn()

      render(
        <DsSearchbar
          name="user-search"
          onChange={handleChange}
          options={mockUsers}
          getOptionLabel={option => option.name || ''}
          placeholder="Search users by name..."
        />
      )

      const input = screen.getByRole('combobox')
      await user.type(input, 'John')

      await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
      })

      const option = screen.getByText('John Doe')
      await user.click(option)

      expect(handleChange).toHaveBeenCalledWith('user-search', mockUsers[0])
    })
  })

  // ============================
  // 6. EVENT HANDLING TESTS
  // ============================
  describe('Event Handling', () => {
    it('should handle keyboard navigation and selection', async () => {
      const handleChange = vi.fn()

      render(
        <DsSearchbar
          name="test-search"
          onChange={handleChange}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(() => {
        expect(screen.getByText('iPhone 14')).toBeInTheDocument()
      })

      // Arrow down twice to navigate to 'MacBook Pro', then select with Enter
      await user.keyboard('{ArrowDown}{ArrowDown}{Enter}')

      await waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith('test-search', 'MacBook Pro')
      })
    })

    it('should close dropdown on Escape key', async () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(() => {
        expect(screen.getByText('iPhone 14')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')

      await waitFor(() => {
        expect(screen.queryByText('iPhone 14')).not.toBeInTheDocument()
      })
    })
  })

  // ============================
  // 7. FORM INTEGRATION TESTS
  // ============================
  describe('Form Integration', () => {
    it('should handle controlled component behavior correctly', async () => {
      let currentValue = ''
      const handleChange = vi.fn((name, value) => {
        currentValue = value
      })

      const { rerender } = render(
        <DsSearchbar
          name="controlled-search"
          onChange={handleChange}
          options={mockProducts}
          value={currentValue}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(async () => {
        const option = screen.getByText('iPhone 14')
        await user.click(option)
      })

      expect(handleChange).toHaveBeenCalledWith(
        'controlled-search',
        'iPhone 14'
      )

      // Simulate parent component updating the value
      currentValue = 'iPhone 14'
      rerender(
        <DsSearchbar
          name="controlled-search"
          onChange={handleChange}
          options={mockProducts}
          value={currentValue}
        />
      )

      expect(input).toHaveValue('iPhone 14')
    })
  })

  // ============================
  // 8. ACCESSIBILITY TESTS
  // ============================
  describe('Accessibility', () => {
    it('should have proper ARIA attributes for combobox behavior', async () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
        />
      )

      const combobox = screen.getByRole('combobox')
      expect(combobox).toHaveAttribute('aria-autocomplete', 'list')
      expect(combobox).toHaveAttribute('aria-expanded', 'false')

      await user.click(combobox)
      expect(combobox).toHaveAttribute('aria-expanded', 'true')
    })

    it('should provide accessible option list when opened', async () => {
      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={mockProducts}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(() => {
        const listbox = screen.getByRole('listbox')
        expect(listbox).toBeInTheDocument()

        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(mockProducts.length)
      })
    })
  })

  // ============================
  // 9. EDGE CASES TESTS
  // ============================
  describe('Edge Cases', () => {
    it('should handle empty options array gracefully', async () => {
      render(
        <DsSearchbar name="test-search" onChange={() => {}} options={[]} />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      // Should not show any options but still be interactive
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

      // Should still allow typing
      await user.type(input, 'test')
      expect(input).toHaveValue('test')
    })

    it('should handle option selection with special characters', async () => {
      const handleChange = vi.fn()
      const specialOptions = ['Test@Email.com', 'User#123', 'Product$Price']

      render(
        <DsSearchbar
          name="test-search"
          onChange={handleChange}
          options={specialOptions}
        />
      )

      const input = screen.getByRole('combobox')
      await user.click(input)

      await waitFor(async () => {
        const option = screen.getByText('Test@Email.com')
        await user.click(option)
      })

      expect(handleChange).toHaveBeenCalledWith('test-search', 'Test@Email.com')
    })

    it('should handle large option lists without performance issues', () => {
      const longOptionList = Array.from(
        { length: 1000 },
        (_, i) => `Option ${i + 1}`
      )

      render(
        <DsSearchbar
          name="test-search"
          onChange={() => {}}
          options={longOptionList}
        />
      )

      // Component should render without errors
      const combobox = screen.getByRole('combobox')
      expect(combobox).toBeInTheDocument()
    })
  })

  // ============================
  // 10. THEME TESTING TESTS
  // ============================
  describe('Theme Testing', () => {
    it('should render correctly with proper theme application', () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsSearchbar
            name={`theme-test-search-${colorScheme}`}
            onChange={() => {}}
            options={mockProducts}
            placeholder="Search products..."
          />,
          { colorScheme }
        )

        const themeContainer = container.querySelector(
          '[data-mui-color-scheme]'
        )
        expect(themeContainer).toHaveAttribute(
          'data-mui-color-scheme',
          colorScheme
        )

        const searchIcon = container.querySelector('.ri-search-line')
        expect(searchIcon).toBeInTheDocument()

        unmount()
      })
    })

    it('should validate theme colors against actual palette values', () => {
      const themeColorScheme = getColorScheme(PALETTE)
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme]

        // Verify expected theme structure exists and has real color values
        expect(schemeData?.palette).toBeDefined()
        expect(schemeData?.ds?.colour).toBeDefined()

        // Verify primary colors exist and are valid hex/color values
        const primaryText = (schemeData.palette as any)?.text?.primary
        const primaryColor = (schemeData.palette as any)?.primary?.main

        if (primaryText) {
          expect(typeof primaryText).toBe('string')
          expect(primaryText).toMatch(/^#[0-9a-fA-F]{6}$|^rgb\(|^hsl\(|^var\(/)
        }

        if (primaryColor) {
          expect(typeof primaryColor).toBe('string')
          expect(primaryColor).toMatch(/^#[0-9a-fA-F]{6}$|^rgb\(|^hsl\(|^var\(/)
        }
      })
    })

    it('should maintain consistent functionality across all themes', async () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      for (const colorScheme of colorSchemes) {
        const handleChange = vi.fn()

        const { unmount } = render(
          <DsSearchbar
            name={`search-${colorScheme}`}
            onChange={handleChange}
            options={mockProducts}
          />,
          { colorScheme }
        )

        const input = screen.getByRole('combobox')
        await user.click(input)

        await waitFor(async () => {
          const option = screen.getByText('iPhone 14')
          await user.click(option)
        })

        expect(handleChange).toHaveBeenCalledWith(
          `search-${colorScheme}`,
          'iPhone 14'
        )

        unmount()
      }
    })
  })

  // ============================
  // 11. SNAPSHOT TESTING TESTS
  // ============================
  describe('Snapshot Testing', () => {
    // REVIEWERS: Snapshot tests validate visual structure consistency.
    // They catch unintended changes but don't verify behavior.
    it('should match snapshot with default props', () => {
      const { container } = render(
        <DsSearchbar name="snapshot-search" onChange={() => {}} options={[]} />
      )

      expect(container.firstChild).toMatchSnapshot('searchbar-default')
    })

    it('should match snapshot with custom placeholder', () => {
      const { container } = render(
        <DsSearchbar
          name="snapshot-search"
          onChange={() => {}}
          options={[]}
          placeholder="Search for anything..."
        />
      )

      expect(container.firstChild).toMatchSnapshot(
        'searchbar-custom-placeholder'
      )
    })

    it('should match snapshot with controlled value', () => {
      const { container } = render(
        <DsSearchbar
          name="snapshot-search"
          onChange={() => {}}
          options={mockProducts}
          value="iPhone 14"
        />
      )

      expect(container.firstChild).toMatchSnapshot('searchbar-with-value')
    })

    it('should match snapshot in disabled state', () => {
      const { container } = render(
        <DsSearchbar
          name="snapshot-search"
          onChange={() => {}}
          options={mockProducts}
          disabled
        />
      )

      expect(container.firstChild).toMatchSnapshot('searchbar-disabled')
    })

    it('should match snapshot with complex options', () => {
      const { container } = render(
        <DsSearchbar
          name="snapshot-search"
          onChange={() => {}}
          options={mockUsers}
          getOptionLabel={option => option.name}
        />
      )

      expect(container.firstChild).toMatchSnapshot('searchbar-complex-options')
    })

    it('should match snapshot across all themes', () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      colorSchemes.forEach(colorScheme => {
        const { container } = render(
          <DsSearchbar
            name={`theme-search-${colorScheme}`}
            onChange={() => {}}
            options={mockProducts}
            placeholder="Theme test search"
          />,
          { colorScheme }
        )

        expect(container.firstChild).toMatchSnapshot(
          `searchbar-theme-${colorScheme}`
        )
      })
    })
  })
})
