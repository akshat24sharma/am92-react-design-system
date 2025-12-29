# DsButtonGroup Component Test Documentation

## Summary

The DsButtonGroup component test suite provides comprehensive coverage for a custom button grouping component that wraps MUI's DsStack to provide consistent spacing, styling, and prop passing functionality. The component acts as a container for multiple button elements with design system integration.

## Component Overview

**Component Type**: Custom wrapper component
**Base Component**: DsStack
**Primary Purpose**: Group buttons with consistent spacing and design system styling
**Test File**: `src/Components/DsButtonGroup/DsButtonGroup.test.tsx`
**Total Tests**: 31 tests across 9 categories

### Key Component Features
- **Child Prop Passing**: Automatically passes `size` and `fullWidth` props to child components
- **Design System Integration**: Uses CSS variables for consistent styling
- **Flexible Container**: Extends DsStackProps with additional button-specific props
- **Child Cloning**: Enhances children with additional props while preserving original props

## Test Categories Implemented

### 1. Core Rendering Tests (3 tests)
- **Default props rendering**: Validates basic component structure and button rendering
- **Mixed child components**: Ensures compatibility with different button types (DsButton, DsIconButton)
- **Null/undefined children**: Graceful handling of invalid children

### 2. Props Validation Tests (5 tests)
- **Default props structure**: Validates `fullWidth: false`, `noPadding: false`, `size: 'medium'`
- **Custom ID acceptance**: Tests ID attribute application through DsStack
- **FullWidth prop propagation**: Verifies prop is passed to child components
- **Size prop propagation**: Tests size prop application to children
- **Custom sx prop acceptance**: Tests style override capabilities

### 3. Component States Tests (2 tests)
- **Disabled children handling**: Tests mixed disabled/enabled button states
- **State combinations**: Complex prop combinations (`fullWidth`, `noPadding`, `size`)

### 4. Event Handling Tests (4 tests)
- **Individual button clicks**: Validates event isolation between buttons
- **Keyboard navigation**: Tests Tab navigation between buttons
- **Keyboard activation**: Enter and Space key support
- **Disabled event prevention**: Ensures disabled buttons don't trigger events

### 5. Form Integration Tests (3 tests)
- **Form context compatibility**: Tests button types (submit, reset, button) within forms
- **Form submission handling**: Validates form submission through button clicks
- **Form validation integration**: Tests integration with required form fields

### 6. Accessibility Tests (4 tests)
- **ARIA structure**: Tests `role="group"` and `aria-label` support
- **Keyboard navigation support**: Comprehensive Tab navigation testing
- **Focus management with disabled buttons**: Proper focus skipping behavior
- **Individual button ARIA labels**: Support for icon buttons with `aria-label`

### 7. Edge Cases Tests (3 tests)
- **Empty children array**: Component behavior with no children
- **Large number of children**: Performance testing with 50+ buttons
- **Mixed valid/invalid children**: Handling of null, undefined, and conditional children

### 8. Real-world Scenarios Tests (3 tests)
- **Dialog action buttons**: Save/Cancel button patterns
- **Toolbar buttons with icons**: Icon button combinations with different variants
- **Full-width mobile layout**: Responsive button grouping

### 9. Snapshot Testing (5 tests)
- **Default state snapshot**: Basic component structure preservation
- **FullWidth configuration**: Layout changes with full-width prop
- **NoPadding configuration**: Styling changes with padding removal
- **Size variants**: Small, medium, and large size configurations
- **Complex real-world usage**: Advanced prop combinations snapshot

**Note**: Theme testing has been intentionally excluded as DsButtonGroup is a container component that delegates styling to its children. Theme testing should be performed on the leaf components (DsButton, DsIconButton) rather than the container.

## Test Coverage Analysis

### What is Tested
✅ **Component Structure**: Basic rendering and DOM structure
✅ **Props Interface**: All public props and their effects
✅ **Child Management**: Prop passing and enhancement
✅ **Event Handling**: Click, keyboard, and form events
✅ **Accessibility**: ARIA compliance and keyboard navigation
✅ **Edge Cases**: Null handling, large datasets, unusual prop combinations
✅ **Real-world Patterns**: Common button group usage scenarios

### Intentionally Not Tested
❌ **DsStack Internal Logic**: Relies on DsStack's own test coverage
❌ **Child Component Details**: Individual button behavior tested in respective components
❌ **CSS Variable Implementation**: Design system CSS variable definitions
❌ **MUI Theme Provider**: Theme provider functionality tested at framework level

### Test Quality Indicators
- **Zero test failures**: All 31 tests pass reliably
- **Comprehensive prop coverage**: Tests all component-specific props
- **Real-world scenario validation**: Tests common usage patterns
- **Container component pattern**: Appropriate testing for container components
- **Accessibility compliance**: WCAG-compliant keyboard and ARIA testing

## Known Test Limitations

### React Warnings (Non-blocking)
1. **fullWidth DOM attribute warning**: React warning when DsButtonGroup passes `fullWidth` to DsIconButton (expected MUI behavior)

### Test Pattern Notes
1. **Button queries**: Uses `getAllByRole('button')` with content filtering instead of `getByText()` due to MUI button structure
2. **Theme testing cleanup**: Requires `unmount()` between theme renders to prevent duplicate text elements
3. **ID attribute location**: Tests ID on DsStack root element, not first child
4. **Empty children behavior**: DsStack renders container even with no children (expected behavior)

## Testing Patterns Used

### Component Testing
- **React Testing Library**: DOM-based testing with user interaction simulation
- **UserEvent**: Realistic keyboard and mouse interaction testing
- **Theme Testing**: Multi-theme validation with design system integration
- **Snapshot Testing**: Visual regression protection across configurations

### Query Strategies
- **Role-based queries**: `getAllByRole('button')` for button identification
- **Content filtering**: Array filtering for specific button identification
- **Attribute validation**: Direct attribute checking for form integration
- **Theme context validation**: `data-mui-color-scheme` attribute checking

### Event Testing
- **Mock functions**: Vitest mocking for event handler validation
- **User simulation**: Realistic user interaction patterns
- **Keyboard testing**: Tab navigation and activation key testing
- **Form integration**: Submit, reset, and validation testing

## Dependencies for Testing

### Required Components
- **DsButton**: Primary child component for most tests
- **DsIconButton**: Icon button testing scenarios
- **DsBox**: Theme testing wrapper component

### Testing Utilities
- **testUtils**: Design system theme-aware render utilities
- **userEvent**: User interaction simulation
- **getColorScheme**: Theme color validation utilities
- **PALETTE**: Design system color constants

## Test Execution

```bash
# Run DsButtonGroup tests only
npm test src/Components/DsButtonGroup/DsButtonGroup.test.tsx

# Run with coverage
npm test src/Components/DsButtonGroup/DsButtonGroup.test.tsx --coverage

# Run in watch mode
npm test src/Components/DsButtonGroup/DsButtonGroup.test.tsx --watch
```

## Future Test Considerations

### Potential Test Additions
1. **Performance testing**: Large button group rendering performance
2. **Animation testing**: Focus and hover state transitions
3. **Touch interaction**: Mobile touch event handling
4. **Responsive behavior**: Breakpoint-specific layout testing

### Maintenance Considerations
1. **DsStack updates**: Monitor DsStack changes that might affect prop passing
2. **Theme system changes**: Update color validation when CSS variables change
3. **Accessibility requirements**: Add new ARIA tests for updated WCAG guidelines
4. **Child component updates**: Verify compatibility when DsButton/DsIconButton change

## Related Components

- **DsStack**: Base component providing layout functionality
- **DsButton**: Primary child component for button functionality
- **DsIconButton**: Icon-specific button child component
- **DsBox**: Theme testing and layout wrapper component

---

*Test suite follows AM92 React Design System testing guidelines with 9 comprehensive categories ensuring component reliability, accessibility, and design system integration, with appropriate testing patterns for container components.*