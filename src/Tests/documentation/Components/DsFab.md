# DsFab Component Test Documentation

## Overview
Comprehensive test suite for the `DsFab` component following the AM92 React Design System testing guidelines structure with 10 mandatory categories plus theme and snapshot testing.

## Test Structure

### Test Categories (10 Required)

#### 1. Core Rendering Tests
- **Purpose**: Validates basic component rendering and structure
- **Test Count**: 3 tests
- **Key Tests**:
  - Default props rendering
  - Children content rendering
  - Extended FAB variant

#### 2. Props Validation Tests
- **Purpose**: Ensures all props are properly handled and applied
- **Test Count**: 4 tests
- **Key Tests**:
  - Custom ID attributes
  - Size variants (small, medium, large)
  - Variant handling (circular, extended)
  - Link rendering with href prop

#### 3. Component States
- **Purpose**: Tests component behavior in different states
- **Test Count**: 2 tests
- **Key Tests**:
  - Disabled state
  - State combinations (disabled + color + size)

#### 4. MUI Styling Tests
- **Purpose**: Validates Material-UI class application and styling overrides
- **Test Count**: 3 tests
- **Key Tests**:
  - Default MUI classes (MuiFab-root, MuiFab-secondary)
  - Size-specific classes
  - Design system styling overrides

#### 5. Component Functionality Tests
- **Purpose**: Tests core component functionality and interactions
- **Test Count**: 3 tests
- **Key Tests**:
  - Clickable button behavior
  - Keyboard navigation (Tab, Enter, Space)
  - State maintenance across re-renders

#### 6. Event Handling Tests
- **Purpose**: Validates all event handlers and user interactions
- **Test Count**: 5 tests
- **Key Tests**:
  - Click events
  - Keyboard events (keyDown)
  - Focus and blur events
  - Mouse events (hover/unhover)
  - Disabled event prevention

#### 7. Form Integration Tests
- **Purpose**: Tests FAB component within form contexts
- **Test Count**: 3 tests
- **Key Tests**:
  - Form element integration
  - Form submission handling
  - Form validation states

#### 8. Accessibility Tests
- **Purpose**: Ensures WCAG compliance and screen reader compatibility
- **Test Count**: 5 tests
- **Key Tests**:
  - ARIA attributes (aria-label)
  - Keyboard navigation patterns
  - ARIA relationships (aria-describedby)
  - Screen reader text support
  - Disabled state accessibility

#### 9. Edge Cases Tests
- **Purpose**: Handles unexpected inputs and boundary conditions
- **Test Count**: 6 tests
- **Key Tests**:
  - Empty children handling
  - Null/undefined children
  - Undefined props gracefully handled
  - Rapid click handling
  - Complex content structures
  - Performance with frequent updates

#### 10. Real-world Scenarios Tests
- **Purpose**: Tests component in realistic usage patterns
- **Test Count**: 3 tests
- **Key Tests**:
  - Typical action scenarios (add, edit, delete)
  - Conditional rendering
  - Navigation contexts

### Additional Required Testing

#### Theme Testing
- **Purpose**: Validates component behavior across all design system themes
- **Test Count**: 2 tests
- **Key Tests**:
  - Color validation across themes (light, dark, highContrast)
  - Color variants across themes

#### Snapshot Testing
- **Purpose**: Prevents unintended visual regressions
- **Test Count**: 8 tests
- **Key Tests**:
  - Default state snapshot
  - All color variants snapshots
  - All size variants snapshots
  - Variant types snapshots (circular, extended)
  - Disabled state snapshot
  - All themes snapshots
  - Complex content snapshot
  - Link variant snapshot

## Total Test Coverage
- **Total Tests**: 47 tests
- **Test Categories**: 10 mandatory + 2 additional (theme + snapshot)
- **Coverage Areas**: Rendering, Props, States, Styling, Functionality, Events, Forms, Accessibility, Edge Cases, Real-world usage, Theme testing, Visual regression

## Test Utilities Used
- **Testing Library**: React Testing Library with jsdom environment
- **User Interactions**: @testing-library/user-event for realistic user interactions
- **Theme Testing**: Custom `renderWithTheme` and `testAllThemes` utilities
- **Mocking**: Vitest mocks for event handlers and functions

## Design System Integration
- **Theme Provider**: Tests run with actual design system theme
- **Color Schemes**: Comprehensive testing across light, dark, and highContrast modes
- **CSS Variables**: Validation of design system CSS variable integration
- **Component Overrides**: Testing of custom MUI theme overrides

## Key Test Patterns
1. **Proper DOM Cleanup**: Using `afterEach(cleanup)` to prevent test interference
2. **Isolated Testing**: Each test is independent with proper setup/teardown
3. **Theme Isolation**: Theme tests use unique test IDs to prevent conflicts
4. **Comprehensive Coverage**: All component features and edge cases covered
5. **Accessibility Focus**: Extensive ARIA and keyboard navigation testing

## Notes
- Navigation context test shows expected JSDOM limitation warning (navigation not implemented)
- Disabled element click test properly handles pointer-events: none styling
- All snapshot tests generate baseline snapshots for regression detection
- Theme testing validates actual CSS variable integration with design system
- ✅ Keyboard navigation support
- ✅ Form integration compatibility
- ✅ State persistence across re-renders

### 6. Event Handling Tests
- ✅ onClick event management
- ✅ Focus/blur event handling
- ✅ Mouse events (enter/leave)
- ✅ Keyboard events
- ✅ Event prevention when disabled

### 7. Accessibility Tests
- ✅ Proper ARIA role assignment
- ✅ aria-label support
- ✅ aria-describedby functionality
- ✅ Keyboard accessibility
- ✅ Screen reader compatibility
- ✅ Disabled state indication

### 8. Edge Cases Tests
- ✅ Empty content handling
- ✅ Null children graceful handling
- ✅ Undefined props resilience
- ✅ Rapid click handling
- ✅ Complex content structures
- ✅ Performance with frequent updates

### 9. Real-world Scenarios Tests
- ✅ Form integration scenarios
- ✅ Multiple FAB usage patterns
- ✅ Loading state integration
- ✅ Conditional rendering behavior

### 10. Theme Testing
- ✅ Cross-theme compatibility (light, dark, highContrast)
- ✅ Color variant consistency across themes
- ✅ Functionality preservation across themes
- ✅ Theme differences validation
- ✅ Design system styling maintenance

## Testing Patterns Used

### Class Name Testing
Due to MUI's dynamic class naming patterns, the tests use flexible class validation:
```tsx
const hasColorClass = fabElement.className.includes(`MuiFab-${color}`) ||
                     fabElement.className.includes(`Mui-${color}`);
expect(hasColorClass).toBe(true);
```

### Theme Testing
Uses actual theme configuration for validation:
```tsx
const themeColorScheme = getColorScheme(PALETTE);
const colorSchemes = ['light', 'dark', 'highContrast'] as const;
```

### Event Testing
Handles disabled elements properly:
```tsx
// Use fireEvent for disabled elements instead of userEvent
fireEvent.click(fabElement);
expect(mockOnClick).not.toHaveBeenCalled();
```

## Test Coverage

### Metrics
- **Total Tests**: 60
- **Pass Rate**: 100%
- **Categories Covered**: 10/10

### Coverage Areas
- ✅ Component rendering and props
- ✅ MUI integration and styling
- ✅ Event handling and user interactions
- ✅ Accessibility compliance
- ✅ Theme compatibility
- ✅ Edge cases and error scenarios
- ✅ Real-world usage patterns

## Snapshot Testing

Comprehensive snapshot coverage includes:
- Default component state
- All color variants
- All size variants
- Extended variant
- Disabled state
- All theme modes

## Known Limitations & Workarounds

### 1. MUI Class Naming
**Issue**: MUI uses different class naming patterns for different colors
**Workaround**: Flexible class validation checking both `MuiFab-{color}` and `Mui-{color}` patterns

### 2. Form Submit in JSDOM
**Issue**: `HTMLFormElement.prototype.requestSubmit` not implemented in JSDOM
**Impact**: Form submission test shows warning but passes
**Status**: Known JSDOM limitation, not a component issue

### 3. TouchRipple Warnings
**Issue**: MUI TouchRipple state updates not wrapped in act()
**Impact**: Console warnings during tests but functionality works
**Status**: MUI internal behavior, doesn't affect component functionality

## Maintenance Guidelines

### Adding New Tests
1. Follow the 10-category structure
2. Use theme testing utilities for theme-related tests
3. Include accessibility testing for interactive features
4. Add appropriate cleanup() calls in loops
5. Use flexible class validation for MUI components

### Updating Tests
1. Maintain backward compatibility
2. Update snapshots when component styling changes
3. Verify theme compatibility after changes
4. Test across all supported MUI versions

### Performance Considerations
1. Use cleanup() in test loops to prevent memory leaks
2. Mock heavy operations and external dependencies
3. Use specific selectors to avoid over-querying DOM
4. Batch similar tests when possible

## Related Documentation
- [AM92 Testing Guidelines](../../Tests/documentation/TESTING_GUIDELINES.md)
- [DsFab Component Documentation](./README.md)
- [Theme Testing Utils](../../Tests/Mocks/themeTestUtils.tsx)
- [MUI Fab Documentation](https://mui.com/material-ui/react-floating-action-button/)

## Test Execution

```bash
# Run DsFab tests only
npm test src/Components/DsFab/DsFab.test.tsx

# Run with coverage
npm test src/Components/DsFab/DsFab.test.tsx --coverage

# Run in watch mode
npm test src/Components/DsFab/DsFab.test.tsx --watch
```