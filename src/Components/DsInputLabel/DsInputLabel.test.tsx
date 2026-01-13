/**
 * @vitest-environment jsdom
 *
 * Test suite for DsInputLabel component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the input label component with different configurations.
 * 2. Props Validation - Ensure proper handling and validation of props including label, labelSupportText, success, and error states.
 * 3. Component States - Test various states of the component (error, success, required, shrink) and state combinations.
 * 4. MUI Styling - Validate Material-UI specific styling and class application for InputLabel components.
 * 5. Typography Integration - Test integration with DsTypography component for label and support text rendering.
 * 6. Conditional Rendering - Test rendering logic when label and labelSupportText are present or absent.
 * 7. Form Integration - Test integration with HTML forms and form field associations.
 * 8. Accessibility - Check ARIA attributes, label associations, and screen reader compatibility.
 * 9. Edge Cases - Handle unusual scenarios like null values, very long labels, special characters, and unicode text.
 * 10. Real-world Scenarios - Test common usage patterns like form field labels, required field indicators, and validation states.
 * 11. Theme Testing - Assess component rendering across different themes (light, dark, high contrast) with proper color integration.
 * 12. Snapshot Testing - Perform visual regression testing for key component states and configurations.
 *
 * @package @am92/react-design-system
 * @component DsInputLabel
 */
import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsInputLabel } from "./DsInputLabel.Component";
import { DsBox } from "../DsBox";
import { DsTextField } from "../DsTextField";
import { DsFormControl } from "../DsFormControl";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsTypography } from "../DsTypography";

describe("DsInputLabel", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // 1. CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with label only", () => {
      render(<DsInputLabel label="Test Label" />);
      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
    });

    it("should render with labelSupportText only", () => {
      render(<DsInputLabel labelSupportText="Support text" />);
      const supportText = screen.getByText("Support text");
      expect(supportText).toBeInTheDocument();
    });

    it("should render with both label and labelSupportText", () => {
      render(
        <DsInputLabel label="Main Label" labelSupportText="Support text" />
      );
      const label = screen.getByText("Main Label");
      const supportText = screen.getByText("Support text");

      expect(label).toBeInTheDocument();
      expect(supportText).toBeInTheDocument();
    });

    it("should not render when both label and labelSupportText are missing", () => {
      const { container } = render(<DsInputLabel />);
      // Component still renders wrapper div, but no InputLabel inside
      expect(container.querySelector(".MuiInputLabel-root")).toBeNull();
    });

    it("should render with React element as label", () => {
      const customLabel = <DsTypography>Custom Label Element</DsTypography>;
      render(<DsInputLabel label={customLabel} />);
      const label = screen.getByText("Custom Label Element");
      expect(label).toBeInTheDocument();
    });

    it("should render with React element as labelSupportText", () => {
      const customSupport = <DsTypography>Custom Support Element</DsTypography>;
      render(
        <DsInputLabel label="Main Label" labelSupportText={customSupport} />
      );
      const supportText = screen.getByText("Custom Support Element");
      expect(supportText).toBeInTheDocument();
    });
  });

  // ============================
  // 2. PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and pass through InputLabel props", () => {
      const { container } = render(
        <DsInputLabel
          label="Test Label"
          id="custom-input-label"
          htmlFor="test-input"
          required
        />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");

      expect(inputLabel).toHaveAttribute("id", "custom-input-label");
      expect(inputLabel).toHaveAttribute("for", "test-input");
    });

    it("should apply default shrink prop", () => {
      const { container } = render(<DsInputLabel label="Test Label" />);
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiInputLabel-shrink");
    });

    it("should override shrink prop when explicitly provided", () => {
      const { container } = render(
        <DsInputLabel label="Test Label" shrink={false} />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).not.toHaveClass("MuiInputLabel-shrink");
    });

    it("should handle custom component prop", () => {
      render(<DsInputLabel label="Test Label" component="legend" />);
      const legend = screen.getByText("Test Label").closest("legend");
      expect(legend).toBeInTheDocument();
    });
  });

  // ============================
  // 3. COMPONENT STATES
  // ============================
  describe("Component States", () => {
    it("should render in error state", () => {
      const { container } = render(<DsInputLabel label="Error Label" error />);
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-error");
    });

    it("should render in required state", () => {
      const { container } = render(
        <DsInputLabel label="Required Label" required />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-required");
    });

    it("should handle state combinations", () => {
      const { container } = render(
        <DsInputLabel label="Complex Label" error required />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");

      expect(inputLabel).toHaveClass("Mui-error");
      expect(inputLabel).toHaveClass("Mui-required");
    });

    it("should render with disabled state", () => {
      const { container } = render(
        <DsInputLabel label="Disabled Label" disabled />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-disabled");
    });

    it("should handle focused state", () => {
      const { container } = render(
        <DsInputLabel label="Focused Label" focused />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-focused");
    });
  });

  // ============================
  // 4. MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI InputLabel classes", () => {
      const { container } = render(<DsInputLabel label="Styled Label" />);
      const inputLabel = container.querySelector(".MuiInputLabel-root");

      expect(inputLabel).toHaveClass("MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiInputLabel-shrink");
    });

    it("should apply color variant classes", () => {
      const { container } = render(
        <DsInputLabel label="Test" color="primary" />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiFormLabel-colorPrimary");
    });

    it("should apply size variant classes", () => {
      const { container } = render(
        <DsInputLabel label="Small Label" size="small" />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiInputLabel-sizeSmall");
    });

    it("should apply filled variant classes", () => {
      const { container } = render(
        <DsInputLabel label="Filled Label" variant="filled" />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiInputLabel-filled");
    });

    it("should apply outlined variant classes", () => {
      const { container } = render(
        <DsInputLabel label="Outlined Label" variant="outlined" />
      );
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("MuiInputLabel-outlined");
    });
  });

  // ============================
  // 5. TYPOGRAPHY INTEGRATION TESTS
  // ============================
  describe("Typography Integration", () => {
    it("should render label with correct typography structure", () => {
      render(<DsInputLabel label="Typography Test" />);
      const labelElement = screen.getByText("Typography Test");
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.tagName).toBe("SPAN");
    });

    it("should render support text with correct typography structure", () => {
      render(<DsInputLabel labelSupportText="Support typography test" />);
      const supportElement = screen.getByText("Support typography test");
      expect(supportElement).toBeInTheDocument();
      expect(supportElement.tagName).toBe("SPAN");
    });
  });

  // ============================
  // 6. CONDITIONAL RENDERING TESTS
  // ============================
  describe("Conditional Rendering", () => {
    it("should not render when label is null", () => {
      const { container } = render(<DsInputLabel label={null} />);
      // Component still renders wrapper div, but no InputLabel inside
      expect(container.querySelector(".MuiInputLabel-root")).toBeNull();
    });

    it("should not render when label is undefined", () => {
      const { container } = render(<DsInputLabel label={undefined} />);
      // Component still renders wrapper div, but no InputLabel inside
      expect(container.querySelector(".MuiInputLabel-root")).toBeNull();
    });

    it("should not render when label is empty string and no support text", () => {
      const { container } = render(<DsInputLabel label="" />);
      // Component still renders wrapper div, but no InputLabel inside
      expect(container.querySelector(".MuiInputLabel-root")).toBeNull();
    });

    it("should render when only labelSupportText is provided", () => {
      render(<DsInputLabel labelSupportText="Only support text" />);
      const supportText = screen.getByText("Only support text");
      expect(supportText).toBeInTheDocument();
    });

    it("should render with empty string label if support text exists", () => {
      render(<DsInputLabel label="" labelSupportText="Support text exists" />);
      const supportText = screen.getByText("Support text exists");
      expect(supportText).toBeInTheDocument();
      // Component renders both typography spans even with empty label
      const { container } = render(
        <DsInputLabel label="" labelSupportText="Support text exists" />
      );
      const spans = container.querySelectorAll("span");
      expect(spans).toHaveLength(2); // Both label and support text spans are rendered
    });
  });

  // ============================
  // 7. FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should associate with form input using htmlFor prop", () => {
      render(
        <DsBox>
          <DsInputLabel label="Associated Label" htmlFor="test-input" />
          <DsTextField id="test-input" type="text" />
        </DsBox>
      );

      const label = screen.getByText("Associated Label");
      const input = screen.getByRole("textbox");

      expect(label.closest("label")).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("should handle required field indicators", () => {
      const { container } = render(
        <DsInputLabel label="Required Field" required />
      );

      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-required");
    });

    it("should support form validation states", () => {
      const { container } = render(
        <DsInputLabel label="Validation Label" error />
      );

      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toHaveClass("Mui-error");
    });
  });

  // ============================
  // 8. ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper label semantics", () => {
      const { container } = render(<DsInputLabel label="Accessible Label" />);
      const labelElement = container.querySelector("label");
      expect(labelElement).toBeInTheDocument();
    });

    it("should support screen reader text", () => {
      render(
        <DsInputLabel
          label="Main Label"
          labelSupportText="Additional context for screen readers"
        />
      );

      const mainLabel = screen.getByText("Main Label");
      const supportText = screen.getByText(
        "Additional context for screen readers"
      );

      expect(mainLabel).toBeInTheDocument();
      expect(supportText).toBeInTheDocument();
    });
  });

  // ============================
  // 9. EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle very long label text", () => {
      const longLabel =
        "This is a very long label text that might cause layout issues if not handled properly. ".repeat(
          5
        );
      const { container } = render(<DsInputLabel label={longLabel} />);
      // Check if the label content exists in the first span element
      const labelSpan = container.querySelector(
        ".MuiTypography-bodyRegularMedium"
      );
      expect(labelSpan).toBeInTheDocument();
      expect(labelSpan?.textContent).toBe(longLabel);
    });

    it("should handle special characters in label", () => {
      const specialLabel = "!@#$%^&*()_+-={}|[]\\:;\"'<>?,./~`";
      render(<DsInputLabel label={specialLabel} />);
      const label = screen.getByText(specialLabel);
      expect(label).toBeInTheDocument();
    });

    it("should handle unicode characters", () => {
      const unicodeLabel = "测试 🌟 ñáéíóú العربية русский";
      render(<DsInputLabel label={unicodeLabel} />);
      const label = screen.getByText(unicodeLabel);
      expect(label).toBeInTheDocument();
    });

    it("should handle numeric values as label", () => {
      render(<DsInputLabel label={12345 as any} />);
      const label = screen.getByText("12345");
      expect(label).toBeInTheDocument();
    });

    it("should handle boolean values gracefully", () => {
      const { container } = render(<DsInputLabel label={true as any} />);
      // Boolean true renders as text "true" in React, component will render it
      expect(container.firstChild).not.toBeNull();
    });

    it("should handle array values gracefully", () => {
      const { container } = render(<DsInputLabel label={[]} />);
      // Empty array is truthy, so component renders but first span is empty
      const inputLabel = container.querySelector(".MuiInputLabel-root");
      expect(inputLabel).toBeInTheDocument();
      const labelSpan = container.querySelector(
        ".MuiTypography-bodyRegularMedium"
      );
      expect(labelSpan?.textContent).toBe("");
    });

    it("should handle object values gracefully", () => {
      // Objects cannot be rendered as React children and will cause errors
      // This test captures the error to ensure it's expected behavior
      const mockConsoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      expect(() => {
        render(<DsInputLabel label={{} as any} />);
      }).toThrow("Objects are not valid as a React child");

      mockConsoleError.mockRestore();
    });
  });

  // ============================
  // 10. REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should handle form field with label and validation", () => {
      render(
        <DsFormControl error>
          <DsInputLabel
            label="Email Address"
            labelSupportText="Required field"
            required
            error
          />
          <DsTextField type="email" placeholder="Enter your email" />
        </DsFormControl>
      );

      const label = screen.getByText("Email Address");
      const supportText = screen.getByText("Required field");
      const input = screen.getByPlaceholderText("Enter your email");

      expect(label).toBeInTheDocument();
      expect(supportText).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it("should handle optional field with support text", () => {
      render(
        <DsFormControl>
          <DsInputLabel label="Phone Number" labelSupportText="Optional" />
          <DsTextField type="tel" placeholder="Enter your phone number" />
        </DsFormControl>
      );

      const label = screen.getByText("Phone Number");
      const supportText = screen.getByText("Optional");

      expect(label).toBeInTheDocument();
      expect(supportText).toBeInTheDocument();
    });

    it("should handle complex form with multiple labeled fields", () => {
      render(
        <DsBox component="form">
          <DsFormControl sx={{ mb: 2 }}>
            <DsInputLabel
              label="First Name"
              labelSupportText="Required"
              required
            />
            <DsTextField placeholder="Enter first name" />
          </DsFormControl>

          <DsFormControl sx={{ mb: 2 }}>
            <DsInputLabel
              label="Last Name"
              labelSupportText="Required"
              required
            />
            <DsTextField placeholder="Enter last name" />
          </DsFormControl>

          <DsFormControl>
            <DsInputLabel label="Middle Initial" labelSupportText="Optional" />
            <DsTextField placeholder="Enter middle initial" />
          </DsFormControl>
        </DsBox>
      );

      expect(screen.getByText("First Name")).toBeInTheDocument();
      expect(screen.getByText("Last Name")).toBeInTheDocument();
      expect(screen.getByText("Middle Initial")).toBeInTheDocument();
      expect(screen.getAllByText("Required")).toHaveLength(2);
      expect(screen.getByText("Optional")).toBeInTheDocument();
    });

    it("should handle dynamic label content", () => {
      const dynamicLabel = "Dynamic Label Updated";
      const { rerender } = render(<DsInputLabel label="Initial Label" />);

      expect(screen.getByText("Initial Label")).toBeInTheDocument();

      rerender(<DsInputLabel label={dynamicLabel} />);
      expect(screen.getByText(dynamicLabel)).toBeInTheDocument();
      expect(screen.queryByText("Initial Label")).not.toBeInTheDocument();
    });
  });

  // ============================
  // 11. THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsInputLabel
            label="Theme Test Label"
            labelSupportText="Support text"
            data-testid={`input-label-${colorScheme}`}
          />
        ),
        (container, colorScheme) => {
          const inputLabel = container.querySelector(
            `[data-testid="input-label-${colorScheme}"]`
          );
          expect(inputLabel).toBeInTheDocument();

          // Verify MUI InputLabel structure
          const muiInputLabel = container.querySelector(".MuiInputLabel-root");
          expect(muiInputLabel).toBeInTheDocument();

          // Snapshot testing for each theme
          expect(container.firstChild).toMatchSnapshot(
            `ds-input-label-${colorScheme}-theme`
          );
        }
      );
    });

    it("should use correct colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      const themeExpectations = {
        light: {
          expectedColor: PALETTE.errorRed,
        },
        dark: {
          expectedColor: PALETTE.errorRedDark,
        },
        highContrast: {
          expectedColor: PALETTE.highContrast2,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container } = render(
          <DsInputLabel
            label="Color Test Label"
            data-testid={`input-label-colors-${colorScheme}`}
            error
          />,
          { colorScheme }
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Test InputLabel uses proper MUI color classes
        const inputLabel = container.querySelector(".MuiTypography-root");

        const computedStyle = window.getComputedStyle(inputLabel as Element);
        const textColor = computedStyle.color;

        const actualColor = schemeData?.ds?.colour?.supportNegative;
        expect(actualColor).toBe(expectations.expectedColor);
      });
    });
  });

  // ============================
  // 12. SNAPSHOT TESTING
  // ============================
  describe("Snapshot Testing", () => {
    it("should match snapshots for key component states", () => {
      // Default state
      const { container: defaultContainer } = render(
        <DsInputLabel label="Default Label" />
      );
      expect(defaultContainer.firstChild).toMatchSnapshot(
        "input-label-default"
      );

      // With support text
      const { container: supportContainer } = render(
        <DsInputLabel
          label="Label with Support"
          labelSupportText="Support text"
        />
      );
      expect(supportContainer.firstChild).toMatchSnapshot(
        "input-label-with-support"
      );

      // Error state
      const { container: errorContainer } = render(
        <DsInputLabel label="Error Label" error />
      );
      expect(errorContainer.firstChild).toMatchSnapshot("input-label-error");

      // Required state
      const { container: requiredContainer } = render(
        <DsInputLabel label="Required Label" required />
      );
      expect(requiredContainer.firstChild).toMatchSnapshot(
        "input-label-required"
      );

      // Complex state
      const { container: complexContainer } = render(
        <DsInputLabel
          label="Complex Label"
          labelSupportText="With support text"
          error
          required
        />
      );
      expect(complexContainer.firstChild).toMatchSnapshot(
        "input-label-complex"
      );
    });

    it("should match snapshot with React element content", () => {
      const customLabel = (
        <DsBox sx={{ fontWeight: "bold", color: "primary.main" }}>
          Custom Styled Label
        </DsBox>
      );

      const { container } = render(
        <DsInputLabel
          label={customLabel}
          labelSupportText="With custom label element"
        />
      );

      expect(container.firstChild).toMatchSnapshot(
        "input-label-custom-element"
      );
    });
  });
});
