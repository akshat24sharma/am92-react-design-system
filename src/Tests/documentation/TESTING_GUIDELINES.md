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
Theme testing in the AM92 React Design System focuses on ensuring components render correctly and behave consistently across all supported theme modes: **light**, **dark**, and **highContrast**. This is not about testing the theme system itself, but about testing component behavior within different theme contexts to ensure visual consistency and proper styling application.

### Why Theme Testing Matters
- ✅ **Visual consistency** - Components should look appropriate in all theme modes
- ✅ **Color contrast compliance** - Ensure accessibility across themes, especially high contrast
- ✅ **Style inheritance** - Verify components inherit theme colors correctly
- ✅ **Brand consistency** - Maintain design system integrity across theme modes
- ✅ **Regression prevention** - Catch theme-specific styling issues early
- ✅ **User experience** - Ensure seamless theme switching experience

### Critical Theme Testing Rules

#### 🚨 NEVER Use Hardcoded Colors
**CRITICAL**: Never use hardcoded RGBA, hex, or named colors in theme tests. Always use the actual theme configuration.

```tsx
// ❌ CRITICAL MISTAKE - Hardcoded colors will break across themes
it("should have correct colors", () => {
  const { container } = renderWithTheme(<DsCheckbox checked />, 'light');
  const element = screen.getByRole("checkbox");
  
  // NEVER DO THIS - hardcoded colors don't account for theme transformations
  expect(element).toHaveStyle('color: #97144D'); // Primary color hardcoded
  expect(element).toHaveStyle('background-color: rgba(151, 20, 77, 0.12)'); // RGBA hardcoded
});

// ✅ CORRECT - Use actual theme configuration
import { getColorScheme } from '../../Theme';
import { PALETTE } from '../../Constants';

it("should use correct theme colors", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const schemeData = themeColorScheme.light;
  
  const { container } = renderWithTheme(<DsCheckbox checked />, 'light');
  
  // Use actual theme colors from the color scheme
  const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
  expect(expectedPrimaryColor).toBeTruthy();
  expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/); // Validate it's a valid color
  
  // Test CSS class application instead of style values
  const element = screen.getByRole("checkbox");
  expect(element).toHaveClass('MuiCheckbox-colorPrimary');
});
```

#### 🚨 ALWAYS Use getColorScheme Function
**CRITICAL**: Always use the actual `getColorScheme` function from your theme system instead of manual if/else color mapping.

```tsx
// ❌ WRONG - Manual color mapping duplicates theme logic
const getManualColors = (colorScheme: string, color: string) => {
  if (colorScheme === 'light') {
    if (color === 'primary') return '#97144D';
    if (color === 'secondary') return '#ED1164';
    // ... manual mapping
  } else if (colorScheme === 'dark') {
    if (color === 'primary') return '#97144D';
    if (color === 'secondary') return '#ED1164';
    // ... manual mapping
  }
  // This approach is error-prone and doesn't reflect actual theme behavior
};

// ✅ CORRECT - Use actual theme function
import { getColorScheme } from '../../Theme';
import { PALETTE } from '../../Constants';

it("should use correct colors across all themes", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  colorSchemes.forEach(colorScheme => {
    colors.forEach(color => {
      const schemeData = themeColorScheme[colorScheme];
      const { container } = renderWithTheme(
        <DsCheckbox color={color} checked />, 
        colorScheme
      );
      
      // Use direct theme access
      const expectedColor = (schemeData?.palette?.[color] as any)?.main;
      expect(expectedColor).toBeTruthy();
      
      // Test CSS class instead of color value
      const element = screen.getByRole("checkbox");
      expect(element).toHaveClass(`MuiCheckbox-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
    });
  });
});
```

#### 🚨 MANDATORY Provider Setup
**CRITICAL**: Always use `ThemeProvider` instead of deprecated `CssVarsProvider` for theme testing.

```tsx
// ❌ WRONG - Using deprecated CssVarsProvider
import { CssVarsProvider } from '@mui/material/styles';

function badRenderWithTheme(component: React.ReactElement, colorScheme: string) {
  return render(
    <CssVarsProvider theme={theme}> {/* CssVarsProvider is deprecated */}
      <div data-mui-color-scheme={colorScheme}>
        {component}
      </div>
    </CssVarsProvider>
  );
}

// ✅ CORRECT - Using modern ThemeProvider
import { ThemeProvider } from '@mui/material/styles';

function renderWithTheme(component: React.ReactElement, colorScheme: string = 'light') {
  return render(
    <ThemeProvider theme={theme}>
      <div data-mui-color-scheme={colorScheme}>
        {component}
      </div>
    </ThemeProvider>
  );
}
```

#### 🚨 Complete Theme Coverage
**CRITICAL**: ALWAYS test all three theme modes - light, dark, AND highContrast.

```tsx
// ❌ INCOMPLETE - Missing highContrast theme
describe("Theme Testing", () => {
  it("should work in light and dark themes", () => {
    ['light', 'dark'].forEach(theme => { // Missing highContrast!
      const { container } = renderWithTheme(<ComponentName />, theme);
      expect(container.firstChild).toMatchSnapshot(`component-${theme}`);
    });
  });
});

// ✅ COMPLETE - All three theme modes tested
describe("Theme Testing", () => {
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  it("should work across all theme modes", () => {
    colorSchemes.forEach(theme => {
      const { container } = renderWithTheme(<ComponentName />, theme);
      expect(container.firstChild).toMatchSnapshot(`component-${theme}`);
    });
  });
});
```

### Theme Testing Implementation

#### 1. Theme Testing Utilities Setup
Import the theme testing utilities at the top of your test files:

```tsx
// 🎯 ESSENTIAL: Color testing imports
import { renderWithTheme, testAllThemes } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("Theme Testing", () => {
  it("should render correctly in light theme", () => {
    const { container } = renderWithTheme(<ComponentName />, 'light');
    
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot('component-light-theme');
  });

  it("should render correctly in dark theme", () => {
    const { container } = renderWithTheme(<ComponentName />, 'dark');
    
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot('component-dark-theme');
  });

  it("should render correctly in high contrast theme", () => {
    const { container } = renderWithTheme(<ComponentName />, 'highContrast');
    
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot('component-high-contrast-theme');
  });
});
```

**Note**: The theme utilities use `ThemeProvider` with your actual design system theme and wrap components in `DsBox` with `data-mui-color-scheme` attributes for proper theme context.

#### 2. Proper Theme Color Testing Pattern

The ONLY correct way to test theme colors:

```tsx
describe("Theme Testing", () => {
  // Import theme utilities
  import { getColorScheme } from '../../Theme';
  import { PALETTE } from '../../Constants';

  it("should use correct design system colors across all themes", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;
    
    colorSchemes.forEach(colorScheme => {
      colors.forEach(color => {
        const schemeData = themeColorScheme[colorScheme];
        
        const { container, unmount } = renderWithTheme(
          <ComponentName color={color} checked />, 
          colorScheme
        );
        
        // Get expected color from the theme's palette - NEVER hardcode!
        const expectedColor = (schemeData?.palette?.[color] as any)?.main;
        
        expect(expectedColor).toBeTruthy(); // Ensure we have a valid color
        expect(expectedColor).toMatch(/^#[0-9A-Fa-f]{6}$/); // Validate hex format
        
        // Test CSS class application instead of style values
        const element = screen.getByRole("checkbox");
        expect(element).toHaveClass(`MuiCheckbox-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
        
        // Verify theme mode is correctly applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        unmount();
      });
    });
  });

  it("should verify theme differences", () => {
    const themeColorScheme = getColorScheme(PALETTE);
    
    // Verify light vs dark theme differences using actual theme configuration
    const lightSchemeData = themeColorScheme.light;
    const darkSchemeData = themeColorScheme.dark;
    const highContrastData = themeColorScheme.highContrast;
    
    // Verify we have different schemes
    expect(lightSchemeData).toBeTruthy();
    expect(darkSchemeData).toBeTruthy();
    expect(highContrastData).toBeTruthy();
    
    // Text colors should be different between light and dark
    const lightTextColor = (lightSchemeData?.palette?.text as any)?.primary;
    const darkTextColor = (darkSchemeData?.palette?.text as any)?.primary;
    
    expect(lightTextColor).toBeTruthy();
    expect(darkTextColor).toBeTruthy();
    expect(lightTextColor).not.toBe(darkTextColor);
    
    // Primary color should be consistent across themes (in most design systems)
    const lightPrimaryColor = (lightSchemeData?.palette?.primary as any)?.main;
    const darkPrimaryColor = (darkSchemeData?.palette?.primary as any)?.main;
    
    expect(lightPrimaryColor).toBeTruthy();
    expect(darkPrimaryColor).toBeTruthy();
    // Note: Whether these are the same depends on your design system
  });
});
```

#### 3. Theme Testing Consolidation Pattern

Efficient testing across themes to avoid test bloat:

```tsx
describe("Theme Testing", () => {
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;

  it("should render correctly across all color schemes", () => {
    // Import once at the top of the test
    const themeColorScheme = getColorScheme(PALETTE);
    
    colorSchemes.forEach(colorScheme => {
      const schemeData = themeColorScheme[colorScheme];
      
      const { container } = renderWithTheme(<ComponentName />, colorScheme);
      
      // Verify color scheme is applied
      const wrapperElement = container.firstChild as HTMLElement;
      expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
      
      // Verify theme colors are valid (don't hardcode specific values!)
      const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
      expect(expectedPrimaryColor).toBeTruthy();
      expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      
      const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
      expect(expectedTextColor).toBeTruthy();
      
      // Verify CSS classes
      const element = screen.getByRole("checkbox");
      expect(element).toHaveClass('MuiCheckbox-colorPrimary');
      
      // Include in snapshot testing
      expect(container.firstChild).toMatchSnapshot(`component-${colorScheme}`);
    });
  });

  it("should maintain functionality across all themes", async () => {
    const handleChange = vi.fn();
    
    // Test that functionality works the same across all themes
    for (const colorScheme of colorSchemes) {
      document.body.innerHTML = '';
      handleChange.mockClear();
      
      const { unmount } = renderWithTheme(
        <ComponentName onChange={handleChange} />, 
        colorScheme
      );
      
      const element = screen.getByRole("checkbox");
      fireEvent.click(element);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
      
      unmount();
    }
  });
});
```

#### 4. Advanced Color Testing Pattern (DsRadio Optimization Model)

**🎯 RECOMMENDED**: Use this comprehensive color testing pattern established for DsRadio component:

```tsx
describe("Theme Testing", () => {
  it("should integrate with theme correctly across all color schemes", () => {
    // Import theme utilities once
    const themeColorScheme = getColorScheme(PALETTE);
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;

    // Comprehensive theme testing for all states in one test
    colorSchemes.forEach(colorScheme => {
      // Test multiple component states per theme
      const { container: uncheckedContainer, unmount: unmountUnchecked } = renderWithTheme(
        <ComponentName label={`Unchecked ${colorScheme}`} />, 
        colorScheme
      );
      
      const { container: checkedContainer, unmount: unmountChecked } = renderWithTheme(
        <ComponentName checked label={`Checked ${colorScheme}`} />, 
        colorScheme
      );
      
      const { container: disabledContainer, unmount: unmountDisabled } = renderWithTheme(
        <ComponentName disabled label={`Disabled ${colorScheme}`} />, 
        colorScheme
      );

      // 🎯 ACTUAL COLOR VALIDATION (once per color scheme)
      const schemeData = themeColorScheme[colorScheme];
      
      // Validate primary colors exist and are valid hex codes
      const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
      const expectedSecondaryColor = (schemeData?.palette?.secondary as any)?.main;
      const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
      const expectedBackgroundColor = (schemeData?.palette?.background as any)?.paper;
      
      // Color format validation
      expect(expectedPrimaryColor).toBeTruthy();
      expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(expectedSecondaryColor).toBeTruthy();
      expect(expectedSecondaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(expectedTextColor).toBeTruthy();
      expect(expectedBackgroundColor).toBeTruthy();

      // 🎯 COMPONENT STATE-SPECIFIC TESTING
      // Test unchecked state
      const uncheckedElement = uncheckedContainer.querySelector('.MuiCheckbox-root');
      expect(uncheckedElement).toHaveClass('MuiCheckbox-colorPrimary'); // or colorSecondary
      expect(uncheckedContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

      // Test checked state with icon validation
      const checkedElement = checkedContainer.querySelector('.MuiCheckbox-root');
      expect(checkedElement).toHaveClass('MuiCheckbox-colorPrimary', 'Mui-checked');
      const checkedIcon = checkedContainer.querySelector('.checked-icon-selector'); // Adjust selector
      if (checkedIcon) {
        expect(checkedIcon).toHaveStyle('font-size: var(--ds-typo-fontSizeBitterCold)');
      }

      // Test disabled state
      const disabledElement = disabledContainer.querySelector('.MuiCheckbox-root');
      expect(disabledElement).toHaveClass('MuiCheckbox-colorPrimary', 'Mui-disabled');

      // 🎯 CSS VARIABLE TESTING
      // Test that design system CSS variables are applied correctly
      if (checkedIcon) {
        const iconStyles = window.getComputedStyle(checkedIcon as HTMLElement);
        expect(iconStyles.fontSize).toBe('var(--ds-typo-fontSizeBitterCold)');
      }

      // 🎯 THEME ATTRIBUTE VALIDATION
      expect(checkedContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
      expect(disabledContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

      // Cleanup memory
      unmountUnchecked();
      unmountChecked();
      unmountDisabled();
    });
  });
});
```

##### Key Benefits of This Pattern:
- **Eliminates duplication**: Tests all themes and states in one consolidated test
- **Actual color validation**: Uses `getColorScheme(PALETTE)` for real theme colors
- **Hex color verification**: Validates color format with regex patterns
- **CSS variable testing**: Ensures design system variables are correctly applied
- **Memory efficient**: Proper cleanup with unmount() calls
- **Comprehensive coverage**: All component states tested per theme
- **Performance optimized**: Reduces test count while maintaining full coverage

##### Color Testing Best Practices:
```tsx
// ✅ DO: Test color existence and format
const expectedColor = (schemeData?.palette?.primary as any)?.main;
expect(expectedColor).toBeTruthy();
expect(expectedColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

// ✅ DO: Test CSS classes for color application
expect(element).toHaveClass('MuiCheckbox-colorPrimary');

// ✅ DO: Validate design system CSS variables
expect(iconElement).toHaveStyle('font-size: var(--ds-typo-fontSizeBitterCold)');

// ✅ DO: Test theme attribute application
expect(rootElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

// ❌ DON'T: Test hardcoded color values
expect(element).toHaveStyle('color: #97144D'); // Will break with theme changes

// ❌ DON'T: Use manual color mapping
const manualColors = { light: '#97144D', dark: '#97144D' }; // Duplicates theme logic
```

#### 5. Using testAllThemes Utility (Global Helper)

```tsx
it("should use testAllThemes utility for efficient theme testing", () => {
  testAllThemes(
    (colorScheme) => <ComponentName data-theme={colorScheme} />,
    (container, colorScheme) => {
      const element = container.querySelector('[data-theme]') as HTMLElement;
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('data-theme', colorScheme);
    }
  );
});
```

### Common Theme Testing Mistakes

#### 1. Hardcoded Color Values
```tsx
// ❌ CRITICAL ERROR - Will break with theme updates
expect(element).toHaveStyle('color: #97144D');
expect(element).toHaveStyle('background-color: rgba(151, 20, 77, 0.12)');

// ✅ CORRECT - Test CSS classes and theme structure
const themeColors = getColorScheme(PALETTE);
const expectedColor = themeColors.light.palette.primary.main;
expect(element).toHaveClass('MuiCheckbox-colorPrimary');
```

#### 2. Manual Color Mapping
```tsx
// ❌ WRONG - Duplicates theme logic
const colors = {
  light: { primary: '#97144D', secondary: '#ED1164' },
  dark: { primary: '#97144D', secondary: '#ED1164' }
};

// ✅ CORRECT - Use actual theme
const themeColorScheme = getColorScheme(PALETTE);
const actualColors = themeColorScheme[colorScheme].palette;
```

#### 3. Missing Color Format Validation
```tsx
// ❌ WRONG - No validation of color format
const color = themeColorScheme.light.palette.primary.main;
expect(color).toBeTruthy(); // Not enough!

// ✅ CORRECT - Validate hex color format
const expectedColor = (schemeData?.palette?.primary as any)?.main;
expect(expectedColor).toBeTruthy();
expect(expectedColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
```

#### 4. Incomplete Theme Coverage
```tsx
// ❌ WRONG - Missing highContrast theme
const themes = ['light', 'dark']; // Missing highContrast!

// ✅ CORRECT - All three themes
const colorSchemes = ['light', 'dark', 'highContrast'] as const;
```

#### 5. Wrong Provider Usage
```tsx
// ❌ WRONG - Deprecated provider
<CssVarsProvider theme={theme}>

// ✅ CORRECT - Modern provider
<ThemeProvider theme={theme}>
```

#### 6. Missing CSS Variable Testing
```tsx
// ❌ INCOMPLETE - Not testing design system variables
expect(element).toHaveClass('MuiButton-root');

// ✅ COMPLETE - Test design system CSS variables
const iconElement = container.querySelector('.design-system-icon');
expect(iconElement).toHaveStyle('font-size: var(--ds-typo-fontSizeBitterCold)');
```

#### 7. Memory Leaks in Theme Testing
```tsx
// ❌ WRONG - No cleanup in theme loops
colorSchemes.forEach(colorScheme => {
  const { container } = renderWithTheme(<Component />, colorScheme);
  // Missing cleanup - causes memory leaks
});

// ✅ CORRECT - Proper cleanup
colorSchemes.forEach(colorScheme => {
  const { container, unmount } = renderWithTheme(<Component />, colorScheme);
  // ... tests ...
  unmount(); // Essential for memory management
});
```

### Theme Testing Requirements Checklist

Before submitting a component for review, ensure:

- ✅ **No hardcoded colors** - All color testing uses theme configuration
- ✅ **Uses getColorScheme function** - Import from `../../Theme/getColorScheme` and `../../Constants`
- ✅ **All three themes tested** - light, dark, and highContrast
- ✅ **ThemeProvider used** - Not deprecated CssVarsProvider  
- ✅ **CSS class testing** - Instead of style value testing
- ✅ **Theme snapshots included** - Visual regression protection
- ✅ **Functionality preserved** - Same behavior across all themes
- ✅ **Theme context validation** - data-mui-color-scheme attribute checked
- ✅ **Color variant testing** - All color props tested across themes
- ✅ **Efficient test consolidation** - Avoid redundant theme tests
- ✅ **🎯 ACTUAL COLOR VALIDATION** - Hex color pattern validation with regex
- ✅ **🎯 CSS VARIABLE TESTING** - Design system variables verified
- ✅ **🎯 COMPONENT STATE COVERAGE** - All states (checked/unchecked/disabled) per theme
- ✅ **🎯 MEMORY CLEANUP** - Proper unmount() calls in theme loops
- ✅ **🎯 CONSOLIDATED TESTING** - Single comprehensive theme test vs multiple separate tests

### Theme Testing Performance

To keep tests fast and maintainable:

```tsx
// ✅ EFFICIENT - Test multiple aspects together
it("should handle all color variants across all themes efficiently", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const colors = ['primary', 'secondary', 'error'] as const;
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;
  
  // Consolidated testing reduces test count from 27 to 1
  colorSchemes.forEach(colorScheme => {
    colors.forEach(color => {
      const schemeData = themeColorScheme[colorScheme];
      const { container, unmount } = renderWithTheme(
        <ComponentName color={color} />, 
        colorScheme
      );
      
      // Test multiple aspects in one render
      const element = screen.getByRole("checkbox");
      expect(element).toHaveClass(`MuiCheckbox-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
      expect((schemeData?.palette?.[color] as any)?.main).toBeTruthy();
      expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', colorScheme);
      
      unmount();
    });
  });
});

// ❌ INEFFICIENT - Separate test for each combination
it("should work with primary color in light theme", () => { /* ... */ });
it("should work with primary color in dark theme", () => { /* ... */ });
it("should work with primary color in high contrast theme", () => { /* ... */ });
// ... 27 separate tests
```

Remember: Theme testing is about ensuring your components work correctly within the theme system, not testing the theme system itself. Focus on component behavior, CSS class application, and visual consistency across all supported theme modes.

### 🎯 Perfect Color Testing Summary (DsRadio Pattern)

**Use this proven pattern for comprehensive color testing:**

```tsx
// ✅ PERFECT COLOR TESTING PATTERN
it("should integrate with theme correctly across all color schemes", () => {
  const themeColorScheme = getColorScheme(PALETTE);
  const colorSchemes = ['light', 'dark', 'highContrast'] as const;

  colorSchemes.forEach(colorScheme => {
    // 1. Render all component states per theme
    const { container: uncheckedContainer, unmount: unmountUnchecked } = renderWithTheme(
      <ComponentName label={`Test ${colorScheme}`} />, colorScheme
    );
    const { container: checkedContainer, unmount: unmountChecked } = renderWithTheme(
      <ComponentName checked label={`Checked ${colorScheme}`} />, colorScheme
    );
    const { container: disabledContainer, unmount: unmountDisabled } = renderWithTheme(
      <ComponentName disabled label={`Disabled ${colorScheme}`} />, colorScheme
    );

    // 2. Actual theme color validation (once per theme)
    const schemeData = themeColorScheme[colorScheme];
    const expectedPrimaryColor = (schemeData?.palette?.primary as any)?.main;
    const expectedSecondaryColor = (schemeData?.palette?.secondary as any)?.main;
    const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
    
    // 3. Color format validation
    expect(expectedPrimaryColor).toBeTruthy();
    expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(expectedSecondaryColor).toBeTruthy();
    expect(expectedSecondaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
    expect(expectedTextColor).toBeTruthy();

    // 4. Component-specific validations per state
    const uncheckedElement = uncheckedContainer.querySelector('.MuiCheckbox-root');
    expect(uncheckedElement).toHaveClass('MuiCheckbox-colorPrimary');
    expect(uncheckedContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

    const checkedElement = checkedContainer.querySelector('.MuiCheckbox-root');
    expect(checkedElement).toHaveClass('MuiCheckbox-colorPrimary', 'Mui-checked');
    
    const disabledElement = disabledContainer.querySelector('.MuiCheckbox-root');
    expect(disabledElement).toHaveClass('MuiCheckbox-colorPrimary', 'Mui-disabled');

    // 5. CSS Variables validation (design system specific)
    const iconElement = checkedContainer.querySelector('.design-system-icon');
    if (iconElement) {
      expect(iconElement).toHaveStyle('font-size: var(--ds-typo-fontSizeBitterCold)');
    }

    // 6. Memory cleanup
    unmountUnchecked();
    unmountChecked();
    unmountDisabled();
  });
});
```

**Key Color Testing Requirements:**
- ✅ **Import**: `getColorScheme` from `../../Theme/getColorScheme` and `PALETTE` from `../../Constants`
- ✅ **Validate**: Actual hex color codes with regex `/^#[0-9A-Fa-f]{6}$/`
- ✅ **Test**: All three themes (light, dark, highContrast) 
- ✅ **Cover**: All component states (checked, unchecked, disabled) per theme
- ✅ **Check**: CSS classes instead of hardcoded color values
- ✅ **Verify**: Design system CSS variables (e.g., `var(--ds-typo-fontSizeBitterCold)`)
- ✅ **Confirm**: Theme attributes (`data-mui-color-scheme`)
- ✅ **Cleanup**: Proper `unmount()` calls to prevent memory leaks
- ✅ **Consolidate**: Single comprehensive test vs multiple separate tests

#### 3. Comprehensive Theme Testing (Using Global Utilities)

Test components with all theme combinations and props:

```tsx
describe("Theme Testing", () => {
  const themes = ['light', 'dark', 'highContrast'] as const;
  const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;

  it("should render correctly across all themes", () => {
    themes.forEach(themeMode => {
      const { container } = renderWithTheme(<ComponentName />, themeMode);
      
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot(`component-${themeMode}-theme`);
    });
  });

  it("should handle color variants across all themes", () => {
    themes.forEach(themeMode => {
      colors.forEach(color => {
        const { container } = renderWithTheme(
          <ComponentName color={color} />, 
          themeMode
        );
        
        const element = screen.getByRole("button");
        expect(element).toHaveClass(`MuiButton-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
        expect(container.firstChild).toMatchSnapshot(`component-${color}-${themeMode}`);
      });
    });
  });

  it("should maintain functionality across all themes", async () => {
    const handleClick = vi.fn();
    
    for (const themeMode of themes) {
      const { container } = renderWithTheme(
        <ComponentName onClick={handleClick} />, 
        themeMode
      );
      
      const element = screen.getByRole("button");
      
      // Functionality should work the same in all themes
      await user.click(element);
      expect(handleClick).toHaveBeenCalled();
      
      handleClick.mockClear();
    }
  });

  // Using the global testAllThemes utility for repetitive testing
  it("should render consistently across themes using global utility", () => {
    testAllThemes(
      (themeMode) => <ComponentName data-theme={themeMode} />,
      (container, themeMode) => {
        const element = container.querySelector('[data-theme]');
        expect(element).toBeInTheDocument();
        expect(element).toHaveAttribute('data-theme', themeMode);
      }
    );
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
      
      expect(container.firstChild).toMatchSnapshot(`complex-form-${themeMode}`);
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
      
      expect(container.firstChild).toMatchSnapshot(`navigation-${themeMode}`);
    });
  });
});
```

### Theme Testing Best Practices

#### 1. Test Organization
Always include theme testing as a dedicated section:

```tsx
describe("ComponentName", () => {
  // ... other test categories ...
  
  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    // Theme-specific tests here
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    // Include theme snapshots here too
  });
});
```

#### 2. Snapshot Strategy for Themes
Include theme variations in your snapshot tests:

```tsx
// In your snapshot section
describe("Snapshot Tests", () => {
  it("should match snapshots across all themes", () => {
    const themes = ['light', 'dark', 'highContrast'] as const;
    
    themes.forEach(theme => {
      const { container } = renderWithTheme(<ComponentName />, theme);
      expect(container.firstChild).toMatchSnapshot(`default-${theme}`);
    });
  });

  it("should match snapshots with variants across themes", () => {
    const themes = ['light', 'dark', 'highContrast'] as const;
    const variants = ['contained', 'outlined', 'text'] as const;
    
    themes.forEach(theme => {
      variants.forEach(variant => {
        const { container } = renderWithTheme(
          <ComponentName variant={variant} />, 
          theme
        );
        expect(container.firstChild).toMatchSnapshot(`${variant}-${theme}`);
      });
    });
  });
});
```

#### 3. Theme Testing Import Pattern

```tsx
// Essential imports for theme testing
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { CssVarsProvider } from '@mui/material/styles';
import { ComponentName } from "./ComponentName.Component";
import { getTheme } from "../../../Theme";
import { 
  DsBox, 
  DsTypography, 
  DsButton, 
  DsPaper,
  DsFormControl,
  DsFormLabel,
  DsFormHelperText,
  DsStack
} from "../index";
```

#### 4. Theme Test Coverage Requirements

**MANDATORY**: Every component must test theme compatibility:
- ✅ **Light theme rendering** - Default theme appearance
- ✅ **Dark theme rendering** - Dark mode appearance and functionality
- ✅ **High contrast rendering** - Accessibility-focused high contrast appearance
- ✅ **Theme-specific snapshots** - Visual regression protection across themes
- ✅ **Color variant themes** - All color props working across themes
- ✅ **Functionality preservation** - All interactions work the same across themes
- ❌ **Never skip theme testing** - All components must support all themes

### When to Skip Theme Testing

Theme testing can be skipped only for:
- ❌ **Utility components** that don't render visual elements
- ❌ **Hook-only exports** with no visual output
- ❌ **Type-only exports** with no runtime behavior

**All visual components MUST include theme testing.**

### Theme Testing Maintenance

```bash
# Run theme-specific tests
npm test -- --testNamePattern="Theme Testing"

# Update theme snapshots when theme changes are intentional
npm test -- --update-snapshots --testNamePattern="Theme Testing"

# Run all snapshot tests including theme variants
npm test -- --testNamePattern="Snapshot Tests"
```

### Integration with Design System Components

Always use design system components in theme tests to ensure realistic usage:

```tsx
// ✅ Correct - Using design system components in theme tests
const { container } = renderWithTheme(
  <DsPaper elevation={2} sx={{ p: 2 }}>
    <DsTypography variant="subtitle1">Component Label</DsTypography>
    <ComponentName color="primary" />
    <DsFormHelperText>Component helper text</DsFormHelperText>
  </DsPaper>,
  'dark'
);

// ❌ Incorrect - Using raw HTML in theme tests  
const { container } = renderWithTheme(
  <div style={{ padding: 16 }}>
    <span>Component Label</span>
    <ComponentName color="primary" />
    <p>Component helper text</p>
  </div>,
  'dark'
);
```

## Snapshot Testing

### Overview
Snapshot testing captures the rendered output of components and compares it against previously stored snapshots. This helps detect unintentional changes in component structure, styling, and behavior. In the AM92 React Design System, snapshot tests are crucial for maintaining design consistency and catching regressions.

### When to Use Snapshot Testing
- ✅ **Final component output verification** - Ensure consistent rendering across all states
- ✅ **Design system compliance** - Maintain visual and structural consistency
- ✅ **Complex component structures** - Components with multiple nested elements or dynamic content
- ✅ **Style and class validation** - Verify CSS classes and styling are applied correctly
- ✅ **Props combination testing** - Test various prop combinations for complete coverage
- ✅ **Real-world scenario documentation** - Capture common usage patterns in snapshots
- ❌ **Frequently changing implementations** - Avoid for rapidly evolving component internals
- ❌ **Dynamic data testing** - Don't use for components with timestamps or random IDs

### Implementation Guidelines

#### 1. Snapshot Test Organization
Always include a dedicated "Snapshot Tests" section as the final category in your test suite:

```tsx
describe("ComponentName", () => {
  // ... other test categories ...
  
  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    // Snapshot tests go here
  });
});
```

#### 2. Basic Snapshot Test Pattern
```tsx
it("should match snapshot with default props", () => {
  const { container } = render(<ComponentName />);
  expect(container.firstChild).toMatchSnapshot();
});

it("should match snapshot when checked", () => {
  const { container } = render(<ComponentName checked />);
  expect(container.firstChild).toMatchSnapshot();
});

it("should match snapshot when disabled", () => {
  const { container } = render(<ComponentName disabled />);
  expect(container.firstChild).toMatchSnapshot();
});
```

#### 3. State Combination Snapshots
Test all important state combinations systematically:

```tsx
it("should match snapshot with all state combinations", () => {
  const stateCombinations = [
    { checked: true, disabled: false },
    { checked: false, disabled: false },
    { checked: true, disabled: true },
    { checked: false, disabled: true },
    { indeterminate: true, disabled: false },
    { indeterminate: true, disabled: true },
  ];

  stateCombinations.forEach((states, index) => {
    const { container } = render(<ComponentName {...states} />);
    expect(container.firstChild).toMatchSnapshot(`component-states-combination-${index}`);
  });
});
```

#### 4. Variant Snapshots
Capture snapshots for all component variants:

```tsx
it("should match snapshot with different colors", () => {
  const colors = ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
  
  colors.forEach(color => {
    const { container } = render(<ComponentName color={color} />);
    expect(container.firstChild).toMatchSnapshot(`component-color-${color}`);
  });
});

it("should match snapshot with different sizes", () => {
  const sizes = ['small', 'medium', 'large'] as const;
  
  sizes.forEach(size => {
    const { container } = render(<ComponentName size={size} />);
    expect(container.firstChild).toMatchSnapshot(`component-size-${size}`);
  });
});
```

#### 5. Complex Component Snapshots
For components with custom icons, slots, or complex props:

```tsx
it("should match snapshot with custom icons", () => {
  const customIcon = <DsRemixIcon className="ri-circle-line" />;
  const customCheckedIcon = <DsRemixIcon className="ri-checkbox-circle-fill" />;
  
  const { container } = render(
    <ComponentName 
      icon={customIcon}
      checkedIcon={customCheckedIcon}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});

it("should match snapshot with slotProps", () => {
  const { container } = render(
    <ComponentName 
      slotProps={{
        input: {
          'aria-describedby': 'component-help',
          'data-custom': 'custom-value'
        } as any
      }}
    />
  );
  expect(container.firstChild).toMatchSnapshot();
});
```

#### 6. Real-world Scenario Snapshots
Capture snapshots of realistic usage patterns using design system components:

```tsx
it("should match snapshot in real-world scenario - form integration", () => {
  const { container } = render(
    <DsPaper sx={{ p: 3 }}>
      <DsFormControl component="fieldset">
        <DsFormLabel component="legend">User Preferences</DsFormLabel>
        <DsFormGroup>
          <DsFormControlLabel
            control={
              <ComponentName 
                name="notifications"
                value="email"
                color="primary"
              />
            }
            label="Email notifications"
          />
          <DsFormHelperText>Receive updates via email</DsFormHelperText>
        </DsFormGroup>
      </DsFormControl>
    </DsPaper>
  );
  expect(container.firstChild).toMatchSnapshot();
});
```

### Snapshot Best Practices

#### 1. Descriptive Snapshot Names
Use descriptive names for named snapshots to make them easily identifiable:
- `component-color-${color}` for variant testing
- `component-states-combination-${index}` for state combinations  
- `real-world-scenario-${scenario}` for usage patterns

#### 2. Repository-based Snapshot Storage
Snapshots are stored in your repository and should be:
- ✅ **Committed to version control** - Include `__snapshots__` directories in git
- ✅ **Reviewed in PRs** - Check snapshot changes during code review
- ✅ **Updated intentionally** - Only update snapshots when changes are intended
- ❌ **Never ignored** - Don't add snapshots to `.gitignore`

#### 3. Snapshot Maintenance
```bash
# Update snapshots when changes are intentional
npm test -- --update-snapshots

# Review snapshot changes
git diff src/Components/**/__snapshots__/

# Run snapshot tests only
npm test -- --testNamePattern="Snapshot Tests"
```

#### 4. Consistent Component Structure
Ensure consistent snapshot structure by using design system components:
```tsx
// ✅ Good - Uses design system components
const { container } = render(
  <DsBox sx={{ p: 2 }}>
    <DsTypography gutterBottom>Label</DsTypography>
    <ComponentName />
    <DsFormHelperText>Helper text</DsFormHelperText>
  </DsBox>
);

// ❌ Avoid - Raw HTML elements
const { container } = render(
  <div style={{ padding: 16 }}>
    <p>Label</p>
    <ComponentName />
    <span>Helper text</span>
  </div>
);
```

## Design System Component Usage

### Overview
When writing tests for components in the AM92 React Design System, it's crucial to maintain consistency with the design system by using design system components instead of raw HTML elements. This ensures that tests reflect real-world usage patterns and maintain design system compliance.

### Core Principles

#### 1. Use Design System Components Only
**Always** use design system components in your tests instead of raw HTML elements:

```tsx
// ✅ Correct - Using design system components
import { 
  DsBox, 
  DsTypography, 
  DsButton, 
  DsFormControl, 
  DsFormControlLabel, 
  DsFormGroup, 
  DsFormHelperText, 
  DsFormLabel,
  DsPaper,
  DsStack,
  DsLink,
  DsRemixIcon
} from "../index";

// ✅ Correct test structure
it("should work in form context", () => {
  const { container } = render(
    <DsBox component="form">
      <DsFormControl component="fieldset">
        <DsFormLabel component="legend">Form Legend</DsFormLabel>
        <DsFormGroup>
          <DsFormControlLabel
            control={<ComponentName />}
            label={<DsTypography>Component Label</DsTypography>}
          />
          <DsFormHelperText>Helper text</DsFormHelperText>
        </DsFormGroup>
      </DsFormControl>
    </DsBox>
  );
  expect(container.firstChild).toMatchSnapshot();
});

// ❌ Incorrect - Using raw HTML elements
it("should work in form context", () => {
  const { container } = render(
    <div>
      <form>
        <fieldset>
          <legend>Form Legend</legend>
          <label>
            <ComponentName />
            Component Label
          </label>
          <span>Helper text</span>
        </fieldset>
      </form>
    </div>
  );
  expect(container.firstChild).toMatchSnapshot();
});
```

#### 2. Component Mapping Guide

Use this mapping when converting from raw HTML to design system components:

| Raw HTML Element | Design System Component | Usage Example |
|------------------|------------------------|---------------|
| `<div>` | `<DsBox>` | `<DsBox sx={{ p: 2 }}></DsBox>` |
| `<span>`, `<p>`, `<h1>` | `<DsTypography>` | `<DsTypography variant="h6"></DsTypography>` |
| `<button>` | `<DsButton>` | `<DsButton variant="contained"></DsButton>` |
| `<form>` | `<DsBox component="form">` | `<DsBox component="form"></DsBox>` |
| `<fieldset>` | `<DsFormControl component="fieldset">` | `<DsFormControl component="fieldset"></DsFormControl>` |
| `<legend>` | `<DsFormLabel component="legend">` | `<DsFormLabel component="legend"></DsFormLabel>` |
| `<label>` | `<DsFormControlLabel>` | `<DsFormControlLabel control={<Component />} label="Text" />` |
| `<a>` | `<DsLink>` | `<DsLink href="/path"></DsLink>` |
| Icon elements | `<DsRemixIcon>` | `<DsRemixIcon className="ri-icon-name" />` |

#### 3. Layout and Container Components

For test layouts and structure, use these design system components:

```tsx
// ✅ Correct layout structure
const { container } = render(
  <DsPaper elevation={1} sx={{ p: 3 }}>
    <DsTypography gutterBottom variant="h6">
      Component Demo
    </DsTypography>
    <DsStack spacing={2}>
      <ComponentName variant="primary" />
      <ComponentName variant="secondary" />
    </DsStack>
    <DsBox sx={{ mt: 2, display: 'flex', gap: 1 }}>
      <DsButton size="small">Action 1</DsButton>
      <DsButton size="small" variant="outlined">Action 2</DsButton>
    </DsBox>
  </DsPaper>
);

// ❌ Incorrect layout structure  
const { container } = render(
  <div style={{ padding: 24, background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
    <h3 style={{ marginBottom: 16 }}>Component Demo</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ComponentName variant="primary" />
      <ComponentName variant="secondary" />
    </div>
    <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
      <button>Action 1</button>
      <button>Action 2</button>
    </div>
  </div>
);
```

#### 4. Form Testing Patterns

When testing form integration, use design system form components:

```tsx
// ✅ Correct form testing pattern
describe("Form Integration", () => {
  it("should integrate with design system form components", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    
    render(
      <DsBox component="form" onSubmit={handleSubmit}>
        <DsFormControl fullWidth>
          <DsFormLabel required>Component Label</DsFormLabel>
          <ComponentName 
            name="test-field"
            required
          />
          <DsFormHelperText>This field is required</DsFormHelperText>
        </DsFormControl>
        <DsBox sx={{ mt: 2 }}>
          <DsButton type="submit" variant="contained">
            Submit
          </DsButton>
        </DsBox>
      </DsBox>
    );
    
    // Test implementation
  });
});
```

#### 5. Real-world Scenario Patterns

Create realistic test scenarios using design system components:

```tsx
// ✅ Correct real-world scenario
it("should handle preference panel scenario", () => {
  const { container } = render(
    <DsPaper sx={{ maxWidth: 400, p: 3 }}>
      <DsTypography variant="h6" gutterBottom>
        Notification Preferences
      </DsTypography>
      
      <DsFormControl component="fieldset">
        <DsFormLabel component="legend">
          <DsTypography variant="subtitle2">
            Email Notifications
          </DsTypography>
        </DsFormLabel>
        
        <DsFormGroup>
          <DsFormControlLabel
            control={
              <ComponentName 
                name="email-marketing"
                color="primary"
                size="small"
              />
            }
            label={
              <DsTypography variant="body2">
                Marketing emails
              </DsTypography>
            }
          />
          <DsFormControlLabel
            control={
              <ComponentName 
                name="email-updates"
                color="primary"
                size="small"
                defaultChecked
              />
            }
            label={
              <DsTypography variant="body2">
                Product updates
              </DsTypography>
            }
          />
        </DsFormGroup>
        
        <DsFormHelperText>
          <DsTypography variant="caption" color="text.secondary">
            You can change these settings at any time in your{' '}
            <DsLink href="/profile">profile settings</DsLink>
          </DsTypography>
        </DsFormHelperText>
      </DsFormControl>
    </DsPaper>
  );
  
  expect(container.firstChild).toMatchSnapshot();
});
```

### Enforcement Guidelines

#### 1. Code Review Checklist
- ❌ Reject PRs that use `<div>`, `<span>`, `<button>` etc. in tests
- ✅ Require usage of `DsBox`, `DsTypography`, `DsButton` etc.
- ❌ Reject inline styles in favor of `sx` prop or design system styling
- ✅ Ensure consistent component spacing using design system patterns

#### 2. Migration Strategy
When updating existing tests:

```tsx
// Before migration
const { container } = render(
  <div>
    <button>Click me</button>
    <span>Helper text</span>
  </div>
);

// After migration
const { container } = render(
  <DsBox>
    <DsButton>Click me</DsButton>
    <DsTypography variant="caption">Helper text</DsTypography>
  </DsBox>
);
```

#### 3. Design System Import Pattern
Always import design system components from the centralized index:

```tsx
// ✅ Correct import pattern
import { 
  DsBox, 
  DsTypography, 
  DsButton,
  // ... other components
} from "../index";

// ❌ Incorrect - direct imports
import { DsBox } from "../DsBox/DsBox.Component";
import { DsTypography } from "../DsTypography/DsTypography.Component";
```

### Benefits of This Approach

1. **Design System Compliance**: Tests reflect real usage patterns
2. **Consistency**: All tests use the same component library
3. **Maintenance**: Changes to design system components are reflected in all tests
4. **Documentation**: Tests serve as usage examples for the design system
5. **Quality**: Ensures components work well together in realistic scenarios

## Best Practices

### 1. Design System Theme Testing ✅
- **Always use themed render**: `render(<DsComponent />)` automatically includes theme
- **Test design system defaults**: Verify your custom default props work
- **Multi-theme testing**: Use `testAllThemes` for comprehensive coverage
```tsx
// ✅ Good - Tests design system behavior
it("should render with design system defaults", () => {
  render(<DsCheckbox />); // Uses secondary color (design system default)
  expect(checkbox.closest('.MuiCheckbox-root')).toHaveClass('MuiCheckbox-colorSecondary');
});

// ✅ Good - Tests across all themes
testAllThemes(
  (colorScheme) => <DsButton color="primary" data-testid={colorScheme} />,
  (container, colorScheme) => {
    const button = container.querySelector(`[data-testid="${colorScheme}"]`);
    expect(button).toBeInTheDocument();
  }
);

// ⚠️ Edge case only - Test raw MUI behavior
const { container } = renderWithoutTheme(<DsButton />); // No theme applied
```

### 2. Test Descriptions
- Use descriptive test names that explain the expected behavior
- Follow the pattern: "should [expected behavior] when [condition]"
- Group related tests in describe blocks

### 2. Test Independence
- Each test should be independent and not rely on other tests
- Use `beforeEach` for common setup
- Clean up after tests if needed

### 3. Query Selection
- Prefer queries that users would use (role, label, text)
- Avoid implementation details (class names, internal structure)
- Use `screen.debug()` to inspect the DOM when tests fail

### 4. Assertions
- Make assertions specific and meaningful
- Test behavior, not implementation
- Use appropriate matchers from jest-dom

### 5. Coverage Areas
Ensure you cover:
- ✅ Happy path scenarios
- ✅ Error conditions
- ✅ Edge cases
- ✅ User interactions
- ✅ Accessibility requirements
- ✅ Form integration
- ✅ State management
- ✅ Props validation
- ✅ Slots and slotProps customization
- ✅ **Theme compatibility testing across light, dark, and high contrast modes**
- ✅ **Snapshot testing for all states and variants**
- ✅ **Design system component usage in all test scenarios**

### 6. Modern MUI Patterns
Always use the modern MUI slots system:
- ✅ Use `slotProps` instead of deprecated `inputProps`, `InputProps`, etc.
- ✅ Use `slots` for custom component replacement
- ✅ Test custom slot components receive `ownerState` properly
- ✅ Verify attribute propagation through slots
- ❌ Avoid deprecated prop patterns in new tests

### 7. Design System Component Usage
**MANDATORY**: Always use design system components in tests, never raw HTML:
- ✅ Use `DsBox` instead of `<div>`
- ✅ Use `DsTypography` instead of `<span>`, `<p>`, `<h1>`, etc.
- ✅ Use `DsButton` instead of `<button>`
- ✅ Use design system form components (`DsFormControl`, `DsFormLabel`, etc.)
- ✅ Import all components from `"../index"` for consistency
- ❌ **NEVER use raw HTML elements** (`<div>`, `<span>`, `<button>`, etc.)
- ❌ **NEVER use inline styles** - use `sx` prop or design system patterns

### 8. Comprehensive Snapshot Testing
**REQUIRED**: Every component test suite must include comprehensive snapshot testing:
- ✅ Include "Snapshot Tests" as the final describe block
- ✅ Test default state snapshot
- ✅ Test all state combinations (disabled, checked, error states, etc.)
- ✅ Test all variants (colors, sizes, types)
- ✅ Test with custom props and slotProps
- ✅ Test real-world usage scenarios with design system components
- ✅ **Test snapshots across all theme modes (light, dark, highContrast)**
- ✅ Use descriptive snapshot names for multiple snapshots
- ✅ Commit snapshots to repository and review changes in PRs
- ❌ Never skip snapshot tests - they catch visual regressions

### 9. Mandatory Theme Testing
**REQUIRED**: Every visual component must be tested across all theme modes:
- ✅ Test component rendering in light theme (default)
- ✅ Test component rendering in dark theme
- ✅ Test component rendering in high contrast theme
- ✅ Test functionality preservation across all themes
- ✅ Test color variants work correctly in all themes
- ✅ Include theme-specific snapshots for visual regression protection
- ✅ Use `renderWithTheme` utility for consistent theme testing
- ❌ Never skip theme testing for visual components

### 10. Test Organization Priority
Organize test sections in this exact order:
1. **Core Rendering** - Basic functionality
2. **Props Validation** - Prop handling
3. **Component States** - Different states
4. **MUI Styling** - Material-UI classes (if applicable)
5. **Component Functionality** - Behavior testing
6. **Event Handling** - User interactions
7. **Form Integration** - Form behavior (if applicable)
8. **Accessibility** - ARIA and keyboard navigation
9. **Edge Cases** - Boundary conditions
10. **Real-world Scenarios** - Realistic usage patterns
11. **Theme Testing** - Theme compatibility testing (MANDATORY)
12. **Snapshot Tests** - Visual regression testing (MANDATORY FINAL SECTION)

## Common Pitfalls

### 1. DOM Query Issues
```tsx
// ❌ Avoid - brittle and implementation-dependent
const element = container.querySelector('.specific-class');

// ✅ Prefer - user-focused queries
const element = screen.getByRole("button");
```

### 2. Async Testing Issues
```tsx
// ❌ Avoid - may cause flaky tests
expect(screen.getByText("Loading")).toBeInTheDocument();

// ✅ Prefer - wait for state changes
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

### 3. Event Handling Issues
```tsx
// ❌ Avoid - doesn't simulate real user interactions
fireEvent.click(element);

// ✅ Prefer - simulates real user behavior
await user.click(element);
```

### 4. Multiple Element Queries
```tsx
// ❌ Avoid - may fail if multiple elements exist
const text = screen.getByText(/helper text/i);

// ✅ Prefer - handle multiple matches explicitly
const texts = screen.getAllByText(/helper text/i);
expect(texts[0]).toBeInTheDocument();
```

### 5. Deprecated MUI Props
```tsx
// ❌ Avoid - deprecated MUI patterns
<DsTextField 
  inputProps={{ 'aria-describedby': 'help' }}
  InputProps={{ endAdornment: <Icon /> }}
/>

// ✅ Prefer - modern slots system
<DsTextField 
  slotProps={{
    input: { 'aria-describedby': 'help' } as any
  }}
  slots={{
    input: CustomInputComponent
  }}
/>
```

### 6. Raw HTML Element Usage
```tsx
// ❌ Avoid - Using raw HTML elements in tests
const { container } = render(
  <div>
    <form>
      <fieldset>
        <legend>Form Legend</legend>
        <label>
          <ComponentName />
          <span>Label text</span>
        </label>
        <p>Helper text</p>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </div>
);

// ✅ Prefer - Using design system components
const { container } = render(
  <DsBox component="form">
    <DsFormControl component="fieldset">
      <DsFormLabel component="legend">Form Legend</DsFormLabel>
      <DsFormControlLabel
        control={<ComponentName />}
        label={<DsTypography>Label text</DsTypography>}
      />
      <DsFormHelperText>Helper text</DsFormHelperText>
    </DsFormControl>
    <DsButton type="submit">Submit</DsButton>
  </DsBox>
);
```

### 7. Inadequate Snapshot Testing
```tsx
// ❌ Avoid - Missing snapshot tests entirely
describe("ComponentName", () => {
  // Only functional tests, no snapshots
});

// ❌ Avoid - Minimal snapshot coverage
describe("Snapshot Tests", () => {
  it("should match snapshot", () => {
    const { container } = render(<ComponentName />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

// ✅ Prefer - Comprehensive snapshot coverage
describe("Snapshot Tests", () => {
  it("should match snapshot with default props", () => {
    const { container } = render(<ComponentName />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match snapshot with different states", () => {
    const states = [
      { checked: true, disabled: false },
      { checked: false, disabled: true },
      { indeterminate: true }
    ];

    states.forEach((state, index) => {
      const { container } = render(<ComponentName {...state} />);
      expect(container.firstChild).toMatchSnapshot(`component-state-${index}`);
    });
  });

  it("should match snapshot with variants", () => {
    const variants = ['primary', 'secondary', 'error'];
    variants.forEach(variant => {
      const { container } = render(<ComponentName color={variant} />);
      expect(container.firstChild).toMatchSnapshot(`component-${variant}`);
    });
  });

  it("should match snapshot in real-world scenario", () => {
    const { container } = render(
      <DsPaper sx={{ p: 2 }}>
        <DsFormControl>
          <DsFormLabel>Component Label</DsFormLabel>
          <ComponentName required />
          <DsFormHelperText>Helper text</DsFormHelperText>
        </DsFormControl>
      </DsPaper>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### 8. Inconsistent Design System Usage
```tsx
// ❌ Avoid - Mixed usage of raw HTML and design system components
const { container } = render(
  <DsBox>
    <DsTypography>Title</DsTypography>
    <div> {/* Raw HTML mixed with design system */}
      <ComponentName />
      <span>Mixed content</span> {/* Raw HTML */}
    </div>
    <DsButton>Action</DsButton>
  </DsBox>
);

// ✅ Prefer - Consistent design system usage
const { container } = render(
  <DsBox>
    <DsTypography variant="h6">Title</DsTypography>
    <DsBox sx={{ my: 2 }}>
      <ComponentName />
      <DsTypography variant="body2">Consistent content</DsTypography>
    </DsBox>
    <DsButton variant="contained">Action</DsButton>
  </DsBox>
);
```

### 9. Missing Theme Testing
```tsx
// ❌ Avoid - Testing only default theme
describe("ComponentName", () => {
  it("should render correctly", () => {
    render(<ComponentName />);
    // Only tests light theme by default
  });
});

// ❌ Avoid - Manual theme switching without proper setup
describe("ComponentName", () => {
  it("should work in dark mode", () => {
    document.body.setAttribute('data-theme', 'dark');
    render(<ComponentName />);
    // Improper theme testing
  });
});

// ✅ Prefer - Comprehensive theme testing
describe("Theme Testing", () => {
  const themes = ['light', 'dark', 'highContrast'] as const;

  it("should render correctly across all themes", () => {
    themes.forEach(themeMode => {
      const { container } = renderWithTheme(<ComponentName />, themeMode);
      
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
      expect(container.firstChild).toMatchSnapshot(`component-${themeMode}`);
    });
  });

  it("should maintain functionality across themes", async () => {
    const handleClick = vi.fn();
    
    for (const theme of themes) {
      const { container } = renderWithTheme(
        <ComponentName onClick={handleClick} />, 
        theme
      );
      
      const element = screen.getByRole("button");
      await user.click(element);
      expect(handleClick).toHaveBeenCalled();
      handleClick.mockClear();
    }
  });
});
```

### 10. Inadequate Theme Coverage
```tsx
// ❌ Avoid - Testing only light and dark themes
describe("Theme Testing", () => {
  it("should work in light mode", () => {
    const { container } = renderWithTheme(<ComponentName />, 'light');
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should work in dark mode", () => {
    const { container } = renderWithTheme(<ComponentName />, 'dark');
    expect(container.firstChild).toMatchSnapshot();
  });
  // Missing high contrast theme testing!
});

// ✅ Prefer - Complete theme coverage
describe("Theme Testing", () => {
  const themes = ['light', 'dark', 'highContrast'] as const;
  const colors = ['primary', 'secondary', 'error'] as const;

  it("should render correctly in all theme modes", () => {
    themes.forEach(theme => {
      const { container } = renderWithTheme(<ComponentName />, theme);
      expect(container.firstChild).toMatchSnapshot(`default-${theme}`);
    });
  });

  it("should handle color variants across all themes", () => {
    themes.forEach(theme => {
      colors.forEach(color => {
        const { container } = renderWithTheme(
          <ComponentName color={color} />, 
          theme
        );
        expect(container.firstChild).toMatchSnapshot(`${color}-${theme}`);
      });
    });
  });
});
```

## Template

Use this template for new component test files:

```tsx
/**
 * @vitest-environment jsdom
 * 
 * Test suite for [ComponentName] component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling (if applicable)
 * 5. Event Handling - User interactions and event handlers
 * 6. Form Integration - Form behavior and validation (if applicable)
 * 7. Accessibility - ARIA attributes and keyboard navigation
 * 8. Edge Cases - Unusual scenarios and boundary conditions
 * 9. Real-world Scenarios - Common usage patterns
 * 10. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 11. Snapshot Testing - Visual regression testing across all states and themes
 * 
 * @package @am92/react-design-system
 * @component [ComponentName]
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, renderWithoutTheme, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { ComponentName } from "./ComponentName.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { 
  DsBox, 
  DsTypography, 
  DsButton,
  DsPaper,
  DsFormControl,
  DsFormLabel,
  DsFormHelperText
} from "../index";

describe("ComponentName Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<ComponentName />);
      const element = screen.getByRole("button"); // Adjust role as needed
      expect(element).toBeInTheDocument();
    });

    // Add more core rendering tests...
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with design system theme by default", () => {
      render(<ComponentName />); // Automatically includes theme
      
      const element = screen.getByRole("button"); // Adjust role as needed
      expect(element).toBeInTheDocument();
      // Test design system defaults here
    });

    it("should accept and display custom props", () => {
      render(<ComponentName customProp="value" />);
      // Add assertions based on component behavior
    });

    it("should handle edge case without theme", () => {
      // Only use this for testing raw MUI behavior
      const { container } = renderWithoutTheme(<ComponentName />);
      // Test MUI defaults here
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should work across all color schemes", () => {
      testAllThemes(
        (colorScheme) => <ComponentName data-testid={`component-${colorScheme}`} />,
        (container, colorScheme) => {
          const component = container.querySelector(`[data-testid="component-${colorScheme}"]`);
          expect(component).toBeInTheDocument();
          
          // Add theme-specific assertions here
          const wrapperElement = container.firstChild as HTMLElement;
          expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        }
      );
    });

    it("should use design system colors", () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(<ComponentName color="primary" />, { colorScheme });
        
        // Verify theme-specific styling
        const element = container.querySelector('.MuiComponent-root'); // Adjust selector
        expect(element).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {

    it("should handle slotProps for input customization", () => {
      render(
        <ComponentName 
          slotProps={{
            input: {
              'aria-describedby': 'help-text'
            } as any
          }} 
        />
      );
      
      const element = screen.getByRole("textbox"); // Adjust role as needed
      expect(element).toHaveAttribute("aria-describedby", "help-text");
    });

    it("should support custom slot components", () => {
      const CustomComponent = ({ ownerState, ...props }: any) => (
        <input {...props} data-custom="custom-element" />
      );
      
      render(
        <ComponentName 
          slots={{
            input: CustomComponent
          }}
        />
      );
      
      const element = screen.getByRole("textbox");
      expect(element).toHaveAttribute("data-custom", "custom-element");
    });

    // Add more props validation tests...
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in different states", () => {
      render(<ComponentName disabled />);
      const element = screen.getByRole("button");
      expect(element).toBeDisabled();
    });

    // Add more state tests...
  });

  // ============================
  // MUI STYLING TESTS (if applicable)
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      render(<ComponentName />);
      const element = screen.getByRole("button");
      expect(element).toHaveClass('MuiComponent-root');
    });

    // Add more MUI styling tests...
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle user interactions", async () => {
      const handleClick = vi.fn();
      render(<ComponentName onClick={handleClick} />);
      const element = screen.getByRole("button");
      
      await user.click(element);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    // Add more event handling tests...
  });

  // ============================
  // FORM INTEGRATION TESTS (if applicable)
  // ============================
  describe("Form Integration", () => {
    it("should work within forms", () => {
      render(
        <form>
          <ComponentName name="test-field" />
        </form>
      );
      // Add form-specific assertions
    });

    // Add more form integration tests...
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<ComponentName label="Accessible Component" />);
      const element = screen.getByRole("button");
      expect(element).toHaveAccessibleName("Accessible Component");
    });

    // Add more accessibility tests...
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle edge cases gracefully", () => {
      render(<ComponentName value={null as any} />);
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });

    // Add more edge case tests...
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work in common usage patterns", async () => {
      // Test realistic usage scenarios
    });

    // Add more real-world scenario tests...
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const themes = ['light', 'dark', 'highContrast'] as const;

    it("should render correctly across all themes", () => {
      themes.forEach(themeMode => {
        const { container } = renderWithTheme(<ComponentName />, themeMode);
        
        const element = screen.getByRole("button"); // Adjust role as needed
        expect(element).toBeInTheDocument();
        expect(container.firstChild).toMatchSnapshot(`component-${themeMode}-theme`);
      });
    });

    it("should maintain functionality across all themes", async () => {
      const handleClick = vi.fn();
      
      for (const theme of themes) {
        const { container } = renderWithTheme(
          <ComponentName onClick={handleClick} />, 
          theme
        );
        
        const element = screen.getByRole("button");
        await user.click(element);
        expect(handleClick).toHaveBeenCalled();
        handleClick.mockClear();
      }
    });

    it("should handle color variants across themes", () => {
      const colors = ['primary', 'secondary', 'error'] as const;
      
      themes.forEach(theme => {
        colors.forEach(color => {
          const { container } = renderWithTheme(
            <ComponentName color={color} />, 
            theme
          );
          
          const element = screen.getByRole("button");
          expect(element).toHaveClass(`MuiButton-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
          expect(container.firstChild).toMatchSnapshot(`${color}-${theme}`);
        });
      });
    });

    // Add more theme-specific tests...
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<ComponentName />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshots across all themes", () => {
      const themes = ['light', 'dark', 'highContrast'] as const;
      
      themes.forEach(theme => {
        const { container } = renderWithTheme(<ComponentName />, theme);
        expect(container.firstChild).toMatchSnapshot(`default-${theme}`);
      });
    });

    // Add more comprehensive snapshot tests...
  });
});
```

## Component Documentation

Component-specific testing documentation is maintained in the `Components/` folder alongside this guidelines document. When implementing tests for new components, ensure you:

### 1. Create Component Documentation
Create a detailed documentation file in `src/Tests/documentation/Components/[ComponentName].md` that includes:
- Test file location reference
- Complete test case breakdown by category
- Props coverage with TypeScript types
- Testing patterns used
- Coverage metrics and statistics
- Real-world usage examples

### 2. Update Documentation Index
Add your component to the `TEST-COVERAGE.md` file with test metrics:
```markdown
- [ComponentName](./Components/ComponentName.md) - X tests across Y categories
```

### 3. Follow Established Patterns
Reference existing component documentation for consistency:
- **DsAccordion.md** - Complex interactive component with state management
- **DsTextField.md** - Form input component with validation and sub-components
- **DsButton.md** - Basic interactive component with variants

### 4. Testing Documentation Template
Each component documentation should follow this structure:
- **Test File Location** - Path to the test file
- **Test Cases** - Breakdown by the 10 testing categories
- **Props Coverage** - Complete prop documentation with types
- **Testing Patterns Established** - Reusable patterns for similar components
- **Coverage Report** - Metrics and statistics

### 5. Maintenance
- Update documentation when tests are modified
- Include new testing patterns discovered
- Track coverage improvements over time
- Document any component-specific testing challenges

## Component Testing Anti-Patterns

Based on lessons learned from improving component test suites, here are critical anti-patterns to avoid:

### 1. Testing Theme Infrastructure Instead of Component Behavior

**❌ NEVER Test Theme System Configuration**
```tsx
// WRONG - Testing theme infrastructure, not component behavior
it('should validate theme differences across color schemes', () => {
  const lightTheme = getColorScheme(PALETTE).light;
  const darkTheme = getColorScheme(PALETTE).dark;
  const highContrastTheme = getColorScheme(PALETTE).highContrast;
  
  expect(lightTheme.primary.main).not.toBe(darkTheme.primary.main);
  expect(darkTheme.primary.main).not.toBe(highContrastTheme.primary.main);
});
```

**✅ CORRECT - Test Component Integration with Themes**
```tsx
// CORRECT - Testing how component responds to theme changes
it('should apply theme colors correctly', () => {
  const { rerender } = render(
    <ThemeProvider theme={getColorScheme(PALETTE).light}>
      <DsLoader data-testid="loader" />
    </ThemeProvider>
  );
  
  const loader = screen.getByTestId('loader');
  expect(loader).toHaveStyle({ '--ds-color-primary': expect.any(String) });
  
  rerender(
    <ThemeProvider theme={getColorScheme(PALETTE).dark}>
      <DsLoader data-testid="loader" />
    </ThemeProvider>
  );
  
  expect(loader).toHaveStyle({ '--ds-color-primary': expect.any(String) });
});
```

### 2. Using Raw HTML Elements Instead of Design System Components

**❌ NEVER Use Raw HTML Elements**
```tsx
// WRONG - Using raw HTML elements
render(
  <div>
    <span>Test content</span>
    <button onClick={mockFn}>Click me</button>
  </div>
);
```

**✅ CORRECT - Use Design System Components**
```tsx
// CORRECT - Using design system components
render(
  <DsBox>
    <DsTypography>Test content</DsTypography>
    <DsButton onClick={mockFn}>Click me</DsButton>
  </DsBox>
);
```

### 3. Testing Implementation Details Instead of User Behavior

**❌ NEVER Test Internal State or Methods**
```tsx
// WRONG - Testing implementation details
it('should call internal setState method', () => {
  const component = shallow(<DsComponent />);
  const instance = component.instance();
  const spy = vi.spyOn(instance, 'setState');
  
  component.find('button').simulate('click');
  expect(spy).toHaveBeenCalled();
});
```

**✅ CORRECT - Test User Observable Behavior**
```tsx
// CORRECT - Testing user-observable outcomes
it('should show loading state when clicked', async () => {
  const user = userEvent.setup();
  render(<DsComponent />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
```

### 4. Over-Using fireEvent Instead of userEvent

**❌ AVOID fireEvent for User Interactions**
```tsx
// WRONG - Using fireEvent for user interactions
fireEvent.click(button);
fireEvent.change(input, { target: { value: 'test' } });
```

**✅ CORRECT - Use userEvent for Realistic Interactions**
```tsx
// CORRECT - Using userEvent for realistic user behavior
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'test');
```

### 5. Testing Without Proper Theme Context

**❌ NEVER Test Components Without Theme Provider**
```tsx
// WRONG - Missing theme context
render(<DsComponent />);
```

**✅ CORRECT - Always Include Theme Provider**
```tsx
// CORRECT - Proper theme context
render(
  <ThemeProvider theme={getColorScheme(PALETTE).light}>
    <DsComponent />
  </ThemeProvider>
);
```

### 6. Incomplete Error Boundary Testing

**❌ NEVER Test Only Happy Path**
```tsx
// WRONG - Only testing successful scenarios
it('should render successfully', () => {
  render(<DsComponent />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
```

**✅ CORRECT - Test Error Conditions**
```tsx
// CORRECT - Testing error scenarios
it('should handle invalid props gracefully', () => {
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  render(<DsComponent invalidProp={null} />);
  expect(screen.getByText(/error/i)).toBeInTheDocument();
  
  consoleSpy.mockRestore();
});
```

### 7. Missing Accessibility Testing

**❌ NEVER Skip Accessibility Validation**
```tsx
// WRONG - No accessibility testing
it('should render component', () => {
  render(<DsComponent />);
  expect(screen.getByText('Content')).toBeInTheDocument();
});
```

**✅ CORRECT - Include Accessibility Testing**
```tsx
// CORRECT - Testing accessibility
it('should be accessible', async () => {
  const { container } = render(<DsComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 8. Inconsistent Test Organization

**❌ NEVER Use Inconsistent Test Structure**
```tsx
// WRONG - Random test organization
describe('DsComponent', () => {
  it('renders');
  it('handles clicks');
  it('has themes');
  it('validates props');
});
```

**✅ CORRECT - Follow 12-Section Structure**
```tsx
// CORRECT - Organized test structure
describe('DsComponent', () => {
  describe('1. Rendering & Basic Functionality', () => {});
  describe('2. Props & Configuration', () => {});
  describe('3. User Interactions', () => {});
  describe('4. Styling & Theming', () => {});
  // ... continue with all 12 sections
});
```

### 9. Unused Import Anti-Patterns

**❌ NEVER Keep Unused Testing Imports**
```tsx
// WRONG - Unused imports cluttering test files
import { vi, expect } from 'vitest';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { renderWithoutTheme, testAllThemes } from '../utils/testUtils';
// Only using screen and expect
```

**✅ CORRECT - Only Import What You Need**
```tsx
// CORRECT - Clean, necessary imports only
import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithTheme } from '../utils/testUtils';
```

### Key Takeaways

1. **Test component behavior, not theme infrastructure**
2. **Always use design system components in tests**
3. **Focus on user-observable outcomes**
4. **Use userEvent for realistic interactions**
5. **Include proper theme context**
6. **Test error conditions and edge cases**
7. **Include accessibility validation**
8. **Follow consistent test organization**
9. **Keep imports clean and necessary**

## Conclusion

Following these guidelines will ensure consistent, comprehensive, and maintainable test suites across all components in the AM92 React Design System. Remember to:

1. **Test behavior, not implementation**
2. **Focus on user interactions and experiences**
3. **Cover edge cases and error conditions**
4. **Ensure accessibility compliance**
5. **Maintain test independence and clarity**
6. **Use descriptive test names and organized structure**
7. **🚨 MANDATORY: Always use design system components, never raw HTML elements**
8. **🚨 MANDATORY: Test all components across light, dark, and high contrast themes**
9. **🚨 MANDATORY: Include comprehensive snapshot testing in every component test suite**
10. **🚨 MANDATORY: Follow the 12-section test organization structure with Theme Testing and Snapshot Tests as final sections**

### Critical Requirements Enforcement

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
