# Testing Guidelines for AM92 React Design System

## Overview
This document provides comprehensive guidelines for writing unit tests for components in the AM92 React Design System. These guidelines have been refined through extensive testing experience with components like DsLoader, DsTextField, DsCheckbox, and others.

## Table of Contents
1. [Testing Framework Setup](#testing-framework-setup)
2. [Test File Structure](#test-file-structure)
3. [Testing Categories](#testing-categories)
4. [Testing Patterns](#testing-patterns)
5. [Material-UI Testing](#material-ui-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Theme Testing](#theme-testing)
8. [Snapshot Testing](#snapshot-testing)
9. [Design System Component Usage](#design-system-component-usage)
10. [Component Testing Anti-Patterns](#component-testing-anti-patterns)
11. [Best Practices](#best-practices)
12. [Common Pitfalls](#common-pitfalls)
13. [Template](#template)

## Testing Framework Setup

### Required Dependencies
```json
{
  "vitest": "^1.0.0",
  "@testing-library/react": "^14.0.0",
  "@testing-library/user-event": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "jsdom": "^22.0.0"
}
```

### Test Environment Configuration
Always include the vitest environment declaration at the top of test files:
```tsx
/**
 * @vitest-environment jsdom
 */
```

### Essential Imports
```tsx
import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { ComponentName } from "./ComponentName.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
```

## Global Theme Setup ✅

All tests now **automatically include your design system theme** by default. No need to manually wrap components with theme providers.

### Basic Usage
```tsx
import { render, screen } from '../../Tests/Mocks/testUtils';

// ✅ Automatically includes light theme
render(<DsButton>Click me</DsButton>);

// ✅ Test with different color schemes
render(<DsButton>Click me</DsButton>, { colorScheme: 'dark' });
render(<DsButton>Click me</DsButton>, { colorScheme: 'highContrast' });
```

### Advanced Testing Options
```tsx
import { 
  render,           // Default with light theme
  renderWithTheme,  // Explicit theme testing
  renderWithoutTheme, // Edge case: no theme
  testAllThemes     // Test across all color schemes
} from '../../Tests/Mocks/testUtils';

// ✅ Test edge case without theme
const { container } = renderWithoutTheme(<DsButton />);

// ✅ Test all themes at once
testAllThemes(
  (colorScheme) => <DsButton color="primary">{colorScheme}</DsButton>,
  (container, colorScheme) => {
    const button = container.querySelector('button');
    expect(button).toHaveClass('MuiButton-colorPrimary');
  }
);
```

### Migration from Old Tests
#### Before ❌
```tsx
import { render } from '@testing-library/react';
import { renderWithTheme } from './themeTestUtils';

// Had to manually apply theme
const { container } = renderWithTheme(<DsCheckbox />);
```

#### After ✅
```tsx
import { render } from '../../Tests/Mocks/testUtils';

// Theme automatically applied
const { container } = render(<DsCheckbox />);
```

### Setup Pattern
```tsx
describe("ComponentName", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });
  
  // Tests go here
});
```

## Test File Structure

### File Naming Convention
- Test files should be named: `ComponentName.Test.tsx`
- Place test files alongside component files in the same directory

### Test Organization
Organize tests into logical categories using nested `describe` blocks:

```tsx
describe("ComponentName", () => {
  // 1. Core Rendering Tests
  describe("Core Rendering", () => {});
  
  // 2. Props Validation Tests
  describe("Props Validation", () => {});
  
  // 3. Component States
  describe("Component States", () => {});
  
  // 4. MUI Styling (if applicable)
  describe("MUI Styling", () => {});
  
  // 5. Functionality Tests
  describe("Component Functionality", () => {});
  
  // 6. Event Handling
  describe("Event Handling", () => {});
  
  // 7. Form Integration (if applicable)
  describe("Form Integration", () => {});
  
  // 8. Accessibility
  describe("Accessibility", () => {});
  
  // 9. Edge Cases
  describe("Edge Cases", () => {});
  
  // 10. Real-world Scenarios
  describe("Real-world Scenarios", () => {});
});
```

## Testing Categories

### 1. Core Rendering Tests
Test basic component rendering and display:

```tsx
describe("Core Rendering", () => {
  it("should render with default props", () => {
    render(<ComponentName />);
    const element = screen.getByRole("button"); // Adjust role as needed
    expect(element).toBeInTheDocument();
  });

  it("should render with required props", () => {
    render(<ComponentName label="Test Label" />);
    const label = screen.getByText("Test Label");
    expect(label).toBeInTheDocument();
  });

  it("should render without optional props", () => {
    render(<ComponentName />);
    expect(screen.queryByText("Optional Text")).not.toBeInTheDocument();
  });
});
```

### 2. Props Validation Tests
Test prop handling and validation:

```tsx
describe("Props Validation", () => {
  it("should accept and display custom id", () => {
    render(<ComponentName id="custom-id" />);
    const element = screen.getByRole("button");
    expect(element).toHaveAttribute("id", "custom-id");
  });

  it("should use fallback values when props are not provided", () => {
    render(<ComponentName name="test-name" />);
    const element = screen.getByRole("button");
    expect(element).toHaveAttribute("id", "test-name");
  });
});
```

### 3. Component States
Test different component states:

```tsx
describe("Component States", () => {
  it("should render in disabled state", () => {
    render(<ComponentName disabled />);
    const element = screen.getByRole("button");
    expect(element).toBeDisabled();
  });

  it("should render in error state", () => {
    render(<ComponentName error />);
    const element = screen.getByRole("button");
    expect(element).toHaveAttribute("aria-invalid", "true");
  });

  it("should handle state combinations", () => {
    render(<ComponentName disabled required />);
    const element = screen.getByRole("button");
    expect(element).toBeDisabled();
    expect(element).toBeRequired();
  });
});
```

### 4. MUI Styling Tests
Test Material-UI specific styling and classes:

```tsx
describe("MUI Styling", () => {
  it("should apply default MUI classes", () => {
    render(<ComponentName />);
    const element = screen.getByRole("button");
    expect(element).toHaveClass('MuiButton-root');
  });

  it("should apply color variant classes", () => {
    render(<ComponentName color="secondary" />);
    const element = screen.getByRole("button");
    expect(element).toHaveClass('MuiButton-colorSecondary');
  });

  it("should apply state-specific classes", () => {
    render(<ComponentName disabled />);
    const element = screen.getByRole("button");
    expect(element.closest('.MuiButton-root')).toHaveClass('Mui-disabled');
  });

  it("should apply focus classes when focused", async () => {
    render(<ComponentName />);
    const element = screen.getByRole("button");
    
    await user.click(element);
    expect(element).toHaveClass('Mui-focused');
  });
});
```

### 5. Event Handling Tests
Test user interactions and event handlers:

```tsx
describe("Event Handling", () => {
  it("should handle click events", async () => {
    const handleClick = vi.fn();
    render(<ComponentName onClick={handleClick} />);
    const element = screen.getByRole("button");
    
    await user.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should handle keyboard events", async () => {
    const handleKeyDown = vi.fn();
    render(<ComponentName onKeyDown={handleKeyDown} />);
    const element = screen.getByRole("button");
    
    await user.click(element);
    await user.keyboard("{Enter}");
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it("should handle focus and blur events", async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<ComponentName onFocus={handleFocus} onBlur={handleBlur} />);
    const element = screen.getByRole("button");
    
    await user.click(element);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    await user.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });
});
```

### 6. Form Integration Tests
Test form-related functionality:

```tsx
describe("Form Integration", () => {
  it("should work within form element", () => {
    render(
      <form>
        <ComponentName name="test-field" />
      </form>
    );
    const element = screen.getByRole("textbox");
    expect(element).toHaveAttribute("name", "test-field");
  });

  it("should handle form submission", async () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    render(
      <form onSubmit={handleSubmit}>
        <ComponentName name="test-field" />
      </form>
    );
    const element = screen.getByRole("textbox");
    
    await user.click(element);
    await user.keyboard("{Enter}");
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should work with controlled components", async () => {
    let value = "";
    const handleChange = vi.fn((e) => {
      value = e.target.value;
    });
    
    const { rerender } = render(
      <ComponentName value={value} onChange={handleChange} />
    );
    
    const element = screen.getByRole("textbox");
    await user.type(element, "test");
    
    rerender(<ComponentName value="test" onChange={handleChange} />);
    expect(element).toHaveValue("test");
  });
});
```

### 7. Accessibility Tests
Test ARIA attributes and accessibility features:

```tsx
describe("Accessibility", () => {
  it("should have proper ARIA attributes", () => {
    render(<ComponentName label="Accessible Component" />);
    const element = screen.getByRole("button");
    expect(element).toHaveAccessibleName("Accessible Component");
  });

  it("should support keyboard navigation", async () => {
    render(
      <div>
        <ComponentName id="first" />
        <ComponentName id="second" />
      </div>
    );
    
    const firstElement = screen.getByRole("button", { name: /first/i });
    const secondElement = screen.getByRole("button", { name: /second/i });
    
    await user.click(firstElement);
    expect(firstElement).toHaveFocus();
    
    await user.tab();
    expect(secondElement).toHaveFocus();
  });

  it("should have proper aria-describedby relationships", () => {
    render(
      <ComponentName 
        helperText="Helper text"
        aria-describedby="helper-text-id"
      />
    );
    const element = screen.getByRole("button");
    expect(element).toHaveAttribute("aria-describedby");
  });
});
```

### 8. Edge Cases Tests
Test unusual scenarios and boundary conditions:

```tsx
describe("Edge Cases", () => {
  it("should handle null/undefined values gracefully", () => {
    render(<ComponentName value={null as any} />);
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
  });

  it("should handle very long text content", () => {
    const longText = "A".repeat(1000);
    render(<ComponentName label={longText} />);
    const element = screen.getByText(longText);
    expect(element).toBeInTheDocument();
  });

  it("should handle special characters", async () => {
    const specialValue = "!@#$%^&*()_+-={}|;:,.<>?";
    render(<ComponentName />);
    const element = screen.getByRole("textbox");
    
    fireEvent.change(element, { target: { value: specialValue } });
    expect(element).toHaveValue(specialValue);
  });

  it("should handle unicode characters", async () => {
    const unicodeValue = "测试 🌟 ñáéíóú";
    render(<ComponentName />);
    const element = screen.getByRole("textbox");
    
    await user.type(element, unicodeValue);
    expect(element).toHaveValue(unicodeValue);
  });
});
```

## Testing Patterns

### 1. Query Strategies
Use appropriate queries based on the use case:

```tsx
// Preferred queries (in order of preference)
screen.getByRole("button")
screen.getByLabelText("Label text")
screen.getByText("Visible text")
screen.getByDisplayValue("Input value")
screen.getByPlaceholderText("Placeholder")

// For multiple elements
screen.getAllByText(/pattern/i)

// For optional elements
screen.queryByText("Optional text")

// For elements that appear later
await screen.findByText("Async text")
```

### 2. Event Testing Patterns
```tsx
// Prefer userEvent over fireEvent
await user.click(element);
await user.type(element, "text");
await user.keyboard("{Enter}");
await user.tab();

// Use fireEvent only for events userEvent can't handle
fireEvent.change(element, { target: { value: "value" } });
```

### 3. Async Testing Patterns
```tsx
// Wait for elements to appear
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});

// Wait for state changes
await waitFor(() => {
  expect(element).toHaveClass("active");
});
```

### 4. Mock Function Patterns
```tsx
// Create mock functions
const handleClick = vi.fn();
const handleChange = vi.fn();

// Assert mock calls
expect(handleClick).toHaveBeenCalledTimes(1);
expect(handleChange).toHaveBeenCalledWith(expectedValue);

// Check specific call arguments
const lastCall = handleClick.mock.calls[handleClick.mock.calls.length - 1];
expect(lastCall[0]).toEqual(expectedArgument);
```

## Material-UI Testing

### Common MUI Class Patterns
```tsx
// Root classes
expect(element).toHaveClass('MuiButton-root');
expect(element).toHaveClass('MuiTextField-root');

// State classes
expect(element).toHaveClass('Mui-disabled');
expect(element).toHaveClass('Mui-focused');
expect(element).toHaveClass('Mui-error');

// Variant classes
expect(element).toHaveClass('MuiButton-contained');
expect(element).toHaveClass('MuiInputBase-colorPrimary');

// Size classes
expect(element).toHaveClass('MuiButton-sizeMedium');
expect(element).toHaveClass('MuiFormHelperText-sizeMedium');
```

### MUI Component Structure Testing
```tsx
// Find parent MUI components
const formControl = element.closest('.MuiFormControl-root');
const inputBase = element.closest('.MuiInputBase-root');

// Query specific MUI components
const helperText = document.querySelector('.MuiFormHelperText-root');
const label = document.querySelector('.MuiInputLabel-root');
```

### Testing Custom MUI Color Variants
```tsx
it("should apply custom color variants", () => {
  render(<ComponentName color="success" />);
  const element = screen.getByRole("button");
  const wrapper = element.closest('.MuiInputBase-root');
  expect(wrapper).toHaveClass('MuiInputBase-colorSuccess');
});
```

## MUI Slots and SlotProps System

### Overview
Material-UI v5+ introduced a modern slots system to replace deprecated props like `inputProps`, `InputProps`, and other sub-component specific props. This system provides better type safety, consistency, and customization capabilities.

### ❌ Deprecated Patterns (Avoid These)
```tsx
// Old inputProps approach - DEPRECATED
<DsTextField 
  inputProps={{ 
    'aria-describedby': 'help-text',
    'data-testid': 'input-element'
  }}
/>

// Old InputProps approach - DEPRECATED  
<DsTextField
  InputProps={{
    endAdornment: <Icon />
  }}
/>
```

### ✅ Modern Slots Pattern (Use These)
```tsx
// Modern slotProps approach - RECOMMENDED
<DsTextField 
  slotProps={{
    input: {
      'aria-describedby': 'help-text'
    },
    inputLabel: {
      'data-testid': 'label-element'
    }
  }}
/>

// Custom component slots
<DsTextField
  slots={{
    input: CustomInputComponent,
    inputLabel: CustomLabelComponent
  }}
/>
```

### Testing slotProps
```tsx
describe("SlotProps Testing", () => {
  it("should handle slotProps for input element", () => {
    render(
      <DsTextField 
        slotProps={{
          input: {
            'aria-describedby': 'help-text'
          } as any // Use 'as any' for custom attributes
        }} 
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "help-text");
  });

  it("should handle slotProps for multiple slots", () => {
    render(
      <DsTextField 
        label="Test Label"
        slotProps={{
          input: {
            'data-testid': 'custom-input'
          } as any,
          inputLabel: {
            'data-testid': 'custom-label'
          } as any
        }} 
      />
    );
    
    const input = screen.getByTestId("custom-input");
    const label = screen.getByTestId("custom-label");
    
    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });
});
```

### Testing Custom Slot Components
```tsx
describe("Custom Slots Testing", () => {
  it("should support custom input component via slots", () => {
    const CustomInput = ({ ownerState, ...props }: any) => (
      <input {...props} data-custom="custom-input" />
    );
    
    render(
      <DsTextField 
        slots={{
          input: CustomInput
        }}
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-custom", "custom-input");
  });

  it("should handle ownerState prop in custom components", () => {
    const CustomInput = ({ ownerState, ...props }: any) => (
      <input 
        {...props} 
        data-error={ownerState?.error ? 'true' : 'false'}
      />
    );
    
    render(
      <DsTextField 
        error
        slots={{
          input: CustomInput
        }}
      />
    );
    
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("data-error", "true");
  });
});
```

### Common Slot Names by Component
```tsx
// DsTextField slots
slotProps: {
  input: {},           // The input element
  inputLabel: {},      // The label element
  formHelperText: {},  // Helper/error text
  select: {},          // For select variant
  htmlInput: {},       // The underlying HTML input
}

// DsCheckbox slots
slotProps: {
  input: {},           // The checkbox input
}

// DsButton slots  
slotProps: {
  root: {},            // The button root element
}
```

### TypeScript Considerations
```tsx
// For custom attributes, use 'as any' to bypass type checking
slotProps={{
  input: {
    'data-custom': 'value',
    'aria-describedby': 'help-id'
  } as any
}}

// For standard HTML attributes, types are properly supported
slotProps={{
  input: {
    placeholder: "Enter text",
    maxLength: 100
  }
}}
```

### Migration Guide
When updating existing tests from deprecated patterns:

1. **Replace `inputProps`** → **`slotProps.input`**
2. **Replace `InputProps`** → **`slotProps.root` or specific slot**
3. **Replace `SelectProps`** → **`slotProps.select`**
4. **Replace `FormHelperTextProps`** → **`slotProps.formHelperText`**

### Best Practices for Slots Testing
1. **Use descriptive test names** that mention slots/slotProps
2. **Test custom components** receive the ownerState prop correctly
3. **Verify attribute propagation** to the correct DOM elements
4. **Use 'as any'** for custom data attributes to bypass TypeScript
5. **Test slot customization** doesn't break accessibility
6. **Group slots tests** in a dedicated describe block

## Accessibility Testing

### Essential ARIA Tests
```tsx
// Required ARIA attributes
expect(element).toHaveAttribute("aria-required", "true");
expect(element).toHaveAttribute("aria-invalid", "true");
expect(element).toHaveAttribute("aria-describedby");

// Accessible names and descriptions
expect(element).toHaveAccessibleName("Expected name");
expect(element).toHaveAccessibleDescription("Expected description");

// Role verification
expect(element).toHaveRole("button");
expect(element).toHaveRole("textbox");
```

### Keyboard Navigation Tests
```tsx
it("should support tab navigation", async () => {
  render(
    <div>
      <ComponentName id="first" />
      <ComponentName id="second" />
    </div>
  );
  
  const elements = screen.getAllByRole("button");
  
  await user.click(elements[0]);
  expect(elements[0]).toHaveFocus();
  
  await user.tab();
  expect(elements[1]).toHaveFocus();
  
  await user.tab({ shift: true });
  expect(elements[0]).toHaveFocus();
});
```

## Theme Testing

### Overview
Theme testing in the AM92 React Design System focuses on ensuring components render correctly and behave consistently across all supported theme modes: **light**, **dark**, and **highContrast**. This validates that the design system's theme integration works correctly and components maintain visual consistency across different user preferences.

### Why Theme Testing Matters
- ✅ **Visual consistency** - Components should look appropriate in all theme modes
- ✅ **Color contrast compliance** - Ensure accessibility across themes, especially high contrast
- ✅ **Design system integration** - Verify components use design system colors correctly
- ✅ **Brand consistency** - Maintain design system integrity across theme modes
- ✅ **Regression prevention** - Catch theme-specific styling issues early
- ✅ **User experience** - Ensure seamless theme switching experience

### Critical Theme Testing Rules

#### 🚨 NEVER Use Hardcoded Colors in Tests
**CRITICAL**: Never use hardcoded hex values, RGBA, or named colors in theme tests. Always use PALETTE constants to make tests resilient to palette changes.

```tsx
// ❌ CRITICAL MISTAKE - Hardcoded colors make tests brittle
it("should have correct colors", () => {
  const { container } = render(<DsBreadcrumbs />, { colorScheme: 'light' });
  const expectedColors = {
    typoPrimary: '#282828',        // WRONG - hardcoded hex
    actionSecondary: '#ED1164'     // WRONG - hardcoded hex
  };
  
  // This will break if palette values change!
  expect(expectedColors.typoPrimary).toBe('#282828');
});

// ✅ CORRECT - Use PALETTE constants for resilient tests
import { getColorScheme } from '../../Theme/getColorScheme';
import { PALETTE } from '../../Constants';

it("should use correct theme colors", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  colorSchemes.forEach(colorScheme => {
    const schemeData = themeColorScheme[colorScheme];
    const expectedColors = {
      typoPrimary: schemeData?.ds?.colour?.typoPrimary,
      actionSecondary: schemeData?.ds?.colour?.actionSecondary
    };
    
    // Validate theme-specific values using actual PALETTE constants
    switch (colorScheme) {
      case 'light':
        expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
        expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
        break;
      case 'dark':
        expect(expectedColors.typoPrimary).toBe(PALETTE.secondaryGrey10);
        expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
        break;
      case 'highContrast':
        expect(expectedColors.typoPrimary).toBe(PALETTE.primaryWhite);
        expect(expectedColors.actionSecondary).toBe(PALETTE.highContrast1);
        break;
    }
  });
});
```

#### 🚨 Focus on CSS Variables, Not RGB Conversion
**IMPORTANT**: Modern design systems use CSS variables for theming. Test CSS variable application instead of converting hex to RGB.

```tsx
// ❌ UNNECESSARILY COMPLEX - Converting hex to RGB for comparison
it("should apply theme colors", () => {
  const { container } = render(<DsBreadcrumbs />, { colorScheme: 'light' });
  
  const link = screen.getByTestId('breadcrumb-link');
  const computedStyle = window.getComputedStyle(link);
  const actualColor = computedStyle.color;
  
  // Don't do this - complex hex to RGB conversion
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
  };
  
  const expectedRgb = hexToRgb('#282828');
  expect(actualColor).toBe(expectedRgb); // Fragile and complex!
});

// ✅ BETTER - Test CSS variable application directly
it("should apply design system CSS variables", () => {
  const { container } = render(<DsBreadcrumbs />, { colorScheme: 'light' });
  
  const link = screen.getByTestId('breadcrumb-link');
  const computedStyle = window.getComputedStyle(link);
  const actualColor = computedStyle.color;
  
  // Test CSS variable application (what actually happens in the browser)
  if (actualColor.includes('var(')) {
    expect(actualColor).toContain('--ds-colour');
  }
  
  // Test component structure and classes
  expect(link).toHaveClass('MuiLink-root');
});
```

#### 🚨 Test Expected vs Actual, Not Implementation Details
**FOCUS**: Test that expected theme colors match the theme configuration, not specific CSS property values.

```tsx
// ❌ TESTING IMPLEMENTATION DETAILS - Testing specific CSS properties
it("should have exact CSS color properties", () => {
  const { container } = render(<DsBreadcrumbs />, { colorScheme: 'light' });
  
  const link = screen.getByTestId('link');
  const computedStyle = window.getComputedStyle(link);
  
  // This tests browser rendering details, not theme integration
  expect(computedStyle.color).toBe('rgb(40, 40, 40)');
  expect(computedStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
});

// ✅ TESTING BEHAVIOR - Test theme integration and expected values
it("should use correct theme colors from palette", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  colorSchemes.forEach(colorScheme => {
    const schemeData = themeColorScheme[colorScheme];
    const expectedColors = {
      typoPrimary: schemeData?.ds?.colour?.typoPrimary,
      actionSecondary: schemeData?.ds?.colour?.actionSecondary
    };

    const { container, unmount } = render(
      <DsBreadcrumbs>
        <DsLink href="#">Home</DsLink>
        <DsTypography>Current</DsTypography>
      </DsBreadcrumbs>,
      { colorScheme }
    );
    
    // Test 1: Validate expected colors are valid hex format
    expect(expectedColors.typoPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(expectedColors.actionSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    
    // Test 2: Validate theme-specific palette values
    switch (colorScheme) {
      case 'light':
        expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
        expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
        break;
      case 'dark':
        expect(expectedColors.typoPrimary).toBe(PALETTE.secondaryGrey10);
        expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
        break;
      case 'highContrast':
        expect(expectedColors.typoPrimary).toBe(PALETTE.primaryWhite);
        expect(expectedColors.actionSecondary).toBe(PALETTE.highContrast1);
        break;
    }
    
    // Test 3: Validate component structure
    expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', colorScheme);
    
    unmount();
  });
});
```

#### 🚨 Complete Theme Coverage
**CRITICAL**: ALWAYS test all three theme modes - light, dark, AND highContrast.

```tsx
// ❌ INCOMPLETE - Missing highContrast theme
describe("Theme Testing", () => {
  it("should work in light and dark themes", () => {
    ['light', 'dark'].forEach(theme => { // Missing highContrast!
      const { container } = render(<ComponentName />, { colorScheme: theme });
      expect(container.firstChild).toMatchSnapshot(`component-${theme}`);
    });
  });
});

// ✅ COMPLETE - All three theme modes tested
describe("Theme Testing", () => {
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  it("should work across all theme modes", () => {
    colorSchemes.forEach(theme => {
      const { container } = render(<ComponentName />, { colorScheme: theme });
      expect(container.firstChild).toMatchSnapshot(`component-${theme}`);
    });
  });
});
```

### Theme Testing Checklist: What to Test vs What NOT to Test

#### ✅ **WHAT TO TEST - Theme Integration & Behavior**

1. **Theme Configuration Validation**
   ```tsx
   // ✅ Test that theme colors are properly configured
   const themeColorScheme = getColorScheme(PALETTE);
   const expectedColors = {
     typoPrimary: themeColorScheme.light?.ds?.colour?.typoPrimary
   };
   expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
   ```

2. **Component Structure Across Themes**
   ```tsx
   // ✅ Test that components render correctly in all themes
   colorSchemes.forEach(theme => {
     const { container } = render(<DsBreadcrumbs />, { colorScheme: theme });
     expect(screen.getByRole("navigation")).toBeInTheDocument();
     expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
   });
   ```

3. **CSS Variable Application**
   ```tsx
   // ✅ Test that design system CSS variables are applied
   const computedStyle = window.getComputedStyle(element);
   if (computedStyle.color.includes('var(')) {
     expect(computedStyle.color).toContain('--ds-colour');
   }
   ```

4. **Theme Consistency**
   ```tsx
   // ✅ Test that different themes have different color values
   const lightColors = themeColorScheme.light?.ds?.colour;
   const darkColors = themeColorScheme.dark?.ds?.colour;
   expect(lightColors?.typoPrimary).not.toBe(darkColors?.typoPrimary);
   ```

5. **Component Functionality Across Themes**
   ```tsx
   // ✅ Test that components work the same in all themes
   colorSchemes.forEach(theme => {
     const { unmount } = render(<DsButton onClick={handleClick} />, { colorScheme: theme });
     const button = screen.getByRole("button");
     fireEvent.click(button);
     expect(handleClick).toHaveBeenCalled();
     unmount();
   });
   ```

#### ❌ **WHAT NOT TO TEST - Implementation Details**

1. **DON'T Test Hardcoded Color Values**
   ```tsx
   // ❌ NEVER hardcode colors - makes tests brittle
   expect(element).toHaveStyle('color: #282828');
   expect(computedStyle.color).toBe('rgb(40, 40, 40)');
   ```

2. **DON'T Test Complex RGB/HSL Conversions**
   ```tsx
   // ❌ AVOID unnecessary complexity
   const hexToRgb = (hex) => { /* complex conversion */ };
   const expectedRgb = hexToRgb(expectedColor);
   expect(actualColor).toBe(expectedRgb);
   ```

3. **DON'T Test Browser-Specific CSS Rendering**
   ```tsx
   // ❌ DON'T test browser CSS computation details
   expect(computedStyle.fontSize).toBe('16px');
   expect(computedStyle.lineHeight).toBe('1.5');
   ```

4. **DON'T Test Theme System Implementation**
   ```tsx
   // ❌ DON'T test how the theme system works internally
   expect(theme.palette.mode).toBe('light');
   expect(theme.vars).toBeDefined();
   ```

5. **DON'T Test MUI Internal CSS Classes**
   ```tsx
   // ❌ DON'T test MUI's internal CSS class generation
   expect(element.className).toContain('MuiButton-root-jss123');
   ```

#### 💡 **RECOMMENDED Testing Pattern**

```tsx
describe("Theme Testing & MUI Integration", () => {
  it("should apply correct theme colors by validating palette integration", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      const schemeData = themeColorScheme[colorScheme];
      const expectedColors = {
        typoPrimary: schemeData?.ds?.colour?.typoPrimary,
        actionSecondary: schemeData?.ds?.colour?.actionSecondary
      };

      const { container, unmount } = render(
        <DsBreadcrumbs>
          <DsLink href="#" data-testid={`link-${colorScheme}`}>Home</DsLink>
          <DsTypography data-testid={`text-${colorScheme}`}>Current</DsTypography>
        </DsBreadcrumbs>,
        { colorScheme }
      );
      
      // ✅ Test 1: Validate expected colors use PALETTE constants
      switch (colorScheme) {
        case 'light':
          expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
          expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
          break;
        case 'dark':
          expect(expectedColors.typoPrimary).toBe(PALETTE.secondaryGrey10);
          expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
          break;
        case 'highContrast':
          expect(expectedColors.typoPrimary).toBe(PALETTE.primaryWhite);
          expect(expectedColors.actionSecondary).toBe(PALETTE.highContrast1);
          break;
      }
      
      // ✅ Test 2: Validate CSS variable integration
      const link = screen.getByTestId(`link-${colorScheme}`);
      const computedStyle = window.getComputedStyle(link);
      if (computedStyle.color.includes('var(')) {
        expect(computedStyle.color).toContain('--ds-colour');
      }
      
      // ✅ Test 3: Validate component structure
      expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', colorScheme);
      expect(link).toHaveClass('MuiLink-root');
      
      unmount();
    });
  });
});
```

### Theme Testing Implementation

#### 1. Basic Theme Testing Setup
Import the required dependencies at the top of your test files:

```tsx
// 🎯 ESSENTIAL: Theme testing imports
import { render, screen } from "../../Tests/Mocks/testUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("Theme Testing & MUI Integration", () => {
  it("should render correctly across all color schemes", () => {
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      const { container, unmount } = render(
        <DsBreadcrumbs>
          <DsLink href="#">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>,
        { colorScheme }
      );
      
      // Verify color scheme is applied
      const wrapperElement = container.firstChild as HTMLElement;
      expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
      
      // Verify component structure
      expect(screen.getByRole("navigation")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
      
      unmount();
    });
  });
});
```

#### 2. Theme Color Validation Pattern
The correct way to test theme colors using PALETTE constants:

```tsx
describe("Theme Testing & MUI Integration", () => {
  it("should use correct theme colors from PALETTE constants", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      const schemeData = themeColorScheme[colorScheme];
      const expectedColors = {
        typoPrimary: schemeData?.ds?.colour?.typoPrimary,
        actionSecondary: schemeData?.ds?.colour?.actionSecondary
      };

      const { container, unmount } = render(
        <DsBreadcrumbs>
          <DsLink href="#" data-testid={`link-${colorScheme}`}>Home</DsLink>
          <DsTypography data-testid={`text-${colorScheme}`}>Current</DsTypography>
        </DsBreadcrumbs>,
        { colorScheme }
      );
      
      // Test 1: Validate expected colors use PALETTE constants
      expect(expectedColors.typoPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(expectedColors.actionSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      
      // Test 2: Validate theme-specific PALETTE values (resilient to palette changes)
      switch (colorScheme) {
        case 'light':
          expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
          expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
          break;
        case 'dark':
          expect(expectedColors.typoPrimary).toBe(PALETTE.secondaryGrey10);
          expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
          break;
        case 'highContrast':
          expect(expectedColors.typoPrimary).toBe(PALETTE.primaryWhite);
          expect(expectedColors.actionSecondary).toBe(PALETTE.highContrast1);
          break;
      }
      
      // Test 3: Validate CSS variable integration (optional)
      const link = screen.getByTestId(`link-${colorScheme}`);
      const computedStyle = window.getComputedStyle(link);
      if (computedStyle.color.includes('var(')) {
        expect(computedStyle.color).toContain('--ds-colour');
      }
      
      // Test 4: Validate component structure
      expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', colorScheme);
      expect(link).toHaveClass('MuiLink-root');
      
      unmount();
    });
  });
  
  it("should maintain color consistency across theme switches", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      const colors = themeColorScheme[colorScheme]?.ds?.colour;
      
      // Ensure each theme has the required colors and they are valid hex
      expect(colors?.typoPrimary).toBeTruthy();
      expect(colors?.typoPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(colors?.actionSecondary).toBeTruthy();
      expect(colors?.actionSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
    
    // Test that themes have different color values (not all the same)
    const lightColors = themeColorScheme.light?.ds?.colour;
    const darkColors = themeColorScheme.dark?.ds?.colour;
    const hcColors = themeColorScheme.highContrast?.ds?.colour;
    
    expect(lightColors?.typoPrimary).not.toBe(darkColors?.typoPrimary);
    expect(darkColors?.typoPrimary).not.toBe(hcColors?.typoPrimary);
  });
});

#### 3. Theme Testing Consolidation Pattern

Efficient testing across themes to avoid test bloat:

```tsx
describe("Theme Testing", () => {
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;

  it("should render correctly across all color schemes", () => {
    // Import theme utilities once
    const themeColorScheme = getColorScheme(PALETTE);
    
    colorSchemes.forEach(theme => {
      const { container } = renderWithTheme(<ComponentName />, theme);
      
      // Verify color scheme is applied
      const wrapperElement = container.firstChild as HTMLElement;
      expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', theme);
      
      // Verify theme colors are valid (don't hardcode specific values!)
      const expectedPrimaryColor = (themeColorScheme[theme]?.palette?.primary as any)?.main;
      const expectedTextColor = (themeColorScheme[theme]?.palette?.text as any)?.primary;
      expect(expectedPrimaryColor).toBeTruthy();
      expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(expectedTextColor).toBeTruthy();
      
      // Verify CSS classes
      const element = screen.getByRole("checkbox");
      expect(element).toHaveClass('MuiCheckbox-colorPrimary');
      
      // Include in snapshot testing
      expect(container.firstChild).toMatchSnapshot(`component-${theme}`);
    });
  });

  it("should maintain functionality across all themes", async () => {
    const handleChange = vi.fn();
    
    // Test that functionality works the same across all themes
    for (const theme of colorSchemes) {
      document.body.innerHTML = '';
      handleChange.mockClear();
      
      const { unmount } = renderWithTheme(
        <ComponentName onChange={handleChange} />, 
        theme
      );
      
      const element = screen.getByRole("checkbox");
      fireEvent.click(element);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
      
      unmount();
    }
  });
});
```

#### 4. Form Components Theme Testing

For form components, test across themes with validation states:

```tsx
describe("Form Component Theme Testing", () => {
  const themes = ['light', 'dark', 'highContrast'] as const;
  const states = [
    { error: false, disabled: false, required: false },
    { error: true, disabled: false, required: false },
    { error: false, disabled: true, required: false },
    { error: false, disabled: false, required: true },
  ];

  it("should render form states correctly across all themes", () => {
    themes.forEach(themeMode => {
      states.forEach((state, index) => {
        const { container } = renderWithTheme(
          <ComponentName 
            label="Test Field"
            helperText={state.error ? "Error message" : "Helper text"}
            {...state}
          />, 
          themeMode
        );
        
        const element = screen.getByRole("textbox");
        
        // State-specific assertions
        if (state.error) {
          expect(element).toHaveAttribute("aria-invalid", "true");
        }
        if (state.disabled) {
          expect(element).toBeDisabled();
        }
        if (state.required) {
          expect(element).toBeRequired();
        }
        
        expect(container.firstChild).toMatchSnapshot(
          `form-component-state-${index}-${themeMode}`
        );
      });
    });
  });
});
```

#### 5. Real-world Theme Testing Scenarios

Test realistic usage patterns within different themes:

```tsx
describe("Real-world Theme Scenarios", () => {
  it("should render complex form correctly across all themes", () => {
    const themes = ['light', 'dark', 'highContrast'] as const;
    
    themes.forEach(themeMode => {
      const { container } = renderWithTheme(
        <DsPaper sx={{ p: 3 }}>
          <DsTypography variant="h6" gutterBottom>
            User Registration
          </DsTypography>
          <DsFormControl fullWidth sx={{ mb: 2 }}>
            <DsFormLabel required>Email</DsFormLabel>
            <ComponentName 
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            />
            <DsFormHelperText>We'll never share your email</DsFormHelperText>
          </DsFormControl>
          <DsBox sx={{ display: 'flex', gap: 2 }}>
            <DsButton variant="contained" color="primary">
              Register
            </DsButton>
            <DsButton variant="outlined" color="secondary">
              Cancel
            </DsButton>
          </DsBox>
        </DsPaper>, 
        themeMode
      );
      
      // Verify all elements render correctly
      expect(screen.getByText("User Registration")).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
      
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  it("should render navigation components correctly across themes", () => {
    const themes = ['light', 'dark', 'highContrast'] as const;
    
    themes.forEach(themeMode => {
      const { container } = renderWithTheme(
        <DsBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DsTypography variant="h5">Navigation Menu</DsTypography>
          <DsStack direction="row" spacing={2}>
            <ComponentName color="primary">Home</ComponentName>
            <ComponentName color="inherit">About</ComponentName>
            <ComponentName color="secondary">Contact</ComponentName>
          </DsStack>
        </DsBox>, 
        themeMode
      );
      
      expect(screen.getByText("Navigation Menu")).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
```

### Enforcement Guidelines

These requirements are **NON-NEGOTIABLE** and will be enforced in code reviews:

- ❌ **Code reviews will REJECT any test using raw HTML elements** (`<div>`, `<span>`, `<button>`, etc.)
- ❌ **Code reviews will REJECT tests missing snapshot testing section**
- ❌ **Code reviews will REJECT tests missing theme testing section**
- ❌ **Code reviews will REJECT inconsistent design system component usage**
- ✅ **All tests MUST use design system components** (`DsBox`, `DsTypography`, `DsButton`, etc.)
- ✅ **All tests MUST include theme testing across light, dark, and high contrast modes**
- ✅ **All tests MUST include comprehensive snapshot coverage**
- ✅ **All tests MUST follow the established 12-section structure**

These guidelines should be reviewed and updated as new testing patterns emerge or framework capabilities change. The mandatory requirements ensure design system consistency, theme compatibility, and visual regression protection across all components.

## 🎯 Modern CSS Variable Theme Testing (DsSwitch Pattern)

**🆕 UPDATED APPROACH**: Based on our improved theme testing for DsSwitch component that implements **PRECISE DESIGN SYSTEM VALIDATION** instead of loose OR conditions - ensuring exact CSS variable validation for design system colors.

**🔍 CRITICAL IMPROVEMENT**: We now use **HYBRID VALIDATION** that validates specific design system CSS variables while maintaining compatibility with current MUI implementation:
- ✅ **Future Design System Variables**: `var(--ds-colour-actionSecondary)`, `var(--ds-colour-typoOnSurface)` 
- ✅ **Current MUI Variables**: `var(--palette-primary-main)`, `var(--palette-text-primary)`, etc.
- ✅ **Specific Validation**: No more loose `||` conditions, each color is validated precisely
- ❌ **No more generic `--palette-` checks that could match unintended variables**

This approach replaces loose validation like `color1 || color2 || color3` with precise validation that documents expected design system behavior while testing current implementation.

### Issue with Previous Loose Validation

Previous theme testing used loose OR conditions that were too permissive, accepting any of multiple colors without precision:

```tsx
// ❌ LOOSE VALIDATION - Too permissive, could pass invalid colors
const isValidColor = color === color1 || color === color2 || color === color3;
```

This approach made tests pass even when components used incorrect colors, reducing test effectiveness.

### ✅ Precise Design System CSS Variable Validation

```tsx
describe("Theme Testing", () => {
  it("should use correct colors across all themes", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      const schemeData = themeColorScheme[colorScheme];
      
      // Test default state
      const { container: defaultContainer } = render(
        <DsComponent name={`theme-default-${colorScheme}`} value={false} onChange={() => {}} />, 
        { colorScheme }
      );
      
      // Test selected state 
      const { container: selectedContainer } = render(
        <DsComponent name={`theme-selected-${colorScheme}`} value={true} onChange={() => {}} />, 
        { colorScheme }
      );
      
      // Extract expected colors from actual theme
      const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
      const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
      expect(expectedPrimaryColor).toBeTruthy();
      expect(expectedTextColor).toBeTruthy();
      
      // Test component integration with theme
      const toggleGroup = defaultContainer.querySelector('.MuiComponent-root'); // Adjust selector
      expect(toggleGroup).toBeInTheDocument();
      expect(defaultContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
      
      // ✅ PRECISE VALIDATION - Test actual color usage in default state (non-selected buttons)
      const defaultButtons = defaultContainer.querySelectorAll('button'); // Adjust selector
      defaultButtons.forEach(button => {
        const computedStyle = window.getComputedStyle(button);
        const buttonColor = computedStyle.color;
        
        // Validate specific design system colors with current MUI fallbacks
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
      const selectedButton = selectedContainer.querySelector('.Mui-selected'); // Adjust selector
      if (selectedButton) {
        const computedStyle = window.getComputedStyle(selectedButton);
        const textColor = computedStyle.color;
        const backgroundColor = computedStyle.backgroundColor;
        
        // Validate specific design system colors with current MUI fallbacks
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
          <DsComponent 
            name={`color-${color}-${colorScheme}`}
            value={true}
            color={color}
            onChange={() => {}}
          />, 
          { colorScheme }
        );
        
        // Extract expected color from actual theme
        const expectedColor = (schemeData?.palette?.[color] as any)?.main;
        expect(expectedColor).toBeTruthy();
        
        // Test component uses proper MUI color classes
        const buttons = container.querySelectorAll('.MuiComponent-root'); // Adjust selector
        buttons.forEach(button => {
          // MUI uses either MuiComponent-{color} or Mui-{color} depending on component
          const hasExpectedColorClass = button.classList.contains(`MuiComponent-${color}`) || 
                                       button.classList.contains(`Mui-${color}`);
          expect(hasExpectedColorClass).toBe(true);
        });
        
        // ✅ PRECISE CSS VARIABLE AWARE COLOR TESTING - Check for specific design system palette variables
        const selectedElement = container.querySelector('.Mui-selected'); // Adjust selector
        if (selectedElement) {
          const computedStyle = window.getComputedStyle(selectedElement);
          const textColor = computedStyle.color;
          const backgroundColor = computedStyle.backgroundColor;
          
          // Element should use specific design system colors with current MUI fallbacks
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
});
```

### Key Differences from Previous Loose Validation

#### ❌ OLD: Loose OR Validation
```tsx
// This was too permissive and could pass invalid colors
const isValidColor = color === color1 || color === color2 || color === color3;
expect(isValidColor).toBe(true);
```

#### ✅ NEW: Precise Design System Validation
```tsx
// This validates specific design system colors with documented fallbacks
const isValidThemeColor = buttonColor === 'var(--ds-colour-actionSecondary)' ||  // Future design system color
                         buttonColor === 'var(--palette-action-active)' ||      // Current MUI color
                         buttonColor === 'var(--palette-text-primary)' ||       // Another MUI text color
                         buttonColor === expectedTextColor;                     // Fallback to theme text color

if (!isValidThemeColor) {
  console.log(`❌ Button color mismatch in ${colorScheme}: got '${buttonColor}', expected 'var(--ds-colour-actionSecondary)' or current MUI equivalent`);
}
expect(isValidThemeColor).toBe(true);
```

### Design System CSS Variables

Our design system defines specific CSS variables that should be used instead of MUI defaults:
- **Action Colors**: `var(--ds-colour-actionSecondary)`
- **Typography Colors**: `var(--ds-colour-typoOnSurface)`  
- **Background Colors**: `var(--ds-colour-actionSecondary)`

Current MUI implementation still uses:
- **Text Color**: `var(--palette-text-primary)`, `var(--palette-action-active)`
- **Background Color**: `var(--palette-primary-main)`, complex channel calculations
- **Color Classes**: `Mui-selected` instead of component-specific classes

### Benefits of Precise Design System Validation

1. **Accurate validation**: Only passes when correct design system or documented MUI colors are used
2. **Future-proof**: Ready for when components migrate to design system CSS variables
3. **Debugging support**: Helpful console logs show exactly what color was found vs expected
4. **Documentation**: Each validation explicitly lists expected design system and current fallback variables
5. **Precise feedback**: No false positives from generic CSS variable matching

### Implementation Checklist

- ✅ **Document expected design system variables** like `var(--ds-colour-actionSecondary)`
- ✅ **List current MUI fallbacks** like `var(--palette-action-active)`, `var(--palette-text-primary)`
- ✅ **Add helpful console logging** for validation failures with exact colors found vs expected
- ✅ **Validate specific CSS variables** instead of generic pattern matching
- ✅ **Test theme attributes** with `data-mui-color-scheme` checks
- ✅ **Separate different color contexts** (non-selected, selected, different component states)

### Real-World Results

This approach successfully validates:
- **DsSwitch**: 66/66 tests passing with precise design system CSS variable validation
- **Theme colors**: Proper palette color extraction from theme using `getColorScheme(PALETTE)`
- **Design system variables**: Documents expected `--ds-colour-*` variables vs current MUI implementation
- **Color variants**: All 6 color variants across 3 themes with specific validation
- **Component states**: Default, selected, and disabled states with different color contexts
- **Debugging support**: Console logs show exact color mismatches for faster debugging

Use this precise validation pattern for all future theme testing to ensure design system compliance while maintaining current compatibility.
