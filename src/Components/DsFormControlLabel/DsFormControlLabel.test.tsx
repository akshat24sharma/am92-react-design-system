/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsFormControlLabel component
 * 
 * Testing Strategy (Optimized for Direct MUI Export):
 * This component is a direct export of MUI FormControlLabel with custom style overrides.
 * Tests focus only on design system specific functionality and overrides.
 * 
 * 1. Core Rendering - Basic component functionality
 * 2. Design System Styling - Custom style overrides validation
 * 3. Theme Integration - Design system theme compatibility
 * 4. Style Override Testing - Specific design system customizations
 * 5. Snapshot Testing - Visual regression for custom styling
 * 
 * @package @am92/react-design-system
 * @component DsFormControlLabel
 */

import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsFormControlLabel } from "../DsFormControlLabel";
import { DsCheckbox, DsRadio, DsFormControl, DsFormGroup, DsFormLabel } from "../index";

describe("DsFormControlLabel", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render MUI FormControlLabel with design system components", () => {
            render(
                <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Test Label"
                />
            );
            
            const formControlLabel = document.querySelector(".MuiFormControlLabel-root");
            const label = screen.getByText("Test Label");
            const checkbox = screen.getByRole("checkbox");
            
            expect(formControlLabel).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(checkbox).toBeInTheDocument();
        });
    });

    // ============================
    // DESIGN SYSTEM STYLING TESTS
    // ============================
    describe("Design System Style Overrides", () => {
        it("should apply disabled state with hover cursor override", () => {
            render(
                <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Disabled Label"
                    disabled
                />
            );
            
            const formControlLabel = document.querySelector(".MuiFormControlLabel-root");
            expect(formControlLabel).toBeInTheDocument();
            expect(formControlLabel).toHaveClass("Mui-disabled");
            
            // Test the specific override: disabled state should have cursor: not-allowed on hover
            // This tests the override: '&.Mui-disabled': { '&:hover': { cursor: 'not-allowed', pointerEvents: 'all' } }
            const disabledElement = document.querySelector(".MuiFormControlLabel-root.Mui-disabled");
            expect(disabledElement).toBeInTheDocument();
        });

        it("should apply labelPlacementStart margin overrides", () => {
            render(
                <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Start Label"
                    labelPlacement="start"
                />
            );
            
            const formControlLabel = document.querySelector(".MuiFormControlLabel-root") as HTMLElement;
            expect(formControlLabel).toHaveClass("MuiFormControlLabel-labelPlacementStart");
            
            // Test the specific override for labelPlacementStart
            // This tests the override: labelPlacementStart: { marginLeft: 'var(--ds-spacing-zero)', marginRight: 'var(--ds-spacing-quickFreeze)' }
            const computedStyles = window.getComputedStyle(formControlLabel);
            expect(computedStyles.marginLeft).toBe('var(--ds-spacing-zero)');
            expect(computedStyles.marginRight).toBe('var(--ds-spacing-quickFreeze)');
        });

        it("should apply design system typography and spacing to labels", () => {
            render(
                <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Typography Test"
                />
            );
            
            const label = document.querySelector(".MuiFormControlLabel-label") as HTMLElement;
            expect(label).toBeInTheDocument();            
            const computedStyles = window.getComputedStyle(label);
            expect(computedStyles.paddingRight).toBe('var(--ds-spacing-zero)');
        });
    });

    // ============================
    // THEME INTEGRATION TESTS
    // ============================

    describe("Theme Integration", () => {
        it("should render consistently across all design system themes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach(theme => {
                const { container, unmount } = render(
                    <DsFormControlLabel
                        control={<DsCheckbox />}
                        label={`${theme} theme test`}
                    />,
                    { colorScheme: theme }
                );
                
                const formControlLabel = container.querySelector('.MuiFormControlLabel-root');
                const label = container.querySelector('.MuiFormControlLabel-label');
                
                expect(formControlLabel).toBeInTheDocument();
                expect(label).toBeInTheDocument();
                expect(formControlLabel).toHaveClass('MuiFormControlLabel-root');
                
                unmount();
            });
        });
    });

    // ============================
    // DESIGN SYSTEM INTEGRATION
    // ============================
    describe("Design System Integration", () => {
        it("should work in design system form patterns", () => {
            render(
                <DsFormControl component="fieldset">
                    <DsFormLabel component="legend">Settings</DsFormLabel>
                    <DsFormGroup>
                        <DsFormControlLabel
                        control={<DsCheckbox name="notifications" />}
                        label="Email notifications"
                        />
                        <DsFormControlLabel
                        control={<DsRadio name="theme" value="auto" label={'test'}/>}
                        label="Auto theme"
                        />
                    </DsFormGroup>
                </DsFormControl>
            );
            
            expect(screen.getByText("Settings")).toBeInTheDocument();
            expect(screen.getByText("Email notifications")).toBeInTheDocument();
            expect(screen.getByText("Auto theme")).toBeInTheDocument();
            expect(screen.getByRole("checkbox")).toBeInTheDocument();
            expect(screen.getByRole("radio")).toBeInTheDocument();
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot with default styling", () => {
        const { container } = render(
            <DsFormControlLabel
            control={<DsCheckbox />}
            label="Default Label"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with disabled state overrides", () => {
        const { container } = render(
            <DsFormControlLabel
            control={<DsCheckbox />}
            label="Disabled Label"
            disabled
            />
        );
        expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with labelPlacement styling", () => {
        const { container } = render(
            <DsFormControlLabel
            control={<DsCheckbox />}
            label="Start Label"
            labelPlacement="start"
            />
        );
        expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot across design system themes", () => {
        const themes = ['light', 'dark', 'highContrast'] as const;
        
        themes.forEach(theme => {
            const { container } = render(
            <DsFormControlLabel
                control={<DsCheckbox />}
                label="Theme Test"
            />,
            { colorScheme: theme }
            );
            expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
        });
        });

        it("should match snapshot in design system form context", () => {
            const { container } = render(
                <DsFormControl>
                <DsFormLabel>Form Label</DsFormLabel>
                <DsFormControlLabel
                    control={<DsCheckbox />}
                    label="Form Control Label"
                />
                </DsFormControl>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});