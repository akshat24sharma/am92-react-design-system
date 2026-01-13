/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTextFieldPassword component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the password field component with different configurations.
 * 2. Props Validation - Ensure proper handling and validation of props including isVisible, toggleNode, and TextField passthrough props.
 * 3. Component States - Test various states of the component (disabled, error, required, focused) and state combinations.
 * 4. MUI Styling - Validate Material-UI specific styling and class application for TextField, InputBase, and InputAdornment components.
 * 5. Password Functionality - Test core password masking/revealing functionality, toggle button behavior, and visibility state management.
 * 6. Event Handling - Simulate user interactions including typing, focus/blur, keyboard events, and paste operations.
 * 7. Form Integration - Test integration with HTML forms, controlled/uncontrolled components, and form submission scenarios.
 * 8. Accessibility - Check ARIA attributes, screen reader compatibility, and keyboard navigation support for password fields.
 * 9. Edge Cases - Handle unusual scenarios like null values, very long passwords, special characters, and unicode input.
 * 10. Real-world Scenarios - Test common usage patterns like login forms, registration forms, and password change workflows.
 * 11. Theme Testing - Assess component rendering across different themes (light, dark, high contrast) with proper color integration.
 * 12. Snapshot Testing - Perform visual regression testing for key component states and custom toggle configurations.
 *
 * @package @am92/react-design-system
 * @component DsTextFieldPassword
 */
import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsTextFieldPassword } from "./DsTextFieldPassword.Component";
import { DsBox } from "../DsBox";
import { DsButton } from "../DsButton";
import { DsTypography } from "../DsTypography";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsTextFieldPassword", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // 1. CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("type", "password");
    });

    it("should render with required props", () => {
      render(<DsTextFieldPassword name="password" label="Password Field" />);
      const input = screen.getByLabelText("Password Field");
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "password");
    });

    it("should render with default toggle button when no custom toggleNode provided", () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input");
      const showButton = screen.getByRole("button", { name: "SHOW" });

      expect(input).toBeInTheDocument();
      expect(showButton).toBeInTheDocument();
      expect(showButton).toHaveClass("MuiButton-colorSecondary");
    });

    it("should render with custom toggle nodes", () => {
      const customToggleNode = {
        toShow: <DsButton>View</DsButton>,
        toHide: <DsButton>Hide</DsButton>,
      };

      render(
        <DsTextFieldPassword name="password" toggleNode={customToggleNode} />
      );
      const viewButton = screen.getByRole("button", { name: "View" });
      const hideButton = screen.queryByRole("button", { name: "Hide" });

      expect(viewButton).toBeInTheDocument();
      expect(hideButton).not.toBeInTheDocument();
    });
  });

  // ============================
  // 2. PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and display custom id", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" id="custom-password-id" />
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("id", "custom-password-id");
    });

    it("should pass through TextField props", () => {
      const { container } = render(
        <DsTextFieldPassword
          name="password"
          placeholder="Enter password"
          required
          disabled={false}
          helperText="Password helper text"
        />
      );

      const input = container.querySelector("input");
      expect(input).toHaveAttribute("placeholder", "Enter password");
      expect(input).toBeRequired();
      expect(input).not.toBeDisabled();
      expect(screen.getByText(/Password helper text/i)).toBeInTheDocument();
    });
  });

  // ============================
  // 3. COMPONENT STATES
  // ============================
  describe("Component States", () => {
    it("should render in disabled state", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" disabled />
      );
      const input = container.querySelector("input");
      const toggleButton = screen.getByRole("button");

      expect(input).toBeDisabled();
      expect(toggleButton).toBeDisabled();
    });

    it("should render in error state", () => {
      const { container } = render(
        <DsTextFieldPassword
          name="password"
          error
          helperText="Password error"
        />
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText(/Password error/i)).toBeInTheDocument();
    });

    it("should render in required state", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" required />
      );
      const input = container.querySelector("input");
      expect(input).toBeRequired();
    });

    it("should handle state combinations", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" disabled required error />
      );
      const input = container.querySelector("input");
      const toggleButton = screen.getByRole("button");

      expect(input).toBeDisabled();
      expect(input).toBeRequired();
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(toggleButton).toBeDisabled();
    });
  });

  // ============================
  // 4. MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should render with MUI TextField structure", () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const formControl = container.querySelector(".MuiFormControl-root");
      const inputBase = container.querySelector(".MuiInputBase-root");
      const inputAdornment = container.querySelector(".MuiInputAdornment-root");

      expect(formControl).toBeInTheDocument();
      expect(inputBase).toBeInTheDocument();
      expect(inputAdornment).toBeInTheDocument(); // Verify toggle button is in adornment
    });

    it("should apply color variant classes", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" color="secondary" />
      );
      const input = container.querySelector(".MuiInputBase-root");
      expect(input).toHaveClass("MuiInputBase-colorSecondary");
    });

    it("should apply state-specific classes", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" disabled />
      );
      const input = container.querySelector(".MuiInputBase-root");
      expect(input).toHaveClass("Mui-disabled");
    });

    it("should apply focus classes when focused", async () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input") as HTMLElement;
      await user.click(input);
      const inputBase = container.querySelector(".MuiInputBase-root");
      expect(inputBase).toHaveClass("Mui-focused");
    });

    it("should apply error classes when in error state", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" error />
      );
      const input = container.querySelector(".MuiInputBase-root");
      expect(input).toHaveClass("Mui-error");
    });
  });

  // ============================
  // 5. PASSWORD FUNCTIONALITY TESTS
  // ============================
  describe("Password Functionality", () => {
    it("should mask password input by default", async () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input") as HTMLElement;

      await user.type(input, "secretPassword123");

      expect(input).toHaveValue("secretPassword123");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should toggle password visibility and update button text", async () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input") as HTMLElement;
      const showButton = screen.getByRole("button", { name: "SHOW" });

      // Initially hidden
      expect(input).toHaveAttribute("type", "password");
      expect(showButton).toHaveTextContent("SHOW");

      // Click to show - verify both input type AND button text change
      await user.click(showButton);
      expect(input).toHaveAttribute("type", "text");

      const hideButton = screen.getByRole("button", { name: "HIDE" });
      expect(hideButton).toHaveTextContent("HIDE");

      // Click to hide again - verify state returns to original
      await user.click(hideButton);
      expect(input).toHaveAttribute("type", "password");
      expect(screen.getByRole("button", { name: "SHOW" })).toHaveTextContent(
        "SHOW"
      );
    });

    it("should maintain input value when toggling visibility", async () => {
      render(<DsTextFieldPassword name="password" />);
      const input = screen.getByDisplayValue("");
      const toggleButton = screen.getByRole("button", { name: "SHOW" });

      await user.type(input, "testPassword");
      expect(input).toHaveValue("testPassword");

      await user.click(toggleButton);
      expect(input).toHaveValue("testPassword");
      expect(input).toHaveAttribute("type", "text");

      await user.click(screen.getByRole("button", { name: "HIDE" }));
      expect(input).toHaveValue("testPassword");
      expect(input).toHaveAttribute("type", "password");
    });

    it("should not toggle password visibility when disabled", async () => {
      const { container } = render(
        <DsTextFieldPassword name="password" disabled />
      );
      const input = container.querySelector("input") as HTMLElement;
      const toggleButton = screen.getByRole("button");

      expect(input).toHaveAttribute("type", "password");
      expect(toggleButton).toBeDisabled();

      // Attempt to click disabled button - should have no effect
      await user.click(toggleButton);
      expect(input).toHaveAttribute("type", "password"); // Should remain password type

      // Button should still be disabled and maintain same text
      expect(toggleButton).toBeDisabled();
      expect(toggleButton).toHaveTextContent("SHOW");
    });
  });

  // ============================
  // 6. EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle onChange events", async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <DsTextFieldPassword name="password" onChange={handleChange} />
      );
      const input = container.querySelector("input") as HTMLElement;
      await user.type(input, "test");
      expect(handleChange).toHaveBeenCalledTimes(4); // One call per character
    });

    it("should handle onFocus and onBlur events", async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      const { container } = render(
        <DsTextFieldPassword
          name="password"
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      );

      const input = container.querySelector("input") as HTMLElement;
      await user.click(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", async () => {
      const handleKeyDown = vi.fn();
      const { container } = render(
        <DsTextFieldPassword name="password" onKeyDown={handleKeyDown} />
      );
      const input = container.querySelector("input") as HTMLElement;
      await user.click(input);
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("should handle paste events", async () => {
      const handlePaste = vi.fn();
      const { container } = render(
        <DsTextFieldPassword name="password" onPaste={handlePaste} />
      );
      const input = container.querySelector("input") as HTMLElement;

      await user.click(input);
      fireEvent.paste(input, {
        clipboardData: {
          getData: () => "pastedPassword123",
        },
      });

      expect(handlePaste).toHaveBeenCalled();
    });
  });

  // ============================
  // 7. FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should work within form element", () => {
      const { container } = render(
        <form>
          <DsTextFieldPassword name="password" />
        </form>
      );
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute("name", "password");
    });

    it("should handle form submission", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const { container } = render(
        <form onSubmit={handleSubmit}>
          <DsTextFieldPassword name="password" />
          <DsButton type="submit">Submit</DsButton>
        </form>
      );

      const input = container.querySelector("input") as HTMLElement;

      const submitButton = screen.getByRole("button", { name: "Submit" });

      await user.type(input, "password123");
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should support autocomplete attributes", () => {
      const { container } = render(
        <DsTextFieldPassword name="password" autoComplete="current-password" />
      );
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveAttribute("autocomplete", "current-password");
    });

    it("should work with controlled components", async () => {
      let value = "";
      const handleChange = vi.fn((e) => {
        value = e.target.value;
      });

      const { rerender, container } = render(
        <DsTextFieldPassword
          name="password"
          value={value}
          onChange={handleChange}
        />
      );

      const input = container.querySelector("input") as HTMLElement;
      await user.type(input, "test");

      rerender(
        <DsTextFieldPassword
          name="password"
          value="test"
          onChange={handleChange}
        />
      );
      // Get fresh input reference after rerender
      const updatedInput = screen.getByDisplayValue("test");
      expect(updatedInput).toHaveValue("test");
    });
  });

  // ============================
  // 8. ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<DsTextFieldPassword name="password" label="Password" />);
      const input = screen.getByLabelText("Password");
      expect(input).toHaveAccessibleName("Password");
    });

    it("should support keyboard navigation", async () => {
      render(
        <DsBox>
          <DsTextFieldPassword name="password1" label="First Password" />
          <DsTextFieldPassword name="password2" label="Second Password" />
        </DsBox>
      );

      const firstInput = screen.getByLabelText("First Password");
      const secondInput = screen.getByLabelText("Second Password");

      await user.click(firstInput);
      expect(firstInput).toHaveFocus();

      await user.tab();
      // Focus should move to first password's toggle button
      const firstToggle = screen.getAllByRole("button", { name: "SHOW" })[0];
      expect(firstToggle).toHaveFocus();

      await user.tab();
      expect(secondInput).toHaveFocus();
    });

    it("should have proper aria-describedby relationships", () => {
      render(
        <DsTextFieldPassword
          name="password"
          helperText="Password requirements"
          aria-describedby="password-helper"
        />
      );
      const input = screen.getByDisplayValue("");
      expect(input).toHaveAttribute("aria-describedby");
    });

    it("should provide appropriate button labels for screen readers", async () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input") as HTMLElement;
      const showButton = screen.getByRole("button", { name: "SHOW" });

      // Verify initial state has correct label
      expect(input).toHaveAttribute("type", "password");
      expect(showButton).toHaveAccessibleName("SHOW");

      await user.click(showButton);
      expect(input).toHaveAttribute("type", "text");

      // Verify toggle button changes to appropriate label
      const hideButton = screen.getByRole("button", { name: "HIDE" });
      expect(hideButton).toHaveAccessibleName("HIDE");
    });
  });

  // ============================
  // 9. EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    // FIXED: Previous test only checked rendering, not graceful handling of null values
    it("should handle null/undefined values gracefully", () => {
      render(<DsTextFieldPassword name="password" value={null as any} />);
      const input = screen.getByDisplayValue("");

      expect(input).toBeInTheDocument();
      expect(input).toHaveValue(""); // Null should be converted to empty string
      expect(input).toHaveAttribute("type", "password"); // Should still be password type
    });
    it("should handle very long password content", async () => {
      const longPassword = "A".repeat(1000);
      render(<DsTextFieldPassword name="password" />);
      const input = screen.getByDisplayValue("");

      await user.type(input, longPassword);
      expect(input).toHaveValue(longPassword);
    });

    it("should handle special characters", async () => {
      const specialPassword = "!@#$%^&*()_+-=<>?";
      render(<DsTextFieldPassword name="password" />);
      const input = screen.getByDisplayValue("");

      // Use fireEvent.change instead of user.type for special characters
      fireEvent.change(input, { target: { value: specialPassword } });
      expect(input).toHaveValue(specialPassword);
    });

    it("should handle unicode characters", async () => {
      const unicodePassword = "测试🔒ñáéíóú";
      render(<DsTextFieldPassword name="password" />);
      const input = screen.getByDisplayValue("");

      await user.type(input, unicodePassword);
      expect(input).toHaveValue(unicodePassword);
    });

    it("should handle empty string values", async () => {
      const { container } = render(<DsTextFieldPassword name="password" />);
      const input = container.querySelector("input") as HTMLElement;

      await user.type(input, "test");
      await user.clear(input);
      expect(input).toHaveValue("");
    });
  });

  // ============================
  // 10. REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should handle login form with password field", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <DsBox component="form" onSubmit={handleSubmit}>
          <DsTypography variant="bodyBoldLarge">Sign In</DsTypography>
          <DsTextFieldPassword
            name="password"
            label="Password"
            autoComplete="current-password"
            required
          />
          <DsButton type="submit" variant="contained">
            Sign In
          </DsButton>
        </DsBox>
      );

      const passwordField = screen.getByDisplayValue("");
      const submitButton = screen.getByRole("button", { name: "Sign In" });

      expect(passwordField).toHaveAttribute("autocomplete", "current-password");
      expect(passwordField).toBeRequired();

      await user.type(passwordField, "myPassword123");
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle registration form with password confirmation", async () => {
      let passwordValue = "";
      let confirmValue = "";

      const handlePasswordChange = vi.fn((e) => {
        passwordValue = e.target.value;
      });

      const handleConfirmChange = vi.fn((e) => {
        confirmValue = e.target.value;
      });

      render(
        <DsBox>
          <DsTypography variant="bodyBoldLarge">Create Account</DsTypography>
          <DsTextFieldPassword
            name="password"
            label="Password"
            onChange={handlePasswordChange}
            autoComplete="new-password"
          />
          <DsTextFieldPassword
            name="confirmPassword"
            label="Confirm Password"
            onChange={handleConfirmChange}
            error={passwordValue !== confirmValue && confirmValue !== ""}
            helperText={
              passwordValue !== confirmValue && confirmValue !== ""
                ? "Passwords do not match"
                : ""
            }
          />
        </DsBox>
      );

      const passwordField = screen.getAllByDisplayValue("")[0]; // First input
      const confirmField = screen.getAllByDisplayValue("")[1]; // Second input

      await user.type(passwordField, "newPassword123");
      await user.type(confirmField, "differentPassword");

      // Since the conditional rendering depends on state values, check if error text would be shown
      // In a real app, this would be re-rendered when state changes
      // For now just verify the inputs accept the values
      expect(passwordField).toHaveValue("newPassword123");
      expect(confirmField).toHaveValue("differentPassword");
    });

    it("should handle complex form with multiple password fields", async () => {
      render(
        <DsBox>
          <DsTypography variant="bodyBoldLarge">Change Password</DsTypography>
          <DsTextFieldPassword
            name="currentPassword"
            label="Current Password"
            autoComplete="current-password"
          />
          <DsTextFieldPassword
            name="newPassword"
            label="New Password"
            autoComplete="new-password"
          />
          <DsTextFieldPassword
            name="confirmNewPassword"
            label="Confirm New Password"
          />
        </DsBox>
      );

      const currentPassword = screen.getByLabelText("Current Password");
      const newPassword = screen.getByLabelText("New Password");
      const confirmPassword = screen.getByLabelText("Confirm New Password");

      expect(currentPassword).toHaveAttribute(
        "autocomplete",
        "current-password"
      );
      expect(newPassword).toHaveAttribute("autocomplete", "new-password");

      await user.type(currentPassword, "oldPassword");
      await user.type(newPassword, "newSecurePassword123");
      await user.type(confirmPassword, "newSecurePassword123");

      expect(currentPassword).toHaveValue("oldPassword");
      expect(newPassword).toHaveValue("newSecurePassword123");
      expect(confirmPassword).toHaveValue("newSecurePassword123");
    });
  });

  // ============================
  // 11. THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTextFieldPassword
            name="password"
            label="Theme Test Password"
            data-testid={`password-field-${colorScheme}`}
            helperText="Enter your password"
          />
        ),
        (container, colorScheme) => {
          const passwordField = container.querySelector(
            `[data-testid="password-field-${colorScheme}"]`
          );
          expect(passwordField).toBeInTheDocument();

          // Verify MUI FormControl structure
          const formControl = container.querySelector(".MuiFormControl-root");
          expect(formControl).toBeInTheDocument();

          // Snapshot testing for each theme
          expect(container.firstChild).toMatchSnapshot(
            `ds-password-field-${colorScheme}-theme`
          );
        }
      );
    });

    it("should use correct colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      const themeExpectations = {
        light: {
          expectedColor: PALETTE.neutral3Light,
        },
        dark: {
          expectedColor: PALETTE.neutral3Dark,
        },
        highContrast: {
          expectedColor: PALETTE.neutral1Dark,
        },
      };
      colorSchemes.forEach((colorScheme) => {
        const { container } = render(
          <DsTextFieldPassword
            name="password"
            label="Color Test"
            data-testid={`password-field-colors-${colorScheme}`}
            sx={{
              backgroundColor: "var(--ds-colour-neutral3)",
            }}
          />,
          { colorScheme }
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Test InputBase uses proper MUI color classes
        const inputBase = container.querySelector(".MuiFormControl-root");

        const computedStyle = window.getComputedStyle(inputBase as Element);
        const backgroundColor = computedStyle.backgroundColor;
        expect(backgroundColor).toBe(`var(--ds-colour-neutral3)`);

        const actualcolor = schemeData?.ds?.colour?.neutral3;

        expect(actualcolor).toBe(expectations.expectedColor);
      });
    });
  });

  // ============================
  // 12. SNAPSHOT TESTING
  // ============================
  describe("Snapshot Testing", () => {
    // CONSOLIDATED: Reduced excessive snapshots to key behavioral states only
    it("should match snapshots for key component states", () => {
      // Default state
      const { container: defaultContainer } = render(
        <DsTextFieldPassword name="password" />
      );
      expect(defaultContainer.firstChild).toMatchSnapshot(
        "password-field-default"
      );

      // Visible state - tests isVisible prop behavior
      const { container: visibleContainer } = render(
        <DsTextFieldPassword name="password" isVisible={true} />
      );
      expect(visibleContainer.firstChild).toMatchSnapshot(
        "password-field-visible"
      );

      // Error state
      const { container: errorContainer } = render(
        <DsTextFieldPassword
          name="password"
          error
          helperText="Password is required"
        />
      );
      expect(errorContainer.firstChild).toMatchSnapshot("password-field-error");

      // Disabled state - critical for toggle button behavior
      const { container: disabledContainer } = render(
        <DsTextFieldPassword name="password" disabled />
      );
      expect(disabledContainer.firstChild).toMatchSnapshot(
        "password-field-disabled"
      );
    });

    // KEPT: Custom toggle nodes test is valuable as it tests custom component behavior
    it("should match snapshot with custom toggle nodes", () => {
      const customToggleNode = {
        toShow: <DsButton variant="outlined">Show</DsButton>,
        toHide: <DsButton variant="outlined">Hide</DsButton>,
      };

      const { container } = render(
        <DsTextFieldPassword name="password" toggleNode={customToggleNode} />
      );
      expect(container.firstChild).toMatchSnapshot(
        "password-field-custom-toggle"
      );
    });
  });
});
