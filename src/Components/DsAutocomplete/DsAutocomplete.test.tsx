/**
 * @vitest-environment jsdom
 *
 * Test suite for DsAutocomplete component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states (disabled, loading, error)
 * 4. MUI Styling - Material-UI specific styling and classes
 * 5. Component Functionality - Basic autocomplete behavior
 * 6. Event Handling - User interactions that don't depend on option rendering
 * 7. Form Integration - Form behavior and validation
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Real-world Scenarios - Common usage patterns
 * 11. Theme Testing - Theme consistency across color modes
 * 12. Snapshot Testing - Visual regression protection
 *
 * @package @am92/react-design-system
 * @component DsAutocomplete
 */

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  testAllThemes,
} from "../../Tests/Mocks/testUtils";
import userEvent from "@testing-library/user-event";
import { DsAutocomplete } from "./DsAutocomplete.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import {
  DsBox,
  DsTypography,
  DsButton,
  DsFormControl,
  DsFormLabel,
  DsPaper,
  DsStack,
  DsTextField,
  DsRemixIcon,
  DsInputBase,
  DsChip,
} from "../index";

// Sample data for testing
const standardOptions = [
  { name: "appbar", value: "first" },
  { name: "textbox", value: "second" },
  { name: "checkbox", value: "third" },
  { name: "button", value: "fourth" },
];

// Test utilities to reduce code duplication
const renderStandardAutocomplete = (props: any = {}) => {
  const {
    options = standardOptions,
    placeholder = "Select any component",
    renderInput,
    renderOption,
    getOptionLabel = (option: { name: string; value: string }) => option.name,
    ...restProps
  } = props;

  const defaultRenderInput =
    renderInput ||
    ((params: any) => {
      const { InputLabelProps, InputProps, ...restParams } = params;
      return (
        <DsInputBase
          {...InputProps}
          {...restParams}
          sx={{ width: "200px" }}
          placeholder={placeholder}
        />
      );
    });

  const defaultRenderOption =
    renderOption ||
    ((props: any, option: { name: string; value: string }) => (
      <li {...props}>
        <DsBox
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DsTypography>{option?.name}</DsTypography>
          <DsChip label={option?.value} />
        </DsBox>
      </li>
    ));

  return render(
    <DsAutocomplete
      options={options}
      renderInput={defaultRenderInput}
      renderOption={defaultRenderOption}
      getOptionLabel={getOptionLabel}
      {...restProps}
    />
  );
};

const renderTextFieldAutocomplete = (props: any = {}) => {
  const {
    options = standardOptions,
    label = "Test Label",
    ...restProps
  } = props;

  return render(
    <DsAutocomplete
      options={options}
      renderInput={(params) => <DsTextField {...params} label={label} />}
      {...restProps}
    />
  );
};

const expectBasicAutocomplete = (label?: string, container?: HTMLElement) => {
  const inputs = screen.getAllByRole("combobox");
  const input = label
    ? inputs.find(
        (input) =>
          input
            .getAttribute("aria-labelledby")
            ?.includes(label.replace(" ", "-").toLowerCase()) ||
          screen.queryByLabelText(label) === input
      ) || inputs[inputs.length - 1]
    : inputs[inputs.length - 1]; // Get the last rendered input if no label specified

  expect(input).toBeInTheDocument();
  if (label) {
    expect(input).toHaveAccessibleName(label);
  }
  return input;
};

describe("DsAutocomplete Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      renderStandardAutocomplete();
      const input = expectBasicAutocomplete();
      expect(input).toHaveAttribute("placeholder", "Select any component");
    });

    it("should render with default MUI classes", () => {
      const { container } = renderStandardAutocomplete();
      const autocompleteRoot = container.querySelector(".MuiAutocomplete-root");
      expect(autocompleteRoot).toBeInTheDocument();
      expect(autocompleteRoot).toHaveClass("MuiAutocomplete-root");
    });

    it("should render with custom icons and labels", () => {
      const { container } = renderTextFieldAutocomplete({
        label: (
          <>
            Icon Test
            <DsRemixIcon className="ri-search-line" />
          </>
        ),
      });

      const searchIcon = container.querySelector(".ri-search-line");
      expect(searchIcon).toBeInTheDocument();
      expectBasicAutocomplete();
    });

    it("should render with custom renderInput and placeholder", () => {
      renderStandardAutocomplete({ placeholder: "Search options..." });
      const input = screen.getByPlaceholderText("Search options...");
      expect(input).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {
    it("should accept custom id and handle object options", async () => {
      const customOptions = [
        { name: "appbar", value: "first" },
        { name: "textbox", value: "second" },
        { name: "checkbox", value: "third" },
      ];

      renderStandardAutocomplete({
        id: "custom-autocomplete-id",
        options: customOptions,
      });

      const input = expectBasicAutocomplete();
      expect(input).toHaveAttribute("id", "custom-autocomplete-id");
      expect(input).toHaveAttribute("placeholder", "Select any component");

      // Open dropdown to verify options are available
      await user.click(input);
      customOptions.forEach((option) => {
        expect(screen.getByText(option.name)).toBeInTheDocument();
      });
    });

    it("should handle various autocomplete modes", () => {
      // Test empty options
      renderTextFieldAutocomplete({ options: [], label: "No Options" });
      expectBasicAutocomplete("No Options");

      // Test multiple selection
      renderTextFieldAutocomplete({
        multiple: true,
        label: "Multiple Selection",
      });
      expectBasicAutocomplete("Multiple Selection");

      // Test freeSolo mode
      renderTextFieldAutocomplete({ freeSolo: true, label: "Free Solo Mode" });
      expectBasicAutocomplete("Free Solo Mode");
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    const states = [
      {
        props: { disabled: true },
        label: "Disabled",
        expectation: (input: HTMLElement) => expect(input).toBeDisabled(),
      },
      {
        props: { loading: true },
        label: "Loading",
        expectation: (input: HTMLElement) => expect(input).toBeInTheDocument(),
      },
      {
        props: { readOnly: true },
        label: "ReadOnly",
        expectation: (input: HTMLElement) =>
          expect(input).toHaveAttribute("readonly"),
      },
    ];

    states.forEach(({ props, label, expectation }) => {
      it(`should render in ${label.toLowerCase()} state`, () => {
        renderTextFieldAutocomplete({
          ...props,
          label: `${label} Autocomplete`,
        });
        const input = expectBasicAutocomplete(`${label} Autocomplete`);
        expectation(input);
      });
    });

    it("should handle error and required states", () => {
      // Error state
      renderTextFieldAutocomplete({
        renderInput: (params: any) => (
          <DsTextField
            {...params}
            label="Error Autocomplete"
            error
            helperText="This field has an error"
          />
        ),
      });
      let input = expectBasicAutocomplete("Error Autocomplete");
      expect(input).toHaveAttribute("aria-invalid", "true");

      // Required state
      renderTextFieldAutocomplete({
        renderInput: (params: any) => (
          <DsTextField {...params} label="Required Autocomplete" required />
        ),
      });
      input = expectBasicAutocomplete("Required Autocomplete");
      expect(input).toBeRequired();
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI classes and states", async () => {
      // Test default classes
      let { container } = renderTextFieldAutocomplete({
        label: "MUI Classes Test",
      });
      let autocompleteRoot = container.querySelector(".MuiAutocomplete-root");
      expect(autocompleteRoot).toHaveClass("MuiAutocomplete-root");
      expect(autocompleteRoot).toHaveClass("MuiAutocomplete-hasPopupIcon");

      // Test focused class
      let input = expectBasicAutocomplete("MUI Classes Test");
      await user.click(input);
      const inputBase = input.closest(".MuiInputBase-root");
      expect(inputBase).toHaveClass("Mui-focused");

      // Test disabled class
      ({ container } = renderTextFieldAutocomplete({
        disabled: true,
        label: "Disabled Class Test",
      }));
      const disabledInputBase = container.querySelector(".MuiInputBase-root");
      expect(disabledInputBase).toHaveClass("Mui-disabled");
    });

    it("should render custom icons properly", () => {
      const { container } = renderTextFieldAutocomplete({
        label: (
          <>
            <DsRemixIcon className="ri-close-line" />
          </>
        ),
      });

      const autocompleteRoot = container.querySelector(".MuiAutocomplete-root");
      expect(autocompleteRoot).toHaveClass("MuiAutocomplete-hasPopupIcon");

      const searchIcon = container.querySelector(".ri-close-line");
      expect(searchIcon).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY TESTS
  // ============================
  describe("Component Functionality", () => {
    it("should handle basic interactions and modes", async () => {
      // Test dropdown opening
      renderTextFieldAutocomplete({ label: "Dropdown Test" });
      let input = expectBasicAutocomplete("Dropdown Test");
      await user.click(input);
      expect(input).toHaveAttribute("aria-expanded", "true");

      // Test input changes in freeSolo mode
      renderTextFieldAutocomplete({
        freeSolo: true,
        label: "Input Change Test",
      });
      input = expectBasicAutocomplete("Input Change Test");
      await user.type(input, "test");
      expect(input).toHaveValue("test");
    });

    it("should handle clear button and multiple selection", async () => {
      const handleChange = vi.fn();

      // Test clear button functionality
      const { container } = renderTextFieldAutocomplete({
        onChange: handleChange,
        label: "Clear Test",
      });
      const clearButton = container.querySelector(
        ".MuiAutocomplete-clearIndicator"
      );
      if (clearButton) {
        await user.click(clearButton);
        expect(handleChange).toHaveBeenCalled();
      }

      // Test multiple selection mode
      const { container: multiContainer } = renderTextFieldAutocomplete({
        multiple: true,
        label: "Multiple Test",
      });
      const multiAutocompleteRoot = multiContainer.querySelector(
        ".MuiAutocomplete-root"
      );
      expect(multiAutocompleteRoot).toBeInTheDocument();
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle onChange and onInputChange events", async () => {
      const handleChange = vi.fn();
      const handleInputChange = vi.fn();

      renderStandardAutocomplete({
        onChange: handleChange,
        placeholder: "OnChange Test",
      });
      let input = expectBasicAutocomplete();

      // Open dropdown and select an option to trigger onChange
      await user.click(input);
      const option = screen.getByText(standardOptions[0].name);
      await user.click(option);

      expect(handleChange).toHaveBeenCalled();

      // Test onInputChange
      renderTextFieldAutocomplete({
        onInputChange: handleInputChange,
        label: "OnInputChange Test",
      });
      input = expectBasicAutocomplete("OnInputChange Test");
      await user.type(input, "t");
      expect(handleInputChange).toHaveBeenCalled();
    });
    it("should handle onOpen and onClose events", async () => {
      const handleOpen = vi.fn();
      const handleClose = vi.fn();

      // Test onOpen
      renderTextFieldAutocomplete({
        onOpen: handleOpen,
        label: "OnOpen Test",
      });
      let input = expectBasicAutocomplete("OnOpen Test");
      await user.click(input);
      expect(handleOpen).toHaveBeenCalled();

      // Test onClose
      renderTextFieldAutocomplete({
        onClose: handleClose,
        label: "OnClose Test",
      });
      input = expectBasicAutocomplete("OnClose Test");
      await user.click(input);
      await user.click(document.body);
      expect(handleClose).toHaveBeenCalled();
    });

    it("should handle keyboard events", async () => {
      renderTextFieldAutocomplete({ label: "Keyboard Test" });
      const input = expectBasicAutocomplete("Keyboard Test");

      await user.click(input);
      await user.keyboard("{ArrowDown}");
      await user.keyboard("{Escape}");
      expect(input).toBeInTheDocument();
    });
  });

  // ============================
  // FORM INTEGRATION TESTS
  // ============================
  describe("Form Integration", () => {
    it("should work within form element and handle submission", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <DsAutocomplete
            options={standardOptions}
            renderInput={(params) => (
              <DsTextField
                {...params}
                label="Form Test"
                name="autocomplete-field"
                required
              />
            )}
          />
          <DsButton type="submit">Submit</DsButton>
        </form>
      );

      const input = expectBasicAutocomplete("Form Test");
      expect(input).toHaveAttribute("name", "autocomplete-field");
      expect(input).toBeRequired();

      const form = input.closest("form");
      expect(form).toBeInTheDocument();

      // Simulate form submission by firing the submit event directly on the form
      fireEvent.submit(form!);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes and accessible name", () => {
      renderTextFieldAutocomplete({ label: "Accessible Autocomplete" });
      const input = expectBasicAutocomplete("Accessible Autocomplete");

      expect(input).toHaveAttribute("aria-expanded", "false");
      expect(input).toHaveAttribute("aria-autocomplete", "list");
      expect(input).toHaveAccessibleName("Accessible Autocomplete");
    });

    it("should support keyboard navigation and aria-describedby", async () => {
      // Test keyboard navigation
      renderTextFieldAutocomplete({ label: "Keyboard Navigation" });
      let input = expectBasicAutocomplete("Keyboard Navigation");

      await user.tab();
      expect(input).toHaveFocus();

      await user.keyboard("{ArrowDown}");
      await user.keyboard("{ArrowUp}");
      expect(input).toBeInTheDocument();

      // Test aria-describedby
      renderTextFieldAutocomplete({
        renderInput: (params: any) => (
          <DsTextField
            {...params}
            label="Helper Test"
            helperText="This is helper text"
            aria-describedby="helper-text-id"
          />
        ),
      });
      input = expectBasicAutocomplete("Helper Test");
      expect(input).toHaveAttribute("aria-describedby");
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null/undefined values and empty options", () => {
      // Test null value
      renderTextFieldAutocomplete({
        value: null as any,
        label: "Null Value Test",
      });
      let input = expectBasicAutocomplete("Null Value Test");
      expect(input).toHaveValue("");

      // Test empty options
      renderTextFieldAutocomplete({
        options: [],
        label: "Empty Options Test",
      });
      input = expectBasicAutocomplete("Empty Options Test");
      expect(input).toBeInTheDocument();
    });

    it("should handle large datasets and special characters", () => {
      // Test very long option lists
      const longOptions = Array.from(
        { length: 1000 },
        (_, i) => `Option ${i + 1}`
      );
      renderTextFieldAutocomplete({
        options: longOptions,
        label: "Long Options Test",
      });
      let input = expectBasicAutocomplete("Long Options Test");
      expect(input).toBeInTheDocument();

      // Test special and unicode characters
      const specialOptions = [
        "Option with spaces",
        "Option-with-dashes",
        "Option_with_underscores",
        "Option.with.dots",
        "Option (with parentheses)",
        "测试选项",
        "🌟 Star Option",
      ];
      renderTextFieldAutocomplete({
        options: specialOptions,
        label: "Special Characters Test",
      });
      input = expectBasicAutocomplete("Special Characters Test");
      expect(input).toBeInTheDocument();
    });

    it("should handle rapid consecutive interactions", async () => {
      const handleChange = vi.fn();
      renderTextFieldAutocomplete({
        onChange: handleChange,
        label: "Rapid Interaction Test",
      });
      const input = expectBasicAutocomplete("Rapid Interaction Test");

      // Rapid clicking
      await user.click(input);
      await user.click(input);
      await user.click(input);
      expect(input).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work as country selector and tag picker", () => {
      const countries = [
        { label: "United States", code: "US" },
        { label: "Canada", code: "CA" },
        { label: "United Kingdom", code: "UK" },
        { label: "Australia", code: "AU" },
      ];

      // Country selector
      render(
        <DsFormControl fullWidth>
          <DsFormLabel>Select Country</DsFormLabel>
          <DsAutocomplete
            options={countries}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <DsTextField
                {...params}
                placeholder="Choose a country..."
                helperText="Select your country of residence"
              />
            )}
          />
        </DsFormControl>
      );

      expect(screen.getByText("Select Country")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Choose a country...")
      ).toBeInTheDocument();

      // Multi-select tag picker
      const tags = ["React", "Vue", "Angular", "TypeScript"];
      render(
        <DsBox sx={{ p: 3 }}>
          <DsTypography variant="bodyBoldLarge" gutterBottom>
            Select Technologies
          </DsTypography>
          <DsAutocomplete
            multiple
            options={tags}
            renderInput={(params) => (
              <DsTextField
                {...params}
                label="Technologies"
                placeholder="Add technologies..."
              />
            )}
          />
        </DsBox>
      );

      expect(screen.getByText("Select Technologies")).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText("Add technologies...")
      ).toBeInTheDocument();
    });

    it("should work in search form", async () => {
      const handleSearch = vi.fn((e) => e.preventDefault());
      const searchSuggestions = [
        "React components",
        "React hooks",
        "React testing",
      ];

      render(
        <DsPaper sx={{ p: 2 }}>
          <form onSubmit={handleSearch}>
            <DsStack direction="row" spacing={2}>
              <DsAutocomplete
                freeSolo
                options={searchSuggestions}
                sx={{ flexGrow: 1 }}
                renderInput={(params) => (
                  <DsTextField
                    {...params}
                    label="Search"
                    placeholder="What are you looking for?"
                  />
                )}
              />
              <DsButton type="submit" variant="contained" color="primary">
                Search
              </DsButton>
            </DsStack>
          </form>
        </DsPaper>
      );

      const input = screen.getByRole("combobox");
      const searchButton = screen.getByRole("button", { name: /search/i });
      await user.type(input, "React");
      // Use fireEvent for form submission to avoid jsdom issues
      fireEvent.click(searchButton);
      expect(handleSearch).toHaveBeenCalled();
    });

    it("should work with async data", async () => {
      const AsyncAutocomplete = () => {
        const [options, setOptions] = React.useState<string[]>([]);
        const [loading, setLoading] = React.useState(false);

        const loadOptions = async (inputValue: string) => {
          if (inputValue.length < 2) return;
          setLoading(true);
          setTimeout(() => {
            setOptions([`${inputValue} Option 1`, `${inputValue} Option 2`]);
            setLoading(false);
          }, 100);
        };

        return (
          <DsAutocomplete
            options={options}
            loading={loading}
            onInputChange={(event, value) => loadOptions(value)}
            renderInput={(params) => (
              <DsTextField
                {...params}
                label="Async Search"
                helperText="Type at least 2 characters to search"
              />
            )}
          />
        );
      };

      render(<AsyncAutocomplete />);
      const input = screen.getByRole("combobox");
      await user.type(input, "test");
      expect(
        screen.getByText((content) =>
          content.includes("Type at least 2 characters")
        )
      ).toBeInTheDocument();
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ["light", "dark", "highContrast"] as const;
    const themeColorScheme = getColorScheme(PALETTE);

    it("should render consistently across all themes", () => {
      testAllThemes(
        (colorScheme) => (
          <DsAutocomplete
            options={standardOptions}
            data-testid={`autocomplete-${colorScheme}`}
            renderInput={(params) => (
              <DsTextField {...params} label="Theme Test" />
            )}
          />
        ),
        (container, colorScheme) => {
          const autocomplete = container.querySelector(
            `[data-testid="autocomplete-${colorScheme}"]`
          );
          expect(autocomplete).toBeInTheDocument();

          const input = container.querySelector('input[role="combobox"]');
          expect(input).toBeInTheDocument();

          const autocompleteRoot = container.querySelector(
            ".MuiAutocomplete-root"
          );
          expect(autocompleteRoot).toBeInTheDocument();

          // Verify theme attribute is properly set
          const wrapper = container.firstChild as HTMLElement;
          expect(wrapper).toHaveAttribute("data-mui-color-scheme", colorScheme);
        }
      );
    });

    it("should render correctly across all color schemes with proper theme hex colors", () => {
      // Theme-specific expectations mapping for input colors
      const themeExpectations = {
        light: {
          expectedColor: PALETTE.neutral3Light,
        },
        dark: {
          expectedColor: PALETTE.neutral3Dark,
        },
        highContrast: {
          expectedColor: PALETTE.neutral1Dark,
        },
      };

      colorSchemes.forEach((colorScheme) => {
        const { container, unmount } = render(
          <DsAutocomplete
            options={standardOptions}
            renderInput={(params) => (
              <DsInputBase
                {...params}
                sx={{
                  backgroundColor: "var(--ds-colour-neutral3)",
                }}
                placeholder="Select any component"
              />
            )}
          />,
          { colorScheme }
        );

        // Verify basic rendering
        const inputs = container.querySelectorAll('input[role="combobox"]');
        expect(inputs.length).toBeGreaterThan(0);

        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute(
          "data-mui-color-scheme",
          colorScheme
        );

        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        const expectations = themeExpectations[colorScheme];

        // Verify computed styles reference the correct CSS custom properties
        inputs.forEach((input) => {
          const inputBase = input.closest(".MuiInputBase-root") as HTMLElement;

          if (inputBase) {
            const computedStyles = getComputedStyle(inputBase);
            const background = computedStyles.backgroundColor;
            expect(background).toBe("var(--ds-colour-neutral3)");
            const expectedColor = expectations.expectedColor;
            const actualColor = schemeData?.ds?.colour?.neutral3;

            // Verify that the theme color matches expectations
            expect(actualColor).toBe(expectedColor);
          }
        });

        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTING
  // ============================
  describe("Snapshot Testing", () => {
    it("should match snapshots for key component states", () => {
      const states = [
        { props: {}, name: "default" },
        { props: { disabled: true }, name: "disabled" },
        { props: { multiple: true }, name: "multiple" },
        {
          props: {
            renderInput: (params: any) => (
              <DsTextField
                {...params}
                label="Error State"
                error
                helperText="Error message"
              />
            ),
          },
          name: "error",
        },
      ];

      states.forEach(({ props, name }) => {
        const { container } = renderTextFieldAutocomplete({
          label: `Snapshot ${name}`,
          ...props,
        });
        expect(container.firstChild).toMatchSnapshot(`autocomplete-${name}`);
      });
    });

    it("should match snapshot across themes", () => {
      const colorSchemes = ["light", "dark", "highContrast"] as const;

      colorSchemes.forEach((theme) => {
        const { container } = render(
          <DsAutocomplete
            options={standardOptions}
            renderInput={(params) => (
              <DsTextField {...params} label={`Theme ${theme}`} />
            )}
          />,
          { colorScheme: theme }
        );
        expect(container.firstChild).toMatchSnapshot(
          `autocomplete-${theme}-theme`
        );
      });
    });

    it("should match snapshot for complex real-world scenario", () => {
      const { container } = render(
        <DsPaper sx={{ p: 3 }}>
          <DsTypography variant="bodyBoldLarge" gutterBottom>
            Advanced Autocomplete
          </DsTypography>
          <DsStack spacing={2}>
            <DsAutocomplete
              multiple
              options={standardOptions}
              getOptionLabel={(option) => option.value}
              renderInput={(params) => (
                <DsTextField
                  {...params}
                  label="Multi-select with objects"
                  helperText="Select multiple options"
                />
              )}
            />
            <DsAutocomplete
              freeSolo
              options={standardOptions}
              renderInput={(params) => (
                <DsTextField
                  {...params}
                  label="Free solo autocomplete"
                  helperText="You can type custom values"
                />
              )}
            />
          </DsStack>
        </DsPaper>
      );

      expect(container.firstChild).toMatchSnapshot(
        "autocomplete-complex-scenario"
      );
    });
  });
});
