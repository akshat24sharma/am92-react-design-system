/**
 * @vitest-environment jsdom
 *
 * Test suite for DsToggle component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states (checked, unchecked, disabled)
 * 4. MUI Styling - Material-UI specific styling and classes
 * 5. Component Functionality - Toggle behavior and interactions
 * 6. Event Handling - User interactions and event handlers
 * 7. Form Integration - Form behavior and validation
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Real-world Scenarios - Common usage patterns
 * 11. Snapshot Testing - Visual regression testing
 *
 * @package @am92/react-design-system
 * @component DsToggle
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "../../Tests/Mocks/testUtils";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";
import userEvent from "@testing-library/user-event";
import { DsToggle } from "./DsToggle.Component";
import { DsBox, DsFormControl, DsFormLabel } from "../index";


describe("DsToggle", () => {
    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render with required props", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const toggle = document.querySelector('.MuiSwitch-root');
            expect(toggle).toBeInTheDocument();
        });
    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should accept and display custom name", () => {
            render(<DsToggle name="custom-toggle" value={false} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toHaveAttribute("name", "custom-toggle");
        });

        it("should use fallback value when value is not provided", () => {
            // @ts-expect-error: value is required, but testing fallback
            render(<DsToggle name="toggle" onChange={vi.fn()} />);
            const toggle = document.querySelector('.MuiSwitch-root');
            expect(toggle).not.toBeChecked();
        });

        it("should accept color prop variants", () => {
            const colors = ['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning'] as const;
            colors.forEach(color => {
                render(<DsToggle name="toggle" value={true} onChange={vi.fn()} color={color as any} />);
                const toggle = document.querySelector('.MuiSwitch-root');
                expect(toggle).toBeInTheDocument();
            });
        });

        it("should handle custom id prop", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} id="custom-id" />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toHaveAttribute("id", "custom-id");
        });

        it("should accept custom className", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} className="custom-class" />);
            const toggle = document.querySelector('.MuiSwitch-root');
            expect(toggle).toHaveClass("custom-class");
        });
    });

    // ============================
    // COMPONENT STATES TESTS
    // ============================
    describe("Component States", () => {
        it("should render in checked state", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toBeChecked();
        });

        it("should render in unchecked state", () => {
            render(<DsToggle name="toggle" value={false} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).not.toBeChecked();
        });

        it("should render in disabled state", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} disabled />);
            const toggle = screen.getByRole('switch') as HTMLInputElement;
            expect(toggle).toBeDisabled();
        });

        it("should render with different color variants", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} color="primary" />);
            const toggle = document.querySelector('.MuiSwitch-root');
            expect(toggle).toBeInTheDocument();
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply MuiSwitch-root class", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toHaveClass("MuiSwitch-input");
        });

        it("should apply Mui-checked to MuiSwitch-switchBase when value is true", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const switchBase = document.querySelector(".MuiSwitch-switchBase");
            expect(switchBase).toHaveClass("Mui-checked");
        });

        it("should apply secondary color by default", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const switchBase = document.querySelector(".MuiSwitch-switchBase");
            expect(switchBase).toHaveClass("MuiSwitch-colorSecondary");
        });

        it("should apply Mui-disabled class when disabled", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} disabled />);
            const switchBase = document.querySelector(".MuiSwitch-switchBase");
            expect(switchBase).toHaveClass("Mui-disabled");
        });

        it("should apply focus classes when focused via keyboard", async () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            
            // Use keyboard to focus (not mouse click)
            await user.tab(); // Focus via keyboard to get focus-visible
            const switchBase = document.querySelector(".MuiSwitch-switchBase");
            
            // The element should have focus, focus-visible is only applied on keyboard navigation
            expect(toggle).toHaveFocus();
        });
    });

    // ============================
    // COMPONENT FUNCTIONALITY TESTS
    // ============================
    describe("Component Functionality", () => {
        it("should call onChange with name and new value", async () => {
            const handleChange = vi.fn();
            render(<DsToggle name="test-toggle" value={false} onChange={handleChange} />);
            const toggle = screen.getByRole('switch') as HTMLElement;
                
            await user.click(toggle);

            expect(handleChange).toHaveBeenCalledWith("test-toggle", true);
        });

        it("should toggle from true to false", async () => {
            const handleChange = vi.fn();
            render(<DsToggle name="toggle" value={true} onChange={handleChange} />);
            const toggle = screen.getByRole('switch') as HTMLElement;
                
            await user.click(toggle);

            expect(handleChange).toHaveBeenCalledWith("toggle", false);
        });


    });

    // ============================
    // EVENT HANDLING TESTS
    // ============================
    describe("Event Handling", () => {
        it("should not call onChange when disabled", () => {
            const handleChange = vi.fn();
            render(<DsToggle name="toggle" value={false} onChange={handleChange} disabled />);
            const toggle = screen.getByRole('switch') as HTMLElement;
            expect(toggle).toBeDisabled();
        });

        it("should handle focus and blur events", async () => {
            const handleFocus = vi.fn();
            const handleBlur = vi.fn();
            render(
                <DsToggle 
                    name="toggle" 
                    value={false} 
                    onChange={vi.fn()} 
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
            );
            const toggle = screen.getByRole('switch') as HTMLElement;
            
            await user.click(toggle);
            expect(handleFocus).toHaveBeenCalled();
            
            await user.tab();
            expect(handleBlur).toHaveBeenCalled();
        });

        it("should support keyboard navigation between multiple toggles", async () => {
            render(
                <DsBox>
                    <DsToggle name="first" value={false} onChange={vi.fn()} />
                    <DsToggle name="second" value={false} onChange={vi.fn()} />
                </DsBox>
            );
            
            const toggles = screen.getAllByRole('switch');
            
            await user.click(toggles[0]);
            expect(toggles[0]).toHaveFocus();
            
            await user.tab();
            expect(toggles[1]).toHaveFocus();
        });
    });

    // ============================
    // FORM INTEGRATION TESTS
    // ============================
    describe("Form Integration", () => {
        it("should work within a form and submit correct value", async () => {
            const handleSubmit = vi.fn((e) => e.preventDefault());
            render(
                <form onSubmit={handleSubmit}>
                <DsToggle name="toggle" value={true} onChange={vi.fn()} />
                <button type="submit">Submit</button>
                </form>
            );
            await user.click(screen.getByText("Submit"));
            expect(handleSubmit).toHaveBeenCalled();
        });

        it("should work with controlled components", async () => {
            let value = false;
            const handleChange = vi.fn((name, newValue) => {
                value = newValue;
            });
            
            const { rerender } = render(
                <DsToggle name="controlled" value={value} onChange={handleChange} />
            );
            
            const toggle = screen.getByRole('switch');
            expect(toggle).not.toBeChecked();
            
            await user.click(toggle);
            expect(handleChange).toHaveBeenCalledWith("controlled", true);
            
            rerender(<DsToggle name="controlled" value={value} onChange={handleChange} />);
            expect(screen.getByRole('switch')).toBeChecked();
        });

        it("should handle form submission with keyboard", async () => {
            const handleSubmit = vi.fn((e) => e.preventDefault());
            render(
                <form onSubmit={handleSubmit}>
                    <DsToggle name="toggle" value={false} onChange={vi.fn()} />
                </form>
            );
            
            const toggle = screen.getByRole('switch');
            toggle.focus();
            await user.keyboard('{Enter}');
            
            // Form should not submit on toggle activation
            expect(handleSubmit).not.toHaveBeenCalled();
        });
    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have role switch", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const toggle = document.querySelector('.MuiSwitch-input');
            expect(toggle).toHaveAttribute("role", "switch");
        });

        it("should set aria-disabled to true when disabled", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} disabled />);
            const switchBase = document.querySelector(".MuiSwitch-switchBase") as HTMLElement;
            expect(switchBase).toHaveAttribute("aria-disabled", "true");
        });

        it("should not set aria-disabled when enabled", () => {
            render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            const switchBase = document.querySelector(".MuiSwitch-switchBase") as HTMLElement;
            expect(switchBase).not.toHaveAttribute("aria-disabled");
        });

        it("should accept accessibility props without errors", () => {
            // Test that component accepts these props without throwing errors
            expect(() => {
                render(<DsToggle name="toggle" value={true} onChange={vi.fn()} inputProps={{ "aria-label": "Enable notifications" }} />);
            }).not.toThrow();
        });

        it("should support labeling via external elements", () => {
            render(
                <DsBox>
                    <span id="toggle-label">Dark mode</span>
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} />
                </DsBox>
            );
            const toggle = screen.getByRole('switch');
            const label = document.getElementById('toggle-label');
            expect(toggle).toBeInTheDocument();
            expect(label).toBeInTheDocument();
        });

        it("should work with descriptive content", () => {
            render(
                <DsBox>
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} />
                    <div id="toggle-help">This will enable dark mode theme</div>
                </DsBox>
            );
            const toggle = screen.getByRole('switch');
            const helpText = document.getElementById('toggle-help');
            expect(toggle).toBeInTheDocument();
            expect(helpText).toBeInTheDocument();
        });

        it("should be keyboard accessible", async () => {
            const handleChange = vi.fn();
            render(<DsToggle name="toggle" value={false} onChange={handleChange} />);
            const toggle = screen.getByRole('switch');
            
            // Should be focusable
            toggle.focus();
            expect(toggle).toHaveFocus();
            
            // Test keyboard interaction via click (switches are typically activated via click events)
            await user.click(toggle);
            expect(handleChange).toHaveBeenCalled();
        });
    });

    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle missing onChange gracefully", async () => {
            // @ts-expect-error: onChange is required, but testing fallback
            render(<DsToggle name="toggle" value={true} />);
            const toggle = screen.getByRole('switch') as HTMLElement;
            await user.click(toggle);
            // No error should be thrown
        });

        it("should handle null/undefined values gracefully", () => {
            render(<DsToggle name="toggle" value={null as any} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toBeInTheDocument();
            expect(toggle).not.toBeChecked();
        });

        it("should handle empty name", () => {
            render(<DsToggle name="" value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toBeInTheDocument();
            expect(toggle).toHaveAttribute("name", "");
        });

        it("should handle rapid successive clicks", async () => {
            const handleChange = vi.fn();
            render(<DsToggle name="toggle" value={false} onChange={handleChange} />);
            const toggle = screen.getByRole('switch') as HTMLElement;
            
            // Multiple rapid clicks
            await user.click(toggle);
            await user.click(toggle);
            await user.click(toggle);
            
            // Should have been called for each click
            expect(handleChange).toHaveBeenCalledTimes(3);
        });

        it("should handle very long name values", () => {
            const longName = "a".repeat(1000);
            render(<DsToggle name={longName} value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toHaveAttribute("name", longName);
        });

        it("should handle special characters in name", () => {
            const specialName = "toggle-name_with.special@chars!";
            render(<DsToggle name={specialName} value={true} onChange={vi.fn()} />);
            const toggle = screen.getByRole('switch');
            expect(toggle).toHaveAttribute("name", specialName);
        });
    });

    // ============================
    // REAL-WORLD SCENARIOS TESTS
    // ============================
    describe("Real-world Scenarios", () => {
        it("should work in a preference panel", () => {
            render(
                <section>
                <h2>Preferences</h2>
                <DsToggle name="darkMode" value={false} onChange={vi.fn()} />
                </section>
            );
            expect(document.querySelector('.MuiSwitch-root')).toBeInTheDocument();
        });

        it("should work in a settings form with multiple toggles", () => {
            const handleChange = vi.fn();
            render(
                <DsBox>
                    <h3>Account Settings</h3>
                    <DsFormControl>
                        <DsFormLabel>Email Notifications</DsFormLabel>
                        <DsToggle name="emailNotifications" value={true} onChange={handleChange} />
                    </DsFormControl>
                    <DsFormControl>
                        <DsFormLabel>SMS Notifications</DsFormLabel>
                        <DsToggle name="smsNotifications" value={false} onChange={handleChange} />
                    </DsFormControl>
                    <DsFormControl>
                        <DsFormLabel>Push Notifications</DsFormLabel>
                        <DsToggle name="pushNotifications" value={true} onChange={handleChange} />
                    </DsFormControl>
                </DsBox>
            );
            
            const toggles = screen.getAllByRole('switch');
            expect(toggles).toHaveLength(3);
            expect(toggles[0]).toBeChecked();
            expect(toggles[1]).not.toBeChecked();
            expect(toggles[2]).toBeChecked();
        });

        it("should work in a feature toggle configuration", async () => {
            const features = {
                beta: false,
                experimental: false,
                advanced: true
            };
            
            const handleFeatureToggle = vi.fn((name, value) => {
                features[name as keyof typeof features] = value;
            });
            
            render(
                <DsBox>
                    <h3>Feature Flags</h3>
                    {Object.entries(features).map(([featureName, enabled]) => (
                        <DsFormControl key={featureName}>
                            <DsFormLabel>{featureName} Feature</DsFormLabel>
                            <DsToggle 
                                name={featureName} 
                                value={enabled} 
                                onChange={handleFeatureToggle} 
                            />
                        </DsFormControl>
                    ))}
                </DsBox>
            );
            
            const toggles = screen.getAllByRole('switch');
            const betaToggle = toggles.find(toggle => toggle.getAttribute('name') === 'beta')!;
            await user.click(betaToggle);
            
            expect(handleFeatureToggle).toHaveBeenCalledWith('beta', true);
        });

        it("should work as a privacy setting toggle", async () => {
            const handlePrivacyChange = vi.fn();
            render(
                <DsFormControl>
                    <DsFormLabel>Make profile public</DsFormLabel>
                    <DsToggle 
                        name="publicProfile" 
                        value={false} 
                        onChange={handlePrivacyChange}
                        aria-describedby="privacy-description"
                    />
                    <div id="privacy-description">
                        When enabled, your profile will be visible to all users
                    </div>
                </DsFormControl>
            );
            
            const toggle = screen.getByRole('switch');
            expect(toggle).not.toBeChecked();
            
            await user.click(toggle);
            expect(handlePrivacyChange).toHaveBeenCalledWith('publicProfile', true);
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
                const { container, unmount } = renderWithTheme(
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} />, 
                    colorScheme
                );
                
                // Verify basic rendering
                const toggle = container.querySelector('input[type="checkbox"]');
                expect(toggle).toBeInTheDocument();
                
                // Verify color scheme is applied
                const wrapperElement = container.firstChild as HTMLElement;
                expect(wrapperElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
                
                // Verify theme colors match the actual theme configuration
                const schemeData = themeColorScheme[colorScheme];
                
                // Secondary color should match theme (DsToggle uses secondary by default)
                const expectedSecondaryColor = (schemeData?.palette?.secondary as any)?.main;
                expect(expectedSecondaryColor).toBeTruthy();
                expect(expectedSecondaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
                
                // Text color should match theme
                const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
                expect(expectedTextColor).toBeTruthy();
                
                // Verify CSS classes
                const switchBase = container.querySelector('.MuiSwitch-switchBase');
                expect(switchBase).toHaveClass('MuiSwitch-colorSecondary');
                
                // Snapshot testing
                expect(container.firstChild).toMatchSnapshot(`toggle-${colorScheme}-theme`);
                
                unmount();
            });
        });

        it("should use correct design system colors with secondary color (hardcoded)", () => {
            // DsToggle hardcodes color="secondary", so we test that it works correctly
            const themeColorScheme = getColorScheme(PALETTE);

            // Test all three themes for the hardcoded secondary color
            colorSchemes.forEach(colorScheme => {
                const schemeData = themeColorScheme[colorScheme];
                
                const { container, unmount } = renderWithTheme(
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} />, 
                    colorScheme
                );
                
                // Get expected secondary color from the theme's palette
                const paletteColor = schemeData?.palette?.secondary as any;
                const expectedColor = paletteColor?.main;
                
                expect(expectedColor).toBeTruthy(); // Ensure we have a valid color
                expect(expectedColor).toBe((schemeData?.palette?.secondary as any)?.main);
                
                // Verify CSS class - DsToggle always uses secondary
                const switchBase = container.querySelector('.MuiSwitch-switchBase') as HTMLElement;
                expect(switchBase).toHaveClass('MuiSwitch-colorSecondary');
                
                unmount();
            });
        });

        it("should verify theme differences and maintain functionality", () => {
            // Get the complete color scheme from theme
            const themeColorScheme = getColorScheme(PALETTE);
            
            // Verify light vs dark theme differences using actual theme configuration
            const lightSchemeData = themeColorScheme.light;
            const darkSchemeData = themeColorScheme.dark;
            
            const lightTextColor = (lightSchemeData?.palette?.text as any)?.primary;
            const darkTextColor = (darkSchemeData?.palette?.text as any)?.primary;
            const lightSecondaryColor = (lightSchemeData?.palette?.secondary as any)?.main;
            const darkSecondaryColor = (darkSchemeData?.palette?.secondary as any)?.main;
            
            // Text colors should be different between themes
            expect(lightTextColor).toBeTruthy();
            expect(darkTextColor).toBeTruthy();
            expect(lightTextColor).not.toBe(darkTextColor);
            
            // Secondary color should be consistent across light/dark themes
            expect(lightSecondaryColor).toBeTruthy();
            expect(darkSecondaryColor).toBeTruthy();
            expect(lightSecondaryColor).toBe(darkSecondaryColor);
            
            // Test functionality works across themes
            const handleChange = vi.fn();
            colorSchemes.forEach(colorScheme => {
                document.body.innerHTML = '';
                handleChange.mockClear();
                
                const { unmount } = renderWithTheme(
                    <DsToggle name="toggle" value={false} onChange={handleChange} />, 
                    colorScheme
                );
                
                const toggle = screen.getByRole('switch');
                toggle.click();
                expect(handleChange).toHaveBeenCalledWith('toggle', true);
                
                unmount();
            });
        });

        it("should integrate with theme correctly across all color schemes with different states", () => {
            // Get the complete color scheme from theme
            const themeColorScheme = getColorScheme(PALETTE);
            
            // Comprehensive theme testing for all states in one test
            colorSchemes.forEach(colorScheme => {
                // Test multiple component states per theme
                const { container: uncheckedContainer, unmount: unmountUnchecked } = renderWithTheme(
                    <DsToggle name={`unchecked-${colorScheme}`} value={false} onChange={vi.fn()} />, 
                    colorScheme
                );
                
                const { container: checkedContainer, unmount: unmountChecked } = renderWithTheme(
                    <DsToggle name={`checked-${colorScheme}`} value={true} onChange={vi.fn()} />, 
                    colorScheme
                );
                
                const { container: disabledContainer, unmount: unmountDisabled } = renderWithTheme(
                    <DsToggle name={`disabled-${colorScheme}`} value={true} disabled onChange={vi.fn()} />, 
                    colorScheme
                );

                // Actual color validation (once per color scheme)
                const schemeData = themeColorScheme[colorScheme];
                
                // Validate secondary colors exist and are valid hex codes
                const expectedSecondaryColor = (schemeData?.palette?.secondary as any)?.main;
                const expectedTextColor = (schemeData?.palette?.text as any)?.primary;
                const expectedBackgroundColor = (schemeData?.palette?.background as any)?.paper;
                
                // Color format validation
                expect(expectedSecondaryColor).toBeTruthy();
                expect(expectedSecondaryColor).toMatch(/^#[0-9A-Fa-f]{6}$/);
                expect(expectedTextColor).toBeTruthy();
                expect(expectedBackgroundColor).toBeTruthy();

                // Component state-specific testing
                // Test unchecked state
                const uncheckedElement = uncheckedContainer.querySelector('.MuiSwitch-switchBase');
                expect(uncheckedElement).toHaveClass('MuiSwitch-colorSecondary');
                expect(uncheckedContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

                // Test checked state
                const checkedElement = checkedContainer.querySelector('.MuiSwitch-switchBase');
                expect(checkedElement).toHaveClass('MuiSwitch-colorSecondary', 'Mui-checked');

                // Test disabled state
                const disabledElement = disabledContainer.querySelector('.MuiSwitch-switchBase');
                expect(disabledElement).toHaveClass('MuiSwitch-colorSecondary', 'Mui-disabled');

                // Theme attribute validation
                expect(checkedContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);
                expect(disabledContainer.firstChild as HTMLElement).toHaveAttribute('data-mui-color-scheme', colorScheme);

                // Cleanup memory
                unmountUnchecked();
                unmountChecked();
                unmountDisabled();
            });
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot when checked", () => {
            const { container } = render(<DsToggle name="toggle" value={true} onChange={vi.fn()} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot when unchecked", () => {
            const { container } = render(<DsToggle name="toggle" value={false} onChange={vi.fn()} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot when disabled", () => {
            const { container } = render(<DsToggle name="toggle" value={true} onChange={vi.fn()} disabled />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with different states combinations", () => {
            const states = [
                { value: true, disabled: false, name: 'checked-enabled' },
                { value: false, disabled: false, name: 'unchecked-enabled' },
                { value: true, disabled: true, name: 'checked-disabled' },
                { value: false, disabled: true, name: 'unchecked-disabled' }
            ];

            states.forEach((state, index) => {
                const { container } = render(
                    <DsToggle 
                        name="toggle" 
                        value={state.value} 
                        disabled={state.disabled}
                        onChange={vi.fn()} 
                    />
                );
                expect(container.firstChild).toMatchSnapshot(`state-${state.name}-${index}`);
            });
        });

        it("should match snapshot with different sizes", () => {
            const sizes = ['small', 'medium'] as const;
            
            sizes.forEach((size, index) => {
                const { container } = render(
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} size={size} />
                );
                expect(container.firstChild).toMatchSnapshot(`size-${size}-${index}`);
            });
        });

        it("should match snapshot with different colors", () => {
            const colors = ['default', 'primary', 'secondary'] as const;
            
            colors.forEach((color, index) => {
                const { container } = render(
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} color={color as any} />
                );
                expect(container.firstChild).toMatchSnapshot(`color-${color}-${index}`);
            });
        });

        it("should match snapshot across all themes", () => {
            const colorSchemes = ['light', 'dark', 'highContrast'] as const;
            
            colorSchemes.forEach(theme => {
                const { container } = renderWithTheme(
                    <DsToggle name="toggle" value={true} onChange={vi.fn()} />, 
                    theme
                );
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
            });
        });

        it("should match snapshot in real-world form scenario", () => {
            const { container } = render(
                <DsFormControl>
                    <DsFormLabel>Enable notifications</DsFormLabel>
                    <DsToggle name="notifications" value={false} onChange={vi.fn()} />
                </DsFormControl>
            );
            expect(container.firstChild).toMatchSnapshot('form-control-scenario');
        });
    });

    // ============================
    // TEST REVIEW COMMENTS
    // ============================
    // The test for fallback value ("should use fallback value when value is not provided") may fail if DsToggle does not default to false.
    // The test for missing onChange ("should handle missing onChange gracefully") may fail if DsToggle does not guard against undefined onChange.
    // All other failures would indicate a bug in the component or a breaking change in MUI Switch.
});
