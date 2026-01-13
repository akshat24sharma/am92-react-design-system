/**
 * @vitest-environment jsdom
 *
 * Test suite for DsAppBar component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the component with different configurations.
 * 2. Props Validation - Ensure proper handling and validation of props including navigation, appBarTitle, and actions.
 * 3. Component States - Test various states of the component (different colors, positions, elevations).
 * 4. MUI Styling - Validate Material-UI specific styling and class application for AppBar and Toolbar components.
 * 5. Component Functionality - Test navigation integration, title rendering, and actions display.
 * 6. Event Handling - Simulate user interactions with navigation and action elements.
 * 7. Accessibility - Check ARIA attributes and support for keyboard navigation within AppBar elements.
 * 8. Edge Cases - Handle unusual scenarios like null values, special characters, and complex title components.
 * 9. Real-world Scenarios - Test common usage patterns like main navigation, mobile headers, and dashboard layouts.
 * 10. Theme Testing - Assess component rendering across different themes (light, dark, high contrast) with proper color integration.
 * 11. Snapshot Testing - Perform visual regression testing for all states and themes.
 *
 * @package @am92/react-design-system
 * @component DsAppBar
 */

import { describe, expect, it, beforeEach, vi } from "vitest";
import { render, screen, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsAppBar } from "./DsAppBar.Component";
import { DsIconButton } from "../DsIconButton";
import { DsButton } from "../DsButton";
import { DsTypography } from "../DsTypography";
import { DsBox } from "../DsBox";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { DsRemixIcon } from "../DsRemixIcon";

describe("DsAppBar Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // Helper functions for consistent test setup
  const renderBasicAppBar = (props = {}) => {
    const defaultProps = {
      appBarTitle: "Test App",
      ...props,
    };

    return render(<DsAppBar {...defaultProps} />);
  };

  const renderAppBarWithNavigation = (props = {}) => {
    const defaultProps = {
      appBarTitle: "Test App",
      navigation: (
        <DsIconButton>
          <DsRemixIcon className="ri-menu-line" />
        </DsIconButton>
      ),
      ...props,
    };

    return render(<DsAppBar {...defaultProps} />);
  };

  const renderAppBarWithActions = (props = {}) => {
    const defaultProps = {
      appBarTitle: "Test App",
      actions: [
        <DsIconButton key="search">
          <DsRemixIcon className="ri-search-line" />
        </DsIconButton>,
        <DsIconButton key="settings">
          <DsRemixIcon className="ri-settings-line" />
        </DsIconButton>,
      ],
      ...props,
    };

    return render(<DsAppBar {...defaultProps} />);
  };

  const renderFullAppBar = (props = {}) => {
    const defaultProps = {
      appBarTitle: "Full App",
      navigation: (
        <DsIconButton>
          <DsRemixIcon className="ri-menu-line" />
        </DsIconButton>
      ),
      actions: [
        <DsIconButton key="notifications">
          <DsRemixIcon className="ri-notification-line" />
        </DsIconButton>,
        <DsIconButton key="profile">
          <DsRemixIcon className="ri-account-circle-line" />
        </DsIconButton>,
      ],
      ...props,
    };

    return render(<DsAppBar {...defaultProps} />);
  };

  const expectBasicAppBar = (container: HTMLElement) => {
    // Verify basic AppBar structure
    expect(container.querySelector(".MuiAppBar-root")).toBeInTheDocument();
    expect(container.querySelector(".MuiToolbar-root")).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute("data-mui-color-scheme");
  };

  // 1. Core Rendering Tests
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<DsAppBar />);

      expectBasicAppBar(container);
      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-colorDefault");
      expect(appBar).toHaveClass("MuiPaper-elevation0");
    });

    it("should render with string title", () => {
      const { container } = renderBasicAppBar({
        appBarTitle: "My Application",
      });

      expectBasicAppBar(container);
      expect(screen.getByText("My Application")).toBeInTheDocument();
    });

    it("should render with React element title", () => {
      const customTitle = (
        <DsTypography variant="headingBoldMedium" color="primary">
          Custom Title Component
        </DsTypography>
      );
      const { container } = renderBasicAppBar({ appBarTitle: customTitle });

      expectBasicAppBar(container);
      expect(screen.getByText("Custom Title Component")).toBeInTheDocument();

      const titleElement = screen.getByText("Custom Title Component");
      expect(titleElement).toHaveClass("MuiTypography-root");
      // Color prop is passed as CSS, not HTML attribute
      const computedStyle = window.getComputedStyle(titleElement);
      expect(computedStyle.color).toBe("var(--palette-primary-main)");
    });

    it("should render with navigation element", () => {
      const { container } = renderAppBarWithNavigation();

      expectBasicAppBar(container);
      expect(screen.getByText("Test App")).toBeInTheDocument();

      const navigationButton = container.querySelector(".MuiIconButton-root");
      expect(navigationButton).toBeInTheDocument();

      // Check for the RemixIcon menu class
      const menuIcon = container.querySelector(".ri-menu-line");
      expect(menuIcon).toBeInTheDocument();
    });

    it("should render with actions array", () => {
      const { container } = renderAppBarWithActions();

      expectBasicAppBar(container);
      expect(screen.getByText("Test App")).toBeInTheDocument();

      const actionButtons = container.querySelectorAll(".MuiIconButton-root");
      expect(actionButtons).toHaveLength(2);
    });

    it("should render complete AppBar with all elements", () => {
      const { container } = renderFullAppBar();

      expectBasicAppBar(container);
      expect(screen.getByText("Full App")).toBeInTheDocument();

      // Navigation button + 2 action buttons
      const allButtons = container.querySelectorAll(".MuiIconButton-root");
      expect(allButtons).toHaveLength(3);

      // Check for Stack component for actions
      const stackElement = container.querySelector(".MuiStack-root");
      expect(stackElement).toBeInTheDocument();
    });
  });

  // 2. Props Validation Tests
  describe("Props Validation", () => {
    it("should accept and pass through AppBar props", () => {
      const { container } = render(
        <DsAppBar
          appBarTitle="Props Test"
          position="fixed"
          color="primary"
          elevation={4}
        />
      );

      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-positionFixed");
      expect(appBar).toHaveClass("MuiAppBar-colorPrimary");
      expect(appBar).toHaveClass("MuiPaper-elevation4");
    });

    it("should handle boolean navigation prop", () => {
      const { container } = render(
        <DsAppBar appBarTitle="Boolean Nav" navigation={false} />
      );

      expectBasicAppBar(container);
      const navigationBox = container.querySelector("[role='navigation']");
      expect(navigationBox).not.toBeInTheDocument();
    });

    it("should handle boolean actions prop", () => {
      const { container } = render(
        <DsAppBar appBarTitle="Boolean Actions" actions={false} />
      );

      expectBasicAppBar(container);
      const stackElement = container.querySelector(".MuiStack-root");
      expect(stackElement).not.toBeInTheDocument();
    });

    it("should use default props when not provided", () => {
      const { container } = render(<DsAppBar />);

      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-colorDefault");
      expect(appBar).toHaveClass("MuiPaper-elevation0");
    });

    it("should override default props with custom values", () => {
      const { container } = render(
        <DsAppBar color="secondary" elevation={2} enableColorOnDark={false} />
      );

      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-colorSecondary");
      expect(appBar).toHaveClass("MuiPaper-elevation2");
    });
  });

  // 3. Component States
  describe("Component States", () => {
    it("should render in different color variants", () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "transparent",
      ] as const;

      colors.forEach((color) => {
        const { container } = render(
          <DsAppBar appBarTitle={`${color} AppBar`} color={color} />
        );

        const appBar = container.querySelector(".MuiAppBar-root");
        expect(appBar).toHaveClass(
          `MuiAppBar-color${color.charAt(0).toUpperCase() + color.slice(1)}`
        );
      });
    });

    it("should render in different positions", () => {
      const positions = [
        "fixed",
        "absolute",
        "sticky",
        "static",
        "relative",
      ] as const;

      positions.forEach((position) => {
        const { container } = render(
          <DsAppBar appBarTitle={`${position} AppBar`} position={position} />
        );

        const appBar = container.querySelector(".MuiAppBar-root");
        expect(appBar).toHaveClass(
          `MuiAppBar-position${
            position.charAt(0).toUpperCase() + position.slice(1)
          }`
        );
      });
    });

    it("should render with different elevation levels", () => {
      const elevations = [0, 1, 2, 4, 8] as const;

      elevations.forEach((elevation) => {
        const { container } = render(
          <DsAppBar
            appBarTitle={`Elevation ${elevation}`}
            elevation={elevation}
          />
        );

        const appBar = container.querySelector(".MuiAppBar-root");
        expect(appBar).toHaveClass(`MuiPaper-elevation${elevation}`);
      });
    });

    it("should handle enableColorOnDark prop", () => {
      const { container: enabledContainer } = render(
        <DsAppBar appBarTitle="Color on Dark" enableColorOnDark={true} />
      );

      const { container: disabledContainer } = render(
        <DsAppBar appBarTitle="No Color on Dark" enableColorOnDark={false} />
      );

      // Both should render, behavior difference is in dark theme
      expectBasicAppBar(enabledContainer);
      expectBasicAppBar(disabledContainer);
    });
  });

  // 4. MUI Styling Tests
  describe("MUI Styling", () => {
    it("should apply default MUI AppBar classes", () => {
      const { container } = renderBasicAppBar();

      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-root");
      expect(appBar).toHaveClass("MuiAppBar-positionFixed");
      expect(appBar).toHaveClass("MuiAppBar-colorDefault");
    });

    it("should apply MUI Toolbar classes", () => {
      const { container } = renderBasicAppBar();

      const toolbar = container.querySelector(".MuiToolbar-root");
      expect(toolbar).toHaveClass("MuiToolbar-root");
      expect(toolbar).toHaveClass("MuiToolbar-regular");
    });

    it("should apply proper flexbox layout", () => {
      const { container } = renderFullAppBar();

      const titleBox = container.querySelector(
        ".MuiBox-root:nth-child(2)"
      ) as HTMLElement;
      const computedStyle = window.getComputedStyle(titleBox);

      expect(computedStyle.display).toBe("inline-flex");
      expect(computedStyle.justifyContent).toBe("start");
      expect(computedStyle.alignItems).toBe("center");
      expect(computedStyle.flexGrow).toBe("1");
    });

    it("should apply correct Stack direction and spacing", () => {
      const { container } = renderAppBarWithActions();

      const actionsStack = container.querySelector(".MuiStack-root");
      expect(actionsStack).toHaveClass("MuiStack-root");

      const computedStyle = window.getComputedStyle(actionsStack as Element);
      expect(computedStyle.flexDirection).toBe("row");
    });
  });

  // 5. Component Functionality Tests
  describe("Component Functionality", () => {
    it("should render string title correctly", () => {
      renderBasicAppBar({ appBarTitle: "String Title Test" });

      const titleElement = screen.getByText("String Title Test");
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveClass("MuiTypography-root");
    });

    it("should render React element title correctly", () => {
      const customTitle = (
        <DsBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <DsRemixIcon className="ri-home-line" />
          <DsTypography variant="headingBoldSmall">Home</DsTypography>
        </DsBox>
      );

      renderBasicAppBar({ appBarTitle: customTitle });

      expect(screen.getByText("Home")).toBeInTheDocument();
      // The component structure is more important than the specific icon implementation
      const boxElement = document.querySelector(".MuiBox-root");
      expect(boxElement).toBeInTheDocument();
    });

    it("should handle navigation element correctly", () => {
      const customNavigation = (
        <DsButton
          variant="text"
          startIcon={<DsRemixIcon className="ri-arrow-left-line" />}
        >
          Back
        </DsButton>
      );

      renderAppBarWithNavigation({ navigation: customNavigation });

      const backButton = screen.getByText("Back");
      expect(backButton).toBeInTheDocument();
      expect(backButton.closest(".MuiButton-root")).toBeInTheDocument();
    });

    it("should handle multiple actions correctly", () => {
      const multipleActions = [
        <DsButton key="save" variant="contained" size="small">
          Save
        </DsButton>,
        <DsButton key="cancel" variant="outlined" size="small">
          Cancel
        </DsButton>,
        <DsIconButton key="more">
          <DsRemixIcon className="ri-more-vert-line" />
        </DsIconButton>,
      ];

      renderAppBarWithActions({ actions: multipleActions });

      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();

      const buttons = document.querySelectorAll(
        ".MuiButton-root, .MuiIconButton-root"
      );
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });

    it("should properly layout elements with flexbox", () => {
      const { container } = renderFullAppBar();

      // Title box should have flex-grow: 1 to take available space
      const titleBox = container.querySelector(
        ".MuiBox-root:nth-child(2)"
      ) as HTMLElement;
      const computedStyle = window.getComputedStyle(titleBox);
      expect(computedStyle.flexGrow).toBe("1");

      // Navigation and actions should not grow
      const navigationBox = container.querySelector(
        ".MuiBox-root:first-child"
      ) as HTMLElement;
      const navComputedStyle = window.getComputedStyle(navigationBox);
      // flexGrow might be empty string if not explicitly set
      expect(["0", ""]).toContain(navComputedStyle.flexGrow);
    });
  });

  // 6. Event Handling Tests
  describe("Event Handling", () => {
    it("should handle navigation element click events", async () => {
      const handleNavClick = vi.fn();
      const navigation = (
        <DsIconButton onClick={handleNavClick} data-testid="nav-button">
          <DsRemixIcon className="ri-menu-line" />
        </DsIconButton>
      );

      renderAppBarWithNavigation({ navigation });

      const navButton = screen.getByTestId("nav-button");
      await user.click(navButton);

      expect(handleNavClick).toHaveBeenCalledTimes(1);
    });

    it("should handle action element click events", async () => {
      const handleActionClick = vi.fn();
      const actions = [
        <DsIconButton
          key="search"
          onClick={handleActionClick}
          data-testid="search-action"
        >
          <DsRemixIcon className="ri-search-line" />
        </DsIconButton>,
      ];

      renderAppBarWithActions({ actions });

      const searchAction = screen.getByTestId("search-action");
      await user.click(searchAction);

      expect(handleActionClick).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple action clicks independently", async () => {
      const handleSearch = vi.fn();
      const handleSettings = vi.fn();
      const actions = [
        <DsIconButton
          key="search"
          onClick={handleSearch}
          data-testid="search-btn"
        >
          <DsRemixIcon className="ri-search-line" />
        </DsIconButton>,
        <DsIconButton
          key="settings"
          onClick={handleSettings}
          data-testid="settings-btn"
        >
          <DsRemixIcon className="ri-settings-line" />
        </DsIconButton>,
      ];

      renderAppBarWithActions({ actions });

      const searchBtn = screen.getByTestId("search-btn");
      const settingsBtn = screen.getByTestId("settings-btn");

      await user.click(searchBtn);
      await user.click(settingsBtn);

      expect(handleSearch).toHaveBeenCalledTimes(1);
      expect(handleSettings).toHaveBeenCalledTimes(1);
    });

    it("should support keyboard navigation on action elements", async () => {
      const actions = [
        <DsIconButton key="first" data-testid="first-action">
          <DsRemixIcon className="ri-first-page-line" />
        </DsIconButton>,
        <DsIconButton key="second" data-testid="second-action">
          <DsRemixIcon className="ri-last-page-line" />
        </DsIconButton>,
      ];

      renderAppBarWithActions({ actions });

      const firstAction = screen.getByTestId("first-action");
      const secondAction = screen.getByTestId("second-action");

      await user.click(firstAction);
      expect(firstAction).toHaveFocus();

      await user.tab();
      expect(secondAction).toHaveFocus();
    });
  });

  // 7. Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper banner role", () => {
      const { container } = renderBasicAppBar();

      const appBar = container.querySelector(".MuiAppBar-root");
      expect(appBar).toHaveRole("banner");
    });

    it("should support ARIA labels for navigation", () => {
      const navigation = (
        <DsIconButton aria-label="Open navigation menu">
          <DsRemixIcon className="ri-menu-line" />
        </DsIconButton>
      );

      renderAppBarWithNavigation({ navigation });

      const navButton = screen.getByLabelText("Open navigation menu");
      expect(navButton).toBeInTheDocument();
    });

    it("should support ARIA labels for actions", () => {
      const actions = [
        <DsIconButton key="search" aria-label="Search">
          <DsRemixIcon className="ri-search-line" />
        </DsIconButton>,
        <DsIconButton key="notifications" aria-label="View notifications">
          <DsRemixIcon className="ri-notification-line" />
        </DsIconButton>,
      ];

      renderAppBarWithActions({ actions });

      expect(screen.getByLabelText("Search")).toBeInTheDocument();
      expect(screen.getByLabelText("View notifications")).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      const actions = [
        <DsButton key="action1" data-testid="action-1">
          Action 1
        </DsButton>,
        <DsButton key="action2" data-testid="action-2">
          Action 2
        </DsButton>,
      ];

      renderAppBarWithActions({ actions });

      const action1 = screen.getByTestId("action-1");
      const action2 = screen.getByTestId("action-2");

      await user.click(action1);
      expect(action1).toHaveFocus();

      await user.tab();
      expect(action2).toHaveFocus();
    });
  });

  // 9. Edge Cases Tests
  describe("Edge Cases", () => {
    it("should handle null/undefined title gracefully", () => {
      const { container } = render(<DsAppBar appBarTitle={null as any} />);

      expectBasicAppBar(container);
      // Should not crash and should render basic structure
    });

    it("should handle undefined navigation gracefully", () => {
      const { container } = render(
        <DsAppBar appBarTitle="Test" navigation={undefined} />
      );

      expectBasicAppBar(container);
      expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should handle empty actions array", () => {
      const { container } = render(
        <DsAppBar appBarTitle="Empty Actions" actions={[]} />
      );

      expectBasicAppBar(container);
      // Empty actions array might still render Stack but without children
      const stackElement = container.querySelector(".MuiStack-root");
      if (stackElement) {
        expect(stackElement.children.length).toBe(0);
      }
    });

    it("should handle very long title text", () => {
      const longTitle =
        "This is a very long title that might overflow the AppBar container and test text truncation or wrapping behavior";

      const { container } = renderBasicAppBar({ appBarTitle: longTitle });

      expectBasicAppBar(container);
      expect(screen.getByText(longTitle)).toBeInTheDocument();
    });

    it("should handle title with special characters", () => {
      const specialTitle = "App & Services: <Test> {Config} @2024 #1";

      renderBasicAppBar({ appBarTitle: specialTitle });

      expect(screen.getByText(specialTitle)).toBeInTheDocument();
    });

    it("should handle title with unicode characters", () => {
      const unicodeTitle = "测试应用 🚀 Tëst Âpp ñáéíóú";

      renderBasicAppBar({ appBarTitle: unicodeTitle });

      expect(screen.getByText(unicodeTitle)).toBeInTheDocument();
    });

    it("should handle large number of actions", () => {
      const manyActions = Array.from({ length: 10 }, (_, i) => (
        <DsIconButton key={i} data-testid={`action-${i}`}>
          <DsRemixIcon className="ri-star-line" />
        </DsIconButton>
      ));

      const { container } = renderAppBarWithActions({ actions: manyActions });

      expectBasicAppBar(container);
      const actionButtons = container.querySelectorAll(".MuiIconButton-root");
      expect(actionButtons).toHaveLength(10);
    });
  });

  // 10. Real-world Scenarios Tests
  describe("Real-world Scenarios", () => {
    it("should work as main application header", () => {
      const mainAppBar = (
        <DsAppBar
          position="fixed"
          color="primary"
          appBarTitle="My Application"
          navigation={
            <DsIconButton aria-label="Open menu">
              <DsRemixIcon className="ri-menu-line" />
            </DsIconButton>
          }
          actions={[
            <DsIconButton key="search" aria-label="Search">
              <DsRemixIcon className="ri-search-line" />
            </DsIconButton>,
            <DsIconButton key="notifications" aria-label="Notifications">
              <DsRemixIcon className="ri-notification-line" />
            </DsIconButton>,
            <DsIconButton key="profile" aria-label="User profile">
              <DsRemixIcon className="ri-account-circle-line" />
            </DsIconButton>,
          ]}
        />
      );

      const { container } = render(mainAppBar);

      expectBasicAppBar(container);
      expect(screen.getByText("My Application")).toBeInTheDocument();
      expect(screen.getByLabelText("Open menu")).toBeInTheDocument();
      expect(screen.getByLabelText("Search")).toBeInTheDocument();
      expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
      expect(screen.getByLabelText("User profile")).toBeInTheDocument();
    });

    it("should work as mobile header with back navigation", () => {
      const mobileHeader = (
        <DsAppBar
          position="sticky"
          appBarTitle="Page Details"
          navigation={
            <DsIconButton aria-label="Go back">
              <DsRemixIcon className="ri-arrow-left-line" />
            </DsIconButton>
          }
          actions={[
            <DsIconButton key="share" aria-label="Share">
              <DsRemixIcon className="ri-share-line" />
            </DsIconButton>,
          ]}
        />
      );

      render(mobileHeader);

      expect(screen.getByText("Page Details")).toBeInTheDocument();
      expect(screen.getByLabelText("Go back")).toBeInTheDocument();
      expect(screen.getByLabelText("Share")).toBeInTheDocument();
    });

    it("should work as dashboard header with status indicators", () => {
      const dashboardTitle = (
        <DsBox>
          <DsTypography variant="headingBoldSmall" color="inherit">
            Dashboard
          </DsTypography>
          <DsBox
            sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}
          >
            <DsBox
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "success.main",
              }}
            />
            <DsTypography
              variant="bodyRegularSmall"
              color="inherit"
              sx={{ opacity: 0.8 }}
            >
              All systems operational
            </DsTypography>
          </DsBox>
        </DsBox>
      );

      render(
        <DsAppBar
          appBarTitle={dashboardTitle}
          actions={[
            <DsButton key="refresh" variant="outlined" size="small">
              Refresh
            </DsButton>,
          ]}
        />
      );

      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("All systems operational")).toBeInTheDocument();
      expect(screen.getByText("Refresh")).toBeInTheDocument();
    });

    it("should work as form page header", () => {
      render(
        <DsAppBar
          appBarTitle="Edit Profile"
          navigation={
            <DsIconButton aria-label="Cancel editing">
              <DsRemixIcon className="ri-close-line" />
            </DsIconButton>
          }
          actions={[
            <DsButton key="save" variant="contained" size="small">
              Save Changes
            </DsButton>,
          ]}
        />
      );

      expect(screen.getByText("Edit Profile")).toBeInTheDocument();
      expect(screen.getByLabelText("Cancel editing")).toBeInTheDocument();
      expect(screen.getByText("Save Changes")).toBeInTheDocument();
    });

    it("should work as settings page header with breadcrumbs", () => {
      const settingsTitle = (
        <DsBox>
          <DsTypography
            variant="bodyRegularSmall"
            color="inherit"
            sx={{ opacity: 0.7 }}
          >
            Settings / Profile
          </DsTypography>
          <DsTypography variant="headingBoldSmall" color="inherit">
            Personal Information
          </DsTypography>
        </DsBox>
      );

      render(
        <DsAppBar
          appBarTitle={settingsTitle}
          navigation={
            <DsIconButton aria-label="Back to settings">
              <DsRemixIcon className="ri-arrow-left-line" />
            </DsIconButton>
          }
        />
      );

      expect(screen.getByText("Settings / Profile")).toBeInTheDocument();
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByLabelText("Back to settings")).toBeInTheDocument();
    });
  });

  // 11. Theme Testing Tests
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsAppBar
            appBarTitle="Theme Test"
            color="primary"
            data-testid={`appbar-${colorScheme}`}
            navigation={
              <DsIconButton>
                <DsRemixIcon className="ri-menu-line" />
              </DsIconButton>
            }
            actions={[
              <DsIconButton key="search">
                <DsRemixIcon className="ri-search-line" />
              </DsIconButton>,
            ]}
          />
        ),
        (container, colorScheme) => {
          const appbar = container.querySelector(
            `[data-testid="appbar-${colorScheme}"]`
          );
          expect(appbar).toBeInTheDocument();
          expect(appbar).toHaveClass("MuiAppBar-colorPrimary");

          // Snapshot testing for each theme
          expect(container.firstChild).toMatchSnapshot(
            `ds-appbar-${colorScheme}-theme`
          );
        }
      );
    });

    it("should use correct colors across all themes", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      const themeExpectations = {
        light: {
          expectedColor: PALETTE.primary,
        },
        dark: {
          expectedColor: PALETTE.primary,
        },
        highContrast: {
          expectedColor: PALETTE.highContrast1,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container } = render(
          <DsAppBar
            appBarTitle="Color Test"
            color="primary"
            data-testid={`appbar-colors-${colorScheme}`}
          />,
          { colorScheme }
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Test AppBar uses proper MUI color classes
        const appBar = container.querySelector(".MuiAppBar-root");
        expect(appBar).toHaveClass("MuiAppBar-colorPrimary");
        const computedStyle = window.getComputedStyle(appBar as Element);

        const backgroundColor = computedStyle.backgroundColor;
        expect(backgroundColor).toBe(`var(--ds-colour-actionPrimary)`);
        const actualcolor = schemeData?.ds?.colour?.actionPrimary;

        // Test background color CSS variable usage
        expect(actualcolor).toBe(expectations.expectedColor);
      });
    });
  });

  // 12. Snapshot Testing Tests
  describe("Snapshot Testing", () => {
    it("should match snapshots for key component states", () => {
      // Basic AppBar
      const { container: basicContainer } = render(<DsAppBar />);
      expect(basicContainer.firstChild).toMatchSnapshot("appbar-basic");

      // AppBar with title
      const { container: titleContainer } = renderBasicAppBar({
        appBarTitle: "Snapshot Title",
      });
      expect(titleContainer.firstChild).toMatchSnapshot("appbar-with-title");

      // AppBar with navigation
      const { container: navContainer } = renderAppBarWithNavigation();
      expect(navContainer.firstChild).toMatchSnapshot("appbar-with-navigation");

      // AppBar with actions
      const { container: actionsContainer } = renderAppBarWithActions();
      expect(actionsContainer.firstChild).toMatchSnapshot(
        "appbar-with-actions"
      );

      // Full AppBar
      const { container: fullContainer } = renderFullAppBar();
      expect(fullContainer.firstChild).toMatchSnapshot("appbar-full");
    });

    it("should match snapshots for different positions", () => {
      const positions = ["fixed", "absolute", "sticky", "static"] as const;

      positions.forEach((position) => {
        const { container } = render(
          <DsAppBar appBarTitle={`${position} AppBar`} position={position} />
        );
        expect(container.firstChild).toMatchSnapshot(
          `appbar-position-${position}`
        );
      });
    });

    it("should match snapshots for different colors", () => {
      const colors = [
        "default",
        "primary",
        "secondary",
        "transparent",
      ] as const;

      colors.forEach((color) => {
        const { container } = render(
          <DsAppBar appBarTitle={`${color} AppBar`} color={color} />
        );
        expect(container.firstChild).toMatchSnapshot(`appbar-color-${color}`);
      });
    });

    it("should match snapshot across themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((colorScheme) => {
        const { container } = renderWithTheme(
          <DsAppBar
            appBarTitle="Theme Snapshot"
            color="primary"
            navigation={
              <DsIconButton>
                <DsRemixIcon className="ri-menu-line" />
              </DsIconButton>
            }
            actions={[
              <DsIconButton key="search">
                <DsRemixIcon className="ri-search-line" />
              </DsIconButton>,
            ]}
          />,
          colorScheme
        );

        expect(container.firstChild).toMatchSnapshot(
          `appbar-theme-${colorScheme}`
        );
      });
    });

    it("should match snapshot for complex real-world scenario", () => {
      const { container } = render(
        <DsBox sx={{ flexGrow: 1 }}>
          <DsAppBar
            position="static"
            color="primary"
            elevation={1}
            appBarTitle={
              <DsBox>
                <DsTypography variant="headingBoldMedium" color="inherit">
                  Project Dashboard
                </DsTypography>
                <DsTypography
                  variant="bodyRegularSmall"
                  color="inherit"
                  sx={{ opacity: 0.8 }}
                >
                  Last updated: 2 minutes ago
                </DsTypography>
              </DsBox>
            }
            navigation={
              <DsIconButton aria-label="Open drawer">
                <DsRemixIcon className="ri-menu-line" />
              </DsIconButton>
            }
            actions={[
              <DsIconButton key="refresh" aria-label="Refresh data">
                <DsRemixIcon className="ri-refresh-line" />
              </DsIconButton>,
              <DsButton
                key="export"
                variant="outlined"
                size="small"
                sx={{ color: "inherit", borderColor: "inherit" }}
              >
                Export
              </DsButton>,
              <DsIconButton key="settings" aria-label="Settings">
                <DsRemixIcon className="ri-settings-line" />
              </DsIconButton>,
            ]}
          />
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot("appbar-complex-real-world");
    });
  });
});
