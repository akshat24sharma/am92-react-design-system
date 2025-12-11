/**
 * @vitest-environment jsdom
 *
 * Test suite for DsAvatar component
 *
 * Testing Strategy:
 * 1. Core Rendering - Tests for correct rendering with different props and variants
 * 2. Props Validation - Tests for prop handling and ds-variant/ds-size specific behavior
 * 3. Component States - Tests for different avatar states (with image, fallback, children)
 * 4. MUI Styling - Tests for Material-UI Avatar integration and CSS classes
 * 5. Event Handling - Tests for click and other user interactions
 * 6. Accessibility - Tests for ARIA attributes and screen reader support
 * 7. Edge Cases - Tests for unusual scenarios and prop combinations
 * 8. Theme Testing - Tests for multi-theme support
 * 9. Real-world Scenarios - Tests for practical usage patterns
 * 10. Snapshot Testing - Visual regression prevention
 *
 * @package @am92/react-design-system
 * @component DsAvatar
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "../../Tests/Mocks/testUtils";
import { renderWithoutTheme, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsAvatar } from "./DsAvatar.Component";
import { DsRemixIcon } from "../DsRemixIcon";
import { DsBox } from "../DsBox";
import { DsTypography } from "../DsTypography";
import { H } from "vitest/dist/chunks/environment.d.cL3nLXbE";
import { PALETTE } from "../../Constants";
import getColorScheme from "../../Theme/getColorScheme";

describe("DsAvatar Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsAvatar ds-size="L" />);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("MuiAvatar-circular");
      expect(avatar).toHaveAttribute("ds-size", "L");
    });

    it("should render with text variant", () => {
      render(
        <DsAvatar ds-variant="text" ds-size="M">
          AB
        </DsAvatar>
      );
      const avatar = screen.getByText("AB");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("MuiAvatar-root");
      expect(avatar).toHaveClass("MuiAvatar-circular");
      expect(avatar).toHaveAttribute("ds-size", "M");
    });

    it("should render with icon variant", () => {
      render(
        <DsAvatar ds-variant="icon" ds-size="M">
          <DsRemixIcon
            className="ri-moon-line"
            color="secondary"
            data-testid="ds-remix-icon"
          />
        </DsAvatar>
      );
      const avatar = document.querySelector(".MuiAvatar-root");
      const icon = screen.getByTestId("ds-remix-icon");
      expect(avatar).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("ri-moon-line");
    });

    it("should render with image source", () => {
      render(
        <DsAvatar
          ds-size="L"
          src="https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
          alt="User Avatar"
        />
      );
      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute(
        "src",
        "https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
      );
      expect(avatar).toHaveAttribute("alt", "User Avatar");
    });

    it("should render fallback when image fails to load", async () => {
      render(
        <DsAvatar ds-size="L" src="invalid-image-url.jpg" alt="User Avatar">
          FB
        </DsAvatar>
      );

      const avatar = screen.getByRole("img");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute("src", "invalid-image-url.jpg");
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept ds-size prop with all valid values", () => {
      const sizes: Array<"S" | "M" | "L" | "XL" | "XXL" | "3XL"> = [
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "3XL",
      ];

      sizes.forEach((size) => {
        const { container, unmount } = render(
          <DsAvatar ds-size={size} data-testid={`avatar-${size}`}>
            {size}
          </DsAvatar>
        );

        const avatar = screen.getByTestId(`avatar-${size}`);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveClass("MuiAvatar-root");
        expect(avatar).toHaveAttribute("ds-size", size);

        unmount();
      });
    });

    it("should accept ds-variant prop with valid values", () => {
      const variants: Array<"text" | "icon" | undefined> = ["text", "icon"];

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <DsAvatar
            ds-variant={variant}
            ds-size="M"
            data-testid={`avatar-${variant || "default"}`}
          >
            Content
          </DsAvatar>
        );

        const avatar = screen.getByTestId(`avatar-${variant || "default"}`);
        expect(avatar).toBeInTheDocument();

        unmount();
      });
    });

    it("should forward all MUI Avatar props", () => {
      render(
        <DsAvatar
          ds-size="L"
          id="custom-avatar"
          className="custom-class"
          sx={{ bgcolor: "primary.main" }}
          title="Custom Avatar"
        >
          CA
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      expect(avatar).toHaveAttribute("id", "custom-avatar");
      expect(avatar).toHaveClass("custom-class");
      expect(avatar).toHaveAttribute("title", "Custom Avatar");

      // Test computed styles for sx prop
      const computedStyles = window.getComputedStyle(avatar);
      expect(computedStyles.backgroundColor).toBe(
        "var(--palette-primary-main)"
      );
    });

    it("should handle alt text properly", () => {
      render(
        <DsAvatar
          ds-size="M"
          alt="Profile picture of a girl"
          src="https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
        />
      );

      const avatar = screen.getByAltText("Profile picture of a girl");
      expect(avatar).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should display text content when no image is provided", () => {
      render(<DsAvatar ds-size="L">JD</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toHaveTextContent("JD");
    });

    it("should handle empty children gracefully", () => {
      render(<DsAvatar ds-size="L" />);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("MuiAvatar-root");
    });

    it("should handle complex children content", () => {
      render(
        <DsAvatar ds-size="L">
          <DsBox data-testid="complex-child">
            <DsTypography>Complex</DsTypography>
            <DsTypography>Content</DsTypography>
          </DsBox>
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root");
      const complexChild = document.querySelector(
        "[data-testid='complex-child']"
      );
      expect(avatar).toBeInTheDocument();
      expect(complexChild).toBeInTheDocument();
      expect(complexChild).toHaveTextContent("ComplexContent");
    });

    it("should prioritize image over children when both are provided", () => {
      render(
        <DsAvatar
          ds-size="L"
          src="https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
          alt="Profile picture of a girl"
        >
          Fallback Text
        </DsAvatar>
      );

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAttribute(
        "src",
        "https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
      );
      // Children should not be visible when image is loaded
      expect(screen.queryByText("Fallback Text")).toBeNull();
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI Avatar classes", () => {
      render(<DsAvatar ds-size="M" />);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toHaveClass("MuiAvatar-root");
    });

    it("should apply circular shape by default", () => {
      render(<DsAvatar ds-size="M" />);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toHaveClass("MuiAvatar-circular");
    });

    it("should support different MUI variants", () => {
      render(<DsAvatar ds-size="M" variant="square" />);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toHaveClass("MuiAvatar-square");
    });

    it("should apply custom sx prop styling", () => {
      render(
        <DsAvatar
          ds-size="M"
          sx={{
            bgcolor: "secondary.main",
            width: 100,
            height: 100,
          }}
        />
      );
      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      expect(avatar).toBeInTheDocument();
      // Test computed styles for sx prop
      const computedStyles = window.getComputedStyle(avatar);
      expect(computedStyles.backgroundColor).toBe(
        "var(--palette-secondary-main)"
      );
      expect(computedStyles.width).toBe("100px");
      expect(computedStyles.height).toBe("100px");
    });

    it("should handle color variants", () => {
      render(
        <DsAvatar
          ds-size="M"
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          P
        </DsAvatar>
      );
      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent("P");
      const computedStyles = window.getComputedStyle(avatar);
      expect(computedStyles.backgroundColor).toBe(
        "var(--palette-primary-main)"
      );
      expect(computedStyles.color).toBe("var(--palette-primary-contrastText)");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      render(
        <DsAvatar
          ds-size="M"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          Click Me
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      await user.click(avatar);
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(Object));
    });

    it("should handle keyboard events", async () => {
      const handleKeyDown = vi.fn();
      render(
        <DsAvatar ds-size="M" onKeyDown={handleKeyDown} tabIndex={0}>
          KB
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      avatar.focus();
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });

    it("should handle mouse events", async () => {
      const handleMouseEnter = vi.fn();
      const handleMouseLeave = vi.fn();
      render(
        <DsAvatar
          ds-size="M"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          Hover
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root") as HTMLElement;
      await user.hover(avatar);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);

      await user.unhover(avatar);
      expect(handleMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should not have img role by default", () => {
      render(<DsAvatar ds-size="M"></DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      const img = screen.queryByRole("img");
      expect(img).not.toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
    });

    it("should support custom ARIA labels", () => {
      render(
        <DsAvatar ds-size="M" aria-label="User profile picture">
          UP
        </DsAvatar>
      );
      const avatar = screen.getByLabelText("User profile picture");
      expect(avatar).toHaveAttribute("aria-label", "User profile picture");
    });

    it("should handle alt text for screen readers", () => {
      render(
        <DsAvatar
          ds-size="M"
          alt="Avatar of John Smith"
          src="https://example.com/john.jpg"
        />
      );
      const avatar = screen.getByAltText("Avatar of John Smith");
      expect(avatar).toHaveAttribute("alt", "Avatar of John Smith");
    });

    it("should be focusable when interactive", () => {
      const handleClick = vi.fn();
      render(
        <DsAvatar
          ds-size="M"
          onClick={handleClick}
          tabIndex={0}
          aria-label="Clickable avatar"
        >
          C
        </DsAvatar>
      );

      const avatar = screen.getByLabelText("Clickable avatar");
      expect(avatar).toBeInTheDocument();

      avatar.focus();
      expect(avatar).toHaveFocus();
    });

    it("should support describedby relationships", () => {
      render(
        <DsBox>
          <DsAvatar ds-size="M" aria-describedby="avatar-description">
            Test
          </DsAvatar>
          <DsTypography id="avatar-description">
            This is a test avatar
          </DsTypography>
        </DsBox>
      );

      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toHaveAttribute("aria-describedby", "avatar-description");
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null children gracefully", () => {
      render(<DsAvatar ds-size="M">{null}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle undefined children gracefully", () => {
      render(<DsAvatar ds-size="M">{undefined}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle empty string children", () => {
      render(<DsAvatar ds-size="M">{""}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
    });

    it("should handle very long text content", () => {
      const longText =
        "This is a very long text that exceeds normal avatar content";
      render(<DsAvatar ds-size="M">{longText}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent(longText);
    });

    it("should handle special characters in content", () => {
      const specialChars = "!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/~`";
      render(<DsAvatar ds-size="M">{specialChars}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent(specialChars);
    });

    it("should handle unicode characters", () => {
      const unicodeText = "🚀 测试 ñáéíóú αβγδε";
      render(<DsAvatar ds-size="M">{unicodeText}</DsAvatar>);
      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveTextContent(unicodeText);
    });

    it("should handle invalid image URLs gracefully", async () => {
      // Mock console.error to avoid error logs in test output
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});

      render(
        <DsAvatar ds-size="M" src="not-a-valid-url" alt="Invalid image">
          Fallback
        </DsAvatar>
      );

      const avatar = document.querySelector(".MuiAvatar-root");
      expect(avatar).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });

  // ============================
  // THEME TESTING TESTS
  // ============================
  describe("Theme Testing", () => {
    it("should render consistently across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsAvatar ds-size="M" data-testid={`avatar-${colorScheme}`}>
            {colorScheme.charAt(0).toUpperCase()}
          </DsAvatar>
        ),
        (container, colorScheme) => {
          const avatar = container.querySelector(
            `[data-testid="avatar-${colorScheme}"]`
          );
          expect(avatar).toBeInTheDocument();
          expect(avatar).toHaveClass("MuiAvatar-root");
        }
      );
    });

    it("should handle theme color schemes properly", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;
      const themeColorScheme = getColorScheme(PALETTE);

      // Theme-specific expectations mapping
      const themeExpectations = {
        light: {
          expectedTypoColor: PALETTE.successGreen,
        },
        dark: {
          expectedTypoColor: PALETTE.successGreenDark,
        },
        highContrast: {
          expectedTypoColor: PALETTE.highContrast2,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = render(
          <DsAvatar
            ds-size="M"
            sx={{
              backgroundColor: "var(--ds-colour-iconPositive)",
            }}
          >
            T
          </DsAvatar>,
          { colorScheme }
        );

        const themeContainer = container.firstChild as HTMLElement;
        expect(themeContainer).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        const avatar = container.querySelector(
          ".MuiAvatar-root"
        ) as HTMLElement;
        // Test that DsLink renders with correct colors for this theme
        const styles = window.getComputedStyle(avatar);

        // Verify DsLink color matches theme's primary action color
        expect(styles.backgroundColor).toBeDefined();
        expect(styles.backgroundColor).not.toBe("");
        // The textDecorationColor should use the CSS variable for typoActionPrimary
        expect(styles.backgroundColor).toBe("var(--ds-colour-iconPositive)");

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        const actualIconPositive = schemeData?.ds?.colour?.iconPositive;
        expect(actualIconPositive).toBe(expectations.expectedTypoColor);

        unmount();
      });
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as user profile avatar", () => {
      render(
        <DsBox data-testid="user-profile">
          <DsAvatar
            ds-size="L"
            src="https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
            alt="John Doe's profile picture"
            onClick={vi.fn()}
            style={{ cursor: "pointer" }}
          />
          <DsTypography>John Doe</DsTypography>
        </DsBox>
      );

      const profile = screen.getByTestId("user-profile");
      const avatar = screen.getByAltText("John Doe's profile picture");
      const name = screen.getByText("John Doe");

      expect(profile).toBeInTheDocument();
      expect(avatar).toBeInTheDocument();
      expect(name).toBeInTheDocument();
    });

    it("should work in avatar groups/lists", () => {
      const users = [
        { id: 1, name: "Alice", initials: "A" },
        { id: 2, name: "Bob", initials: "B" },
        { id: 3, name: "Charlie", initials: "C" },
      ];

      render(
        <DsBox data-testid="avatar-list">
          {users.map((user) => (
            <DsAvatar
              key={user.id}
              ds-size="M"
              aria-label={`${user.name}'s avatar`}
            >
              {user.initials}
            </DsAvatar>
          ))}
        </DsBox>
      );

      const avatarList = screen.getByTestId("avatar-list");
      expect(avatarList).toBeInTheDocument();

      users.forEach((user) => {
        const avatar = screen.getByLabelText(`${user.name}'s avatar`);
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveTextContent(user.initials);
      });
    });

    it("should work with different sizes in same context", () => {
      render(
        <DsBox data-testid="size-comparison">
          <DsAvatar ds-size="S">S</DsAvatar>
          <DsAvatar ds-size="M">M</DsAvatar>
          <DsAvatar ds-size="L">L</DsAvatar>
          <DsAvatar ds-size="XL">XL</DsAvatar>
        </DsBox>
      );

      const container = screen.getByTestId("size-comparison");
      const avatars = container.querySelectorAll(".MuiAvatar-root");
      expect(avatars).toHaveLength(4);

      avatars.forEach((avatar) => {
        expect(avatar).toBeInTheDocument();
      });
    });

    it("should work as clickable team member avatar", async () => {
      const handleMemberClick = vi.fn();
      render(
        <DsAvatar
          ds-size="L"
          onClick={handleMemberClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleMemberClick(e);
            }
          }}
          tabIndex={0}
          style={{ cursor: "pointer" }}
          aria-label="View team member profile"
        >
          TM
        </DsAvatar>
      );

      const avatar = screen.getByLabelText("View team member profile");

      // Test click interaction
      await user.click(avatar);
      expect(handleMemberClick).toHaveBeenCalledTimes(1);

      // Test keyboard interaction
      avatar.focus();
      await user.keyboard("{Enter}");
      expect(handleMemberClick).toHaveBeenCalledTimes(2);
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsAvatar ds-size="M">Default</DsAvatar>);
      expect(container.firstChild).toMatchSnapshot("avatar-default");
    });

    it("should match snapshots across all sizes", () => {
      const sizes: Array<"S" | "M" | "L" | "XL" | "XXL" | "3XL"> = [
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "3XL",
      ];

      sizes.forEach((size) => {
        const { container } = render(
          <DsAvatar ds-size={size}>{size}</DsAvatar>
        );
        expect(container.firstChild).toMatchSnapshot(`avatar-size-${size}`);
      });
    });

    it("should match snapshots with different variants", () => {
      const variants: Array<{ variant?: "text" | "icon"; label: string }> = [
        { variant: "text", label: "text" },
        { variant: "icon", label: "icon" },
      ];

      variants.forEach(({ variant, label }) => {
        const { container } = render(
          <DsAvatar ds-variant={variant} ds-size="M">
            Content
          </DsAvatar>
        );
        expect(container.firstChild).toMatchSnapshot(`avatar-variant-${label}`);
      });
    });

    it("should match snapshots across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsAvatar ds-size="M">{colorScheme.charAt(0).toUpperCase()}</DsAvatar>
        ),
        (container, colorScheme) => {
          expect(container.firstChild).toMatchSnapshot(
            `avatar-theme-${colorScheme}`
          );
        }
      );
    });

    it("should match snapshot with image source", () => {
      const { container } = render(
        <DsAvatar
          ds-size="M"
          src="https://storybook.axis.bank.in/v2/assets/avatar-image-6df7617a.png"
          alt="Profile picture of a girl"
        />
      );
      expect(container.firstChild).toMatchSnapshot("avatar-with-image");
    });

    it("should match snapshot with complex content", () => {
      const { container } = render(
        <DsAvatar ds-size="L">
          <DsBox>
            <DsTypography>Complex</DsTypography>
            <DsTypography>Content</DsTypography>
          </DsBox>
        </DsAvatar>
      );
      expect(container.firstChild).toMatchSnapshot("avatar-complex-content");
    });
  });
});
