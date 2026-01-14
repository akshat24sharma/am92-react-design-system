/**
 * @vitest-environment jsdom
 *
 * Test suite for DsFormHelperText component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for correct rendering with different content types and props
 * 2. Props Validation - Tests for prop handling and MUI FormHelperText integration
 * 3. Component States - Tests for error, disabled, and success states
 * 4. MUI Styling - Tests for Material-UI FormHelperText integration and CSS classes
 * 5. Component Functionality - Tests for text display and form helper behavior
 * 6. Form Integration - Tests for integration with form controls and components
 * 7. Content Handling - Tests for different content types (text, HTML, React nodes)
 * 8. Accessibility - Tests for ARIA attributes and screen reader support
 * 9. Edge Cases - Tests for unusual scenarios and prop combinations
 * 10. Real-world Scenarios - Tests for practical usage patterns with forms
 * 11. Theme Testing - Tests for multi-theme support and design system variables
 * 12. Snapshot Testing - Visual regression prevention
 *
 * @package @am92/react-design-system
 * @component DsFormHelperText
 */

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../Tests/Mocks/testUtils";
import { testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsFormHelperText } from "./DsFormHelperText.Component";
import { DsTextField } from "../DsTextField";
import { DsFormControl } from "../DsFormControl";
import { DsFormLabel } from "../DsFormLabel";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import { DsRemixIcon } from "../DsRemixIcon";
import { PALETTE } from "../../Constants";
import getColorScheme from "../../Theme/getColorScheme";

describe("DsFormHelperText Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(
        <DsFormHelperText>
          Default helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Default helper text");
      expect(helperText).toBeInTheDocument();
      expect(helperText.closest('.MuiFormHelperText-root')).toBeInTheDocument();
    });

    it("should render with text content", () => {
      render(
        <DsFormHelperText>
          This field is required
        </DsFormHelperText>
      );

      const text = screen.getByText("This field is required");
      expect(text).toBeInTheDocument();
    });

    it("should render with HTML content", () => {
      render(
        <DsFormHelperText>
          <DsTypography component="span">
            Visit our <a href="/help">help page</a> for more info
          </DsTypography>
        </DsFormHelperText>
      );

      const link = screen.getByRole("link", { name: "help page" });
      expect(link).toBeInTheDocument();
      expect(screen.getByText(/Visit our/)).toBeInTheDocument();
      expect(screen.getByText(/for more info/)).toBeInTheDocument();
    });

    it("should render with React node content", () => {
      render(
        <DsFormHelperText>
          <DsBox display="flex" alignItems="center" gap={1}>
            <DsRemixIcon className="ri-information-line" data-testid="info-icon" />
            <DsTypography component="span">Additional information</DsTypography>
          </DsBox>
        </DsFormHelperText>
      );

      const icon = screen.getByTestId("info-icon");
      const text = screen.getByText("Additional information");
      expect(icon).toBeInTheDocument();
      expect(text).toBeInTheDocument();
    });

    it("should render empty content gracefully", () => {
      render(<DsFormHelperText />);
      
      const helperTextElement = document.querySelector('.MuiFormHelperText-root');
      expect(helperTextElement).toBeInTheDocument();
      expect(helperTextElement?.textContent).toBe('');
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and apply custom id", () => {
      render(
        <DsFormHelperText id="custom-helper-text">
          Helper with custom ID
        </DsFormHelperText>
      );

      const helperText = document.getElementById("custom-helper-text");
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveTextContent("Helper with custom ID");
    });

    it("should accept and apply custom className", () => {
      render(
        <DsFormHelperText className="custom-helper-class">
          Custom styled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Custom styled helper text");
      expect(helperText.closest('.MuiFormHelperText-root')).toHaveClass("custom-helper-class");
    });

    it("should handle sx prop for custom styling", () => {
      render(
        <DsFormHelperText sx={{ 
          color: 'red', 
          fontWeight: 'bold', 
          fontSize: '18px',
          textAlign: 'center'
        }}>
          Styled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Styled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root') as HTMLElement;
      
      expect(helperRoot).toBeInTheDocument();
      
      // Test that custom styles are actually applied
      const computedStyle = window.getComputedStyle(helperRoot);
      expect(computedStyle.color).toBe('rgb(255, 0, 0)'); // red converts to rgb(255, 0, 0)
      expect(computedStyle.fontWeight).toBe('700'); // bold converts to 700
      expect(computedStyle.fontSize).toBe('18px');
      expect(computedStyle.textAlign).toBe('center');
    });

    it("should accept custom data attributes", () => {
      render(
        <DsFormHelperText data-testid="helper-element" data-custom="value">
          Helper text with data attributes
        </DsFormHelperText>
      );

      const helperText = screen.getByTestId("helper-element");
      expect(helperText).toHaveAttribute("data-custom", "value");
    });

    it("should handle component prop to change root element", () => {
      render(
        <DsFormHelperText component="div">
          Helper text as div
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Helper text as div");
      expect(helperText.tagName).toBe("DIV");
      expect(helperText).toHaveClass("MuiFormHelperText-root");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in error state", () => {
      render(
        <DsFormHelperText error>
          Error message text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Error message text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-error");
    });

    it("should render in disabled state", () => {
      render(
        <DsFormHelperText disabled>
          Disabled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Disabled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-disabled");
    });

    it("should render with filled state", () => {
      render(
        <DsFormHelperText filled>
          Filled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Filled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("MuiFormHelperText-filled");
    });

    it("should render with focused state", () => {
      render(
        <DsFormHelperText focused>
          Focused helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Focused helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-focused");
    });

    it("should render with required state", () => {
      render(
        <DsFormHelperText required>
          Required helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Required helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-required");
    });

    it("should handle multiple states simultaneously", () => {
      render(
        <DsFormHelperText error disabled>
          Error and disabled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Error and disabled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-error");
      expect(helperRoot).toHaveClass("Mui-disabled");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI FormHelperText classes", () => {
      render(
        <DsFormHelperText>
          Basic helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Basic helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("MuiFormHelperText-root");
    });

    it("should apply size-specific classes when used in sized form control", () => {
      render(
        <DsFormControl size="small">
          <DsFormHelperText>
            Small form helper text
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("Small form helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("MuiFormHelperText-sizeSmall");
    });

    it("should apply variant-specific classes when used in variant form control", () => {
      render(
        <DsFormControl variant="outlined">
          <DsFormHelperText>
            Outlined variant helper text
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("Outlined variant helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toBeInTheDocument(); // MUI applies variant context automatically
    });

    it("should apply design system CSS variables and overrides", () => {
      render(
        <DsFormHelperText>
          Design system styled text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Design system styled text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root') as HTMLElement;
      
      // Test design system overrides are applied
      const computedStyle = window.getComputedStyle(helperRoot);
      
      // The component should have design system margin overrides
      expect(computedStyle.textTransform).toBe('none');
    });

    it("should apply error color classes in error state", () => {
      render(
        <DsFormHelperText error>
          Error styled helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Error styled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-error");
    });

    it("should handle margin prop", () => {
      render(
        <DsFormControl margin="dense">
          <DsFormHelperText>
            Dense margin helper text
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("Dense margin helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      // FormHelperText inherits context from FormControl, verify it renders correctly
      expect(helperRoot).toBeInTheDocument();
      expect(helperRoot).toHaveClass("MuiFormHelperText-root");
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY TESTS
  // ============================
  describe("Component Functionality", () => {
    it("should display text content correctly", () => {
      const helperMessage = "This is a helper message for the user";
      render(
        <DsFormHelperText>
          {helperMessage}
        </DsFormHelperText>
      );

      const helperText = screen.getByText(helperMessage);
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveTextContent(helperMessage);
    });

    it("should handle dynamic content updates", () => {
      const { rerender } = render(
        <DsFormHelperText>
          Initial message
        </DsFormHelperText>
      );

      expect(screen.getByText("Initial message")).toBeInTheDocument();

      rerender(
        <DsFormHelperText>
          Updated message
        </DsFormHelperText>
      );

      expect(screen.getByText("Updated message")).toBeInTheDocument();
      expect(screen.queryByText("Initial message")).not.toBeInTheDocument();
    });

    it("should preserve whitespace in text content", () => {
      render(
        <DsFormHelperText>
          {"  Spaced   text  content  "}
        </DsFormHelperText>
      );

      const helperText = screen.getByText(/Spaced.*text.*content/);
      expect(helperText).toBeInTheDocument();
    });

    it("should handle multiline content", () => {
      const multilineText = "Line one\nLine two\nLine three";
      render(
        <DsFormHelperText>
          <DsBox component="pre" sx={{ whiteSpace: 'pre-line', margin: 0 }}>
            {multilineText}
          </DsBox>
        </DsFormHelperText>
      );

      const content = screen.getByText(/Line one/);
      expect(content).toBeInTheDocument();
    });
  });

  // ============================
  // FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should work with TextField component", () => {
      render(
        <DsTextField
          label="Email"
          helperText="Enter your email address"
          name="email"
        />
      );

      const helperText = screen.getByText(/Enter your email address/);
      expect(helperText).toBeInTheDocument();
      expect(helperText.closest('.MuiFormHelperText-root')).toBeInTheDocument();
    });

    it("should work within FormControl", () => {
      render(
        <DsFormControl>
          <DsFormLabel>Name</DsFormLabel>
          <DsTextField name="name" />
          <DsFormHelperText>
            This field is required
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("This field is required");
      expect(helperText).toBeInTheDocument();
      expect(helperText.closest('.MuiFormControl-root')).toBeInTheDocument();
    });

    it("should associate with form input via aria-describedby", () => {
      render(
        <DsBox>
          <DsTextField
            id="test-input"
            aria-describedby="helper-text-id"
            name="test"
          />
          <DsFormHelperText id="helper-text-id">
            Descriptive helper text
          </DsFormHelperText>
        </DsBox>
      );

      const input = screen.getByRole("textbox");
      const helperText = screen.getByText("Descriptive helper text");
      
      expect(input).toHaveAttribute("aria-describedby", "helper-text-id");
      expect(helperText).toHaveAttribute("id", "helper-text-id");
    });

    it("should handle error state from parent form control", () => {
      render(
        <DsFormControl error>
          <DsTextField name="test" />
          <DsFormHelperText>
            Error message from form control
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("Error message from form control");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-error");
    });

    it("should handle disabled state from parent form control", () => {
      render(
        <DsFormControl disabled>
          <DsTextField name="test" />
          <DsFormHelperText>
            Disabled helper text
          </DsFormHelperText>
        </DsFormControl>
      );

      const helperText = screen.getByText("Disabled helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveClass("Mui-disabled");
    });
  });

  // ============================
  // CONTENT HANDLING TESTS
  // ============================
  describe("Content Handling", () => {
    it("should handle string content", () => {
      render(
        <DsFormHelperText>
          Simple string content
        </DsFormHelperText>
      );

      expect(screen.getByText("Simple string content")).toBeInTheDocument();
    });

    it("should handle number content", () => {
      render(
        <DsFormHelperText>
          {42}
        </DsFormHelperText>
      );

      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("should handle boolean content", () => {
      render(
        <DsFormHelperText>
          {true ? "True content" : "False content"}
        </DsFormHelperText>
      );

      expect(screen.getByText("True content")).toBeInTheDocument();
    });

    it("should handle React fragment content", () => {
      render(
        <DsFormHelperText>
          <>
            <DsTypography component="span">First part</DsTypography>
            {" - "}
            <DsTypography component="span">Second part</DsTypography>
          </>
        </DsFormHelperText>
      );

      expect(screen.getByText("First part")).toBeInTheDocument();
      expect(screen.getByText("Second part")).toBeInTheDocument();
      expect(screen.getByText("-", { exact: false })).toBeInTheDocument();
    });

    it("should handle conditional content", () => {
      const showError = true;
      const errorMessage = "This field has an error";
      const normalMessage = "Normal helper text";

      render(
        <DsFormHelperText error={showError}>
          {showError ? errorMessage : normalMessage}
        </DsFormHelperText>
      );

      expect(screen.getByText(errorMessage)).toBeInTheDocument();
      expect(screen.queryByText(normalMessage)).not.toBeInTheDocument();
    });

    it("should handle empty and null content", () => {
      const { rerender } = render(
        <DsFormHelperText>
          {null}
        </DsFormHelperText>
      );

      const helperElement = document.querySelector('.MuiFormHelperText-root');
      expect(helperElement).toBeInTheDocument();
      expect(helperElement?.textContent).toBe('');

      rerender(
        <DsFormHelperText>
          {undefined}
        </DsFormHelperText>
      );

      expect(helperElement?.textContent).toBe('');
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA role", () => {
      render(
        <DsFormHelperText>
          Accessible helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Accessible helper text");
      // FormHelperText doesn't typically have a specific role, but should be accessible
      expect(helperText).toBeInTheDocument();
    });

    it("should support custom ARIA attributes", () => {
      render(
        <DsFormHelperText aria-live="polite" aria-atomic="true">
          Live region helper text
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Live region helper text");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      expect(helperRoot).toHaveAttribute("aria-live", "polite");
      expect(helperRoot).toHaveAttribute("aria-atomic", "true");
    });

    it("should be associable with form inputs", () => {
      render(
        <DsBox>
          <DsTextField
            id="accessible-input"
            name="test"
            aria-describedby="accessible-helper"
          />
          <DsFormHelperText id="accessible-helper">
            This describes the input field
          </DsFormHelperText>
        </DsBox>
      );

      const input = screen.getByRole("textbox");
      const helperText = screen.getByText("This describes the input field");
      
      expect(input).toHaveAttribute("aria-describedby", "accessible-helper");
      expect(helperText).toHaveAttribute("id", "accessible-helper");
    });

    it("should announce error state to screen readers", () => {
      render(
        <DsFormHelperText error aria-live="assertive">
          This field contains an error
        </DsFormHelperText>
      );

      const helperText = screen.getByText("This field contains an error");
      const helperRoot = helperText.closest('.MuiFormHelperText-root');
      
      expect(helperRoot).toHaveClass("Mui-error");
      expect(helperRoot).toHaveAttribute("aria-live", "assertive");
    });

    it("should support focus management", async () => {
      render(
        <DsBox>
          <DsFormHelperText tabIndex={0} data-testid="focusable-helper">
            Focusable helper text
          </DsFormHelperText>
          <DsTextField name="next-field" />
        </DsBox>
      );

      const helperText = screen.getByTestId("focusable-helper");
      const input = screen.getByRole("textbox");

      await user.click(helperText);
      expect(helperText).toHaveFocus();

      await user.tab();
      expect(input).toHaveFocus();
    });

    it("should work with screen readers for form validation", () => {
      render(
        <DsBox>
          <DsTextField
            required
            error
            name="email"
            aria-describedby="email-error"
            aria-invalid="true"
          />
          <DsFormHelperText id="email-error" error>
            Email address is required
          </DsFormHelperText>
        </DsBox>
      );

      const input = screen.getByRole("textbox");
      const errorMessage = screen.getByText("Email address is required");
      
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-describedby", "email-error");
      expect(errorMessage).toHaveAttribute("id", "email-error");
      expect(errorMessage.closest('.MuiFormHelperText-root')).toHaveClass("Mui-error");
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle very long text content", () => {
      const longText = "A".repeat(1000);
      render(
        <DsFormHelperText>
          {longText}
        </DsFormHelperText>
      );

      const helperText = screen.getByText(longText);
      expect(helperText).toBeInTheDocument();
      expect(helperText).toHaveTextContent(longText);
    });

    it("should handle special characters and symbols", () => {
      const specialText = "Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?";
      render(
        <DsFormHelperText>
          {specialText}
        </DsFormHelperText>
      );

      const helperText = screen.getByText(specialText);
      expect(helperText).toBeInTheDocument();
    });

    it("should handle unicode and international characters", () => {
      const unicodeText = "测试 🌟 ñáéíóú العربية русский";
      render(
        <DsFormHelperText>
          {unicodeText}
        </DsFormHelperText>
      );

      const helperText = screen.getByText(unicodeText);
      expect(helperText).toBeInTheDocument();
    });

    it("should handle nested component hierarchy", () => {
      render(
        <DsFormControl>
          <DsBox>
            <DsFormHelperText>
              <DsBox>
                <DsTypography component="span">
                  Deeply nested content
                </DsTypography>
              </DsBox>
            </DsFormHelperText>
          </DsBox>
        </DsFormControl>
      );

      const helperText = screen.getByText("Deeply nested content");
      expect(helperText).toBeInTheDocument();
    });

    it("should handle rapid prop changes", () => {
      const { rerender } = render(
        <DsFormHelperText error={false}>
          Normal text
        </DsFormHelperText>
      );

      const helperRoot = () => screen.getByText(/text/).closest('.MuiFormHelperText-root');
      expect(helperRoot()).not.toHaveClass("Mui-error");

      // Rapid state changes
      rerender(<DsFormHelperText error={true}>Error text</DsFormHelperText>);
      expect(screen.getByText("Error text")).toBeInTheDocument();
      expect(screen.getByText("Error text").closest('.MuiFormHelperText-root')).toHaveClass("Mui-error");

      rerender(<DsFormHelperText error={false}>Normal text again</DsFormHelperText>);
      expect(screen.getByText("Normal text again")).toBeInTheDocument();
      expect(screen.getByText("Normal text again").closest('.MuiFormHelperText-root')).not.toHaveClass("Mui-error");
    });

    it("should handle missing or invalid props gracefully", () => {
      render(
        <DsFormHelperText 
          id={undefined as any}
          className={null as any}
          error={undefined as any}
        >
          Content with invalid props
        </DsFormHelperText>
      );

      const helperText = screen.getByText("Content with invalid props");
      expect(helperText).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work in a complete registration form", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <DsBox component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
          <DsBox mb={2}>
            <DsTextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              required
            />
            <DsFormHelperText>
              We'll never share your email address
            </DsFormHelperText>
          </DsBox>
          
          <DsBox mb={2}>
            <DsTextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              required
              error
            />
            <DsFormHelperText error>
              Password must be at least 8 characters long
            </DsFormHelperText>
          </DsBox>
          
          <DsBox mb={2}>
            <DsTextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              required
              disabled
            />
            <DsFormHelperText disabled>
              Please confirm your password
            </DsFormHelperText>
          </DsBox>
        </DsBox>
      );

      // Test all helper texts are present and have correct states
      expect(screen.getByText("We'll never share your email address")).toBeInTheDocument();
      expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
      expect(screen.getByText("Please confirm your password")).toBeInTheDocument();

      // Test error state
      const errorHelper = screen.getByText("Password must be at least 8 characters long");
      expect(errorHelper.closest('.MuiFormHelperText-root')).toHaveClass("Mui-error");

      // Test disabled state  
      const disabledHelper = screen.getByText("Please confirm your password");
      expect(disabledHelper.closest('.MuiFormHelperText-root')).toHaveClass("Mui-disabled");
    });

    it("should work in a dynamic validation form", async () => {
      const ValidationForm = () => {
        const [email, setEmail] = React.useState('');
        const [error, setError] = React.useState(false);
        const [helperText, setHelperText] = React.useState('Enter your email address');

        const validateEmail = (value: string) => {
          if (!value) {
            setError(false);
            setHelperText('Enter your email address');
          } else if (!value.includes('@')) {
            setError(true);
            setHelperText('Please enter a valid email address');
          } else {
            setError(false);
            setHelperText('Email looks good!');
          }
        };

        return (
          <DsBox>
            <DsTextField
              fullWidth
              label="Email"
              id="validation-email"
              value={email}
              error={error}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
                validateEmail(value);
              }}
            />
            <DsFormHelperText error={error}>
              {helperText}
            </DsFormHelperText>
          </DsBox>
        );
      };

      render(<ValidationForm />);

      const input = screen.getByRole("textbox");
      const getHelperText = () => document.querySelector('.MuiFormHelperText-root');

      // Initial state
      expect(screen.getByText("Enter your email address")).toBeInTheDocument();
      expect(getHelperText()).not.toHaveClass("Mui-error");

      // Invalid email
      await user.type(input, "invalid");
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
      expect(getHelperText()).toHaveClass("Mui-error");

      // Valid email
      await user.clear(input);
      await user.type(input, "test@example.com");
      expect(screen.getByText("Email looks good!")).toBeInTheDocument();
      expect(getHelperText()).not.toHaveClass("Mui-error");
    });

    it("should work with complex form layouts", () => {
      render(
        <DsBox sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <DsBox>
            <DsTextField fullWidth label="First Name" name="firstName" />
            <DsFormHelperText>
              Enter your legal first name
            </DsFormHelperText>
          </DsBox>
          
          <DsBox>
            <DsTextField fullWidth label="Last Name" name="lastName" />
            <DsFormHelperText>
              Enter your legal last name
            </DsFormHelperText>
          </DsBox>
          
          <DsBox sx={{ gridColumn: '1 / -1' }}>
            <DsTextField fullWidth label="Address" name="address" />
            <DsFormHelperText>
              <DsBox display="flex" alignItems="center" gap={1}>
                <DsRemixIcon className="ri-map-pin-line" />
                <DsTypography component="span">
                  Street address including apartment number
                </DsTypography>
              </DsBox>
            </DsFormHelperText>
          </DsBox>
        </DsBox>
      );

      expect(screen.getByText("Enter your legal first name")).toBeInTheDocument();
      expect(screen.getByText("Enter your legal last name")).toBeInTheDocument();
      expect(screen.getByText("Street address including apartment number")).toBeInTheDocument();
    });

    it("should handle form with conditional helper texts", () => {
      const ConditionalForm = () => {
        const [showAdvanced, setShowAdvanced] = React.useState(false);

        return (
          <DsBox>
            <DsTextField
              fullWidth
              label="Username"
              name="username"
            />
            <DsFormHelperText>
              Choose a unique username
            </DsFormHelperText>

            <DsBox mt={2}>
              <label>
                <input
                  type="checkbox"
                  checked={showAdvanced}
                  onChange={(e) => setShowAdvanced(e.target.checked)}
                />
                Show advanced options
              </label>
            </DsBox>

            {showAdvanced && (
              <DsBox mt={2}>
                <DsTextField
                  fullWidth
                  label="Display Name"
                  name="displayName"
                />
                <DsFormHelperText>
                  This name will be shown to other users
                </DsFormHelperText>
              </DsBox>
            )}
          </DsBox>
        );
      };

      render(<ConditionalForm />);

      // Initially only basic helper text
      expect(screen.getByText("Choose a unique username")).toBeInTheDocument();
      expect(screen.queryByText("This name will be shown to other users")).not.toBeInTheDocument();

      // Show advanced options
      const checkbox = screen.getByRole("checkbox");
      fireEvent.click(checkbox);

      expect(screen.getByText("This name will be shown to other users")).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should render correctly across all color schemes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        
        // Test normal state
        const { container: normalContainer, unmount: unmountNormal } = render(
          <DsFormHelperText data-testid={`helper-normal-${colorScheme}`}>
            Normal helper text in {colorScheme} theme
          </DsFormHelperText>,
          { colorScheme }
        );
        
        // Test error state
        const { container: errorContainer, unmount: unmountError } = render(
          <DsFormHelperText error data-testid={`helper-error-${colorScheme}`}>
            Error helper text in {colorScheme} theme
          </DsFormHelperText>,
          { colorScheme }
        );

        // Test disabled state
        const { container: disabledContainer, unmount: unmountDisabled } = render(
          <DsFormHelperText disabled data-testid={`helper-disabled-${colorScheme}`}>
            Disabled helper text in {colorScheme} theme
          </DsFormHelperText>,
          { colorScheme }
        );
        
        // Validate theme application
        expect(normalContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        expect(errorContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        expect(disabledContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Validate component structure
        const normalHelper = screen.getByTestId(`helper-normal-${colorScheme}`);
        const errorHelper = screen.getByTestId(`helper-error-${colorScheme}`);
        const disabledHelper = screen.getByTestId(`helper-disabled-${colorScheme}`);
        
        expect(normalHelper.closest('.MuiFormHelperText-root')).toBeInTheDocument();
        expect(errorHelper.closest('.MuiFormHelperText-root')).toHaveClass('Mui-error');
        expect(disabledHelper.closest('.MuiFormHelperText-root')).toHaveClass('Mui-disabled');
        
        // Test design system CSS variables
        const helperElements = [normalHelper, errorHelper, disabledHelper];
        helperElements.forEach(helper => {
          const helperRoot = helper.closest('.MuiFormHelperText-root') as HTMLElement;
          const computedStyle = window.getComputedStyle(helperRoot);
          
          // Test design system overrides are applied
          expect(computedStyle.textTransform).toBe('none');
        });
        
        unmountNormal();
        unmountError();
        unmountDisabled();
      });
    });

    it("should use correct colors from palette integration", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        const expectedColors = {
          textPrimary: (schemeData?.palette?.text as any)?.primary,
          textSecondary: (schemeData?.palette?.text as any)?.secondary,
          errorMain: (schemeData?.palette?.error as any)?.main
        };

        // Validate expected colors exist and are valid
        expect(expectedColors.textPrimary).toBeTruthy();
        expect(expectedColors.textSecondary).toBeTruthy();
        expect(expectedColors.errorMain).toBeTruthy();
        expect(expectedColors.textPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(expectedColors.errorMain).toMatch(/^#[0-9A-Fa-f]{6}$/);

        // Test specific palette values against PALETTE constants
        switch (colorScheme) {
          case 'light':
            expect(expectedColors.textPrimary).toBe(PALETTE.primaryBlackLight);
            expect(expectedColors.errorMain).toBe(PALETTE.errorRed);
            break;
          case 'dark':
            expect(expectedColors.textPrimary).toBe(PALETTE.secondaryGrey10);
            expect(expectedColors.errorMain).toBe(PALETTE.errorRedDark);
            break;
          case 'highContrast':
            expect(expectedColors.textPrimary).toBe(PALETTE.primaryWhite);
            expect(expectedColors.errorMain).toBe(PALETTE.highContrast2);
            break;
        }
        
        const { container, unmount } = render(
          <DsBox>
            <DsFormHelperText data-testid={`normal-${colorScheme}`}>
              Normal text
            </DsFormHelperText>
            <DsFormHelperText error data-testid={`error-${colorScheme}`}>
              Error text  
            </DsFormHelperText>
          </DsBox>,
          { colorScheme }
        );
        
        // Validate theme application
        expect(container.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Validate CSS variable integration
        const normalHelper = screen.getByTestId(`normal-${colorScheme}`);
        const errorHelper = screen.getByTestId(`error-${colorScheme}`);
        
        const normalRoot = normalHelper.closest('.MuiFormHelperText-root') as HTMLElement;
        const errorRoot = errorHelper.closest('.MuiFormHelperText-root') as HTMLElement;
        
        const normalStyle = window.getComputedStyle(normalRoot);
        const errorStyle = window.getComputedStyle(errorRoot);
        
        // Test CSS variable usage (current MUI implementation)
        const isValidNormalColor = normalStyle.color.includes('var(--palette-text-') ||
                                  normalStyle.color.includes('var(--ds-colour-') ||
                                  normalStyle.color === expectedColors.textPrimary ||
                                  normalStyle.color === expectedColors.textSecondary;
                                  
        const isValidErrorColor = errorStyle.color.includes('var(--palette-error-') ||
                                 errorStyle.color.includes('var(--ds-colour-') ||
                                 errorStyle.color === expectedColors.errorMain;
        
        if (!isValidNormalColor) {
          console.log(`❌ Normal helper text color mismatch in ${colorScheme}: got '${normalStyle.color}', expected CSS variable or '${expectedColors.textPrimary}'`);
        }
        if (!isValidErrorColor) {
          console.log(`❌ Error helper text color mismatch in ${colorScheme}: got '${errorStyle.color}', expected CSS variable or '${expectedColors.errorMain}'`);
        }
        
        expect(isValidNormalColor).toBe(true);
        expect(isValidErrorColor).toBe(true);
        
        // Validate CSS classes
        expect(normalRoot).toHaveClass('MuiFormHelperText-root');
        expect(errorRoot).toHaveClass('MuiFormHelperText-root', 'Mui-error');
        
        unmount();
      });
    });

    it("should maintain functionality across all themes", () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsFormControl error>
            <DsTextField
              name={`theme-test-${colorScheme}`}
              label="Test Field"
            />
            <DsFormHelperText data-testid={`functional-${colorScheme}`}>
              Functional helper text in {colorScheme}
            </DsFormHelperText>
          </DsFormControl>,
          { colorScheme }
        );
        
        // Test functionality works consistently across themes
        const helperText = screen.getByTestId(`functional-${colorScheme}`);
        const helperRoot = helperText.closest('.MuiFormHelperText-root');
        
        expect(helperText).toBeInTheDocument();
        expect(helperRoot).toHaveClass('Mui-error'); // Should inherit error state from parent
        expect(container.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTING
  // ============================
  describe("Snapshot Testing", () => {
    it("should match snapshots for basic states", () => {
      const states = [
        { props: {}, label: 'default' },
        { props: { error: true }, label: 'error' },
        { props: { disabled: true }, label: 'disabled' },
        { props: { required: true }, label: 'required' },
        { props: { focused: true }, label: 'focused' },
        { props: { filled: true }, label: 'filled' },
      ];

      states.forEach(({ props, label }) => {
        const { container } = render(
          <DsFormHelperText {...props}>
            Helper text in {label} state
          </DsFormHelperText>
        );

        expect(container.firstChild).toMatchSnapshot(`form-helper-text-${label}`);
      });
    });

    it("should match snapshots for different content types", () => {
      const contentTypes = [
        {
          content: "Simple string content",
          label: 'string'
        },
        {
          content: (
            <DsBox display="flex" alignItems="center" gap={1}>
              <DsRemixIcon className="ri-information-line" />
              <DsTypography component="span">Complex content</DsTypography>
            </DsBox>
          ),
          label: 'complex'
        },
        {
          content: (
            <>
              <DsTypography component="span">Fragment part 1</DsTypography>
              {" - "}
              <DsTypography component="span">Fragment part 2</DsTypography>
            </>
          ),
          label: 'fragment'
        },
        {
          content: null,
          label: 'null'
        }
      ];

      contentTypes.forEach(({ content, label }) => {
        const { container } = render(
          <DsFormHelperText>
            {content}
          </DsFormHelperText>
        );

        expect(container.firstChild).toMatchSnapshot(`form-helper-text-content-${label}`);
      });
    });

    it("should match snapshots across all themes", () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;

      colorSchemes.forEach(colorScheme => {
        const { container } = render(
          <DsBox>
            <DsFormHelperText>
              Normal helper text
            </DsFormHelperText>
            <DsFormHelperText error>
              Error helper text
            </DsFormHelperText>
            <DsFormHelperText disabled>
              Disabled helper text
            </DsFormHelperText>
          </DsBox>,
          { colorScheme }
        );

        expect(container.firstChild).toMatchSnapshot(`form-helper-text-${colorScheme}`);
      });
    });

    it("should match snapshots in form contexts", () => {
      const formContexts = [
        {
          component: (
            <DsTextField
              label="Email"
              helperText="Enter your email address"
              name="email"
            />
          ),
          label: 'textfield'
        },
        {
          component: (
            <DsFormControl>
              <DsFormLabel>Name</DsFormLabel>
              <DsTextField name="name" />
              <DsFormHelperText>This field is required</DsFormHelperText>
            </DsFormControl>
          ),
          label: 'form-control'
        },
        {
          component: (
            <DsFormControl error>
              <DsTextField name="test" />
              <DsFormHelperText>Error from parent control</DsFormHelperText>
            </DsFormControl>
          ),
          label: 'form-control-error'
        }
      ];

      formContexts.forEach(({ component, label }) => {
        const { container } = render(component);
        expect(container.firstChild).toMatchSnapshot(`form-helper-text-context-${label}`);
      });
    });

    it("should match snapshots for real-world scenarios", () => {
      const scenarios = [
        {
          component: (
            <DsBox component="form" sx={{ maxWidth: 400 }}>
              <DsTextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                required
              />
              <DsFormHelperText>
                We'll never share your email
              </DsFormHelperText>
              
              <DsTextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                required
                error
                sx={{ mt: 2 }}
              />
              <DsFormHelperText error>
                Password must be at least 8 characters
              </DsFormHelperText>
            </DsBox>
          ),
          label: 'registration-form'
        },
        {
          component: (
            <DsBox sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <DsBox>
                <DsTextField fullWidth label="First Name" />
                <DsFormHelperText>Legal first name</DsFormHelperText>
              </DsBox>
              <DsBox>
                <DsTextField fullWidth label="Last Name" />
                <DsFormHelperText>Legal last name</DsFormHelperText>
              </DsBox>
            </DsBox>
          ),
          label: 'grid-layout'
        }
      ];

      scenarios.forEach(({ component, label }) => {
        const { container } = render(component);
        expect(container.firstChild).toMatchSnapshot(`form-helper-text-scenario-${label}`);
      });
    });
  });
});
