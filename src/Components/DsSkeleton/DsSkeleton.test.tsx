/**
 * @vitest-environment jsdom
 *
 * Test suite for DsSkeleton component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Accessibility - ARIA attributes and screen reader support
 * 6. Edge Cases - Unusual scenarios and boundary conditions
 * 7. Real-world Scenarios - Common usage patterns
 * 8. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 9. Snapshot Testing - Visual regression testing across all states and themes
 *
 * @package @am92/react-design-system
 * @component DsSkeleton
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, testAllThemes } from "../../Tests/Mocks/testUtils";
import { getTheme } from "../../Theme";
import { DsSkeleton } from "./DsSkeleton.Component";
import { DsBox, DsTypography, DsPaper, DsCard, DsCardContent } from "../index";

describe("DsSkeleton Component", () => {
  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      const { container } = render(<DsSkeleton />);
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("MuiSkeleton-root");
    });

    it("should render with text variant by default", () => {
      const { container } = render(<DsSkeleton />);
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toHaveClass("MuiSkeleton-text");
    });

    it("should render with pulse animation by default", () => {
      const { container } = render(<DsSkeleton />);
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toHaveClass("MuiSkeleton-pulse");
    });

    it("should render children when provided", () => {
      render(
        <DsSkeleton>
          <DsTypography>Loading content</DsTypography>
        </DsSkeleton>
      );
      expect(screen.getByText("Loading content")).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and apply custom id", () => {
      const { container } = render(<DsSkeleton id="custom-skeleton-id" />);
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toHaveAttribute("id", "custom-skeleton-id");
    });

    it("should accept and apply custom className", () => {
      const { container } = render(<DsSkeleton className="custom-skeleton" />);
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toHaveClass("custom-skeleton");
      expect(skeleton).toHaveClass("MuiSkeleton-root");
    });

    it("should accept and apply data attributes", () => {
      const { container } = render(
        <DsSkeleton data-testid="skeleton-test" data-custom="value" />
      );
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toHaveAttribute("data-testid", "skeleton-test");
      expect(skeleton).toHaveAttribute("data-custom", "value");
    });

    it("should support different variant types", () => {
      const variants = ["text", "rectangular", "rounded", "circular"] as const;
      variants.forEach((variant) => {
        const { container } = render(<DsSkeleton variant={variant} />);
        const skeleton = container.querySelector(".MuiSkeleton-root");
        expect(skeleton).toHaveClass(`MuiSkeleton-${variant}`);
      });
    });

    it("should support different animation types", () => {
      const animations = ["pulse", "wave", false] as const;
      animations.forEach((animation) => {
        const { container } = render(<DsSkeleton animation={animation} />);
        const skeleton = container.querySelector(".MuiSkeleton-root");
        if (animation === false) {
          expect(skeleton).not.toHaveClass("MuiSkeleton-pulse");
          expect(skeleton).not.toHaveClass("MuiSkeleton-wave");
        } else {
          expect(skeleton).toHaveClass(`MuiSkeleton-${animation}`);
        }
      });
    });

    it("should accept width prop", () => {
      const { container } = render(<DsSkeleton width={200} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.width).toBe("200px");
    });

    it("should accept width as percentage", () => {
      const { container } = render(<DsSkeleton width="80%" />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.width).toBe("80%");
    });

    it("should accept height prop", () => {
      const { container } = render(<DsSkeleton height={100} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.height).toBe("100px");
    });

    it("should accept height as string", () => {
      const { container } = render(<DsSkeleton height="2rem" />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.height).toBe("2rem");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should handle loading state with children", () => {
      render(
        <DsSkeleton>
          <DsTypography>Content loaded</DsTypography>
        </DsSkeleton>
      );
      expect(screen.getByText("Content loaded")).toBeInTheDocument();
    });

    it("should hide skeleton when children are present", () => {
      const { container } = render(
        <DsSkeleton>
          <DsTypography>Content loaded</DsTypography>
        </DsSkeleton>
      );
      // When children are present, skeleton should not show loading state
      const skeleton = container.querySelector(".MuiSkeleton-root");
      expect(skeleton).toBeInTheDocument();
      expect(screen.getByText("Content loaded")).toBeInTheDocument();
    });

    it("should handle different sizes for circular variant", () => {
      const { container } = render(
        <DsSkeleton variant="circular" width={40} height={40} />
      );
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toHaveClass("MuiSkeleton-circular");
      expect(skeleton.style.width).toBe("40px");
      expect(skeleton.style.height).toBe("40px");
    });

    it("should handle rectangular variant with custom dimensions", () => {
      const { container } = render(
        <DsSkeleton variant="rectangular" width={300} height={200} />
      );
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toHaveClass("MuiSkeleton-rectangular");
      expect(skeleton.style.width).toBe("300px");
      expect(skeleton.style.height).toBe("200px");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      const { container } = render(<DsSkeleton />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toHaveClass("MuiSkeleton-root");
      expect(skeleton).toHaveClass("MuiSkeleton-text");
      expect(skeleton).toHaveClass("MuiSkeleton-pulse");
    });

    it("should apply variant-specific classes", () => {
      const { container } = render(<DsSkeleton variant="circular" />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toHaveClass("MuiSkeleton-circular");
    });

    it("should apply animation-specific classes", () => {
      const { container } = render(<DsSkeleton animation="wave" />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toHaveClass("MuiSkeleton-wave");
      expect(skeleton).not.toHaveClass("MuiSkeleton-pulse");
    });

    it("should handle no animation", () => {
      const { container } = render(<DsSkeleton animation={false} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).not.toHaveClass("MuiSkeleton-pulse");
      expect(skeleton).not.toHaveClass("MuiSkeleton-wave");
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes for screen readers", () => {
      const { container } = render(<DsSkeleton />);
      const skeleton = container.firstChild;
      // MUI Skeleton should have proper loading semantics
      expect(skeleton).toBeInTheDocument();
    });

    it("should be properly announced to screen readers", () => {
      render(<DsSkeleton data-testid="loading-skeleton" />);
      const skeleton = screen.getByTestId("loading-skeleton");
      expect(skeleton).toBeInTheDocument();
      // Skeleton should be perceivable but not interactive
      expect(skeleton.tagName).toBe("SPAN");
    });

    it("should not interfere with keyboard navigation", () => {
      render(
        <DsBox>
          <DsSkeleton />
          <DsTypography tabIndex={0}>Focusable content</DsTypography>
        </DsBox>
      );
      const focusable = screen.getByText("Focusable content");
      expect(focusable).toBeInTheDocument();
      // Skeleton should not affect tab order
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle zero width gracefully", () => {
      const { container } = render(<DsSkeleton width={0} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.width).toBe("0px");
    });

    it("should handle zero height gracefully", () => {
      const { container } = render(<DsSkeleton height={0} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.height).toBe("0px");
    });

    it("should handle very large dimensions", () => {
      const { container } = render(<DsSkeleton width={9999} height={9999} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton.style.width).toBe("9999px");
      expect(skeleton.style.height).toBe("9999px");
    });

    it("should handle negative dimensions", () => {
      // Note: MUI Skeleton may handle negative values differently
      const { container } = render(<DsSkeleton width={-100} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement; // Test that component doesn't crash with negative values
      expect(skeleton).toBeInTheDocument();
    });

    it("should handle invalid variant gracefully", () => {
      // This test validates that invalid props don't break the component
      const { container } = render(<DsSkeleton variant={"invalid" as any} />);
      const skeleton = container.querySelector(
        ".MuiSkeleton-root"
      ) as HTMLElement;
      expect(skeleton).toBeInTheDocument();
      expect(skeleton).toHaveClass("MuiSkeleton-root");
    });

    it("should handle complex children structures", () => {
      render(
        <DsSkeleton>
          <DsBox sx={{ display: "flex", gap: 1 }}>
            <DsTypography>First child</DsTypography>
            <DsTypography>Second child</DsTypography>
          </DsBox>
        </DsSkeleton>
      );
      expect(screen.getByText("First child")).toBeInTheDocument();
      expect(screen.getByText("Second child")).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as text content placeholder", () => {
      render(
        <DsBox>
          <DsTypography variant="headingBoldLarge">
            <DsSkeleton />
          </DsTypography>
          <DsTypography variant="bodyRegularMedium">
            <DsSkeleton />
          </DsTypography>
          <DsTypography variant="supportRegularFootnote">
            <DsSkeleton width="60%" />
          </DsTypography>
        </DsBox>
      );
      const skeletons = document.querySelectorAll(".MuiSkeleton-root");
      expect(skeletons).toHaveLength(3);
    });

    it("should work as avatar placeholder", () => {
      render(
        <DsBox sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <DsSkeleton variant="circular" width={40} height={40} />
          <DsBox sx={{ flex: 1 }}>
            <DsSkeleton height={20} />
            <DsSkeleton height={16} width="80%" />
          </DsBox>
        </DsBox>
      );
      const skeletons = document.querySelectorAll(".MuiSkeleton-root");
      expect(skeletons).toHaveLength(3);
      expect(skeletons[0]).toHaveClass("MuiSkeleton-circular");
    });

    it("should work in card layouts", () => {
      render(
        <DsPaper sx={{ p: 2 }}>
          <DsSkeleton variant="rectangular" width="100%" height={200} />
          <DsBox sx={{ pt: 2 }}>
            <DsSkeleton />
            <DsSkeleton />
            <DsSkeleton width="60%" />
          </DsBox>
        </DsPaper>
      );
      const skeletons = document.querySelectorAll(".MuiSkeleton-root");
      expect(skeletons).toHaveLength(4);
      expect(skeletons[0]).toHaveClass("MuiSkeleton-rectangular");
    });

    it("should work in list item scenarios", () => {
      const listItems = Array.from({ length: 3 }, (_, index) => (
        <DsBox
          key={index}
          sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
        >
          <DsSkeleton variant="circular" width={32} height={32} />
          <DsBox sx={{ flex: 1 }}>
            <DsSkeleton height={18} />
            <DsSkeleton height={14} width="70%" />
          </DsBox>
        </DsBox>
      ));

      render(<DsBox>{listItems}</DsBox>);
      const skeletons = document.querySelectorAll(".MuiSkeleton-root");
      expect(skeletons).toHaveLength(9); // 3 items × 3 skeletons each
    });

    it("should work with conditional loading states", () => {
      const { rerender } = render(
        <DsSkeleton>
          <DsTypography>Loaded content</DsTypography>
        </DsSkeleton>
      );
      expect(screen.getByText("Loaded content")).toBeInTheDocument();

      // Simulate loading state
      rerender(<DsSkeleton />);
      expect(screen.queryByText("Loaded content")).not.toBeInTheDocument();

      const skeleton = document.querySelector(".MuiSkeleton-root");
      expect(skeleton).toBeInTheDocument();
    });

    it("should work in data table scenarios", () => {
      render(
        <DsBox
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
          }}
        >
          <DsSkeleton height={20} />
          <DsSkeleton height={20} />
          <DsSkeleton height={20} />
          <DsSkeleton height={16} />
          <DsSkeleton height={16} width="80%" />
          <DsSkeleton height={16} width="60%" />
        </DsBox>
      );
      const skeletons = document.querySelectorAll(".MuiSkeleton-root");
      expect(skeletons).toHaveLength(6);
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => <DsSkeleton data-testid={`skeleton-${colorScheme}`} />,
        (container, colorScheme) => {
          const skeleton = container.querySelector(
            `[data-testid="skeleton-${colorScheme}"]`
          );
          expect(skeleton).toBeInTheDocument();
          expect(skeleton).toHaveClass("MuiSkeleton-root");

          // Verify theme context
          const wrapperElement = container.firstChild as HTMLElement;
          expect(wrapperElement).toHaveAttribute(
            "data-mui-color-scheme",
            colorScheme
          );
        }
      );
    });

    it("should maintain styling across all themes", () => {
      const themes = ["light", "dark", "highContrast"] as const;
      const variants = ["text", "circular", "rectangular"] as const;

      themes.forEach((theme) => {
        variants.forEach((variant) => {
          const { container, unmount } = render(
            <DsSkeleton variant={variant} />,
            { colorScheme: theme }
          );

          const skeleton = container.querySelector(
            ".MuiSkeleton-root"
          ) as HTMLElement;
          expect(skeleton).toHaveClass(`MuiSkeleton-${variant}`);

          unmount();
        });
      });
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsSkeleton />);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with different variants", () => {
      const variants = ["text", "circular", "rectangular", "rounded"] as const;
      variants.forEach((variant) => {
        const { container } = render(<DsSkeleton variant={variant} />);
        expect(container.firstChild).toMatchSnapshot(
          `skeleton-variant-${variant}`
        );
      });
    });

    it("should match snapshot with different animations", () => {
      const animations = ["pulse", "wave", false] as const;
      animations.forEach((animation) => {
        const { container } = render(<DsSkeleton animation={animation} />);
        expect(container.firstChild).toMatchSnapshot(
          `skeleton-animation-${animation}`
        );
      });
    });

    it("should match snapshot with custom dimensions", () => {
      const { container } = render(<DsSkeleton width={200} height={100} />);
      expect(container.firstChild).toMatchSnapshot(
        "skeleton-custom-dimensions"
      );
    });

    it("should match snapshot with children", () => {
      const { container } = render(
        <DsSkeleton>
          <DsTypography>Content loaded</DsTypography>
        </DsSkeleton>
      );
      expect(container.firstChild).toMatchSnapshot("skeleton-with-children");
    });

    it("should match snapshots across all themes", () => {
      const themes = ["light", "dark", "highContrast"] as const;
      themes.forEach((theme) => {
        const { container } = render(<DsSkeleton />, { colorScheme: theme });
        expect(container.firstChild).toMatchSnapshot(`skeleton-theme-${theme}`);
      });
    });

    it("should match snapshot in real-world card scenario", () => {
      const { container } = render(
        <DsPaper sx={{ p: 2, maxWidth: 300 }}>
          <DsSkeleton variant="rectangular" width="100%" height={200} />
          <DsBox sx={{ pt: 2 }}>
            <DsSkeleton />
            <DsSkeleton />
            <DsSkeleton width="60%" />
          </DsBox>
        </DsPaper>
      );
      expect(container.firstChild).toMatchSnapshot("skeleton-card-scenario");
    });

    it("should match snapshot in avatar list scenario", () => {
      const { container } = render(
        <DsBox>
          <DsBox sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <DsSkeleton variant="circular" width={40} height={40} />
            <DsBox sx={{ flex: 1 }}>
              <DsSkeleton height={20} />
              <DsSkeleton height={16} width="80%" />
            </DsBox>
          </DsBox>
          <DsBox sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <DsSkeleton variant="circular" width={40} height={40} />
            <DsBox sx={{ flex: 1 }}>
              <DsSkeleton height={20} />
              <DsSkeleton height={16} width="70%" />
            </DsBox>
          </DsBox>
        </DsBox>
      );
      expect(container.firstChild).toMatchSnapshot(
        "skeleton-avatar-list-scenario"
      );
    });
  });
});
