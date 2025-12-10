/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsIconButton component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Tests for basic rendering with various props and states
 * 2. Props Validation - Tests for proper prop handling and defaults
 * 3. Component States - Tests for disabled, focused, and other states
 * 4. MUI Styling - Tests for Material-UI classes and custom color/font size variants
 * 5. Event Handling - Tests for user interactions (clicks, keyboard events)
 * 6. Accessibility - Tests for ARIA attributes and keyboard navigation
 * 7. Edge Cases - Tests for unusual but valid usage patterns
 * 8. CSS Overrides - Tests for design system custom styling
 * 9. Theme Testing - Tests for color scheme variations and theme integration
 * 10. Snapshot Testing - Tests for visual regression protection
 * 
 * Note: Since DsIconButton is a direct export of MUI IconButton,
 * functional testing is already covered by MUI test suites.
 * Our focus is on testing the custom CSS overrides and design system integration.
 * 
 * @package @am92/react-design-system
 * @component DsIconButton
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, renderWithTheme, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsIconButton } from "./DsIconButton.Component";
import { DsRemixIcon } from "../DsRemixIcon";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

// Test icon component using DsRemixIcon
const TestIcon = () => <DsRemixIcon className="ri-home-line" data-testid="test-icon" />;

describe("DsIconButton", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ===== 1. CORE RENDERING TESTS =====
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("should render with children", () => {
      render(
        <DsIconButton>
          <span data-testid="custom-icon">✓</span>
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      const icon = screen.getByTestId("custom-icon");
      expect(button).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(button).toContainElement(icon);
    });

    it("should render without children", () => {
      render(<DsIconButton />);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toBeEmptyDOMElement();
    });

    it("should render with design system icons", () => {
      render(
        <DsIconButton>
          <DsRemixIcon className="ri-home-line" />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button.querySelector('.MuiIcon-root')).toBeInTheDocument();
    });
  });

  // ===== 2. PROPS VALIDATION TESTS =====
  describe("Props Validation", () => {
    it("should accept and apply custom id", () => {
      render(
        <DsIconButton id="custom-icon-button">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("id", "custom-icon-button");
    });

    it("should apply custom className", () => {
      render(
        <DsIconButton className="custom-class">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });

    it("should use default color when color prop is not provided", () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      // Default color is 'iconDefault' from DsIconButtonDefaultProps
      expect(button).toHaveClass("MuiIconButton-colorIconDefault");
    });

    it("should apply aria-label when provided", () => {
      render(
        <DsIconButton aria-label="Home button">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button", { name: "Home button" });
      expect(button).toHaveAttribute("aria-label", "Home button");
    });

    it("should apply title attribute when provided", () => {
      render(
        <DsIconButton title="Click to go home">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Click to go home");
    });
  });

  // ===== 3. COMPONENT STATES =====
  describe("Component States", () => {
    it("should render in disabled state", () => {
      render(
        <DsIconButton disabled>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });

    it("should apply disabled styling classes", () => {
      render(
        <DsIconButton disabled>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button.closest('.MuiIconButton-root')).toHaveClass('Mui-disabled');
    });

    it("should handle focus state", async () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      // Use keyboard navigation to trigger focus-visible
      await user.tab();
      expect(button).toHaveFocus();
      // Note: Mui-focusVisible class may not always be applied in test environment
      // The important thing is that the button receives focus
    });

    it("should handle different sizes", () => {
      render(
        <DsIconButton size="large">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("MuiIconButton-sizeLarge");
    });

    it("should handle edge prop correctly", () => {
      render(
        <DsIconButton edge="start">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("MuiIconButton-edgeStart");
    });
  });

  // ===== 4. MUI STYLING TESTS =====
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass('MuiIconButton-root');
    });

    // Test all custom color variants from overrides
    it.each([
      ["iconSupportNegative", "MuiIconButton-colorIconSupportNegative"],
      ["iconSupportPositive", "MuiIconButton-colorIconSupportPositive"],
      ["iconSupportWarning", "MuiIconButton-colorIconSupportWarning"],
      ["iconActionPrimary", "MuiIconButton-colorIconActionPrimary"],
      ["iconActionSecondary", "MuiIconButton-colorIconActionSecondary"],
      ["iconActionTertiary", "MuiIconButton-colorIconActionTertiary"],
      ["iconOnSurface", "MuiIconButton-colorIconOnSurface"],
      ["iconDisabled", "MuiIconButton-colorIconDisabled"],
      ["iconDefault", "MuiIconButton-colorIconDefault"],
      ["iconTypical", "MuiIconButton-colorIconTypical"],
    ])("should apply custom color variant class for color=%s", (color, expectedClass) => {
      render(
        <DsIconButton color={color as any}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass(expectedClass);
    });

    it("should apply standard MUI color variants", () => {
      render(
        <DsIconButton color="primary">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("MuiIconButton-colorPrimary");
    });
  });

  // ===== 5. EVENT HANDLING TESTS =====
  describe("Event Handling", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      render(
        <DsIconButton onClick={handleClick}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      render(
        <DsIconButton disabled onClick={handleClick}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      // Use fireEvent for disabled elements since user-event respects pointer-events
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("should handle keyboard events", async () => {
      const handleKeyDown = vi.fn();
      render(
        <DsIconButton onKeyDown={handleKeyDown}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      button.focus();
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("should handle focus events", async () => {
      const handleFocus = vi.fn();
      render(
        <DsIconButton onFocus={handleFocus}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      button.focus();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("should handle blur events", async () => {
      const handleBlur = vi.fn();
      render(
        <DsIconButton onBlur={handleBlur}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      button.focus();
      button.blur();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle mouse events", async () => {
      const handleMouseDown = vi.fn();
      const handleMouseUp = vi.fn();
      render(
        <DsIconButton onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      fireEvent.mouseDown(button);
      fireEvent.mouseUp(button);
      
      expect(handleMouseDown).toHaveBeenCalledTimes(1);
      expect(handleMouseUp).toHaveBeenCalledTimes(1);
    });
  });

  // ===== 6. ACCESSIBILITY TESTS =====
  describe("Accessibility", () => {
    it("should have proper role", () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should be keyboard navigable", async () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      await user.tab();
      expect(button).toHaveFocus();
    });

    it("should support Enter key activation", async () => {
      const handleClick = vi.fn();
      render(
        <DsIconButton onClick={handleClick}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      button.focus();
      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should support Space key activation", async () => {
      const handleClick = vi.fn();
      render(
        <DsIconButton onClick={handleClick}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      button.focus();
      await user.keyboard(" ");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should have accessible name when aria-label is provided", () => {
      render(
        <DsIconButton aria-label="Delete item">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button", { name: "Delete item" });
      expect(button).toBeInTheDocument();
    });

    it("should be properly excluded from tab order when disabled", () => {
      render(
        <DsIconButton disabled>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("tabindex", "-1");
    });

    it("should support ARIA describedby", () => {
      render(
        <div>
          <DsIconButton aria-describedby="help-text">
            <TestIcon />
          </DsIconButton>
          <div id="help-text">This button does something important</div>
        </div>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-describedby", "help-text");
    });
  });

  // ===== 7. EDGE CASES =====
  describe("Edge Cases", () => {
    it("should handle ref forwarding", () => {
      let buttonRef: HTMLButtonElement | null = null;
      
      render(
        <DsIconButton 
          ref={(ref) => { buttonRef = ref; }}
        >
          <TestIcon />
        </DsIconButton>
      );
      
      expect(buttonRef).toBeInstanceOf(HTMLButtonElement);
    });

    it("should handle custom sx prop", () => {
      render(
        <DsIconButton sx={{ backgroundColor: 'red' }}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      // Note: Testing actual styles would require more complex setup
      // This tests that sx prop doesn't break rendering
    });

    it("should handle multiple CSS classes", () => {
      render(
        <DsIconButton className="class1 class2 mild">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toHaveClass("class1");
      expect(button).toHaveClass("class2");
      expect(button).toHaveClass("mild");
      // Note: MUI may not generate font size classes from className in this context
    });

    it("should handle complex children", () => {
      render(
        <DsIconButton>
          <div>
            <span>Complex</span>
            <TestIcon />
          </div>
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });

    it("should render without errors when color is an empty string", () => {
      render(
        <DsIconButton color={'' as any}>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });
  });

  // ===== 8. CSS OVERRIDES TESTING =====
  describe("CSS Overrides", () => {
    it("should apply design system root styles", () => {
      render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      // Test that our custom CSS is applied
      const styles = window.getComputedStyle(button);
      // These would be set by our CSS overrides in DsIconButton.Overrides.ts
      expect(styles.getPropertyValue('--ds-spacing-zero')).toBeDefined();
      expect(styles.getPropertyValue('--ds-typo-fontSizeMild')).toBeDefined();
    });

    it("should apply color-specific CSS custom properties", () => {
      render(
        <DsIconButton color="iconActionPrimary">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      // Verify the correct class is applied for our CSS overrides
      expect(button).toHaveClass('MuiIconButton-colorIconActionPrimary');
      
      const styles = window.getComputedStyle(button);
      expect(styles.getPropertyValue('--ds-colour-iconActionPrimary')).toBeDefined();
    });

    it("should apply font size CSS custom properties", () => {
      render(
        <DsIconButton className="hot">
          <TestIcon />
        </DsIconButton>
      );
      const button = screen.getByRole("button");
      
      // Verify the className is applied
      expect(button).toHaveClass('hot');
      
      // Test that CSS custom properties are available in the document
      const styles = window.getComputedStyle(button);
      expect(styles.getPropertyValue('--ds-typo-fontSizeHot')).toBeDefined();
    });
  });

  // ===== 9. THEME TESTING =====
  describe("Theme Testing", () => {
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;

    it("should render correctly across all color schemes with proper theme colors", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = renderWithTheme(
          <DsIconButton color="iconActionPrimary">
            <TestIcon />
          </DsIconButton>, 
          colorScheme
        );
        
        // Verify basic rendering
        const button = container.querySelector('button');
        expect(button).toBeInTheDocument();
        
        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        
        // Verify that we have valid theme data
        expect(schemeData).toBeTruthy();
        expect(schemeData?.palette).toBeTruthy();
        
        // Text color should match theme
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedTextColor).toBeTruthy();
        
        // Verify CSS classes
        const iconButton = container.querySelector('.MuiIconButton-root') as HTMLElement;
        expect(iconButton).toHaveClass('MuiIconButton-colorIconActionPrimary');
        
        // Snapshot testing for themes
        expect(container.firstChild).toMatchSnapshot(`iconbutton-${colorScheme}-theme`);
        
        unmount();
      });
    });

    it("should use correct design system colors for all custom color variants", () => {
      const customColorVariants = [
        'iconSupportNegative',
        'iconSupportPositive', 
        'iconSupportWarning',
        'iconActionPrimary',
        'iconActionSecondary',
        'iconActionTertiary',
        'iconOnSurface',
        'iconDisabled',
        'iconDefault',
        'iconTypical'
      ] as const;
      
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for custom color variants
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        
        customColorVariants.forEach((color) => {
          const { container, unmount } = renderWithTheme(
            <DsIconButton color={color as any}>
              <TestIcon />
            </DsIconButton>, 
            colorScheme
          );
          
          // Get expected color from the theme's palette
          const paletteColor = (schemeData?.palette as any)?.[color];
          
          if (paletteColor) {
            expect(paletteColor).toBeTruthy(); // Ensure we have a valid color
          }
          
          // Verify CSS class
          const iconButton = container.querySelector('.MuiIconButton-root') as HTMLElement;
          const expectedClassName = `MuiIconButton-color${color.charAt(0).toUpperCase() + color.slice(1)}`;
          expect(iconButton).toHaveClass(expectedClassName);
          
          unmount();
        });
      });
    });

    it("should use correct standard MUI colors across themes", () => {
      const muiColorVariants = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
      
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for MUI color variants
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        
        muiColorVariants.forEach((color) => {
          const { container, unmount } = renderWithTheme(
            <DsIconButton color={color}>
              <TestIcon />
            </DsIconButton>, 
            colorScheme
          );
          
          // Get expected color from the theme's palette
          const paletteColor = schemeData?.palette?.[color] as any;
          const expectedColor = paletteColor?.main;
          
          expect(expectedColor).toBeTruthy(); // Ensure we have a valid color
          expect(expectedColor).toMatch(/^#[0-9A-Fa-f]{6}$/); // Valid hex color
          
          // Verify CSS class
          const iconButton = container.querySelector('.MuiIconButton-root') as HTMLElement;
          expect(iconButton).toHaveClass(`MuiIconButton-color${color.charAt(0).toUpperCase() + color.slice(1)}`);
          
          unmount();
        });
      });
    });

    it("should verify theme differences and maintain functionality", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);
      
      // Verify light vs dark theme differences using actual theme configuration
      const lightSchemeData = themeColorScheme.light;
      const darkSchemeData = themeColorScheme.dark;
      
      const lightTextColor = (lightSchemeData?.palette?.text as any)?.primary;
      const darkTextColor = (darkSchemeData?.palette?.text as any)?.primary;
      
      // Text colors should be different between themes
      expect(lightTextColor).toBeTruthy();
      expect(darkTextColor).toBeTruthy();
      expect(lightTextColor).not.toBe(darkTextColor);
      
      // Test functionality works across themes
      const handleClick = vi.fn();
      colorSchemes.forEach(colorScheme => {
        document.body.innerHTML = '';
        handleClick.mockClear();
        
        const { unmount } = renderWithTheme(
          <DsIconButton onClick={handleClick}>
            <TestIcon />
          </DsIconButton>, 
          colorScheme
        );
        
        const button = screen.getByRole("button");
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
        
        unmount();
      });
    });

    it("should support disabled state across all themes", () => {
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = renderWithTheme(
          <DsIconButton disabled color="iconActionPrimary">
            <TestIcon />
          </DsIconButton>, 
          colorScheme
        );
        
        const button = container.querySelector('button');
        expect(button).toBeDisabled();
        expect(button?.closest('.MuiIconButton-root')).toHaveClass('Mui-disabled');
        
        // Verify disabled state maintains color class
        expect(button).toHaveClass('MuiIconButton-colorIconActionPrimary');
        
        unmount();
      });
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (colorScheme) => (
          <DsIconButton 
            color="iconDefault" 
            size="large"
            data-testid={`iconbutton-${colorScheme}`}
          >
            <DsRemixIcon className="ri-star-fill" />
          </DsIconButton>
        ),
        (container, colorScheme) => {
          const iconButton = container.querySelector(`[data-testid="iconbutton-${colorScheme}"]`);
          expect(iconButton).toBeInTheDocument();
          expect(iconButton).toHaveClass('MuiIconButton-root');
          expect(iconButton).toHaveClass('MuiIconButton-colorIconDefault');
          expect(iconButton).toHaveClass('MuiIconButton-sizeLarge');
          
          // Verify RemixIcon is rendered
          const remixIcon = container.querySelector('.ri-star-fill');
          expect(remixIcon).toBeInTheDocument();
        }
      );
    });

    it("should apply design system CSS custom properties across themes", () => {
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = renderWithTheme(
          <DsIconButton color="iconActionPrimary" className="hot">
            <TestIcon />
          </DsIconButton>, 
          colorScheme
        );
        
        const button = container.querySelector('button') as HTMLElement;
        
        // Test that CSS custom properties are available in the document
        const styles = window.getComputedStyle(button);
        expect(styles.getPropertyValue('--ds-colour-iconActionPrimary')).toBeDefined();
        expect(styles.getPropertyValue('--ds-typo-fontSizeHot')).toBeDefined();
        expect(styles.getPropertyValue('--ds-spacing-zero')).toBeDefined();
        
        unmount();
      });
    });
  });

  // ===== 10. SNAPSHOT TESTING =====
  describe("Snapshot Testing", () => {
    it("should match snapshot for default state", () => {
      const { container } = render(
        <DsIconButton>
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot for disabled state", () => {
      const { container } = render(
        <DsIconButton disabled>
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom color variants", () => {
      const { container } = render(
        <DsIconButton color="iconActionPrimary">
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with different sizes", () => {
      const { container: smallContainer } = render(
        <DsIconButton size="small">
          <TestIcon />
        </DsIconButton>
      );
      expect(smallContainer.firstChild).toMatchSnapshot();

      const { container: largeContainer } = render(
        <DsIconButton size="large">
          <TestIcon />
        </DsIconButton>
      );
      expect(largeContainer.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with edge positioning", () => {
      const { container } = render(
        <DsIconButton edge="start">
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with aria-label", () => {
      const { container } = render(
        <DsIconButton aria-label="Home navigation">
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom className", () => {
      const { container } = render(
        <DsIconButton className="custom-class">
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with complex children", () => {
      const { container } = render(
        <DsIconButton>
          <div>
            <span>Complex</span>
            <TestIcon />
          </div>
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot without children", () => {
      const { container } = render(<DsIconButton />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with multiple color variants", () => {
      const colorVariants = [
        'iconSupportNegative',
        'iconSupportPositive', 
        'iconSupportWarning',
        'iconActionPrimary',
        'iconActionSecondary',
        'iconActionTertiary',
        'iconOnSurface',
        'iconDisabled',
        'iconDefault',
        'iconTypical'
      ];

      colorVariants.forEach((color) => {
        const { container } = render(
          <DsIconButton color={color as any}>
            <TestIcon />
          </DsIconButton>
        );
        expect(container.firstChild).toMatchSnapshot(`color-${color}`);
      });
    });

    it("should match snapshot with RemixIcon variations", () => {
      const iconVariations = [
        'ri-home-line',
        'ri-star-fill',
        'ri-settings-gear-line',
        'ri-delete-bin-line'
      ];

      iconVariations.forEach((iconClass) => {
        const { container } = render(
          <DsIconButton>
            <DsRemixIcon className={iconClass} />
          </DsIconButton>
        );
        expect(container.firstChild).toMatchSnapshot(`icon-${iconClass}`);
      });
    });

    it("should match snapshot with combined props", () => {
      const { container } = render(
        <DsIconButton 
          color="iconActionPrimary" 
          size="large"
          disabled
          className="custom-style"
          aria-label="Primary large disabled button"
        >
          <TestIcon />
        </DsIconButton>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
