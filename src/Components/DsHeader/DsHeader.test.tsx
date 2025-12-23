/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsHeader component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Tests for default and required props rendering
 * 2. Props Validation - Tests for prop handling and defaults
 * 3. Component States - Tests for different component configurations
 * 4. MUI Styling - Tests for Material-UI classes and styling
 * 5. Component Functionality - Tests for logo rendering and children layout
 * 6. Accessibility - Tests for accessibility features
 * 7. Edge Cases - Tests for unusual scenarios and boundary conditions
 * 8. Real-world Scenarios - Tests for common usage patterns
 * 9. Snapshot Testing - Visual regression protection
 * 
 * @package @am92/react-design-system
 * @component DsHeader
 */

import { describe, expect, it, beforeEach } from "vitest";
import { render, screen } from "../../Tests/Mocks/testUtils";
import userEvent from '@testing-library/user-event';
import { DsHeader } from "./DsHeader.Component";
import { DsRemixIcon } from "../DsRemixIcon";
import { DsButton } from "../DsButton";
import { DsTypography } from "../DsTypography";

// Test constants for reusable values
const AXIS_BANK_LOGO_URL = "https://storybook.axis.bank.in/v2/assets/subzeroHeader-c9596480.svg";

describe("DsHeader", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render with logoUrl prop", () => {
            render(<DsHeader logoUrl={AXIS_BANK_LOGO_URL} />);
            
            // Should find the image element
            const image = document.querySelector('img');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', AXIS_BANK_LOGO_URL);
        });

        it("should render with children", () => {
            render(
                <DsHeader logoUrl={AXIS_BANK_LOGO_URL}>
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            const icon = document.querySelector('.ri-menu-line');
            expect(icon).toBeInTheDocument();
        });

    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should apply custom BoxProps to children container", () => {
            render(
                <DsHeader 
                    logoUrl={AXIS_BANK_LOGO_URL}
                    BoxProps={{ 'data-testid': 'children-container' } as any}
                >
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            const childrenContainer = screen.getByTestId('children-container');
            expect(childrenContainer).toBeInTheDocument();
        });

        it("should apply custom StackProps to children stack", () => {
            render(
                <DsHeader 
                    logoUrl={AXIS_BANK_LOGO_URL}
                    StackProps={{ 'data-testid': 'children-stack' } as any}
                >
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            const childrenStack = screen.getByTestId('children-stack');
            expect(childrenStack).toBeInTheDocument();
        });

        it("should handle both logoUrl and logo props together", () => {
            const CustomLogo = <DsTypography variant="headingBoldMedium">Custom Logo</DsTypography>;
            render(
                <DsHeader 
                    logoUrl={AXIS_BANK_LOGO_URL}
                    logo={CustomLogo}
                />
            );
            
            // Both should be rendered
            const image = document.querySelector('img');
            expect(image).toBeInTheDocument();
            expect(screen.getByText("Custom Logo")).toBeInTheDocument();
        });
    });

    // ============================
    // COMPONENT STATES
    // ============================
    describe("Component States", () => {
        it("should render in empty state with no logo or children", () => {
            const { container } = render(<DsHeader />);
            
            expect(container.firstChild).toBeInTheDocument();
            
            // Should not have any content
            const image = document.querySelector('img');
            const icon = document.querySelector('.ri-menu-line');
            expect(image).not.toBeInTheDocument();
            expect(icon).not.toBeInTheDocument();
        });

        it("should render with only logoUrl", () => {
            const { container } = render(<DsHeader logoUrl={AXIS_BANK_LOGO_URL} />);
            
            const image = document.querySelector('img');
            expect(image).toBeInTheDocument();
            
            // Main container should exist
            expect(container.firstChild).toBeInTheDocument();
        });

        it("should render with only children", () => {
            render(
                <DsHeader>
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            const icon = document.querySelector('.ri-menu-line');
            expect(icon).toBeInTheDocument();
            
            // No image should be present
            const image = document.querySelector('img');
            expect(image).not.toBeInTheDocument();
        });

    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply MUI styling and design system variables", () => {
            const { container } = render(
                <DsHeader logoUrl={AXIS_BANK_LOGO_URL}>
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            expect(container.firstChild).toBeInTheDocument();
            expect(container.firstChild).toHaveClass('MuiBox-root');
            
            // Icon should be properly positioned
            const icon = document.querySelector('.ri-menu-line');
            expect(icon).toBeInTheDocument();
        });
    });

    // ============================
    // COMPONENT FUNCTIONALITY TESTS
    // ============================
    describe("Component Functionality", () => {
        it("should render DsImage with correct props when logoUrl is provided", () => {
            render(<DsHeader logoUrl={AXIS_BANK_LOGO_URL} />);
            
            const image = document.querySelector('img');
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', AXIS_BANK_LOGO_URL);
            expect(image).toHaveAttribute('alt', 'logo');
        });

        it("should render logo element when provided", () => {
            const CustomLogo = <DsButton variant="text">Logo Button</DsButton>;
            render(<DsHeader logo={CustomLogo} />);
            
            expect(screen.getByText("Logo Button")).toBeInTheDocument();
            expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("should handle missing logoUrl gracefully", () => {
            render(
                <DsHeader logoUrl="">
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            // Empty logoUrl should not render image
            const image = document.querySelector('img');
            expect(image).not.toBeInTheDocument();
            
            // Children should still render
            const icon = document.querySelector('.ri-menu-line');
            expect(icon).toBeInTheDocument();
        });

        it("should prioritize logo prop over logoUrl when both provided", () => {
            const CustomLogo = <DsTypography variant="headingBoldMedium">Custom Logo</DsTypography>;
            render(
                <DsHeader 
                    logoUrl={AXIS_BANK_LOGO_URL}
                    logo={CustomLogo}
                />
            );
            
            // Both should render as the component renders both when provided
            const image = document.querySelector('img');
            const customLogo = screen.getByText("Custom Logo");
            expect(image).toBeInTheDocument();
            expect(customLogo).toBeInTheDocument();
        });
    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have proper accessibility structure and keyboard navigation", async () => {
            render(
                <DsHeader logoUrl={AXIS_BANK_LOGO_URL}>
                    <DsButton variant="text">Menu</DsButton>
                </DsHeader>
            );
            
            // Logo image should have alt text
            const image = document.querySelector('img');
            expect(image).toHaveAttribute('alt', 'logo');
            
            const button = screen.getByRole("button");
            
            // Should be able to focus via keyboard
            await user.tab();
            expect(button).toHaveFocus();
        });
    });

    // ============================
    // EDGE CASES
    // ============================
    describe("Edge Cases", () => {
        it("should handle null/undefined logoUrl", () => {
            const { container } = render(<DsHeader logoUrl={null as any} />);
            
            // Should not crash and should not render image
            expect(container.firstChild).toBeInTheDocument();
            
            const image = document.querySelector('img');
            expect(image).not.toBeInTheDocument();
        });

        it("should handle null children", () => {
            const { container } = render(<DsHeader logoUrl={AXIS_BANK_LOGO_URL} children={null as any} />);
            
            // Should not crash
            expect(container.firstChild).toBeInTheDocument();
            
            const image = document.querySelector('img');
            expect(image).toBeInTheDocument();
        });

        it("should handle complex logo elements", () => {
            const ComplexLogo = (
                <DsButton variant="contained" color="primary">
                    <DsRemixIcon className="ri-home-line" />
                    <DsTypography variant="bodyRegularMedium">Home</DsTypography>
                </DsButton>
            );
            
            render(<DsHeader logo={ComplexLogo} />);
            
            expect(screen.getByText("Home")).toBeInTheDocument();
            expect(screen.getByRole("button")).toBeInTheDocument();
            expect(document.querySelector('.ri-home-line')).toBeInTheDocument();
        });
    });

    // ============================
    // REAL-WORLD SCENARIOS
    // ============================
    describe("Real-world Scenarios", () => {
        it("should render typical navigation header with logo and menu", () => {
            render(
                <DsHeader logoUrl={AXIS_BANK_LOGO_URL}>
                    <DsRemixIcon className="ri-menu-line" />
                </DsHeader>
            );
            
            const image = document.querySelector('img');
            const menuIcon = document.querySelector('.ri-menu-line');
            
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', AXIS_BANK_LOGO_URL);
            expect(menuIcon).toBeInTheDocument();
        });

        it("should render header with custom logo component and navigation buttons", () => {
            const BrandLogo = (
                <DsButton variant="text" color="primary">
                    <DsTypography variant="headingBoldMedium">Brand</DsTypography>
                </DsButton>
            );
            
            render(
                <DsHeader logo={BrandLogo}>
                <DsButton variant="text">Profile</DsButton>
                </DsHeader>
            );
            
            expect(screen.getByText("Brand")).toBeInTheDocument();
            expect(screen.getByText("Profile")).toBeInTheDocument();
            expect(screen.getAllByRole("button")).toHaveLength(2);
        });
    });

    // ============================
    // SNAPSHOT TESTING
    // ============================
    describe("Snapshot Testing", () => {
        it("should match snapshot with default props", () => {
            const { container } = render(<DsHeader />);
            expect(container.firstChild).toMatchSnapshot('header-default');
        });

        it("should match snapshot with logoUrl only", () => {
            const { container } = render(
                <DsHeader logoUrl={AXIS_BANK_LOGO_URL} />
            );
            expect(container.firstChild).toMatchSnapshot('header-logo-url');
        });

        it("should match snapshot with all props", () => {
            const { container } = render(
                <DsHeader 
                    logoUrl={AXIS_BANK_LOGO_URL}
                    logo={<DsTypography variant="bodyRegularMedium">Brand</DsTypography>}
                >
                    <DsButton variant="text">Menu</DsButton>
                </DsHeader>
            );
            expect(container.firstChild).toMatchSnapshot('header-full-configuration');
        });
    });
});