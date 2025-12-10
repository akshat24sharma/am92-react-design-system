/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsDialog component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Component Functionality - DsDialog behavior and interactions
 * 6. Event Handling - User interactions and event handlers
 * 7. Accessibility - ARIA attributes and keyboard navigation
 * 8. Edge Cases - Unusual scenarios and boundary conditions
 * 9. Real-world Scenarios - Common usage patterns
 * 10. Snapshot Testing - Visual regression testing
 * 
 * @package @am92/react-design-system
 * @component DsDialog
 */


import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../Tests/Mocks/setupTests";
import { DsButton } from "../DsButton";
import { DsDialog } from "../DsDialog";

describe("DsDialog Component", () => {

    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render the dialog with default props", () => {
            render(<DsDialog open={false} />);
            const dialog = screen.queryByRole("dialog");
            expect(dialog).not.toBeInTheDocument();
        });

        it("should render the dialog when open is true", () => {
            render(<DsDialog open={true} />);
            const dialog = screen.getByRole("dialog");
            expect(dialog).toBeInTheDocument();
        });

        it("should render the title", () => {
            render(<DsDialog open={true} title="Test Title" ></DsDialog>);
            expect(screen.getByText("Test Title")).toBeInTheDocument();
        });

        it("should render the description", () => {
            render(<DsDialog open={true} description="Test Description"></DsDialog>);
            expect(screen.getByText("Test Description")).toBeInTheDocument();
        });

        it("should render the content", () => {
            render(
                <DsDialog open={true} >
                    Working area
                </DsDialog>
            );
            expect(screen.getByText("Working area")).toBeInTheDocument();
        });

        it("should render with kicker text", () => {
            render(<DsDialog open kicker="Test Kicker" />);
            
            const kicker = screen.getByText("Test Kicker"); // Kicker text is not automatically uppercase
            expect(kicker).toBeInTheDocument();
        });

        it("should render close button by default", () => {
            render(<DsDialog open />);
            
            const closeButton = screen.getByRole("button");
            expect(closeButton).toBeInTheDocument();
        });
    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {

        it("should not render the dialog when open is false", () => {
            render(<DsDialog open={false} />);
            const dialog = screen.queryByRole("dialog");
            expect(dialog).not.toBeInTheDocument();
        });

        it("should accept and display primary button", () => {
            render( <DsDialog open={true} primaryButtonText="Primary Action" /> );
            
            const primaryButton = screen.getByRole("button", { name: /primary action/i });
            expect(primaryButton).toBeInTheDocument();
        });
    
        it("should accept and display secondary button", () => {
            render( <DsDialog open={true} secondaryButtonText="Secondary Action" />);
            
            const secondaryButton = screen.getByRole("button", { name: /secondary action/i });
            expect(secondaryButton).toBeInTheDocument();
        });
        
        it("should render both primary and secondary buttons", () => {
            render( <DsDialog open={true} primaryButtonText="Primary" secondaryButtonText="Secondary" /> );
            
            const primaryButton = screen.getByRole("button", { name: /primary/i });
            const secondaryButton = screen.getByRole("button", { name: /secondary/i });
            
            expect(primaryButton).toBeInTheDocument();
            expect(secondaryButton).toBeInTheDocument();
        });

        it("should handle button props for primary button", () => {
            render(<DsDialog open primaryButtonText="Primary" primaryButtonProps={{ disabled: true }}/>);
            
            const primaryButton = screen.getByRole("button", { name: /primary/i });
            expect(primaryButton).toBeDisabled();
        });
        
        it("should handle button props for secondary button", () => {
            render(<DsDialog open secondaryButtonText="Secondary" secondaryButtonProps={{ variant: "outlined" }}/>);

            const secondaryButton = screen.getByRole("button", { name: /secondary/i });
            expect(secondaryButton).toBeInTheDocument();
            expect(secondaryButton).toHaveClass("MuiButton-colorSecondary");
        });

        it("should hide close button when showClose is false", () => {
            render(<DsDialog open showClose={false} />);
            
            // Only look for buttons that are not primary/secondary buttons
            const buttons = screen.queryAllByRole("button");
            expect(buttons).toHaveLength(0);
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply Paper component styling", () => {
            render(<DsDialog open={true} />);
            
            const paper = document.querySelector(".MuiPaper-root");
            expect(paper).toBeInTheDocument();
        });

        it("should apply IconButton styling for close button", () => {
            render(<DsDialog open={true} />);
            
            const closeButton = screen.getByRole("button");
            expect(closeButton).toHaveClass("MuiIconButton-root");
        });
        
        it("should apply proper button classes for action buttons", () => {
            render(
            <DsDialog    
                open={true}
                primaryButtonText="Primary"
                secondaryButtonText="Secondary"
            />
            );
            
            const primaryButton = screen.getByRole("button", { name: /primary/i });
            const secondaryButton = screen.getByRole("button", { name: /secondary/i });
            
            expect(primaryButton).toHaveClass("MuiButton-root");
            expect(secondaryButton).toHaveClass("MuiButton-root");
            expect(secondaryButton).toHaveClass("MuiButton-colorSecondary");
        });
    })

    // ============================
    // EVENT HANDLING TESTS
    // ============================
    describe("Event Handling", () => {
        it("should close the dialog when the backdrop is clicked", async () => {
            const handleClose = vi.fn();
            render(<DsDialog open={true} onClose={handleClose} />);
            const backdrop = document.querySelector(".MuiBackdrop-root") as HTMLElement;
            await user.click(backdrop);
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("should not call onClose when clicking inside dialog content", async () => {
            const handleClose = vi.fn();
            render(
                <DsDialog open={true} onClose={handleClose} title="Dialog Title">
                    <button>Inside Button</button>
                </DsDialog>
            );
            const dialog = screen.getByRole("dialog");
            const insideBtn = within(dialog).getByRole("button", { name: /inside button/i });
            await user.click(insideBtn);
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("should call onClose when pressing Escape key", async () => {
            const handleClose = vi.fn();
            render(<DsDialog open={true} onClose={handleClose} />);
            const dialog = screen.getByRole("dialog");
            dialog.focus();
            await user.keyboard("{Escape}");
            expect(handleClose).toHaveBeenCalledTimes(1);
        });

        it("should keep focus within dialog when tabbing (focus trap)", async () => {
            render(
                <DsDialog open={true} title="Trap">
                    <DsButton>First</DsButton>
                    <DsButton>Second</DsButton>
                    <DsButton>Third</DsButton>
                </DsDialog>
            );
            const dialog = screen.getByRole("dialog");
            const buttons = within(dialog).getAllByRole("button");
            
            // Focus first button
            buttons[0].focus();
            expect(buttons[0]).toHaveFocus();
            // Tab to next
            await user.keyboard("{Tab}");
            expect(buttons[1]).toHaveFocus();
            // Tab to next
            await user.keyboard("{Tab}");
            expect(buttons[2]).toHaveFocus();
            // Tab to next
            await user.keyboard("{Tab}");
            expect(buttons[3]).toHaveFocus();
            // Tab cycles back to first (typical dialog trap)
            await user.keyboard("{Tab}");
            expect(buttons[0]).toHaveFocus();
        });

        it("should handle primary button click", async () => {
            const handlePrimaryClick = vi.fn();
            render(
            <DsDialog 
                open={true}
                primaryButtonText="Primary"
                primaryButtonProps={{ onClick: handlePrimaryClick }}
            />
            );
            
            const primaryButton = screen.getByRole("button", { name: /primary/i });
            await user.click(primaryButton);
            
            expect(handlePrimaryClick).toHaveBeenCalledTimes(1);
        });
        
        it("should handle secondary button click", async () => {
            const handleSecondaryClick = vi.fn();
            render(
            <DsDialog 
                open={true}
                secondaryButtonText="Secondary"
                secondaryButtonProps={{ onClick: handleSecondaryClick }}
            />
            );
            
            const secondaryButton = screen.getByRole("button", { name: /secondary/i });
            await user.click(secondaryButton);
            
            expect(handleSecondaryClick).toHaveBeenCalledTimes(1);
        });

        it("should not call onClose when disabled button is clicked", async () => {
            const handleClose = vi.fn();
            const handlePrimaryClick = vi.fn();
            
            render(
                <DsDialog 
                    open={true}
                    onClose={handleClose}
                    CloseIconButtonProps={{ disabled: true }}
                />
            );
            

            const dialog = screen.getByRole("dialog");
            const closeButton = within(dialog).getByRole("button");
            
            // Verify button is disabled
            expect(closeButton).toBeDisabled();
            
            // Try to click using fireEvent since userEvent can't click disabled buttons
            fireEvent.click(closeButton);
            
            // expect(handlePrimaryClick).not.toHaveBeenCalled();
            expect(handleClose).not.toHaveBeenCalled();
        });
    });

    // ============================
    // COMPONENT INTEGRATION TESTS
    // ============================
    describe("Component Integration", () => {

        it("should pass through slotProps for paper", () => {
            render(
                <DsDialog
                    open={true}
                    slotProps={{
                        paper: { elevation: 8 }
                    }}
                />
            );
            
            const paper = document.querySelector(".MuiPaper-root");
            expect(paper).toBeInTheDocument();
        });
        
        it("should pass through PaperProps (legacy support)", () => {
            render(
                <DsDialog
                    open={true}
                    PaperProps={{ elevation: 8 }}
                />
            );
            
            const paper = document.querySelector(".MuiPaper-root");
            expect(paper).toBeInTheDocument();
        });

        it("should pass through KickerProps", () => {
            render(
                <DsDialog 
                    open={true}
                    kicker="Test Kicker"
                    KickerProps={{ color: "primary" }}
                />
            );
            
            const kicker = screen.getByText("Test Kicker");
            expect(kicker).toBeInTheDocument();
        });
    
        it("should pass through TitleProps", () => {
            render(
                <DsDialog 
                    open={true}
                    title="Test Title"
                    TitleProps={{ sx: { fontSize: "1.5rem" } }}
                />
            );
            
            const title = screen.getByText("Test Title");
            expect(title).toBeInTheDocument();
        });
    
        it("should pass through DescriptionProps", () => {
            render(
                <DsDialog 
                    open={true} 
                    description="Test Description"
                    DescriptionProps={{ color: "textSecondary" }}
                />
            );
            
            const description = screen.getByText("Test Description");
            expect(description).toBeInTheDocument();
        });
    
        it("should pass through CloseIconButtonProps", () => {
            render(
                <DsDialog 
                    open={true}
                    CloseIconButtonProps={{ size: "large" }}
                />
            );
            
            const closeButton = screen.getByRole("button");
            expect(closeButton).toBeInTheDocument();
        });
    
        it("should pass through ContentProps", () => {
            render(
                <DsDialog 
                    open={true}
                    ContentProps={{ sx: { padding: 2 } }}
                >
                    Test Content
                </DsDialog>
            );
            
            const content = screen.getByText("Test Content");
            expect(content).toBeInTheDocument();
        });
    
        it("should pass through ActionsProps", () => {
            render(
                <DsDialog 
                    open={true}
                    primaryButtonText="Primary"
                    ActionsProps={{ sx: { justifyContent: "center" } }}
                />
            );
        
            const primaryButton = screen.getByRole("button", { name: /primary/i });
            expect(primaryButton).toBeInTheDocument();
        });

        it("should support multiple slotProps", () => {
            render(
            <DsDialog 
                open={true}
                title="Test Title"
                slotProps={{
                    paper: { elevation: 8 },
                    backdrop: { sx: { backgroundColor: "rgba(0,0,0,0.8)" } }
                }}
            />
            );
            
            const paper = document.querySelector(".MuiPaper-root");
            const backdrop = document.querySelector(".MuiBackdrop-root");
            expect(paper).toBeInTheDocument();
            expect(backdrop).toBeInTheDocument();
        });
    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have the correct ARIA role", () => {
            render(<DsDialog open={true} />);
            const dialog = screen.getByRole("dialog");
            expect(dialog).toBeInTheDocument();
        });

        it("should have aria-labelledby and aria-describedby attributes", () => {
            render(
                <DsDialog open={true} title="Dialog Title" aria-describedby="dialog-description">
                <p id="dialog-description">Dialog content</p>
                </DsDialog>
            );
            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveAttribute("aria-labelledby");
            expect(dialog).toHaveAttribute("aria-describedby");
        });

        it("should set aria-modal to true when open", () => {
            render(<DsDialog open={true} title="A11y" />);
            const dialog = screen.getByRole("dialog");
            expect(dialog).toHaveAttribute("aria-modal", "true");
        });

        it("should omit aria-describedby if description not provided", () => {
            render(<DsDialog open={true} title="No Description" />);
            const dialog = screen.getByRole("dialog");
            expect(dialog).not.toHaveAttribute("aria-describedby");
        });

        it("should have proper button labeling", () => {
            render(
                <DsDialog 
                    open={true}
                    primaryButtonText="Confirm Action"
                    secondaryButtonText="Cancel Action"
                />
            );
            
            const primaryButton = screen.getByRole("button", { name: /confirm action/i });
            const secondaryButton = screen.getByRole("button", { name: /cancel action/i });
            
            expect(primaryButton).toHaveAccessibleName("Confirm Action");
            expect(secondaryButton).toHaveAccessibleName("Cancel Action");
        });
    });

    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle null/undefined title gracefully", () => {
            render(<DsDialog open={true} title={null as any} />);
            
            const drawer = screen.getAllByRole("presentation");
            expect(drawer[0]).toBeInTheDocument();
            expect(drawer[0]).not.toHaveAttribute("aria-labelledby");
        });

        it("should handle null/undefined kicker gracefully", () => {
            render(<DsDialog open={true} kicker={null as any} />);
            
            const drawer = screen.getAllByRole("presentation");
            expect(drawer[0]).toBeInTheDocument();
            expect(drawer[0]).not.toHaveAttribute("aria-describedby");
        });
    
        it("should handle empty string button text", () => {
            render(
            <DsDialog 
                open={true}
                primaryButtonText=""
                secondaryButtonText=""
            />
            );
            
            // Should not render action buttons for empty strings
            const buttons = screen.queryAllByRole("button");
            expect(buttons).toHaveLength(1); // Only close button
        });
    
        it("should handle very long title text", () => {
            const longTitle = "A".repeat(200);
            render(<DsDialog open={true} title={longTitle} />);
            
            const title = screen.getByText(longTitle);
            expect(title).toBeInTheDocument();
        });
    
        it("should handle very long description text", () => {
            const longDescription = "This is a very long description that might wrap multiple lines and should be handled gracefully by the component without breaking the layout or functionality.".repeat(5);
            render(<DsDialog open={true} description={longDescription} />);
            
            const description = screen.getByText(longDescription);
            expect(description).toBeInTheDocument();
        });
    
        it("should handle missing onClose prop gracefully", () => {
            render(<DsDialog open={true} />);
            
            const closeButton = screen.getByRole("button");
            expect(closeButton).toBeInTheDocument();
            
            // Should not throw error when clicked without onClose
            expect(() => fireEvent.click(closeButton)).not.toThrow();
        });

        it("should handle complex nested children content", () => {
            render(
            <DsDialog open={true}>
                <div>
                <h3>Nested Title</h3>
                <p>Nested paragraph</p>
                <ul>
                    <li>List item 1</li>
                    <li>List item 2</li>
                </ul>
                </div>
            </DsDialog>
            );
            
            expect(screen.getByText("Nested Title")).toBeInTheDocument();
            expect(screen.getByText("Nested paragraph")).toBeInTheDocument();
            expect(screen.getByText("List item 1")).toBeInTheDocument();
            expect(screen.getByText("List item 2")).toBeInTheDocument();
        });
    });
    
    // ============================
    // REAL-WORLD SCENARIOS TESTS
    // ============================
    describe("DsDialog - Real World Scenarios", () => {

        it("should pass 'backdropClick' as reason when backdrop is clicked", async () => {
            const handleClose = vi.fn();
            render(<DsDialog open onClose={handleClose} />);
            const backdrop = document.querySelector(".MuiBackdrop-root") as HTMLElement;
            await user.click(backdrop);
            expect(handleClose).toHaveBeenCalledTimes(1);
            const [event, reason] = handleClose.mock.calls[0];
            expect(reason).toBe("backdropClick");
            expect(event).toBeDefined();
        });

        it("should pass 'escapeKeyDown' as reason when Escape is pressed", async () => {
            const handleClose = vi.fn();
            render(<DsDialog open onClose={handleClose} title="Esc Close" />);
            const dialog = screen.getByRole("dialog");
            dialog.focus();
            await user.keyboard("{Escape}");
            expect(handleClose).toHaveBeenCalledTimes(1);
            const [, reason] = handleClose.mock.calls[0];
            expect(reason).toBe("escapeKeyDown");
        });

        // TODO: add this test back when closeButtonClick reason is added
        // it("should pass 'closeClick' as reason when close icon is clicked", async () => {
        //     const handleClose = vi.fn();
        //     render(<DsDialog open onClose={handleClose} />);
        //     const dialog = screen.getByRole("dialog");
        //     const closeButton = within(dialog).getByRole("button");
        //     await user.click(closeButton);
        //     expect(handleClose).toHaveBeenCalledTimes(1);
        //     const [event, reason] = handleClose.mock.calls[0];
        //     expect(reason).toBe("closeButtonClick");
        //     expect(event).toBeDefined();
        // });

        it("should not close on Escape when disableEscapeKeyDown is true", async () => {
            const handleClose = vi.fn();
            render(<DsDialog open onClose={handleClose} disableEscapeKeyDown />);
            const dialog = screen.getByRole("dialog");
            dialog.focus();
            await user.keyboard("{Escape}");
            expect(handleClose).not.toHaveBeenCalled();
        });

        it("primary button onClick can close dialog via provided handler calling onClose", async () => {
            const handleClose = vi.fn();
            const handlePrimaryClick = vi.fn(() => handleClose({}, "primaryClick"));
            render(
                <DsDialog
                    open
                    onClose={handleClose}
                    primaryButtonText="Proceed"
                    primaryButtonProps={{ onClick: handlePrimaryClick }}
                />
            );
            const btn = screen.getByRole("button", { name: /proceed/i });
            await user.click(btn);
            expect(handlePrimaryClick).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledTimes(1);
            const [, reason] = handleClose.mock.calls[0];
            expect(["primaryClick", undefined]).toContain(reason);
        });

        it("secondary button onClick can close dialog via provided handler calling onClose", async () => {
            const handleClose = vi.fn();
            const handleSecondaryClick = vi.fn(() => handleClose({}, "secondaryClick"));
            render(
                <DsDialog
                    open
                    onClose={handleClose}
                    secondaryButtonText="Cancel"
                    secondaryButtonProps={{ onClick: handleSecondaryClick }}
                />
            );
            const btn = screen.getByRole("button", { name: /cancel/i });
            await user.click(btn);
            expect(handleSecondaryClick).toHaveBeenCalledTimes(1);
            expect(handleClose).toHaveBeenCalledTimes(1);
            const [, reason] = handleClose.mock.calls[0];
            expect(["secondaryClick", undefined]).toContain(reason);
        });

        it("should not render action buttons when texts are undefined", () => {
            render(<DsDialog open />);
            const dialog = screen.getByRole("dialog");
            const buttons = within(dialog).getAllByRole("button");
            // Only close button expected
            expect(buttons).toHaveLength(1);
        });
    });

    // ============================
    // THEME TESTING
    // ============================
    describe("Theme Testing", () => {
        it("should render correctly across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = render(
                    <DsDialog open title="Theme Test Dialog" description="Testing theme compatibility">
                        Theme test content
                    </DsDialog>,
                    { colorScheme: theme }
                );
                
                const dialog = screen.getByRole('dialog');
                const title = screen.getByText('Theme Test Dialog');
                const description = screen.getByText('Testing theme compatibility');
                
                expect(dialog).toBeInTheDocument();
                expect(title).toBeInTheDocument();
                expect(description).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should render dialog with buttons across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = render(
                    <DsDialog 
                        open 
                        title="Button Theme Test"
                        primaryButtonText="Primary Action"
                        secondaryButtonText="Secondary Action"
                    >
                        Dialog content with buttons
                    </DsDialog>,
                    { colorScheme: theme }
                );
                
                const dialog = screen.getByRole('dialog');
                const primaryButton = screen.getByText('Primary Action');
                const secondaryButton = screen.getByText('Secondary Action');
                
                expect(dialog).toBeInTheDocument();
                expect(primaryButton).toBeInTheDocument();
                expect(secondaryButton).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should handle close button across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = render(
                    <DsDialog 
                        open 
                        title="Close Button Theme Test"
                        showClose={true}
                    >
                        Content with close button
                    </DsDialog>,
                    { colorScheme: theme }
                );
                
                const dialog = screen.getByRole('dialog');
                const closeButton = screen.getByRole('button'); // Close button
                
                expect(dialog).toBeInTheDocument();
                expect(closeButton).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot with default props when open", () => {
            const { container } = render(<DsDialog open={true} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot when closed", () => {
            const { container } = render(<DsDialog open={false} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with title and description", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="Snapshot Test Title" 
                    description="This is a snapshot test description"
                >
                    Dialog content for snapshot testing
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with kicker text", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    kicker="SNAPSHOT KICKER"
                    title="Dialog with Kicker" 
                >
                    Content with kicker text
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with primary button only", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="Primary Button Dialog"
                    primaryButtonText="Primary Action"
                >
                    Dialog with only primary button
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with both buttons", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="Two Button Dialog"
                    primaryButtonText="Confirm"
                    secondaryButtonText="Cancel"
                >
                    Dialog with both primary and secondary buttons
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot without close button", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="No Close Button"
                    showClose={false}
                >
                    Dialog without close button
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with different max widths", () => {
            const maxWidths = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
            maxWidths.forEach((maxWidth) => {
                const { container, unmount } = render(
                    <DsDialog 
                        open 
                        maxWidth={maxWidth}
                        title={`Dialog ${maxWidth.toUpperCase()}`}
                    >
                        Content for {maxWidth} dialog
                    </DsDialog>
                );
                expect(container.firstChild).toMatchSnapshot(`maxWidth-${maxWidth}`);
                unmount();
            });
        });

        it("should match snapshot with fullScreen dialog", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    fullScreen 
                    title="Fullscreen Dialog"
                >
                    This is a fullscreen dialog
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with complex content structure", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="Complex Content Dialog"
                    description="Dialog with various content types"
                    primaryButtonText="Submit"
                    secondaryButtonText="Cancel"
                >
                    <div>
                        <h3>Section Title</h3>
                        <p>Some paragraph content</p>
                        <ul>
                            <li>List item 1</li>
                            <li>List item 2</li>
                            <li>List item 3</li>
                        </ul>
                        <button type="button">Interactive Button</button>
                    </div>
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            themes.forEach((theme) => {
                const { container, unmount } = render(
                    <DsDialog 
                        open 
                        title="Theme Snapshot Dialog"
                        description="Testing snapshot across themes"
                        kicker="THEME TEST"
                        primaryButtonText="Primary"
                        secondaryButtonText="Secondary"
                    >
                        Theme snapshot test content
                    </DsDialog>,
                    { colorScheme: theme }
                );
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
                unmount();
            });
        });

        it("should match snapshot with different scroll behaviors", () => {
            const scrolls = ['body', 'paper'] as const;
            scrolls.forEach((scroll) => {
                const { container, unmount } = render(
                    <DsDialog 
                        open 
                        scroll={scroll}
                        title={`Dialog with ${scroll} scroll`}
                    >
                        <div style={{ height: '200px' }}>
                            Long content that might scroll using {scroll} method
                        </div>
                    </DsDialog>
                );
                expect(container.firstChild).toMatchSnapshot(`scroll-${scroll}`);
                unmount();
            });
        });

        it("should match snapshot with custom props", () => {
            const { container } = render(
                <DsDialog 
                    open 
                    title="Custom Props Dialog"
                    TitleProps={{ sx: { color: 'primary.main' } }}
                    ContentProps={{ sx: { backgroundColor: 'grey.50' } }}
                    ActionsProps={{ sx: { justifyContent: 'center' } }}
                    primaryButtonText="Custom Action"
                    primaryButtonProps={{ variant: 'outlined', color: 'secondary' }}
                >
                    Dialog with custom styled props
                </DsDialog>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});