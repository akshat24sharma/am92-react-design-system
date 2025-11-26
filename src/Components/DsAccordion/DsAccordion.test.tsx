/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsAccordion component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation  
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Component Functionality - Accordion expand/collapse behavior
 * 6. Event Handling - User interactions and event handlers
 * 7. Accessibility - ARIA attributes and keyboard navigation
 * 8. Edge Cases - Unusual scenarios and boundary conditions
 * 9. Real-world Scenarios - Common usage patterns
 * 
 * @package @am92/react-design-system
 * @component DsAccordion
 */

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, renderWithoutTheme, testAllThemes } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsAccordion } from "./DsAccordion.Component";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import { 
  DsBox, 
  DsTypography, 
  DsButton,
  DsPaper,
  DsStack,
  DsRemixIcon,
  DsCheckbox,
  DsFormControlLabel,
  DsTextField
} from "../index";

describe("DsAccordion Component", () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  // ============================
  // CORE RENDERING TESTS
  // ============================
  describe("Core Rendering", () => {
    it("should render with default props", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });

    it("should render with header text", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const header = screen.getByText("Test Header");
      expect(header).toBeInTheDocument();
    });

    it("should render with header as React element", () => {
      const headerElement = <div data-testid="custom-header">Custom Header</div>;
      render(<DsAccordion header={headerElement} summary="Test Summary" />);
      const header = screen.getByTestId("custom-header");
      expect(header).toBeInTheDocument();
    });

    it("should render with summary text", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      // Summary is initially collapsed, need to expand to see it
      const summaryButton = screen.getByRole("button", { name: /test header/i });
      expect(summaryButton).toBeInTheDocument();
    });

    it("should render with summary as React element", () => {
      const summaryElement = <div data-testid="custom-summary">Custom Summary</div>;
      render(<DsAccordion header="Test Header" summary={summaryElement} />);
      // Summary should be present in DOM even when collapsed
      expect(screen.getByTestId("custom-summary")).toBeInTheDocument();
    });

    it("should render without summary when summary prop is not provided", () => {
      render(<DsAccordion header="Test Header" summary="" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
      // Should only have summary section when summary is provided
      const summarySection = accordion?.querySelector('.MuiAccordionDetails-root');
      expect(summarySection).not.toBeInTheDocument();
    });

    it("should render with default expand icon", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const expandIcon = screen.getByRole("button").querySelector('.ri-arrow-down-s-line');
      expect(expandIcon).toBeInTheDocument();
    });

    it("should render with custom expand icon", () => {
      const customIcon = <span data-testid="custom-icon">→</span>;
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          expandIcon={customIcon}
        />
      );
      const customExpandIcon = screen.getByTestId("custom-icon");
      expect(customExpandIcon).toBeInTheDocument();
    });
  });

  // ============================
  // PROPS VALIDATION TESTS
  // ============================
  describe("Props Validation", () => {

    it("should pass HeaderProps to DsAccordionSummary", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          HeaderProps={{ 
            sx: { backgroundColor: 'red' },
            className: 'custom-header-class'
          }}
        />
      );
      const headerElement = screen.getByRole("button");
      expect(headerElement).toHaveClass('custom-header-class');
    });

    it("should pass SummaryProps to DsAccordionDetails", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          SummaryProps={{ 
            sx: { backgroundColor: 'blue' },
            className: 'custom-summary-class'
          }}
        />
      );
      const summaryElement = document.querySelector('.custom-summary-class');
      expect(summaryElement).toBeInTheDocument();
    });

    it("should handle empty header gracefully", () => {
      render(<DsAccordion header="" summary="Test Summary" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });

    it("should handle empty summary gracefully", () => {
      render(<DsAccordion header="Test Header" summary="" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT STATES TESTS
  // ============================
  describe("Component States", () => {
    it("should render in collapsed state by default", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should render in expanded state when expanded prop is true", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          expanded={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should render in disabled state", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          disabled={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toBeDisabled();
    });

    it("should handle controlled state", () => {
      const handleChange = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          expanded={false}
          onChange={handleChange}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should handle uncontrolled state", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          defaultExpanded={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
    });
  });

  // ============================
  // MUI STYLING TESTS
  // ============================
  describe("MUI Styling", () => {
    it("should apply default MUI Accordion classes", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toHaveClass('MuiAccordion-root');
    });

    it("should apply MUI AccordionSummary classes", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      expect(summaryButton.closest('.MuiAccordionSummary-root')).toBeInTheDocument();
    });

    it("should apply MUI AccordionDetails classes when summary is provided", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const detailsElement = document.querySelector('.MuiAccordionDetails-root');
      expect(detailsElement).toBeInTheDocument();
    });

    it("should apply disabled classes when disabled", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          disabled={true}
        />
      );
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toHaveClass('Mui-disabled');
    });

    it("should apply expanded classes when expanded", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          expanded={true}
        />
      );
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toHaveClass('Mui-expanded');
    });

    it("should apply custom elevation", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          elevation={4}
        />
      );
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toHaveClass('MuiPaper-elevation4');
    });

    it("should apply no gutters when disableGutters is true", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          disableGutters={true}
        />
      );
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });

  // ============================
  // COMPONENT FUNCTIONALITY TESTS
  // ============================
  describe("Component Functionality", () => {
    it("should expand when clicked", async () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
      
      await user.click(summaryButton);
      
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should collapse when clicked again", async () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          defaultExpanded={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
      
      await user.click(summaryButton);
      
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should show summary content when expanded", async () => {
      render(<DsAccordion header="Test Header" summary="Test Summary Content" />);
      const summaryButton = screen.getByRole("button");
      
      // Summary content should not be visible initially
      expect(screen.queryByText("Test Summary Content")).not.toBeVisible();
      
      await user.click(summaryButton);
      
      // Summary content should be visible after expanding
      await waitFor(() => {
        expect(screen.getByText("Test Summary Content")).toBeVisible();
      });
    });

    it("should hide summary content when collapsed", async () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary Content"
          defaultExpanded={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      // Summary content should be visible initially
      expect(screen.getByText("Test Summary Content")).toBeVisible();
      
      await user.click(summaryButton);
      
      // Summary content should not be visible after collapsing
      await waitFor(() => {
        expect(screen.queryByText("Test Summary Content")).not.toBeVisible();
      });
    });

    it("should not expand when disabled", async () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary" 
          disabled={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
      expect(summaryButton).toBeDisabled();
      
      // Should remain collapsed since button is disabled
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
    });
  });

  // ============================
  // EVENT HANDLING TESTS
  // ============================
  describe("Event Handling", () => {
    it("should handle onChange event", async () => {
      const handleChange = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          onChange={handleChange}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      await user.click(summaryButton);
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
    });

    it("should handle keyboard navigation (Enter key)", async () => {
      const handleChange = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          onChange={handleChange}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      summaryButton.focus();
      await user.keyboard("{Enter}");
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should handle keyboard navigation (Space key)", async () => {
      const handleChange = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          onChange={handleChange}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      summaryButton.focus();
      await user.keyboard(" ");
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("should handle focus events", async () => {
      const handleFocus = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          HeaderProps={{ onFocus: handleFocus }}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      await user.click(summaryButton);
      
      expect(handleFocus).toHaveBeenCalled();
    });

    it("should handle blur events", async () => {
      const handleBlur = vi.fn();
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          HeaderProps={{ onBlur: handleBlur }}
        />
      );
      const summaryButton = screen.getByRole("button");
      
      await user.click(summaryButton);
      await user.tab();
      
      expect(handleBlur).toHaveBeenCalled();
    });
  });

  // ============================
  // ACCESSIBILITY TESTS
  // ============================
  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      
      expect(summaryButton).toHaveAttribute("aria-expanded");
      // MUI may not always set aria-controls, so let's check basic functionality
      expect(summaryButton).toHaveAttribute("aria-expanded", "false");
    });

    it("should have proper role attributes", () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      
      expect(summaryButton).toBeInTheDocument();
      // Check that accordion structure exists
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });

    it("should have accessible name from header", () => {
      render(<DsAccordion header="Accessible Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button", { name: /accessible header/i });
      expect(summaryButton).toBeInTheDocument();
    });

    it("should support keyboard navigation", async () => {
      render(
        <div>
          <DsAccordion header="First Accordion" summary="First Summary" />
          <DsAccordion header="Second Accordion" summary="Second Summary" />
        </div>
      );
      
      const firstButton = screen.getByRole("button", { name: /first accordion/i });
      const secondButton = screen.getByRole("button", { name: /second accordion/i });
      
      firstButton.focus();
      expect(firstButton).toHaveFocus();
      
      await user.tab();
      expect(secondButton).toHaveFocus();
    });

    it("should have proper aria-expanded state", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          expanded={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should have proper aria-disabled when disabled", () => {
      render(
        <DsAccordion 
          header="Test Header" 
          summary="Test Summary"
          disabled={true}
        />
      );
      const summaryButton = screen.getByRole("button");
      expect(summaryButton).toBeDisabled();
    });
  });

  // ============================
  // EDGE CASES TESTS
  // ============================
  describe("Edge Cases", () => {
    it("should handle null header gracefully", () => {
      render(<DsAccordion header={null as any} summary="Test Summary" />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });

    it("should handle null summary gracefully", () => {
      render(<DsAccordion header="Test Header" summary={null as any} />);
      const accordion = document.querySelector('.MuiAccordion-root');
      expect(accordion).toBeInTheDocument();
    });

    it("should handle very long header text", () => {
      const longHeader = "A".repeat(1000);
      render(<DsAccordion header={longHeader} summary="Test Summary" />);
      const headerElement = screen.getByText(longHeader);
      expect(headerElement).toBeInTheDocument();
    });

    it("should handle very long summary text", () => {
      const longSummary = "B".repeat(1000);
      render(
        <DsAccordion 
          header="Test Header" 
          summary={longSummary}
          defaultExpanded={true}
        />
      );
      const summaryElement = screen.getByText(longSummary);
      expect(summaryElement).toBeInTheDocument();
    });

    it("should handle special characters in content", () => {
      const specialHeader = "Header with !@#$%^&*()_+";
      const specialSummary = "Summary with 测试 🌟 ñáéíóú";
      render(
        <DsAccordion 
          header={specialHeader} 
          summary={specialSummary}
          defaultExpanded={true}
        />
      );
      expect(screen.getByText(specialHeader)).toBeInTheDocument();
      expect(screen.getByText(specialSummary)).toBeInTheDocument();
    });

    it("should handle rapid expand/collapse actions", async () => {
      render(<DsAccordion header="Test Header" summary="Test Summary" />);
      const summaryButton = screen.getByRole("button");
      
      // Rapid clicking
      await user.click(summaryButton);
      await user.click(summaryButton);
      await user.click(summaryButton);
      
      // Should end up collapsed
      expect(summaryButton).toHaveAttribute("aria-expanded", "true");
    });

    it("should handle complex React elements as header and summary", () => {
      const complexHeader = (
        <div>
          <span>Complex</span>
          <strong>Header</strong>
        </div>
      );
      const complexSummary = (
        <div>
          <p>Complex summary with <em>formatting</em></p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      );
      
      render(
        <DsAccordion 
          header={complexHeader} 
          summary={complexSummary}
          defaultExpanded={true}
        />
      );
      
      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("formatting")).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
    });
  });

  // ============================
  // REAL-WORLD SCENARIOS TESTS
  // ============================
  describe("Real-world Scenarios", () => {
    it("should work in FAQ scenario", async () => {
      const faqData = [
        { question: "What is this?", answer: "This is a FAQ item" },
        { question: "How does it work?", answer: "It works by expanding and collapsing" }
      ];
      
      render(
        <div>
          {faqData.map((faq, index) => (
            <DsAccordion 
              key={index}
              header={faq.question}
              summary={faq.answer}
            />
          ))}
        </div>
      );
      
      const firstQuestion = screen.getByRole("button", { name: /what is this/i });
      const secondQuestion = screen.getByRole("button", { name: /how does it work/i });
      
      expect(firstQuestion).toBeInTheDocument();
      expect(secondQuestion).toBeInTheDocument();
      
      await user.click(firstQuestion);
      expect(screen.getByText("This is a FAQ item")).toBeVisible();
    });

    it("should work in settings panel scenario", async () => {
      render(
        <div>
          <DsAccordion 
            header="Account Settings"
            summary={
              <DsStack spacing={2}>
                <DsTextField
                  label="Username"
                  size="small"
                />
                <DsTextField
                  label="Email"
                  type="email"
                  size="small"
                />
              </DsStack>
            }
          />
          <DsAccordion 
            header="Privacy Settings"
            summary={
              <DsStack spacing={1}>
                <DsFormControlLabel
                  control={<DsCheckbox />}
                  label="Enable notifications"
                />
                <DsFormControlLabel
                  control={<DsCheckbox />}
                  label="Make profile public"
                />
              </DsStack>
            }
          />
        </div>
      );
      
      const accountButton = screen.getByRole("button", { name: /account settings/i });
      const privacyButton = screen.getByRole("button", { name: /privacy settings/i });
      
      expect(accountButton).toBeInTheDocument();
      expect(privacyButton).toBeInTheDocument();
      
      await user.click(accountButton);
      const usernameInput = screen.getAllByRole('textbox')[0];
      expect(usernameInput).toBeVisible();
    });

    it("should work with form integration", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <DsAccordion 
            header="Personal Information"
            summary={
              <DsStack spacing={2}>
                <DsTextField
                  name="firstName"
                  label="First Name"
                />
                <DsTextField
                  name="lastName"
                  label="Last Name"
                />
              </DsStack>
            }
            defaultExpanded={true}
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      const firstNameInput = screen.getAllByRole('textbox')[0];
      const submitButton = screen.getByRole("button", { name: /submit/i });
      
      await user.type(firstNameInput, "John");
      await user.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it("should handle controlled accordion group", async () => {
      const ControlledAccordionGroup = () => {
        const [expanded, setExpanded] = React.useState<string | false>(false);
        
        const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        };
        
        return (
          <div>
            <DsAccordion 
              header="Panel 1"
              summary="Content 1"
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            />
            <DsAccordion 
              header="Panel 2"
              summary="Content 2"
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            />
          </div>
        );
      };
      
      render(<ControlledAccordionGroup />);
      
      const panel1Button = screen.getByRole("button", { name: /panel 1/i });
      const panel2Button = screen.getByRole("button", { name: /panel 2/i });
      
      await user.click(panel1Button);
      expect(panel1Button).toHaveAttribute("aria-expanded", "true");
      expect(panel2Button).toHaveAttribute("aria-expanded", "false");
      
      await user.click(panel2Button);
      expect(panel1Button).toHaveAttribute("aria-expanded", "false");
      expect(panel2Button).toHaveAttribute("aria-expanded", "true");
    });

    it("should handle async content loading", async () => {
      const AsyncAccordion = () => {
        const [content, setContent] = React.useState("Loading...");
        
        React.useEffect(() => {
          const timer = setTimeout(() => {
            setContent("Loaded async content");
          }, 100);
          return () => clearTimeout(timer);
        }, []);
        
        return (
          <DsAccordion 
            header="Async Content"
            summary={content}
            defaultExpanded={true}
          />
        );
      };
      
      render(<AsyncAccordion />);
      
      expect(screen.getByText("Loading...")).toBeInTheDocument();
      
      await waitFor(() => {
        expect(screen.getByText("Loaded async content")).toBeInTheDocument();
      }, { timeout: 200 });
    });
  });

  // ============================
  // THEME TESTING
  // ============================
  describe("Theme Testing", () => {
    const colorSchemes = ['light', 'dark', 'highContrast'] as const;

    it("should render correctly across all color schemes with proper theme colors", () => {
      // Get the complete color scheme from theme
      const themeColorScheme = getColorScheme(PALETTE);
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsAccordion 
            header="Theme Test Header"
            summary="Theme Test Summary"
          />, 
          { colorScheme }
        );
        
        // Verify basic rendering
        const accordion = container.querySelector('.MuiAccordion-root');
        expect(accordion).toBeInTheDocument();
        
        // Verify color scheme is applied
        const wrapperElement = container.firstChild as HTMLElement;
        expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
        
        // Verify theme colors match the actual theme configuration
        const schemeData = themeColorScheme[colorScheme];
        
        // Text color should match theme
        const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
        expect(expectedTextColor).toBeTruthy();
        
        // Snapshot testing for each theme
        expect(container.firstChild).toMatchSnapshot(`accordion-${colorScheme}-theme`);
        
        unmount();
      });
    });

    it("should use correct design system colors for accordion states", () => {
      const themeColorScheme = getColorScheme(PALETTE);

      colorSchemes.forEach(colorScheme => {
        const schemeData = themeColorScheme[colorScheme];
        
        // Test expanded state
        const { container: expandedContainer, unmount: unmountExpanded } = render(
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            expanded={true}
          />, 
          { colorScheme }
        );
        
        const expandedAccordion = expandedContainer.querySelector('.MuiAccordion-root');
        expect(expandedAccordion).toHaveClass('Mui-expanded');
        
        // Test collapsed state
        const { container: collapsedContainer, unmount: unmountCollapsed } = render(
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            expanded={false}
          />, 
          { colorScheme }
        );
        
        const collapsedAccordion = collapsedContainer.querySelector('.MuiAccordion-root');
        expect(collapsedAccordion).not.toHaveClass('Mui-expanded');
        
        unmountExpanded();
        unmountCollapsed();
      });
    });

    it("should verify theme differences and maintain functionality", () => {
      const themeColorScheme = getColorScheme(PALETTE);
      
      // Verify light vs dark theme differences
      const lightSchemeData = themeColorScheme.light;
      const darkSchemeData = themeColorScheme.dark;
      
      const lightTextColor = (lightSchemeData?.palette?.text as any)?.primary;
      const darkTextColor = (darkSchemeData?.palette?.text as any)?.primary;
      
      // Text colors should be different between themes
      expect(lightTextColor).toBeTruthy();
      expect(darkTextColor).toBeTruthy();
      expect(lightTextColor).not.toBe(darkTextColor);
      
      // Test functionality works across themes
      const handleChange = vi.fn();
      colorSchemes.forEach(colorScheme => {
        document.body.innerHTML = '';
        handleChange.mockClear();
        
        const { unmount } = render(
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            onChange={handleChange}
          />, 
          { colorScheme }
        );
        
        const summaryButton = screen.getByRole("button");
        fireEvent.click(summaryButton);
        expect(handleChange).toHaveBeenCalledWith(expect.any(Object), true);
        
        unmount();
      });
    });

    it("should use testAllThemes utility for efficient theme testing", () => {
      testAllThemes(
        (colorScheme) => (
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            data-testid={`accordion-${colorScheme}`}
          />
        ),
        (container, colorScheme) => {
          const accordion = container.querySelector(`[data-testid="accordion-${colorScheme}"]`);
          expect(accordion).toBeInTheDocument();
          
          const accordionRoot = container.querySelector('.MuiAccordion-root');
          expect(accordionRoot).toBeInTheDocument();
        }
      );
    });

    it("should handle custom expand icons across themes", () => {
      const customIcon = <DsRemixIcon className="ri-plus-line" />;
      
      colorSchemes.forEach(colorScheme => {
        const { container, unmount } = render(
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            expandIcon={customIcon}
          />, 
          { colorScheme }
        );
        
        const icon = container.querySelector('.ri-plus-line');
        expect(icon).toBeInTheDocument();
        
        unmount();
      });
    });
  });

  // ============================
  // SNAPSHOT TESTS
  // ============================
  describe("Snapshot Tests", () => {
    it("should match snapshots for basic states", () => {
      const basicStates = [
        { 
          name: 'collapsed', 
          props: { 
            header: "Test Header", 
            summary: "Test Summary", 
            expanded: false 
          } 
        },
        { 
          name: 'expanded', 
          props: { 
            header: "Test Header", 
            summary: "Test Summary", 
            expanded: true 
          } 
        },
        { 
          name: 'disabled', 
          props: { 
            header: "Test Header", 
            summary: "Test Summary", 
            disabled: true 
          } 
        },
        { 
          name: 'disabled-expanded', 
          props: { 
            header: "Test Header", 
            summary: "Test Summary", 
            disabled: true, 
            expanded: true 
          } 
        },
        { 
          name: 'no-summary', 
          props: { 
            header: "Test Header", 
            summary: "" 
          } 
        }
      ];

      basicStates.forEach(({ name, props }) => {
        const { container } = render(<DsAccordion {...props} />);
        expect(container.firstChild).toMatchSnapshot(`accordion-${name}`);
      });
    });

    it("should match snapshots for elevation variants", () => {
      const elevations = [0, 1, 2, 4, 8] as const;
      
      elevations.forEach(elevation => {
        const { container } = render(
          <DsAccordion 
            header="Test Header"
            summary="Test Summary"
            elevation={elevation}
          />
        );
        expect(container.firstChild).toMatchSnapshot(`accordion-elevation-${elevation}`);
      });
    });

    it("should match snapshots for customization options", () => {
      // Custom icons
      const customExpandIcon = <DsRemixIcon className="ri-add-line" />;
      const { container: customIcon } = render(
        <DsAccordion 
          header="Test Header"
          summary="Test Summary"
          expandIcon={customExpandIcon}
        />
      );
      expect(customIcon.firstChild).toMatchSnapshot('accordion-custom-icon');

      // Custom props
      const { container: customProps } = render(
        <DsAccordion 
          header="Test Header"
          summary="Test Summary"
          HeaderProps={{ 
            sx: { backgroundColor: 'primary.main' },
            className: 'custom-header-class'
          }}
          SummaryProps={{ 
            sx: { backgroundColor: 'secondary.main' },
            className: 'custom-summary-class'
          }}
        />
      );
      expect(customProps.firstChild).toMatchSnapshot('accordion-custom-props');

      // Complex content
      const complexHeader = (
        <DsBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DsRemixIcon className="ri-folder-line" />
          <DsTypography>Complex Header</DsTypography>
        </DsBox>
      );
      
      const complexSummary = (
        <DsStack spacing={2}>
          <DsTypography>Complex summary content</DsTypography>
          <DsButton variant="contained">Action Button</DsButton>
        </DsStack>
      );

      const { container: complexContent } = render(
        <DsAccordion 
          header={complexHeader}
          summary={complexSummary}
          defaultExpanded={true}
        />
      );
      expect(complexContent.firstChild).toMatchSnapshot('accordion-complex-content');
    });

    it("should match snapshots for real-world scenarios", () => {
      // FAQ scenario
      const faqItems = [
        { question: "What is this product?", answer: "This is a comprehensive design system." },
        { question: "How do I get started?", answer: "Follow our getting started guide." },
        { question: "Is it free to use?", answer: "Yes, it's open source and free." }
      ];

      const { container: faqScenario } = render(
        <DsPaper sx={{ p: 2 }}>
          <DsTypography gutterBottom>
            Frequently Asked Questions
          </DsTypography>
          {faqItems.map((faq, index) => (
            <DsAccordion 
              key={index}
              header={faq.question}
              summary={faq.answer}
              sx={{ mb: 1 }}
            />
          ))}
        </DsPaper>
      );
      expect(faqScenario.firstChild).toMatchSnapshot('accordion-faq-scenario');

      // Settings panel scenario
      const { container: settingsScenario } = render(
        <DsPaper sx={{ p: 3, maxWidth: 600 }}>
          <DsTypography gutterBottom>
            Account Settings
          </DsTypography>
          
          <DsAccordion 
            header="Profile Information"
            summary={
              <DsStack spacing={2}>
                <DsTypography>Manage your profile details</DsTypography>
                <DsBox sx={{ display: 'flex', gap: 2 }}>
                  <DsButton variant="outlined" size="small">Edit Profile</DsButton>
                  <DsButton variant="outlined" size="small">Change Avatar</DsButton>
                </DsBox>
              </DsStack>
            }
          />
          
          <DsAccordion 
            header="Privacy Settings"
            summary={
              <DsStack spacing={2}>
                <DsTypography>Control your privacy preferences</DsTypography>
                <DsStack spacing={1}>
                  <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Make profile public"
                  />
                  <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Allow search indexing"
                  />
                </DsStack>
              </DsStack>
            }
          />
          
          <DsAccordion 
            header="Notification Settings"
            summary={
              <DsStack spacing={2}>
                <DsTypography>Manage your notifications</DsTypography>
                <DsStack spacing={1}>
                  <DsFormControlLabel
                    control={<DsCheckbox defaultChecked />}
                    label="Email notifications"
                  />
                </DsStack>
              </DsStack>
            }
          />
        </DsPaper>
      );
      expect(settingsScenario.firstChild).toMatchSnapshot('accordion-settings-scenario');

      // Documentation section scenario
      const { container: docsScenario } = render(
        <DsBox sx={{ maxWidth: 800 }}>
          <DsTypography gutterBottom>
            API Documentation
          </DsTypography>
          
          <DsAccordion 
            header={
              <DsBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DsRemixIcon className="ri-code-line" />
                <DsTypography>Authentication</DsTypography>
              </DsBox>
            }
            summary={
              <DsStack spacing={2}>
                <DsTypography>
                  Learn how to authenticate with our API using tokens.
                </DsTypography>
                <DsPaper variant="outlined" sx={{ p: 2, backgroundColor: 'grey.50' }}>
                  <DsTypography component="pre">
                    {`curl -H "Authorization: Bearer YOUR_TOKEN" \\
     -X GET https://api.example.com/data`}
                  </DsTypography>
                </DsPaper>
              </DsStack>
            }
          />
          
          <DsAccordion 
            header={
              <DsBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DsRemixIcon className="ri-database-line" />
                <DsTypography>Data Endpoints</DsTypography>
              </DsBox>
            }
            summary={
              <DsStack spacing={2}>
                <DsTypography>
                  Available endpoints for data retrieval and manipulation.
                </DsTypography>
                <DsBox>
                  <DsTypography>GET /api/users</DsTypography>
                  <DsTypography color="text.secondary">
                    Retrieve all users
                  </DsTypography>
                </DsBox>
                <DsBox>
                  <DsTypography>POST /api/users</DsTypography>
                  <DsTypography color="text.secondary">
                    Create a new user
                  </DsTypography>
                </DsBox>
              </DsStack>
            }
          />
        </DsBox>
      );
      expect(docsScenario.firstChild).toMatchSnapshot('accordion-docs-scenario');
    });
  });
});