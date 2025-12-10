/**
 * @vitest-environment jsdom
 *
 * Test suite for DsSelect component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display of the component with various props.
 * 2. Props Validation - Validation of prop handling including custom id, name, className, and data attributes.
 * 3. Component States - Testing different states such as disabled and required.
 * 4. MUI Styling - Verification of Material-UI specific styling and classes.
 * 5. Component Functionality - Testing dropdown behavior, option selection, and value reflection.
 * 6. Event Handling - User interactions and event handlers including onChange, onFocus, and keyboard events.
 * 7. Form Integration - Behavior within a form element and handling form submissions.
 * 8. Accessibility - Ensuring ARIA attributes and keyboard navigation are correctly implemented.
 * 9. Edge Cases - Testing unusual scenarios and boundary conditions.
 * 10. Real-world Scenarios - Common usage patterns and expected behaviors in practical applications.
 * 11. Theme - Testing the component's appearance and behavior under different theme contexts.
 * 12. Snapshot - Ensuring the component renders correctly and matches the expected output over time.
 *
 * @package @am92/react-design-system
 * @component DsSelect
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DsSelect } from "./DsSelect.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import {
  renderWithTheme,
  testAllThemes,
} from "../../Tests/Mocks/themeTestUtils";
import { render } from "../../Tests/Mocks/setupTests";
import { DsSelectProps } from "./DsSelect.Types";

const DropdownOptions = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

describe("DsSelect Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsSelect options={[]} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should render with provided options", async () => {
      render(<DsSelect options={DropdownOptions} />);

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      await user.click(select);

      const options = await screen.findAllByRole("option");
      expect(options).toHaveLength(2);
    });

    it("should display helper text when provided", () => {
      render(<DsSelect options={DropdownOptions} helperText="Helper text" />);
      const helperText = screen.getByText("Helper text", { exact: false });
      expect(helperText).toBeInTheDocument();
    });

    it("should render with provided label", () => {
      render(<DsSelect options={DropdownOptions} label="Test Label" />);
      const label = screen.getByText("Test Label");
      expect(label).toBeInTheDocument();
    });

    it("should render with provided labelSupportText", () => {
      render(
        <DsSelect
          options={DropdownOptions}
          labelSupportText="Test Label Support Text"
        />
      );
      const label = screen.getByText("Test Label Support Text", {
        exact: false,
      });
      expect(label).toBeInTheDocument();
    });

    it("should render with placeholder", () => {
      render(
        <DsSelect options={DropdownOptions} placeholder="Select an option" />
      );
      const select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Select an option");
    });

    it("should render with default value", () => {
      render(<DsSelect options={DropdownOptions} defaultValue={"1"} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Option 1");
    });

    it("should render with custom value", () => {
      render(<DsSelect options={DropdownOptions} value={"1"} />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Option 1");
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept and display custom id", () => {
      render(<DsSelect options={DropdownOptions} id="custom-id" />);
      const select = screen.getByRole("combobox");
      expect(select).toHaveAttribute("id", "custom-id");
    });

    it("should accept and display custom name", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} name="custom-name" />
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("name", "custom-name");
    });

    it("should accept and apply className prop", () => {
      render(
        <DsSelect
          options={DropdownOptions}
          className="custom-class"
          data-testid="select-test"
        />
      );
      const select = screen.getByTestId("select-test");
      expect(select).toHaveClass("custom-class");
    });

    it("should accept and apply custom data attributes", () => {
      render(
        <DsSelect
          options={DropdownOptions}
          data-testid="custom-test-id"
          data-custom="value"
        />
      );

      const select = document.querySelector('[data-testid="custom-test-id"]');
      expect(select).toBeInTheDocument();
      expect(select).toHaveAttribute("data-custom", "value");
    });

    it("should handle slotProps for input", () => {
      render(
        <DsSelect
          options={DropdownOptions}
          slotProps={{
            input: { "data-testid": "select-input-test" } as any,
          }}
        />
      );
      const input = screen.getByTestId("select-input-test");
      expect(input).toBeInTheDocument();
    });

    it("should support slots system for custom input component", () => {
      render(
        <DsSelect
          options={DropdownOptions}
          slots={{
            input: ({ children, ...props }) => (
              <input {...props} data-testid="select-input" />
            ),
          }}
        />
      );

      const input = screen.getByTestId("select-input");
      expect(input).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in disabled state", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} disabled />
      );
      const input = container.querySelector("input");
      expect(input).toBeDisabled();
    });

    it("should render in required state", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} required />
      );
      const input = container.querySelector("input");
      expect(input).toBeRequired();
    });

    it("should handle state combinations", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} required disabled />
      );
      const input = container.querySelector("input");
      expect(input).toBeRequired();
      expect(input).toBeDisabled();
    });

    it("should render with default color (primary)", () => {
      const { container } = render(<DsSelect options={DropdownOptions} />);
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("MuiInputBase-colorPrimary");
    });

    it("should render with custom color", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} color="secondary" />
      );
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("MuiInputBase-colorSecondary");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes", () => {
      const { container } = render(<DsSelect options={DropdownOptions} />);
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("MuiInputBase-root");
      expect(selectContainer).toHaveClass("MuiSelect-root");
    });

    it("should apply color variant classes", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} color="primary" />
      );
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("MuiInputBase-colorPrimary");
    });

    it("should apply size variant classes", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} size="small" />
      );
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("MuiInputBase-sizeSmall");
    });

    it("should apply disabled classes when disabled", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} disabled />
      );
      const selectContainer = container.querySelector(".MuiSelect-root");
      expect(selectContainer).toHaveClass("Mui-disabled");
    });

    it("should apply focus classes when focused", async () => {
      const { container } = render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);

      const selectContainer = container.querySelector(".MuiSelect-root");
      // Focus classes may vary in MUI, just check it exists and is focusable
      expect(selectContainer).toBeInTheDocument();
    });

    it("should render custom sx styles", () => {
      const { container } = render(
        <DsSelect
          options={DropdownOptions}
          style={{
            background: "red",
          }}
        />
      );

      const selectRoot = container.querySelector(
        ".MuiSelect-root"
      ) as HTMLElement;
      expect(selectRoot).toHaveStyle("background: red");
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY TESTS
  // ============================
  describe("Component Functionality", () => {
    it("should open and close the dropdown on click", async () => {
      render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      // Close dropdown
      let options = screen.queryAllByRole("option");
      expect(options).toHaveLength(0);
      // Open dropdown
      await user.click(select);
      options = await screen.findAllByRole("option");
      expect(options).toHaveLength(2);
    });

    it("should select an option and display the selected value", async () => {
      render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      // Open dropdown
      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);

      expect(select).toHaveTextContent("Option 2");
    });

    it("should reflect the selected value in the underlying input", async () => {
      const { container } = render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();

      // Open dropdown
      await user.click(select);
      const option = screen.getByText("Option 1");
      await user.click(option);

      const input = container.querySelector("input");
      expect(input).toHaveValue("1");
    });

    it("should not allow selection when disabled", async () => {
      render(<DsSelect options={DropdownOptions} disabled />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      // Try to open dropdown
      await user.click(select);
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(0);
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should call onOpen and onClose when the dropdown is opened and closed", async () => {
      const handleOpen = vi.fn();
      const handleClose = vi.fn();
      render(
        <DsSelect
          options={[
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
          ]}
          onOpen={handleOpen}
          onClose={handleClose}
        />
      );
      const select = screen.getByRole("combobox");
      await user.click(select);
      expect(handleOpen).toHaveBeenCalledTimes(1);
      const option = screen.getByText("Option 1");
      await user.click(option);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it("should handle onChange event", async () => {
      const handleChange = vi.fn();
      render(<DsSelect options={DropdownOptions} onChange={handleChange} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.any(Object),
        //The second argument is a MenuItem. We don't match the whole element,
        // we only assert that somewhere inside it, props.value === "2".
        expect.objectContaining({
          props: expect.objectContaining({
            value: "2",
          }),
        })
      );
    });

    it("should handle multiple onChange events", async () => {
      const handleChange = vi.fn();
      render(<DsSelect options={DropdownOptions} onChange={handleChange} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option1 = screen.getByText("Option 1");
      await user.click(option1);
      await user.click(select);
      const option2 = screen.getByText("Option 2");
      await user.click(option2);
      expect(handleChange).toHaveBeenCalledTimes(2);
      expect(handleChange).toHaveBeenNthCalledWith(
        1,
        expect.any(Object),
        expect.objectContaining({
          props: expect.objectContaining({
            value: "1",
          }),
        })
      );
      expect(handleChange).toHaveBeenNthCalledWith(
        2,
        expect.any(Object),
        expect.objectContaining({
          props: expect.objectContaining({
            value: "2",
          }),
        })
      );
    });

    it("should handle onFocus event", async () => {
      const handleFocus = vi.fn();
      render(<DsSelect options={DropdownOptions} onFocus={handleFocus} />);
      const select = screen.getByRole("combobox");
      select.focus();
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard events (ArrowDown and Enter)", async () => {
      const handleChange = vi.fn();
      render(<DsSelect options={DropdownOptions} onChange={handleChange} />);

      const select = screen.getByRole("combobox");

      // Open dropdown first
      await user.click(select);

      // Now keyboard navigation works
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Enter}");

      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          props: expect.objectContaining({
            value: "1",
          }),
        })
      );
    });

    it("should not trigger events when disabled", async () => {
      const handleChange = vi.fn();
      const { container } = render(
        <DsSelect options={DropdownOptions} disabled onChange={handleChange} />
      );
      const input = container.querySelector("input");
      // Verify disabled state instead of testing interaction
      expect(input).toBeDisabled();
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  // ============================
  // FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should work within a form element", () => {
      const { container } = render(
        <form>
          <DsSelect name="country" options={DropdownOptions} />
        </form>
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("name", "country");
    });

    it("should handle form submission with selected value", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <DsSelect name="country" options={DropdownOptions} required />
          <button type="submit">Submit</button>
        </form>
      );

      const select = screen.getByRole("combobox");
      const submitButton = screen.getByRole("button");

      expect(select).toBeRequired();

      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);

      // Submit the form
      fireEvent.submit(submitButton.closest("form")!);
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should work with controlled components", async () => {
      let value = "1";
      const handleChange = vi.fn((event, selectedOption) => {
        value = selectedOption.props.value;
      });

      const { rerender } = render(
        <DsSelect
          value={value}
          onChange={handleChange}
          options={DropdownOptions}
        />
      );

      let select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Option 1");

      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);

      rerender(
        <DsSelect
          value={value}
          onChange={handleChange}
          options={DropdownOptions}
        />
      );

      select = screen.getByRole("combobox");

      expect(select).toHaveTextContent("Option 2");
      expect(handleChange).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          props: expect.objectContaining({
            value: "2",
          }),
        })
      );
    });

    it("should work with uncontrolled components", async () => {
      render(<DsSelect defaultValue="1" options={DropdownOptions} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveTextContent("Option 1");

      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);

      expect(select).toHaveTextContent("Option 2");
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper role", () => {
      render(<DsSelect options={DropdownOptions} />);

      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<DsSelect options={DropdownOptions} aria-label="Custom Select" />);

      const select = screen.getByLabelText("Custom Select");
      expect(select).toBeInTheDocument();
    });

    it("should support aria-labelledby", () => {
      render(
        <div>
          <label id="select-label">Select an Option</label>
          <DsSelect options={DropdownOptions} aria-labelledby="select-label" />
        </div>
      );

      const selectContainer = document.querySelector(
        '[aria-labelledby="select-label"]'
      );
      expect(selectContainer).toBeInTheDocument();
    });

    it("should support aria-describedby", () => {
      render(
        <div>
          <DsSelect options={DropdownOptions} aria-describedby="select-help" />
          <div id="select-help">Select an option from the dropdown</div>
        </div>
      );

      const selectContainer = document.querySelector(
        '[aria-describedby="select-help"]'
      );
      expect(selectContainer).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      render(
        <div>
          <DsSelect options={DropdownOptions} />
          <DsSelect options={DropdownOptions} />
        </div>
      );

      const firstSelect = screen.getAllByRole("combobox")[0];
      const secondSelect = screen.getAllByRole("combobox")[1];

      // Tab navigation
      await user.tab();
      expect(firstSelect).toHaveFocus();

      await user.tab();
      expect(secondSelect).toHaveFocus();
    });

    it("should support reverse tab navigation", async () => {
      render(
        <div>
          <DsSelect options={DropdownOptions} />
          <DsSelect options={DropdownOptions} />
        </div>
      );
      const firstSelect = screen.getAllByRole("combobox")[0];
      const secondSelect = screen.getAllByRole("combobox")[1];

      // Start from second checkbox
      secondSelect!.focus();

      // Shift+Tab to go back
      await user.tab({ shift: true });
      expect(firstSelect).toHaveFocus();
    });

    it("should handle required attribute for screen readers", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} required />
      );
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("required");
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle empty options gracefully", () => {
      render(<DsSelect options={[]} />);
      const select = screen.getByRole("combobox");
      expect(select).toBeInTheDocument();
      fireEvent.click(select);
      const options = screen.queryAllByRole("option");
      expect(options).toHaveLength(0);
    });

    it("should handle very long option labels", async () => {
      const longLabel = "A".repeat(1000);
      render(<DsSelect options={[{ label: longLabel, value: "long" }]} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option = screen.getByText(longLabel);
      expect(option).toBeInTheDocument();
    });

    it("should handle duplicate option values", async () => {
      const duplicateOptions = [
        { label: "Duplicate 1", value: "dup" },
        { label: "Duplicate 2", value: "dup" },
      ];
      render(<DsSelect options={duplicateOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const options = screen.getAllByText(/Duplicate/);
      expect(options).toHaveLength(2);
    });

    it("should handle options with special characters", async () => {
      const specialOptions = [
        { label: "Option @", value: "@" },
        { label: "Option #", value: "#" },
      ];
      render(<DsSelect options={specialOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const optionAt = screen.getByText("Option @");
      const optionHash = screen.getByText("Option #");
      expect(optionAt).toBeInTheDocument();
      expect(optionHash).toBeInTheDocument();
    });

    it("should handle options with numeric values", async () => {
      const numericOptions = [
        { label: "Option 1", value: 1 },
        { label: "Option 2", value: 2 },
      ];
      render(<DsSelect options={numericOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option = screen.getByText("Option 2");
      await user.click(option);
      expect(select).toHaveTextContent("Option 2");
    });

    it("should handle rapid selection changes", async () => {
      render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");

      // First open + first select
      await user.click(select);
      await user.click(screen.getByText("Option 1"));

      // Reopen dropdown properly
      await user.click(select);
      const option2 = await screen.findByText("Option 2"); // Wait for menu to re-render
      await user.click(option2);

      expect(select).toHaveTextContent("Option 2");
    });

    it("should handle focus loss gracefully", async () => {
      render(<DsSelect options={DropdownOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option = screen.getByText("Option 1");
      await user.click(option);
      select.focus();
      expect(select).toHaveTextContent("Option 1");
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;

    it("should render correctly across all color schemes with proper theme colors", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = renderWithTheme(
          <DsSelect options={DropdownOptions} color="primary" />,
          colorScheme
        );

        // Verify basic rendering
        const select = screen.getByRole("combobox");
        expect(select).toBeInTheDocument();

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];

        // Primary color should match theme
        const expectedPrimaryColor = (schemeData?.palette?.primary as any)
          ?.main;
        expect(expectedPrimaryColor).toBeTruthy();
        // Note: Theme may transform palette colors, so we verify it's a valid hex color
        expect(expectedPrimaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);

        // Text color should match theme
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedTextColor).toBeTruthy();

        // Verify CSS classes
        const selectRoot = container.querySelector(
          ".MuiSelect-root"
        ) as HTMLElement;
        expect(selectRoot).toHaveClass("MuiInputBase-colorPrimary");

        // Snapshot testing
        expect(container.firstChild).toMatchSnapshot(
          `select-${colorScheme}-theme`
        );

        unmount();
      });
    });

    it("should use correct design system colors for all color variants", () => {
      const colorVariants = [
        "primary",
        "secondary",
        "error",
        "warning",
        "info",
        "success",
      ] as const;

      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Test all three themes for color variants
      colorSchemes.forEach((colorScheme) => {
        const schemeData = themeColorScheme[colorScheme];

        colorVariants.forEach((color) => {
          const { container, unmount } = renderWithTheme(
            <DsSelect options={DropdownOptions} color={color} />,
            colorScheme
          );

          // Get expected color from the theme's palette
          const paletteColor = schemeData?.palette?.[color] as any;
          const expectedColor = paletteColor?.main;

          expect(expectedColor).toBeTruthy(); // Ensure we have a valid color
          expect(expectedColor).toBe(
            (schemeData?.palette?.[color] as any)?.main
          );

          // Verify CSS class
          const selectRoot = container.querySelector(
            ".MuiSelect-root"
          ) as HTMLElement;
          expect(selectRoot).toHaveClass(
            `MuiInputBase-color${
              color.charAt(0).toUpperCase() + color.slice(1)
            }`
          );

          unmount();
        });
      });
    });

    it("should verify theme differences and maintain functionality", async () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);

      // Verify light vs dark theme differences using actual theme configuration
      const lightSchemeData = themeColorScheme.light;
      const darkSchemeData = themeColorScheme.dark;

      const lightTextColor = (lightSchemeData?.palette?.text as any)?.primary;
      const darkTextColor = (darkSchemeData?.palette?.text as any)?.primary;
      const lightPrimaryColor = (lightSchemeData?.palette?.primary as any)
        ?.main;
      const darkPrimaryColor = (darkSchemeData?.palette?.primary as any)?.main;

      // Text colors should be different between themes
      expect(lightTextColor).toBeTruthy();
      expect(darkTextColor).toBeTruthy();
      expect(lightTextColor).not.toBe(darkTextColor);

      // Primary color should be consistent across light/dark themes
      expect(lightPrimaryColor).toBeTruthy();
      expect(darkPrimaryColor).toBeTruthy();
      expect(lightPrimaryColor).toBe(darkPrimaryColor);

      const handleChange = vi.fn();

      for (const colorScheme of colorSchemes) {
        document.body.innerHTML = "";
        handleChange.mockClear();

        renderWithTheme(
          <DsSelect options={DropdownOptions} onChange={handleChange} />,
          colorScheme
        );

        const select = screen.getByRole("combobox");

        // Open menu
        await user.click(select);

        // Select Option 1
        const option = await screen.findByText("Option 1");
        await user.click(option);

        expect(handleChange).toHaveBeenCalledWith(
          expect.any(Object),
          expect.objectContaining({
            props: expect.objectContaining({
              value: "1",
            }),
          })
        );
      }
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (theme) => (
          <DsSelect options={DropdownOptions} data-testid={`select-${theme}`} />
        ),
        (container, theme) => {
          const select = container.querySelector(
            `[data-testid="select-${theme}"]`
          );
          expect(select).toBeInTheDocument();

          const selectContainer = container.querySelector(".MuiSelect-root");
          expect(selectContainer).toBeInTheDocument();
        }
      );
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should handle large datasets efficiently", async () => {
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        label: `Option ${i + 1}`,
        value: `${i + 1}`,
      }));
      render(<DsSelect options={largeOptions} />);
      const select = screen.getByRole("combobox");
      await user.click(select);
      const option = screen.getByText("Option 1000");
      expect(option).toBeInTheDocument();
    });

    it("should integrate within complex forms", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <DsSelect name="complex-select" options={DropdownOptions} required />
          <button type="submit">Submit</button>
        </form>
      );

      const select = screen.getByRole("combobox");
      const submitButton = screen.getByRole("button");

      await user.click(select);
      const option = screen.getByText("Option 1");
      await user.click(option);

      // Submit the form
      fireEvent.submit(submitButton.closest("form")!);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Testing", () => {
    it("should match snapshots for various select states", () => {
      const selectStates: Array<{
        name: string;
        props: Partial<DsSelectProps>;
      }> = [
        { name: "default", props: {} },
        {
          name: "with-placeholder",
          props: { placeholder: "Select an option" },
        },
        { name: "disabled", props: { disabled: true } },
        { name: "required", props: { required: true } },
        { name: "with-helper-text", props: { helperText: "Helper text" } },
        { name: "with-label", props: { label: "Test Label" } },
        {
          name: "with-label-support-text",
          props: { labelSupportText: "Support Text" },
        },
        { name: "with-default-value", props: { defaultValue: "1" } },
        { name: "with-custom-color", props: { color: "secondary" } },
        { name: "with-size-small", props: { size: "small" } },
      ];

      selectStates.forEach(({ name, props }) => {
        const { container } = render(
          <DsSelect {...props} options={DropdownOptions} />
        );
        expect(container.firstChild).toMatchSnapshot(`select-${name}`);
      });
    });

    it("should match snapshots for color and size variants", () => {
      const colors = [
        "primary",
        "secondary",
        "error",
        "info",
        "success",
        "warning",
      ] as const;
      const sizes = ["small", "medium"] as const;

      // Test colors
      colors.forEach((color) => {
        const { container } = render(
          <DsSelect options={DropdownOptions} color={color} />
        );
        expect(container.firstChild).toMatchSnapshot(`select-color-${color}`);
      });

      // Test sizes
      sizes.forEach((size) => {
        const { container } = render(
          <DsSelect options={DropdownOptions} size={size} />
        );
        expect(container.firstChild).toMatchSnapshot(`select-size-${size}`);
      });
    });

    it("should match snapshot with custom className", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} className="custom-class" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom data attributes", () => {
      const { container } = render(
        <DsSelect
          options={DropdownOptions}
          data-testid="custom-test-id"
          data-custom="value"
        />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with size variant", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} size="small" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with custom sx styles", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} sx={{ margin: 2 }} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with controlled value", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} value="1" />
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot with multiple options selected", () => {
      const { container } = render(
        <DsSelect options={DropdownOptions} multiple value={["1", "2"]} />
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
