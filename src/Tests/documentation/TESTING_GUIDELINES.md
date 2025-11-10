# Testing Guidelines for AM92 React Design System

## Overview
This document provides comprehensive guidelines for writing unit tests for components in the AM92 React Design System. It outlines testing strategies, patterns, and best practices based on the test suite developed for the `DsTextField` component.

## Table of Contents
1. [Testing Framework Setup](#testing-framework-setup)
2. [Test File Structure](#test-file-structure)
3. [Testing Categories](#testing-categories)
4. [Testing Patterns](#testing-patterns)
5. [Material-UI Testing](#material-ui-testing)
6. [Accessibility Testing](#accessibility-testing)
7. [Best Practices](#best-practices)
8. [Common Pitfalls](#common-pitfalls)
9. [Template](#template)

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
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ComponentName } from "./ComponentName.Component";
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

## Best Practices

### 1. Test Descriptions
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
 * 
 * @package @am92/react-design-system
 * @component [ComponentName]
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { ComponentName } from "./ComponentName.Component";

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
    it("should accept and display custom props", () => {
      render(<ComponentName customProp="value" />);
      // Add assertions based on component behavior
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

## Conclusion

Following these guidelines will ensure consistent, comprehensive, and maintainable test suites across all components in the AM92 React Design System. Remember to:

1. **Test behavior, not implementation**
2. **Focus on user interactions and experiences**
3. **Cover edge cases and error conditions**
4. **Ensure accessibility compliance**
5. **Maintain test independence and clarity**
6. **Use descriptive test names and organized structure**

These guidelines should be reviewed and updated as new testing patterns emerge or framework capabilities change.
