/**
 * @vitest-environment jsdom
 *
 * Test suite for DsButtonGroup component
 *
 * Testing Strategy:
 * DsButtonGroup is a custom wrapper component using DsStack that groups buttons
 * with consistent spacing and styling. Tests focus on:
 * 1. Core Rendering - Basic component display and structure
 * 2. Props Validation - All component props and their effects
 * 3. Component States - Different states and prop combinations
 * 4. Event Handling - Event delegation and user interactions
 * 5. Form Integration - Form context and submission handling
 * 6. Accessibility - ARIA compliance and keyboard navigation
 * 7. Edge Cases - Boundary conditions and error scenarios
 * 8. Real-world Scenarios - Common usage patterns
 * 9. Snapshot Testing - Visual regression protection
 *
 * Expected Test Failures (Component Issues, not Test Issues):
 * - None identified - all failures were due to incorrect test expectations
 *
 * Note: Theme testing is not included since DsButtonGroup is a container component
 * that delegates styling to its children. Theme testing should be done on leaf components.
 * - Form attributes: Button type is on button element, not text content
 *
 * @package @am92/react-design-system
 * @component DsButtonGroup
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '../../Tests/Mocks/testUtils'
import userEvent from '@testing-library/user-event'
import { DsButtonGroup } from './DsButtonGroup.Component'
import { DsButtonGroupDefaultProps } from './DsButtonGroup.Types'
import { DsButton } from '../DsButton'
import { DsIconButton } from '../DsIconButton'
import { DsBox } from '../DsBox'

describe('DsButtonGroup', () => {
  let user: ReturnType<typeof userEvent.setup>

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
      render(
        <DsButtonGroup>
          <DsButton>Button 1</DsButton>
          <DsButton>Button 2</DsButton>
        </DsButtonGroup>
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(screen.getByText('Button 1')).toBeInTheDocument()
      expect(screen.getByText('Button 2')).toBeInTheDocument()
    })

    it('should render with mixed child components', () => {
      render(
        <DsButtonGroup>
          <DsButton>Text Button</DsButton>
          <DsIconButton aria-label="Icon Button">🎯</DsIconButton>
        </DsButtonGroup>
      )

      expect(screen.getByText('Text Button')).toBeInTheDocument()
      expect(screen.getByLabelText('Icon Button')).toBeInTheDocument()
    })

    it('should handle null/undefined children gracefully', () => {
      render(
        <DsButtonGroup>
          <DsButton>Valid Button</DsButton>
          {null}
          {undefined}
          <DsButton>Another Button</DsButton>
        </DsButtonGroup>
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(screen.getByText('Valid Button')).toBeInTheDocument()
      expect(screen.getByText('Another Button')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 2. Props Validation Tests
  //============================================================================
  describe('Props Validation', () => {
    it('should have correct default props structure', () => {
      expect(DsButtonGroupDefaultProps.fullWidth).toBe(false)
      expect(DsButtonGroupDefaultProps.noPadding).toBe(false)
      expect(DsButtonGroupDefaultProps.size).toBe('medium')
    })

    it('should accept and apply custom id', () => {
      const { container } = render(
        <DsButtonGroup id="custom-button-group">
          <DsButton>Test Button</DsButton>
        </DsButtonGroup>
      )

      const buttonGroup = container.querySelector('#custom-button-group')
      expect(buttonGroup).toBeInTheDocument()
      expect(buttonGroup).toHaveAttribute('id', 'custom-button-group')
    })

    it('should apply fullWidth prop to children', () => {
      render(
        <DsButtonGroup fullWidth>
          <DsButton data-testid="button-1">Button 1</DsButton>
          <DsButton data-testid="button-2">Button 2</DsButton>
        </DsButtonGroup>
      )

      const button1 = screen.getByTestId('button-1')
      const button2 = screen.getByTestId('button-2')

      // Check that fullWidth prop is passed to children
      // Note: This tests the prop passing, actual fullWidth styling is tested in DsButton tests
      expect(button1).toBeInTheDocument()
      expect(button2).toBeInTheDocument()

      // Check that buttons have fullWidth class when fullWidth prop is passed
      expect(button1).toHaveClass('MuiButton-fullWidth')
      expect(button2).toHaveClass('MuiButton-fullWidth')
    })

    it('should apply size prop to children', () => {
      render(
        <DsButtonGroup size="large">
          <DsButton data-testid="large-button">Large Button</DsButton>
        </DsButtonGroup>
      )

      const button = screen.getByTestId('large-button')
      expect(button).toBeInTheDocument()

      // Size prop application is validated through child component behavior
      // Check that button has size large class when size prop is passed
      expect(button).toHaveClass('MuiButton-sizeLarge')
    })

    it('should accept custom sx prop', () => {
      const customSx = {
        backgroundColor: 'var(--ds-colour-neutral1)',
        border: '2px solid blue'
      }
      const { container } = render(
        <DsButtonGroup sx={customSx} data-testid="button-group-sx-test">
          <DsButton>Styled Button</DsButton>
        </DsButtonGroup>
      )

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()

      const buttonGroup = screen.getByTestId('button-group-sx-test')
      const buttonGroupStyles = window.getComputedStyle(buttonGroup)

      // Custom sx prop is applied through DsStack
      expect(buttonGroupStyles.backgroundColor).toBe(
        'var(--ds-colour-neutral1)'
      )
      expect(buttonGroupStyles.border).toBe('2px solid blue')
    })
  })

  //============================================================================
  // 3. Component States Tests
  //============================================================================
  describe('Component States', () => {
    it('should handle disabled children', () => {
      render(
        <DsButtonGroup>
          <DsButton disabled>Disabled Button</DsButton>
          <DsButton>Enabled Button</DsButton>
        </DsButtonGroup>
      )

      const buttons = screen.getAllByRole('button')
      const disabledButton = buttons.find(
        btn => btn.textContent === 'Disabled Button'
      )
      const enabledButton = buttons.find(
        btn => btn.textContent === 'Enabled Button'
      )

      expect(disabledButton).toBeDisabled()
      expect(enabledButton).not.toBeDisabled()
    })

    it('should handle state combinations', () => {
      render(
        <DsButtonGroup
          fullWidth
          noPadding
          size="small"
          data-testid="button-group-sx-test"
        >
          <DsButton color="primary">Primary Small</DsButton>
          <DsButton color="secondary" disabled>
            Secondary Disabled
          </DsButton>
        </DsButtonGroup>
      )

      const buttons = screen.getAllByRole('button')
      const primaryButton = buttons.find(
        btn => btn.textContent === 'Primary Small'
      )
      const secondaryButton = buttons.find(
        btn => btn.textContent === 'Secondary Disabled'
      )
      const buttonGroup = screen.getByTestId('button-group-sx-test')
      const buttonGroupStyles = window.getComputedStyle(buttonGroup)
      console.log('buttonGroup', buttonGroupStyles.padding)

      expect(primaryButton).toHaveClass('MuiButton-fullWidth')
      expect(secondaryButton).toHaveClass('MuiButton-fullWidth')
      expect(secondaryButton).toBeDisabled()
      expect(buttonGroupStyles.padding).toBe('var(--ds-spacing-zero)')
    })
  })

  //============================================================================
  // 4. Event Handling Tests
  //============================================================================
  describe('Event Handling', () => {
    it('should handle individual button click events', async () => {
      const handleClick1 = vi.fn()
      const handleClick2 = vi.fn()

      render(
        <DsButtonGroup>
          <DsButton onClick={handleClick1}>Button 1</DsButton>
          <DsButton onClick={handleClick2}>Button 2</DsButton>
        </DsButtonGroup>
      )

      const button1 = screen.getByText('Button 1')
      const button2 = screen.getByText('Button 2')

      await user.click(button1)
      expect(handleClick1).toHaveBeenCalledTimes(1)
      expect(handleClick2).not.toHaveBeenCalled()

      await user.click(button2)
      expect(handleClick2).toHaveBeenCalledTimes(1)
      expect(handleClick1).toHaveBeenCalledTimes(1)
    })

    it('should handle keyboard navigation between buttons', async () => {
      render(
        <DsButtonGroup>
          <DsButton data-testid="first">First</DsButton>
          <DsButton data-testid="second">Second</DsButton>
          <DsButton data-testid="third">Third</DsButton>
        </DsButtonGroup>
      )

      const firstButton = screen.getByTestId('first')
      const secondButton = screen.getByTestId('second')
      const thirdButton = screen.getByTestId('third')

      // Focus first button
      firstButton.focus()
      expect(firstButton).toHaveFocus()

      // Tab to second button
      await user.tab()
      expect(secondButton).toHaveFocus()

      // Tab to third button
      await user.tab()
      expect(thirdButton).toHaveFocus()
    })

    it('should handle Enter and Space key activation', async () => {
      const handleClick = vi.fn()

      render(
        <DsButtonGroup>
          <DsButton onClick={handleClick} data-testid="keyboard-button">
            Keyboard Button
          </DsButton>
        </DsButtonGroup>
      )

      const button = screen.getByTestId('keyboard-button')
      button.focus()

      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalledTimes(1)

      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalledTimes(2)
    })

    it('should prevent events on disabled buttons', async () => {
      const handleClick = vi.fn()

      render(
        <DsButtonGroup>
          <DsButton
            onClick={handleClick}
            disabled
            data-testid="disabled-button"
          >
            Disabled Button
          </DsButton>
        </DsButtonGroup>
      )

      const button = screen.getByTestId('disabled-button')

      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  //============================================================================
  // 5. Form Integration Tests
  //============================================================================
  describe('Form Integration', () => {
    it('should work within form context', () => {
      render(
        <form data-testid="button-form">
          <DsButtonGroup>
            <DsButton type="submit">Submit</DsButton>
            <DsButton type="reset">Reset</DsButton>
            <DsButton type="button">Cancel</DsButton>
          </DsButtonGroup>
        </form>
      )

      const form = screen.getByTestId('button-form')
      const buttons = screen.getAllByRole('button')
      const submitButton = buttons.find(btn => btn.textContent === 'Submit')
      const resetButton = buttons.find(btn => btn.textContent === 'Reset')
      const cancelButton = buttons.find(btn => btn.textContent === 'Cancel')

      expect(form).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('type', 'submit')
      expect(resetButton).toHaveAttribute('type', 'reset')
      expect(cancelButton).toHaveAttribute('type', 'button')
    })

    it('should handle form submission', async () => {
      const handleSubmit = vi.fn(e => e.preventDefault())

      render(
        <form onSubmit={handleSubmit}>
          <DsButtonGroup>
            <DsButton type="submit">Submit Form</DsButton>
          </DsButtonGroup>
        </form>
      )

      const submitButton = screen.getByText('Submit Form')
      await user.click(submitButton)

      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('should integrate with form validation', () => {
      render(
        <form>
          <input required data-testid="required-input" />
          <DsButtonGroup>
            <DsButton type="submit">Submit</DsButton>
            <DsButton type="button">Draft</DsButton>
          </DsButtonGroup>
        </form>
      )

      const input = screen.getByTestId('required-input')
      const submitButton = screen.getByText('Submit')
      const draftButton = screen.getByText('Draft')

      expect(input).toBeRequired()
      expect(submitButton).toBeInTheDocument()
      expect(draftButton).toBeInTheDocument()
    })
  })

  //============================================================================
  // 6. Accessibility Tests
  //============================================================================
  describe('Accessibility', () => {
    it('should have proper ARIA structure', () => {
      render(
        <DsButtonGroup role="group" aria-label="Action buttons">
          <DsButton>Save</DsButton>
          <DsButton>Cancel</DsButton>
        </DsButtonGroup>
      )

      const group = screen.getByRole('group')
      expect(group).toHaveAccessibleName('Action buttons')
      expect(group).toBeInTheDocument()
    })

    it('should support keyboard navigation', async () => {
      render(
        <DsButtonGroup>
          <DsButton data-testid="nav-1">Button 1</DsButton>
          <DsButton data-testid="nav-2">Button 2</DsButton>
          <DsButton data-testid="nav-3">Button 3</DsButton>
        </DsButtonGroup>
      )

      const button1 = screen.getByTestId('nav-1')
      const button2 = screen.getByTestId('nav-2')

      button1.focus()
      expect(button1).toHaveFocus()

      await user.tab()
      expect(button2).toHaveFocus()
    })

    it('should maintain focus management with disabled buttons', async () => {
      render(
        <DsButtonGroup>
          <DsButton data-testid="enabled-1">Enabled 1</DsButton>
          <DsButton disabled data-testid="disabled">
            Disabled
          </DsButton>
          <DsButton data-testid="enabled-2">Enabled 2</DsButton>
        </DsButtonGroup>
      )

      const enabled1 = screen.getByTestId('enabled-1')
      const disabled = screen.getByTestId('disabled')
      const enabled2 = screen.getByTestId('enabled-2')

      enabled1.focus()
      expect(enabled1).toHaveFocus()

      await user.tab()
      // Should skip disabled button and go to next enabled one
      expect(enabled2).toHaveFocus()
      expect(disabled).not.toHaveFocus()
    })

    it('should support ARIA labels for individual buttons', () => {
      render(
        <DsButtonGroup>
          <DsButton aria-label="Save document">💾</DsButton>
          <DsButton aria-label="Delete document">🗑️</DsButton>
          <DsButton aria-label="Share document">📤</DsButton>
        </DsButtonGroup>
      )

      expect(screen.getByLabelText('Save document')).toBeInTheDocument()
      expect(screen.getByLabelText('Delete document')).toBeInTheDocument()
      expect(screen.getByLabelText('Share document')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 7. Edge Cases Tests
  //============================================================================
  describe('Edge Cases', () => {
    it('should handle empty children array', () => {
      const { container } = render(<DsButtonGroup>{[]}</DsButtonGroup>)

      const element = container.firstChild as HTMLElement
      expect(element).toBeInTheDocument()

      // DsStack renders a container even with no children, but no buttons should be present
      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(0)
    })

    it('should handle very large number of children', () => {
      const manyButtons = Array.from({ length: 50 }, (_, i) => (
        <DsButton key={i} data-testid={`button-${i}`}>
          Button {i + 1}
        </DsButton>
      ))

      render(<DsButtonGroup>{manyButtons}</DsButtonGroup>)

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(50)
      expect(screen.getByTestId('button-0')).toBeInTheDocument()
      expect(screen.getByTestId('button-49')).toBeInTheDocument()
    })

    it('should handle mixed valid and invalid children', () => {
      render(
        <DsButtonGroup>
          <DsButton>Valid Button</DsButton>
          {false && <DsButton>Hidden Button</DsButton>}
          {null}
          {undefined}
          <DsButton>Another Valid Button</DsButton>
        </DsButtonGroup>
      )

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2)
      expect(screen.getByText('Valid Button')).toBeInTheDocument()
      expect(screen.getByText('Another Valid Button')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 8. Real-world Scenarios Tests
  //============================================================================
  describe('Real-world Scenarios', () => {
    it('should render dialog action buttons', () => {
      render(
        <DsBox>
          <DsButtonGroup sx={{ justifyContent: 'flex-end', mt: 2 }}>
            <DsButton variant="text" color="inherit">
              Cancel
            </DsButton>
            <DsButton variant="contained" color="primary">
              Confirm
            </DsButton>
          </DsButtonGroup>
        </DsBox>
      )

      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Confirm')).toBeInTheDocument()
    })

    it('should render toolbar buttons with icons', () => {
      render(
        <DsButtonGroup size="small" sx={{ gap: 1 }}>
          <DsButton>Edit</DsButton>
          <DsButton>View</DsButton>
          <DsButton color="error">Delete</DsButton>
        </DsButtonGroup>
      )

      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('View')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('should render full-width mobile button group', () => {
      render(
        <DsButtonGroup fullWidth direction="column" spacing={1}>
          <DsButton variant="contained" color="primary">
            Primary Action
          </DsButton>
          <DsButton variant="outlined" color="secondary">
            Secondary Action
          </DsButton>
          <DsButton variant="text" color="inherit">
            Tertiary Action
          </DsButton>
        </DsButtonGroup>
      )

      expect(screen.getByText('Primary Action')).toBeInTheDocument()
      expect(screen.getByText('Secondary Action')).toBeInTheDocument()
      expect(screen.getByText('Tertiary Action')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 9. Snapshot Testing
  //============================================================================
  describe('Snapshot Testing', () => {
    it('should match snapshot with default props', () => {
      const { container } = render(
        <DsButtonGroup>
          <DsButton>Default Button</DsButton>
          <DsButton color="secondary">Secondary Button</DsButton>
        </DsButtonGroup>
      )
      expect(container.firstChild).toMatchSnapshot('dsbuttongroup-default')
    })

    it('should match snapshot with fullWidth', () => {
      const { container } = render(
        <DsButtonGroup fullWidth>
          <DsButton>Full Width Button</DsButton>
        </DsButtonGroup>
      )
      expect(container.firstChild).toMatchSnapshot('dsbuttongroup-fullwidth')
    })

    it('should match snapshot with noPadding', () => {
      const { container } = render(
        <DsButtonGroup noPadding>
          <DsButton>No Padding Button</DsButton>
        </DsButtonGroup>
      )
      expect(container.firstChild).toMatchSnapshot('dsbuttongroup-nopadding')
    })

    it('should match snapshot with different sizes', () => {
      const sizes = ['small', 'medium', 'large'] as const
      sizes.forEach(size => {
        const { container } = render(
          <DsButtonGroup size={size}>
            <DsButton>{size} Button</DsButton>
          </DsButtonGroup>
        )
        expect(container.firstChild).toMatchSnapshot(
          `dsbuttongroup-size-${size}`
        )
      })
    })

    it('should match snapshot with complex real-world usage', () => {
      const { container } = render(
        <DsButtonGroup fullWidth noPadding size="large">
          <DsButton variant="contained" color="primary">
            Save
          </DsButton>
          <DsButton variant="outlined" color="secondary">
            Cancel
          </DsButton>
          <DsButton variant="text" color="error">
            Delete
          </DsButton>
        </DsButtonGroup>
      )
      expect(container.firstChild).toMatchSnapshot(
        'dsbuttongroup-complex-usage'
      )
    })
  })
})
