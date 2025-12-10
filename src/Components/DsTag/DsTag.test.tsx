/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTag component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the component.
 * 2. Props Validation - Ensure proper handling and validation of props.
 * 3. Component States - Test various states of the component (selected, disabled).
 * 4. MUI Styling - Validate Material-UI specific styling and class application.
 * 5. Event Handling - Simulate user interactions and verify event handlers.
 * 6. Accessibility - Check ARIA attributes and support for keyboard navigation.
 * 7. Edge Cases - Handle unusual scenarios and boundary conditions.
 * 8. Real-world Scenarios - Test common usage patterns and component behavior.
 * 9. Theme Testing - Assess component rendering across different themes (light, dark, high contrast).
 * 10. Snapshot Testing - Perform visual regression testing for all states and themes.
 *
 * @package @am92/react-design-system
 * @component DsTag
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsTag } from "./DsTag.Component";
import { DsBox } from "../DsBox";
import { DsRemixIcon } from "../DsRemixIcon";

describe("DsTag Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsTag label="Default Tag" selected={false} value={undefined} />);
      const tag = screen.getByText("Default Tag");
      expect(tag).toBeInTheDocument();
    });

    it("should render with a custom className", () => {
      render(
        <DsTag
          label="Custom Class"
          className="custom-class"
          value="Custom Class"
          selected={false}
        />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveClass("custom-class");
    });

    it("should render with a custom value", () => {
      render(
        <DsTag
          label="Custom Class"
          className="custom-class"
          value="Custom Value"
          selected={false}
        />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveAttribute("value", "Custom Value");
    });

    it("should render without crashing when no props provided", () => {
      expect(() =>
        render(<DsTag value={undefined} selected={false} />)
      ).not.toThrow();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and display custom id", () => {
      render(
        <DsTag
          label="Tag with ID"
          id="custom-id"
          selected={false}
          value={undefined}
        />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveAttribute("id", "custom-id");
    });

    it("should render with a custom size", () => {
      const sizes = ["small", "medium"] as const;

      sizes.forEach((size) => {
        render(
          <DsTag
            label={`Tag Size ${size}`}
            size={size}
            value={`Tag Size ${size}`}
            selected={false}
          />
        );
      });

      const tags = screen.getAllByRole("button");

      sizes.forEach((size, index) => {
        expect(tags[index]).toHaveClass(
          `MuiChip-size${size.charAt(0).toUpperCase() + size.slice(1)}`
        );
      });
    });

    it("should render with an icon", () => {
      const { container } = render(
        <DsTag
          label="Tag with Icon"
          icon={<DsRemixIcon className="ri-checkbox-circle-fill" />}
          value="Tag with Icon"
          selected={false}
        />
      );
      const icon = container.querySelector(".ri-checkbox-circle-fill");
      expect(icon).toBeInTheDocument();
    });

    it("should render with an avatar", () => {
      render(
        <DsTag
          label="Tag with Avatar"
          avatar={<span data-testid="avatar">Avatar</span>}
          value="Tag with Avatar"
          selected={false}
        />
      );
      const avatar = screen.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
    });

    it("should render with a delete icon when `onDelete` is provided", () => {
      const handleDelete = vi.fn();
      render(
        <DsTag
          label="Deletable Tag"
          onDelete={handleDelete}
          value="Deletable Tag"
          selected={false}
        />
      );
      const deleteIcon = screen.getByRole("button");
      expect(deleteIcon).toBeInTheDocument();
    });

    it("should render with a custom delete icon", () => {
      const handleDelete = vi.fn();
      render(
        <DsTag
          label="Custom Delete Icon"
          onDelete={handleDelete}
          deleteIcon={
            <DsRemixIcon data-testid="delete-icon" className="ri-close-line" />
          }
          value={undefined}
          selected={false}
        />
      );
      const deleteIcon = screen.getByTestId("delete-icon");
      expect(deleteIcon).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in selected state", () => {
      render(
        <DsTag label="Selected Tag" selected={true} value="Selected Tag" />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveClass("MuiChip-colorSecondary");
    });

    it("should render in disabled state", () => {
      render(
        <DsTag
          label="Disabled Tag"
          disabled
          selected={false}
          value={undefined}
        />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveClass("Mui-disabled");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      render(<DsTag label="Styled Tag" selected={false} value={undefined} />);
      const tag = screen.getByRole("button");
      expect(tag).toHaveClass("MuiChip-root");
    });

    it("should apply size-specific MUI classes", () => {
      render(
        <DsTag
          label="Small Styled Tag"
          size="small"
          selected={false}
          value="Small Styled Tag"
        />
      );
      const tag = screen.getByRole("button");
      expect(tag).toHaveClass("MuiChip-sizeSmall");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle delete icon click events", async () => {
      const handleDelete = vi.fn();

      render(
        <DsTag
          label="Deletable Tag"
          onDelete={handleDelete}
          value="Deletable Tag"
          deleteIcon={
            <DsRemixIcon data-testid="delete-icon" className="ri-close-line" />
          }
          selected={false}
        />
      );

      const deleteIcon = screen.getByTestId("delete-icon");
      await user.click(deleteIcon);
      expect(handleDelete).toHaveBeenCalledTimes(1);
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(
        <DsTag
          label="Accessible Tag"
          aria-label="Accessible Tag"
          value="Accessible Tag"
          selected={false}
        />
      );
      const tag = screen.getByLabelText("Accessible Tag");
      expect(tag).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      render(
        <DsBox>
          <DsTag
            label="First Tag"
            value={undefined}
            data-testid="first"
            selected={false}
          />
          <DsTag
            label="Second Tag"
            value={undefined}
            data-testid="second"
            selected={false}
          />
        </DsBox>
      );
      const firstTag = screen.getByTestId("first");
      const secondTag = screen.getByTestId("second");

      await user.tab();
      expect(firstTag).toHaveFocus();

      await user.tab();
      expect(secondTag).toHaveFocus();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle very long text content", () => {
      const longText = "A".repeat(1000);
      render(<DsTag label={longText} value={"long text"} selected={false} />);
      const tag = screen.getByText(longText);
      expect(tag).toBeInTheDocument();
    });

    it("should handle rapid clicking on delete icon", async () => {
      const handleDelete = vi.fn();

      render(
        <DsTag
          label="Rapid Delete Tag"
          onDelete={handleDelete}
          value="Rapid Delete Tag"
          deleteIcon={
            <DsRemixIcon data-testid="delete-icon" className="ri-close-line" />
          }
          selected={false}
        />
      );

      const deleteIcon = screen.getByTestId("delete-icon");

      for (let i = 0; i < 5; i++) {
        await user.click(deleteIcon);
      }

      expect(handleDelete).toHaveBeenCalledTimes(5);
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should match snapshots for basic states", () => {
      const { container: defaultContainer } = render(
        <DsTag label="Default Tag" value={undefined} selected={false} />
      );
      expect(defaultContainer.firstChild).toMatchSnapshot();

      const { container: selectedContainer } = render(
        <DsTag label="Selected Tag" value={undefined} selected={true} />
      );
      expect(selectedContainer.firstChild).toMatchSnapshot();

      const { container: disabledContainer } = render(
        <DsTag
          label="Disabled Tag"
          disabled
          value={undefined}
          selected={false}
        />
      );
      expect(disabledContainer.firstChild).toMatchSnapshot();
    });

    it("should render a list of tags", () => {
      const { container } = render(
        <DsBox>
          <DsTag label="Tag 1" value={undefined} selected={false} />
          <DsTag label="Tag 2" value={undefined} selected={false} />
          <DsTag label="Tag 3" value={undefined} selected={false} />
        </DsBox>
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTag
            label="Theme Tag"
            value={undefined}
            selected={false}
            data-testid={`tag-${colorScheme}`}
          />
        ),

        (container, colorScheme) => {
          const tag = container.querySelector(
            `[data-testid="tag-${colorScheme}"]`
          );
          expect(tag).toBeInTheDocument();

          // Snapshot testing for each theme
          expect(container.firstChild).toMatchSnapshot(
            `ds-tag-${colorScheme}-theme`
          );
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
        <DsTag label="Default Tag" value={undefined} selected={false} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with size variants", () => {
      const { container } = render(
        <DsTag
          label="Small Tag"
          size="small"
          value={undefined}
          selected={false}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with delete icon", () => {
      const { container } = render(
        <DsTag
          label="Deletable Tag"
          onDelete={() => {}}
          value={undefined}
          selected={false}
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
