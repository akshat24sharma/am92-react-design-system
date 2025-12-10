# DsTooltip Test Coverage

## Test File Location
`src/Components/DsTooltip/DsTooltip.test.tsx`

## Test Cases

### Core Rendering
- Child element rendering with default DsLink wrapper (MuiLink-root CSS class)
- Default wrapper structure validation (rendered as `<a>` element)
- Tooltip content hidden by default (heading and description not visible)
- Component rendering with only heading prop provided
- Component rendering with only description prop provided
- Proper DOM structure with wrapper-child relationship

### Props Validation
- Heading and description display on hover interaction
- Arrow prop support with default `true` value and DOM structure verification
- Placement prop support with default `top` placement and popper attribute validation
- Custom wrapper component via `slots.wrapper` with complete component replacement
- Custom wrapper props via `slotProps.wrapper` including href and data attributes
- Tooltip customization via `slotProps.tooltip` with data-testid propagation
- Touch interaction delays via `enterTouchDelay` and `leaveTouchDelay` props
- Proper prop forwarding and DOM attribute application

### Component States
- Child component disabled state rendering and interaction prevention
- Open state handling with `open={true}` for always-visible tooltips
- State persistence across different interaction modes
- Conditional tooltip visibility based on component state

### MUI Styling
- Default MUI tooltip classes application (MuiTooltip-tooltip)
- Default wrapper (DsLink) styling with MuiLink-root class
- Material-UI component integration and CSS class inheritance
- Popper positioning and arrow styling (MuiTooltip-popperArrow)
- Theme-aware styling across different color schemes

### Event Handling
- Focus event triggering tooltip display via user click simulation
- Mouse hover events on wrapper elements with proper event delegation
- Event handler compatibility with userEvent interactions
- Focus and hover state management for accessibility

### Accessibility
- Proper ARIA attributes with `role="tooltip"` assignment
- Tooltip content accessibility for screen readers
- Keyboard navigation support for focusable elements
- Custom wrapper accessibility with href attributes for link role
- Sequential keyboard navigation through wrapper and child elements
- WCAG compliance for tooltip interactions and focus management

### Edge Cases
- Empty heading and description graceful handling (tooltip renders but content is empty)
- Long content handling (100+ character headings, 500+ character descriptions)
- Null/undefined children graceful rendering without crashes
- Special characters and Unicode support in tooltip content
- Boundary condition testing for extreme content lengths
- Component resilience with invalid or missing props

### Real-world Scenarios
#### Form Integration
- Help text functionality in form contexts with DsFormControl integration
- Username requirements tooltip with complex content structure
- Form field assistance and validation message display

#### Icon Integration  
- DsRemixIcon component integration as tooltip children
- Icon-based tooltip triggers with proper class application
- Custom icon styling and interaction behavior

#### Navigation Integration
- Multiple tooltip elements in navigation contexts
- Custom wrapper with href attributes for accessible link behavior
- Navigation menu item tooltips with proper link roles

#### Data Table Context
- Status indicator tooltips in tabular data
- Action button tooltips for user guidance
- Complex table layouts with multiple tooltip interactions

#### Grouped Elements
- Multiple element wrapping with custom DsBox wrapper
- Complex DOM structures within tooltip containers
- Layout component integration (DsBox, DsStack, DsTypography)

### Theme Testing
- **Comprehensive cross-theme compatibility** testing for light, dark, and highContrast modes
- Theme-specific tooltip rendering and content display validation  
- Wrapper styling consistency across all theme modes
- Theme data attribute verification (`data-mui-color-scheme`)
- Design system color scheme integration with `testAllThemes` utility
- MUI theme provider compatibility and CSS variable support
- Performance optimized theme testing with consolidated test methods

### Snapshot Testing
#### Default Component Snapshots
- Basic component rendering with heading and description
- Heading-only tooltip snapshot for minimal content scenarios
- Description-only tooltip snapshot for alternative content patterns

#### Custom Component Snapshots
- Custom wrapper slot integration with DsBox replacement
- Different placement variations (top, bottom, left, right)
- Theme-specific snapshots across all supported color schemes

#### Content Variation Snapshots
- Long content handling with extensive text content
- Real-world scenario snapshots with complex form integration
- Edge case snapshots with special characters and Unicode content

## Props Validation

- **`heading`** (`ReactNode`) - Primary tooltip heading content
- **`description`** (`ReactNode`) - Secondary tooltip description content  
- **`arrow`** (`boolean`) - Tooltip arrow display control (default: true)
- **`placement`** (`PopperPlacementType`) - Tooltip positioning (default: 'top')
- **`open`** (`boolean`) - Controlled tooltip visibility state
- **`enterTouchDelay`** (`number`) - Touch interaction delay for showing tooltip
- **`leaveTouchDelay`** (`number`) - Touch interaction delay for hiding tooltip
- **`slots`** (`object`) - Custom component slots for wrapper replacement
- **`slotProps`** (`object`) - Props for custom slots including wrapper and tooltip customization
- **`data-testid`** (`string`) - Testing identifier for component selection
- **Custom attributes** - Support for additional HTML attributes and props

## Integration Testing

- **DsLink Wrapper Integration** - Default wrapper component with Material-UI Link styling
- **DsBox Layout Integration** - Custom wrapper slots with design system layout components
- **DsTypography Integration** - Text content rendering with typography system
- **DsRemixIcon Integration** - Icon component support as tooltip triggers
- **Form Component Integration** - DsFormControl, DsButton integration for form tooltips
- **Theme System Integration** - Complete design system theme compatibility
- **Material-UI Integration** - MUI Tooltip, Popper, and styling system integration

