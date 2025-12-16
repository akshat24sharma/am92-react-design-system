/**
 * @vitest-environment jsdom
 *
 * Test suite for DsChip component
 *
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Event Handling - User interactions and event handlers
 * 6. Accessibility - ARIA attributes and keyboard navigation 
 * 7. Edge Cases - Unusual scenarios and boundary conditions
 * 8. Real-world Scenarios - Common usage patterns
 *
 * @package @am92/react-design-system
 * @component DsChip
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DsChip } from "../DsChip";
import { DsRemixIcon } from "../DsRemixIcon";
import { render } from "../../Tests/Mocks/setupTests";

describe("DsChip Component", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render with default props", () => {
            render(<DsChip label="Default Chip" />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toBeInTheDocument();
            expect(chip).toHaveAttribute("type", "status");
        });

        it("should render with an icon", () => {
            render(
            <DsChip
                icon={<DsRemixIcon className="ri-star-fill" />}
                label="Default"
            />
            );
            const chip = document.querySelector('.MuiChip-root');
            const icon = document.querySelector('.ri-star-fill');
            expect(chip).toBeInTheDocument();
            expect(icon).toBeInTheDocument();
        });
    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should render with a custom color", () => {
            render(<DsChip label="Colored Chip" color="primary" />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveClass("MuiChip-colorPrimary");
        });

        it("should render with type 'status'", () => {
            render(<DsChip label="Status Chip" type="status" />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveAttribute("type", "status");
        });

        it("should render with type 'nudge'", () => {
            render(<DsChip label="Nudge Chip" type="nudge"/>);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveAttribute("type", "nudge");
        });
    });

    // ============================
    // COMPONENT STATES TESTS
    // ============================
    describe("Component States", () => {
        it("should render in disabled state", () => {
            render(<DsChip label="Disabled Chip" disabled />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveClass("Mui-disabled");
        });

        it("should render in clickable state", () => {
            render(<DsChip label="Clickable Chip" onClick={() => {}} />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toBeInTheDocument();
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply size classes", () => {
            render(<DsChip label="Small Chip" size="small" />);
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveClass("MuiChip-sizeSmall");
        });
    });

    // ============================
    // THEME TESTING
    // ============================
    describe("Theme Testing", () => {
        
        const testChipColors = (
            type: "status" | "nudge",
            variantObj: readonly {color: "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"; bgToken: string; colorToken: string;}[]
        ) => {
            // Define the color schemes to test against
            const colorSchemes = ['light', 'dark', 'highContrast'] as const;            
            // Iterate over each color scheme
            colorSchemes.forEach(colorScheme => {
            // Iterate over each color variant
            variantObj.forEach(variant => {
                // Render the DsChip component with the current type and color variant
                const { unmount } = render(
                    <DsChip label={`${type} Chip`} type={type} color={variant.color} />,
                    { colorScheme }
                );
                
                // Select the rendered chip element
                const chip = document.querySelector('.MuiChip-root') as HTMLElement;
                // Get the computed styles of the chip
                const styles = getComputedStyle(chip); 
                
                // Assert that the background color matches the expected token
                expect(styles.backgroundColor).toBe(variant.bgToken);
                // Assert that the text color matches the expected token
                expect(styles.color).toBe(variant.colorToken);
                
                // Unmount the component to clean up
                unmount();
            });
            });
        };
        
        it("should use correct design system colors for all color variants with type 'status'", () => {
            const colorVariantObj = [
                {color :'default', bgToken: 'var(--ds-colour-supportTypical)', colorToken: 'var(--ds-colour-typoOnSurface)'}, 
                {color :'primary', bgToken: 'var(--ds-colour-supportTypical)', colorToken: 'var(--ds-colour-typoOnSurface)'},
                {color :'secondary', bgToken: 'var(--ds-colour-supportTypical)', colorToken: 'var(--ds-colour-typoOnSurface)'},
                {color :'error', bgToken: 'var(--ds-colour-supportNegative)', colorToken: 'var(--ds-colour-typoOnSurface)'},
                {color :'info', bgToken: 'var(--ds-colour-neutral1)', colorToken: 'var(--ds-colour-typoPrimary)'},
                {color :'success', bgToken: 'var(--ds-colour-supportPositive)', colorToken: 'var(--ds-colour-typoOnSurface)'},
                {color :'warning', bgToken: 'var(--ds-colour-supportWarning)', colorToken: 'var(--ds-colour-typoOnSurface)'},
            ] as const;
            testChipColors("status", colorVariantObj);
        });

        it("should use correct design system colors for all color variants with type 'nudge'", () => {
            const colorVariantObj = [
                {color :'default', bgToken: 'var(--ds-colour-supportTypicalNeutral)', colorToken: 'var(--ds-colour-supportTypical)'}, 
                {color :'primary', bgToken: 'var(--ds-colour-supportTypicalNeutral)', colorToken: 'var(--ds-colour-supportTypical)'},
                {color :'secondary', bgToken: 'var(--ds-colour-supportTypicalNeutral)', colorToken: 'var(--ds-colour-supportTypical)'},
                {color :'error', bgToken: 'var(--ds-colour-supportNegativeNeutral)', colorToken: 'var(--ds-colour-supportNegative)'},
                {color :'info', bgToken: 'var(--ds-colour-neutral1)', colorToken: 'var(--ds-colour-typoPrimary)'},
                {color :'success', bgToken: 'var(--ds-colour-supportPositiveNeutral)', colorToken: 'var(--ds-colour-supportPositive)'},
                {color :'warning', bgToken: 'var(--ds-colour-supportWarningNeutral)', colorToken: 'var(--ds-colour-supportWarning)'},
            ] as const;
            testChipColors("nudge", colorVariantObj);
        });
    })

    // ============================
    // EVENT HANDLING TESTS
    // ============================
    describe("Event Handling", () => {
        it("should handle click events", async () => {
            const handleClick = vi.fn();
            render(<DsChip label="Clickable Chip" onClick={handleClick} />);
            const chip = screen.getByRole("button");
            await user.click(chip);
            expect(handleClick).toHaveBeenCalledTimes(1);
        });

    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have proper ARIA attributes", () => {
            render(<DsChip label="Accessible Chip" aria-label='Accessible Chip'/>);
            // const chip = screen.getByText("Accessible Chip");
            const chip = document.querySelector('.MuiChip-root');
            expect(chip).toHaveAttribute("aria-label", "Accessible Chip");
        });
    });

    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle long labels gracefully", () => {
            const longLabel = "A".repeat(100);
            render(<DsChip label={longLabel} />);
            const chip = screen.getByText(longLabel);
            expect(chip).toBeInTheDocument();
        });
    });

    // ============================
    // REAL-WORLD SCENARIOS TESTS
    // ============================
    describe("Real-world Scenarios", () => {
        it("should render multiple chips in a group", () => {
            render(
                <>
                    <DsChip label="Chip 1" />
                    <DsChip label="Chip 2" />
                </>
            );
            const chips = document.querySelectorAll('.MuiChip-root');
            expect(chips).toHaveLength(2);
        });
    });
    
    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Testing", () => {
        it("matches default render", () => {
            const { container } = render(<DsChip label="Snapshot Default" />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("matches with icon", () => {
            const { container } = render(
                <DsChip
                    icon={<DsRemixIcon className="ri-star-fill" />}
                    label="With Icon"
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("matches disabled state", () => {
            const { container } = render(<DsChip label="Disabled" disabled />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("matches clickable state", () => {
            const { container } = render(<DsChip label="Clickable" onClick={() => {}} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("matches small size", () => {
            const { container } = render(<DsChip label="Small" size="small" />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("matches status type with color variants", () => {
            const variants: Array<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = [
                "default",
                "primary",
                "secondary",
                "error",
                "info",
                "success",
                "warning",
            ];
            variants.forEach((color) => {
                const { container, unmount } = render(<DsChip label={`Status ${color}`} type="status" color={color} />);
                expect(container.firstChild).toMatchSnapshot(`status-${color}`);
                unmount();
            });
        });

        it("matches nudge type with color variants", () => {
            const variants: Array<"default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"> = [
                "default",
                "primary",
                "secondary",
                "error",
                "info",
                "success",
                "warning",
            ];
            variants.forEach((color) => {
                const { container, unmount } = render(<DsChip label={`Nudge ${color}`} type="nudge" color={color} />);
                expect(container.firstChild).toMatchSnapshot(`nudge-${color}`);
                unmount();
            });
        });

        it("matches across theme color schemes", () => {
            (["light", "dark", "highContrast"] as const).forEach((scheme) => {
                const { container, unmount } = render(
                    <DsChip label={`Scheme ${scheme}`} type="status" color="info" />,
                    { colorScheme: scheme }
                );
                expect(container.firstChild).toMatchSnapshot(`scheme-${scheme}`);
                unmount();
            });
        });
    });
});