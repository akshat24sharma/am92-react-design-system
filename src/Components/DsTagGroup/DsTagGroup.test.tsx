/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTagGroup component
 *
 * Testing Strategy:
 * 1. Core Rendering - Verify basic rendering and display of the component with single and multi modes.
 * 2. Props Validation - Ensure proper handling and validation of props including name, value, multi, and onChange.
 * 3. Component States - Test various states of the component (selected, unselected, multi-selection).
 * 4. MUI Styling - Validate Material-UI specific styling and class application for Stack and Chip components.
 * 5. Component Functionality - Test selection/deselection logic in both single and multi modes.
 * 6. Event Handling - Simulate user interactions including clicks, keyboard events, and delete operations.
 * 7. Form Integration - Test integration with forms and controlled component patterns.
 * 8. Accessibility - Check ARIA attributes and support for keyboard navigation between tags.
 * 9. Edge Cases - Handle unusual scenarios like null values, special characters, and large datasets.
 * 10. Real-world Scenarios - Test common usage patterns like category filters, skill selectors, and priority selection.
 * 11. Theme Testing - Assess component rendering across different themes (light, dark, high contrast) with proper color integration.
 * 12. Snapshot Testing - Perform visual regression testing for all states and themes.
 *
 * @package @am92/react-design-system
 * @component DsTagGroup
 */

import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  render,
  screen,
  fireEvent,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsTagGroup } from "./DsTagGroup.Component";
import { DsTag } from "../DsTag";
import { DsBox } from "../DsBox";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsTagGroup Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // Helper functions for consistent test setup
  const renderSingleModeTagGroup = (props = {}) => {
    const defaultProps = {
      name: "test-tag-group",
      value: "",
      multi: false,
      onChange: vi.fn(),
      ...props,
    };

    return render(
      <DsTagGroup {...defaultProps}>
        <DsTag value="option1" label="Option 1" selected={false} />
        <DsTag value="option2" label="Option 2" selected={false} />
        <DsTag value="option3" label="Option 3" selected={false} />
      </DsTagGroup>
    );
  };

  const renderMultiModeTagGroup = (props = {}) => {
    const defaultProps = {
      name: "test-multi-tag-group",
      value: [],
      multi: true,
      onChange: vi.fn(),
      ...props,
    };

    return render(
      <DsTagGroup {...defaultProps}>
        <DsTag value="tag1" label="Tag 1" selected={false} />
        <DsTag value="tag2" label="Tag 2" selected={false} />
        <DsTag value="tag3" label="Tag 3" selected={false} />
      </DsTagGroup>
    );
  };

  const expectBasicTagGroup = (container: HTMLElement) => {
    // Verify basic structure
    // expect(container.firstChild).toHaveClass("MuiStack-root");
    expect(container.firstChild).toHaveAttribute("data-mui-color-scheme");

    // Check for tags
    const tags = container.querySelectorAll(".MuiChip-root");
    expect(tags.length).toBeGreaterThan(0);
  };

  // 1. Core Rendering Tests
  describe("Core Rendering", () => {
    it("should render with default props ", () => {
      const { container } = renderMultiModeTagGroup();

      expectBasicTagGroup(container);
      const tags = screen.getAllByRole("button");
      expect(tags).toHaveLength(3);
      expect(screen.getByText("Tag 1")).toBeInTheDocument();
      expect(screen.getByText("Tag 2")).toBeInTheDocument();
      expect(screen.getByText("Tag 3")).toBeInTheDocument();
    });

    it("should render with selected props ", () => {
      const { container } = render(
        <DsTagGroup
          name="test-tag-group"
          value="option1"
          multi={false}
          onChange={vi.fn()}
        >
          <DsTag value="option1" label="Option 1" selected={true} />
          <DsTag value="option2" label="Option 2" selected={false} />
          <DsTag value="option3" label="Option 3" selected={false} />
        </DsTagGroup>
      );

      expectBasicTagGroup(container);
      const tags = screen.getAllByRole("button");
      expect(tags).toHaveLength(3);
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();

      // Test selected and unselected state classes
      const selectedTag = screen.getByText("Option 1").closest(".MuiChip-root");
      const unselectedTag1 = screen
        .getByText("Option 2")
        .closest(".MuiChip-root");
      const unselectedTag2 = screen
        .getByText("Option 3")
        .closest(".MuiChip-root");

      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");
      expect(unselectedTag1).toHaveClass("MuiChip-colorDefault");
      expect(unselectedTag2).toHaveClass("MuiChip-colorDefault");
    });

    it("should render with default MUI classes", () => {
      const { container } = renderSingleModeTagGroup();

      const stack = container.querySelector(".MuiStack-root");
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass("MuiStack-root");

      const tags = container.querySelectorAll(".MuiChip-root");
      tags.forEach((tag) => {
        expect(tag).toHaveClass("MuiChip-root");
      });
    });

    it("should render with single child element", () => {
      render(
        <DsTagGroup
          name="single-child"
          value=""
          multi={false}
          onChange={vi.fn()}
        >
          <DsTag value="single" label="Single Option" selected={false} />
        </DsTagGroup>
      );

      const tags = screen.getAllByRole("button");
      expect(tags).toHaveLength(1);
      expect(screen.getByText("Single Option")).toBeInTheDocument();
    });
  });

  // 2. Props Validation Tests
  describe("Props Validation", () => {
    it("should accept custom name and handle string values", async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <DsTagGroup
          name="custom-name"
          value="option2"
          multi={false}
          onChange={handleChange}
        >
          <DsTag value="option1" label="Option 1" selected={false} />
          <DsTag value="option2" label="Option 2" selected={false} />
        </DsTagGroup>
      );

      expectBasicTagGroup(container);
      const tags = screen.getAllByRole("button");
      expect(tags).toHaveLength(2);

      // Verify selected and unselected state classes
      const selectedTag = screen.getByText("Option 2").closest(".MuiChip-root");
      const unselectedTag = screen
        .getByText("Option 1")
        .closest(".MuiChip-root");
      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");
      expect(unselectedTag).toHaveClass("MuiChip-colorDefault");

      // Test that custom name is passed to onChange handler
      const option1Tag = screen.getByText("Option 1");
      await user.click(option1Tag);
      expect(handleChange).toHaveBeenCalledWith("custom-name", "option1");
    });

    it("should pass through DsStack props", () => {
      const { container } = render(
        <DsTagGroup
          name="stack-props-test"
          value=""
          multi={false}
          onChange={vi.fn()}
          spacing={4}
          direction="column"
          alignItems="center"
        >
          <DsTag value="test" label="Test" selected={false} />
        </DsTagGroup>
      );

      const stack = container.querySelector(".MuiStack-root");
      expect(stack).toHaveClass("MuiStack-root");
      // Stack should have direction column
      expect(stack).toHaveStyle({ "flex-direction": "column" });
    });
  });

  // 3. Component States
  describe("Component States", () => {
    it("should render unselected tags in default state", () => {
      renderSingleModeTagGroup({ value: "" });

      const tags = screen.getAllByRole("button");
      tags.forEach((tag) => {
        expect(tag).not.toHaveClass("MuiChip-colorSecondary");
      });
    });

    it("should render selected chip in single mode", () => {
      renderSingleModeTagGroup({ value: "option2" });

      const selectedTag = screen.getByText("Option 2").closest(".MuiChip-root");
      const unselectedTag = screen
        .getByText("Option 1")
        .closest(".MuiChip-root");

      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");
      expect(unselectedTag).not.toHaveClass("MuiChip-colorSecondary");
    });

    it("should render multiple selected tags in multi mode", () => {
      renderMultiModeTagGroup({ value: ["tag1", "tag3"] });

      const tag1 = screen.getByText("Tag 1").closest(".MuiChip-root");
      const tag2 = screen.getByText("Tag 2").closest(".MuiChip-root");
      const tag3 = screen.getByText("Tag 3").closest(".MuiChip-root");

      expect(tag1).toHaveClass("MuiChip-colorSecondary");
      expect(tag2).not.toHaveClass("MuiChip-colorSecondary");
      expect(tag3).toHaveClass("MuiChip-colorSecondary");
    });

    it("should show delete icons for selected tags in multi mode", () => {
      renderMultiModeTagGroup({ value: ["tag1", "tag2"] });

      const deleteIcons = screen
        .getAllByRole("button")
        .filter((button) => button.querySelector(".ri-close-circle-fill"));
      expect(deleteIcons).toHaveLength(2);
    });
  });

  // 4. MUI Styling Tests
  describe("MUI Styling", () => {
    it("should apply default MUI Stack classes", () => {
      const { container } = renderSingleModeTagGroup();

      const stack = container.querySelector(".MuiStack-root");
      expect(stack).toBeInTheDocument();
      expect(stack).toHaveClass("MuiStack-root");
    });

    it("should apply MUI Chip classes to child tags", () => {
      const { container } = renderSingleModeTagGroup();

      const tags = container.querySelectorAll(".MuiChip-root");
      tags.forEach((tag) => {
        expect(tag).toHaveClass("MuiChip-root");
      });
    });

    it("should apply selected state classes correctly", () => {
      renderSingleModeTagGroup({ value: "option1" });

      const selectedTag = screen.getByText("Option 1").closest(".MuiChip-root");
      const unselectedTag = screen
        .getByText("Option 2")
        .closest(".MuiChip-root");

      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");
      expect(unselectedTag).toHaveClass("MuiChip-colorDefault");
    });

    it("should render with proper spacing from DsStack", () => {
      const { container } = renderSingleModeTagGroup({
        sx: {
          gap: "var(--ds-spacing-bitterCold)",
        },
      });

      const stack = container.querySelector(".MuiStack-root");
      expect(stack).toBeInTheDocument();
      // Check for CSS custom property usage
      const computedStyle = window.getComputedStyle(stack as Element);
      expect(computedStyle.gap).toBe("var(--ds-spacing-bitterCold)");
    });
  });

  // 5. Component Functionality Tests
  describe("Component Functionality", () => {
    it("should handle single selection in single mode", async () => {
      const handleChange = vi.fn();
      renderSingleModeTagGroup({ onChange: handleChange });

      const tag = screen.getByText("Option 1");
      await user.click(tag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-tag-group", "option1");
    });

    it("should handle deselection in single mode", async () => {
      const handleChange = vi.fn();
      renderSingleModeTagGroup({ value: "option1", onChange: handleChange });

      const selectedTag = screen.getByText("Option 1");
      await user.click(selectedTag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-tag-group", "");
    });

    it("should handle multi-selection in multi mode", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({ value: ["tag1"], onChange: handleChange });

      const tag = screen.getByText("Tag 2");
      await user.click(tag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", [
        "tag1",
        "tag2",
      ]);
    });

    it("should handle removal via delete icon in multi mode", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({
        value: ["tag1", "tag2"],
        onChange: handleChange,
      });

      // Find delete icon for Tag 1 - look for the actual delete icon element
      const tag1 = screen.getByText("Tag 1").closest(".MuiChip-root");
      const deleteIcon = tag1?.querySelector(".ri-close-circle-fill");
      expect(deleteIcon).toBeInTheDocument();

      await user.click(deleteIcon as Element);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", [
        "tag2",
      ]);
    });

    it("should handle clicking selected tag in multi mode (uses delete functionality)", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({ value: ["tag1"], onChange: handleChange });

      // For selected tags in multi mode, clicking triggers delete functionality
      const selectedTag = screen.getByText("Tag 1").closest(".MuiChip-root");
      const deleteIcon = selectedTag?.querySelector(".ri-close-circle-fill");
      expect(deleteIcon).toBeInTheDocument();

      await user.click(deleteIcon as Element);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", []);
    });
  });

  // 6. Event Handling Tests
  describe("Event Handling", () => {
    it("should handle onClick events for unselected tags", async () => {
      const handleChange = vi.fn();
      renderSingleModeTagGroup({ onChange: handleChange });

      const tag = screen.getByText("Option 2");
      await user.click(tag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-tag-group", "option2");
    });

    it("should handle onClick events for selected tags", async () => {
      const handleChange = vi.fn();
      renderSingleModeTagGroup({ value: "option1", onChange: handleChange });

      // Verify initial selected state
      const selectedTag = screen.getByText("Option 1").closest(".MuiChip-root");
      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");

      // Click on selected tag to deselect it
      const tag = screen.getByText("Option 1");
      await user.click(tag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-tag-group", "");
    });

    it("should visually select tag when clicked in single mode", async () => {
      const handleChange = vi.fn();
      const { rerender } = renderSingleModeTagGroup({ onChange: handleChange });

      // Verify initial state - all tags unselected
      let option1Tag = screen.getByText("Option 1").closest(".MuiChip-root");
      let option2Tag = screen.getByText("Option 2").closest(".MuiChip-root");
      expect(option1Tag).not.toHaveClass("MuiChip-colorSecondary");
      expect(option2Tag).not.toHaveClass("MuiChip-colorSecondary");

      // Click on Option 1
      const tag1 = screen.getByText("Option 1");
      await user.click(tag1);

      // Verify callback was triggered
      expect(handleChange).toHaveBeenCalledWith("test-tag-group", "option1");

      // Simulate parent component updating with new selected value
      rerender(
        <DsTagGroup
          name="test-tag-group"
          value="option1"
          multi={false}
          onChange={handleChange}
        >
          <DsTag value="option1" label="Option 1" selected={false} />
          <DsTag value="option2" label="Option 2" selected={false} />
          <DsTag value="option3" label="Option 3" selected={false} />
        </DsTagGroup>
      );

      // Verify Option 1 is now visually selected
      option1Tag = screen.getByText("Option 1").closest(".MuiChip-root");
      option2Tag = screen.getByText("Option 2").closest(".MuiChip-root");
      expect(option1Tag).toHaveClass("MuiChip-colorSecondary");
      expect(option2Tag).not.toHaveClass("MuiChip-colorSecondary");
    });

    it("should handle onChange events for selected tags in multi mode", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({
        value: ["tag1", "tag3"],
        onChange: handleChange,
      });

      const tag3 = screen.getByText("Tag 3").closest(".MuiChip-root");

      await user.click(tag3 as Element);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", [
        "tag1",
      ]);
    });

    it("should handle rapid consecutive clicks", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({ value: [], onChange: handleChange });

      const tag1 = screen.getByText("Tag 1");
      const tag2 = screen.getByText("Tag 2");

      await user.click(tag1);
      await user.click(tag2);

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenNthCalledWith(1, "test-multi-tag-group", [
        "tag1",
      ]);
    });

    it("should handle onClick events for unselected tags in multi mode (2 to 3)", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({
        value: ["tag1", "tag2"], // Start with 2 selected
        onChange: handleChange,
      });

      // Verify initial state - tag1 and tag2 selected, tag3 unselected
      const tag1Element = screen.getByText("Tag 1").closest(".MuiChip-root");
      const tag2Element = screen.getByText("Tag 2").closest(".MuiChip-root");
      const tag3Element = screen.getByText("Tag 3").closest(".MuiChip-root");

      expect(tag1Element).toHaveClass("MuiChip-colorSecondary");
      expect(tag2Element).toHaveClass("MuiChip-colorSecondary");
      expect(tag3Element).not.toHaveClass("MuiChip-colorSecondary");

      // Click on unselected tag to add to selection (making total 3)
      const unselectedTag = screen.getByText("Tag 3");
      await user.click(unselectedTag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", [
        "tag1",
        "tag2",
        "tag3",
      ]);
    });

    it("should handle onClick events for selected tags in multi mode", async () => {
      const handleChange = vi.fn();
      renderMultiModeTagGroup({
        value: ["tag1", "tag2"],
        onChange: handleChange,
      });

      // Verify initial state - both tags selected
      const tag1Element = screen.getByText("Tag 1").closest(".MuiChip-root");
      const tag2Element = screen.getByText("Tag 2").closest(".MuiChip-root");
      const tag3Element = screen.getByText("Tag 3").closest(".MuiChip-root");
      expect(tag1Element).toHaveClass("MuiChip-colorSecondary");
      expect(tag2Element).toHaveClass("MuiChip-colorSecondary");
      expect(tag3Element).not.toHaveClass("MuiChip-colorSecondary");

      // Click on selected tag's delete icon to remove from selection
      const selectedTag = screen.getByText("Tag 2").closest(".MuiChip-root");
      const deleteIcon = selectedTag?.querySelector(".ri-close-circle-fill");
      expect(deleteIcon).toBeInTheDocument();

      await user.click(deleteIcon as Element);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("test-multi-tag-group", [
        "tag1",
      ]);
    });
  });

  // 7. Form Integration Tests
  describe("Form Integration", () => {
    it("should work within form element", () => {
      render(
        <form>
          <DsTagGroup
            name="form-tags"
            value=""
            multi={false}
            onChange={vi.fn()}
          >
            <DsTag value="form-option" label="Form Option" selected={true} />
          </DsTagGroup>
        </form>
      );

      const tag = screen.getByText("Form Option");
      expect(tag).toBeInTheDocument();
    });

    it("should handle form submission with selected values", () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      const handleChange = vi.fn();
      const { container } = render(
        <form onSubmit={handleSubmit}>
          <DsTagGroup
            name="submit-test"
            value="selected"
            multi={false}
            onChange={handleChange}
          >
            <DsTag value="selected" label="Selected Option" selected={false} />
            <DsTag
              value="unselected"
              label="Unselected Option"
              selected={false}
            />
          </DsTagGroup>
        </form>
      );
      const form = container.querySelector("form");
      fireEvent.submit(form!);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should work with controlled component pattern", () => {
      let value = "";
      const handleChange = vi.fn((name, newValue) => {
        value = newValue;
      });

      const { rerender } = render(
        <DsTagGroup
          name="controlled"
          value={value}
          multi={false}
          onChange={handleChange}
        >
          <DsTag value="test" label="Test" selected={false} />
        </DsTagGroup>
      );

      const tag = screen.getByText("Test");
      fireEvent.click(tag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("controlled", "test");

      rerender(
        <DsTagGroup
          name="controlled"
          value="test"
          multi={false}
          onChange={handleChange}
        >
          <DsTag value="test" label="Test" selected={false} />
        </DsTagGroup>
      );

      const selectedTag = screen.getByText("Test").closest(".MuiChip-root");
      expect(selectedTag).toHaveClass("MuiChip-colorSecondary");
    });
  });

  // 8. Accessibility Tests
  describe("Accessibility", () => {
    it("should have proper ARIA attributes for tags", () => {
      renderSingleModeTagGroup();

      const tags = screen.getAllByRole("button");
      tags.forEach((tag) => {
        expect(tag).toHaveAttribute("type", "status");
        expect(tag).toHaveAttribute("tabindex", "0");
      });
    });

    it("should support keyboard navigation between tags", async () => {
      renderSingleModeTagGroup();

      const tags = screen.getAllByRole("button");

      tags[0].focus();
      expect(tags[0]).toHaveFocus();

      await user.tab();
      expect(tags[1]).toHaveFocus();

      await user.tab();
      expect(tags[2]).toHaveFocus();
    });

    it("should have accessible names for tags", () => {
      renderSingleModeTagGroup();

      expect(
        screen.getByRole("button", { name: /Option 1/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Option 2/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Option 3/i })
      ).toBeInTheDocument();
    });

    it("should have proper ARIA attributes for delete buttons in multi mode", () => {
      renderMultiModeTagGroup({ value: ["tag1"] });

      const tag1 = screen.getByText("Tag 1").closest(".MuiChip-root");
      const deleteIcon = tag1?.querySelector(".ri-close-circle-fill");
      expect(deleteIcon).toBeInTheDocument();
      // The delete icon is part of the tag, not a separate button
      expect(tag1).toHaveAttribute("type", "status");
    });
  });

  // 9. Edge Cases Tests
  describe("Edge Cases", () => {
    it("should handle null/undefined values gracefully", () => {
      render(
        <DsTagGroup
          name="edge-case"
          value={null as any}
          multi={false}
          onChange={vi.fn()}
        >
          <DsTag value="test" label="Test" selected={false} />
        </DsTagGroup>
      );

      const tag = screen.getByText("Test");
      expect(tag).toBeInTheDocument();
      expect(tag.closest(".MuiChip-root")).not.toHaveClass(
        "MuiChip-colorSecondary"
      );
    });

    it("should handle empty array in multi mode", () => {
      renderMultiModeTagGroup({ value: [] });

      const tags = screen.getAllByRole("button");
      tags.forEach((tag) => {
        expect(tag).not.toHaveClass("MuiChip-colorSecondary");
      });
    });

    it("should handle tags with special characters", () => {
      const handleChange = vi.fn();
      render(
        <DsTagGroup
          name="special-chars"
          value=""
          multi={false}
          onChange={handleChange}
        >
          <DsTag
            value="test@#$%^&*()"
            label="Special !@#$%^&*()"
            selected={false}
          />
        </DsTagGroup>
      );

      const tag = screen.getByText("Special !@#$%^&*()");
      expect(tag).toBeInTheDocument();

      fireEvent.click(tag);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        "special-chars",
        "test@#$%^&*()"
      );
    });

    it("should handle tags with unicode characters", () => {
      const handleChange = vi.fn();
      render(
        <DsTagGroup
          name="unicode"
          value=""
          multi={false}
          onChange={handleChange}
        >
          <DsTag value="测试🌟" label="测试 🌟 ñáéíóú" selected={false} />
        </DsTagGroup>
      );

      const tag = screen.getByText("测试 🌟 ñáéíóú");
      expect(tag).toBeInTheDocument();

      fireEvent.click(tag);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("unicode", "测试🌟");
    });

    it("should handle very large number of tags", () => {
      const manyTags = Array.from({ length: 100 }, (_, i) => (
        <DsTag key={i} value={`tag-${i}`} label={`Tag ${i}`} selected={false} />
      ));

      const { container } = render(
        <DsTagGroup name="many-tags" value="" multi={false} onChange={vi.fn()}>
          {manyTags}
        </DsTagGroup>
      );

      const tags = container.querySelectorAll(".MuiChip-root");
      expect(tags).toHaveLength(100);
    });
  });

  // 10. Real-world Scenarios Tests
  describe("Real-world Scenarios", () => {
    it("should work as category filter", async () => {
      const handleChange = vi.fn();
      render(
        <DsBox sx={{ p: 2 }}>
          <DsTagGroup
            name="category-filter"
            value={["electronics", "books"]}
            multi={true}
            onChange={handleChange}
          >
            <DsTag value="electronics" label="Electronics" selected={false} />
            <DsTag value="books" label="Books" selected={false} />
            <DsTag value="clothing" label="Clothing" selected={false} />
            <DsTag value="home" label="Home & Garden" selected={false} />
          </DsTagGroup>
        </DsBox>
      );

      const clothingTag = screen.getByText("Clothing");
      await user.click(clothingTag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("category-filter", [
        "electronics",
        "books",
        "clothing",
      ]);
    });

    it("should work as skill selector", async () => {
      const handleChange = vi.fn();
      render(
        <DsBox sx={{ p: 2 }}>
          <DsTagGroup
            name="skills"
            value={[]}
            multi={true}
            onChange={handleChange}
          >
            <DsTag value="react" label="React" selected={false} />
            <DsTag value="typescript" label="TypeScript" selected={false} />
            <DsTag value="nodejs" label="Node.js" selected={false} />
            <DsTag value="python" label="Python" selected={false} />
          </DsTagGroup>
        </DsBox>
      );

      // Select multiple skills
      await user.click(screen.getByText("React"));
      await user.click(screen.getByText("TypeScript"));

      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenNthCalledWith(1, "skills", ["react"]);
    });

    it("should work as priority selector in single mode", async () => {
      const handleChange = vi.fn();
      render(
        <DsBox sx={{ p: 2 }}>
          <DsTagGroup
            name="priority"
            value="medium"
            multi={false}
            onChange={handleChange}
          >
            <DsTag value="low" label="Low Priority" selected={false} />
            <DsTag value="medium" label="Medium Priority" selected={false} />
            <DsTag value="high" label="High Priority" selected={false} />
            <DsTag value="urgent" label="Urgent" selected={false} />
          </DsTagGroup>
        </DsBox>
      );

      const mediumTag = screen.getByText("Medium Priority");
      expect(mediumTag.closest(".MuiChip-root")).toHaveClass(
        "MuiChip-colorSecondary"
      );

      const highTag = screen.getByText("High Priority");
      await user.click(highTag);

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith("priority", "high");
    });
  });

  // 11. Theme Testing Tests
  describe("Theme Testing", () => {
    it("should render correctly across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsTagGroup
            name="priority"
            value="medium"
            multi={false}
            onChange={() => {}}
            data-testid={`tag-${colorScheme}`}
          >
            <DsTag value="low" label="Low Priority" selected={false} />
            <DsTag value="medium" label="Medium Priority" selected={false} />
            <DsTag value="high" label="High Priority" selected={false} />
            <DsTag value="urgent" label="Urgent" selected={false} />
          </DsTagGroup>
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
    it("should apply correct theme background colors across all themes", () => {
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

      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for background color validation
      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        const { container, unmount } = renderWithTheme(
          <DsTagGroup
            name="priority"
            value="medium"
            multi={false}
            onChange={() => {}}
            data-testid={`tag-bg-${colorScheme}`}
            sx={{
              color: "var(--ds-colour-typoActionSecondary)",
            }}
          >
            <DsTag value="low" label="Low Priority" selected={false} />
            <DsTag value="medium" label="Medium Priority" selected={false} />
            <DsTag value="high" label="High Priority" selected={false} />
            <DsTag value="urgent" label="Urgent" selected={false} />
          </DsTagGroup>,

          colorScheme
        );

        // Verify the tag renders correctly
        const tagElement = container.querySelector(
          `[data-testid="tag-bg-${colorScheme}"]`
        ) as HTMLElement;
        expect(tagElement).toBeInTheDocument();
        expect(tagElement).toHaveClass("MuiStack-root");

        // Verify theme context is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify the computed background color uses the correct CSS variable
        const computedStyles = window.getComputedStyle(tagElement);
        const actualColor = computedStyles.color;
        // The CSS variable should be applied
        expect(actualColor).toBe("var(--ds-colour-typoActionSecondary)");

        // Verify that the design system color for typoActionSecondary matches expected theme color
        const actualTypoActionSecondary =
          schemeData?.ds?.colour?.typoActionSecondary;
        expect(actualTypoActionSecondary).toBe(expectations.expectedBgColor);

        unmount();
      });
    });
  });

  // 12. Snapshot Testing Tests
  describe("Snapshot Testing", () => {
    it("should match snapshots for key component states", () => {
      // Unselected state
      const { container: unselectedContainer } = renderSingleModeTagGroup({
        value: "",
      });
      expect(unselectedContainer.firstChild).toMatchSnapshot(
        "tag-group-unselected"
      );

      // Selected state in single mode
      const { container: selectedContainer } = renderSingleModeTagGroup({
        value: "option2",
      });
      expect(selectedContainer.firstChild).toMatchSnapshot(
        "tag-group-single-selected"
      );

      // Multi-selected state
      const { container: multiContainer } = renderMultiModeTagGroup({
        value: ["tag1", "tag3"],
      });
      expect(multiContainer.firstChild).toMatchSnapshot(
        "tag-group-multi-selected"
      );

      // Empty multi mode
      const { container: emptyMultiContainer } = renderMultiModeTagGroup({
        value: [],
      });
      expect(emptyMultiContainer.firstChild).toMatchSnapshot(
        "tag-group-multi-empty"
      );
    });

    it("should match snapshot across themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((colorScheme) => {
        const { container } = renderWithTheme(
          <DsTagGroup
            name={`snapshot-${colorScheme}`}
            value="tag2"
            multi={false}
            onChange={vi.fn()}
          >
            <DsTag value="tag1" label="Tag 1" selected={false} />
            <DsTag value="tag2" label="Tag 2" selected={false} />
            <DsTag value="tag3" label="Tag 3" selected={false} />
          </DsTagGroup>,
          colorScheme
        );

        expect(container.firstChild).toMatchSnapshot(
          `tag-group-theme-${colorScheme}`
        );
      });
    });

    it("should match snapshot for complex real-world scenario", () => {
      const { container } = render(
        <DsBox sx={{ p: 3, maxWidth: 600 }}>
          <DsTagGroup
            name="complex-scenario"
            value={["react", "typescript", "testing"]}
            multi={true}
            onChange={vi.fn()}
          >
            <DsTag value="react" label="React" selected={false} />
            <DsTag value="vue" label="Vue" selected={false} />
            <DsTag value="angular" label="Angular" selected={false} />
            <DsTag value="typescript" label="TypeScript" selected={false} />
            <DsTag value="javascript" label="JavaScript" selected={false} />
            <DsTag value="testing" label="Testing" selected={false} />
          </DsTagGroup>
        </DsBox>
      );

      expect(container.firstChild).toMatchSnapshot(
        "tag-group-complex-real-world"
      );
    });
  });
});
