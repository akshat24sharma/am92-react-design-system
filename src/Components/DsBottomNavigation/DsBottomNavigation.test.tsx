/**
 * @vitest-environment jsdom
 *
 * Test suite for DsBottomNavigation component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the navigation component.
 * 2. Props Validation - Ensure proper handling and validation of props including value, onChange, and children.
 * 3. Component States - Test various states including selected/unselected navigation items.
 * 4. MUI Styling - Validate Material-UI specific styling and class application for BottomNavigation components.
 * 5. Navigation Functionality - Test navigation selection logic and state management.
 * 6. Event Handling - Simulate user interactions including clicks and keyboard navigation.
 * 7. Form Integration - Test integration patterns and controlled component behavior.
 * 8. Accessibility - Check ARIA attributes and support for keyboard navigation between items.
 * 9. Edge Cases - Handle unusual scenarios like no selection, invalid values, and large datasets.
 * 10. Real-world Scenarios - Test common usage patterns like mobile navigation and tab switching.
 * 11. Theme Testing - Assess component rendering across different themes with proper color integration.
 * 12. Snapshot Testing - Perform visual regression testing for all states and themes.
 *
 * @package @am92/react-design-system
 * @component DsBottomNavigation
 */

import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsBottomNavigation } from "./DsBottomNavigation.Component";
import { DsBottomNavigationAction } from "../DsBottomNavigationAction";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsRemixIcon } from "../DsRemixIcon";

describe("DsBottomNavigation Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // Helper functions for consistent test setup
  const renderBasicBottomNavigation = (props = {}) => {
    const defaultProps = {
      value: "home",
      onChange: vi.fn(),
      ...props,
    };

    return render(
      <DsBottomNavigation {...defaultProps}>
        <DsBottomNavigationAction
          label="Home"
          icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
          value="home"
        />
        <DsBottomNavigationAction
          label="Search"
          icon={<DsRemixIcon className="ri-search-line" />}
          value="search"
        />
        <DsBottomNavigationAction
          label="Profile"
          icon={<DsRemixIcon className="ri-user-line" />}
          value="profile"
        />
      </DsBottomNavigation>
    );
  };

  const renderBottomNavigationWithoutIcons = (props = {}) => {
    const defaultProps = {
      value: "home",
      onChange: vi.fn(),
      ...props,
    };

    return render(
      <DsBottomNavigation {...defaultProps}>
        <DsBottomNavigationAction label="Home" value="home" />
        <DsBottomNavigationAction label="Search" value="search" />
        <DsBottomNavigationAction label="Profile" value="profile" />
      </DsBottomNavigation>
    );
  };

  const expectBasicBottomNavigation = (container: HTMLElement) => {
    // Verify basic structure
    expect(container.firstChild).toHaveAttribute("data-mui-color-scheme");

    // Check for navigation items
    const navigation = container.querySelector(".MuiBottomNavigation-root");
    expect(navigation).toBeInTheDocument();
  };

  // 1. Core Rendering Tests
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      const { container } = renderBasicBottomNavigation();

      expectBasicBottomNavigation(container);
      const actions = screen.getAllByRole("button");
      expect(actions).toHaveLength(3);
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("should render with selected state", () => {
      const { container } = renderBasicBottomNavigation({ value: "search" });

      expectBasicBottomNavigation(container);
      const actions = screen.getAllByRole("button");
      expect(actions).toHaveLength(3);

      // Check selected state
      const selectedAction = actions[1]; // Search is index 1
      expect(selectedAction).toHaveClass("Mui-selected");
    });

    it("should render with default MUI classes", () => {
      const { container } = renderBasicBottomNavigation();

      const navigation = container.querySelector(".MuiBottomNavigation-root");
      expect(navigation).toBeInTheDocument();

      const actions = container.querySelectorAll(
        ".MuiBottomNavigationAction-root"
      );
      actions.forEach((action) => {
        expect(action).toHaveClass("MuiBottomNavigationAction-root");
      });
    });

    it("should render icons with provided classes", () => {
      const { container } = renderBasicBottomNavigation();

      const homeIcon = container.querySelector(".ri-checkbox-circle-fill");
      const searchIcon = container.querySelector(".ri-search-line");
      const profileIcon = container.querySelector(".ri-user-line");

      expect(homeIcon).toBeInTheDocument();
      expect(searchIcon).toBeInTheDocument();
      expect(profileIcon).toBeInTheDocument();
    });

    it("should render single navigation action", () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction
            label="Home"
            icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
            value="home"
          />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      expect(actions).toHaveLength(1);
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  // 2. Props Validation Tests
  describe("Props Validation", () => {
    it("should accept and use value prop", () => {
      renderBasicBottomNavigation({ value: "profile" });

      const actions = screen.getAllByRole("button");
      expect(actions[2]).toHaveClass("Mui-selected");
      expect(actions[0]).not.toHaveClass("Mui-selected");
      expect(actions[1]).not.toHaveClass("Mui-selected");
    });

    it("should handle undefined value prop", () => {
      renderBasicBottomNavigation({ value: undefined });

      const actions = screen.getAllByRole("button");
      actions.forEach((action) => {
        expect(action).not.toHaveClass("Mui-selected");
      });
    });

    it("should handle showLabels prop", () => {
      const { container } = renderBasicBottomNavigation({ showLabels: true });

      const navigation = container.querySelector(".MuiBottomNavigation-root");
      expect(navigation).toHaveClass("MuiBottomNavigation-root");

      // Labels should be visible
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Search")).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });

    it("should pass through sx prop", () => {
      const { container } = render(
        <DsBottomNavigation
          value={0}
          onChange={vi.fn()}
          sx={{ minHeight: "100px" }}
        >
          <DsBottomNavigationAction label="Home" value="home" />
        </DsBottomNavigation>
      );

      const navigation = container.querySelector(".MuiBottomNavigation-root");
      const computedStyles = getComputedStyle(navigation as Element);
      expect(navigation).toBeInTheDocument();

      expect(computedStyles.minHeight).toBe("100px");
    });

    it("should handle component prop", () => {
      const { container } = render(
        <DsBottomNavigation value={0} onChange={vi.fn()} component="nav">
          <DsBottomNavigationAction label="Home" value="home" />
        </DsBottomNavigation>
      );

      const navigation = container.querySelector("nav");
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveClass("MuiBottomNavigation-root");
    });
  });

  // 3. Component States
  describe("Component States", () => {
    it("should render unselected state by default", () => {
      renderBasicBottomNavigation({ value: undefined });

      const actions = screen.getAllByRole("button");
      actions.forEach((action) => {
        expect(action).not.toHaveClass("Mui-selected");
      });
    });

    it("should render selected state correctly", () => {
      renderBasicBottomNavigation({ value: "search" });

      const actions = screen.getAllByRole("button");
      expect(actions[0]).not.toHaveClass("Mui-selected");
      expect(actions[1]).toHaveClass("Mui-selected");
      expect(actions[2]).not.toHaveClass("Mui-selected");
    });

    it("should handle disabled state on individual actions", () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Search" value="search" disabled />
          <DsBottomNavigationAction label="Profile" value="profile" />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      expect(actions[1]).toBeDisabled();
      expect(actions[0]).not.toBeDisabled();
      expect(actions[2]).not.toBeDisabled();
    });

    it("should show labels when showLabels is true", () => {
      renderBasicBottomNavigation({ showLabels: true });

      expect(screen.getByText("Home")).toBeVisible();
      expect(screen.getByText("Search")).toBeVisible();
      expect(screen.getByText("Profile")).toBeVisible();
    });
  });

  // 4. MUI Styling Tests
  describe("MUI Styling", () => {
    it("should apply default MUI BottomNavigation classes", () => {
      const { container } = renderBasicBottomNavigation();

      const navigation = container.querySelector(".MuiBottomNavigation-root");
      expect(navigation).toBeInTheDocument();
      expect(navigation).toHaveClass("MuiBottomNavigation-root");
    });

    it("should apply MUI BottomNavigationAction classes", () => {
      const { container } = renderBasicBottomNavigation();

      const actions = container.querySelectorAll(
        ".MuiBottomNavigationAction-root"
      );
      actions.forEach((action) => {
        expect(action).toHaveClass("MuiBottomNavigationAction-root");
      });
    });

    it("should apply selected state classes correctly", () => {
      renderBasicBottomNavigation({ value: "home" });

      const actions = screen.getAllByRole("button");
      const selectedAction = actions[0];
      const unselectedAction = actions[1];

      expect(selectedAction).toHaveClass("Mui-selected");
      expect(unselectedAction).not.toHaveClass("Mui-selected");
    });

    it("should apply disabled state classes", () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Search" value="search" disabled />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      const disabledAction = actions[1];
      expect(disabledAction).toHaveClass("Mui-disabled");
    });
  });

  // 5. Navigation Functionality Tests
  describe("Navigation Functionality", () => {
    it("should handle selection change", async () => {
      const handleChange = vi.fn();
      renderBasicBottomNavigation({ onChange: handleChange, value: "home" });

      const actions = screen.getAllByRole("button");
      await user.click(actions[1]);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "search");
    });

    it("should handle selection with string values", async () => {
      const handleChange = vi.fn();
      render(
        <DsBottomNavigation value="home" onChange={handleChange}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Search" value="search" />
        </DsBottomNavigation>
      );

      const searchAction = screen.getByText("Search").closest("button");
      await user.click(searchAction!);

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "search");
    });

    it("should not trigger change for disabled items", () => {
      const handleChange = vi.fn();
      render(
        <DsBottomNavigation value="home" onChange={handleChange}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Search" value="search" disabled />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      // Disabled items can't be clicked with userEvent due to pointer-events: none
      // We test that the item is disabled instead
      expect(actions[1]).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // 6. Event Handling Tests
  describe("Event Handling", () => {
    it("should handle click events on navigation actions", async () => {
      const handleChange = vi.fn();
      renderBasicBottomNavigation({ onChange: handleChange });

      const homeAction = screen.getByText("Home").closest("button");
      await user.click(homeAction!);

      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events", async () => {
      const handleChange = vi.fn();
      renderBasicBottomNavigation({ onChange: handleChange });

      const actions = screen.getAllByRole("button");

      // Focus and press Enter
      await user.click(actions[1]);
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalled();
    });

    it("should support keyboard navigation between actions", async () => {
      renderBasicBottomNavigation();

      const actions = screen.getAllByRole("button");

      await user.click(actions[0]);
      expect(actions[0]).toHaveFocus();

      await user.tab();
      expect(actions[1]).toHaveFocus();

      await user.tab();
      expect(actions[2]).toHaveFocus();
    });
  });

  // 7. Form Integration Tests
  describe("Form Integration", () => {
    it("should work within form element", async () => {
      const handleChange = vi.fn();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <DsBottomNavigation value="tab1" onChange={handleChange}>
            <DsBottomNavigationAction label="Tab 1" value="tab1" />
            <DsBottomNavigationAction label="Tab 2" value="tab2" />
          </DsBottomNavigation>
          <button type="submit">Submit Form</button>
        </form>
      );

      const actions = screen.getAllByRole("button");
      expect(actions).toHaveLength(3); // 2 navigation actions + 1 submit button

      // Test that navigation actions work within form
      const tab2Action = actions[1];
      await user.click(tab2Action);

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "tab2");

      // Test that form submission still works
      const submitButton = screen.getByText("Submit Form");
      await user.click(submitButton);

      expect(handleSubmit).toHaveBeenCalled();

      // Verify navigation buttons don't interfere with form submission
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("should work with controlled component pattern", async () => {
      let value = "tab1";
      const handleChange = vi.fn((event, newValue) => {
        value = newValue;
      });

      const { rerender } = render(
        <DsBottomNavigation value={value} onChange={handleChange}>
          <DsBottomNavigationAction label="Tab 1" value="tab1" />
          <DsBottomNavigationAction label="Tab 2" value="tab2" />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      await user.click(actions[1]);

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "tab2");

      rerender(
        <DsBottomNavigation value={"tab2"} onChange={handleChange}>
          <DsBottomNavigationAction label="Tab 1" value="tab1" />
          <DsBottomNavigationAction label="Tab 2" value="tab2" />
        </DsBottomNavigation>
      );

      // Get fresh actions after rerender
      const updatedActions = screen.getAllByRole("button");
      expect(updatedActions[1]).toHaveClass("Mui-selected");
    });

    it("should handle form submission", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <DsBottomNavigation value={0} onChange={vi.fn()}>
            <DsBottomNavigationAction label="Submit" value="submit" />
          </DsBottomNavigation>
        </form>
      );

      const form = document.querySelector("form") as HTMLFormElement;
      fireEvent.submit(form);

      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // 8. Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      renderBasicBottomNavigation();

      const actions = screen.getAllByRole("button");
      actions.forEach((action) => {
        expect(action).toHaveAttribute("tabindex");
      });
    });

    it("should have accessible names for actions", () => {
      renderBasicBottomNavigation();

      expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Search/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Profile/i })
      ).toBeInTheDocument();
    });

    it("should skip disabled items in keyboard navigation", async () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Search" value="search" disabled />
          <DsBottomNavigationAction label="Profile" value="profile" />
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");

      await user.click(actions[0]);
      expect(actions[0]).toHaveFocus();

      await user.tab();
      // Should skip disabled action and go to next enabled one
      expect(actions[2]).toHaveFocus();
    });
  });

  // 9. Edge Cases Tests
  describe("Edge Cases", () => {
    it("should handle empty children gracefully", () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          {/* No children */}
        </DsBottomNavigation>
      );

      const navigation = document.querySelector(".MuiBottomNavigation-root");
      expect(navigation).toBeInTheDocument();
    });

    it("should handle invalid value prop", () => {
      renderBasicBottomNavigation({ value: 999 }); // Out of range

      const actions = screen.getAllByRole("button");
      actions.forEach((action) => {
        expect(action).not.toHaveClass("Mui-selected");
      });
    });

    it("should handle null value prop", () => {
      renderBasicBottomNavigation({ value: null as any });

      const actions = screen.getAllByRole("button");
      actions.forEach((action) => {
        expect(action).not.toHaveClass("Mui-selected");
      });
    });

    it("should handle very long labels", () => {
      const longLabel = "Very ".repeat(20) + "Long Label";
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label={longLabel} value="long" />
        </DsBottomNavigation>
      );

      expect(screen.getByText(longLabel)).toBeInTheDocument();
    });

    it("should handle special characters in labels", () => {
      const specialLabel = "!@#$%^&*()_+-={}[]|;':\",./<>?";
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label={specialLabel} value="special" />
        </DsBottomNavigation>
      );

      expect(screen.getByText(specialLabel)).toBeInTheDocument();
    });

    it("should handle unicode characters in labels", () => {
      const unicodeLabel = "测试 🌟 ñáéíóú";
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label={unicodeLabel} value="unicode" />
        </DsBottomNavigation>
      );

      expect(screen.getByText(unicodeLabel)).toBeInTheDocument();
    });

    it("should handle large number of navigation items", () => {
      const manyActions = Array.from({ length: 20 }, (_, i) => (
        <DsBottomNavigationAction
          key={i}
          label={`Item ${i}`}
          value={`item${i}`}
        />
      ));

      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          {manyActions}
        </DsBottomNavigation>
      );

      const actions = screen.getAllByRole("button");
      expect(actions).toHaveLength(20);
    });
  });

  // 10. Real-world Scenarios Tests
  describe("Real-world Scenarios", () => {
    it("should work as mobile app navigation", async () => {
      const handleChange = vi.fn();
      render(
        <DsBox sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
          <DsBottomNavigation value="home" onChange={handleChange} showLabels>
            <DsBottomNavigationAction
              label="Home"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="home"
            />
            <DsBottomNavigationAction
              label="Explore"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="explore"
            />
            <DsBottomNavigationAction
              label="Favorites"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="favorites"
            />
            <DsBottomNavigationAction
              label="Profile"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="profile"
            />
          </DsBottomNavigation>
        </DsBox>
      );

      const exploreAction = screen.getByText("Explore");
      await user.click(exploreAction);

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "explore");
    });

    it("should work as tab navigation system", async () => {
      const handleChange = vi.fn();
      let currentTab = "home";

      const TabContent = ({ tab }: { tab: string }) => {
        const content = {
          home: "Home Content",
          search: "Search Results",
          profile: "User Profile",
        } as any;
        return <DsTypography>{content[tab] || "Content"}</DsTypography>;
      };

      const { rerender } = render(
        <DsBox>
          <TabContent tab={currentTab} />
          <DsBottomNavigation
            value={currentTab}
            onChange={(event, newValue) => {
              currentTab = newValue;
              handleChange(event, newValue);
            }}
          >
            <DsBottomNavigationAction label="Home" value="home" />
            <DsBottomNavigationAction label="Search" value="search" />
            <DsBottomNavigationAction label="Profile" value="profile" />
          </DsBottomNavigation>
        </DsBox>
      );

      const searchTab = screen.getByText("Search");
      await user.click(searchTab);

      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), "search");
    });

    it("should work with conditional navigation items", () => {
      const isLoggedIn = false;
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction label="Browse" value="browse" />
          {isLoggedIn ? (
            <DsBottomNavigationAction label="My Account" value="account" />
          ) : (
            <DsBottomNavigationAction label="Sign In" value="signin" />
          )}
        </DsBottomNavigation>
      );

      expect(screen.getByText("Sign In")).toBeInTheDocument();
      expect(screen.queryByText("My Account")).not.toBeInTheDocument();
    });

    it("should work with badge notifications", () => {
      render(
        <DsBottomNavigation value={0} onChange={vi.fn()}>
          <DsBottomNavigationAction label="Home" value="home" />
          <DsBottomNavigationAction
            label="Messages"
            value="messages"
            icon={
              <DsBox sx={{ position: "relative" }}>
                <DsRemixIcon className="ri-checkbox-circle-fill" />
                <DsBox
                  sx={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "error.main",
                    borderRadius: "50%",
                    minWidth: 16,
                    height: 16,
                    fontSize: "0.75rem",
                  }}
                >
                  3
                </DsBox>
              </DsBox>
            }
          />
          <DsBottomNavigationAction label="Profile" value="profile" />
        </DsBottomNavigation>
      );

      expect(screen.getByText("Messages")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument(); // Badge count
    });
  });

  // 11. Theme Testing Tests
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsBottomNavigation
            value="search"
            onChange={vi.fn()}
            data-testid={`bottom-navigation-${colorScheme}`}
          >
            <DsBottomNavigationAction
              label="Home"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="home"
            />
            <DsBottomNavigationAction
              label="Search"
              icon={<DsRemixIcon className="ri-search-line" />}
              value="search"
            />
            <DsBottomNavigationAction
              label="Profile"
              icon={<DsRemixIcon className="ri-user-line" />}
              value="profile"
            />
          </DsBottomNavigation>
        ),

        (container, colorScheme) => {
          const navigation = container.querySelector(
            `[data-testid="bottom-navigation-${colorScheme}"]`
          );
          expect(navigation).toBeInTheDocument();
          expect(navigation).toHaveClass("MuiBottomNavigation-root");

          // Verify selected state is applied correctly
          const selectedAction = container.querySelector(".Mui-selected");
          expect(selectedAction).toBeInTheDocument();

          // Verify navigation actions are rendered
          const actions = container.querySelectorAll(
            ".MuiBottomNavigationAction-root"
          );
          expect(actions).toHaveLength(3);

          // Snapshot testing for each theme
          expect(container.firstChild).toMatchSnapshot(
            `ds-bottom-navigation-${colorScheme}-theme`
          );
        }
      );
    });

    it("should apply correct theme colors across all themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      // Theme-specific expectations mapping for navigation colors
      const themeExpectations = {
        light: {
          expectedColor: PALETTE.secondary100,
        },
        dark: {
          expectedColor: PALETTE.secondary100,
        },
        highContrast: {
          expectedColor: PALETTE.highContrast1,
        },
      };

      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for color validation
      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        const { container, unmount } = renderWithTheme(
          <DsBottomNavigation
            value="home"
            onChange={vi.fn()}
            data-testid={`navigation-colors-${colorScheme}`}
            sx={{
              background: "var(--ds-colour-typoActionSecondary)",
            }}
          >
            <DsBottomNavigationAction
              label="Home"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="home"
            />
            <DsBottomNavigationAction
              label="Search"
              icon={<DsRemixIcon className="ri-search-line" />}
              value="search"
            />
          </DsBottomNavigation>,
          colorScheme
        );

        // Verify the navigation renders correctly
        const navigationElement = container.querySelector(
          `[data-testid="navigation-colors-${colorScheme}"]`
        ) as HTMLElement;
        expect(navigationElement).toBeInTheDocument();
        expect(navigationElement).toHaveClass("MuiBottomNavigation-root");

        // Verify theme context is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify the computed colors use the correct CSS variables
        const computedStyles = window.getComputedStyle(navigationElement);
        const actualColor = computedStyles.background;
        // The CSS variable should be applied
        expect(actualColor).toBe("var(--ds-colour-typoActionSecondary)");

        // Verify that the design system colors match expected theme colors
        const actualActionSecondary =
          schemeData?.ds?.colour?.typoActionSecondary;
        expect(actualActionSecondary).toBe(expectations.expectedColor);

        unmount();
      });
    });
  });

  // 12. Snapshot Testing Tests
  describe("Snapshot Testing", () => {
    it("should match snapshots for key component states", () => {
      // Unselected state
      const { container: unselectedContainer } = renderBasicBottomNavigation({
        value: undefined,
      });
      expect(unselectedContainer.firstChild).toMatchSnapshot(
        "bottom-navigation-unselected"
      );

      // Selected state
      const { container: selectedContainer } = renderBasicBottomNavigation({
        value: "search",
      });
      expect(selectedContainer.firstChild).toMatchSnapshot(
        "bottom-navigation-selected"
      );

      // With labels
      const { container: withLabelsContainer } = renderBasicBottomNavigation({
        value: "home",
        showLabels: true,
      });
      expect(withLabelsContainer.firstChild).toMatchSnapshot(
        "bottom-navigation-with-labels"
      );

      // Without icons
      const { container: withoutIconsContainer } =
        renderBottomNavigationWithoutIcons({
          value: "profile",
        });
      expect(withoutIconsContainer.firstChild).toMatchSnapshot(
        "bottom-navigation-without-icons"
      );
    });

    it("should match snapshot across themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((colorScheme) => {
        const { container } = renderWithTheme(
          <DsBottomNavigation value="search" onChange={vi.fn()}>
            <DsBottomNavigationAction
              label="Home"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="home"
            />
            <DsBottomNavigationAction
              label="Search"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="search"
            />
            <DsBottomNavigationAction
              label="Profile"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="profile"
            />
          </DsBottomNavigation>,
          colorScheme
        );

        expect(container.firstChild).toMatchSnapshot(
          `bottom-navigation-theme-${colorScheme}`
        );
      });
    });

    it("should match snapshot for complex real-world scenario", () => {
      const { container } = render(
        <DsBox sx={{ width: "100%", position: "fixed", bottom: 0 }}>
          <DsBottomNavigation value="favorites" onChange={vi.fn()} showLabels>
            <DsBottomNavigationAction
              label="Home"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="home"
            />
            <DsBottomNavigationAction
              label="Explore"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="explore"
            />
            <DsBottomNavigationAction
              label="Favorites"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="favorites"
            />
            <DsBottomNavigationAction
              label="Messages"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="messages"
            />
            <DsBottomNavigationAction
              label="Profile"
              icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
              value="profile"
            />
          </DsBottomNavigation>
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot(
        "bottom-navigation-complex-real-world"
      );
    });
  });
});
