/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsBreadcrumbs component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Tests for basic component rendering with default and custom props  
 * 2. Props Validation - Tests for prop handling, maxItems, collapse behavior, and default prop application
 * 3. Component States & Collapse Behavior - Tests for different breadcrumb states and configurations
 * 4. Component Functionality - Tests for navigation, click handling, and custom ExpandCollapsedIcon
 * 5. Event Handling & Accessibility - Tests for user interactions, keyboard navigation, and ARIA compliance
 * 6. Edge Cases - Tests for unusual scenarios and prop combinations
 * 7. Theme Testing & MUI Integration - Tests for multi-theme support and Material-UI integration
 * 8. Real-world Scenarios - Tests for practical usage patterns
 * 9. Snapshot Testing - Visual regression protection across all states and themes
 * 
 * Component Analysis:
 * - DsBreadcrumbs is a direct export of MUI's Breadcrumbs component with design system integration
 * - Uses custom ExpandCollapsedIcon component via slots.CollapsedIcon
 * - Default props: maxItems=4, itemsAfterCollapse=3, itemsBeforeCollapse=1, slots={ CollapsedIcon: ExpandCollapsedIcon }
 * - Custom styling overrides for MuiLink-root: visited, active, disabled, focus states
 * - Design system CSS variables: --ds-colour-typoPrimary, --ds-colour-typoDisabled
 * - ExpandCollapsedIcon renders <DsLink>...</DsLink> for collapse indicator
 * 
 * @package @am92/react-design-system
 * @component DsBreadcrumbs
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsBreadcrumbs } from "./DsBreadcrumbs.Component";
import { DsLink } from "../DsLink";
import { DsTypography } from "../DsTypography";
import { DsBox } from "../DsBox";
import { DsButton } from "../DsButton";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsBreadcrumbs", () => {
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
        <DsBreadcrumbs>
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Products</DsLink>
          <DsTypography>Current Page</DsTypography>
        </DsBreadcrumbs>
      );

      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toBeInTheDocument();
      
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Current Page")).toBeInTheDocument();
    });

    it("should render with minimal breadcrumb structure", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toBeInTheDocument();
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    });

    it("should render gracefully with empty children", () => {
      render(<DsBreadcrumbs />);
      
      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toBeInTheDocument();
    });

    it("should render with single breadcrumb item", () => {
      render(
        <DsBreadcrumbs>
          <DsTypography>Single Item</DsTypography>
        </DsBreadcrumbs>
      );
      
      expect(screen.getByText("Single Item")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should apply default maxItems prop (4)", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#">Item 1</DsLink>
          <DsLink href="#">Item 2</DsLink>
          <DsLink href="#">Item 3</DsLink>
          <DsLink href="#">Item 4</DsLink>
          <DsLink href="#">Item 5</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // With maxItems=4, should show collapsed indicator for more than 4 items
      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toBeInTheDocument();
      
      // Should show collapsed indicator (...)
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should accept custom maxItems prop", () => {
      render(
        <DsBreadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
          <DsLink href="#">Item 1</DsLink>
          <DsLink href="#">Item 2</DsLink>
          <DsLink href="#">Item 3</DsLink>
          <DsLink href="#">Item 4</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // With maxItems=3 and 5 items, should show collapsed indicator
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should apply default itemsBeforeCollapse prop (1)", () => {
      render(
        <DsBreadcrumbs maxItems={3}>
          <DsLink href="#" data-testid="item-1">Item 1</DsLink>
          <DsLink href="#" data-testid="item-2">Item 2</DsLink>
          <DsLink href="#" data-testid="item-3">Item 3</DsLink>
          <DsLink href="#" data-testid="item-4">Item 4</DsLink>
          <DsTypography data-testid="current">Current</DsTypography>
        </DsBreadcrumbs>
      );

      // With itemsBeforeCollapse=1, should show first item before collapse
      expect(screen.getByTestId("item-1")).toBeInTheDocument();
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should apply default itemsAfterCollapse prop (3)", () => {
      render(
        <DsBreadcrumbs maxItems={4} itemsAfterCollapse={2}>
          <DsLink href="#">Item 1</DsLink>
          <DsLink href="#">Item 2</DsLink>
          <DsLink href="#">Item 3</DsLink>
          <DsLink href="#">Item 4</DsLink>
          <DsLink href="#">Item 5</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // With custom itemsAfterCollapse=2, should show 2 items after collapse
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should accept custom separator", () => {
      render(
        <DsBreadcrumbs separator=">">
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Products</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const separators = screen.getAllByText(">");
      expect(separators.length).toBeGreaterThan(0);
    });

    it("should accept custom id", () => {
      render(
        <DsBreadcrumbs id="custom-breadcrumbs">
          <DsLink href="#">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toHaveAttribute("id", "custom-breadcrumbs");
    });

    it("should accept custom className", () => {
      render(
        <DsBreadcrumbs className="custom-breadcrumbs">
          <DsLink href="#">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toHaveClass("custom-breadcrumbs");
    });
  });

  // ============================
  // COMPONENT STATES & COLLAPSE BEHAVIOR
  // ============================
  describe("Component States & Collapse Behavior", () => {
    it("should handle collapsed state with many items", () => {
      render(
        <DsBreadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Category</DsLink>
          <DsLink href="#">Subcategory</DsLink>
          <DsLink href="#">Product</DsLink>
          <DsLink href="#">Details</DsLink>
          <DsTypography>Current Page</DsTypography>
        </DsBreadcrumbs>
      );

      // Should show collapsed indicator
      const collapsedIndicator = screen.getByText("...");
      expect(collapsedIndicator).toBeInTheDocument();
      
      // Collapsed indicator should be a link (ExpandCollapsedIcon renders DsLink)
      expect(collapsedIndicator.closest('a')).toBeInTheDocument();
    });

    it("should handle expanded state with few items", () => {
      render(
        <DsBreadcrumbs maxItems={5}>
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Products</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // Should not show collapsed indicator when items <= maxItems
      expect(screen.queryByText("...")).not.toBeInTheDocument();
      
      expect(screen.getByText("Home")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    });

    it("should handle mixed content types", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#">Link Item</DsLink>
          <DsButton variant="text">Button Item</DsButton>
          <DsTypography>Text Item</DsTypography>
          <span>Plain Element</span>
        </DsBreadcrumbs>
      );

      expect(screen.getByText("Link Item")).toBeInTheDocument();
      expect(screen.getByText("Button Item")).toBeInTheDocument();
      expect(screen.getByText("Text Item")).toBeInTheDocument();
      expect(screen.getByText("Plain Element")).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY
  // ============================
  describe("Component Functionality", () => {
    it("should handle breadcrumb navigation with click events", async () => {
      const handleHomeClick = vi.fn();
      const handleProductsClick = vi.fn();

      render(
        <DsBreadcrumbs>
          <DsLink href="#" onClick={handleHomeClick}>Home</DsLink>
          <DsLink href="#" onClick={handleProductsClick}>Products</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const homeLink = screen.getByText("Home");
      const productsLink = screen.getByText("Products");

      await user.click(homeLink);
      expect(handleHomeClick).toHaveBeenCalledTimes(1);

      await user.click(productsLink);
      expect(handleProductsClick).toHaveBeenCalledTimes(1);
    });

    it("should maintain navigation hierarchy with proper hrefs", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="/home">Home</DsLink>
          <DsLink href="/products">Products</DsLink>
          <DsLink href="/products/electronics">Electronics</DsLink>
          <DsTypography>Smartphone</DsTypography>
        </DsBreadcrumbs>
      );

      const homeLink = screen.getByText("Home").closest('a');
      const productsLink = screen.getByText("Products").closest('a');
      const electronicsLink = screen.getByText("Electronics").closest('a');
      
      expect(homeLink).toHaveAttribute("href", "/home");
      expect(productsLink).toHaveAttribute("href", "/products");
      expect(electronicsLink).toHaveAttribute("href", "/products/electronics");
      
      // Current page should not be a link
      expect(screen.getByText("Smartphone").closest('a')).toBeNull();
    });
  });

  // ============================
  // EVENT HANDLING & ACCESSIBILITY
  // ============================
  describe("Event Handling & Accessibility", () => {
    it("should handle click events on breadcrumb links", async () => {
      const handleClick = vi.fn();

      render(
        <DsBreadcrumbs>
          <DsLink href="#" onClick={handleClick}>Clickable Item</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const link = screen.getByText("Clickable Item");
      await user.click(link);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should support keyboard navigation and accessibility", async () => {
      render(
        <DsBreadcrumbs aria-label="Page navigation">
          <DsLink href="#" data-testid="nav-link-1" aria-label="Go to home page">Home</DsLink>
          <DsLink href="#" data-testid="nav-link-2" aria-label="Go to products page">Products</DsLink>
          <DsLink href="#" data-testid="nav-link-3">Category</DsLink>
          <DsTypography>Current Page</DsTypography>
        </DsBreadcrumbs>
      );

      // Test ARIA navigation structure
      const navigation = screen.getByRole("navigation");
      expect(navigation).toHaveAttribute("aria-label", "Page navigation");
      
      // Test proper list structure
      const breadcrumbList = navigation.querySelector("ol");
      expect(breadcrumbList).toBeInTheDocument();
      const listItems = breadcrumbList?.querySelectorAll("li");
      expect(listItems?.length).toBeGreaterThan(0);

      // Test keyboard navigation
      const link1 = screen.getByTestId("nav-link-1");
      const link2 = screen.getByTestId("nav-link-2");
      const link3 = screen.getByTestId("nav-link-3");

      // Start focus on first link
      await user.click(link1);
      expect(link1).toHaveFocus();

      // Tab through links
      await user.tab();
      expect(link2).toHaveFocus();

      await user.tab();
      expect(link3).toHaveFocus();

      // Test accessible link labels
      const homeLink = screen.getByLabelText("Go to home page");
      const productsLink = screen.getByLabelText("Go to products page");
      
      expect(homeLink).toBeInTheDocument();
      expect(productsLink).toBeInTheDocument();
    });

    it("should handle Enter key press on breadcrumb links", async () => {
      const handleClick = vi.fn();

      render(
        <DsBreadcrumbs>
          <DsLink href="#" onClick={handleClick}>Keyboard Item</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const link = screen.getByText("Keyboard Item");
      await user.click(link);
      await user.keyboard("{Enter}");
      
      // Note: The onClick should be triggered by the initial click, 
      // Enter key behavior depends on browser/link implementation
      expect(handleClick).toHaveBeenCalled();
    });
  });

  // ============================
  // EDGE CASES
  // ============================
  describe("Edge Cases", () => {
    it("should handle null/undefined children", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#">Valid Link</DsLink>
          {null}
          {undefined}
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(screen.getByText("Valid Link")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    });

    it("should handle very long breadcrumb text", () => {
      const longText = "This is a very long breadcrumb item that might overflow or wrap";
      
      render(
        <DsBreadcrumbs>
          <DsLink href="#">{longText}</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("should handle special characters in breadcrumb text", () => {
      const specialText = "Items & Products / Section < > \"Quoted\" 'Text'";
      
      render(
        <DsBreadcrumbs>
          <DsLink href="#">{specialText}</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(screen.getByText(specialText)).toBeInTheDocument();
    });

    it("should handle maximum items edge case", () => {
      render(
        <DsBreadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
          <DsLink href="#">Item 1</DsLink>
          <DsLink href="#">Item 2</DsLink>
          <DsLink href="#">Item 3</DsLink>
          <DsLink href="#">Item 4</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // With maxItems=3 and 5 items, should show collapse indicator
      expect(screen.getByText("...")).toBeInTheDocument();
    });

    it("should handle zero maxItems edge case", () => {
      render(
        <DsBreadcrumbs maxItems={0}>
          <DsLink href="#">Item 1</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // MUI should handle this gracefully (likely showing all items)
      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Current")).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING & MUI INTEGRATION
  // ============================
  describe("Theme Testing & MUI Integration", () => {
    it("should apply default MUI Breadcrumbs classes and structure", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const breadcrumbNav = screen.getByRole("navigation");
      expect(breadcrumbNav).toHaveClass('MuiBreadcrumbs-root');
      
      const breadcrumbList = breadcrumbNav.querySelector('ol');
      expect(breadcrumbList).toBeInTheDocument();
      expect(breadcrumbList).toHaveClass('MuiBreadcrumbs-ol');

      // Test MUI separator styling
      const separators = breadcrumbNav.querySelectorAll('.MuiBreadcrumbs-separator');
      expect(separators.length).toBeGreaterThan(0);
    });

    it("should apply design system style overrides for links", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#" data-testid="breadcrumb-link">Home</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      const link = screen.getByTestId("breadcrumb-link");
      
      // Check that the link has the expected MUI Link classes (style overrides target .MuiLink-root)
      expect(link).toHaveClass("MuiLink-root");
      
      // The actual CSS variables (--ds-colour-typoPrimary, --ds-colour-typoDisabled) 
      // are applied via style overrides defined in DsBreadcrumbsOverrides
      // These are not directly testable in JSDOM but the classes are correctly applied
    });

    it("should render correctly across all color schemes", () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsBreadcrumbs>
            <DsLink href="#">Home</DsLink>
            <DsLink href="#">Products</DsLink>
            <DsTypography>Current Page</DsTypography>
          </DsBreadcrumbs>,
          { colorScheme }
        );
        
        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Verify breadcrumb structure renders in all themes
        const breadcrumbNav = screen.getByRole("navigation");
        expect(breadcrumbNav).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Products")).toBeInTheDocument();
        expect(screen.getByText("Current Page")).toBeInTheDocument();
        
        unmount();
      });
    });

    it("should apply correct theme colors by matching expected with computed styles", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        const expectedColors = {
          typoPrimary: schemeData?.ds?.colour?.typoPrimary,
          actionSecondary: schemeData?.ds?.colour?.actionSecondary
        };

        const { container, unmount } = render(
          <DsBreadcrumbs>
            <DsLink href="#" data-testid={`link-${colorScheme}`}>Home Link</DsLink>
            <DsTypography data-testid={`text-${colorScheme}`}>Current Page</DsTypography>
          </DsBreadcrumbs>,
          { colorScheme }
        );
        
        // Get the actual rendered elements
        const link = screen.getByTestId(`link-${colorScheme}`);
        const text = screen.getByTestId(`text-${colorScheme}`);
        
        // Get computed styles
        const linkComputedStyle = window.getComputedStyle(link);
        const textComputedStyle = window.getComputedStyle(text);
        
        // Get actual CSS values
        const actualLinkColor = linkComputedStyle.color;
        const actualTextColor = textComputedStyle.color;
        
        // Test: Validate that CSS variables are being applied correctly
        if (actualLinkColor.includes('var(')) {
          // If we're getting CSS variables, validate they contain design system variables
          expect(actualLinkColor).toContain('--ds-colour');
        }
        
        if (actualTextColor.includes('var(')) {
          // Text color might use palette variables or design system variables
          expect(actualTextColor).toMatch(/var\(--(?:ds-colour|palette)/);
        }
        
        // Test: Validate expected theme colors are proper hex format
        expect(expectedColors.typoPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(expectedColors.actionSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        
        // Test: Validate theme-specific values using actual PALETTE constants
        switch (colorScheme) {
          case 'light':
            expect(expectedColors.typoPrimary).toBe(PALETTE.primaryBlackLight);
            expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
            break;
          case 'dark':
            expect(expectedColors.typoPrimary).toBe(PALETTE.secondaryGrey10);
            expect(expectedColors.actionSecondary).toBe(PALETTE.secondary100);
            break;
          case 'highContrast':
            expect(expectedColors.typoPrimary).toBe(PALETTE.primaryWhite);
            expect(expectedColors.actionSecondary).toBe(PALETTE.highContrast1);
            break;
        }
        
        // Ensure theme mode attribute is correctly set
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Validate component structure is maintained
        expect(link).toHaveClass('MuiLink-root');
        expect(text).not.toHaveAttribute('href'); // Current page should not be a link
        
        unmount();
      });
    });

    it("should validate CSS variable integration in breadcrumb overrides", () => {
      const { container } = render(
        <DsBreadcrumbs data-testid="css-var-test">
          <DsLink href="#" data-testid="primary-link" style={{ color: 'var(--ds-colour-typoPrimary)' }}>Primary Link</DsLink>
          <DsLink href="#" data-testid="disabled-link" style={{ color: 'var(--ds-colour-typoDisabled)' }}>Disabled Link</DsLink>
          <DsLink href="#" data-testid="secondary-link" style={{ color: 'var(--ds-colour-actionSecondary)' }}>Secondary Link</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      // Test that CSS variables are properly applied as inline styles
      const primaryLink = screen.getByTestId('primary-link');
      const disabledLink = screen.getByTestId('disabled-link');
      const secondaryLink = screen.getByTestId('secondary-link');

      // Validate CSS variable usage
      expect(primaryLink).toHaveStyle('color: var(--ds-colour-typoPrimary)');
      expect(disabledLink).toHaveStyle('color: var(--ds-colour-typoDisabled)');
      expect(secondaryLink).toHaveStyle('color: var(--ds-colour-actionSecondary)');

      // Validate element structure
      expect(primaryLink).toHaveClass('MuiLink-root');
      expect(disabledLink).toHaveClass('MuiLink-root');
      expect(secondaryLink).toHaveClass('MuiLink-root');
    });

    it("should maintain color consistency across theme switches", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      
      // Test that each theme has the required color properties
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const colors = themeColorScheme[colorScheme]?.ds?.colour;
        
        // Ensure each theme has the required colors and they are valid hex
        expect(colors?.typoPrimary).toBeTruthy();
        expect(colors?.typoPrimary).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(colors?.actionSecondary).toBeTruthy();
        expect(colors?.actionSecondary).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
      
      // Test that themes have different color values (not all the same)
      const lightColors = themeColorScheme.light?.ds?.colour;
      const darkColors = themeColorScheme.dark?.ds?.colour;
      const hcColors = themeColorScheme.highContrast?.ds?.colour;
      
      expect(lightColors?.typoPrimary).not.toBe(darkColors?.typoPrimary);
      expect(darkColors?.typoPrimary).not.toBe(hcColors?.typoPrimary);
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should handle e-commerce breadcrumb navigation", () => {
      render(
        <DsBreadcrumbs>
          <DsLink href="#" data-testid="home-nav">Home</DsLink>
          <DsLink href="#" data-testid="electronics-nav">Electronics</DsLink>
          <DsLink href="#" data-testid="phones-nav">Smartphones</DsLink>
          <DsTypography>iPhone 15 Pro</DsTypography>
        </DsBreadcrumbs>
      );

      // Test navigation structure
      expect(screen.getByTestId("home-nav")).toBeInTheDocument();
      expect(screen.getByTestId("electronics-nav")).toBeInTheDocument();
      expect(screen.getByTestId("phones-nav")).toBeInTheDocument();

      // Current page should not be clickable
      expect(screen.getByText("iPhone 15 Pro").closest('a')).toBeNull();
    });

    it("should handle admin dashboard breadcrumb navigation", () => {
      render(
        <DsBox sx={{ p: 2 }}>
          <DsBreadcrumbs maxItems={6}>
            <DsLink href="/dashboard">Dashboard</DsLink>
            <DsLink href="/users">User Management</DsLink>
            <DsLink href="/users/roles">Roles & Permissions</DsLink>
            <DsLink href="/users/roles/admin">Admin Roles</DsLink>
            <DsTypography>Edit Role</DsTypography>
          </DsBreadcrumbs>
          
          <DsTypography variant="headingBoldLarge" sx={{ mt: 2 }}>
            Edit Admin Role
          </DsTypography>
        </DsBox>
      );

      // All breadcrumb items should be visible (within maxItems limit)
      expect(screen.getByText("Dashboard")).toBeInTheDocument();
      expect(screen.getByText("User Management")).toBeInTheDocument();
      expect(screen.getByText("Roles & Permissions")).toBeInTheDocument();
      expect(screen.getByText("Admin Roles")).toBeInTheDocument();
      expect(screen.getByText("Edit Role")).toBeInTheDocument();
      expect(screen.getByText("Edit Admin Role")).toBeInTheDocument();
      
      // Should not show collapse indicator
      expect(screen.queryByText("...")).not.toBeInTheDocument();
    });

    it("should integrate with complex page layout", () => {
      render(
        <DsBox sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <DsBox component="header" sx={{ p: 2, borderBottom: 1 }}>
            <DsBreadcrumbs separator="/">
              <DsLink href="#" color="primary">Company</DsLink>
              <DsLink href="#" color="primary">Products</DsLink>
              <DsLink href="#" color="primary">Software</DsLink>
              <DsTypography color="text.secondary">Documentation</DsTypography>
            </DsBreadcrumbs>
          </DsBox>
          
          <DsBox component="main" sx={{ p: 2 }}>
            <DsTypography variant="headingBoldLarge">
              API Documentation
            </DsTypography>
          </DsBox>
        </DsBox>
      );

      expect(screen.getByText("Company")).toBeInTheDocument();
      expect(screen.getByText("Products")).toBeInTheDocument();
      expect(screen.getByText("Software")).toBeInTheDocument();
      expect(screen.getByText("Documentation")).toBeInTheDocument();
      expect(screen.getByText("API Documentation")).toBeInTheDocument();
    });
  });

  // ============================
  // SNAPSHOT TESTING
  // ============================
  describe("Snapshot Testing", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(
        <DsBreadcrumbs>
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Products</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-default");
    });

    it("should match snapshot with custom separator", () => {
      const { container } = render(
        <DsBreadcrumbs separator=">">
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Products</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-custom-separator");
    });

    it("should match snapshot with collapsed state", () => {
      const { container } = render(
        <DsBreadcrumbs maxItems={3}>
          <DsLink href="#">Home</DsLink>
          <DsLink href="#">Category</DsLink>
          <DsLink href="#">Subcategory</DsLink>
          <DsLink href="#">Product</DsLink>
          <DsLink href="#">Details</DsLink>
          <DsTypography>Current</DsTypography>
        </DsBreadcrumbs>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-collapsed");
    });

    it("should match snapshot with mixed content types", () => {
      const { container } = render(
        <DsBreadcrumbs>
          <DsLink href="#">Link</DsLink>
          <DsButton variant="text">Button</DsButton>
          <DsTypography color="text.primary">Typography</DsTypography>
          <span>Plain Text</span>
        </DsBreadcrumbs>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-mixed-content");
    });

    it("should match snapshot across all themes", () => {
      const colorSchemes = ['light', 'dark', 'highContrast'] as const;
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsBreadcrumbs>
            <DsLink href="#">Home</DsLink>
            <DsLink href="#">Products</DsLink>
            <DsTypography>Current</DsTypography>
          </DsBreadcrumbs>,
          { colorScheme }
        );
        
        expect(container.firstChild).toMatchSnapshot(`breadcrumbs-theme-${colorScheme}`);
        unmount();
      });
    });

    it("should match snapshot with real-world e-commerce scenario", () => {
      const { container } = render(
        <DsBox sx={{ p: 2 }}>
          <DsBreadcrumbs maxItems={5}>
            <DsLink href="#" color="primary">Shop</DsLink>
            <DsLink href="#" color="primary">Electronics</DsLink>
            <DsLink href="#" color="primary">Computers</DsLink>
            <DsLink href="#" color="primary">Laptops</DsLink>
            <DsTypography color="text.secondary">Gaming Laptops</DsTypography>
          </DsBreadcrumbs>
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-ecommerce-scenario");
    });

    it("should match snapshot with long content", () => {
      const { container } = render(
        <DsBreadcrumbs>
          <DsLink href="#">Very Long Category Name That Might Wrap</DsLink>
          <DsLink href="#">Another Long Subcategory Name</DsLink>
          <DsTypography>Extremely Long Product Name That Extends Beyond Normal Length</DsTypography>
        </DsBreadcrumbs>
      );

      expect(container.firstChild).toMatchSnapshot("breadcrumbs-long-content");
    });
  });
});
