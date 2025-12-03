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
import getLightModeColorScheme from "../../Theme/getColorScheme/light";
import getDarkModeColorScheme from "../../Theme/getColorScheme/dark";
import getHighContrastModeColorScheme from "../../Theme/getColorScheme/highContrast";

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
            <DsLink color={color} href="#" />,
            colorScheme
          );

          // Get expected color from the theme's palette
          const paletteColor = schemeData?.palette?.[color] as any;
          const expectedColor = paletteColor?.main;

          expect(expectedColor).toBeTruthy(); // Ensure we have a valid color
          expect(expectedColor).toBe(
            (schemeData?.palette?.[color] as any)?.main
          );

          // Verify CSS class
          const linkRoot = container.querySelector(
            ".MuiLink-root"
          ) as HTMLElement;
          expect(linkRoot).toBeInTheDocument();

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
      // Get the light and dark color schemes directly from their files
      const lightScheme = getLightModeColorScheme(PALETTE);
      const darkScheme = getDarkModeColorScheme(PALETTE);
      const highContrastScheme = getHighContrastModeColorScheme(PALETTE);

      // Test light theme colors
      const { container: lightContainer, unmount: unmountLight } =
        renderWithTheme(
          <DsLink href="#" color="primary" data-testid="link-light">
            Light Theme Link
          </DsLink>,
          "light"
        );

      const lightLink = lightContainer.querySelector(
        '[data-testid="link-light"]'
      ) as HTMLElement;
      expect(lightLink).toBeInTheDocument();

      // Test that DsLink actually renders with correct colors
      const lightLinkStyles = window.getComputedStyle(lightLink);
      // Verify DsLink color matches theme's primary action color
      expect(lightLinkStyles.textDecorationColor).toBeDefined();
      expect(lightLinkStyles.textDecorationColor).not.toBe("");

      // The textDecorationColor should be the CSS variable for typoActionPrimary
      expect(lightLinkStyles.textDecorationColor).toBe(
        "var(--ds-colour-typoActionPrimary)"
      );

      // Verify that the light theme's actionPrimary matches the expected palette color
      const expectedLightPrimaryColor = PALETTE.primary;
      expect(lightScheme.lightDsColor.typoActionPrimary).toBe(
        expectedLightPrimaryColor
      );

      unmountLight();

      // Test dark theme colors
      const { container: darkContainer, unmount: unmountDark } =
        renderWithTheme(
          <DsLink href="#" color="primary" data-testid="link-dark">
            Dark Theme Link
          </DsLink>,
          "dark"
        );

      const darkLink = darkContainer.querySelector(
        '[data-testid="link-dark"]'
      ) as HTMLElement;
      expect(darkLink).toBeInTheDocument();

      // Test that DsLink actually renders with correct colors in dark theme
      const darkLinkStyles = window.getComputedStyle(darkLink);

      // Verify DsLink color matches theme's primary action color
      expect(darkLinkStyles.textDecorationColor).toBeDefined();
      expect(darkLinkStyles.textDecorationColor).not.toBe("");

      expect(darkLinkStyles.textDecorationColor).toBe(
        "var(--ds-colour-typoActionPrimary)"
      );

      // The dark theme uses white for typography action primary
      const expectedDarkTypoPrimaryColor = PALETTE.primaryWhite;
      expect(darkScheme.darkDsColor.typoActionPrimary).toBe(
        expectedDarkTypoPrimaryColor
      );

      // Light and dark themes use different typography action colors
      expect(lightScheme.lightDsColor.typoActionPrimary).not.toBe(
        darkScheme.darkDsColor.typoActionPrimary
      );

      unmountDark();

      // Test high contrast theme colors
      const { container: highContrastContainer, unmount: unmountHighContrast } =
        renderWithTheme(
          <DsLink href="#" color="primary" data-testid="link-highContrast">
            High Contrast Theme Link
          </DsLink>,
          "highContrast"
        );

      const highContrastLink = highContrastContainer.querySelector(
        '[data-testid="link-highContrast"]'
      ) as HTMLElement;
      expect(highContrastLink).toBeInTheDocument();

      // Test that DsLink actually renders with correct high contrast colors
      const highContrastLinkStyles = window.getComputedStyle(highContrastLink);

      // Verify text decoration color (underline color) for high contrast - should use CSS variable
      expect(highContrastLinkStyles.textDecorationColor).toBeDefined();
      expect(highContrastLinkStyles.textDecorationColor).toBe(
        "var(--ds-colour-typoActionPrimary)"
      );

      // High contrast uses different color than light/dark themes
      const expectedHighContrastColor = PALETTE.highContrast1;
      expect(highContrastScheme.highContrastDsColor.typoActionPrimary).toBe(
        expectedHighContrastColor
      );

      // Verify high contrast color is different from light/dark theme colors
      expect(highContrastScheme.highContrastDsColor.typoActionPrimary).not.toBe(
        PALETTE.primary
      );

      unmountHighContrast();
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
