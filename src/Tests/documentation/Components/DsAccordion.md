# DsAccordion Test Coverage

## Test File Location
`src/Components/DsAccordion/DsAccordion.test.tsx`

## Test Cases

### Core Rendering
- Basic component rendering with default props
- Header text and React element rendering
- Summary text and React element rendering  
- Handling when summary prop is not provided
- Default and custom expand icon rendering

### Props Validation
- AccordionProps acceptance and application
- HeaderProps passing to DsAccordionSummary
- SummaryProps passing to DsAccordionDetails
- Empty header and summary handling

### Component States
- Default collapsed state
- Expanded state when `expanded=true`
- Disabled state functionality
- Controlled and uncontrolled component behavior

### MUI Styling
- Default MUI Accordion classes application
- AccordionSummary and AccordionDetails classes
- Disabled and expanded state classes
- Custom elevation handling
- Gutters disable functionality

### Component Functionality
- Expand/collapse on click interactions
- Summary content visibility management
- Disabled state preventing expansion

### Event Handling
- `onChange` event handling
- Keyboard navigation (Enter and Space keys)
- Focus and blur event handling

### Accessibility
- Proper ARIA attributes (`aria-expanded`, `aria-disabled`)
- Role attributes and accessibility structure
- Accessible name from header content
- Keyboard navigation support between multiple accordions

### Edge Cases
- Null header and summary graceful handling
- Very long text content (1000+ characters)
- Special characters and Unicode support
- Rapid expand/collapse actions
- Complex React elements as header and summary

### Real-world Scenarios
- FAQ implementation with multiple accordions
- Settings panel with form controls
- Form integration with input fields
- Controlled accordion groups (single expansion)
- Async content loading scenarios

## Props Coverage

- **`header`** (`string` | `ReactElement`) - Main accordion header content, supports both text and React elements
- **`HeaderProps`** (`DsAccordionSummaryProps`) - Props passed through to the accordion summary component
- **`summary`** (`string` | `ReactElement`) - Collapsible content, supports both text and React elements
- **`SummaryProps`** (`DsAccordionDetailsProps`) - Props passed through to the accordion details component
- **`expandIcon`** (`ReactNode`) - Custom expand/collapse icon, defaults to down arrow
- **`expanded`** (`boolean`) - Controlled expansion state
- **`defaultExpanded`** (`boolean`) - Initial expansion state for uncontrolled usage
- **`disabled`** (`boolean`) - Prevents user interaction when true
- **`onChange`** (`Function`) - Callback fired when expansion state changes
- **`elevation`** (`number`) - Paper elevation level, defaults to -1
- **`disableGutters`** (`boolean`) - Removes internal padding, defaults to true
- **Standard MUI AccordionProps** - All other Material-UI Accordion props supported

## Testing Patterns Established

### DOM Query Strategies
- `document.querySelector('.MuiAccordion-root')` for root component
- `screen.getByRole("button")` for accordion summary/header
- `screen.getByText()` for content verification
- `screen.getByTestId()` for custom test elements

### Accessibility Testing
- ARIA attribute verification (`aria-expanded`, `aria-disabled`)
- Keyboard navigation testing with userEvent
- Role-based element selection
- Focus management validation

### MUI-Specific Patterns
- Class-based queries for Material-UI components
- Handling collapsed content accessibility
- Material-UI theme integration testing
- Elevation and styling prop validation

## Coverage Report
- **Total Tests:** 53
- **Categories:** 10
- **Last Updated:** November 10, 2025
- **Pass Rate:** 100%
