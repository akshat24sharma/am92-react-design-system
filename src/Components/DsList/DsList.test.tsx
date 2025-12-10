/**
 * @vitest-environment jsdom
 *
 * Test suite for DsList component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. MUI Styling - Material-UI specific styling (if applicable)
 * 4. Event Handling - User interactions and event handlers
 * 5. Accessibility - ARIA attributes and keyboard navigation
 * 6. Theme Testing - Rendering in different color schemes
 * 7. Edge Cases - Unusual scenarios and boundary conditions
 * 8. Snapshot Testing - Ensuring UI consistency over time
 *
 * @package @am92/react-design-system
 * @component DsList
 */

import { describe, expect, it, vi } from "vitest";
import { DsList } from "./DsList.Component";
import { DsListItem } from "../DsListItem";
import { DsListItemText } from "../DsListItemText";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { render, screen, testAllThemes } from "../../Tests/Mocks/testUtils";

const renderListItems = () => (
  <>
    <DsListItem>
      <DsListItemText>Item 1</DsListItemText>
    </DsListItem>
    <DsListItem>
      <DsListItemText>Item 2</DsListItemText>
    </DsListItem>
  </>
);

describe("DsList Component", () => {
  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render the list with default props", () => {
      render(<DsList>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");

      expect(list).toBeInTheDocument();
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(2);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("should render an empty list when no items are provided", () => {
      render(<DsList />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should render items with custom class names", () => {
      render(<DsList className="custom-class">{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("custom-class");
    });

    it("should apply custom data attributes", () => {
      render(
        <DsList data-testid="dslist-test" data-custom="value">
          {renderListItems()}
        </DsList>
      );

      const list = screen.getByTestId("dslist-test");
      expect(list).toHaveAttribute("data-custom", "value");
    });

    it("should disable padding when the disablePadding prop is set to true", () => {
      render(<DsList disablePadding>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).not.toHaveClass("MuiList-padding");
    });

    it("should apply default padding when the disablePadding prop is not set", () => {
      render(<DsList>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("MuiList-padding");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply the root class to the DsList component", () => {
      render(<DsList>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("MuiList-root");
    });

    it("should apply the item class to each DsListItem component", () => {
      render(<DsList>{renderListItems()}</DsList>);
      const items = screen.getAllByRole("listitem");
      items.forEach((item) => {
        expect(item).toHaveClass("MuiListItem-root");
      });
    });

    it("should apply the subheader class to DsList component", () => {
      render(<DsList subheader>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).toHaveClass("MuiList-subheader");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should call the onClick handler when an item is clicked", () => {
      const handleClick = vi.fn();
      render(
        <DsList>
          <DsListItem onClick={handleClick}>
            <DsListItemText>Clickable Item</DsListItemText>
          </DsListItem>
        </DsList>
      );
      const item = screen.getByText("Clickable Item");
      item.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have appropriate ARIA roles for the list and items", () => {
      render(<DsList>{renderListItems()}</DsList>);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      const items = screen.getAllByRole("listitem");
      expect(items).toHaveLength(2);
    });

    it("should support keyboard navigation", () => {
      render(
        <DsList>
          <DsListItem tabIndex={0}>
            <DsListItemText>Keyboard Item 1</DsListItemText>
          </DsListItem>
          <DsListItem tabIndex={0}>
            <DsListItemText>Keyboard Item 2</DsListItemText>
          </DsListItem>
        </DsList>
      );
      const items = screen.getAllByRole("listitem");
      items[0].focus();
      expect(document.activeElement).toBe(items[0]);
      items[1].focus();
      expect(document.activeElement).toBe(items[1]);
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;
    it("should render correctly in different color schemes", () => {
      colorSchemes.forEach((colorScheme) => {
        const themeColorScheme = getColorScheme(PALETTE);
        const schemeData = themeColorScheme[colorScheme];
        const expectedPrimaryColor = (schemeData?.palette?.surface as any)
          ?.main;

        render(
          <DsList
            data-testid={`dslist-${colorScheme}`}
            style={{ backgroundColor: expectedPrimaryColor }}
          >
            {renderListItems()}
          </DsList>
        );
        const list = screen.getByTestId(`dslist-${colorScheme}`);
        expect(list).toBeInTheDocument();
      });
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (colorScheme) => (
          <DsList data-testid={`dslist-${colorScheme}`}>
            {renderListItems()}
          </DsList>
        ),
        (container, colorScheme) => {
          const list = container.querySelector(
            `[data-testid="dslist-${colorScheme}"]`
          );
          expect(list).toBeInTheDocument();
        }
      );
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null or undefined items gracefully", () => {
      render(<DsList />);
      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("should handle very long item text", () => {
      const longText = "A".repeat(1000);
      render(
        <DsList className="custom-class">
          <DsListItem>
            <DsListItemText>{longText}</DsListItemText>
          </DsListItem>
        </DsList>
      );
      const item = screen.getByText(longText);
      expect(item).toBeInTheDocument();
    });

    it("should handle a large number of items efficiently", () => {
      const items = Array.from({ length: 1000 }, (_, i) => (
        <DsListItem key={i}>
          <DsListItemText>Item {i + 1}</DsListItemText>
        </DsListItem>
      ));
      render(<DsList>{items}</DsList>);
      const renderedItems = screen.getAllByRole("listitem");
      expect(renderedItems).toHaveLength(1000);
    });

    it("should handle items with special characters", () => {
      render(
        <DsList>
          <DsListItem>
            <DsListItemText>Item with &amp; Special Characters</DsListItemText>
          </DsListItem>
        </DsList>
      );
      const item = screen.getByText("Item with & Special Characters");
      expect(item).toBeInTheDocument();
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshot with default props", () => {
      const { container } = render(<DsList>{renderListItems()}</DsList>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with dense variant", () => {
      const { container } = render(<DsList dense>{renderListItems()}</DsList>);
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with nested lists", () => {
      const { container } = render(
        <DsList>
          <DsListItem>
            <DsListItemText>Parent Item</DsListItemText>
            <DsList>
              <DsListItem>
                <DsListItemText>Child Item 1</DsListItemText>
              </DsListItem>
              <DsListItem>
                <DsListItemText>Child Item 2</DsListItemText>
              </DsListItem>
            </DsList>
          </DsListItem>
        </DsList>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom styles", () => {
      const { container } = render(
        <DsList style={{ backgroundColor: "lightblue", padding: "16px" }}>
          {renderListItems()}
        </DsList>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
