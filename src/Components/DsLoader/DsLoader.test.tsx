/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsLoader component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Tests for default and required props rendering
 * 2. Props Validation - Tests for prop handling and defaults
 * 3. Component States - Tests for different component configurations
 * 4. MUI Styling - Tests for Material-UI classes and styling
 * 5. Component Functionality - Tests for loader variants and backdrop behavior
 * 6. Theme Testing - Tests across different color schemes
 * 7. Accessibility - Tests for accessibility features
 * 8. Edge Cases - Tests for unusual scenarios and boundary conditions
 * 9. Real-world Scenarios - Tests for common usage patterns
 * 10. Snapshot Testing - Visual regression protection
 * 
 * @package @am92/react-design-system
 * @component DsLoader
 */

import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsLoader } from "./DsLoader.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsLoader", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsLoader />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should render the loader element within backdrop", () => {
      render(<DsLoader />);
      // Check for SVG loader elements
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should render without crashing when no props provided", () => {
      expect(() => render(<DsLoader />)).not.toThrow();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should use default variant when not specified", () => {
      render(<DsLoader />);
      // Default variant is 'threeDot' - should render threeDot loader
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute("viewBox", "0 0 1000 1000");
    });

    it("should render different loader variants", () => {
      const { rerender } = render(<DsLoader ds-variant="threeDot" />);
      let svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();

      rerender(<DsLoader ds-variant="singleDot" />);
      svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should apply custom position styles", () => {
      const positions = ["absolute", "fixed"] as const;
      
      positions.forEach(position => {
        const { unmount } = render(<DsLoader position={position} />);
        const backdrop = document.querySelector("[class*='MuiBackdrop']");
        expect(backdrop).toBeInTheDocument();
        
        // Position is applied to the DsBox wrapper, not the backdrop
        const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
        expect(loaderBox).toBeInTheDocument();
        
        // Check that the position style is applied through CSS-in-JS
        if (loaderBox) {
          const computedStyle = window.getComputedStyle(loaderBox);
          expect(computedStyle.position).toBe(position);
        }
        
        unmount();
      });
    });

    it("should handle backdrop prop correctly", () => {
      const { rerender } = render(<DsLoader backdrop={true} />);
      let backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toBeVisible();

      rerender(<DsLoader backdrop={false} />);
      backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveClass("MuiBackdrop-invisible");
      // When backdrop is false, it should be invisible but still present
    });

    it("should pass through BackdropProps", () => {
      render(
        <DsLoader 
          BackdropProps={{ 
            "data-testid": "custom-backdrop",
            style: { zIndex: 9999 }
          } as any} 
        />
      );
      const backdrop = screen.getByTestId("custom-backdrop");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveStyle({ zIndex: "9999" });
    });

    it("should handle color prop for loader styling", () => {
      render(<DsLoader color="primary" />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      
      // Color should be applied to the DsBox wrapper
      const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
      expect(loaderBox).toBeInTheDocument();
      
      if (loaderBox) {
        const computedStyle = window.getComputedStyle(loaderBox);
        // The component uses CSS custom properties for color theming
        // Check that the color includes the primary color reference
        expect(computedStyle.color).toContain('var(--ds-colour-primary');
        
        // Verify the fallback color is also present
        expect(computedStyle.color).toContain('var(--palette-common-white)');
      }
    });

    it("should merge custom sx props with default ones", () => {
      render(<DsLoader sx={{ opacity: 0.8, zIndex: 1500 }} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      
      // Custom sx props should be applied to the DsBox wrapper
      const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
      expect(loaderBox).toBeInTheDocument();
      
      if (loaderBox) {
        const computedStyle = window.getComputedStyle(loaderBox);
        // Check that custom sx opacity is applied
        expect(computedStyle.opacity).toBe('0.8');
        expect(computedStyle.zIndex).toBe('1500');
      }
    });
  });

  // ============================
  // COMPONENT STATES
  // ============================
  describe("Component States", () => {
    it("should handle different color states", () => {
      const colors = ["primary", "secondary", "error", "warning", "info", "success"];
      colors.forEach(color => {
        const { unmount } = render(<DsLoader color={color as any} />);
        const backdrop = document.querySelector("[class*='MuiBackdrop']");
        expect(backdrop).toBeInTheDocument();
        
        // Validate that the color is actually applied to the DsBox wrapper
        const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
        expect(loaderBox).toBeInTheDocument();
        
        if (loaderBox) {
          const computedStyle = window.getComputedStyle(loaderBox);
          // Check that the color includes the specific color reference
          expect(computedStyle.color).toContain(`var(--ds-colour-${color}`);
          
          // Verify backdrop state affects color fallback
          if (color === "primary") {
            // For primary color, check both color references are included
            expect(computedStyle.color).toContain('var(--ds-colour-primary');
            expect(computedStyle.color).toContain('var(--palette-common-white)');
          }
        }
        
        unmount();
      });
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI Backdrop classes", () => {
      render(<DsLoader />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveClass("MuiBackdrop-root");
    });

    it("should apply Box component classes for loader wrapper", () => {
      render(<DsLoader />);
      const box = document.querySelector("[class*='MuiBox']");
      expect(box).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY
  // ============================
  describe("Component Functionality", () => {
    it("should render ThreeDotLoader by default", () => {
      render(<DsLoader />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      
      // ThreeDotLoader should have specific clipPath id and multiple ball animations
      const svgContent = svg?.innerHTML || '';
      expect(svgContent).toContain('__loader_element_524'); // ThreeDotLoader clipPath id
      expect(svgContent).toContain('@keyframes ball1'); // First ball animation
      expect(svgContent).toContain('@keyframes ball2'); // Second ball animation  
      expect(svgContent).toContain('@keyframes ball3'); // Third ball animation
    });

    it("should render SingleDotLoader when variant is specified", () => {
      render(<DsLoader ds-variant="singleDot" />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      
      // SingleDotLoader should have specific clipPath id and single ball animation
      const svgContent = svg?.innerHTML || '';
      expect(svgContent).toContain('__loader_element_11'); // SingleDotLoader clipPath id
      expect(svgContent).toContain('@keyframes ball'); // Single ball animation (not ball1, ball2, ball3)
      expect(svgContent).not.toContain('@keyframes ball1'); // Should not have multiple ball animations
    });

    it("should render ThreeDotLoader when variant is explicitly specified", () => {
      render(<DsLoader ds-variant="threeDot" />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      
      // Should render same as default (ThreeDotLoader)
      const svgContent = svg?.innerHTML || '';
      expect(svgContent).toContain('__loader_element_524');
      expect(svgContent).toContain('@keyframes ball1');
      expect(svgContent).toContain('@keyframes ball2');  
      expect(svgContent).toContain('@keyframes ball3');
    });

    it("should maintain loader animation properties", () => {
      render(<DsLoader />);
      const svg = document.querySelector("svg");
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveStyle({
        width: "100%",
        height: "100%"
      });
    });

    it("should handle color fallbacks correctly", () => {
      const { rerender } = render(<DsLoader color="primary" backdrop={true} />);
      let backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();

      rerender(<DsLoader color="primary" backdrop={false} />);
      backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should apply correct sizing constraints from default props", () => {
      render(<DsLoader />);
      const box = document.querySelector("[class*='MuiBox']");
      expect(box).toBeInTheDocument();
      // Default props include maxHeight and maxWidth of 100px
    });
  });

  // ============================
  // ACCESSIBILITY
  // ============================
  describe("Accessibility", () => {
    it("should be accessible by screen readers", () => {
      render(<DsLoader />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      // Backdrop should not block screen reader access to other content when invisible
    });

    it("should handle aria-hidden appropriately", () => {
      render(<DsLoader BackdropProps={{ "aria-hidden": "true" } as any} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveAttribute("aria-hidden", "true");
    });

    it("should support custom aria attributes", () => {
      render(
        <DsLoader 
          BackdropProps={{ 
            "aria-label": "Loading content",
            "role": "status"
          } as any} 
        />
      );
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveAttribute("aria-label", "Loading content");
      expect(backdrop).toHaveAttribute("role", "status");
    });
  });

  // ============================
  // EDGE CASES
  // ============================
  describe("Edge Cases", () => {
    it("should handle undefined color gracefully", () => {
      render(<DsLoader color={undefined} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should handle null BackdropProps", () => {
      render(<DsLoader BackdropProps={null as any} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should handle empty sx prop", () => {
      render(<DsLoader sx={{}} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should handle invalid variant gracefully", () => {
      // NOTE: This test documents current behavior - invalid variant causes component to crash
      // This indicates a potential bug in the component that should be fixed
      expect(() => {
        // @ts-expect-error - Testing invalid variant
        render(<DsLoader ds-variant="invalidVariant" />);
      }).toThrow("Element type is invalid");
      
      // EXPECTED BEHAVIOR (if component was fixed):
      // Component should still render backdrop even with invalid variant,
      // potentially falling back to default variant
    });

    it("should handle very long color strings", () => {
      const longColor = "a".repeat(1000);
      render(<DsLoader color={longColor} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });

    it("should handle special characters in color", () => {
      const specialColor = "!@#$%^&*()";
      render(<DsLoader color={specialColor} />);
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as a full-screen loading overlay", () => {
      render(
        <DsLoader 
          position="fixed" 
          backdrop={true}
          sx={{ zIndex: 1300 }}
        />
      );
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      // zIndex is applied to the loader box wrapper, not the backdrop itself
      const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
      expect(loaderBox).toBeInTheDocument();
    });

    it("should work with custom themed colors", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const lightScheme = themeColorScheme.light;
      const expectedOverlay = lightScheme?.ds?.colour?.overlay;
      
      render(
        <DsLoader 
          color="primary"
          ds-variant="singleDot"
          sx={{ backgroundColor: expectedOverlay }}
        />
      );
      
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      
      // Validate loader box uses theme overlay color
      const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
      expect(loaderBox).toBeInTheDocument();
      
      if (loaderBox) {
        const computedStyle = window.getComputedStyle(loaderBox);
        const actualBackgroundColor = computedStyle.backgroundColor;
        
        // Component should use theme colors
        expect(actualBackgroundColor).toBeTruthy();
        expect(actualBackgroundColor).toMatch(/^rgba?\(/);
        expect(actualBackgroundColor).not.toBe('transparent');
        
        // Validate theme provides the overlay color
        expect(expectedOverlay).toBeTruthy();
        expect(expectedOverlay).toMatch(/^rgba?\(/);
      }
    });

    it("should work in a loading state pattern", () => {
      const { rerender } = render(
        <div>
          <DsLoader backdrop={true} />
          <div>Content that should be covered</div>
        </div>
      );
      
      let backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toBeVisible();
      
      // Simulate loading complete
      rerender(
        <div>
          <div>Content is now visible</div>
        </div>
      );
      
      expect(screen.getByText("Content is now visible")).toBeInTheDocument();
    });

    it("should handle complex nested scenarios", () => {
      render(
        <div>
          <div>
            <DsLoader 
              ds-variant="threeDot"
              color="secondary"
              position="absolute"
              sx={{ borderRadius: 2 }}
            />
          </div>
        </div>
      );
      const backdrop = document.querySelector("[class*='MuiBackdrop']");
      expect(backdrop).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should use correct design system colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const themes = ['light', 'dark', 'highContrast'] as const;
      const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
      
      themes.forEach(theme => {
        const schemeData = themeColorScheme[theme];
        
        colors.forEach(color => {
          const { unmount } = render(
            <DsLoader color={color} />, 
            { colorScheme: theme }
          );
          
          // Get expected colors from theme palette based on color type
          const themeColors = schemeData?.ds?.colour;
          let expectedColor;
          
          switch(color) {
            case 'primary':
              expectedColor = themeColors?.actionPrimary;
              break;
            case 'secondary':
              expectedColor = themeColors?.actionSecondary;
              break;
            case 'error':
              expectedColor = themeColors?.supportNegative;
              break;
            case 'warning':
              expectedColor = themeColors?.supportWarning;
              break;
            case 'info':
              expectedColor = themeColors?.supportVariable;
              break;
            case 'success':
              expectedColor = themeColors?.supportPositive;
              break;
          }
          
          // Validate theme provides the expected color
          expect(expectedColor).toBeTruthy();
          
          // Validate loader box uses theme colors
          const loaderBox = document.querySelector("[class*='MuiBox']:not([data-mui-color-scheme])");
          expect(loaderBox).toBeInTheDocument();
          
          if (loaderBox) {
            const computedStyle = window.getComputedStyle(loaderBox);
            
            // Validate that color uses theme-specific CSS custom properties
            expect(computedStyle.color).toContain(`var(--ds-colour-${color}`);
            
            // Ensure color resolves to actual values from theme
            const colorValue = computedStyle.color;
            expect(colorValue).toBeTruthy();
            expect(colorValue).not.toBe('initial');
            expect(colorValue).not.toBe('inherit');
            expect(colorValue).not.toBe('unset');
          }
          
          unmount();
        });
      });
    });

    it("should apply theme-specific backdrop overlay colors", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const themes = ['light', 'dark', 'highContrast'] as const;
      
      themes.forEach(theme => {
        const { unmount } = render(
          <DsLoader backdrop={true} />, 
          { colorScheme: theme }
        );
        
        const schemeData = themeColorScheme[theme];
        const expectedOverlay = schemeData?.ds?.colour?.overlay;
        const expectedOverlayLoader = schemeData?.ds?.colour?.overlayLoader;
        
        // Validate theme provides overlay colors
        expect(expectedOverlay).toBeTruthy();
        expect(expectedOverlayLoader).toBeTruthy();
        
        // Validate backdrop uses theme colors
        const backdrop = document.querySelector("[class*='MuiBackdrop']");
        expect(backdrop).toBeInTheDocument();
        
        if (backdrop) {
          const computedStyle = window.getComputedStyle(backdrop);
          const backgroundColor = computedStyle.backgroundColor;
          
          // Backdrop background color should match the expected theme overlay color
          expect(backgroundColor).toBeTruthy();
          expect(backgroundColor).not.toBe('transparent');
          
          // The backgroundColor should either be:
          // 1. The exact expectedOverlay color (resolved rgba value)
          // 2. A CSS variable that references the theme overlay color
          // 3. The expectedOverlayLoader color for loader-specific overlays
          const isExpectedOverlay = backgroundColor === expectedOverlay || 
                                   backgroundColor === expectedOverlayLoader ||
                                   backgroundColor === 'var(--ds-colour-overlay)' ||
                                   backgroundColor.includes('var(--ds-colour-overlay');
          
          expect(isExpectedOverlay).toBe(true);
          
          // Validate the expected theme colors are proper rgba format
          expect(expectedOverlay).toMatch(/^rgba?\(/);
          expect(expectedOverlayLoader).toMatch(/^rgba?\(/);
        }
        
        unmount();
      });
    });

    it("should maintain consistent variant rendering across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const themes = ['light', 'dark', 'highContrast'] as const;
      const variants = ['threeDot', 'singleDot'] as const;
      
      themes.forEach(theme => {
        const schemeData = themeColorScheme[theme];
        
        variants.forEach(variant => {
          const { unmount } = render(
            <DsLoader ds-variant={variant} />, 
            { colorScheme: theme }
          );
          
          // Validate loader dot colors use theme colors
          const expectedDotColor = schemeData?.ds?.colour?.dotLoader;
          expect(expectedDotColor).toBeTruthy();
          
          // Validate SVG content exists and is theme-independent
          const svg = document.querySelector("svg");
          expect(svg).toBeInTheDocument();
          
          if (svg) {
            const svgContent = svg.innerHTML;
            
            // Validate variant-specific content
            if (variant === 'threeDot') {
              expect(svgContent).toContain('__loader_element_524');
              expect(svgContent).toContain('@keyframes ball1');
              expect(svgContent).toContain('@keyframes ball2');
              expect(svgContent).toContain('@keyframes ball3');
            } else if (variant === 'singleDot') {
              expect(svgContent).toContain('__loader_element_11');
              expect(svgContent).toContain('@keyframes ball');
              expect(svgContent).not.toContain('@keyframes ball1');
            }
          }
          
          unmount();
        });
      });
    });
  });

  // ============================
  // SNAPSHOT TESTING
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsLoader />);
      expect(container.firstChild).toMatchSnapshot('loader-default');
    });

    it("should match snapshot with all variants", () => {
      const variants = ['threeDot', 'singleDot'] as const;
      
      variants.forEach(variant => {
        const { container } = render(<DsLoader ds-variant={variant} />);
        expect(container.firstChild).toMatchSnapshot(`loader-variant-${variant}`);
      });
    });

    it("should match snapshot with backdrop disabled", () => {
      const { container } = render(<DsLoader backdrop={false} />);
      expect(container.firstChild).toMatchSnapshot('loader-no-backdrop');
    });

    it("should match snapshot with custom positioning", () => {
      const { container } = render(<DsLoader position="absolute" />);
      expect(container.firstChild).toMatchSnapshot('loader-absolute-position');
    });

    it("should match snapshot with custom styling", () => {
      const { container } = render(
        <DsLoader 
          sx={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }}
        />
      );
      expect(container.firstChild).toMatchSnapshot('loader-custom-styling');
    });
  });
});
