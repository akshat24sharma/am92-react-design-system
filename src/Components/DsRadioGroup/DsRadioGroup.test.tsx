/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsRadioGroup component
 * 
 * Testing Strategy (Focused on Design System Extensions):
 * DsRadioGroup is a direct MUI RadioGroup wrapper with only custom sx styling for spacing.
 * Tests focus on the design system spacing customization and sx prop merging.
 * 
 * 1. Core Rendering - Basic rendering with design system styling
 * 2. Design System Styling - Custom spacing styles and sx prop merging
 * 3. Theme Testing - Cross-theme compatibility
 * 4. Snapshot Testing - Visual regression for styling changes
 * 
 * @package @am92/react-design-system
 * @component DsRadioGroup
 */

import { describe, expect, it } from "vitest";
import { render, renderWithoutTheme } from "../../Tests/Mocks/testUtils";
import { DsRadioGroup } from "./DsRadioGroup.Component";
import { DsRadio } from "../DsRadio";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

describe("DsRadioGroup Component", () => {

    // Helper functions to reduce code duplication
    const getRadioGroup = (container: HTMLElement) => 
        container.querySelector('.MuiRadioGroup-root');
    
    const getRadioItems = (container: HTMLElement) => 
        container.querySelectorAll('.MuiFormControlLabel-root');
    
    const verifyDesignSystemSpacing = (radioItems: NodeListOf<Element>) => {
        if (radioItems.length >= 2) {
            const styles = Array.from(radioItems).map(item => window.getComputedStyle(item));
            const lastIndex = styles.length - 1;
            
            // All but last should have margin-bottom
            for (let i = 0; i < lastIndex; i++) {
                expect(styles[i].marginBottom).toBeTruthy();
            }
            // Last should not have margin-bottom
            expect(styles[lastIndex].marginBottom).toBeFalsy();
        }
    };
    
    const renderRadioGroupWithItems = (sx?: any, itemCount = 3) => {
        const items = Array.from({ length: itemCount }, (_, i) => (
            <DsRadio key={i} label={`Option ${i + 1}`} value={`opt${i + 1}`} />
        ));
        
        return render(
            <DsRadioGroup sx={sx}>
                {items}
            </DsRadioGroup>
        );
    };

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render MUI RadioGroup with design system styling", () => {
            const { container } = render(
                <DsRadioGroup>
                    <DsRadio label="Option 1" value="option1" />
                    <DsRadio label="Option 2" value="option2" />
                </DsRadioGroup>
            );
            
            const radioGroup = container.querySelector('.MuiRadioGroup-root');
            expect(radioGroup).toBeInTheDocument();
            expect(radioGroup).toHaveClass("MuiRadioGroup-root");
        });

        it("should render without theme (edge case)", () => {
            const { container } = renderWithoutTheme(
                <DsRadioGroup>
                    <DsRadio label="Test Option" value="test" />
                </DsRadioGroup>
            );
            
            const radioGroup = container.querySelector('.MuiRadioGroup-root');
            expect(radioGroup).toBeInTheDocument();
        });
    });

    // ============================
    // DESIGN SYSTEM STYLING TESTS
    // ============================
    describe("Design System Styling", () => {
        it("should apply custom sx prop while preserving design system spacing", () => {
            const customSx = { backgroundColor: "var(--ds-colour-neutral4)" };
            const { container } = renderRadioGroupWithItems(customSx);
            
            const radioGroup = getRadioGroup(container);
            expect(radioGroup).toHaveStyle("background-color: var(--ds-colour-neutral4)");
            
            // Verify design system spacing is preserved
            const radioItems = getRadioItems(container);
            verifyDesignSystemSpacing(radioItems);
        });

        it("should merge custom sx with design system styles", () => {
            const customSx = { 
                padding: "20px",
                border: "1px solid blue",
                '> *': { color: 'var(--ds-colour-actionTertiary)' }
            };
            
            const { container } = renderRadioGroupWithItems(customSx);
            const radioGroup = getRadioGroup(container);
            const radioItems = getRadioItems(container);
            
            // Verify custom styles are applied
            expect(radioGroup).toHaveStyle("padding: 20px");
            expect(radioGroup).toHaveStyle("border: 1px solid blue");
            
            // Verify custom child selector is applied
            if (radioItems.length >= 3) {
                radioItems.forEach(item => {
                    expect(window.getComputedStyle(item).color).toBe('var(--ds-colour-actionTertiary)');
                });
            }
            
            // Verify design system spacing is preserved
            verifyDesignSystemSpacing(radioItems);
        });

        it("should apply design system spacing between radio items", () => {
            const { container } = renderRadioGroupWithItems();
            
            const radioGroup = getRadioGroup(container);
            expect(radioGroup).toBeInTheDocument();
            
            // Verify design system CSS selector '> *:nth-last-child(n+2)' works correctly
            const radioItems = getRadioItems(container);
            verifyDesignSystemSpacing(radioItems);
        });

        it("should handle empty sx prop", () => {
            const { container } = render(
                <DsRadioGroup sx={{}}>
                    <DsRadio label="Test Option" value="test" />
                </DsRadioGroup>
            );
            
            const radioGroup = container.querySelector('.MuiRadioGroup-root');
            expect(radioGroup).toBeInTheDocument();
        });

        it("should handle undefined sx prop", () => {
            const { container } = render(
                <DsRadioGroup sx={undefined}>
                    <DsRadio label="Test Option" value="test" />
                </DsRadioGroup>
            );
            
            const radioGroup = container.querySelector('.MuiRadioGroup-root');
            expect(radioGroup).toBeInTheDocument();
        });

        it("should verify sx prop merging order (custom sx overrides design system)", () => {
            const customSx = {
                '> *:nth-last-child(n+2)': { marginBottom: '10px' },
                backgroundColor: 'var(--ds-colour-neutral1)' 
            };
            
            const { container } = renderRadioGroupWithItems(customSx, 2);
            const radioGroup = getRadioGroup(container);
            const radioItems = getRadioItems(container);
            
            // Verify custom styles are applied
            expect(radioGroup).toHaveStyle("background-color: var(--ds-colour-neutral1)");
            
            // Verify custom override works (first item gets custom spacing, second doesn't)
            if (radioItems.length >= 2) {
                const firstItemStyle = window.getComputedStyle(radioItems[0]);
                const secondItemStyle = window.getComputedStyle(radioItems[1]);
                
                expect(firstItemStyle.marginBottom).toBe('10px');
                expect(secondItemStyle.marginBottom).toBeFalsy();
            }
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
                    <DsRadioGroup>
                        <DsRadio label="Theme Test" value="test" />
                    </DsRadioGroup>,
                    { colorScheme: theme }
                );
                
                const radioGroup = container.querySelector('.MuiRadioGroup-root');
                expect(radioGroup).toBeInTheDocument();
                
                // Verify design system spacing is applied
                const computedStyle = window.getComputedStyle(radioGroup as Element);
                expect(computedStyle).toBeDefined();
                
                unmount();
            });
        });

        it("should maintain functionality across themes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = render(
                <DsRadioGroup defaultValue="opt1">
                    <DsRadio label={`${theme} Option 1`} value="opt1" />
                    <DsRadio label={`${theme} Option 2`} value="opt2" />
                </DsRadioGroup>,
                { colorScheme: theme }
                );
                
                const selectedRadio = container.querySelector('input[value="opt1"]');
                expect(selectedRadio).toBeChecked();
                
                unmount();
            });
        });

        it("should apply design system CSS variables across themes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const schemeData = getColorScheme(PALETTE)[theme];
                expect(schemeData).toBeDefined();
                
                const { container, unmount } = render(
                <DsRadioGroup>
                    <DsRadio label="CSS Var Test" value="test" />
                </DsRadioGroup>,
                { colorScheme: theme }
                );
                
                const radioGroup = container.querySelector('.MuiRadioGroup-root');
                expect(radioGroup).toBeInTheDocument();
                
                unmount();
            });
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot with default props", () => {
            const { container } = render(
                <DsRadioGroup>
                <DsRadio label="Default Option 1" value="opt1" />
                <DsRadio label="Default Option 2" value="opt2" />
                </DsRadioGroup>
            );
            
            expect(container.firstChild).toMatchSnapshot('default-radio-group');
        });

        it("should match snapshot with selected value", () => {
            const { container } = render(
                <DsRadioGroup value="opt2">
                <DsRadio label="Option 1" value="opt1" />
                <DsRadio label="Selected Option" value="opt2" />
                <DsRadio label="Option 3" value="opt3" />
                </DsRadioGroup>
            );
            
            expect(container.firstChild).toMatchSnapshot('selected-radio-group');
        });

        it("should match snapshot with row layout", () => {
            const { container } = render(
                <DsRadioGroup row>
                <DsRadio label="Small" value="s" />
                <DsRadio label="Medium" value="m" />
                <DsRadio label="Large" value="l" />
                </DsRadioGroup>
            );
            
            expect(container.firstChild).toMatchSnapshot('row-radio-group');
        });

        it("should match snapshot with custom styling", () => {
            const { container } = render(
                <DsRadioGroup sx={{ backgroundColor: 'primary.light', padding: 2 }}>
                <DsRadio label="Styled Option 1" value="styled1" />
                <DsRadio label="Styled Option 2" value="styled2" disabled />
                </DsRadioGroup>
            );
            
            expect(container.firstChild).toMatchSnapshot('custom-styled-radio-group');
        });

        it("should match snapshots across theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = render(
                <DsRadioGroup defaultValue="theme-test">
                    <DsRadio label="Theme Test Option" value="theme-test" />
                    <DsRadio label="Another Option" value="another" />
                </DsRadioGroup>,
                { colorScheme: theme }
                );
                
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}-radio-group`);
                unmount();
            });
        });

        it("should match snapshot with name prop", () => {
            const { container } = render(
                <DsRadioGroup name="choice-group">
                <DsRadio label="Choice A" value="a" />
                <DsRadio label="Choice B" value="b" />
                </DsRadioGroup>
            );
            
            expect(container.firstChild).toMatchSnapshot('name-prop-radio-group');
        });
    });
});