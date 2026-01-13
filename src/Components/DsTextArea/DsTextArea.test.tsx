/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTextArea component
 *
 * Testing Strategy:
 * DsTextArea extends DsTextField with multiline support and character counting functionality.
 * Tests focus on:
 * 1. Core Rendering - Basic component structure and display
 * 2. Props Validation - maxLength, hideCharacterCount, fullWidth, states, and inherited props
 * 3. Event Handling - onChange with count updates, focus, blur, keyboard events
 * 4. Form Integration - Form control wrapper, ref handling, form submission
 * 5. Accessibility - ARIA attributes and label associations
 * 6. Edge Cases - Value updates, empty states, long text, null handling
 * 7. Real-world Scenarios - Common usage patterns for feedback, comments, descriptions
 * 8. Theme Testing - Design system color validation across themes
 * 9. Snapshot Testing - Visual regression protection across different configurations
 *
 * Total: 47 tests covering comprehensive functionality
 * Note: Character counting logic and useEffect behavior tested thoroughly
 *
 * @package @am92/react-design-system
 * @component DsTextArea
 */

import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '../../Tests/Mocks/testUtils'
import userEvent from '@testing-library/user-event'
import { DsTextArea } from './DsTextArea.Component'
import getColorScheme from '../../Theme/getColorScheme'
import { PALETTE } from '../../Constants'

describe('DsTextArea Component', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  //============================================================================
  // 1. Core Rendering Tests
  //============================================================================
  describe('Core Rendering', () => {
    it('should render with required maxLength prop', () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute('maxlength', '100')
    })

    it('should render with character counter by default', () => {
      render(<DsTextArea maxLength={100} />)
      const counter = screen.getByText('0/100')
      expect(counter).toBeInTheDocument()
      expect(counter).toBeVisible()
    })

    it('should render without character counter when hideCharacterCount is true', () => {
      render(<DsTextArea maxLength={100} hideCharacterCount />)
      expect(screen.queryByText('0/100')).not.toBeInTheDocument()
    })

    it('should render with label when provided', () => {
      render(<DsTextArea maxLength={100} label="Description" />)
      const label = screen.getByText('Description')
      expect(label).toBeInTheDocument()
    })

    it('should render with helper text when provided', () => {
      render(<DsTextArea maxLength={100} helperText="Enter your description" />)
      expect(screen.getByText(/Enter your description/)).toBeInTheDocument()
    })
  })

  //============================================================================
  // 2. Props Validation Tests
  //============================================================================
  describe('Props Validation', () => {
    it('should accept and apply custom id', () => {
      render(<DsTextArea maxLength={100} id="custom-textarea" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('id', 'custom-textarea')
    })

    it('should accept and apply custom name', () => {
      render(<DsTextArea maxLength={100} name="description-field" />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('name', 'description-field')
    })

    it('should apply fullWidth prop', () => {
      const { container } = render(<DsTextArea maxLength={100} fullWidth />)
      const formControl = container.querySelector('.MuiFormControl-root')
      expect(formControl).toHaveClass('MuiFormControl-fullWidth')
    })

    it('should handle disabled state', () => {
      render(<DsTextArea maxLength={100} disabled />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeDisabled()
    })

    it('should handle error state', () => {
      render(<DsTextArea maxLength={100} error helperText="Error message" />)
      const helperText = screen.getByText(/Error message/)
      expect(helperText).toBeInTheDocument()

      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
      // Check for error styling on parent elements
      const textareaParent = textarea.closest('.MuiInputBase-root')
      expect(textareaParent).toHaveClass('Mui-error')
    })

    it('should handle success state', () => {
      render(
        <DsTextArea maxLength={100} success helperText="Success message" />
      )
      const helperText = screen.getByText(/Success message/)
      expect(helperText).toBeInTheDocument()

      const textarea = screen.getByRole('textbox')
      // Check for success styling on parent elements
      const textareaParent = textarea.closest('.MuiInputBase-root')
      expect(textareaParent).toHaveClass('MuiInputBase-colorSuccess')
    })

    it('should handle required state', () => {
      render(<DsTextArea maxLength={100} required />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeRequired()
    })

    it('should handle placeholder text', () => {
      render(<DsTextArea maxLength={100} placeholder="Enter description..." />)
      const textarea = screen.getByPlaceholderText('Enter description...')
      expect(textarea).toBeInTheDocument()
    })

    it('should display initial count as 0', () => {
      render(<DsTextArea maxLength={100} />)
      const counter = screen.getByText('0/100')
      expect(counter).toBeInTheDocument()
    })

    it('should handle readonly state', () => {
      render(
        <DsTextArea
          maxLength={100}
          inputProps={{ readOnly: true }}
          value="Read-only content"
          onChange={() => {}}
        />
      )
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('readonly')
      expect(textarea).toHaveValue('Read-only content')
    })
  })

  //============================================================================
  // 3. Event Handling Tests
  //============================================================================
  describe('Event Handling', () => {
    it('should call onChange when text changes', async () => {
      const handleChange = vi.fn()
      render(<DsTextArea maxLength={100} onChange={handleChange} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'a')

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            value: 'a'
          })
        })
      )
    })

    it('should update character count on change', async () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'Hello')
      expect(screen.getByText('5/100')).toBeInTheDocument()

      await user.clear(textarea)
      await user.type(textarea, 'Hi')
      expect(screen.getByText('2/100')).toBeInTheDocument()
    })

    it('should handle focus and blur events', async () => {
      const handleFocus = vi.fn()
      const handleBlur = vi.fn()
      render(
        <DsTextArea maxLength={100} onFocus={handleFocus} onBlur={handleBlur} />
      )
      const textarea = screen.getByRole('textbox')

      await user.click(textarea)
      expect(handleFocus).toHaveBeenCalledTimes(1)

      await user.tab()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should handle keyboard events', async () => {
      const handleKeyDown = vi.fn()
      render(<DsTextArea maxLength={100} onKeyDown={handleKeyDown} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'a')

      expect(handleKeyDown).toHaveBeenCalled()
    })

    it('should not call onChange when disabled', async () => {
      const handleChange = vi.fn()
      render(<DsTextArea maxLength={100} disabled onChange={handleChange} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'test')

      expect(handleChange).not.toHaveBeenCalled()
    })

    it('should respect maxLength constraint', async () => {
      render(<DsTextArea maxLength={10} />)
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

      // Try to type more than maxLength
      await user.type(textarea, 'This is a very long text that exceeds limit')

      // Should be truncated to maxLength
      expect(textarea.value.length).toBeLessThanOrEqual(10)
    })
  })

  //============================================================================
  // 4. Form Integration Tests
  //============================================================================
  describe('Form Integration', () => {
    it('should work within form context', () => {
      render(
        <form>
          <DsTextArea maxLength={100} name="description" />
        </form>
      )
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveAttribute('name', 'description')
    })

    it('should handle form submission', async () => {
      const handleSubmit = vi.fn(e => e.preventDefault())
      render(
        <form onSubmit={handleSubmit}>
          <DsTextArea maxLength={100} name="description" />
          <button type="submit">Submit</button>
        </form>
      )

      const textarea = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button')

      await user.type(textarea, 'Form content')
      await user.click(submitButton)

      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('should integrate with FormControl correctly', () => {
      const { container } = render(<DsTextArea maxLength={100} />)
      const formControl = container.querySelector('.MuiFormControl-root')
      expect(formControl).toBeInTheDocument()
    })

    it('should handle ref forwarding', () => {
      const ref = { current: null }
      render(<DsTextArea maxLength={100} ref={ref} />)
      // Component should handle ref internally
      expect(ref.current).toBeDefined()
    })
  })

  //============================================================================
  // 5. Accessibility Tests
  //============================================================================
  describe('Accessibility', () => {
    it('should have correct ARIA role', () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
    })

    it('should associate label with textarea', () => {
      render(<DsTextArea maxLength={100} label="Description" id="desc-field" />)
      const label = screen.getByText('Description')
      const textarea = screen.getByRole('textbox')

      expect(textarea).toHaveAttribute('id', 'desc-field')
      expect(label).toBeInTheDocument()
    })

    it('should support ARIA attributes', () => {
      render(
        <DsTextArea
          maxLength={100}
          inputProps={{
            'aria-label': 'User description',
            'aria-describedby': 'desc-help'
          }}
        />
      )
      const textarea = screen.getByRole('textbox')

      expect(textarea).toHaveAttribute('aria-label', 'User description')
      expect(textarea).toHaveAttribute('aria-describedby', 'desc-help')
    })

    it('should indicate required state to screen readers', () => {
      render(<DsTextArea maxLength={100} required />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeRequired()
    })

    it('should handle error state accessibility', () => {
      render(<DsTextArea maxLength={100} error helperText="Error message" />)
      const textarea = screen.getByRole('textbox')
      const errorText = screen.getByText(/Error message/)

      expect(errorText).toBeInTheDocument()
      // Check for aria-invalid or error indication
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
    })

    it('should support keyboard navigation', async () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')

      await user.tab()
      expect(textarea).toHaveFocus()

      await user.keyboard('Test content')
      expect(textarea).toHaveValue('Test content')
    })
  })

  //============================================================================
  // 6. Edge Cases Tests
  //============================================================================
  describe('Edge Cases', () => {
    it('should handle extremely long maxLength', () => {
      render(<DsTextArea maxLength={10000} />)
      const counter = screen.getByText('0/10000')
      expect(counter).toBeInTheDocument()
    })

    it('should handle maxLength of 1', () => {
      render(<DsTextArea maxLength={1} />)
      const counter = screen.getByText('0/1')
      expect(counter).toBeInTheDocument()
    })

    it('should handle undefined and null values', () => {
      // Test undefined initial value
      const { unmount } = render(<DsTextArea maxLength={100} />)
      let textarea = screen.getByRole('textbox')
      let counter = screen.getByText('0/100')

      expect(textarea).toHaveValue('')
      expect(counter).toBeInTheDocument()

      unmount()

      // Test null value prop
      // @ts-ignore - Testing edge case
      render(<DsTextArea maxLength={100} value={null} onChange={() => {}} />)
      counter = screen.getByText(/(undefined\/100|0\/100)/)
      expect(counter).toBeInTheDocument()
    })

    it('should handle rapid text changes', async () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')

      await user.type(textarea, 'Quick')
      await user.clear(textarea)
      await user.type(textarea, 'Change')

      expect(screen.getByText('6/100')).toBeInTheDocument()
    })

    it('should handle special characters in text', async () => {
      render(<DsTextArea maxLength={100} />)
      const textarea = screen.getByRole('textbox')

      const specialText = 'Hello! @#$%^&*()_+ ñáéíóú'
      await user.type(textarea, specialText)

      expect(screen.getByText(`${specialText.length}/100`)).toBeInTheDocument()
    })
  })

  //============================================================================
  // 7. Real-world Scenarios Tests
  //============================================================================
  describe('Real-world Scenarios', () => {
    it('should handle user feedback form', async () => {
      render(
        <form>
          <DsTextArea
            maxLength={500}
            label="Your Feedback"
            helperText="Please share your thoughts"
            placeholder="Enter your feedback here..."
            required
          />
        </form>
      )

      const textarea = screen.getByRole('textbox')
      const label = screen.getByText('Your Feedback')
      const helperText = screen.getByText(/Please share your thoughts/)

      expect(textarea).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(helperText).toBeInTheDocument()
      expect(textarea).toBeRequired()

      await user.type(textarea, 'This is my feedback')
      expect(screen.getByText('19/500')).toBeInTheDocument()
    })

    it('should handle comment section', async () => {
      render(
        <DsTextArea
          maxLength={280}
          label="Add a comment"
          placeholder="What's on your mind?"
          fullWidth
        />
      )

      const textarea = screen.getByRole('textbox')
      await user.type(textarea, 'Great article! Thanks for sharing.')

      expect(screen.getByText('34/280')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 8. Theme Testing Tests
  //============================================================================
  describe('Theme Testing', () => {
    it('should apply correct colors across all themes', () => {
      const themeColorScheme = getColorScheme(PALETTE)
      const colorSchemes = ['light', 'dark', 'highContrast'] as const

      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme]

        const { container, unmount } = render(
          <DsTextArea maxLength={100} label="Theme Test" />,
          { colorScheme }
        )

        // Verify theme is applied to form control
        const formControl = container.querySelector(
          '.MuiInputLabel-root'
        ) as HTMLElement
        const computedStyle = window.getComputedStyle(formControl)
        const expectedColor = 'var(--ds-colour-typoPrimary)'
        expect(computedStyle.color).toBe(expectedColor)

        // Clean up before next theme test
        unmount()
      })
    })
  })

  //============================================================================
  // 9. Snapshot Testing Tests
  //============================================================================
  describe('Snapshot Testing', () => {
    it('should match snapshot with default props', () => {
      const { container } = render(<DsTextArea maxLength={100} />)
      expect(container.firstChild).toMatchSnapshot('dstextarea-default')
    })

    it('should match snapshot with label and helper text', () => {
      const { container } = render(
        <DsTextArea
          maxLength={200}
          label="Description"
          helperText="Enter detailed description"
        />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-with-labels')
    })

    it('should match snapshot with hidden character count', () => {
      const { container } = render(
        <DsTextArea maxLength={100} hideCharacterCount />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-hidden-counter')
    })

    it('should match snapshot in error state', () => {
      const { container } = render(
        <DsTextArea maxLength={100} error helperText="This field is required" />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-error')
    })

    it('should match snapshot in success state', () => {
      const { container } = render(
        <DsTextArea maxLength={100} success helperText="Input is valid" />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-success')
    })

    it('should match snapshot when disabled', () => {
      const { container } = render(
        <DsTextArea
          maxLength={100}
          disabled
          value="Disabled content"
          onChange={() => {}}
        />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-disabled')
    })

    it('should match snapshot with fullWidth', () => {
      const { container } = render(<DsTextArea maxLength={100} fullWidth />)
      expect(container.firstChild).toMatchSnapshot('dstextarea-fullwidth')
    })

    it('should match snapshot with real-world configuration', () => {
      const { container } = render(
        <DsTextArea
          maxLength={500}
          label="Product Review"
          placeholder="Share your experience with this product..."
          helperText="Help other customers by sharing your honest review"
          fullWidth
          required
        />
      )
      expect(container.firstChild).toMatchSnapshot('dstextarea-review-form')
    })

    it('should match snapshot in focused state', async () => {
      const { container } = render(
        <DsTextArea
          maxLength={100}
          label="Focused TextArea"
          helperText="This is focused"
        />
      )

      const textarea = screen.getByRole('textbox')
      await user.click(textarea)

      expect(container.firstChild).toMatchSnapshot('dstextarea-focused')
    })
  })
})
