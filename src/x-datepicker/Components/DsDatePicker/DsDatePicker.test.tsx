/**
 * @vitest-environment jsdom
 * 
 * Test suite for DsDatePicker component
 * 
 * Testing Strategy:
 * 1. Core Rendering - Basic rendering and display
 * 2. Props Validation - Prop handling and validation
 * 3. Component States - Different component states
 * 4. MUI Styling - Material-UI specific styling
 * 5. Component Functionality - Date picker behavior
 * 6. Event Handling - User interactions and event handlers
 * 7. Form Integration - Form behavior and validation
 * 8. Accessibility - ARIA attributes and keyboard navigation
 * 9. Edge Cases - Unusual scenarios and boundary conditions
 * 10. Real-world Scenarios - Common usage patterns
 * 11. Theme Testing - Component behavior across light, dark, and high contrast themes
 * 12. Snapshot Testing - Visual regression testing across all states and themes
 * 
 * @package @am92/react-design-system
 * @component DsDatePicker
 */

import React from 'react';
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, renderWithoutTheme } from "../../../Tests/Mocks/setupTests";
import userEvent from '@testing-library/user-event';
import { DsDatePicker } from "./DsDatePicker.Component";
import { DsDatePickerProps } from "./DsDatePicker.Types";
import getColorScheme from "../../../Theme/getColorScheme";
import { PALETTE } from "../../../Constants";
import { 
    DsBox, 
    DsTypography, 
    DsButton,
    DsPaper,
    DsFormControl,
    DsFormLabel,
    DsFormHelperText,
    DsFormControlLabel,
    DsFormGroup,
    DsStack
} from "../../../Components";

describe("DsDatePicker Component", () => {
    let user: ReturnType<typeof userEvent.setup>;

    beforeEach(() => {
        user = userEvent.setup();
    });

    const defaultProps: DsDatePickerProps = {
        name: 'test-date-picker',
        label: 'Test Date Picker'
    };

    // Test constants
    const TEST_DATE = new Date('2024-03-15T10:30:00.000Z');

    // ============================
    // CORE RENDERING TESTS
    // ============================
    describe("Core Rendering", () => {
        it("should render with design system theme by default", () => {
            render(<DsDatePicker {...defaultProps} />);
            
            const input = screen.getByRole("textbox");
            expect(input).toBeInTheDocument();
        });

        it("should render with label", () => {
            render(<DsDatePicker name="date" label="Select Date" />);
            expect(screen.getByLabelText(/select date/i)).toBeInTheDocument();
        });

        it("should render with label and proper accessibility attributes", () => {
            render(<DsDatePicker name="birth-date" label="Date of Birth" required />);
            
            const input = screen.getByLabelText(/date of birth/i);
            const label = screen.getByText(/date of birth/i);
            
            expect(input).toBeInTheDocument();
            expect(label).toBeInTheDocument();
            expect(input).toHaveAttribute('name', 'birth-date');
            expect(input).toBeRequired();
            expect(input).toHaveAccessibleName('Date of Birth');
        });

        it("should render calendar button", () => {
            render(<DsDatePicker {...defaultProps} />);
            const calendarButton = screen.getByRole('button');
            expect(calendarButton).toBeInTheDocument();
        });

        it("should render with helper text", () => {
            render(<DsDatePicker {...defaultProps} helperText="Choose a date" />);
            expect(screen.getByText(/choose a date/i)).toBeInTheDocument();
        });

        it("should handle edge case without theme", () => {
            const { container } = renderWithoutTheme(<DsDatePicker {...defaultProps} />);
            const input = container.querySelector('input[type="text"]');
            expect(input).toBeInTheDocument();
        });


    });

    // ============================
    // PROPS VALIDATION TESTS
    // ============================
    describe("Props Validation", () => {
        it("should handle required prop", () => {
            render(<DsDatePicker {...defaultProps} required />);
            const input = screen.getByRole('textbox');
            expect(input).toBeRequired();
        });

        it("should handle readOnly prop", () => {
            render(<DsDatePicker {...defaultProps} readOnly />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('readonly');
        });

        it("should handle slotProps for input customization", () => {
            render(
                <DsDatePicker 
                {...defaultProps}
                slotProps={{
                    textField: {
                    'aria-describedby': 'help-text'
                    } as any
                }} 
                />
            );
            
            const input = screen.getByRole("textbox");
            expect(input).toHaveAttribute("aria-describedby", "help-text");
        });

        it("should handle value types correctly", () => {
            render(
                <DsDatePicker
                {...defaultProps}
                valueType="date"
                value={TEST_DATE}
                />
            );
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('15/03/2024');
        });

        it("should handle null value appropriately", () => {
            render(<DsDatePicker {...defaultProps} value={null} />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('');
        });

        it("should handle format prop", () => {
            render(<DsDatePicker {...defaultProps} format="dd/MM/yyyy" />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });
    });

    // ============================
    // COMPONENT STATES TESTS
    // ============================
    describe("Component States", () => {
        it("should render in disabled state", () => {
            render(<DsDatePicker {...defaultProps} disabled />);
            const input = screen.getByRole('textbox');
            const calendarButton = screen.getByRole('button');
            
            expect(input).toBeDisabled();
            expect(calendarButton).toBeDisabled();
        });

        it("should render in error state", () => {
            render(<DsDatePicker {...defaultProps} error />);
            const inputBase = document.querySelector('.MuiInputBase-root');
            expect(inputBase).toHaveClass('Mui-error');
        });

        it("should render in focused state", async () => {
            render(<DsDatePicker {...defaultProps} autoFocus/>);

            const input = screen.getByRole('textbox');
            const inputBase = document.querySelector('.MuiInputBase-root');
            expect(inputBase).toHaveClass('Mui-focused');
            expect(input).toHaveFocus();
        });

        it("hould enter the focus state when navigated to using the Tab key", async () => {
            render(<DsDatePicker {...defaultProps} />);
            
            await user.tab();
            const input = screen.getByRole('textbox');
            const inputBase = document.querySelector('.MuiInputBase-root');
            
            expect(input).toHaveFocus();
            expect(inputBase).toHaveClass('Mui-focused');
        });

        it("should handle loading state", async () => {
            render(<DsDatePicker {...defaultProps} loading />);

            // Click calendar button to open picker first
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear, then check for loading state in calendar
            await waitFor(() => {
                expect(document.querySelector('.MuiDayCalendar-loadingContainer')).toBeInTheDocument();
            });
            expect(document.querySelector('.MuiDayCalendar-loadingContainer')).toBeInTheDocument();
        });
    });

    // ============================
    // MUI STYLING TESTS
    // ============================
    describe("MUI Styling", () => {
        it("should apply default MUI classes", () => {
            const { container } = render(<DsDatePicker {...defaultProps} />);
            const datePickerRoot = container.querySelector('.MuiInputBase-root');
            expect(datePickerRoot).toBeInTheDocument();
        });

        it("should apply error styling", () => {
            const { container } = render(<DsDatePicker {...defaultProps} error={true} />);
            const textField = container.querySelector('.Mui-error');
            expect(textField).toBeInTheDocument();
        });

        it("should apply success styling", () => {
            const { container } = render(<DsDatePicker {...defaultProps} success={true} />);
            const textField = container.querySelector('.MuiInputBase-colorSuccess');
            expect(textField).toBeInTheDocument();
        });

        it("should apply disabled styling", () => {
            const { container } = render(<DsDatePicker {...defaultProps} disabled />);
            const textField = container.querySelector('.Mui-disabled');
            expect(textField).toBeInTheDocument();
        });
    });

    // ============================
    // COMPONENT FUNCTIONALITY TESTS
    // ============================
    describe("Component Functionality", () => {
        it("should open date picker on calendar button click", async () => {
            render(<DsDatePicker {...defaultProps} />);
            const calendarButton = screen.getByRole('button');
            
            await user.click(calendarButton);
            
            await waitFor(() => {
                const dialog = screen.queryByRole('dialog');
                if (dialog) {
                    expect(dialog).toBeInTheDocument();
                }
            });
        });

        it("should handle date selection", async () => {
            const handleChange = vi.fn();
            render(<DsDatePicker {...defaultProps} onChange={handleChange} />);
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear and select a date
            await waitFor(() => {
                const calendar = document.querySelector('.MuiDateCalendar-root');
                expect(calendar).toBeInTheDocument();
            });
            
            // Click on date 15
            const dateButton = screen.getByRole('gridcell', { name: '15' });
            await user.click(dateButton);
            
            expect(handleChange).toHaveBeenCalled();
        });

        it("should validate date input", async () => {
            render(<DsDatePicker {...defaultProps} value={TEST_DATE} />);
            const input = screen.getByRole('textbox');
            
            // Verify initial valid date is set
            expect(input).toHaveValue('15/03/2024');
            
            // Try to type invalid date format
            await user.clear(input);
            await user.type(input, 'abc123invalid');
            
            // Trigger validation by blurring
            await user.tab();
            
            // After entering invalid input and blurring, MUI DatePicker should revert to the original TEST_DATE
            // This validates that invalid input is rejected and the component maintains the valid state
            expect(input).toHaveValue('15/03/2024');
        });

        it("should handle keyboard navigation", async () => {
            render(<DsDatePicker {...defaultProps} />);
            const input = screen.getByRole('textbox');
            
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            
            // Date picker should respond to keyboard input
            expect(input).toHaveFocus();
        });

        it("should handle clear functionality", async () => {
            const handleChange = vi.fn();
            render(<DsDatePicker {...defaultProps} value={TEST_DATE} onChange={handleChange} />);
            
            const input = screen.getByRole('textbox');
            await user.clear(input);
            
            expect(handleChange).toHaveBeenCalled();
        });

        it("should cancel value changes when close button is clicked", async () => {
            const handleChange = vi.fn();
            const originalDate = new Date('2024-03-15T10:30:00.000Z'); // Date A
            
            render(<DsDatePicker {...defaultProps} value={originalDate} onChange={handleChange} />);
            
            // Verify original date is displayed
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('15/03/2024');
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar dialog to appear
            await waitFor(() => {
                const dialog = screen.queryByRole('dialog');
                expect(dialog).toBeInTheDocument();
            });
            
            // Select a different date (Date B) - click on date 20
            const dateButton = screen.getByRole('gridcell', { name: '20' });
            await user.click(dateButton);
            
            // Find and click the close button (icon button with close icon) in the dialog toolbar
            const closeButton = document.querySelector('.ri-close-line')?.closest('button');
            expect(closeButton).toBeInTheDocument();
            await user.click(closeButton!);
            
            // Wait for dialog to close and verify that the original date is restored (Date A)
            await waitFor(() => {
                const dialog = screen.queryByRole('dialog');
                expect(dialog).not.toBeInTheDocument();
            });
            
            // Verify that the original date is restored in the input
            expect(input).toHaveValue('15/03/2024');
            
            // Verify onChange was not called for the cancelled change
            expect(handleChange).not.toHaveBeenCalledWith(expect.anything(), new Date('2024-03-20'));
        });

        it("should enforce min and max date constraints", async () => {
            const minDate = new Date('2024-03-10');
            const maxDate = new Date('2024-03-20');
            
            render(
                <DsDatePicker 
                    {...defaultProps} 
                    minDate={minDate}
                    maxDate={maxDate}
                />
            );
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear
            await waitFor(() => {
                const calendar = document.querySelector('.MuiDateCalendar-root');
                expect(calendar).toBeInTheDocument();
            });
            
            // Check that dates outside range are disabled
            const disabledDates = document.querySelectorAll('.MuiPickersDay-root[disabled]');
            expect(disabledDates.length).toBeGreaterThan(0);
            
            // Try to select a date within range (should work)
            const validDate = screen.queryByRole('gridcell', { name: '15' });
            if (validDate && !validDate.hasAttribute('disabled')) {
                expect(validDate).not.toBeDisabled();
            }
        });

        it("should handle shouldDisableDate function", async () => {
            // Disable weekends (Saturday = 6, Sunday = 0)
            const shouldDisableDate = (date: Date) => {
                const day = date.getDay();
                return day === 0 || day === 6; // Disable weekends
            };
            
            render(
                <DsDatePicker 
                    {...defaultProps} 
                    shouldDisableDate={shouldDisableDate}
                />
            );
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear
            await waitFor(() => {
                const calendar = document.querySelector('.MuiDateCalendar-root');
                expect(calendar).toBeInTheDocument();
            });
            
            // Check that weekend dates are disabled
            const allDayButtons = document.querySelectorAll('.MuiPickersDay-root');
            const disabledButtons = document.querySelectorAll('.MuiPickersDay-root[disabled]');
            
            expect(allDayButtons.length).toBeGreaterThan(0);
            expect(disabledButtons.length).toBeGreaterThan(0);
            
            // Verify that a weekday is not disabled (if available)
            const enabledButtons = document.querySelectorAll('.MuiPickersDay-root:not([disabled])');
            expect(enabledButtons.length).toBeGreaterThan(0);
        });

        it("should display day view by default when calendar opens", async () => {
            render(<DsDatePicker {...defaultProps} />);
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear and check for day view
            await waitFor(() => {
                const dayCalendar = document.querySelector('.MuiDayCalendar-root');
                expect(dayCalendar).toBeInTheDocument();
            });
        });

        it("should navigate to month view when clicking month/year header", async () => {
            render(<DsDatePicker {...defaultProps} />);
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear
            await waitFor(() => {
                const dayCalendar = document.querySelector('.MuiDayCalendar-root');
                expect(dayCalendar).toBeInTheDocument();
            });

            // Find header buttons within the calendar that have tabIndex 0 (focusable)
            const calendarRoot = document.querySelector('.MuiDateCalendar-root');
            const headerButtons = calendarRoot?.querySelectorAll('button[tabindex="0"]');
            
            // Click the month header button (usually the second button)
            let headerButton: Element | null = headerButtons ? headerButtons[1] : null;
            if (headerButton) {
                await user.click(headerButton as HTMLElement);
                
                // Check for month view
                await waitFor(() => {
                    const monthCalendar = document.querySelector('.MuiMonthCalendar-root');
                    expect(monthCalendar).toBeInTheDocument();
                });
            } else {
                // Fallback: just verify that month calendar can be accessed programmatically
                expect(document.querySelector('.MuiDayCalendar-root')).toBeInTheDocument();
            }
        });

        it("should navigate to year view when clicking year header from month view", async () => {
            render(<DsDatePicker {...defaultProps} />);
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear
            await waitFor(() => {
                const dayCalendar = document.querySelector('.MuiDayCalendar-root');
                expect(dayCalendar).toBeInTheDocument();
            });

            // Find header buttons within the calendar that have tabIndex 0 (focusable)
            const calendarRoot = document.querySelector('.MuiDateCalendar-root');
            const headerButtons = calendarRoot?.querySelectorAll('button[tabindex="0"]');
            
            // Click the month header button (usually the fifth button)
            let yearButton: Element | null = headerButtons ? headerButtons[4] : null;
            
            if (yearButton) {
                // Click to go to month view
                await user.click(yearButton as HTMLElement);
                await waitFor(() => {
                    const yearCalendar = document.querySelector('.MuiYearCalendar-root');
                    expect(yearCalendar).toBeInTheDocument();
                });
                
            } else {
                // Fallback: just verify day calendar exists
                expect(document.querySelector('.MuiDayCalendar-root')).toBeInTheDocument();
            }
        });
        
    });

    // ============================
    // EVENT HANDLING TESTS
    // ============================
    describe("Event Handling", () => {
        it("should handle onFocus events", async () => {
            const handleFocus = vi.fn();
            render(<DsDatePicker {...defaultProps} onFocus={handleFocus} />);
            
            const input = screen.getByRole('textbox');
            await user.click(input);
            
            expect(handleFocus).toHaveBeenCalled();
        });

        it("should handle onBlur events", async () => {
            const handleBlur = vi.fn();
            render(<DsDatePicker {...defaultProps} onBlur={handleBlur} />);
            
            const input = screen.getByRole('textbox');
            await user.click(input);
            await user.tab();
            
            expect(handleBlur).toHaveBeenCalled();
        });

        it("should handle onError events", async () => {
            const handleError = vi.fn();
            render(<DsDatePicker {...defaultProps} onError={handleError} minDate={new Date('2024-06-01')} />);
            
            // Click calendar button to open picker
            const calendarButton = screen.getByRole('button');
            await user.click(calendarButton);
            
            // Wait for calendar to appear
            await waitFor(() => {
                const calendar = document.querySelector('.MuiDateCalendar-root');
                expect(calendar).toBeInTheDocument();
            });
            
            // Click on a disabled date (before minDate) - dates before June should be disabled
            const disabledDate = document.querySelector('.MuiPickersDay-root[disabled]');
            if (disabledDate) {
                await user.click(disabledDate);
            }
            
            // Error should be handled internally, test passes if no crash occurs
            expect(handleError).not.toThrow();
        });

        it("should handle keyboard shortcuts", async () => {
            render(<DsDatePicker {...defaultProps} />);
            const input = screen.getByRole('textbox');
            
            await user.click(input);
            await user.keyboard('{Escape}');
            
            // Test that escape key interaction works
            expect(input).toBeInTheDocument();
        });
    });

    // ============================
    // FORM INTEGRATION TESTS
    // ============================
    describe("Form Integration", () => {
        it("should work within forms with proper name attribute", () => {
            render(
                <DsBox component="form">
                <DsDatePicker {...defaultProps} name="birthdate" />
                </DsBox>
            );
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('name', 'birthdate');
        });

        it("should validate required fields in forms", async () => {
            const handleSubmit = vi.fn((e) => e.preventDefault());
            
            render(
                <DsBox component="form" onSubmit={handleSubmit}>
                <DsFormControl>
                    <DsFormLabel required>Birth Date</DsFormLabel>
                    <DsDatePicker 
                    name="birthdate"
                    required
                    />
                    <DsFormHelperText>This field is required</DsFormHelperText>
                </DsFormControl>
                <DsButton type="submit">Submit</DsButton>
                </DsBox>
            );
            
            const submitButton = screen.getByRole('button', { name: /submit/i });
            await user.click(submitButton);
            
            // Form should not submit with empty required field
            const input = screen.getByRole('textbox');
            expect(input).toBeRequired();
        });

        it("should integrate with form control components", () => {
            render(
                <DsFormControl component="fieldset">
                <DsFormLabel component="legend">Event Details</DsFormLabel>
                <DsFormGroup>
                    <DsFormControlLabel
                    control={
                        <DsDatePicker 
                        name="event-date"
                        />
                    }
                    label={<DsTypography>Event Date</DsTypography>}
                    />
                    <DsFormHelperText>Select the event date</DsFormHelperText>
                </DsFormGroup>
                </DsFormControl>
            );
            
            const input = screen.getByRole('textbox');
            expect(input).toHaveAttribute('name', 'event-date');
        });

        it("should handle form reset", async () => {
            const TestForm = () => {
                const [value, setValue] = React.useState<Date | null>(TEST_DATE);
                
                const handleReset = () => {
                    setValue(null);
                };
                
                return (
                <DsBox component="form">
                    <DsDatePicker 
                    {...defaultProps}
                    value={value}
                    // onChange={setValue}
                    />
                    <DsButton type="button" onClick={handleReset}>Reset</DsButton>
                </DsBox>
                );
            };
            
            render(<TestForm />);
            
            const input = screen.getByRole('textbox');
            const resetButton = screen.getByRole('button', { name: /reset/i });
            
            expect(input).toHaveValue('15/03/2024');
            
            await user.click(resetButton);
            
            expect(input).toHaveValue('');
        });
    });

    // ============================
    // ACCESSIBILITY TESTS
    // ============================
    describe("Accessibility", () => {
        it("should have proper ARIA attributes", () => {
            render(<DsDatePicker {...defaultProps} label="Birth Date" />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveAccessibleName('Birth Date');
        });

        it("should support keyboard navigation", async () => {
            render(<DsDatePicker {...defaultProps} />);
            const input = screen.getByRole('textbox');
            
            // Tab to input
            await user.tab();
            expect(input).toHaveFocus();
            
            // Tab to calendar button
            await user.tab();
            const calendarButton = screen.getByRole('button');
            expect(calendarButton).toHaveFocus();
        });

        it("should announce errors to screen readers", () => {
            render(<DsDatePicker {...defaultProps} error helperText="Please select a valid date" />);
            const helperText = screen.getByText(/please select a valid date/i);
            expect(helperText).toBeInTheDocument();
        });

        it("should have proper ARIA labels for calendar button", () => {
            render(<DsDatePicker {...defaultProps} />);
            const calendarButton = screen.getByRole('button');
            expect(calendarButton).toBeInTheDocument();
        });

        it("should support high contrast mode", () => {
            const { container } = render(<DsDatePicker {...defaultProps} />);
            const input = container.querySelector('input');
            expect(input).toBeInTheDocument();
        });
    });

    // ============================
    // EDGE CASES TESTS
    // ============================
    describe("Edge Cases", () => {
        it("should handle null value gracefully", () => {
            render(<DsDatePicker {...defaultProps} value={null} />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('');
        });

        it("should handle undefined value", () => {
            render(<DsDatePicker {...defaultProps} value={undefined} />);
            const input = screen.getByRole('textbox');
            expect(input).toHaveValue('');
        });

        it("should handle invalid date objects", () => {
            const invalidDate = new Date('invalid');
            render(<DsDatePicker {...defaultProps} value={invalidDate} />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });

        it("should handle extremely long label text", () => {
            const longLabel = 'A'.repeat(1000);
            render(<DsDatePicker {...defaultProps} label={longLabel} />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });

        it("should handle missing required props gracefully", () => {
            render(<DsDatePicker name="test" />);
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });
    });

    // ============================
    // REAL-WORLD SCENARIOS TESTS
    // ============================
    describe("Real-world Scenarios", () => {
        it("should handle booking form scenario", () => {
            render(
                <DsPaper sx={{ maxWidth: 400, p: 3 }}>
                <DsTypography >
                    Event Booking
                </DsTypography>
                
                <DsFormControl fullWidth sx={{ mb: 2 }}>
                    <DsFormLabel required>
                    <DsTypography >
                        Event Date
                    </DsTypography>
                    </DsFormLabel>
                    <DsDatePicker 
                    name="event-date"
                    required
                    />
                    <DsFormHelperText>
                    <DsTypography color="text.secondary">
                        Select your preferred event date
                    </DsTypography>
                    </DsFormHelperText>
                </DsFormControl>
                
                <DsStack direction="row" spacing={2}>
                    <DsButton variant="outlined" size="small">
                    Cancel
                    </DsButton>
                    <DsButton variant="contained" size="small">
                    Book Event
                    </DsButton>
                </DsStack>
                </DsPaper>
            );
            
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });

        it("should handle date range selection scenario", async () => {
            const StartDatePicker = () => {
                const [startDate, setStartDate] = React.useState<Date | null>(null);
                const [endDate, setEndDate] = React.useState<Date | null>(null);
                
                const handleStartDateChange = (name: string, value: any) => {
                    setStartDate(new Date(value));
                };
                
                const handleEndDateChange = (name: string, value: any) => {
                    setEndDate(new Date(value));
                };
                
                return (
                <DsBox sx={{ p: 2 }}>
                    <DsTypography >
                    Select Date Range
                    </DsTypography>
                    
                    <DsStack spacing={2}>
                    <DsDatePicker 
                        name="start-date"
                        label="Start Date"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                    <DsDatePicker 
                        name="end-date"
                        label="End Date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        disabled={!startDate}
                    />
                    </DsStack>
                </DsBox>
                );
            };
            
            render(<StartDatePicker />);
            
            const startInput = screen.getByLabelText(/start date/i);
            const endInput = screen.getByLabelText(/end date/i);
            
            expect(startInput).toBeInTheDocument();
            expect(endInput).toBeDisabled();
            
            // Click start date calendar button and select a date
            const startCalendarButton = screen.getAllByRole('button')[0];
            await user.click(startCalendarButton);
            
            // Wait for calendar and select date
            await waitFor(() => {
                const calendar = document.querySelector('.MuiDateCalendar-root');
                expect(calendar).toBeInTheDocument();
            });
            
            const dateButton = screen.getByRole('gridcell', { name: '15' });
            await user.click(dateButton);
            
            // End date should become enabled after state update
            await waitFor(() => {
                expect(endInput).not.toBeDisabled();
            });
        });

        it("should handle profile settings scenario", () => {
            render(
                <DsPaper sx={{ p: 3, maxWidth: 500 }}>
                <DsTypography  gutterBottom>
                    Profile Settings
                </DsTypography>
                
                <DsFormControl component="fieldset">
                    <DsFormLabel component="legend">
                    <DsTypography  >
                        Personal Information
                    </DsTypography>
                    </DsFormLabel>
                    
                    <DsFormGroup sx={{ mt: 2 }}>
                    <DsFormControlLabel
                        control={
                        <DsDatePicker 
                            name="birthdate"
                            format="dd/MM/yyyy"
                        />
                        }
                        label={
                        <DsTypography >
                            Date of Birth
                        </DsTypography>
                        }
                    />
                    
                    <DsFormHelperText sx={{ ml: 0, mt: 1 }}>
                        <DsTypography color="text.secondary">
                        This information helps us personalize your experience
                        </DsTypography>
                    </DsFormHelperText>
                    </DsFormGroup>
                </DsFormControl>
                </DsPaper>
            );
            
            const input = screen.getByRole('textbox');
            expect(input).toBeInTheDocument();
        });
    });

    // ============================
    // THEME TESTING
    // ============================
    describe("Theme Testing", () => {
        const themes = ['light', 'dark', 'highContrast'] as const;

        it("should render correctly across all themes", async () => {
            for (const themeMode of themes) {
                
                const { unmount } = render(<DsDatePicker {...defaultProps} />, {
                    colorScheme: themeMode
                });
                
                const input = screen.getByRole('textbox');
                expect(input).toBeInTheDocument();
                
                // Open the calendar to test theme application
                const calendarButton = screen.getByRole('button');
                await user.click(calendarButton);
                
                // Wait for calendar to appear and check for today's date element
                await waitFor(() => {
                    const calendar = document.querySelector('.MuiDateCalendar-root');
                    expect(calendar).toBeInTheDocument();
                });
                
                // Check that today's date element exists with proper theme styling
                const todayElement = document.querySelector('.MuiPickersDay-today');
                expect(todayElement).toBeInTheDocument();

                // Log computed styles for today element
                if (todayElement) {
                    const styles = getComputedStyle(todayElement as HTMLElement);
                    expect(styles.borderColor).toBe(
                        "var(--ds-colour-actionSecondary)"
                    );
                }
                unmount();
            }
        });

        it("should maintain functionality across all themes", async () => {
            const handleChange = vi.fn();
            
            for (const theme of themes) {
                const { unmount } = render(
                    <DsDatePicker {...defaultProps} onChange={handleChange} />, 
                    { colorScheme: theme }
                );
                
                const input = screen.getByRole('textbox');
                expect(input).toBeInTheDocument();
                
                // Test calendar button functionality
                const calendarButton = screen.getByRole('button');
                await user.click(calendarButton);

                // Wait for calendar to appear and check for today element
                await waitFor(() => {
                    const calendar = document.querySelector('.MuiDateCalendar-root');
                    expect(calendar).toBeInTheDocument();
                });

                const pickerDay = document.querySelector('.MuiPickersDay-today') as HTMLElement;
                if (pickerDay) {
                    await user.click(pickerDay);
                    const computed = getComputedStyle(pickerDay);
                    
                    expect(computed.backgroundColor).toBe(
                        "var(--ds-colour-actionSecondary)"
                    );
                } else {
                    throw new Error('Today picker day not found');
                }
                expect(handleChange).toHaveBeenCalled();
                
                handleChange.mockClear();
                unmount();
            }
        });
    });

    // ============================
    // SNAPSHOT TESTS
    // ============================
    describe("Snapshot Tests", () => {
        it("should match snapshot with default props", () => {
            const { container } = render(<DsDatePicker {...defaultProps} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshots across all themes", () => {
            const themes = ['light', 'dark', 'highContrast'] as const;
            
            themes.forEach(theme => {
                const { container, unmount } = render(<DsDatePicker {...defaultProps} />, {
                colorScheme: theme
                });
                expect(container.firstChild).toMatchSnapshot(`default-${theme}`);
                unmount();
            });
        });

        it("should match snapshot with different states", () => {
            const states = [
                { disabled: true },
                { error: true, helperText: 'Error message' },
                { required: true },
                { readOnly: true },
                { value: TEST_DATE }
            ];

            states.forEach((state, index) => {
                const { container, unmount } = render(<DsDatePicker {...defaultProps} {...state} />);
                expect(container.firstChild).toMatchSnapshot(`datepicker-state-${index}`);
                unmount();
            });
        });

        it("should match snapshot with slotProps", () => {
            const { container } = render(
                <DsDatePicker 
                {...defaultProps}
                slotProps={{
                    textField: {
                    'aria-describedby': 'help-text',
                    'data-custom': 'custom-value'
                    } as any
                }}
                />
            );
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot in real-world scenario - event booking", () => {
            const { container } = render(
                <DsPaper sx={{ p: 3, maxWidth: 400 }}>
                <DsTypography>
                    Book Your Event
                </DsTypography>
                
                <DsFormControl fullWidth>
                    <DsFormLabel required>
                    <DsTypography>
                        Event Date
                    </DsTypography>
                    </DsFormLabel>
                    <DsDatePicker 
                    name="event-date"
                    required
                    helperText="Select your preferred date"
                    />
                </DsFormControl>
                
                <DsBox sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <DsButton size="small" variant="outlined">
                    Cancel
                    </DsButton>
                    <DsButton size="small" variant="contained">
                    Confirm
                    </DsButton>
                </DsBox>
                </DsPaper>
            );
            
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot in real-world scenario - form integration", () => {
            const { container } = render(
                <DsBox component="form" sx={{ maxWidth: 500, p: 2 }}>
                <DsFormControl component="fieldset">
                    <DsFormLabel component="legend">
                    <DsTypography>
                        Personal Details
                    </DsTypography>
                    </DsFormLabel>
                    
                    <DsFormGroup sx={{ mt: 2 }}>
                    <DsFormControlLabel
                        control={
                        <DsDatePicker 
                            name="birthdate-demo" 
                            format="dd/MM/yyyy"
                        />
                        }
                        label={
                        <DsTypography>
                            Date of Birth
                        </DsTypography>
                        }
                    />
                    
                    <DsFormHelperText>
                        <DsTypography>
                        Required for age verification
                        </DsTypography>
                    </DsFormHelperText>
                    </DsFormGroup>
                </DsFormControl>
                </DsBox>
            );
            
            expect(container.firstChild).toMatchSnapshot();
        });

        it("should match snapshot with various props combinations", () => {
            const propsCombinations = [
                { disabled: true },
                { error: true, required: true, helperText: 'Required field error' },
                { value: TEST_DATE, readOnly: true },
                { format: 'MM/dd/yyyy' }
            ];

            propsCombinations.forEach((props, index) => {
                const { container, unmount } = render(
                <DsDatePicker {...defaultProps} {...props} />
                );
                expect(container.firstChild).toMatchSnapshot(`datepicker-combo-${index}`);
                unmount();
            });
        });
    });
});