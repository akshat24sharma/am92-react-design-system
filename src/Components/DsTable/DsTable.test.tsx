/**
 * @vitest-environment jsdom
 *
 * Test suite for DsTable component
 *
 * Testing Strategy:
 * 1. Core Rendering – Basic rendering and DOM structure
 * 2. Composition – Rendering with DsTable subcomponents
 * 3. Props Validation – MUI props like size, stickyHeader, padding
 * 4. Styling – MUI classes and sx props
 * 5. Event Handling – Row and cell interactions
 * 6. Accessibility – ARIA roles & labels
 * 7. Edge Cases – Empty states, uneven rows, large number of rows
 * 8. Real-world Scenarios – Table with interactive components
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DsTable } from "../DsTable"; 
import { DsTableBody } from "../DsTableBody";
import { DsTableRow } from "../DsTableRow";
import { DsTableCell } from "../DsTableCell";
import { DsTableContainer } from "../DsTableContainer";
import { DsTableHead } from "../DsTableHead";
import { renderWithTheme } from "../../Tests/Mocks/themeTestUtils";
import getColorScheme from "../../Theme/getColorScheme";
import { PALETTE } from "../../Constants";

// border, flex - equal h ki nhi, header color 
// if have defaulting check fir render 

describe("DsTable Component", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    // ============================
    // CORE RENDERING
    // ============================
    describe("Core Rendering", () => {
        it("should render table without crashing", () => {
            render(
            <DsTable>
                <DsTableBody>
                <DsTableRow>
                    <DsTableCell>Cell 1</DsTableCell>
                </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
            const cell = screen.getByText("Cell 1");
            expect(cell).toBeInTheDocument();
        });
        
        it("should render inside DsTableContainer", () => {
            render(
            <DsTableContainer>
                <DsTable>
                <DsTableBody>
                    <DsTableRow>
                    <DsTableCell>Container Cell</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
                </DsTable>
            </DsTableContainer>
            );
        
            expect(screen.getByText("Container Cell")).toBeInTheDocument();
        });
    });
    
    // ============================
    // COMPOSITION TESTS
    // ============================
    describe("Component Composition", () => {
        it("renders table head and body correctly", () => {
            render(
            <DsTable>
                <DsTableHead>
                    <DsTableRow>
                        <DsTableCell>Header</DsTableCell>
                    </DsTableRow>
                </DsTableHead>
        
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>Body Cell</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
        
            expect(screen.getByText("Header")).toBeInTheDocument();
            expect(screen.getByText("Body Cell")).toBeInTheDocument();
        });
    });
    
    // ============================
    // PROPS VALIDATION
    // ============================
    describe("Props Validation", () => {
        it("applies stickyHeader class when enabled", () => {
            const { container } = render(
            <DsTable stickyHeader>
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>Sticky</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
    
            const table = container.querySelector(".MuiTable-stickyHeader");
            expect(table).toBeTruthy();
        });

    
        it("accepts sx styling", () => {
            const { container } = render(
            <DsTable sx={{ backgroundColor: 'red' }}>
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>Small Row</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
    
            const table = container.querySelector(".MuiTable-root") as HTMLElement;
            expect(getComputedStyle(table).backgroundColor).toBe("rgb(255, 0, 0)");
        });
    });
    
    // ============================
    // EVENT HANDLING
    // ============================
    describe("Event Handling", () => {
        it("handles row click events", () => {
            const onRowClick = vi.fn();
    
            render(
            <DsTable>
                <DsTableBody>
                    <DsTableRow onClick={onRowClick} role="row">
                        <DsTableCell>Click Row</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
    
            fireEvent.click(screen.getByRole("row"));
            expect(onRowClick).toHaveBeenCalledTimes(1);
        });
    });
    
    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("has proper ARIA role", () => {
            const { container } = render(
                <DsTable aria-label="Sample Table"></DsTable>
            );
        
            const table = container.querySelector("table");
            expect(table).toHaveAttribute("aria-label", "Sample Table");
        });
        
        it("renders semantic table structure", () => {
            render(
            <DsTable>
                <DsTableHead>
                    <DsTableRow>
                        <DsTableCell>H</DsTableCell>
                    </DsTableRow>
                </DsTableHead>
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>B</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
        
            expect(document.querySelector("thead")).toBeInTheDocument();
            expect(document.querySelector("tbody")).toBeInTheDocument();
        });
    });
    
    // ============================
    // EDGE CASES
    // ============================
    describe("Edge Cases", () => {
        it("renders empty table body gracefully", () => {
            render(
            <DsTable>
                <DsTableBody></DsTableBody>
            </DsTable>
            );
        
            expect(document.querySelector("tbody")).toBeInTheDocument();
        });
        
        it("renders uneven rows gracefully", () => {
            render(
            <DsTable>
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>A</DsTableCell>
                        <DsTableCell>B</DsTableCell>
                    </DsTableRow>
                    <DsTableRow>
                        <DsTableCell>Only One</DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
        
            expect(screen.getByText("Only One")).toBeInTheDocument();
        });
        
        it("renders large number of rows", () => {
            const rows = Array.from({ length: 50 }, (_, i) => (
            <DsTableRow key={i}>
                <DsTableCell>Row {i}</DsTableCell>
            </DsTableRow>
            ));
        
            render(
            <DsTable>
                <DsTableBody>{rows}</DsTableBody>
            </DsTable>
            );
        
            expect(screen.getByText("Row 49")).toBeInTheDocument();
        });
    });
    
    // ============================
    // REAL-WORLD SCENARIOS
    // ============================
    describe("Real-world Scenarios", () => {
        it("renders table with interactive cells", () => {
            const onClick = vi.fn();
        
            render(
            <DsTable>
                <DsTableBody>
                    <DsTableRow>
                        <DsTableCell>
                        <button onClick={onClick}>Click Action</button>
                        </DsTableCell>
                    </DsTableRow>
                </DsTableBody>
            </DsTable>
            );
        
        fireEvent.click(screen.getByText("Click Action"));
        expect(onClick).toHaveBeenCalledTimes(1);
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
                const { container, unmount } = renderWithTheme(
                    <DsTable>
                        <DsTableBody>
                            <DsTableRow>
                                <DsTableCell>Theme Test Cell</DsTableCell>
                            </DsTableRow>
                        </DsTableBody>
                    </DsTable>,
                    theme
                );
                
                const table = container.querySelector('.MuiTable-root');
                const cell = screen.getByText('Theme Test Cell');
                
                expect(table).toBeInTheDocument();
                expect(cell).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should render table with header across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(
                    <DsTable>
                        <DsTableHead>
                            <DsTableRow>
                                <DsTableCell>Header Cell</DsTableCell>
                            </DsTableRow>
                        </DsTableHead>
                        <DsTableBody>
                            <DsTableRow>
                                <DsTableCell>Body Cell</DsTableCell>
                            </DsTableRow>
                        </DsTableBody>
                    </DsTable>,
                    theme
                );
                
                const table = container.querySelector('.MuiTable-root');
                const headerCell = screen.getByText('Header Cell');
                const bodyCell = screen.getByText('Body Cell');
                
                expect(table).toBeInTheDocument();
                expect(headerCell).toBeInTheDocument();
                expect(bodyCell).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
                unmount();
            });
        });

        it("should handle sticky header across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(
                    <DsTable stickyHeader>
                        <DsTableHead>
                            <DsTableRow>
                                <DsTableCell>Sticky Header</DsTableCell>
                            </DsTableRow>
                        </DsTableHead>
                        <DsTableBody>
                            <DsTableRow>
                                <DsTableCell>Body Content</DsTableCell>
                            </DsTableRow>
                        </DsTableBody>
                    </DsTable>,
                    theme
                );
                
                const table = container.querySelector('.MuiTable-stickyHeader');
                expect(table).toBeInTheDocument();
                expect(container.firstChild).toHaveAttribute('data-mui-color-scheme', theme);
                
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
                <DsTable>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Default Snapshot Cell</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with table container", () => {
            const { container } = render(
                <DsTableContainer>
                    <DsTable>
                        <DsTableBody>
                            <DsTableRow>
                                <DsTableCell>Container Snapshot</DsTableCell>
                            </DsTableRow>
                        </DsTableBody>
                    </DsTable>
                </DsTableContainer>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with header and body", () => {
            const { container } = render(
                <DsTable>
                    <DsTableHead>
                        <DsTableRow>
                            <DsTableCell>Header Snapshot</DsTableCell>
                        </DsTableRow>
                    </DsTableHead>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Body Snapshot</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with sticky header", () => {
            const { container } = render(
                <DsTable stickyHeader>
                    <DsTableHead>
                        <DsTableRow>
                            <DsTableCell>Sticky Header Snapshot</DsTableCell>
                        </DsTableRow>
                    </DsTableHead>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Sticky Body Snapshot</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with multiple rows and columns", () => {
            const { container } = render(
                <DsTable>
                    <DsTableHead>
                        <DsTableRow>
                            <DsTableCell>Col 1</DsTableCell>
                            <DsTableCell>Col 2</DsTableCell>
                            <DsTableCell>Col 3</DsTableCell>
                        </DsTableRow>
                    </DsTableHead>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Row 1 Col 1</DsTableCell>
                            <DsTableCell>Row 1 Col 2</DsTableCell>
                            <DsTableCell>Row 1 Col 3</DsTableCell>
                        </DsTableRow>
                        <DsTableRow>
                            <DsTableCell>Row 2 Col 1</DsTableCell>
                            <DsTableCell>Row 2 Col 2</DsTableCell>
                            <DsTableCell>Row 2 Col 3</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with custom styling", () => {
            const { container } = render(
                <DsTable sx={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Styled Snapshot Cell</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with empty table body", () => {
            const { container } = render(
                <DsTable>
                    <DsTableBody></DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with uneven rows", () => {
            const { container } = render(
                <DsTable>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>Cell A</DsTableCell>
                            <DsTableCell>Cell B</DsTableCell>
                            <DsTableCell>Cell C</DsTableCell>
                        </DsTableRow>
                        <DsTableRow>
                            <DsTableCell>Single Cell</DsTableCell>
                        </DsTableRow>
                        <DsTableRow>
                            <DsTableCell>Cell X</DsTableCell>
                            <DsTableCell>Cell Y</DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot across all theme modes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            themes.forEach((theme) => {
                const { container, unmount } = renderWithTheme(
                    <DsTable>
                        <DsTableHead>
                            <DsTableRow>
                                <DsTableCell>Theme Header</DsTableCell>
                            </DsTableRow>
                        </DsTableHead>
                        <DsTableBody>
                            <DsTableRow>
                                <DsTableCell>Theme Body</DsTableCell>
                            </DsTableRow>
                        </DsTableBody>
                    </DsTable>,
                    theme
                );
                expect(container.firstChild).toMatchSnapshot(`theme-${theme}`);
                unmount();
            });
        });

        it("should match snapshot with interactive content", () => {
            const { container } = render(
                <DsTable>
                    <DsTableBody>
                        <DsTableRow>
                            <DsTableCell>
                                <button>Action Button</button>
                            </DsTableCell>
                            <DsTableCell>
                                <input type="text" placeholder="Input field" />
                            </DsTableCell>
                            <DsTableCell>
                                <a href="#">Link</a>
                            </DsTableCell>
                        </DsTableRow>
                    </DsTableBody>
                </DsTable>
            );
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});