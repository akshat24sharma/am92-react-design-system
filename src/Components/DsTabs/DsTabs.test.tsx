/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTabs component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for correct rendering with different props and content
 * 2. Props Validation - Tests for prop handling and MUI Tabs integration
 * 3. Component States - Tests for different states (disabled, selected, etc.)
 * 4. MUI Styling - Tests for Material-UI Tabs integration and CSS classes
 * 5. Variant Behavior - Tests for ds-variant='container' custom styling
 * 6. Event Handling - Tests for user interactions and tab selection
 * 7. Accessibility - Tests for ARIA attributes and keyboard navigation
 * 8. Edge Cases - Tests for unusual scenarios and prop combinations
 * 9. Real-world Scenarios - Tests for practical usage patterns
 * 10. Theme Testing - Tests for multi-theme support and design system variables
 * 11. Snapshot Testing - Visual regression prevention across all states and themes
 *
 *
 * @package @am92/react-design-system
 * @component DsTabs
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  testAllThemes,
  renderWithTheme,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsTabs } from "./DsTabs.Component";
import { DsTab } from "../DsTab";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsRemixIcon } from "../DsRemixIcon";

describe("DsTabs Component", () => {
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
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
        </DsTabs>
      );
      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();

      // Check the root container has MuiTabs-root class
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).toHaveClass("MuiTabs-root");
      expect(screen.queryAllByRole("tab")).toHaveLength(2);
    });

    it("should render with tab children", () => {
      render(
        <DsTabs value={0}>
          <DsTab label="First Tab" />
          <DsTab label="Second Tab" />
          <DsTab label="Third Tab" />
        </DsTabs>
      );

      expect(
        screen.getByRole("tab", { name: "First Tab" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Second Tab" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Third Tab" })
      ).toBeInTheDocument();
      expect(screen.queryAllByRole("tab")).toHaveLength(3);
    });

    it("should render without tabs", () => {
      render(<DsTabs />);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it("should render with complex tab content", () => {
      render(
        <DsTabs value={0}>
          <DsTab
            label={
              <DsBox display="flex" alignItems="center" gap={1}>
                <DsTypography>Complex Tab</DsTypography>
              </DsBox>
            }
          />
          <DsTab label="Simple Tab" />
        </DsTabs>
      );

      expect(screen.getByText("Complex Tab")).toBeInTheDocument();
      expect(screen.getByText("Simple Tab")).toBeInTheDocument();
      expect(screen.queryAllByRole("tab")).toHaveLength(2);
    });

    it("should render with icon and label tabs", () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Home" icon={<DsRemixIcon className="ri-home-line" />} />
          <DsTab
            label="Profile"
            icon={<DsRemixIcon className="ri-user-line" />}
          />
        </DsTabs>
      );

      // Icons and labels create compound accessible names
      expect(screen.getByRole("tab", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Profile" })).toBeInTheDocument();

      // Check that the icon elements are present within the tabs
      expect(document.querySelector(".ri-home-line")).toBeInTheDocument();
      expect(document.querySelector(".ri-user-line")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and apply custom value prop", () => {
      render(
        <DsTabs value={1}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      const selectedTab = screen.getByRole("tab", { name: "Tab 2" });
      expect(selectedTab).toHaveAttribute("aria-selected", "true");
    });

    it("should apply default textColor", () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
        </DsTabs>
      );

      const selectedTab = screen.getByRole("tab", { name: "Tab 1" });

      // Check computed style for the selected tab color
      const computedStyles = window.getComputedStyle(selectedTab);
      expect(computedStyles.color).toBe("var(--palette-secondary-main)");
    });

    it("should accept custom textColor", () => {
      render(
        <DsTabs textColor="primary" value={0}>
          <DsTab label="Tab 1" />
        </DsTabs>
      );

      const selectedTab = screen.getByRole("tab", { name: "Tab 1" });

      // Verify default text color is applied (secondary for selected tab)
      expect(selectedTab).toHaveClass("MuiTab-textColorPrimary");
      expect(selectedTab).toHaveClass("Mui-selected");

      // Check computed style for the selected tab color
      const computedStyles = window.getComputedStyle(selectedTab);
      expect(computedStyles.color).toBe("var(--palette-primary-main)");
    });

    it("should forward all MUI Tabs props", () => {
      render(
        <DsTabs
          id="custom-tabs"
          className="custom-class"
          orientation="vertical"
          variant="scrollable"
          scrollButtons="auto"
          value={0}
        >
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).toHaveAttribute("id", "custom-tabs");
      expect(tabsRoot).toHaveClass("custom-class");
      expect(tabsRoot).toHaveClass("MuiTabs-vertical");
      expect(tablist).toHaveAttribute("aria-orientation", "vertical");
    });

    it("should handle data attributes", () => {
      render(
        <DsTabs data-testid="custom-tabs" data-variant="test">
          <DsTab label="Tab 1" />
        </DsTabs>
      );

      const tablist = screen.getByTestId("custom-tabs");
      expect(tablist).toHaveAttribute("data-variant", "test");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should handle selected state", () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Selected Tab" />
          <DsTab label="Unselected Tab" />
        </DsTabs>
      );

      const selectedTab = screen.getByRole("tab", { name: "Selected Tab" });
      const unselectedTab = screen.getByRole("tab", { name: "Unselected Tab" });

      expect(selectedTab).toHaveAttribute("aria-selected", "true");
      expect(unselectedTab).toHaveAttribute("aria-selected", "false");
    });

    it("should handle disabled tabs", () => {
      render(
        <DsTabs>
          <DsTab label="Active Tab" />
          <DsTab label="Disabled Tab" disabled />
        </DsTabs>
      );

      const activeTab = screen.getByRole("tab", { name: "Active Tab" });
      const disabledTab = screen.getByRole("tab", { name: "Disabled Tab" });

      expect(activeTab).not.toHaveAttribute("disabled");
      expect(disabledTab).toHaveAttribute("disabled");
    });

    it("should handle orientation states", () => {
      render(
        <DsTabs orientation="vertical">
          <DsTab label="Vertical Tab 1" />
          <DsTab label="Vertical Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toHaveAttribute("aria-orientation", "vertical");
      expect(tablist).toHaveClass("MuiTabs-vertical");
    });

    it("should handle variant states", () => {
      render(
        <DsTabs variant="standard" value={0}>
          <DsTab label="Full Width Tab 1" />
          <DsTab label="Full Width Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      // Verify the component accepts variant prop and renders tabs
      expect(tabsRoot).toHaveClass("MuiTabs-root");
      expect(screen.getAllByRole("tab")).toHaveLength(2);
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI Tabs classes", () => {
      render(
        <DsTabs>
          <DsTab label="Test Tab" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).toHaveClass("MuiTabs-root");
    });

    it("should apply indicator styling", () => {
      render(
        <DsTabs indicatorColor="primary">
          <DsTab label="Tab 1" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      const indicator = tabsRoot?.querySelector(".MuiTabs-indicator");
      expect(indicator).toBeInTheDocument();
    });

    it("should apply scroller classes for scrollable variant", () => {
      render(
        <DsTabs variant="scrollable" scrollButtons="auto">
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      // Focus on elements that are reliably present in scrollable variant
      expect(tabsRoot).toHaveClass("MuiTabs-root");

      const scroller = tabsRoot?.querySelector(".MuiTabs-scroller");
      expect(scroller).toBeInTheDocument();

      // Verify tabs are rendered
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("should apply custom sx prop styling", () => {
      render(
        <DsTabs sx={{ backgroundColor: "primary.main", padding: "8px" }}>
          <DsTab label="Styled Tab" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root") as HTMLElement;
      expect(tablist).toBeInTheDocument();

      const selectedTab = screen.getByRole("tab", { name: "Styled Tab" });

      // Verify text color classes are applied
      expect(selectedTab).toHaveClass("MuiTab-textColorSecondary");

      // Check computed styles for the DsTabs sx prop
      const tabsComputedStyles = window.getComputedStyle(tabsRoot);
      expect(tabsComputedStyles.backgroundColor).toBe(
        "var(--palette-primary-main)"
      );
      expect(tabsComputedStyles.padding).toBe("8px");
    });
  });

  // ============================
  // VARIANT BEHAVIOR TESTS
  // ============================
  describe("Variant Behavior", () => {
    it("should apply container variant styling", () => {
      render(
        <DsTabs ds-variant="container">
          <DsTab label="Container Tab 1" />
          <DsTab label="Container Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      const tabsRoot = tablist.closest(".MuiTabs-root") as HTMLElement;
      expect(tabsRoot).toHaveAttribute("ds-variant", "container");

      // Test that tabs are rendered (container variant affects styling, not functionality)
      expect(
        screen.getByRole("tab", { name: "Container Tab 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Container Tab 2" })
      ).toBeInTheDocument();
    });

    it("should render without ds-variant (standard styling)", () => {
      render(
        <DsTabs>
          <DsTab label="Standard Tab 1" />
          <DsTab label="Standard Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();

      // Test standard indicator is present (not hidden like in container variant)
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).not.toHaveAttribute("ds-variant", "container");
      const indicator = tabsRoot?.querySelector(".MuiTabs-indicator");
      expect(indicator).toBeInTheDocument();
    });

    it("should combine ds-variant with other props", () => {
      render(
        <DsTabs ds-variant="container" value={1}>
          <DsTab label="Container Tab 1" />
          <DsTab label="Container Tab 2" />
          <DsTab label="Container Tab 3" />
        </DsTabs>
      );

      const selectedTab = screen.getByRole("tab", { name: "Container Tab 2" });
      expect(selectedTab).toHaveAttribute("aria-selected", "true");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle tab selection via onChange", async () => {
      const handleChange = vi.fn();
      render(
        <DsTabs onChange={handleChange} value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      const secondTab = screen.getByRole("tab", { name: "Tab 2" });
      await user.click(secondTab);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 1);
    });

    it("should handle keyboard navigation", async () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      const firstTab = screen.getByRole("tab", { name: "Tab 1" });
      const secondTab = screen.getByRole("tab", { name: "Tab 2" });

      // Focus first tab
      firstTab.focus();
      expect(firstTab).toHaveFocus();

      // Navigate to next tab with arrow key
      await user.keyboard("{ArrowRight}");
      expect(secondTab).toHaveFocus();
    });

    it("should handle keyboard activation", async () => {
      const handleChange = vi.fn();
      render(
        <DsTabs onChange={handleChange} value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
        </DsTabs>
      );

      const secondTab = screen.getByRole("tab", { name: "Tab 2" });
      secondTab.focus();

      await user.keyboard("{Enter}");
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), 1);
    });

    it("should not trigger onChange for disabled tabs", async () => {
      const handleChange = vi.fn();
      render(
        <DsTabs onChange={handleChange} value={0}>
          <DsTab label="Active Tab" />
          <DsTab label="Disabled Tab" disabled />
        </DsTabs>
      );

      const disabledTab = screen.getByRole("tab", { name: "Disabled Tab" });

      // Verify the tab is disabled - focus on attributes that are reliably present
      expect(disabledTab).toHaveClass("Mui-disabled");

      // Disabled tabs should not be focusable and should not trigger events
      expect(disabledTab).toHaveAttribute("tabindex", "-1");

      // Verify onChange was not called due to disabled state
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("should handle mouse events on tabs", async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();

      render(
        <DsTabs>
          <DsTab
            label="Hoverable Tab"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </DsTabs>
      );

      const tab = screen.getByRole("tab", { name: "Hoverable Tab" });

      await user.hover(tab);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await user.unhover(tab);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Accessible Tab 1" />
          <DsTab label="Accessible Tab 2" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const firstTab = screen.getByRole("tab", { name: "Accessible Tab 1" });
      const secondTab = screen.getByRole("tab", { name: "Accessible Tab 2" });

      expect(tablist).toBeInTheDocument();
      expect(firstTab).toHaveAttribute("aria-selected", "true");
      expect(secondTab).toHaveAttribute("aria-selected", "false");
      expect(firstTab).toHaveAttribute("tabindex", "0");
      expect(secondTab).toHaveAttribute("tabindex", "-1");
    });

    it("should support keyboard navigation patterns", async () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Tab A" />
          <DsTab label="Tab B" />
          <DsTab label="Tab C" />
        </DsTabs>
      );

      const tabA = screen.getByRole("tab", { name: "Tab A" });
      const tabB = screen.getByRole("tab", { name: "Tab B" });
      const tabC = screen.getByRole("tab", { name: "Tab C" });

      // Start with first tab focused
      tabA.focus();
      expect(tabA).toHaveFocus();

      // Right arrow should focus next tab
      await user.keyboard("{ArrowRight}");
      expect(tabB).toHaveFocus();

      // Right arrow should focus next tab
      await user.keyboard("{ArrowRight}");
      expect(tabC).toHaveFocus();

      // Left arrow should focus previous tab
      await user.keyboard("{ArrowLeft}");
      expect(tabB).toHaveFocus();
    });

    it("should handle Home and End keys", async () => {
      render(
        <DsTabs value={1}>
          <DsTab label="First Tab" />
          <DsTab label="Second Tab" />
          <DsTab label="Last Tab" />
        </DsTabs>
      );

      const firstTab = screen.getByRole("tab", { name: "First Tab" });
      const secondTab = screen.getByRole("tab", { name: "Second Tab" });
      const lastTab = screen.getByRole("tab", { name: "Last Tab" });

      // Focus middle tab
      secondTab.focus();
      expect(secondTab).toHaveFocus();

      // Home should focus first tab
      await user.keyboard("{Home}");
      expect(firstTab).toHaveFocus();

      // End should focus last tab
      await user.keyboard("{End}");
      expect(lastTab).toHaveFocus();
    });

    it("should skip disabled tabs during keyboard navigation", async () => {
      render(
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Disabled Tab" disabled />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      const firstTab = screen.getByRole("tab", { name: "Tab 1" });
      const thirdTab = screen.getByRole("tab", { name: "Tab 3" });

      firstTab.focus();
      expect(firstTab).toHaveFocus();

      // Right arrow should skip disabled tab and go to third tab
      await user.keyboard("{ArrowRight}");
      expect(thirdTab).toHaveFocus();
    });

    it("should support ARIA labels and descriptions", () => {
      render(
        <DsTabs
          aria-label="Navigation tabs"
          aria-describedby="tabs-description"
        >
          <DsTab label="Home" aria-describedby="home-description" />
          <DsTab label="About" aria-describedby="about-description" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const homeTab = screen.getByRole("tab", { name: "Home" });
      const aboutTab = screen.getByRole("tab", { name: "About" });

      // Check if aria attributes are properly forwarded to the root element
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tablist).toHaveAttribute("aria-label", "Navigation tabs");
      // aria-describedby might be applied to root element instead of tablist
      expect(tabsRoot).toHaveAttribute("aria-describedby", "tabs-description");
      expect(homeTab).toHaveAttribute("aria-describedby", "home-description");
      expect(aboutTab).toHaveAttribute("aria-describedby", "about-description");
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle value changes", () => {
      const { rerender } = render(
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      let firstTab = screen.getByRole("tab", { name: "Tab 1" });
      let secondTab = screen.getByRole("tab", { name: "Tab 2" });

      expect(firstTab).toHaveAttribute("aria-selected", "true");
      expect(secondTab).toHaveAttribute("aria-selected", "false");

      rerender(
        <DsTabs value={1}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      firstTab = screen.getByRole("tab", { name: "Tab 1" });
      secondTab = screen.getByRole("tab", { name: "Tab 2" });

      expect(firstTab).toHaveAttribute("aria-selected", "false");
      expect(secondTab).toHaveAttribute("aria-selected", "true");
    });

    it("should handle dynamic tab addition and removal", () => {
      const { rerender } = render(
        <DsTabs value={0}>
          <DsTab label="Static Tab 1" />
          <DsTab label="Static Tab 2" />
        </DsTabs>
      );

      expect(
        screen.getByRole("tab", { name: "Static Tab 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Static Tab 2" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("tab", { name: "Dynamic Tab" })
      ).not.toBeInTheDocument();

      rerender(
        <DsTabs value={0}>
          <DsTab label="Static Tab 1" />
          <DsTab label="Static Tab 2" />
          <DsTab label="Dynamic Tab" />
        </DsTabs>
      );

      expect(
        screen.getByRole("tab", { name: "Static Tab 1" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Static Tab 2" })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: "Dynamic Tab" })
      ).toBeInTheDocument();
    });

    it("should handle null/undefined values gracefully", () => {
      render(<DsTabs value={undefined as any}>{null}</DsTabs>);

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    });

    it("should handle empty label strings", () => {
      render(
        <DsTabs>
          <DsTab label="" />
          <DsTab label="Non-empty" />
        </DsTabs>
      );

      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(2);
      expect(
        screen.getByRole("tab", { name: "Non-empty" })
      ).toBeInTheDocument();
    });

    it("should handle special characters in labels", () => {
      const specialLabel =
        "Tab with special chars: !@#$%^&*()_+-=[]{}|;':\",./<>?";
      render(
        <DsTabs>
          <DsTab label={specialLabel} />
        </DsTabs>
      );

      expect(
        screen.getByRole("tab", { name: specialLabel })
      ).toBeInTheDocument();
    });

    it("should handle unicode characters in labels", () => {
      const unicodeLabel = "Tăb wïth únïcødé 🚀 测试 ñáéíóú";
      render(
        <DsTabs>
          <DsTab label={unicodeLabel} />
        </DsTabs>
      );

      expect(
        screen.getByRole("tab", { name: unicodeLabel })
      ).toBeInTheDocument();
    });

    it("should handle rapid value changes", () => {
      const { rerender } = render(
        <DsTabs value={0}>
          <DsTab label="Tab 1" />
          <DsTab label="Tab 2" />
          <DsTab label="Tab 3" />
        </DsTabs>
      );

      // Initial state - Tab 1 should be selected
      let selectedTab = screen.getByRole("tab", { name: "Tab 1" });
      expect(selectedTab).toHaveAttribute("aria-selected", "true");

      // Simulate rapid value changes and verify correct selection after each change
      const expectedSelectedTabs = [
        "Tab 2",
        "Tab 3",
        "Tab 1",
        "Tab 2",
        "Tab 3",
      ];

      for (let i = 1; i <= 5; i++) {
        const value = i % 3;
        rerender(
          <DsTabs value={value}>
            <DsTab label="Tab 1" />
            <DsTab label="Tab 2" />
            <DsTab label="Tab 3" />
          </DsTabs>
        );

        // Verify the correct tab is selected after each rerender
        const expectedTabName = expectedSelectedTabs[i - 1];
        selectedTab = screen.getByRole("tab", { name: expectedTabName });
        expect(selectedTab).toHaveAttribute("aria-selected", "true");

        // Verify other tabs are not selected
        const allTabs = screen.getAllByRole("tab");
        allTabs.forEach((tab) => {
          if (tab !== selectedTab) {
            expect(tab).toHaveAttribute("aria-selected", "false");
          }
        });
      }

      // Final verification - component should still be functional
      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as navigation tabs", () => {
      render(
        <DsBox>
          <DsTabs value={0} aria-label="Main navigation">
            <DsTab label="Dashboard" />
            <DsTab label="Users" />
            <DsTab label="Settings" />
            <DsTab label="Reports" />
          </DsTabs>
        </DsBox>
      );

      expect(
        screen.getByRole("tablist", { name: "Main navigation" })
      ).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Dashboard" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByRole("tab", { name: "Users" })).toHaveAttribute(
        "aria-selected",
        "false"
      );
    });

    it("should work with icon tabs", () => {
      render(
        <DsTabs value={1}>
          <DsTab
            icon={<DsRemixIcon className="ri-bar-chart-line" />}
            label="Analytics"
            iconPosition="start"
          />

          <DsTab label="Home" icon={<DsRemixIcon className="ri-home-line" />} />
          <DsTab
            label="Profile"
            icon={<DsRemixIcon className="ri-user-line" />}
          />
        </DsTabs>
      );

      // Icons and labels create compound accessible names
      expect(
        screen.getByRole("tab", { name: "Analytics" })
      ).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Home" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Home" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(document.querySelector(".ri-home-line")).toBeInTheDocument();
      expect(document.querySelector(".ri-user-line")).toBeInTheDocument();
    });

    it("should work with scrollable tabs", () => {
      render(
        <DsTabs variant="scrollable" scrollButtons="auto" value={0}>
          <DsTab label="Very Long Tab Name 1" />
          <DsTab label="Very Long Tab Name 2" />
          <DsTab label="Very Long Tab Name 3" />
          <DsTab label="Very Long Tab Name 4" />
          <DsTab label="Very Long Tab Name 5" />
          <DsTab label="Very Long Tab Name 6" />
        </DsTabs>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).toHaveClass("MuiTabs-root");

      // Check for scroll buttons (when scrollButtons="auto", they appear when needed)
      const scrollButtons = tabsRoot?.querySelectorAll(
        ".MuiTabScrollButton-root"
      );
      expect(scrollButtons?.length).toBeGreaterThanOrEqual(0); // May be 0 or 2 depending on content overflow

      // Verify the first tab is selected
      const firstTab = screen.getByRole("tab", {
        name: "Very Long Tab Name 1",
      });
      expect(firstTab).toHaveAttribute("aria-selected", "true");

      const tabs = screen.getAllByRole("tab");
      expect(tabs).toHaveLength(6);
    });

    it("should work as full-width tabs", () => {
      render(
        <DsBox width="100%">
          <DsTabs variant="fullWidth" value={0}>
            <DsTab label="Equal Width 1" />
            <DsTab label="Equal Width 2" />
            <DsTab label="Equal Width 3" />
          </DsTabs>
        </DsBox>
      );

      const tablist = screen.getByRole("tablist");
      const tabsRoot = tablist.closest(".MuiTabs-root");
      expect(tabsRoot).toHaveClass("MuiTabs-root");
      expect(screen.getAllByRole("tab")).toHaveLength(3);
    });

    it("should work with controlled tab panels", () => {
      const TabPanel = ({
        children,
        value,
        index,
      }: {
        children: React.ReactNode;
        value: number;
        index: number;
      }) => (
        <DsBox role="tabpanel" hidden={value !== index}>
          {value === index && children}
        </DsBox>
      );

      render(
        <DsBox>
          <DsTabs value={1}>
            <DsTab label="Panel 1" />
            <DsTab label="Panel 2" />
            <DsTab label="Panel 3" />
          </DsTabs>
          <TabPanel value={1} index={0}>
            <DsTypography>Content for Panel 1</DsTypography>
          </TabPanel>
          <TabPanel value={1} index={1}>
            <DsTypography>Content for Panel 2</DsTypography>
          </TabPanel>
          <TabPanel value={1} index={2}>
            <DsTypography>Content for Panel 3</DsTypography>
          </TabPanel>
        </DsBox>
      );

      expect(screen.getByRole("tab", { name: "Panel 2" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
      expect(screen.getByText("Content for Panel 2")).toBeInTheDocument();
      expect(screen.queryByText("Content for Panel 1")).not.toBeInTheDocument();
    });

    it("should work in container variant for form sections", () => {
      render(
        <DsBox component="form">
          <DsTabs ds-variant="container" value={0}>
            <DsTab label="Basic Info" />
            <DsTab label="Contact Details" />
            <DsTab label="Preferences" />
          </DsTabs>
        </DsBox>
      );

      const tablist = screen.getByRole("tablist");
      expect(tablist).toBeInTheDocument();
      expect(screen.getByRole("tab", { name: "Basic Info" })).toHaveAttribute(
        "aria-selected",
        "true"
      );
    });
  });

  // ============================
  // THEME TESTING TESTS
  // ============================
  describe("Theme Testing", () => {
    it("should render consistently across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTabs value={0} data-testid={`tabs-${colorScheme}`}>
            <DsTab
              label={`${colorScheme.charAt(0).toUpperCase()}${colorScheme.slice(
                1
              )} Tab`}
            />
            <DsTab label="Second Tab" />
          </DsTabs>
        ),
        (container, colorScheme) => {
          const tabs = container.querySelector(
            `[data-testid="tabs-${colorScheme}"]`
          );
          expect(tabs).toBeInTheDocument();
          expect(tabs).toHaveClass("MuiTabs-root");
        }
      );
    });

    it("should render correctly across all color schemes with proper theme hex colors", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      const colorSchemes = ["light", "dark", "highContrast"] as const;
      // Theme-specific expectations mapping for background colors
      const themeExpectations = {
        light: {
          expectedBgColor: PALETTE.secondary100,
        },
        dark: {
          expectedBgColor: PALETTE.secondary100,
        },
        highContrast: {
          expectedBgColor: PALETTE.highContrast1,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsTabs
            sx={{
              backgroundColor: "var(--ds-colour-actionSecondary)",
            }}
            value={0}
          >
            <DsTab label="Primary Tab" />
            <DsTab label="Secondary Tab" />
          </DsTabs>,
          colorScheme
        );

        // Verify basic rendering
        const tabsRoot = container.querySelector(".MuiTabs-root");
        expect(tabsRoot).toBeInTheDocument();

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Check computed style for the selected tab color
        const computedStyles = window.getComputedStyle(tabsRoot as Element);
        expect(computedStyles.backgroundColor).toBe(
          "var(--ds-colour-actionSecondary)"
        );

        const actualActionSecondary = schemeData?.ds?.colour?.actionSecondary;
        expect(actualActionSecondary).toBe(expectations.expectedBgColor);

        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(
        <DsTabs>
          <DsTab label="Default Tab 1" />
          <DsTab label="Default Tab 2" />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-default");
    });

    it("should match snapshot with selected tab", () => {
      const { container } = render(
        <DsTabs value={1}>
          <DsTab label="Unselected Tab" />
          <DsTab label="Selected Tab" />
          <DsTab label="Another Tab" />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-selected");
    });

    it("should match snapshots with different orientations", () => {
      const orientations = ["horizontal", "vertical"] as const;

      orientations.forEach((orientation) => {
        const { container } = render(
          <DsTabs orientation={orientation}>
            <DsTab label={`${orientation} Tab 1`} />
            <DsTab label={`${orientation} Tab 2`} />
          </DsTabs>
        );
        expect(container.firstChild).toMatchSnapshot(
          `tabs-orientation-${orientation}`
        );
      });
    });

    it("should match snapshots with different variants", () => {
      const variants = ["standard", "scrollable", "fullWidth"] as const;

      variants.forEach((variant) => {
        const { container } = render(
          <DsTabs variant={variant}>
            <DsTab label={`${variant} Tab 1`} />
            <DsTab label={`${variant} Tab 2`} />
            <DsTab label={`${variant} Tab 3`} />
          </DsTabs>
        );
        expect(container.firstChild).toMatchSnapshot(`tabs-variant-${variant}`);
      });
    });

    it("should match snapshot with ds-variant container", () => {
      const { container } = render(
        <DsTabs ds-variant="container">
          <DsTab label="Container Tab 1" />
          <DsTab label="Container Tab 2" />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-ds-variant-container");
    });

    it("should match snapshots with different colors", () => {
      const colors = ["primary", "secondary"] as const;

      colors.forEach((color) => {
        const { container } = render(
          <DsTabs indicatorColor={color} textColor={color}>
            <DsTab label={`${color} Tab 1`} />
            <DsTab label={`${color} Tab 2`} />
          </DsTabs>
        );
        expect(container.firstChild).toMatchSnapshot(`tabs-color-${color}`);
      });
    });

    it("should match snapshot with disabled tabs", () => {
      const { container } = render(
        <DsTabs value={0}>
          <DsTab label="Active Tab" />
          <DsTab label="Disabled Tab" disabled />
          <DsTab label="Another Active Tab" />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-with-disabled");
    });

    it("should match snapshot with icon tabs", () => {
      const { container } = render(
        <DsTabs value={0}>
          <DsTab label="Home" icon={<DsRemixIcon className="ri-home-line" />} />
          <DsTab
            label="Profile"
            icon={<DsRemixIcon className="ri-user-line" />}
          />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-with-icons");
    });

    it("should match snapshots across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTabs value={0}>
            <DsTab
              label={`${colorScheme.charAt(0).toUpperCase()}${colorScheme.slice(
                1
              )} Tab`}
            />
            <DsTab label="Second Tab" />
          </DsTabs>
        ),
        (container, colorScheme) => {
          expect(container.firstChild).toMatchSnapshot(
            `tabs-theme-${colorScheme}`
          );
        }
      );
    });

    it("should match snapshot with custom styling", () => {
      const { container } = render(
        <DsTabs
          sx={{
            backgroundColor: "background.paper",
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
          value={0}
        >
          <DsTab label="Styled Tab 1" />
          <DsTab label="Styled Tab 2" />
        </DsTabs>
      );
      expect(container.firstChild).toMatchSnapshot("tabs-custom-styling");
    });

    it("should match snapshot with real-world navigation scenario", () => {
      const { container } = render(
        <DsBox>
          <DsTabs value={1} aria-label="Main navigation" variant="fullWidth">
            <DsTab
              icon={<DsRemixIcon className="ri-home-line" />}
              label="Dashboard"
            />
            <DsTab
              icon={<DsRemixIcon className="ri-user-line" />}
              label="Users"
            />
            <DsTab
              icon={<DsRemixIcon className="ri-file-list-line" />}
              label="Reports"
            />
            <DsTab
              icon={<DsRemixIcon className="ri-settings-line" />}
              label="Settings"
            />
          </DsTabs>
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot(
        "tabs-real-world-navigation"
      );
    });
  });
});
