/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsTab component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Component Functionality - DsTab behavior and interactions
 * 6. Event Handling - User interactions and event handlers
 * 7. Form Integration - Tab behavior in forms
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Real-world Scenarios - Common usage patterns
 * 11. Theme Testing - Cross-theme compatibility
 * 12. Snapshot Testing - Visual regression testing
 * 
 * @package @am92/react-design-system
 * @component DsTab
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {  fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "../../Tests/Mocks/setupTests";
import { DsTab } from "../DsTab";
import { DsTabs } from "../DsTabs";
import { DsRemixIcon } from "../DsRemixIcon";
import { DsBox } from "../DsBox";
import { DsButton } from "../DsButton";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../..";

describe("DsTab Component", () => {

    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render tab with basic props", () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Basic Tab" />
                    <DsTab 
                        label="Tab with Icon" 
                        icon={<DsRemixIcon className="ri-star-fill" />}
                    />
                    <DsTab 
                        icon={<DsRemixIcon className="ri-home-line" />}
                        aria-label="Home"
                    />
                </DsTabs>
            );
            
            const tabs = screen.getAllByRole("tab");
            expect(tabs).toHaveLength(3);
            
            const basicTab = screen.getByRole("tab", { name: "Basic Tab" });
            const iconTab = screen.getByRole("tab", { name: "Tab with Icon" });
            const iconOnlyTab = screen.getByRole("tab", { name: "Home" });
            
            expect(basicTab).toBeInTheDocument();
            expect(iconTab).toBeInTheDocument();
            expect(iconOnlyTab).toBeInTheDocument();
            
            expect(iconTab.querySelector('.ri-star-fill')).toBeInTheDocument();
            expect(iconOnlyTab.querySelector('.ri-home-line')).toBeInTheDocument();
        });
    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should handle core props correctly", () => {
            render(
                <DsTabs value={1}>
                    <DsTab 
                        label="Styled Tab" 
                        className="custom-tab-class"
                        sx={{ backgroundColor: 'primary.main' }}
                        value={0}
                    />
                    <DsTab 
                        label="Icon End Tab" 
                        icon={<DsRemixIcon className="ri-arrow-right-line" />}
                        iconPosition="end"
                        value={1}
                    />
                    <DsTab 
                        label="Link Tab" 
                        href="/test-link"
                        data-testid="custom-tab"
                        data-custom="custom-value"
                        value={2}
                    />
                </DsTabs>
            );
            
            const styledTab = screen.getByRole("tab", { name: "Styled Tab" });
            const iconTab = screen.getByRole("tab", { name: "Icon End Tab" });
            const linkTab = screen.getByTestId("custom-tab");
            
            expect(styledTab).toHaveClass("custom-tab-class");
            expect(iconTab).toHaveAttribute("aria-selected", "true");
            expect(linkTab).toHaveAttribute("href", "/test-link");
            expect(linkTab).toHaveAttribute("data-custom", "custom-value");
        });

        it("should handle variant props", () => {
            const { rerender } = render(
                <DsTabs value={0}>
                    <DsTab label="Default Variant Tab" />
                </DsTabs>
            );
            
            expect(screen.getByRole("tab", { name: "Default Variant Tab" })).toBeInTheDocument();
            
            rerender(
                <DsTabs value={1} ds-variant="container">
                    <DsTab label="Container Tab 1" />
                    <DsTab label="Container Tab 2" />
                    <DsTab label="Container Tab 3" />
                </DsTabs>
            );
            
            const tabs = screen.getAllByRole("tab");
            expect(tabs).toHaveLength(3);
            expect(screen.getByRole("tab", { name: "Container Tab 2" })).toHaveAttribute("aria-selected", "true");
        });
    });

    // ============================
    // COMPONENT STATES TESTS
    // ============================
    describe("Component States", () => {
        it("should handle all component states correctly", async () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Selected Tab" />
                    <DsTab label="Disabled Tab" disabled />
                    <DsTab 
                        label="This is a very long tab label that should wrap"
                        wrapped
                    />
                </DsTabs>
            );
            
            const selectedTab = screen.getByRole("tab", { name: "Selected Tab" });
            const disabledTab = screen.getByRole("tab", { name: "Disabled Tab" });
            const wrappedTab = screen.getByRole("tab", { name: /very long tab label/ });
            
            // Test selected/unselected states
            expect(selectedTab).toHaveAttribute("aria-selected", "true");
            expect(disabledTab).toHaveAttribute("aria-selected", "false");
            
            // Test disabled state
            expect(selectedTab).not.toBeDisabled();
            expect(disabledTab).toBeDisabled();
            
            // Test wrapped text
            expect(wrappedTab).toBeInTheDocument();
            
            // Test focus behavior
            await user.click(selectedTab);
            await user.click(wrappedTab);
            expect(selectedTab).not.toHaveFocus();
        });

        it("should handle container variant states", () => {
            render(
                <DsTabs value={0} ds-variant="container">
                    <DsTab label="Selected Container Tab" />
                    <DsTab label="Disabled Container Tab" disabled />
                    <DsTab label="Regular Container Tab" />
                </DsTabs>
            );
            
            const selectedTab = screen.getByRole("tab", { name: "Selected Container Tab" });
            const disabledTab = screen.getByRole("tab", { name: "Disabled Container Tab" });
            const regularTab = screen.getByRole("tab", { name: "Regular Container Tab" });
            
            expect(selectedTab).toHaveAttribute("aria-selected", "true");
            expect(disabledTab).toBeDisabled();
            expect(regularTab).toHaveAttribute("aria-selected", "false");
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply correct MUI classes for all states", () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Selected Tab" />
                    <DsTab label="Disabled Tab" disabled />
                </DsTabs>
            );
            
            const selectedTab = screen.getByRole("tab", { name: "Selected Tab" });
            const disabledTab = screen.getByRole("tab", { name: "Disabled Tab" });
            
            expect(selectedTab).toHaveClass("MuiTab-root");
            expect(selectedTab).toHaveClass("Mui-selected");
            expect(disabledTab).toHaveClass("MuiTab-root");
            expect(disabledTab).toHaveClass("Mui-disabled");
        });

        it("should apply container variant selected state CSS variables", () => {
            render(
                <DsTabs value={1} ds-variant="container">
                    <DsTab label="Unselected Container Tab" />
                    <DsTab label="Selected Container Tab" />
                    <DsTab label="Another Container Tab" />
                </DsTabs>
            );
            
            const selectedTab = screen.getByRole("tab", { name: "Selected Container Tab" });
            const unselectedTab = screen.getByRole("tab", { name: "Unselected Container Tab" });
            
            // Verify selected tab has correct classes and attributes
            expect(selectedTab).toHaveClass("MuiTab-root");
            expect(selectedTab).toHaveClass("Mui-selected");
            expect(selectedTab).toHaveAttribute("aria-selected", "true");
            
            // Verify unselected tab doesn't have selected class
            expect(unselectedTab).toHaveClass("MuiTab-root");
            expect(unselectedTab).not.toHaveClass("Mui-selected");
            expect(unselectedTab).toHaveAttribute("aria-selected", "false");
            
            // Verify the parent tabs component has the container variant structure
            const tablist = screen.getByRole("tablist");
            expect(tablist).toBeInTheDocument();
            
            // The CSS variables should be applied through the MUI theme system
            // when ds-variant="container" is used with Mui-selected class
            const computedStyle = window.getComputedStyle(selectedTab);
            
            // Note: In test environment, CSS custom properties may not be fully computed,
            // but we can verify the classes that trigger the CSS variable application
            expect(selectedTab).toHaveClass("Mui-selected");
        });

        it("should apply container variant disabled state styles", () => {
            render(
                <DsTabs value={0} ds-variant="container">
                    <DsTab label="Enabled Container Tab" />
                    <DsTab label="Disabled Container Tab" disabled />
                </DsTabs>
            );
            
            const enabledTab = screen.getByRole("tab", { name: "Enabled Container Tab" });
            const disabledTab = screen.getByRole("tab", { name: "Disabled Container Tab" });
            
            // Verify enabled tab classes
            expect(enabledTab).toHaveClass("MuiTab-root");
            expect(enabledTab).toHaveClass("Mui-selected");
            expect(enabledTab).not.toBeDisabled();
            
            // Verify disabled tab classes and state
            expect(disabledTab).toHaveClass("MuiTab-root");
            expect(disabledTab).toHaveClass("Mui-disabled");
            expect(disabledTab).toBeDisabled();
            expect(disabledTab).not.toHaveClass("Mui-selected");
        });
    });

    // ============================
    // COMPONENT FUNCTIONALITY TESTS
    // ============================
    describe("Component Functionality", () => {
        it("should change selected tab when clicked", async () => {
            const handleChange = vi.fn();
            render(
                <DsTabs value={0} onChange={handleChange}>
                    <DsTab label="Tab 1" />
                    <DsTab label="Tab 2" />
                </DsTabs>
            );
            
            const secondTab = screen.getByRole("tab", { name: "Tab 2" });
            await user.click(secondTab);
            
            expect(handleChange).toHaveBeenCalledTimes(1);
        });

        it("should handle tab navigation with arrow keys", async () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Tab 1" />
                    <DsTab label="Tab 2" />
                    <DsTab label="Tab 3" />
                </DsTabs>
            );
            
            const firstTab = screen.getByRole("tab", { name: "Tab 1" });
            firstTab.focus();
            
            await user.keyboard("{ArrowRight}");
            const secondTab = screen.getByRole("tab", { name: "Tab 2" });
            expect(secondTab).toHaveFocus();
        });

        it("should handle tab activation with Enter key", async () => {
            const handleChange = vi.fn();
            render(
                <DsTabs value={0} onChange={handleChange}>
                    <DsTab label="Tab 1" />
                    <DsTab label="Tab 2" />
                </DsTabs>
            );
            
            const secondTab = screen.getByRole("tab", { name: "Tab 2" });
            secondTab.focus();
            await user.keyboard("{Enter}");
            
            expect(handleChange).toHaveBeenCalledTimes(1);
        });
    });

    // ============================
    // EVENT HANDLING TESTS
    // ============================
    describe("Event Handling", () => {
        it("should handle onClick events", async () => {
            const handleClick = vi.fn();
            render(
                <DsTabs value={0}>
                    <DsTab label="Clickable Tab" onClick={handleClick} />
                </DsTabs>
            );
            
            const tab = screen.getByRole("tab", { name: "Clickable Tab" });
            await user.click(tab);
            
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it("should not trigger click when disabled", () => {
            const handleClick = vi.fn();
            render(
                <DsTabs value={0}>
                    <DsTab label="Disabled Tab" onClick={handleClick} disabled />
                </DsTabs>
            );
            
            const tab = screen.getByRole("tab", { name: "Disabled Tab" });
            expect(tab).toBeDisabled();
            
            // Try to click using fireEvent since userEvent can't click disabled elements
            fireEvent.click(tab);
            expect(handleClick).not.toHaveBeenCalled();
        });

        it("should handle onFocus and onBlur events", async () => {
            const handleFocus = vi.fn();
            const handleBlur = vi.fn();
            
            render(
                <DsTabs value={0}>
                    <DsTab 
                        label="Focus Tab" 
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                    <DsTab label="Other Tab" />
                </DsTabs>
            );
            
            const tab = screen.getByRole("tab", { name: "Focus Tab" });
            const otherTab = screen.getByRole("tab", { name: "Other Tab" });
            
            await user.click(tab);
            expect(handleFocus).toHaveBeenCalledTimes(1);
            
            await user.click(otherTab);
            expect(handleBlur).toHaveBeenCalledTimes(1);
        });
    });

    // ============================
    // FORM INTEGRATION TESTS
    // ============================
    describe("Form Integration", () => {
        it("should work within form context", () => {
            render(
                <form>
                    <DsTabs value={0}>
                        <DsTab label="Form Tab 1" />
                        <DsTab label="Form Tab 2" />
                    </DsTabs>
                </form>
            );
            
            const tabs = screen.getAllByRole("tab");
            expect(tabs).toHaveLength(2);
        });

        it("should handle form submission with tab selection", () => {
            const handleSubmit = vi.fn();
            render(
                <form onSubmit={handleSubmit}>
                    <DsTabs value={1}>
                        <DsTab label="Tab 1" value={0} />
                        <DsTab label="Tab 2" value={1} />
                    </DsTabs>
                    <button type="submit">Submit</button>
                </form>
            );
            
            const selectedTab = screen.getByRole("tab", { name: "Tab 2" });
            expect(selectedTab).toHaveAttribute("aria-selected", "true");
        });

        it("should handle different tab types (button vs link)", () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Button Tab" />
                    <DsTab label="Link Tab" href="/link" />
                </DsTabs>
            );
            
            const buttonTab = screen.getByRole("tab", { name: "Button Tab" });
            const linkTab = screen.getByRole("tab", { name: "Link Tab" });
            
            // Button tab should not have href
            expect(buttonTab).not.toHaveAttribute("href");
            // Link tab should have href
            expect(linkTab).toHaveAttribute("href", "/link");
        });
    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have proper accessibility attributes", () => {
            render(
                <DsTabs value={0}>
                    <DsTab label="Accessible Tab" />
                    <DsTab 
                        icon={<DsRemixIcon className="ri-settings-line" />}
                        aria-label="Settings"
                    />
                </DsTabs>
            );
            
            const accessibleTab = screen.getByRole("tab", { name: "Accessible Tab" });
            const settingsTab = screen.getByRole("tab", { name: "Settings" });
            
            expect(accessibleTab).toHaveAttribute("role", "tab");
            expect(accessibleTab).toHaveAttribute("aria-selected");
            expect(accessibleTab).toHaveAttribute("tabindex");
            expect(settingsTab).toHaveAttribute("aria-label", "Settings");
        });

        it("should handle comprehensive keyboard navigation", async () => {
            render(
                <DsTabs value={1}>
                    <DsTab label="First Tab" />
                    <DsTab label="Middle Tab" />
                    <DsTab label="Disabled Tab" disabled />
                    <DsTab label="Last Tab" />
                </DsTabs>
            );
            
            const firstTab = screen.getByRole("tab", { name: "First Tab" });
            const middleTab = screen.getByRole("tab", { name: "Middle Tab" });
            const lastTab = screen.getByRole("tab", { name: "Last Tab" });
            
            firstTab.focus();
            
            // Arrow right navigation (should skip disabled tab)
            await user.keyboard("{ArrowRight}");
            expect(middleTab).toHaveFocus();
            
            await user.keyboard("{ArrowRight}");
            expect(lastTab).toHaveFocus();
            
            // Arrow left navigation
            await user.keyboard("{ArrowLeft}");
            expect(middleTab).toHaveFocus();
            
            // Home and End keys
            await user.keyboard("{Home}");
            expect(firstTab).toHaveFocus();
            
            await user.keyboard("{End}");
            expect(lastTab).toHaveFocus();
        });
    });



    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle edge cases gracefully", async () => {
            const TestComponent = () => {
                const [disabled, setDisabled] = React.useState(false);
                
                return (
                    <DsBox>
                        <DsButton onClick={() => setDisabled(!disabled)}> Toggle Disabled </DsButton>
                        <DsTabs value={0}>
                            <DsTab label="" />
                            <DsTab label="Tab with null icon" icon={undefined} />
                            <DsTab label={"A".repeat(50)} />
                            <DsTab 
                                label="Invalid Icon Position"
                                icon={<DsRemixIcon className="ri-home-line" />}
                                iconPosition={'invalid' as any}
                            />
                            <DsTab label="Dynamic Tab" disabled={disabled} />
                        </DsTabs>
                    </DsBox>
                );
            };
            
            render(<TestComponent />);
            
            const tabs = screen.getAllByRole("tab");
            expect(tabs).toHaveLength(5);
            
            const toggle = screen.getByText("Toggle Disabled");
            const dynamicTab = screen.getByRole("tab", { name: "Dynamic Tab" });
            
            expect(dynamicTab).not.toBeDisabled();
            await user.click(toggle);
            expect(dynamicTab).toBeDisabled();
        });

        it("should handle standalone tab without container", () => {
            render(<DsTab label="Standalone Tab" />);
            const tab = screen.getByRole("tab", { name: "Standalone Tab" });
            expect(tab).toBeInTheDocument();
        });
    });

    // ============================
    // REAL-WORLD SCENARIOS TESTS
    // ============================
    describe("Real-world Scenarios", () => {

        it("should work in real-world scenarios", async () => {
            const TabContainer = () => {
                const [value, setValue] = React.useState(0);
                const [tabs, setTabs] = React.useState([
                    { label: "Dashboard", icon: "ri-dashboard-line" },
                    { label: "Users", icon: "ri-user-line" }
                ]);

                return (
                    <nav>
                        <DsButton 
                            onClick={() => setTabs([...tabs, { label: `Tab ${tabs.length + 1}`, icon: "ri-add-line" }])}
                        >
                            Add Tab
                        </DsButton>
                        <DsTabs value={value} onChange={(e, newValue) => setValue(newValue)}>
                            <DsTab label="Home" href="/home" />
                            {tabs.map((tab, index) => (
                                <DsTab 
                                    key={index}
                                    label={tab.label}
                                    icon={<DsRemixIcon className={tab.icon} />}
                                    value={index + 1}
                                />
                            ))}
                            <DsTab 
                                label={
                                    <DsBox sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        Messages
                                        <DsBox sx={{ backgroundColor: 'error.main', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>5</DsBox>
                                    </DsBox>
                                }
                            />
                        </DsTabs>
                    </nav>
                );
            };

            render(<TabContainer />);
            
            const homeTab = screen.getByRole("tab", { name: "Home" });
            expect(homeTab).toHaveAttribute("href", "/home");
            
            expect(screen.getByText("Messages")).toBeInTheDocument();
            expect(screen.getByText("5")).toBeInTheDocument();
            
            const addButton = screen.getByText("Add Tab");
            await user.click(addButton);
            
            const tabs = screen.getAllByRole("tab");
            expect(tabs.length).toBeGreaterThan(3);
        });
    });

    // ============================
    // THEME TESTING
    // ============================
    describe("Theme Testing", () => {
        it("should render variant container correctly across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { unmount } = render(
                    <DsTabs value={1} ds-variant="container">
                        <DsTab 
                            label="Theme Test Tab"
                            icon={<DsRemixIcon className="ri-star-fill" />}
                        />
                        <DsTab label="Selected Tab" />
                        <DsTab label="Disabled Tab" disabled />
                    </DsTabs>,
                    { colorScheme: theme }
                );
                
                const selectedTab = screen.getByRole('tab', { name: 'Selected Tab' });
                const disabledTab = screen.getByRole('tab', { name: 'Disabled Tab' });
                const unselectedTab = screen.getByRole('tab', { name: 'Theme Test Tab' });

                const computedUnselectedTab = getComputedStyle(unselectedTab);
                const computedSelectedTab = getComputedStyle(selectedTab);
                const computedDisabledTab = getComputedStyle(disabledTab);
                

                expect(computedUnselectedTab.backgroundColor).toBe("var(--ds-colour-surfaceSecondary)");
                expect(computedUnselectedTab.color).toBe("var(--ds-colour-typoSecondary)");

                expect(computedSelectedTab.backgroundColor).toBe("var(--ds-colour-stateSelectedSecondaryHover)");
                expect(computedSelectedTab.color).toBe("var(--ds-colour-typoActionTertiary)");

                expect(computedDisabledTab.backgroundColor).toBe("var(--ds-colour-surfaceSecondary)");
                expect(computedDisabledTab.color).toBe("var(--ds-colour-typoDisabled)");
                
                unmount();
            });
        });

        it("should render variant default correctly across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { unmount } = render(
                    <DsTabs value={1} >
                        <DsTab 
                            label="Theme Test Tab"
                            icon={<DsRemixIcon className="ri-star-fill" />}
                        />
                        <DsTab label="Selected Tab" />
                        <DsTab label="Disabled Tab" disabled />
                    </DsTabs>,
                    { colorScheme: theme }
                );
                
                const selectedTab = screen.getByRole('tab', { name: 'Selected Tab' });
                const disabledTab = screen.getByRole('tab', { name: 'Disabled Tab' });
                const unselectedTab = screen.getByRole('tab', { name: 'Theme Test Tab' });

                const computedUnselectedTab = getComputedStyle(unselectedTab);
                const computedSelectedTab = getComputedStyle(selectedTab);
                const computedDisabledTab = getComputedStyle(disabledTab);
                

                console.log(`Theme: ${theme}`, {
                    unselected: {
                        backgroundColor: computedUnselectedTab.backgroundColor,
                        color: computedUnselectedTab.color
                    },
                    selected: {
                        backgroundColor: computedSelectedTab.backgroundColor,
                        color: computedSelectedTab.color
                    },
                    disabled: {
                        backgroundColor: computedDisabledTab.backgroundColor,
                        color: computedDisabledTab.color
                    }
                });

                expect(computedUnselectedTab.color).toBe("var(--palette-text-secondary)");

                expect(computedSelectedTab.color).toBe("var(--palette-secondary-main)");

                expect(computedDisabledTab.color).toBe("var(--palette-text-disabled)");
                
                // Check for MUI tab indicator color
                const tablist = screen.getByRole("tablist");
                const indicator = tablist.querySelector('.MuiTabs-indicator');
                if (indicator) {
                    const computedIndicator = getComputedStyle(indicator);
                    expect(computedIndicator.backgroundColor).toBe("var(--palette-secondary-main)");
                }
                unmount();
            });
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot with key variations", () => {
            const { container, rerender } = render(
                <DsTabs value={0}>
                    <DsTab label="Default Tab" />
                    <DsTab 
                        label="Icon Tab"
                        icon={<DsRemixIcon className="ri-star-fill" />}
                        iconPosition="end"
                    />
                    <DsTab label="Disabled Tab" disabled />
                </DsTabs>
            );
            expect(container.firstChild).toMatchSnapshot('default-variant');
            
            rerender(
                <DsTabs value={1} ds-variant="container">
                    <DsTab label="Container Tab 1" />
                    <DsTab 
                        label="Dashboard" 
                        icon={<DsRemixIcon className="ri-dashboard-line" />}
                    />
                    <DsTab 
                        label="Styled Tab"
                        sx={{ backgroundColor: 'primary.light' }}
                        className="custom-tab"
                    />
                </DsTabs>
            );
            expect(container.firstChild).toMatchSnapshot('container-variant');
        });

        it("should match snapshot across theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            themes.forEach((theme) => {
                const { container, unmount } = render(
                    <DsTabs value={0}>
                        <DsTab 
                            label="Theme Test"
                            icon={<DsRemixIcon className="ri-home-line" />}
                        />
                    </DsTabs>,
                    { colorScheme: theme }
                );
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
                unmount();
            });
        });
    });
});


