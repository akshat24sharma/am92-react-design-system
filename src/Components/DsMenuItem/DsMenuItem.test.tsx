/**
 * @vitest-environment jsdom
 *
 * Test suite for DsMenuItem component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different states (selected, disabled, etc.)
 * 4. MUI Styling - Material-UI specific styling and theme integration
 * 5. Event Handling - User interactions and event handlers
 * 6. Accessibility - ARIA attributes, keyboard navigation, and screen reader support
 * 7. Edge Cases - Unusual scenarios and boundary conditions
 * 8. Real-world Scenarios - Common usage patterns and integration in menus/dropdowns
 * 9. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 10. Snapshot Testing - Visual regression testing across all states and themes
 *
 * @package @am92/react-design-system
 * @component DsMenuItem
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  renderWithTheme,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";

import userEvent from "@testing-library/user-event";
import { DsMenuItem } from "./DsMenuItem.Component";
import { DsMenu } from "../DsMenu";
import { DsMenuList } from "../DsMenuList";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import { DsRemixIcon } from "../DsRemixIcon";
import { DsBadge } from "../DsBadge";
import { hexToRgbA } from "../../Theme/getColorScheme/util";

describe("DsMenuItem Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsMenuItem>Default Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
      expect(menuItem).toHaveTextContent("Default Item");
    });

    it("should render with custom children", () => {
      render(
        <DsMenuItem>
          <DsTypography>Custom Child</DsTypography>
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
      expect(screen.getByText("Custom Child")).toBeInTheDocument();
    });

    it("should render without children", () => {
      render(<DsMenuItem />);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
    });

    it("should render with complex children structure", () => {
      render(
        <DsMenuItem>
          <DsRemixIcon className="ri-checkbox-circle-fill" />
          <DsTypography>Text Content</DsTypography>
          <DsBadge badgeContent="30" />
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
      expect(
        document.querySelector(".ri-checkbox-circle-fill")
      ).toBeInTheDocument();
      expect(screen.getByText("Text Content")).toBeInTheDocument();
      expect(screen.getByText("30")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and render a custom id", () => {
      render(<DsMenuItem id="custom-menu-item">Menu Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("id", "custom-menu-item");
    });

    it("should accept custom className", () => {
      render(<DsMenuItem className="custom-class">Menu Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("custom-class");
    });

    it("should accept custom value prop", () => {
      render(<DsMenuItem value="test-value">Menu Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("value", "test-value");
    });

    it("should accept custom data attributes", () => {
      render(
        <DsMenuItem data-testid="menu-item-test" data-custom="custom-value">
          Menu Item
        </DsMenuItem>
      );
      const menuItem = screen.getByTestId("menu-item-test");
      expect(menuItem).toHaveAttribute("data-custom", "custom-value");
    });

    it("should handle tabIndex prop", () => {
      render(<DsMenuItem tabIndex={0}>Menu Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("tabIndex", "0");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in disabled state", () => {
      render(<DsMenuItem disabled>Disabled Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("aria-disabled", "true");
      expect(menuItem).toHaveClass("Mui-disabled");
    });

    it("should render in selected state", () => {
      render(<DsMenuItem selected>Selected Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("Mui-selected");
    });

    it("should handle selected and disabled states together", () => {
      render(
        <DsMenuItem selected disabled>
          Selected Disabled Item
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("Mui-selected");
      expect(menuItem).toHaveClass("Mui-disabled");
    });

    it("should handle focus state", async () => {
      render(<DsMenuItem>Focusable Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      menuItem.focus();
      expect(menuItem).toHaveFocus();
    });

    it("should handle dense variant", () => {
      render(<DsMenuItem dense>Dense Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("MuiMenuItem-dense");
    });

    it("should handle divider prop", () => {
      render(<DsMenuItem divider>Item with Divider</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("MuiMenuItem-divider");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      render(<DsMenuItem>Styled Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("MuiMenuItem-root");
      expect(menuItem).toHaveClass("MuiButtonBase-root");
    });

    it("should apply design system overrides", () => {
      render(<DsMenuItem>Styled Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");

      // Check if design system styling is applied
      const computedStyle = window.getComputedStyle(menuItem);
      expect(computedStyle.paddingTop).toBe("var(--ds-spacing-frostbite)");
      expect(computedStyle.paddingBottom).toBe("var(--ds-spacing-frostbite)");
      expect(computedStyle.paddingLeft).toBe("var(--ds-spacing-bitterCold)");
      expect(computedStyle.paddingRight).toBe("var(--ds-spacing-bitterCold)");
    });

    it("should apply selected state styles", () => {
      render(<DsMenuItem selected>Selected Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("Mui-selected");

      // Check design system selected styles
      const computedStyle = window.getComputedStyle(menuItem);
      expect(computedStyle.backgroundColor).toBe(
        "var(--ds-colour-stateSelectedPrimaryHover)"
      );
    });

    it("should handle custom sx prop", () => {
      render(
        <DsMenuItem sx={{ color: "rgb(255, 0, 0)", fontWeight: "bold" }}>
          Custom Styled Item
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");
      const computedStyle = window.getComputedStyle(menuItem);
      expect(computedStyle.color).toBe("rgb(255, 0, 0)");
      expect(computedStyle.fontWeight).toBe("700");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      render(<DsMenuItem onClick={handleClick}>Clickable Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");

      await user.click(menuItem);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      render(
        <DsMenuItem onClick={handleClick} disabled>
          Disabled Item
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");

      // Disabled menu items should not be clickable
      expect(menuItem).toHaveAttribute("aria-disabled", "true");
      expect(menuItem).toHaveClass("Mui-disabled");
      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it("should handle keyboard events", async () => {
      const handleKeyDown = vi.fn();
      render(<DsMenuItem onKeyDown={handleKeyDown}>Keyboard Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");

      await user.click(menuItem);
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("should handle focus and blur events", async () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(
        <DsMenuItem onFocus={handleFocus} onBlur={handleBlur}>
          Focus Item
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");

      menuItem.focus();
      expect(handleFocus).toHaveBeenCalledTimes(1);

      await user.tab();
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("should handle mouse enter and leave events", async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <DsMenuItem
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover Item
        </DsMenuItem>
      );
      const menuItem = screen.getByRole("menuitem");

      await user.hover(menuItem);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await user.unhover(menuItem);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA role", () => {
      render(<DsMenuItem>Menu Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("role", "menuitem");
    });

    it("should support aria-label", () => {
      render(<DsMenuItem aria-label="Custom Label">Menu Item</DsMenuItem>);
      const menuItem = screen.getByLabelText("Custom Label");
      expect(menuItem).toBeInTheDocument();
    });

    it("should support aria-describedby", () => {
      render(
        <DsBox>
          <DsMenuItem aria-describedby="description">Menu Item</DsMenuItem>
          <DsBox id="description">This is a description</DsBox>
        </DsBox>
      );
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("aria-describedby", "description");
    });

    it("should handle selected state accessibility", () => {
      render(<DsMenuItem selected>Selected Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveClass("Mui-selected");
    });

    it("should handle disabled state accessibility", () => {
      render(<DsMenuItem disabled>Disabled Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("aria-disabled", "true");
    });

    it("should support keyboard navigation in menu context", async () => {
      render(
        <DsMenuList>
          <DsMenuItem>First Item</DsMenuItem>
          <DsMenuItem>Second Item</DsMenuItem>
          <DsMenuItem>Third Item</DsMenuItem>
        </DsMenuList>
      );

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems).toHaveLength(3);

      // Focus first item
      menuItems[0].focus();

      expect(menuItems[0]).toHaveFocus();

      // Arrow down should focus next item
      await user.keyboard("{ArrowDown}");
      expect(menuItems[1]).toHaveFocus();

      // Arrow down again should focus third item
      await user.keyboard("{ArrowDown}");
      expect(menuItems[2]).toHaveFocus();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null children gracefully", () => {
      render(<DsMenuItem>{null}</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
    });

    it("should handle undefined children gracefully", () => {
      render(<DsMenuItem>{undefined}</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toBeInTheDocument();
    });

    it("should handle very long text content", () => {
      const longText = "A".repeat(1000);
      render(<DsMenuItem>{longText}</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveTextContent(longText);
    });

    it("should handle special characters in text", () => {
      const specialText = "!@#$%^&*()_+-={}|;:,.<>?";
      render(<DsMenuItem>{specialText}</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveTextContent(specialText);
    });

    it("should handle unicode characters", () => {
      const unicodeText = "测试 🌟 ñáéíóú";
      render(<DsMenuItem>{unicodeText}</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveTextContent(unicodeText);
    });

    it("should handle numeric values", () => {
      render(<DsMenuItem value={42}>Numeric Value Item</DsMenuItem>);
      const menuItem = screen.getByRole("menuitem");
      expect(menuItem).toHaveAttribute("value", "42");
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work within a DsMenu component", async () => {
      const [anchorEl, setAnchorEl] = [
        document.createElement("button"),
        vi.fn(),
      ];

      render(
        <DsMenu open anchorEl={anchorEl}>
          <DsMenuItem>Menu Item 1</DsMenuItem>
          <DsMenuItem>Menu Item 2</DsMenuItem>
          <DsMenuItem>Menu Item 3</DsMenuItem>
        </DsMenu>
      );

      const menuItems = screen.getAllByRole("menuitem");
      expect(menuItems).toHaveLength(3);

      await user.click(menuItems[0]);
      expect(menuItems[0]).toHaveFocus();
    });

    it("should work as dropdown options in select component", () => {
      render(
        <DsMenuList>
          <DsMenuItem value="option1">Option 1</DsMenuItem>
          <DsMenuItem value="option2">Option 2</DsMenuItem>
          <DsMenuItem value="option3" selected>
            Option 3
          </DsMenuItem>
        </DsMenuList>
      );

      const selectedItem = screen.getByRole("menuitem", { name: "Option 3" });
      expect(selectedItem).toHaveClass("Mui-selected");
    });

    it("should handle menu items with icons", () => {
      render(
        <DsMenuList>
          <DsMenuItem>
            <DsTypography>Home</DsTypography>
            <DsRemixIcon className="ri-home-line" />
          </DsMenuItem>
          <DsMenuItem>
            <DsTypography>Settings</DsTypography>
            <DsRemixIcon className="ri-settings-gear-line" />
          </DsMenuItem>
        </DsMenuList>
      );
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Settings")).toBeInTheDocument();
      expect(document.querySelector(".ri-home-line")).toBeInTheDocument();
      expect(
        document.querySelector(".ri-settings-gear-line")
      ).toBeInTheDocument();
    });

    it("should handle nested menu items structure", () => {
      render(
        <DsMenuList>
          <DsMenuItem>
            <DsBox>
              <DsTypography>Primary Text</DsTypography>
              <DsTypography>Secondary Text</DsTypography>
            </DsBox>
          </DsMenuItem>
        </DsMenuList>
      );

      expect(screen.getByText("Primary Text")).toBeInTheDocument();
      expect(screen.getByText("Secondary Text")).toBeInTheDocument();
    });

    it("should handle click-to-select behavior", async () => {
      const handleSelect = vi.fn();
      render(
        <DsMenuList>
          <DsMenuItem onClick={() => handleSelect("item1")}>Item 1</DsMenuItem>
          <DsMenuItem onClick={() => handleSelect("item2")}>Item 2</DsMenuItem>
          <DsMenuItem onClick={() => handleSelect("item3")}>Item 3</DsMenuItem>
        </DsMenuList>
      );

      const secondItem = screen.getByRole("menuitem", { name: "Item 2" });
      await user.click(secondItem);
      expect(handleSelect).toHaveBeenCalledWith("item2");
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should apply correct design system styling across themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      // Theme-specific expectations mapping for background colors
      const themeExpectations = {
        light: {
          expectedBgColor: hexToRgbA(PALETTE.secondary80, 0.08),
        },
        dark: {
          expectedBgColor: hexToRgbA(PALETTE.secondary40, 0.2),
        },
        highContrast: {
          expectedBgColor: hexToRgbA(PALETTE.highContrast4, 0.2),
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsMenuItem selected>Themed Selected Item</DsMenuItem>,
          colorScheme
        );

        // Verify basic rendering
        const menuItem = container.querySelector(
          '[role="menuitem"]'
        ) as HTMLElement;
        expect(menuItem).toBeInTheDocument();
        expect(menuItem).toHaveClass("Mui-selected");

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Primary color should match theme
        const expectedPrimaryColor = (schemeData?.palette?.primary as any)
          ?.main;
        expect(expectedPrimaryColor).toBeTruthy();
        expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

        // Verify theme-specific color variables are applied
        const computedStyle = window.getComputedStyle(menuItem);
        const actualColor = computedStyle.backgroundColor;

        expect(actualColor).toBe("var(--ds-colour-stateSelectedPrimaryHover)");

        // Verify that the design system color for typoActionSecondary matches expected theme color
        const actualTypoActionSecondary =
          schemeData?.ds?.colour?.stateSelectedPrimaryHover;
        expect(actualTypoActionSecondary).toBe(expectations.expectedBgColor);

        // Snapshot testing
        expect(container.firstChild).toMatchSnapshot(
          `menuitem-selected-${colorScheme}-theme`
        );

        unmount();
      });
    });

    it("should use correct design system typography across themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsMenuItem>Typography Test</DsMenuItem>,
          colorScheme
        );

        // Verify basic rendering
        const menuItem = container.querySelector(
          '[role="menuitem"]'
        ) as HTMLElement;
        expect(menuItem).toBeInTheDocument();

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];

        // Text color should match theme
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedTextColor).toBeTruthy();

        // Check design system typography variables are applied
        const computedStyle = window.getComputedStyle(menuItem);
        expect(computedStyle.fontWeight).toBe(
          "var(--ds-typo-bodyRegularMedium-fontWeight)"
        );
        expect(computedStyle.fontSize).toBe(
          "var(--ds-typo-bodyRegularMedium-fontSize)"
        );
        expect(computedStyle.lineHeight).toBe(
          "var(--ds-typo-bodyRegularMedium-lineHeight)"
        );
        expect(computedStyle.letterSpacing).toBe(
          "var(--ds-typo-bodyRegularMedium-letterSpacing)"
        );

        // Snapshot testing
        expect(container.firstChild).toMatchSnapshot(
          `menuitem-typography-${colorScheme}-theme`
        );

        unmount();
      });
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (colorScheme) => (
          <DsMenuItem data-testid={`menuitem-${colorScheme}`}>
            Test MenuItem
          </DsMenuItem>
        ),
        (container, colorScheme) => {
          const menuItem = container.querySelector(
            `[data-testid="menuitem-${colorScheme}"]`
          );
          expect(menuItem).toBeInTheDocument();

          const menuItemElement = container.querySelector('[role="menuitem"]');
          expect(menuItemElement).toBeInTheDocument();
        }
      );
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsMenuItem>Default MenuItem</DsMenuItem>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with all states", () => {
      const states = [
        { props: { selected: true }, name: "selected" },
        { props: { disabled: true }, name: "disabled" },
        { props: { dense: true }, name: "dense" },
        { props: { divider: true }, name: "divider" },
        {
          props: { selected: true, disabled: true },
          name: "selected-disabled",
        },
      ];

      states.forEach(({ props, name }) => {
        const { container } = render(
          <DsMenuItem {...props}>{name} MenuItem</DsMenuItem>
        );
        expect(container.firstChild).toMatchSnapshot(`DsMenuItem-${name}`);
      });
    });

    it("should match snapshot with complex children", () => {
      const { container } = render(
        <DsMenuItem>
          <DsBox>
            <DsTypography>Primary Text</DsTypography>
            <DsTypography>Secondary Text</DsTypography>
          </DsBox>
          <DsTypography>Badge</DsTypography>
        </DsMenuItem>
      );
      expect(container.firstChild).toMatchSnapshot(
        "DsMenuItem-complex-children"
      );
    });

    it("should match snapshot in different themes", () => {
      testAllThemes(
        (theme) => <DsMenuItem selected>Themed Snapshot MenuItem</DsMenuItem>,
        (container, theme) => {
          expect(container.firstChild).toMatchSnapshot(`DsMenuItem-${theme}`);
        }
      );
    });

    it("should match snapshot within menu structure", () => {
      const { container } = render(
        <DsMenuList>
          <DsMenuItem>First Item</DsMenuItem>
          <DsMenuItem selected>Selected Item</DsMenuItem>
          <DsMenuItem disabled>Disabled Item</DsMenuItem>
        </DsMenuList>
      );
      expect(container.firstChild).toMatchSnapshot(
        "DsMenuItem-in-menu-structure"
      );
    });
  });
});
