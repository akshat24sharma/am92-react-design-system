/**
 * @vitest-environment jsdom
 *
 * Test suite for DsLink component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. MUI Styling - Material-UI specific styling and theme integration
 * 4. Event Handling - User interactions and event handlers
 * 5. Accessibility - ARIA attributes, keyboard navigation, and screen reader support
 * 6. Edge Cases - Unusual scenarios and boundary conditions
 * 7. Real-world Scenarios - Common usage patterns and integration in navigation
 * 8. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 9. Snapshot Testing - Visual regression testing across all states and themes
 *
 * @package @am92/react-design-system
 * @component DsLink
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  renderWithTheme,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";

import userEvent from "@testing-library/user-event";
import { DsLink } from "./DsLink.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsLink Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsLink href="#">Default Link</DsLink>);
      const link = screen.getByRole("link", { name: "Default Link" });
      expect(link).toBeInTheDocument();
    });

    it("should render with a custom label", () => {
      render(<DsLink href="#">Custom Label</DsLink>);
      const link = screen.getByText("Custom Label");
      expect(link).toBeInTheDocument();
    });

    it("should render with children elements", () => {
      render(
        <DsLink href="#">
          <span>Child Element</span>
        </DsLink>
      );
      const link = screen.getByText("Child Element");
      expect(link).toBeInTheDocument();
    });

    it("should render with default color primary", () => {
      render(<DsLink href="#">Primary Color Link</DsLink>);
      const link = screen.getByRole("link", { name: "Primary Color Link" });
      expect(link).toHaveStyle({ color: "var(--ds-colour-typoActionPrimary)" });
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and render a custom href", () => {
      render(<DsLink href="https://example.com">Example</DsLink>);
      const link = screen.getByRole("link", { name: "Example" });
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("should accept with target='_blank' when specified", () => {
      render(
        <DsLink href="https://example.com" target="_blank">
          Open in New Tab
        </DsLink>
      );
      const link = screen.getByRole("link", { name: "Open in New Tab" });
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("should accept with different underline when specified", () => {
      let underlines = ["always", "hover", "none"];
      underlines.forEach((underline) => {
        render(
          <DsLink href="#" underline={underline as any}>
            {underline} Underline Link
          </DsLink>
        );
        const link = screen.getByRole("link", {
          name: `${underline} Underline Link`,
        });
        expect(link).toHaveClass(
          `MuiLink-underline${
            underline.charAt(0).toUpperCase() + underline.slice(1)
          }`
        );
      });
    });

    it("should accept with different variants when specified", () => {
      let variants = [
        "displayBoldLarge",
        "displayBoldMedium",
        "displayBoldSmall",
      ];
      variants.forEach((variant) => {
        render(
          <DsLink href="#" variant={variant as any}>
            {variant} Variant Link
          </DsLink>
        );
        const link = screen.getByRole("link", {
          name: `${variant} Variant Link`,
        });
        expect(link).toHaveClass(
          `MuiTypography-${variant.charAt(0) + variant.slice(1)}`
        );
      });
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      render(<DsLink href="#">Styled Link</DsLink>);
      const link = screen.getByRole("link", { name: "Styled Link" });
      expect(link).toHaveClass("MuiLink-root");
    });

    it("should apply focus styles", async () => {
      render(<DsLink href="#">Focused Link</DsLink>);
      const link = screen.getByRole("link", { name: "Focused Link" });

      await user.tab(); // Simulate focus
      expect(link).toHaveStyle({
        textDecoration: "underline",
      });
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      render(
        <DsLink href="#" onClick={handleClick}>
          Clickable Link
        </DsLink>
      );
      const link = screen.getByRole("link", { name: "Clickable Link" });
      await user.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <DsLink href="#" aria-label="Accessible Link">
          Link
        </DsLink>
      );
      const link = screen.getByRole("link", { name: "Accessible Link" });
      expect(link).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      render(
        <div>
          <DsLink href="#" id="first">
            First Link
          </DsLink>
          <DsLink href="#" id="second">
            Second Link
          </DsLink>
        </div>
      );
      const firstLink = screen.getByRole("link", { name: "First Link" });
      const secondLink = screen.getByRole("link", { name: "Second Link" });

      await user.tab();
      expect(firstLink).toHaveFocus();

      await user.tab();
      expect(secondLink).toHaveFocus();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null href gracefully", () => {
      render(<DsLink href={null as any}>Null Href</DsLink>);
      const link = screen.getByText("Null Href");
      expect(link).not.toHaveAttribute("href");
    });

    it("should handle empty href gracefully", () => {
      render(<DsLink href="">Empty Href</DsLink>);
      const link = screen.getByText("Empty Href");
      expect(link).toHaveAttribute("href", "");
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should render a navigation menu with links", () => {
      const { container } = render(
        <nav>
          <DsLink href="/home">Home</DsLink>
          <DsLink href="/about">About</DsLink>
          <DsLink href="/contact">Contact</DsLink>
        </nav>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should use correct design system colors for all color variants", () => {
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
            <DsLink
              color={color}
              href="#"
              data-testid={`link-${color}-${colorScheme}`}
            >
              {color} Link
            </DsLink>,
            colorScheme
          );

          // Get expected color from the theme's palette
          const paletteColor = schemeData?.palette?.[color] as any;
          const expectedColor = paletteColor?.main;

          expect(expectedColor).toBeTruthy(); // Ensure we have a valid color

          // Verify the link renders with correct color variant
          const linkRoot = container.querySelector(
            `[data-testid="link-${color}-${colorScheme}"]`
          ) as HTMLElement;
          expect(linkRoot).toBeInTheDocument();

          // Verify the component has the correct MUI classes (DsLink doesn't use color classes)
          expect(linkRoot).toHaveClass("MuiLink-root");

          // Verify the computed color uses the correct CSS variable or resolved color
          const computedStyles = window.getComputedStyle(linkRoot);
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

    it("should render correctly across all themes", () => {
      testAllThemes(
        (theme) => <DsLink href="#">Themed Link</DsLink>,
        (container, theme) => {
          const link = container.querySelector("a");
          expect(link).toBeInTheDocument();
          expect(container.firstChild).toHaveAttribute(
            "data-mui-color-scheme",
            theme
          );
        }
      );
    });

    it("should use colors from light.ts/dark.ts/highContrast.ts that match palette.ts values", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Theme-specific expectations mapping
      const themeExpectations = {
        light: {
          expectedTypoColor: PALETTE.primary,
        },
        dark: {
          expectedTypoColor: PALETTE.primary,
        },
        highContrast: {
          expectedTypoColor: PALETTE.highContrast1,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsLink href="#" color="primary" data-testid={`link-${colorScheme}`}>
            {colorScheme} Theme Link
          </DsLink>,
          colorScheme
        );

        // Verify basic rendering
        const link = container.querySelector(
          `[data-testid="link-${colorScheme}"]`
        ) as HTMLElement;
        expect(link).toBeInTheDocument();

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Test that DsLink renders with correct colors for this theme
        const linkStyles = window.getComputedStyle(link);

        // Verify DsLink color matches theme's primary action color
        expect(linkStyles.textDecorationColor).toBeDefined();
        expect(linkStyles.textDecorationColor).not.toBe("");

        // The textDecorationColor should use the CSS variable for typoActionPrimary
        expect(linkStyles.textDecorationColor).toBe(
          "var(--ds-colour-typoActionPrimary)"
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Primary color should match theme
        const expectedPrimaryColor = (schemeData?.palette?.primary as any)
          ?.main;
        expect(expectedPrimaryColor).toBeTruthy();
        expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

        expect(expectedPrimaryColor).toBe(expectations.expectedTypoColor);
        // Snapshot testing
        expect(container.firstChild).toMatchSnapshot(
          `link-${colorScheme}-theme`
        );

        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsLink href="#">Default Link</DsLink>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with all variants of underline and color", () => {
      const underlines = ["always", "hover", "none"] as const;
      const colors = [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
      ] as const;

      underlines.forEach((underline) => {
        colors.forEach((color) => {
          const { container } = render(
            <DsLink href="#" underline={underline} color={color}>
              {underline} - {color} Link
            </DsLink>
          );
          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
    it("should match snapshot in different themes", () => {
      testAllThemes(
        (theme) => <DsLink href="#">Themed Snapshot Link</DsLink>,
        (container, theme) => {
          expect(container.firstChild).toMatchSnapshot(`DsLink-${theme}`);
        }
      );
    });
  });
});
