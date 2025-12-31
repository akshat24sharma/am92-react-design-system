/**
 * @vitest-environment jsdom
 *
 * Test suite for DsSlider component
 *
 * Testing Strategy:
 * DsSlider is a direct export of @mui/material/Slider with design system overrides
 * and extended types. Tests focus on:
 * 1. Default Props - Verification of default props application
 * 2. Type Extensions - Testing custom ds-mode prop
 * 3. Theme Overrides - Design system styling integration
 * 4. Basic Functionality - Core MUI Slider behavior
 * 5. Snapshot Testing - Visual regression protection
 *
 * @package @am92/react-design-system
 * @component DsSlider
 */

import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '../../Tests/Mocks/testUtils'
import userEvent from '@testing-library/user-event'
import { DsSlider } from './DsSlider.Component'
import { DsSliderDefaultProps } from './DsSlider.Types'

describe('DsSlider', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    cleanup()
  })

  //============================================================================
  // 1. Default Props Tests
  //============================================================================
  describe('Default Props', () => {
    it('should have correct default props structure', () => {
      expect(DsSliderDefaultProps['ds-mode']).toBe('true')
      expect(DsSliderDefaultProps.color).toBe('secondary')
    })

    it('should apply default props when not specified', () => {
      const { container } = render(<DsSlider aria-label="Default test" />)
      const sliderRoot = container.querySelector('.MuiSlider-root')
      expect(sliderRoot).toHaveClass('MuiSlider-colorSecondary')
    })

    it('should override default props when explicitly provided', () => {
      const { container } = render(
        <DsSlider color="primary" aria-label="Override test" />
      )
      const sliderRoot = container.querySelector('.MuiSlider-root')
      expect(sliderRoot).toHaveClass('MuiSlider-colorPrimary')
      expect(sliderRoot).not.toHaveClass('MuiSlider-colorSecondary')
    })
  })

  //============================================================================
  // 2. ds-mode Prop Tests
  //============================================================================
  describe('ds-mode Prop', () => {
    it('should render with ds-mode="true" by default', () => {
      const { container } = render(<DsSlider aria-label="Default ds-mode" />)
      const element = screen.getByRole('slider')
      expect(element).toBeInTheDocument()
      expect(container.querySelector('.MuiSlider-root')).toBeInTheDocument()
    })

    it('should apply ds-mode="false" when explicitly set', () => {
      const { container } = render(
        <DsSlider ds-mode="false" aria-label="Explicit ds-mode false" />
      )
      const element = screen.getByRole('slider')
      expect(element).toBeInTheDocument()
      expect(container.querySelector('.MuiSlider-root')).toBeInTheDocument()
    })
  })

  //============================================================================
  // 3. Value and Range Tests
  //============================================================================
  describe('Value and Range', () => {
    it('should handle min and max values', () => {
      render(
        <DsSlider
          min={10}
          max={90}
          defaultValue={50}
          aria-label="Min max test"
        />
      )
      const element = screen.getByRole('slider')
      expect(element).toHaveAttribute('aria-valuemin', '10')
      expect(element).toHaveAttribute('aria-valuemax', '90')
      expect(element).toHaveAttribute('aria-valuenow', '50')
    })

    it('should handle step values', () => {
      render(
        <DsSlider
          step={5}
          min={0}
          max={50}
          defaultValue={25}
          aria-label="Step test"
        />
      )
      const element = screen.getByRole('slider')
      expect(element).toHaveAttribute('aria-valuenow', '25')
    })

    it('should handle marks', () => {
      const marks = [
        { value: 0, label: '0°C' },
        { value: 100, label: '100°C' }
      ]
      const { container } = render(
        <DsSlider marks={marks} aria-label="Marks test" />
      )
      const markLabels = container.querySelectorAll('.MuiSlider-markLabel')
      expect(markLabels).toHaveLength(2)
    })

    it('should render with default secondary color', () => {
      const { container } = render(<DsSlider aria-label="Color test" />)
      const root = container.querySelector('.MuiSlider-root')
      expect(root).toHaveClass('MuiSlider-colorSecondary')
    })
  })

  //============================================================================
  // 4. Accessibility and Interaction Tests
  //============================================================================
  describe('Accessibility and Interaction', () => {
    it('should be accessible with proper ARIA labels', () => {
      render(<DsSlider aria-label="Volume control" />)
      const element = screen.getByRole('slider')
      expect(element).toHaveAccessibleName('Volume control')
    })

    it('should handle keyboard navigation', async () => {
      render(<DsSlider defaultValue={50} aria-label="Keyboard test" />)
      const element = screen.getByRole('slider')

      element.focus()
      expect(element).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(element).toHaveAttribute('aria-valuenow', '51')
    })

    it('should call onChange when value changes', async () => {
      const handleChange = vi.fn()
      render(<DsSlider onChange={handleChange} aria-label="Change test" />)
      const element = screen.getByRole('slider')

      element.focus()
      await user.keyboard('{ArrowRight}')
      expect(handleChange).toHaveBeenCalled()
    })

    it('should support range slider functionality', () => {
      render(
        <DsSlider
          defaultValue={[20, 80]}
          getAriaLabel={index => `Thumb ${index + 1}`}
        />
      )
      const elements = screen.getAllByRole('slider')
      expect(elements).toHaveLength(2)
      expect(elements[0]).toHaveAccessibleName('Thumb 1')
      expect(elements[1]).toHaveAccessibleName('Thumb 2')
    })
  })

  //============================================================================
  // 5. Component Integration
  //============================================================================
  describe('Component Integration', () => {
    it('should integrate properly with MUI Slider', () => {
      const { container } = render(
        <DsSlider
          defaultValue={30}
          step={10}
          marks
          min={0}
          max={100}
          valueLabelDisplay="auto"
          color="primary"
          ds-mode="true"
          aria-label="Integration test"
        />
      )

      const slider = screen.getByRole('slider')
      const root = container.querySelector('.MuiSlider-root')

      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('aria-valuenow', '30')
      expect(root).toHaveClass('MuiSlider-colorPrimary')
      expect(container.querySelectorAll('.MuiSlider-mark')).not.toHaveLength(0)
    })

    it('should match snapshot with default configuration', () => {
      const { container } = render(<DsSlider aria-label="Default snapshot" />)
      expect(container.firstChild).toMatchSnapshot('dsslider-default')
    })

    it('should match snapshot with hover state', async () => {
      const { container } = render(<DsSlider aria-label="Hover snapshot" />)
      const slider = screen.getByRole('slider')
      
      await user.hover(slider)
      expect(container.firstChild).toMatchSnapshot('dsslider-hover')
    })

    it('should match snapshot with focus state', async () => {
      const { container } = render(<DsSlider aria-label="Focus snapshot" />)
      const slider = screen.getByRole('slider')
      
      slider.focus()
      expect(container.firstChild).toMatchSnapshot('dsslider-focus')
    })
  })
})
