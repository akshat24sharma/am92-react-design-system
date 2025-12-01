/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsDivider component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling (if applicable)
 * 5. Event Handling - User interactions and event handlers
 * 6. Accessibility - ARIA attributes and keyboard navigation
 * 7. Edge Cases - Unusual scenarios and boundary conditions
 * 
 * @package @am92/react-design-system
 * @component DsDivider
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { DsDivider } from './DsDivider.Component';
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { DsBox } from "../DsBox";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";


describe('DsDivider Component', () => {

    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render horizontal divider by default", () => {
            render(<DsDivider />);
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveClass("MuiDivider-root");
            expect(divider).not.toHaveClass("MuiDivider-vertical");
        });

        it("should render with vertical orientation", () => {
            render(
                <DsBox
                    sx={{
                        display: 'flex',
                        height: '50vh',
                        justifyContent: 'center',
                        px: 'var(--ds-spacing-warm)',
                        width: '100%',
                    }}
                >
                    <DsDivider orientation="vertical" />
                </DsBox>
            );
        
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toBeInTheDocument();
            expect(divider).toHaveClass('MuiDivider-vertical');
        });

        it("should render a divider with text inside it", () => {
            render(<DsDivider orientation="horizontal">Text</DsDivider>);
        
            // Text should appear
            const text = screen.getByText("Text");
            expect(text).toBeInTheDocument();

        
            // Wrapper span should exist
            const wrapper = document.querySelector('.MuiDivider-wrapper');
            expect(wrapper).toBeInTheDocument();
        
            // Children version adds this class in your DOM
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveAttribute('role', 'separator');
            expect(divider).toHaveClass('MuiDivider-withChildren');
        });
    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should render vertical divider when orientation is 'vertical'", () => {
            render(<DsDivider orientation="vertical" />);
            const divider = screen.getByRole("separator");
            // const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveClass("MuiDivider-vertical");
        });

        it("should apply custom className", () => {
            render(<DsDivider className="custom-class" />);
            const divider = screen.getByRole("separator");
            // const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveClass("custom-class");
        });

        it("should apply custom styles", () => {
            render(<DsDivider sx={{ opacity: 0.6  }} />);
            const divider = screen.getByRole("separator");
            expect(divider).toHaveStyle({ opacity: 0.6  });
        });
    });

    // ============================
    // COMPONENT STATES TESTS
    // ============================
    describe("Component States", () => {
        it("should render with size medium", () => {
            render(<DsDivider ds-size="M" />);
            // const divider = screen.getByRole("separator");
            const divider = document.querySelector('.MuiDivider-root');
        
            expect(divider).toHaveAttribute("ds-size", "M");
        });
        
        it("should render with size large", () => {
            render(<DsDivider ds-size="L" />);
            // const divider = screen.getByRole("separator");
            const divider = document.querySelector('.MuiDivider-root');
            
            expect(divider).toHaveAttribute("ds-size", "L");
        });

        it("should render with left alignment", () => {
            render(<DsDivider textAlign="left">Content</DsDivider>);
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveClass("MuiDivider-textAlignLeft");
        });

        it("should render with right alignment", () => {
            render(<DsDivider textAlign="right">Content</DsDivider>);
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveClass("MuiDivider-textAlignRight");
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply default MUI classes", () => {
            render(<DsDivider />);
            const divider = screen.getByRole("separator");
            expect(divider).toHaveClass("MuiDivider-root");
        });

        it("should render with 'inset' variant", () => {
            render(<DsDivider variant="inset" />);
            const divider = screen.getByRole("separator");
            expect(divider).toHaveClass("MuiDivider-inset");
        });

        it("should render with 'fullWidth' variant", () => {
            render(<DsDivider variant="fullWidth" />);
            const divider = screen.getByRole("separator");
            expect(divider).toHaveClass("MuiDivider-fullWidth");
        });

        it("should render with 'middle' variant", () => {
            render(<DsDivider variant="middle" />);
            const divider = screen.getByRole("separator");
            expect(divider).toHaveClass("MuiDivider-middle");
        });

    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have role 'separator' when Horizontal Divider With Text", () => {
            render(
                <DsBox>
                    <DsDivider orientation="horizontal">Text</DsDivider>
                </DsBox>
            );
            const divider = screen.getByRole("separator");
            expect(divider).toBeInTheDocument();
        });

        it("should support aria-hidden when hidden", () => {
            render(<DsDivider aria-hidden="true" />);
            // const divider = screen.getByRole("separator");
            const divider = document.querySelector('.MuiDivider-root');
            expect(divider).toHaveAttribute("aria-hidden", "true");
        });
    });

    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle empty children gracefully", () => {
            render(<DsDivider>{null}</DsDivider>);
            const divider = screen.getByRole("separator");
            expect(divider).toBeInTheDocument();
        });

        it("should handle very long text content", () => {
            const longText = "A".repeat(1000);
            render(<DsDivider>{longText}</DsDivider>);
            const divider = screen.getByText(longText);
            expect(divider).toBeInTheDocument();
        });
    });

    // ============================
    // THEME TESTING
    // ============================
    describe("Theme Testing", () => {
        it("should render correctly across all theme modes", () => {
            const themeColorScheme = getColorScheme(PALETTE);
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(<DsDivider />, theme);
                const divider = container.querySelector('.MuiDivider-root');
                
                expect(divider).toBeInTheDocument();
                expect(divider).toHaveClass('MuiDivider-root');
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should render with text content across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(
                    <DsDivider>Theme Test Content</DsDivider>, 
                    theme
                );
                const divider = container.querySelector('.MuiDivider-root');
                const text = screen.getByText('Theme Test Content');
                
                expect(divider).toBeInTheDocument();
                expect(text).toBeInTheDocument();
                expect(divider).toHaveClass('MuiDivider-withChildren');
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should handle size variants across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            const sizes = ['M', 'L'] as const;
            
            themes.forEach((theme) => {
                sizes.forEach((size) => {
                    const { container, unmount } = renderWithTheme(
                        <DsDivider ds-size={size} />, 
                        theme
                    );
                    const divider = container.querySelector('.MuiDivider-root');
                    
                    expect(divider).toBeInTheDocument();
                    expect(divider).toHaveAttribute('ds-size', size);
                    expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                    
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
            const { container } = render(<DsDivider />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with text content", () => {
            const { container } = render(<DsDivider>Snapshot Text Content</DsDivider>);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with vertical orientation", () => {
            const { container } = render(
                <DsBox sx={{ display: 'flex', height: '50px' }}>
                    <DsDivider orientation="vertical" />
                </DsBox>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with different sizes", () => {
            const sizes = ['M', 'L'] as const;
            sizes.forEach((size) => {
                const { container, unmount } = render(<DsDivider ds-size={size} />);
                expect(container.firstChild).toMatchSnapshot(`size-${size}`);
                unmount();
            });
        });

        it("should match snapshot with variants", () => {
            const variants = ['fullWidth', 'inset', 'middle'] as const;
            variants.forEach((variant) => {
                const { container, unmount } = render(<DsDivider variant={variant} />);
                expect(container.firstChild).toMatchSnapshot(`variant-${variant}`);
                unmount();
            });
        });

        it("should match snapshot with text alignment variants", () => {
            const alignments = ['left', 'center', 'right'] as const;
            alignments.forEach((textAlign) => {
                const { container, unmount } = render(
                    <DsDivider textAlign={textAlign}>Aligned Content</DsDivider>
                );
                expect(container.firstChild).toMatchSnapshot(`textAlign-${textAlign}`);
                unmount();
            });
        });

        it("should match snapshot across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(
                    <DsDivider>Theme Snapshot Test</DsDivider>,
                    theme
                );
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
                unmount();
            });
        });

        it("should match snapshot with complex content structure", () => {
            const { container } = render(
                <DsBox sx={{ p: 2 }}>
                    <DsDivider ds-size="L" variant="fullWidth">
                        Complex Content Structure
                    </DsDivider>
                </DsBox>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
    
});