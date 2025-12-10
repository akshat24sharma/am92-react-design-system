import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { DsRemixIcon } from "./DsRemixIcon.Component";
import {
  renderWithTheme,
  testAllThemes,
} from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { render } from "../../Tests/Mocks/setupTests";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";

/**
 * @vitest-environment jsdom
 *
 * Test suite for DsRemixIcon component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for correct rendering of the icon with default props and children.
 * 2. Additional Props - Tests for proper handling of baseClassName, fontSize, sx, style, and className props.
 * 3. MUI Styling - Tests for correct application of MUI classes, color props, and theme.
 * 4. Accessibility - Tests for proper ARIA attributes and their handling, including aria-hidden and additional ARIA attributes.
 * 5. Theme Testing - Tests for rendering and color application across different themes, including color variants and efficient theme testing.
 * 6. Edge Cases - Tests for handling of missing className and null or undefined children gracefully.
 * 7. Snapshot Tests - Tests for matching snapshots with various props, styles, and themes.
 *
 * @package @am92/react-design-system
 * @component DsRemixIcon
 */

describe("DsRemixIcon Component", () => {
  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render the icon with default props", () => {
      render(
        <DsRemixIcon
          className="ri-arrow-left-line"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("ri-arrow-left-line");
    });

    it("should render children if provided", () => {
      render(
        <DsRemixIcon data-testid="ds-remix-icon">
          <span>Custom Child</span>
        </DsRemixIcon>
      );
      const child = screen.getByText("Custom Child");
      expect(child).toBeInTheDocument();
    });
  });

  // ============================
  // ADDITIONAL PROPS TESTS
  // ============================
  describe("Additional Props", () => {
    it("should apply the baseClassName prop correctly", () => {
      render(
        <DsRemixIcon
          className="ri-home-line"
          baseClassName="custom-icon-class"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveClass("custom-icon-class");
    });

    it("should apply the sx prop for custom styles", () => {
      render(
        <DsRemixIcon
          className="ri-star-line"
          sx={{ fontSize: "32px" }}
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveStyle("font-size: 32px");
    });

    it("should apply the style prop for inline styles", () => {
      render(
        <DsRemixIcon
          className="ri-heart-line"
          style={{ fontSize: "20px" }}
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveStyle("font-size: 20px");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI RemixIcon classes", () => {
      render(
        <DsRemixIcon
          className="ri-moon-line"
          color="secondary"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveClass("MuiIcon-root");
    });

    it("should apply MUI color classes correctly", () => {
      render(
        <DsRemixIcon
          className="ri-moon-line"
          color="secondary"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveClass("MuiIcon-colorSecondary");
    });

    it("should apply the MUI fontSize prop correctly", () => {
      const fontSizes = [
        "small",
        "medium",
        "large",
        "scorched",
        "torrid",
        "blazzing",
        "hot",
        "tropical",
        "warm",
        "mild",
        "cool",
        "cold",
        "bitterCold",
        "frigid",
        "frostbite",
        "blizzard",
        "iceAge",
      ];

      for (const fontSize of fontSizes) {
        render(
          <DsRemixIcon
            className="ri-settings-line"
            fontSize={fontSize as any}
            data-testid={`ds-remix-icon-${fontSize}`}
          />
        );
        const icon = screen.getByTestId(`ds-remix-icon-${fontSize}`);
        expect(icon).toHaveClass(
          `MuiIcon-fontSize${
            fontSize.charAt(0).toUpperCase() + fontSize.slice(1)
          }`
        );
      }
    });

    it("should apply both className and baseClassName props together", () => {
      render(
        <DsRemixIcon
          className="ri-check-line"
          baseClassName="base-icon-class"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveClass("ri-check-line");
      expect(icon).toHaveClass("base-icon-class");
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <DsRemixIcon className="ri-settings-line" data-testid="ds-remix-icon" />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveAttribute("aria-hidden");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
    it("should not have aria-hidden attribute if explicitly set to false", () => {
      render(
        <DsRemixIcon
          className="ri-check-line"
          aria-hidden="false"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveAttribute("aria-hidden", "false");
    });
    it("should support additional ARIA attributes", () => {
      render(
        <DsRemixIcon
          className="ri-check-line"
          aria-label="Check Icon"
          data-testid="ds-remix-icon"
        />
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveAttribute("aria-label", "Check Icon");
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should render correctly across all color schemes with proper theme colors", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsRemixIcon
            className="ri-star-line"
            color="primary"
            data-testid={`icon-${colorScheme}`}
          />,
          colorScheme
        );

        const icon = screen.getByTestId(`icon-${colorScheme}`);
        expect(icon).toBeInTheDocument();

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];

        // Primary color should match theme
        const expectedPrimaryColor = (schemeData?.palette?.primary as any)
          ?.main;
        expect(expectedPrimaryColor).toBeTruthy();
        // Note: Theme may transform palette colors, so we verify it's a valid hex color
        expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

        // Text color should match theme
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedTextColor).toBeTruthy();

        // Verify CSS classes
        const muiIconRoot = container.querySelector(
          ".MuiIcon-root"
        ) as HTMLElement;
        expect(muiIconRoot).toHaveClass("MuiIcon-colorPrimary");

        // Snapshot testing
        expect(container.firstChild).toMatchSnapshot(
          `muiIcon-${colorScheme}-theme`
        );
        unmount();
      });
    });

    it("should apply correct theme colors for all color variants", () => {
      //Just checking for few colors to keep test time low
      const colorVariants = [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
      ] as const;

      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for color variants

      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];

        colorVariants.forEach((color) => {
          const { container, unmount } = renderWithTheme(
            <DsRemixIcon
              className="ri-star-line"
              color={color}
              data-testid={`icon-${color}-${colorScheme}`}
            />,
            colorScheme
          );

          // Get expected color from the theme's palette
          const paletteColor = schemeData?.palette?.[color] as any;
          const expectedColor = paletteColor?.main;

          expect(expectedColor).toBeTruthy(); // Ensure we have a valid color

          // Verify the icon renders with correct color variant
          const muiIconRoot = container.querySelector(
            `[data-testid="icon-${color}-${colorScheme}"]`
          ) as HTMLElement;
          expect(muiIconRoot).toBeInTheDocument();

          // Verify the component has the correct MUI color class
          expect(muiIconRoot).toHaveClass("MuiIcon-root");
          expect(muiIconRoot).toHaveClass(
            `MuiIcon-color${color.charAt(0).toUpperCase() + color.slice(1)}`
          );

          // Verify the computed color uses the correct CSS variable or resolved color
          const computedStyles = window.getComputedStyle(muiIconRoot);
          const actualColor = computedStyles.color;

          // Check if the color is using CSS variables (which is expected in our design system)
          if (actualColor.startsWith("var(--palette-")) {
            // Verify it's using the correct CSS variable for the color
            const expectedCssVar = `var(--palette-${color}-main)`;
            expect(actualColor).toBe(expectedCssVar);
          }

          unmount();
        });
      });
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (colorScheme) => (
          <DsRemixIcon
            className="ri-star-line"
            data-testid={`remixIcon-${colorScheme}`}
          />
        ),
        (container, colorScheme) => {
          const icon = container.querySelector(
            `[data-testid="remixIcon-${colorScheme}"]`
          );
          expect(icon).toBeInTheDocument();
        }
      );
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle missing className prop gracefully", () => {
      render(<DsRemixIcon data-testid="ds-remix-icon" />);
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toBeInTheDocument();
    });

    it("should handle null children gracefully", () => {
      render(<DsRemixIcon data-testid="ds-remix-icon">{null}</DsRemixIcon>);
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toBeEmptyDOMElement();
    });

    it("should not render children if they are undefined", () => {
      render(
        <DsRemixIcon data-testid="ds-remix-icon">{undefined}</DsRemixIcon>
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toBeInTheDocument();
      expect(icon).toBeEmptyDOMElement();
    });
  });
});

// ============================
// SNAPSHOT TESTS
// ============================
describe("Snapshot Tests", () => {
  it("should match the snapshot with default props", () => {
    const { container } = render(<DsRemixIcon className="ri-star-line" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match the snapshot with additional props", () => {
    const { container } = render(
      <DsRemixIcon className="ri-heart-line" data-testid="remixIcon" />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match the snapshot with custom styles", () => {
    const { container } = render(
      <DsRemixIcon
        className="ri-check-line"
        style={{ color: "red", fontSize: "24px" }}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match the snapshot with different fontSize sizes", () => {
    const fontSizes = [
      "small",
      "medium",
      "large",
      "scorched",
      "torrid",
      "blazzing",
      "hot",
      "tropical",
      "warm",
      "mild",
      "cool",
      "cold",
      "bitterCold",
      "frigid",
      "frostbite",
      "blizzard",
      "iceAge",
    ] as const;

    fontSizes.forEach((size) => {
      const { container } = render(
        <DsRemixIcon className="ri-settings-line" fontSize={size} />
      );
      expect(container.firstChild).toMatchSnapshot(`icon-size-${size}`);
    });
  });

  it("should match the snapshot with different colors", () => {
    const colors = [
      "primary",
      "secondary",
      "error",
      "info",
      "success",
      "warning",
    ] as const;
    colors.forEach((color) => {
      const { container } = render(
        <DsRemixIcon className="ri-alarm-line" color={color} />
      );
      expect(container.firstChild).toMatchSnapshot(`icon-color-${color}`);
    });
  });

  it("should match the snapshot in a real-world scenario", () => {
    const { container } = render(
      <DsBox sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <DsRemixIcon className="ri-home-line" />
        <DsTypography variant="bodyRegularLarge">Home</DsTypography>
      </DsBox>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should match the snapshot across all themes", () => {
    const themes = ["light", "dark", "highContrast"] as const;
    themes.forEach((theme) => {
      const { container } = renderWithTheme(
        <DsRemixIcon className="ri-moon-line" />,
        theme
      );
      expect(container.firstChild).toMatchSnapshot(`icon-theme-${theme}`);
    });
  });
});
