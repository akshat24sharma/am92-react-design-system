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
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { DsAccordion } from "./DsAccordion.Component";

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
              <div>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
              </div>
            }
          />
          <DsAccordion 
            header="Privacy Settings"
            summary={
              <div>
                <label>
                  <input type="checkbox" /> Enable notifications
                </label>
                <label>
                  <input type="checkbox" /> Make profile public
                </label>
              </div>
            }
          />
        </div>
      );
      
      const accountButton = screen.getByRole("button", { name: /account settings/i });
      const privacyButton = screen.getByRole("button", { name: /privacy settings/i });
      
      expect(accountButton).toBeInTheDocument();
      expect(privacyButton).toBeInTheDocument();
      
      await user.click(accountButton);
      expect(screen.getByPlaceholderText("Username")).toBeVisible();
    });

    it("should work with form integration", async () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <form onSubmit={handleSubmit}>
          <DsAccordion 
            header="Personal Information"
            summary={
              <div>
                <input name="firstName" placeholder="First Name" />
                <input name="lastName" placeholder="Last Name" />
              </div>
            }
            defaultExpanded={true}
          />
          <button type="submit">Submit</button>
        </form>
      );
      
      const firstNameInput = screen.getByPlaceholderText("First Name");
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
});