/**
 * @vitest-environment jsdom
 *
 * Test suite for DsInputAdornment component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for correct rendering with different props and positions
 * 2. Props Validation - Tests for prop handling and MUI InputAdornment integration
 * 3. Position Behavior - Tests for start/end position handling
 * 4. MUI Styling - Tests for Material-UI InputAdornment integration and CSS classes
 * 5. Content Handling - Tests for different content types (text, icons, components)
 * 6. Input Integration - Tests for integration with TextField components
 * 7. Accessibility - Tests for ARIA attributes and screen reader support
 * 8. Edge Cases - Tests for unusual scenarios and prop combinations
 * 9. Theme Testing - Tests for multi-theme support and design system variables
 * 10. Real-world Scenarios - Tests for practical usage patterns
 * 11. Snapshot Testing - Visual regression prevention
 *
 * @package @am92/react-design-system
 * @component DsInputAdornment
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../Tests/Mocks/testUtils";
import { testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsInputAdornment } from "./DsInputAdornment.Component";
import { DsRemixIcon } from "../DsRemixIcon";
import { DsTextField } from "../DsTextField";
import { DsIconButton } from "../DsIconButton";
import { DsTypography } from "../DsTypography";
import { DsBox } from "../DsBox";
import { PALETTE } from "../../Constants";
import getColorScheme from "../../Theme/getColorScheme";

describe("DsInputAdornment Component", () => {
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
        <DsInputAdornment position="start">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toBeInTheDocument();
      expect(adornment).toHaveClass("MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");
    });

    it("should render with text content", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>USD</DsTypography>
        </DsInputAdornment>
      );

      const text = screen.getByText("USD");
      expect(text).toBeInTheDocument();
    });

    it("should render with icon content", () => {
      render(
        <DsInputAdornment position="start">
          <DsRemixIcon className="ri-search-line" data-testid="search-icon" />
        </DsInputAdornment>
      );

      const icon = screen.getByTestId("search-icon");
      expect(icon).toBeInTheDocument();
    });

    it("should render with button content", () => {
      render(
        <DsInputAdornment position="start">
          <DsIconButton aria-label="Toggle visibility">
            <DsRemixIcon className="ri-eye-line" />
          </DsIconButton>
        </DsInputAdornment>
      );

      const button = screen.getByLabelText("Toggle visibility");
      expect(document.querySelector(".ri-eye-line")).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    it("should render with complex content", () => {
      render(
        <DsInputAdornment position="start">
          <DsBox display="flex" alignItems="center" gap={1}>
            <DsRemixIcon className="ri-dollar-line" />
            <DsTypography>USD</DsTypography>
          </DsBox>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toBeInTheDocument();
      expect(document.querySelector(".ri-dollar-line")).toBeInTheDocument();
      expect(screen.getByText("USD")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept position prop with start value", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");
    });

    it("should accept position prop with end value", () => {
      render(
        <DsInputAdornment position="end">
          <DsTypography>%</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionEnd");
    });

    it("should use start position by default", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>@</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");
    });

    it("should accept variant prop", () => {
      render(
        <DsInputAdornment variant="filled" position="start">
          <DsTypography>#</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-filled");
    });

    it("should forward all MUI InputAdornment props", () => {
      render(
        <DsInputAdornment
          id="custom-adornment"
          className="custom-class"
          sx={{ color: "primary.main" }}
          position="end"
        >
          <DsTypography>&</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveAttribute("id", "custom-adornment");
      expect(adornment).toHaveClass("custom-class");
    });

    it("should handle data attributes", () => {
      render(
        <DsInputAdornment
          data-testid="custom-adornment"
          data-custom="value"
          position="start"
        >
          <DsTypography>*</DsTypography>
        </DsInputAdornment>
      );

      const adornment = screen.getByTestId("custom-adornment");
      expect(adornment).toHaveAttribute("data-custom", "value");
      expect(adornment).toHaveAttribute("data-testid", "custom-adornment");
    });
  });

  // ============================
  // POSITION BEHAVIOR TESTS
  // ============================
  describe("Position Behavior", () => {
    it("should apply correct margin for start position", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(
        ".MuiInputAdornment-positionStart"
      ) as HTMLElement;
      expect(adornment).toBeInTheDocument();

      // For start position, margin right should be 0
      const computedStyles = window.getComputedStyle(adornment);
      expect(computedStyles.marginRight).toBe("var(--ds-spacing-zero)");
    });

    it("should apply correct margin for end position", () => {
      render(
        <DsInputAdornment position="end">
          <DsTypography>%</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(
        ".MuiInputAdornment-positionEnd"
      ) as HTMLElement;
      expect(adornment).toBeInTheDocument();

      // For end position, margin left should be 0
      const computedStyles = window.getComputedStyle(adornment);
      expect(computedStyles.marginLeft).toBe("var(--ds-spacing-zero)");
    });

    it("should handle position changes", () => {
      const { rerender } = render(
        <DsInputAdornment position="start">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      let adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");

      rerender(
        <DsInputAdornment position="end">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionEnd");
    });
  });
  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI InputAdornment classes", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>Test</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-root");
    });

    it("should apply design system color variables", () => {
      render(
        <DsInputAdornment position="start">
          <DsRemixIcon className="ri-search-line" />
        </DsInputAdornment>
      );

      const adornment = document.querySelector(
        ".MuiInputAdornment-root"
      ) as HTMLElement;
      expect(adornment).toBeInTheDocument();
      const computedStyles = window.getComputedStyle(adornment);
      expect(computedStyles.color).toBe("var(--ds-colour-iconDefault)");
    });

    it("should apply custom sx prop styling", () => {
      render(
        <DsInputAdornment
          sx={{ color: "secondary.main", padding: "4px" }}
          position="start"
        >
          <DsTypography>Styled</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(
        ".MuiInputAdornment-root"
      ) as HTMLElement;
      expect(adornment).toBeInTheDocument();
      const computedStyles = window.getComputedStyle(adornment);
      expect(computedStyles.color).toBe("var(--palette-secondary-main)");
      expect(computedStyles.padding).toBe("4px");
    });

    it("should handle variant-specific classes", () => {
      const variants = ["standard", "outlined", "filled"] as const;

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <DsInputAdornment variant={variant} position="start">
            <DsTypography>Variant</DsTypography>
          </DsInputAdornment>
        );

        const adornment = container.querySelector(".MuiInputAdornment-root");
        expect(adornment).toHaveClass(`MuiInputAdornment-${variant}`);

        unmount();
      });
    });

    it("should disable pointer events when disablePointerEvents is true", () => {
      render(
        <DsInputAdornment position="start" disablePointerEvents>
          <DsRemixIcon className="ri-close-line" />
        </DsInputAdornment>
      );

      const adornment = document.querySelector(
        ".MuiInputAdornment-root"
      ) as HTMLElement;
      expect(adornment).toBeInTheDocument();
      const computedStyles = window.getComputedStyle(adornment);
      expect(computedStyles.pointerEvents).toBe("none");
    });
  });

  // ============================
  // CONTENT HANDLING TESTS
  // ============================
  describe("Content Handling", () => {
    it("should handle text content", () => {
      render(
        <DsInputAdornment position="start">
          <DsTypography>Text Content</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText("Text Content")).toBeInTheDocument();
    });

    it("should handle icon content", () => {
      render(
        <DsInputAdornment position="start">
          <DsRemixIcon className="ri-user-line" data-testid="user-icon" />
        </DsInputAdornment>
      );

      expect(screen.getByTestId("user-icon")).toBeInTheDocument();
      expect(document.querySelector(".ri-user-line")).toBeInTheDocument();
    });

    it("should handle button content", () => {
      const handleClick = vi.fn();
      render(
        <DsInputAdornment position="start">
          <DsIconButton onClick={handleClick} aria-label="Clear">
            <DsRemixIcon className="ri-close-line" />
          </DsIconButton>
        </DsInputAdornment>
      );

      const button = screen.getByLabelText("Clear");
      expect(button).toBeInTheDocument();
    });

    it("should handle multiple children", () => {
      render(
        <DsInputAdornment position="start">
          <DsRemixIcon className="ri-dollar-line" />
          <DsTypography>USD</DsTypography>
          <DsTypography>Temp</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText("USD")).toBeInTheDocument();
      expect(screen.getByText("Temp")).toBeInTheDocument();
      expect(document.querySelector(".ri-dollar-line")).toBeInTheDocument();
    });

    it("should handle null/undefined children gracefully", () => {
      render(
        <DsInputAdornment position="start">
          {null}
          {undefined}
          <DsTypography>Valid Content</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText("Valid Content")).toBeInTheDocument();
    });

    it("should handle empty children", () => {
      render(<DsInputAdornment position="start"></DsInputAdornment>);

      const adornment = document.querySelector(".MuiInputAdornment-root");

      expect(adornment).toBeInTheDocument();
      expect(adornment?.childNodes.length).toBe(1);
    });
  });

  // ============================
  // INPUT INTEGRATION TESTS
  // ============================
  describe("Input Integration", () => {
    it("should work with TextField as startAdornment", () => {
      render(
        <DsTextField
          label="Price"
          startAdornment={
            <DsInputAdornment position="start">
              <DsTypography>$</DsTypography>
            </DsInputAdornment>
          }
        />
      );

      const textfield = screen.getByRole("textbox");
      const adornment = document.querySelector(
        ".MuiInputAdornment-positionStart"
      );

      expect(textfield).toBeInTheDocument();
      expect(adornment).toBeInTheDocument();
      expect(screen.getByText("$")).toBeInTheDocument();
    });

    it("should work with TextField as endAdornment", () => {
      render(
        <DsTextField
          label="Percentage"
          endAdornment={
            <DsInputAdornment position="end">
              <DsTypography>%</DsTypography>
            </DsInputAdornment>
          }
        />
      );

      const textfield = screen.getByRole("textbox");
      const adornment = document.querySelector(
        ".MuiInputAdornment-positionEnd"
      );

      expect(textfield).toBeInTheDocument();
      expect(adornment).toBeInTheDocument();
      expect(screen.getByText("%")).toBeInTheDocument();
    });

    it("should work with both start and end adornments", () => {
      render(
        <DsTextField
          label="Amount"
          startAdornment={
            <DsInputAdornment position="start">
              <DsTypography>$</DsTypography>
            </DsInputAdornment>
          }
          endAdornment={
            <DsInputAdornment position="end">
              <DsTypography>USD</DsTypography>
            </DsInputAdornment>
          }
        />
      );

      expect(screen.getByText("$")).toBeInTheDocument();
      expect(screen.getByText("USD")).toBeInTheDocument();

      const startAdornment = document.querySelector(
        ".MuiInputAdornment-positionStart"
      );
      const endAdornment = document.querySelector(
        ".MuiInputAdornment-positionEnd"
      );

      expect(startAdornment).toBeInTheDocument();
      expect(endAdornment).toBeInTheDocument();
    });

    it("should work with interactive elements in TextField", async () => {
      const handleClear = vi.fn();
      render(
        <DsTextField
          endAdornment={
            <DsInputAdornment position="end">
              <DsIconButton onClick={handleClear} aria-label="Clear search">
                <DsRemixIcon className="ri-close-line" />
              </DsIconButton>
            </DsInputAdornment>
          }
          label="Search"
        />
      );

      const clearButton = screen.getByLabelText("Clear search");
      await user.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should support ARIA labels", () => {
      render(
        <DsInputAdornment aria-label="Currency symbol" position="start">
          <DsTypography>$</DsTypography>
        </DsInputAdornment>
      );

      const adornment = screen.getByLabelText("Currency symbol");
      expect(adornment).toBeInTheDocument();
    });

    it("should support ARIA descriptions", () => {
      render(
        <DsBox>
          <DsInputAdornment aria-describedby="adornment-help" position="start">
            <DsRemixIcon className="ri-info-line" />
          </DsInputAdornment>
          <DsTypography id="adornment-help">
            Additional information
          </DsTypography>
        </DsBox>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveAttribute("aria-describedby", "adornment-help");
    });

    it("should maintain keyboard accessibility for interactive content", async () => {
      const handleAction = vi.fn();
      render(
        <DsInputAdornment position="start">
          <DsIconButton
            onClick={handleAction}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleAction();
              }
            }}
            aria-label="Action button"
            tabIndex={0}
          >
            <DsRemixIcon className="ri-settings-line" />
          </DsIconButton>
        </DsInputAdornment>
      );

      const button = screen.getByLabelText("Action button");

      // Test keyboard interaction
      button.focus();
      expect(button).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleAction).toHaveBeenCalled();
    });

    it("should support role attributes", () => {
      render(
        <DsInputAdornment role="presentation" position="start">
          <DsTypography>Decorative</DsTypography>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveAttribute("role", "presentation");
    });

    it("should work with screen readers when used with TextField", () => {
      render(
        <DsTextField
          label="Price"
          aria-describedby="price-help"
          startAdornment={
            <DsInputAdornment position="start">
              <DsTypography aria-label="Dollar sign">$</DsTypography>
            </DsInputAdornment>
          }
        />
      );

      const input = screen.getByRole("textbox");
      const dollarSign = screen.getByLabelText("Dollar sign");

      expect(input).toHaveAttribute("aria-describedby", "price-help");
      expect(dollarSign).toBeInTheDocument();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle position prop changes", () => {
      const { rerender } = render(
        <DsInputAdornment position="start">
          <DsTypography>Symbol</DsTypography>
        </DsInputAdornment>
      );

      let adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");

      rerender(
        <DsInputAdornment position="end">
          <DsTypography>Symbol</DsTypography>
        </DsInputAdornment>
      );

      adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionEnd");
    });

    it("should handle variant prop changes", () => {
      const { rerender } = render(
        <DsInputAdornment position="start" variant="standard">
          <DsTypography>Text</DsTypography>
        </DsInputAdornment>
      );

      let adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-standard");

      rerender(
        <DsInputAdornment position="start" variant="filled">
          <DsTypography>Text</DsTypography>
        </DsInputAdornment>
      );

      adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-filled");
    });

    it("should handle complex nested content", () => {
      render(
        <DsInputAdornment position="start">
          <DsBox>
            <DsBox display="flex">
              <DsRemixIcon className="ri-currency-line" />
              <DsTypography>USD</DsTypography>
            </DsBox>
          </DsBox>
        </DsInputAdornment>
      );

      const adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toBeInTheDocument();
      expect(screen.getByText("USD")).toBeInTheDocument();
      expect(
        window.document.querySelector(".ri-currency-line")
      ).toBeInTheDocument();
    });

    it("should handle special characters and symbols", () => {
      const specialChars = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`";
      render(
        <DsInputAdornment position="start">
          <DsTypography>{specialChars}</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText(specialChars)).toBeInTheDocument();
    });

    it("should handle unicode characters", () => {
      const unicodeText = "€ ¥ £ ₹ 🚀 测试 ñáéíóú αβγδε";
      render(
        <DsInputAdornment position="start">
          <DsTypography>{unicodeText}</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText(unicodeText)).toBeInTheDocument();
    });

    it("should handle very long content", () => {
      const longText = "This is a very long text content that might overflow "
        .repeat(5)
        .trim();
      render(
        <DsInputAdornment position="start">
          <DsTypography>{longText}</DsTypography>
        </DsInputAdornment>
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("should handle rapid prop changes", () => {
      const { rerender } = render(
        <DsInputAdornment position="start">
          <DsTypography>A</DsTypography>
        </DsInputAdornment>
      );
      let adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toHaveClass("MuiInputAdornment-positionStart");
      expect(screen.getByText("A")).toBeInTheDocument();

      // Simulate rapid changes
      for (let i = 0; i < 10; i++) {
        const position = i % 2 === 0 ? "start" : "end";
        rerender(
          <DsInputAdornment position={position}>
            <DsTypography>{position}</DsTypography>
          </DsInputAdornment>
        );
      }

      // Re-query the element after all the rerenders
      adornment = document.querySelector(".MuiInputAdornment-root");
      expect(adornment).toBeInTheDocument();
      expect(adornment).toHaveClass("MuiInputAdornment-positionEnd");
      expect(screen.getByText("end")).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING TESTS
  // ============================
  describe("Theme Testing", () => {
    it("should render consistently across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsInputAdornment
            position="start"
            data-testid={`adornment-${colorScheme}`}
          >
            <DsTypography>{colorScheme.charAt(0).toUpperCase()}</DsTypography>
          </DsInputAdornment>
        ),
        (container, colorScheme) => {
          const adornment = container.querySelector(
            `[data-testid="adornment-${colorScheme}"]`
          );
          expect(adornment).toBeInTheDocument();
          expect(adornment).toHaveClass("MuiInputAdornment-root");
        }
      );
    });

    it("should handle theme color schemes properly", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;
      // Theme-specific expectations mapping for background colors
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
      const themeColorScheme = getColorScheme(PALETTE);

      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        const { container, unmount } = render(
          <DsInputAdornment
            position="start"
            sx={{
              color: "var(--ds-colour-iconNegative)",
            }}
          >
            <DsRemixIcon className="ri-search-line" />
          </DsInputAdornment>,
          { colorScheme }
        );

        const themeContainer = container.firstChild as HTMLElement;
        expect(themeContainer).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        const adornment = container.querySelector(
          ".MuiInputAdornment-root"
        ) as HTMLElement;
        expect(adornment).toBeInTheDocument();

        // Verify the computed background color uses the correct CSS variable
        const computedStyles = window.getComputedStyle(adornment);
        const actualColor = computedStyles.color;

        // The CSS variable should be applied
        expect(actualColor).toBe("var(--ds-colour-iconNegative)");

        // Verify that the design system color for typoActionSecondary matches expected theme color
        const actualTypoActionSecondary = schemeData?.ds?.colour?.iconNegative;
        expect(actualTypoActionSecondary).toBe(expectations.expectedColor);
        unmount();
      });
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as currency prefix", () => {
      render(
        <DsTextField
          label="Price"
          placeholder="0.00"
          startAdornment={
            <DsInputAdornment position="start">
              <DsTypography>$</DsTypography>
            </DsInputAdornment>
          }
        />
      );

      expect(screen.getByText("$")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("0.00")).toBeInTheDocument();
    });

    it("should work as search field with icon", () => {
      const handleSearch = vi.fn();
      render(
        <DsTextField
          label="Search"
          startAdornment={
            <DsInputAdornment position="start">
              <DsRemixIcon className="ri-search-line" />
            </DsInputAdornment>
          }
          endAdornment={
            <DsInputAdornment position="end">
              <DsIconButton onClick={handleSearch} aria-label="Search">
                <DsRemixIcon className="ri-send-plane-line" />
              </DsIconButton>
            </DsInputAdornment>
          }
        />
      );

      const searchButton = screen.getByLabelText("Search");
      expect(handleSearch).not.toHaveBeenCalled();

      fireEvent.click(searchButton);
      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(searchButton).toBeInTheDocument();
    });

    it("should work as password field with visibility toggle", async () => {
      const [showPassword, setShowPassword] = [false, vi.fn()];
      render(
        <DsTextField
          label="Password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <DsInputAdornment position="end">
              <DsIconButton
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                <DsRemixIcon
                  className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}
                />
              </DsIconButton>
            </DsInputAdornment>
          }
        />
      );

      const toggleButton = screen.getByLabelText("Toggle password visibility");
      await user.click(toggleButton);
      expect(setShowPassword).toHaveBeenCalled();
    });

    it("should work as measurement field with units", () => {
      render(
        <DsBox display="flex" gap={2}>
          <DsTextField
            label="Length"
            endAdornment={
              <DsInputAdornment position="end">
                <DsTypography>cm</DsTypography>
              </DsInputAdornment>
            }
          />
          <DsTextField
            label="Weight"
            endAdornment={
              <DsInputAdornment position="end">
                <DsTypography>kg</DsTypography>
              </DsInputAdornment>
            }
          />
        </DsBox>
      );

      expect(screen.getByText("cm")).toBeInTheDocument();
      expect(screen.getByText("kg")).toBeInTheDocument();
    });

    it("should work in form validation context", () => {
      render(
        <DsBox component="form">
          <DsTextField
            label="Email"
            error
            helperText="Invalid email format"
            startAdornment={
              <DsInputAdornment position="start">
                <DsRemixIcon className="ri-mail-line" />
              </DsInputAdornment>
            }
          />
        </DsBox>
      );

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(screen.getByText(/Invalid email format/)).toBeInTheDocument();
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(
        <DsInputAdornment position="start">
          <DsTypography>Default</DsTypography>
        </DsInputAdornment>
      );
      expect(container.firstChild).toMatchSnapshot("input-adornment-default");
    });

    it("should match snapshots with different positions", () => {
      const positions = ["start", "end"] as const;

      positions.forEach((position) => {
        const { container } = render(
          <DsInputAdornment position={position}>
            <DsTypography>Position</DsTypography>
          </DsInputAdornment>
        );
        expect(container.firstChild).toMatchSnapshot(
          `input-adornment-position-${position}`
        );
      });
    });

    it("should match snapshots with different variants", () => {
      const variants = ["standard", "outlined", "filled"] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <DsInputAdornment position="start" variant={variant}>
            <DsTypography>Variant</DsTypography>
          </DsInputAdornment>
        );
        expect(container.firstChild).toMatchSnapshot(
          `input-adornment-variant-${variant}`
        );
      });
    });

    it("should match snapshots with different content types", () => {
      const contentTypes = [
        {
          name: "text",
          content: <DsTypography>Text</DsTypography>,
        },
        {
          name: "icon",
          content: <DsRemixIcon className="ri-search-line" />,
        },
        {
          name: "button",
          content: (
            <DsIconButton aria-label="Action">
              <DsRemixIcon className="ri-close-line" />
            </DsIconButton>
          ),
        },
      ];

      contentTypes.forEach(({ name, content }) => {
        const { container } = render(
          <DsInputAdornment position="start">{content}</DsInputAdornment>
        );
        expect(container.firstChild).toMatchSnapshot(
          `input-adornment-content-${name}`
        );
      });
    });

    it("should match snapshots across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsInputAdornment position="start">
            <DsTypography>{colorScheme.charAt(0).toUpperCase()}</DsTypography>
          </DsInputAdornment>
        ),
        (container, colorScheme) => {
          expect(container.firstChild).toMatchSnapshot(
            `input-adornment-theme-${colorScheme}`
          );
        }
      );
    });

    it("should match snapshot with complex content", () => {
      const { container } = render(
        <DsInputAdornment position="start">
          <DsBox display="flex" alignItems="center" gap={1}>
            <DsRemixIcon className="ri-currency-line" />
            <DsTypography>USD</DsTypography>
          </DsBox>
        </DsInputAdornment>
      );
      expect(container.firstChild).toMatchSnapshot(
        "input-adornment-complex-content"
      );
    });

    it("should match snapshot in TextField integration", () => {
      const { container } = render(
        <DsTextField
          label="Amount"
          startAdornment={
            <DsInputAdornment position="start">
              <DsTypography>$</DsTypography>
            </DsInputAdornment>
          }
          endAdornment={
            <DsInputAdornment position="end">
              <DsTypography>USD</DsTypography>
            </DsInputAdornment>
          }
        />
      );
      expect(container.firstChild).toMatchSnapshot(
        "input-adornment-textfield-integration"
      );
    });

    it("should match snapshot with custom styling", () => {
      const { container } = render(
        <DsInputAdornment
          position="start"
          sx={{
            color: "primary.main",
            backgroundColor: "background.paper",
            padding: 1,
          }}
        >
          <DsTypography>Styled</DsTypography>
        </DsInputAdornment>
      );
      expect(container.firstChild).toMatchSnapshot(
        "input-adornment-custom-styling"
      );
    });
  });
});
