/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTooltip component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Event Handling - User interactions and event handlers
 * 6. Accessibility - ARIA attributes and keyboard navigation
 * 7. Edge Cases - Unusual scenarios and boundary conditions
 * 8. Real-world Scenarios - Common usage patterns
 * 9. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 10. Snapshot Testing - Visual regression testing across all states and themes
 *
 * @package @am92/react-design-system
 * @component DsTooltip
 */

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  renderWithTheme,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsTooltip } from "./DsTooltip.Component";
import { DsButton } from "../DsButton/DsButton.Component";
import { DsBox } from "../DsBox/DsBox.Component";
import { DsTypography } from "../DsTypography";
import { DsRemixIcon } from "../DsRemixIcon";
import { PALETTE } from "../../Constants";
import getColorScheme from "../../Theme/getColorScheme";

describe("DsTooltip Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render child element with default wrapper", () => {
      render(
        <DsTooltip heading="Tooltip Heading" description="Tooltip Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
      // Default wrapper is DsLink (rendered as <a> element with MuiLink classes)
      const wrapper = screen.getByRole("button").parentElement;
      expect(wrapper).toHaveClass("MuiLink-root");
      expect(wrapper?.tagName).toBe("A");
    });

    it("should not show tooltip content by default", () => {
      render(
        <DsTooltip heading="Tooltip Heading" description="Tooltip Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.queryByText("Tooltip Heading")).not.toBeInTheDocument();
      expect(screen.queryByText("Tooltip Description")).not.toBeInTheDocument();
    });

    it("should render with only heading", async () => {
      render(
        <DsTooltip heading="Only Heading">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );

      // Initially not visible
      expect(screen.queryByText("Only Heading")).not.toBeInTheDocument();

      // Should appear on hover
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByText("Only Heading")).toBeInTheDocument();
    });

    it("should render with only description", async () => {
      render(
        <DsTooltip description="Only Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.queryByText("Only Description")).not.toBeInTheDocument();
      // Should appear on hover
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByText("Only Description")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should display heading and description on hover", async () => {
      render(
        <DsTooltip heading="Tooltip Heading" description="Tooltip Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByText("Tooltip Heading")).toBeInTheDocument();
      expect(
        await screen.findByText("Tooltip Description")
      ).toBeInTheDocument();
    });

    it("should support arrow prop (default true)", async () => {
      render(
        <DsTooltip heading="Tooltip with arrow" arrow={true}>
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      const tooltip = await screen.findByText("Tooltip with arrow");
      // Arrow creates additional DOM elements
      expect(tooltip.parentElement?.parentElement).toHaveClass(
        "MuiTooltip-popperArrow"
      );
    });

    it("should support placement prop (default top)", async () => {
      render(
        <DsTooltip heading="Bottom tooltip" placement="bottom">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      const tooltip = await screen.findByText("Bottom tooltip");
      // Check for placement in popper attributes
      expect(
        tooltip.closest('[data-popper-placement="bottom"]')
      ).toBeInTheDocument();
    });

    it("should support custom wrapper via slots.wrapper", () => {
      const CustomWrapper = (props: any) => (
        <DsBox data-testid="custom-wrapper" {...props} />
      );
      render(
        <DsTooltip heading="Custom wrapper" slots={{ wrapper: CustomWrapper }}>
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.getByTestId("custom-wrapper")).toBeInTheDocument();
    });

    it("should support slotProps.wrapper for custom wrapper props", () => {
      render(
        <DsTooltip
          heading="Custom wrapper props"
          slotProps={{
            wrapper: { "data-testid": "wrapper-with-props", href: "#test" },
          }}
        >
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      const wrapper = screen.getByTestId("wrapper-with-props");
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveAttribute("href", "#test");
    });

    it("should handle slotProps for tooltip customization", async () => {
      render(
        <DsTooltip
          heading="Custom tooltip"
          slotProps={{
            tooltip: { "data-testid": "custom-tooltip" } as any,
          }}
        >
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByTestId("custom-tooltip")).toBeInTheDocument();
    });

    it("should support enterTouchDelay and leaveTouchDelay props", () => {
      render(
        <DsTooltip
          heading="Touch delays"
          enterTouchDelay={100}
          leaveTouchDelay={2000}
        >
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render child in disabled state", () => {
      render(
        <DsTooltip heading="Tooltip Heading" description="Tooltip Description">
          <DsButton disabled>Hover me</DsButton>
        </DsTooltip>
      );
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("should handle open state", async () => {
      render(
        <DsTooltip heading="Always open" open={true}>
          <DsButton>Always visible</DsButton>
        </DsTooltip>
      );
      // Should be visible without hover when open=true
      expect(await screen.findByText("Always open")).toBeInTheDocument();
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply MUI tooltip classes", async () => {
      render(
        <DsTooltip heading="Test Heading" description="Test Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      const tooltip = await screen.findByText("Test Heading");
      expect(tooltip.parentElement).toHaveClass("MuiTooltip-tooltip");
    });

    it("should apply default wrapper (DsLink) styling", () => {
      render(
        <DsTooltip heading="Link wrapper">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      const wrapper = screen.getByRole("button").parentElement;
      expect(wrapper).toHaveClass("MuiLink-root");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should show tooltip on focus", async () => {
      render(
        <DsTooltip heading="Focus Heading" description="Focus Description">
          <DsButton>Focus me</DsButton>
        </DsTooltip>
      );

      const button = screen.getByRole("button", { name: "Focus me" });
      // Use userEvent to properly simulate focus interaction
      await user.click(button);

      expect(await screen.findByText("Focus Heading")).toBeInTheDocument();
      expect(await screen.findByText("Focus Description")).toBeInTheDocument();
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", async () => {
      render(
        <DsTooltip
          heading="Accessible Heading"
          description="Accessible Description"
        >
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));

      // The tooltip role is typically on the container that holds the tooltip content
      const tooltipElement = await screen.findByRole("tooltip");
      expect(tooltipElement).toBeInTheDocument();

      // Verify tooltip content is accessible
      expect(screen.getByText("Accessible Heading")).toBeInTheDocument();
      expect(screen.getByText("Accessible Description")).toBeInTheDocument();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle empty heading and description gracefully", async () => {
      render(
        <DsTooltip heading="" description="">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));

      // Tooltip element appears but should be empty or contain no meaningful content
      const tooltip = screen.queryByRole("tooltip");
      expect(tooltip).toBeInTheDocument();

      // The tooltip should essentially be empty (only arrow/container)
      const tooltipContent = tooltip?.textContent;
      expect(tooltipContent?.trim()).toBe("");
    });

    it("should handle long tooltip content", async () => {
      const longHeading = "H".repeat(100);
      const longDescription = "D".repeat(500);
      render(
        <DsTooltip heading={longHeading} description={longDescription}>
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByText(longHeading)).toBeInTheDocument();
      expect(await screen.findByText(longDescription)).toBeInTheDocument();
    });

    it("should handle null/undefined children gracefully", () => {
      render(
        <DsTooltip heading="Test" data-testid="tooltip">
          {<></>}
        </DsTooltip>
      );
      expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    });

    it("should handle special characters in content", async () => {
      const specialHeading = "Special: @#$%^&*()[]{}";
      const specialDescription = "Unicode: 测试 🌟 ñáéíóú";
      render(
        <DsTooltip heading={specialHeading} description={specialDescription}>
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      await user.hover(screen.getByRole("button"));
      expect(await screen.findByText(specialHeading)).toBeInTheDocument();
      expect(await screen.findByText(specialDescription)).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as help text in forms", async () => {
      render(
        <DsBox component="form">
          <DsBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DsTypography>Username</DsTypography>
            <DsTooltip
              heading="Username Requirements"
              description="Must be 3-20 characters, alphanumeric only"
            >
              <DsButton size="small">?</DsButton>
            </DsTooltip>
          </DsBox>
        </DsBox>
      );
      await user.hover(screen.getByRole("button"));
      expect(
        await screen.findByText("Username Requirements")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Must be 3-20 characters, alphanumeric only")
      ).toBeInTheDocument();
    });

    it("should work with icon as child", async () => {
      render(
        <DsTooltip heading="Information" description="Click for more details">
          <DsRemixIcon className="ri-plus-line" data-testid="ds-remix-icon" />
        </DsTooltip>
      );
      const icon = screen.getByTestId("ds-remix-icon");
      expect(icon).toHaveClass("ri-plus-line");
    });

    it("should work in navigation with custom wrapper", async () => {
      render(
        <DsBox sx={{ display: "flex", gap: 2 }}>
          <DsTooltip
            heading="Home"
            description="Go to homepage"
            slotProps={{ wrapper: { href: "/home" } }}
          >
            <DsTypography>Home</DsTypography>
          </DsTooltip>
          <DsTooltip
            heading="Settings"
            description="Configure your preferences"
            slotProps={{ wrapper: { href: "/settings" } }}
          >
            <DsTypography>Settings</DsTypography>
          </DsTooltip>
        </DsBox>
      );

      const homeLink = screen.getByRole("link", { name: /Home/i });
      expect(homeLink).toHaveAttribute("href", "/home");
      const settingsLink = screen.getByRole("link", { name: /Settings/i });
      expect(settingsLink).toHaveAttribute("href", "/settings");
    });

    it("should work in a data table context", async () => {
      render(
        <DsBox
          sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1 }}
        >
          <DsTypography variant="bodyBoldMedium">Name</DsTypography>
          <DsTypography variant="bodyBoldMedium">Status</DsTypography>
          <DsTypography variant="bodyBoldMedium">Actions</DsTypography>

          <DsTypography>John Doe</DsTypography>
          <DsTooltip
            heading="Active User"
            description="Last seen 2 minutes ago"
          >
            <DsTypography sx={{ color: "success.main", cursor: "help" }}>
              Active
            </DsTypography>
          </DsTooltip>
          <DsTooltip heading="Edit User" description="Modify user settings">
            <DsButton size="small">Edit</DsButton>
          </DsTooltip>
        </DsBox>
      );

      await user.hover(screen.getByText("Active"));
      expect(await screen.findByText("Active User")).toBeInTheDocument();
      expect(
        await screen.findByText("Last seen 2 minutes ago")
      ).toBeInTheDocument();
    });

    it("should work with custom wrapper for grouped elements", () => {
      render(
        <DsTooltip
          heading="Multiple Elements"
          description="This tooltip wraps multiple elements"
          slots={{ wrapper: DsBox }}
        >
          <DsBox sx={{ display: "flex", gap: 1 }}>
            <DsTypography>First</DsTypography>
            <DsTypography>Second</DsTypography>
          </DsBox>
        </DsTooltip>
      );

      expect(screen.getByText("First")).toBeInTheDocument();
      expect(screen.getByText("Second")).toBeInTheDocument();
      // Custom wrapper (DsBox) is used instead of default DsLink
      const wrapper =
        screen.getByText("First").closest("[role]") ||
        screen.getByText("First").parentElement;
      expect(wrapper).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should render correctly across all themes", () => {
      // Theme-specific expectations mapping for background colors
      const themeExpectations = {
        light: {
          expectedColor: PALETTE.tertiary100,
        },
        dark: {
          expectedColor: PALETTE.tertiary10,
        },
        highContrast: {
          expectedColor: PALETTE.highContrast1,
        },
      };

      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for background color validation
      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        const { container, unmount } = renderWithTheme(
          <DsTooltip
            description="description text"
            heading="Wrapper Style Test"
            style={{
              color: "var(--ds-colour-typoActionTertiary)",
            }}
          >
            <DsTypography data-testid={`tooltip-${colorScheme}`}>
              Hover me
            </DsTypography>
          </DsTooltip>,
          colorScheme
        );

        const tooltip = container.querySelector(
          `[data-testid="tooltip-${colorScheme}"]`
        ) as HTMLElement;

        expect(tooltip).toBeInTheDocument();

        // Verify theme context is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify the computed background color uses the correct CSS variable
        const computedStyles = window.getComputedStyle(tooltip);
        const actualColor = computedStyles.color;

        // The CSS variable should be applied
        expect(actualColor).toBe("var(--ds-colour-typoActionTertiary)");

        // Verify that the design system color for typoActionTertiary matches expected theme color
        const actualTypoActionTertiary =
          schemeData?.ds?.colour?.typoActionTertiary;
        expect(actualTypoActionTertiary).toBe(expectations.expectedColor);

        unmount();
      });
    });

    it("should maintain wrapper styling across themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTooltip heading="Wrapper Style Test">
            <DsButton data-testid={`btn-wrapper-${colorScheme}`}>
              Hover me
            </DsButton>
          </DsTooltip>
        ),
        (container, colorScheme) => {
          const button = container.querySelector(
            `[data-testid="btn-wrapper-${colorScheme}"]`
          );
          expect(button).toBeInTheDocument();

          // Default wrapper is DsLink
          const wrapper = button?.parentElement;
          expect(wrapper).toHaveClass("MuiLink-root");
        }
      );
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(
        <DsTooltip heading="Default Heading" description="Default Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with only heading", () => {
      const { container } = render(
        <DsTooltip heading="Only Heading">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(container.firstChild).toMatchSnapshot("dstooltip-heading-only");
    });

    it("should match snapshot with only description", () => {
      const { container } = render(
        <DsTooltip description="Only Description">
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(container.firstChild).toMatchSnapshot(
        "dstooltip-description-only"
      );
    });

    it("should match snapshot with custom wrapper", () => {
      const CustomWrapper = (props: any) => <DsBox {...props} />;
      const { container } = render(
        <DsTooltip
          heading="Custom Wrapper"
          description="With DsBox wrapper"
          slots={{ wrapper: CustomWrapper }}
        >
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(container.firstChild).toMatchSnapshot("dstooltip-custom-wrapper");
    });

    it("should match snapshot with different placements", () => {
      const placements = ["top", "bottom", "left", "right"] as const;
      placements.forEach((placement) => {
        const { container } = render(
          <DsTooltip heading={`${placement} tooltip`} placement={placement}>
            <DsButton>Hover me</DsButton>
          </DsTooltip>
        );
        expect(container.firstChild).toMatchSnapshot(
          `dstooltip-placement-${placement}`
        );
      });
    });

    it("should match snapshots across all themes", () => {
      const themes = ["light", "dark", "highContrast"] as const;
      themes.forEach((theme) => {
        const { container } = render(
          <DsTooltip
            heading={`${theme} Heading`}
            description={`Description for ${theme}`}
          >
            <DsButton>Hover me</DsButton>
          </DsTooltip>,
          { colorScheme: theme }
        );
        expect(container.firstChild).toMatchSnapshot(`dstooltip-${theme}`);
      });
    });

    it("should match snapshot with long content", () => {
      const longHeading = "H".repeat(100);
      const longDescription = "D".repeat(500);
      const { container } = render(
        <DsTooltip heading={longHeading} description={longDescription}>
          <DsButton>Hover me</DsButton>
        </DsTooltip>
      );
      expect(container.firstChild).toMatchSnapshot("dstooltip-long-content");
    });

    it("should match snapshot in real-world scenario", () => {
      const { container } = render(
        <DsBox sx={{ p: 2 }}>
          <DsTypography variant="headingBoldLarge" gutterBottom>
            User Profile Settings
          </DsTypography>
          <DsBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <DsTypography>Enable notifications</DsTypography>
            <DsTooltip
              heading="Notification Settings"
              description="Control how and when you receive notifications from the system"
              slotProps={{ wrapper: { href: "/help/notifications" } }}
            >
              <DsButton size="small" variant="outlined">
                ?
              </DsButton>
            </DsTooltip>
          </DsBox>
        </DsBox>
      );
      expect(container.firstChild).toMatchSnapshot(
        "dstooltip-real-world-scenario"
      );
    });
  });
});
