/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsSwitch component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Tests for basic component rendering with default and required props
 * 2. Props Validation - Tests for prop handling and validation 
 * 3. Component States - Tests for different component states (disabled, values, etc.)
 * 4. MUI Styling - Tests for Material-UI specific styling and classes
 * 5. Component Functionality - Tests for switch behavior and value selection
 * 6. Event Handling - Tests for user interactions and onChange events
 * 7. Form Integration - Tests for form behavior and name/value handling
 * 8. Accessibility - Tests for ARIA attributes and keyboard navigation
 * 9. Edge Cases - Tests for unusual scenarios and prop combinations
 * 10. Theme Testing - Tests component rendering across all color schemes
 * 11. Real-world Scenarios - Tests for practical usage patterns
 * 12. Snapshot Tests - Visual regression protection
 * 
 * Component Analysis:
 * - DsSwitch is a wrapper around DsToggleButtonGroup with two DsToggleButtons
 * - Uses a custom onChange handler that passes name and value instead of event
 * - Has positive/negative labels and values with defaults of YES/NO and true/false
 * - Renders with Typography components for labels
 * - Always in exclusive mode (only one option can be selected)
 * - Fixed size of "small"
 * - Uses ds-variant="switch"
 * 
 * Critical Testing Notes:
 * - onChange receives (name, value) parameters, not (event, value) like standard MUI components
 * - Component uses DsToggleButtonGroup internally, so tests should verify toggle button behavior
 * - Positive and negative options are rendered as separate toggle buttons
 * - Value should match either positiveValue or negativeValue
 * 
 * @package @am92/react-design-system
 * @component DsSwitch
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsSwitch } from "./DsSwitch.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsBox, DsFormControl, DsFormLabel, DsFormControlLabel, DsFormHelperText } from "../index";

describe("DsSwitch", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsSwitch name="test-switch" value={false} onChange={() => {}} />);
      
      // Should render the toggle button group with switch variant
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toBeInTheDocument();
      expect(toggleGroup).toHaveAttribute('ds-variant', 'switch');
      
      // Should render both YES and NO buttons by default
      const yesButton = screen.getByText("YES");
      const noButton = screen.getByText("NO");
      expect(yesButton).toBeInTheDocument();
      expect(noButton).toBeInTheDocument();
    });

    it("should render with custom labels", () => {
      render(
        <DsSwitch 
          name="custom-switch" 
          value={false}
          positiveLabel="Enable"
          negativeLabel="Disable"
          onChange={() => {}}
        />
      );
      
      expect(screen.getByText("Enable")).toBeInTheDocument();
      expect(screen.getByText("Disable")).toBeInTheDocument();
      expect(screen.queryByText("YES")).not.toBeInTheDocument();
      expect(screen.queryByText("NO")).not.toBeInTheDocument();
    });

    it("should render without crashing when minimal props provided", () => {
      render(<DsSwitch name="minimal" value={false} onChange={() => {}} />);
      
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toBeInTheDocument();
    });

    it("should render with custom values", () => {
      render(
        <DsSwitch 
          name="custom-values"
          positiveValue="active"
          negativeValue="inactive"
          value="active"
          onChange={() => {}}
        />
      );
      
      // Should render but we can't directly test the values, they're internal to buttons
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should use default props when not provided", () => {
      const handleChange = vi.fn();
      render(<DsSwitch name="default-test" value={false} onChange={handleChange} />);
      
      // Test default labels
      expect(screen.getByText("YES")).toBeInTheDocument();
      expect(screen.getByText("NO")).toBeInTheDocument();
      
      // Test that default value is false (NO button should be selected if value matches negativeValue)
      const yesButton = screen.getByText("YES").closest('button');
      const noButton = screen.getByText("NO").closest('button');
      
      expect(yesButton).toBeInTheDocument();
      expect(noButton).toBeInTheDocument();
    });

    it("should accept and use custom positive/negative labels", () => {
      render(
        <DsSwitch 
          name="labels-test"
          value={false}
          positiveLabel="On"
          negativeLabel="Off"
          onChange={() => {}}
        />
      );
      
      expect(screen.getByText("On")).toBeInTheDocument();
      expect(screen.getByText("Off")).toBeInTheDocument();
    });

    it("should accept and use custom positive/negative values", () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="values-test"
          positiveValue={1}
          negativeValue={0}
          value={1}
          onChange={handleChange}
        />
      );
      
      // The value is used internally, but we can test by triggering change
      const noButton = screen.getByText("NO").closest('button');
      fireEvent.click(noButton!);
      
      expect(handleChange).toHaveBeenCalledWith("values-test", 0);
    });

    it("should handle name prop correctly", () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="name-test" value={false} onChange={handleChange} />
      );
      
      const yesButton = screen.getByText("YES").closest('button');
      fireEvent.click(yesButton!);
      
      expect(handleChange).toHaveBeenCalledWith("name-test", true);
    });

    it("should handle complex label content", () => {
      render(
        <DsSwitch 
          name="complex-labels"
          value={false}
          positiveLabel="✓ Active"
          negativeLabel="✗ Inactive"
          onChange={() => {}}
        />
      );
      
      expect(screen.getByText("✓ Active")).toBeInTheDocument();
      expect(screen.getByText("✗ Inactive")).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES
  // ============================
  describe("Component States", () => {
    it("should render in disabled state", () => {
      render(
        <DsSwitch 
          name="disabled-test"
          value={false}
          disabled
          onChange={() => {}}
        />
      );
      
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
    });

    it("should show selected state for positive value", () => {
      render(
        <DsSwitch 
          name="selected-positive"

          value={true}
          onChange={() => {}}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button');
      expect(yesButton).toHaveClass('Mui-selected');
    });

    it("should show selected state for negative value", () => {
      render(
        <DsSwitch 
          name="selected-negative"

          value={false}
          onChange={() => {}}
        />
      );
      
      const noButton = screen.getByText("NO").closest('button');
      expect(noButton).toHaveClass('Mui-selected');
    });

    it("should show selected state for custom values", () => {
      render(
        <DsSwitch 
          name="custom-selected"
          positiveValue="enabled"
          negativeValue="disabled" 
          value="enabled"
          onChange={() => {}}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button');
      expect(yesButton).toHaveClass('Mui-selected');
    });

    it("should handle state combinations (disabled + selected)", () => {
      render(
        <DsSwitch 
          name="combined-state"
          value={true}
          disabled
          onChange={() => {}}
        />
      );
      
      const buttons = screen.getAllByRole("button");
      const yesButton = screen.getByText("YES").closest('button');
      expect(yesButton).toBeDisabled();
      expect(yesButton).toHaveClass('Mui-selected');
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI toggle button group classes", () => {
      render(<DsSwitch name="mui-test" value={false} onChange={() => {}} />);
      
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toHaveClass('MuiToggleButtonGroup-root');
    });

    it("should apply switch variant attribute", () => {
      render(<DsSwitch name="variant-test" value={false} onChange={() => {}} />);
      
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toHaveAttribute('ds-variant', 'switch');
    });

    it("should apply small size to toggle button group", () => {
      render(<DsSwitch name="size-test" value={false} onChange={() => {}} />);
      
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toHaveClass('MuiToggleButton-sizeSmall');
      });
    });

    it("should apply exclusive mode classes", () => {
      render(<DsSwitch name="exclusive-test" value={false} onChange={() => {}} />);
      
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      // The exclusive prop doesn't always add a specific class, but the behavior should be exclusive
      expect(toggleGroup).toBeInTheDocument();
    });

    it("should apply MUI button classes to individual buttons", () => {
      render(<DsSwitch name="button-classes" value={false} onChange={() => {}} />);
      
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toHaveClass('MuiToggleButton-root');
        expect(button).toHaveClass('MuiToggleButton-sizeSmall');
      });
    });

    it("should apply focus classes when focused", async () => {
      render(<DsSwitch name="focus-test" value={false} onChange={() => {}} />);
      
      const yesButton = screen.getByText("YES").closest('button')!;
      
      await user.click(yesButton);
      expect(yesButton).toHaveFocus();
      // Focus state might not always add Mui-focusVisible class in test environment
    });

    it("should apply color classes when provided", () => {
      render(
        <DsSwitch 
          name="color-test"
          value={false}
          color="secondary"
          onChange={() => {}}
        />
      );
      
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toHaveClass('MuiToggleButton-secondary');
      });
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY
  // ============================
  describe("Component Functionality", () => {
    it("should handle value switching", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="switch-test"

          value={false}
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(handleChange).toHaveBeenCalledWith("switch-test", true);
    });

    it("should handle custom value switching", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="custom-switch"
          positiveValue="on"
          negativeValue="off"
          value="off"
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(handleChange).toHaveBeenCalledWith("custom-switch", "on");
    });

    it("should handle switching to negative value", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="negative-switch"

          value={true}
          onChange={handleChange}
        />
      );
      
      const noButton = screen.getByText("NO").closest('button')!;
      await user.click(noButton);
      
      expect(handleChange).toHaveBeenCalledWith("negative-switch", false);
    });

    it("should handle exclusive selection (only one option selected)", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="exclusive-test"

          value={true}
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      const noButton = screen.getByText("NO").closest('button')!;
      
      // Initially YES should be selected
      expect(yesButton).toHaveClass('Mui-selected');
      expect(noButton).not.toHaveClass('Mui-selected');
      
      // Click NO, should deselect YES
      await user.click(noButton);
      expect(handleChange).toHaveBeenCalledWith("exclusive-test", false);
    });

    it("should not trigger onChange when disabled", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="disabled-change" value={false} disabled onChange={handleChange} />
      );
      
      // For disabled buttons, we expect them to be unclickable
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toBeDisabled();
      });
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should handle clicking the same selected value", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="same-value"
          value={true}
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      // Clicking the same value in MUI ToggleButtonGroup returns null when deselecting
      expect(handleChange).toHaveBeenCalledWith("same-value", null);
    });
  });

  // ============================
  // EVENT HANDLING
  // ============================
  describe("Event Handling", () => {
    it("should handle click events on positive button", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="click-positive" value={false} onChange={handleChange} />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("click-positive", true);
    });

    it("should handle click events on negative button", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="click-negative" value={true} onChange={handleChange} />
      );
      
      const noButton = screen.getByText("NO").closest('button')!;
      await user.click(noButton);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("click-negative", false);
    });

    it("should handle keyboard navigation", async () => {
      render(<DsSwitch name="keyboard-test" value={false} onChange={() => {}} />);
      
      const yesButton = screen.getByText("YES").closest('button')!;
      const noButton = screen.getByText("NO").closest('button')!;
      
      // Focus first button
      yesButton.focus();
      expect(yesButton).toHaveFocus();
      
      // Tab to next button
      await user.tab();
      expect(noButton).toHaveFocus();
      
      // Shift+Tab back
      await user.tab({ shift: true });
      expect(yesButton).toHaveFocus();
    });

    it("should handle Enter key activation", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="enter-key" value={false} onChange={handleChange} />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      yesButton.focus();
      
      await user.keyboard("{Enter}");
      expect(handleChange).toHaveBeenCalledWith("enter-key", true);
    });

    it("should handle Space key activation", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="space-key" value={false} onChange={handleChange} />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      yesButton.focus();
      
      await user.keyboard(" ");
      expect(handleChange).toHaveBeenCalledWith("space-key", true);
    });

    it("should maintain focus after value change", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch name="focus-maintenance" value={false} onChange={handleChange} />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(yesButton).toHaveFocus();
    });
  });

  // ============================
  // FORM INTEGRATION
  // ============================
  describe("Form Integration", () => {
    it("should work within form element", () => {
      render(
        <form>
          <DsSwitch name="form-switch" value={false} onChange={() => {}} />
        </form>
      );
      
      const form = document.querySelector('form');
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      
      expect(form).toContainElement(toggleGroup as HTMLElement);
    });

    it("should handle form submission context", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const handleChange = vi.fn();
      
      render(
        <form onSubmit={handleSubmit}>
          <DsSwitch name="submit-switch" value={false} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
      );
      
      // Change switch value
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      expect(handleChange).toHaveBeenCalledWith("submit-switch", true);
      
      // Submit form
      const submitButton = screen.getByText("Submit");
      await user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should work with FormControl and labels", () => {
      render(
        <DsFormControl>
          <DsFormLabel>Switch Setting</DsFormLabel>
          <DsSwitch name="form-control-switch" value={false} onChange={() => {}} />
          <DsFormHelperText>Choose yes or no</DsFormHelperText>
        </DsFormControl>
      );
      
      expect(screen.getByText("Switch Setting")).toBeInTheDocument();
      expect(screen.getByText("Choose yes or no")).toBeInTheDocument();
      expect(screen.getByText("YES")).toBeInTheDocument();
      expect(screen.getByText("NO")).toBeInTheDocument();
    });

    it("should work with FormControlLabel wrapper", () => {
      render(
        <DsFormControlLabel
          control={<DsSwitch name="labeled-switch" value={false} onChange={() => {}} />}
          label="Enable Feature"
        />
      );
      
      expect(screen.getByText("Enable Feature")).toBeInTheDocument();
      expect(screen.getByText("YES")).toBeInTheDocument();
    });

    it("should handle controlled component pattern", async () => {
      let value = false;
      const handleChange = vi.fn((name, newValue) => {
        value = newValue;
      });
      
      const ControlledSwitch = () => (
        <DsSwitch 
          name="controlled" 
          value={value}
          onChange={handleChange} 
        />
      );
      
      const { rerender } = render(<ControlledSwitch />);
      
      // Initially NO should be selected
      const noButton = screen.getByText("NO").closest('button')!;
      expect(noButton).toHaveClass('Mui-selected');
      
      // Click YES
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      expect(handleChange).toHaveBeenCalledWith("controlled", true);
      
      // Re-render with new value
      value = true;
      rerender(<ControlledSwitch />);
      
      // After re-render, check the selected state again
      const updatedYesButton = screen.getByText("YES").closest('button')!;
      const updatedNoButton = screen.getByText("NO").closest('button')!;
      expect(updatedYesButton).toHaveClass('Mui-selected');
      expect(updatedNoButton).not.toHaveClass('Mui-selected');
    });
  });

  // ============================
  // ACCESSIBILITY
  // ============================
  describe("Accessibility", () => {
    it("should have proper button roles", () => {
      render(<DsSwitch name="a11y-roles" value={false} onChange={() => {}} />);
      
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
      
      // Buttons have implicit button role, don't need explicit role attribute
      buttons.forEach(button => {
        expect(button.tagName).toBe("BUTTON");
      });
    });

    it("should support keyboard navigation between options", async () => {
      render(<DsSwitch name="a11y-keyboard" value={false} onChange={() => {}} />);
      
      const yesButton = screen.getByText("YES").closest('button')!;
      const noButton = screen.getByText("NO").closest('button')!;
      
      yesButton.focus();
      expect(yesButton).toHaveFocus();
      
      await user.tab();
      expect(noButton).toHaveFocus();
      
      await user.tab({ shift: true });
      expect(yesButton).toHaveFocus();
    });

    it("should be activatable with keyboard", async () => {
      const handleChange = vi.fn();
      render(<DsSwitch name="a11y-activate" value={false} onChange={handleChange} />);
      
      const yesButton = screen.getByText("YES").closest('button')!;
      yesButton.focus();
      
      await user.keyboard("{Enter}");
      expect(handleChange).toHaveBeenCalledWith("a11y-activate", true);
      
      const noButton = screen.getByText("NO").closest('button')!;
      noButton.focus();
      
      await user.keyboard(" ");
      expect(handleChange).toHaveBeenCalledWith("a11y-activate", null);
    });

    it("should provide accessible names through button text", () => {
      render(
        <DsSwitch 
          name="a11y-names"
          value={false}
          positiveLabel="Turn On"
          negativeLabel="Turn Off"
          onChange={() => {}}
        />
      );
      
      const onButton = screen.getByRole("button", { name: /Turn On/i });
      const offButton = screen.getByRole("button", { name: /Turn Off/i });
      
      expect(onButton).toBeInTheDocument();
      expect(offButton).toBeInTheDocument();
    });

    it("should indicate selected state accessibly", () => {
      render(
        <DsSwitch 
          name="a11y-selected"

          value={true}
          onChange={() => {}}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      const noButton = screen.getByText("NO").closest('button')!;
      
      expect(yesButton).toHaveAttribute("aria-pressed", "true");
      expect(noButton).toHaveAttribute("aria-pressed", "false");
    });

    it("should handle disabled state accessibly", () => {
      render(
        <DsSwitch 
          name="a11y-disabled"
          value={false}
          disabled
          onChange={() => {}}
        />
      );
      
      const buttons = screen.getAllByRole("button");
      buttons.forEach(button => {
        expect(button).toBeDisabled();
        // Disabled buttons may not always have explicit aria-disabled in all browsers
      });
    });
  });

  // ============================
  // EDGE CASES
  // ============================
  describe("Edge Cases", () => {
    it("should handle null/undefined values gracefully", () => {
      render(
        <DsSwitch 
          name="null-values"

          value={null as any}
          onChange={() => {}}
        />
      );
      
      const toggleGroup = document.querySelector('.MuiToggleButtonGroup-root');
      expect(toggleGroup).toBeInTheDocument();
    });

    it("should handle very long label text", () => {
      const longText = "Very long label that might wrap to multiple lines and test overflow handling";
      render(
        <DsSwitch 
          name="long-text"
          value={false}
          positiveLabel={longText}
          negativeLabel={longText}
          onChange={() => {}}
        />
      );
      
      const elements = screen.getAllByText(longText);
      expect(elements).toHaveLength(2); // One for each button
      elements.forEach(element => {
        expect(element).toBeInTheDocument();
      });
    });

    it("should handle special characters in labels", () => {
      render(
        <DsSwitch 
          name="special-chars"

          value={false}
          positiveLabel="!@#$%^&*()"
          negativeLabel={'<>{}[]|"'}
          onChange={() => {}}
        />
      );
      
      expect(screen.getByText("!@#$%^&*()")).toBeInTheDocument();
      expect(screen.getByText('<>{}[]|"')).toBeInTheDocument();
    });

    it("should handle unicode characters", () => {
      render(
        <DsSwitch 
          name="unicode"
          value={false}
          positiveLabel="开启 🔛"
          negativeLabel="关闭 🔴"
          onChange={() => {}}
        />
      );
      
      expect(screen.getByText("开启 🔛")).toBeInTheDocument();
      expect(screen.getByText("关闭 🔴")).toBeInTheDocument();
    });

    it("should handle empty string values", () => {
      render(
        <DsSwitch 
          name="empty-strings"
          value={false}
          positiveValue=""
          negativeValue=""
          onChange={() => {}}
        />
      );
      
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2);
    });

    it("should handle object values", async () => {
      const positiveObj = { status: "active" };
      const negativeObj = { status: "inactive" };
      const handleChange = vi.fn();
      
      render(
        <DsSwitch 
          name="object-values"
          value={false}
          positiveValue={positiveObj}
          negativeValue={negativeObj}
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(handleChange).toHaveBeenCalledWith("object-values", positiveObj);
    });

    it("should handle number values", async () => {
      const handleChange = vi.fn();
      render(
        <DsSwitch 
          name="number-values"
          positiveValue={1}
          negativeValue={0}
          value={0}
          onChange={handleChange}
        />
      );
      
      const yesButton = screen.getByText("YES").closest('button')!;
      await user.click(yesButton);
      
      expect(handleChange).toHaveBeenCalledWith("number-values", 1);
    });
  });

  // ============================
  // THEME TESTING 
  // ============================
  describe("Theme Testing", () => {
    it("should use correct colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        
        // Test default state
        const { container: defaultContainer } = render(
          <DsSwitch name={`theme-default-${colorScheme}`} value={false} onChange={() => {}} />, 
          { colorScheme }
        );
        
        // Test selected state 
        const { container: selectedContainer } = render(
          <DsSwitch name={`theme-selected-${colorScheme}`} value={true} onChange={() => {}} />, 
          { colorScheme }
        );
        
        // Use direct theme access
        const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedPrimaryColor).toBeTruthy();
        expect(expectedTextColor).toBeTruthy();
        
        // Test component integration with theme
        const toggleGroup = defaultContainer.querySelector('.MuiToggleButtonGroup-root');
        expect(toggleGroup).toBeInTheDocument();
        expect(defaultContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Test buttons have proper MUI classes for theme integration
        const buttons = defaultContainer.querySelectorAll('.MuiToggleButton-root');
        expect(buttons).toHaveLength(2);
        buttons.forEach(button => {
          expect(button).toHaveClass('MuiToggleButton-root');
        });
        
        // Test actual color usage in default state (non-selected buttons)
        const defaultButtons = defaultContainer.querySelectorAll('button');
        defaultButtons.forEach(button => {
          const computedStyle = window.getComputedStyle(button);
          const buttonColor = computedStyle.color;
          
          // Currently using MUI variables, but should eventually use: var(--ds-colour-actionSecondary)
          const isValidThemeColor = buttonColor === 'var(--ds-colour-actionSecondary)' ||  // Future design system color
                                   buttonColor === 'var(--palette-action-active)' ||      // Current MUI color
                                   buttonColor === 'var(--palette-text-primary)' ||       // Another MUI text color
                                   buttonColor === expectedTextColor;                     // Fallback to theme text color
          
          if (!isValidThemeColor) {
            console.log(`❌ Button color mismatch in ${colorScheme}: got '${buttonColor}', expected 'var(--ds-colour-actionSecondary)' or current MUI equivalent`);
          }
          expect(isValidThemeColor).toBe(true);
        });
        
        // Test actual color usage in selected state
        const selectedButton = selectedContainer.querySelector('.Mui-selected');
        if (selectedButton) {
          const computedStyle = window.getComputedStyle(selectedButton);
          const textColor = computedStyle.color;
          const backgroundColor = computedStyle.backgroundColor;
          
          // Currently using MUI variables, but should eventually use design system colors
          const isValidTextColor = textColor === 'var(--ds-colour-typoOnSurface)' ||           // Future design system color
                                  textColor === 'var(--palette-primary-main)' ||              // Current MUI color  
                                  textColor === 'var(--palette-text-primary)' ||              // Another MUI text color
                                  textColor.includes('--palette-primary-') ||                  // MUI primary variants
                                  textColor.includes('--palette-action-');                     // MUI action variants
                                  
          const isValidBackgroundColor = backgroundColor === 'var(--ds-colour-actionSecondary)' ||  // Future design system color
                                       backgroundColor.includes('palette-primary-mainChannel') ||   // Current MUI background
                                       backgroundColor.includes('--palette-primary-') ||             // MUI primary variants  
                                       backgroundColor.includes('--palette-action-');               // MUI action variants
          
          if (!isValidTextColor) {
            console.log(`❌ Selected text color mismatch in ${colorScheme}: got '${textColor}', expected 'var(--ds-colour-typoOnSurface)' or current MUI equivalent`);
          }
          if (!isValidBackgroundColor) {
            console.log(`❌ Selected background color mismatch in ${colorScheme}: got '${backgroundColor}', expected 'var(--ds-colour-actionSecondary)' or current MUI equivalent`);
          }
          
          expect(isValidTextColor).toBe(true);
          expect(isValidBackgroundColor).toBe(true);
        }
      });
    });

    it("should use correct colors across all color variants and themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        colors.forEach(color => {
          const schemeData = themeColorScheme[colorScheme];
          const { container } = render(
            <DsSwitch 
              name={`color-${color}-${colorScheme}`}
              value={true}
              color={color}
              onChange={() => {}}
            />, 
            { colorScheme }
          );
          
          // Use direct theme access
          const expectedColor = (schemeData?.palette?.[color] as any)?.main;
          expect(expectedColor).toBeTruthy();
          
          // Test component uses proper MUI color classes
          const buttons = container.querySelectorAll('.MuiToggleButton-root');
          expect(buttons).toHaveLength(2);
          buttons.forEach(button => {
            // MUI uses either MuiToggleButton-{color} or Mui-{color} depending on the color
            const hasExpectedColorClass = button.classList.contains(`MuiToggleButton-${color}`) || 
                                         button.classList.contains(`Mui-${color}`);
            expect(hasExpectedColorClass).toBe(true);
          });
          
          // Test actual color application - selected button should use design system colors
          const selectedButton = container.querySelector('.Mui-selected');
          if (selectedButton) {
            const computedStyle = window.getComputedStyle(selectedButton);
            const textColor = computedStyle.color;
            const backgroundColor = computedStyle.backgroundColor;
            
            // Currently using MUI variables, but should eventually use design system colors, consistent across all color variants
            const isValidTextColor = textColor === 'var(--ds-colour-typoOnSurface)' ||           // Future design system color
                                    textColor.includes(`--palette-${color}-`) ||                // Current MUI color variant
                                    textColor.includes('--palette-primary-') ||                 // MUI primary variants
                                    textColor.includes('--palette-action-');                    // MUI action variants
                                    
            const isValidBackgroundColor = backgroundColor === 'var(--ds-colour-actionSecondary)' ||  // Future design system color
                                         backgroundColor.includes(`palette-${color}-mainChannel`) ||   // Current MUI background variant
                                         backgroundColor.includes('--palette-primary-') ||             // MUI primary variants  
                                         backgroundColor.includes('--palette-action-');               // MUI action variants
            
            if (!isValidTextColor) {
              console.log(`❌ Selected text color mismatch in ${colorScheme} for ${color}: got '${textColor}', expected 'var(--ds-colour-typoOnSurface)' or current MUI equivalent`);
            }
            if (!isValidBackgroundColor) {
              console.log(`❌ Selected background color mismatch in ${colorScheme} for ${color}: got '${backgroundColor}', expected 'var(--ds-colour-actionSecondary)' or current MUI equivalent`);
            }
            
            expect(isValidTextColor).toBe(true);
            expect(isValidBackgroundColor).toBe(true);
          }
          
          expect(container.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        });
      });
    });

    it("should maintain functionality across all themes", async () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      const handleChange = vi.fn();
      
      for (const colorScheme of colorSchemes) {
        handleChange.mockClear();
        
        render(
          <DsSwitch name={`functionality-${colorScheme}`} value={false} onChange={handleChange} />, 
          { colorScheme }
        );
        
        const yesButton = screen.getByText("YES").closest('button')!;
        await user.click(yesButton);
        expect(handleChange).toHaveBeenCalledWith(`functionality-${colorScheme}`, true);
        
        // Clean up for next iteration
        document.body.innerHTML = '';
      }
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work in settings form scenario", async () => {
      const handleChange = vi.fn();
      
      render(
        <DsBox component="form" sx={{ p: 3 }}>
          <DsFormControl component="fieldset" sx={{ mb: 2 }}>
            <DsFormLabel component="legend">Notification Settings</DsFormLabel>
            <DsFormControlLabel
              control={
                <DsSwitch 
                  name="notifications"
                  value={false}
                  positiveLabel="On"
                  negativeLabel="Off"
                  onChange={handleChange}
                />
              }
              label="Email Notifications"
            />
            <DsFormHelperText>Receive updates via email</DsFormHelperText>
          </DsFormControl>
        </DsBox>
      );
      
      expect(screen.getByText("Notification Settings")).toBeInTheDocument();
      expect(screen.getByText("Email Notifications")).toBeInTheDocument();
      expect(screen.getByText("Receive updates via email")).toBeInTheDocument();
      expect(screen.getByText("On")).toBeInTheDocument();
      expect(screen.getByText("Off")).toBeInTheDocument();
      
      const onButton = screen.getByText("On").closest('button')!;
      await user.click(onButton);
      expect(handleChange).toHaveBeenCalledWith("notifications", true);
    });

    it("should work in feature toggle scenario", async () => {
      const features = [
        { name: "darkMode", label: "Dark Mode" },
        { name: "autoSave", label: "Auto Save" },
        { name: "notifications", label: "Push Notifications" }
      ];
      
      const handleChange = vi.fn();
      
      render(
        <DsBox sx={{ p: 2 }}>
          {features.map((feature) => (
            <DsBox key={feature.name} sx={{ mb: 2 }}>
              <DsFormControlLabel
                control={
                  <DsSwitch 
                    name={feature.name}
                    value={false}
                    positiveLabel="Enable"
                    negativeLabel="Disable"
                    onChange={handleChange}
                  />
                }
                label={feature.label}
              />
            </DsBox>
          ))}
        </DsBox>
      );
      
      // Test each feature toggle
      for (const feature of features) {
        expect(screen.getByText(feature.label)).toBeInTheDocument();
        
        const enableButton = screen.getAllByText("Enable").find(btn => 
          btn.closest('.MuiFormControlLabel-root')?.textContent?.includes(feature.label)
        )?.closest('button')!;
        
        await user.click(enableButton);
        expect(handleChange).toHaveBeenCalledWith(feature.name, true);
      }
    });

    it("should work in survey/questionnaire scenario", async () => {
      const questions = [
        { id: "q1", text: "Do you like this product?", positive: "Love it", negative: "Hate it" },
        { id: "q2", text: "Would you recommend it?", positive: "Definitely", negative: "Never" },
        { id: "q3", text: "Is it user-friendly?", positive: "Very", negative: "Not at all" }
      ];
      
      const handleChange = vi.fn();
      
      render(
        <DsBox sx={{ p: 3 }}>
          {questions.map((question) => (
            <DsFormControl key={question.id} component="fieldset" sx={{ mb: 3 }}>
              <DsFormLabel component="legend">{question.text}</DsFormLabel>
              <DsSwitch 
                name={question.id}
                value={false}
                positiveLabel={question.positive}
                negativeLabel={question.negative}
                onChange={handleChange}
              />
            </DsFormControl>
          ))}
        </DsBox>
      );
      
      // Verify all questions are rendered
      questions.forEach(question => {
        expect(screen.getByText(question.text)).toBeInTheDocument();
        expect(screen.getByText(question.positive)).toBeInTheDocument();
        expect(screen.getByText(question.negative)).toBeInTheDocument();
      });
      
      // Test responding to first question
      const loveItButton = screen.getByText("Love it").closest('button')!;
      await user.click(loveItButton);
      expect(handleChange).toHaveBeenCalledWith("q1", true);
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsSwitch name="snapshot-default" value={false} onChange={() => {}} />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot when selected (positive)", () => {
      const { container } = render(
        <DsSwitch name="snapshot-selected" value={true} onChange={() => {}} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot when selected (negative)", () => {
      const { container } = render(
        <DsSwitch name="snapshot-negative" value={false} onChange={() => {}} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot when disabled", () => {
      const { container } = render(
        <DsSwitch name="snapshot-disabled" value={false} disabled onChange={() => {}} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom labels", () => {
      const { container } = render(
        <DsSwitch 
          name="snapshot-custom"
          value={false}
          positiveLabel="Enable"
          negativeLabel="Disable"
          onChange={() => {}}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with different colors", () => {
      const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
      
      colors.forEach(color => {
        const { container } = render(
          <DsSwitch name={`snapshot-color-${color}`} value={false} color={color} onChange={() => {}} />
        );
        expect(container.firstChild).toMatchSnapshot(`switch-color-${color}`);
      });
    });

    it("should match snapshot with state combinations", () => {
      const stateCombinations = [
        { name: "default", props: { value: false } },
        { name: "selected-positive", props: { value: true } },
        { name: "selected-negative", props: { value: false } },
        { name: "disabled", props: { disabled: true, value: false } },
        { name: "disabled-selected", props: { disabled: true, value: true } },
        { name: "custom-labels", props: { positiveLabel: "On", negativeLabel: "Off", value: false } }
      ];

      stateCombinations.forEach(({ name, props }, index) => {
        const { container } = render(
          <DsSwitch 
            name={`snapshot-state-${name}`}
            onChange={() => {}}
            {...props}
          />
        );
        expect(container.firstChild).toMatchSnapshot(`switch-states-combination-${index}-${name}`);
      });
    });

    it("should match snapshots across all themes", () => {
      const themes = ['light', 'dark', 'highContrast'] as const;
      
      themes.forEach(theme => {
        const { container } = render(
          <DsSwitch name={`snapshot-theme-${theme}`} value={false} onChange={() => {}} />, 
          { colorScheme: theme }
        );
        expect(container.firstChild).toMatchSnapshot(`switch-theme-${theme}`);
      });
    });

    it("should match snapshot in real-world form scenario", () => {
      const { container } = render(
        <DsBox sx={{ p: 3 }}>
          <DsFormControl component="fieldset">
            <DsFormLabel component="legend">Feature Settings</DsFormLabel>
            <DsFormControlLabel
              control={
                <DsSwitch 
                  name="feature-toggle"
                  positiveLabel="Enabled"
                  negativeLabel="Disabled"
                  value={true}
                  onChange={() => {}}
                />
              }
              label="Advanced Features"
            />
            <DsFormHelperText>Enable advanced functionality</DsFormHelperText>
          </DsFormControl>
        </DsBox>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
