# DsDrawer Test Documentation

## Overview
This document describes the comprehensive test suite for the DsDrawer component, which is a design system wrapper around Material-UI's Drawer component with custom styling and theme integration.

## Component Summary
**DsDrawer** is a re-export of Material-UI's Drawer component with the following design system enhancements:
- Custom background: `var(--ds-colour-surfaceBackground)`
- Custom elevation: `var(--ds-elevation--1)`  
- Disabled background image (`backgroundImage: 'none'`)
- Full theme compatibility across light, dark, and high contrast modes

## Test Structure (54 Tests Total)

### 1. Core Rendering (4 tests)
Tests basic component rendering functionality:
- ✅ Renders with minimal required props
- ✅ Handles closed state gracefully without crashes
- ✅ Renders with complex child components
- ✅ Handles missing children props

### 2. Props Validation (7 tests)  
Tests prop handling and Material-UI integration:
- ✅ Default anchor position ('left')
- ✅ All anchor positions ('left', 'right', 'top', 'bottom')
- ✅ Default variant ('temporary')
- ✅ All variants ('temporary', 'permanent', 'persistent')
- ✅ Custom elevation handling
- ✅ PaperProps integration
- ✅ ModalProps for temporary variant

### 3. Component States (5 tests)
Tests different drawer states and behaviors:
- ✅ Shows content when open=true
- ✅ Hides content when open=false  
- ✅ Backdrop visibility control
- ✅ Custom transition durations (object and number)

### 4. MUI Styling (4 tests)
Tests Material-UI class application and design system overrides:
- ✅ Default MUI drawer classes (`MuiDrawer-root`, `MuiDrawer-paper`)
- ✅ Anchor-specific classes (`MuiDrawer-anchorLeft`, etc.)
- ✅ Variant-specific classes (`MuiDrawer-modal`, `MuiDrawer-docked`)
- ✅ Design system overrides (background, elevation, backgroundImage)

### 5. Component Functionality (3 tests)
Tests core drawer functionality:
- ✅ Content rendering when open
- ✅ Complex content structures (typography, lists, buttons)
- ✅ Different drawer sizes via PaperProps

### 6. Event Handling (5 tests)
Tests user interaction and event callbacks:
- ✅ onClose on backdrop click
- ✅ onClose on Escape key press
- ✅ Respects hideBackdrop prop
- ✅ Events on drawer content elements
- ✅ Keyboard navigation within drawer

### 7. Form Integration (2 tests)
Tests drawer integration with forms:
- ✅ Forms inside drawer content
- ✅ Drawer as part of form workflow

### 8. Accessibility (4 tests)
Tests accessibility features and ARIA attributes:
- ✅ Proper ARIA attributes (role, aria-modal)
- ✅ Keyboard navigation support
- ✅ Focus trap for temporary drawers
- ✅ Proper heading structure

### 9. Edge Cases (6 tests)
Tests unusual scenarios and error conditions:
- ✅ Null children gracefully handled
- ✅ Undefined children gracefully handled
- ✅ Very wide content (2000px+ width)
- ✅ Very tall content (5000px+ height)
- ✅ Rapid open/close cycles
- ✅ Missing onClose handler

### 10. Real-world Scenarios (4 tests)
Tests common usage patterns:
- ✅ Navigation drawer with menu items
- ✅ Settings panel with form controls
- ✅ Mobile menu with close button
- ✅ Responsive design with different breakpoints

### 11. Theme Testing (3 tests)
Tests design system theme compatibility:
- ✅ All three color schemes (light, dark, highContrast)
- ✅ Design system overrides consistency across themes
- ✅ Theme-specific color handling and validation
- ✅ CSS variable validation for design system colors

### 12. Snapshot Testing (7 tests)
Tests visual regression protection:
- ✅ Default drawer appearance
- ✅ All anchor positions snapshots
- ✅ All variant snapshots  
- ✅ Closed drawer state
- ✅ Complex navigation drawer
- ✅ Mobile settings drawer
- ✅ All theme variations

## Testing Approach

### Design System Integration
The test suite validates that DsDrawer properly integrates with the design system:
- **CSS Variables**: Tests verify usage of `--ds-colour-surfaceBackground` and `--ds-elevation--1`
- **Theme Compatibility**: All tests run across light, dark, and high contrast themes
- **Typography**: Uses design system typography variants (`headingBoldMedium`, `bodyRegularMedium`)

### Material-UI Compatibility  
Tests ensure full compatibility with Material-UI Drawer API:
- All anchor positions and variants tested
- PaperProps and ModalProps integration
- Focus management and accessibility
- Event handling and callbacks

### Real-world Usage
Test scenarios mirror actual usage patterns:
- Navigation sidebars with menu items
- Settings panels with forms
- Mobile menu overlays
- Responsive drawer implementations

## Coverage Analysis

### What is Tested ✅
- **Component Rendering**: All props, states, and variants
- **Event Handling**: User interactions, keyboard navigation
- **Accessibility**: ARIA attributes, focus management
- **Theme Integration**: All color schemes and design system overrides
- **Edge Cases**: Error conditions, unusual inputs
- **Real-world Patterns**: Navigation, settings, mobile menus
- **Visual Regression**: Comprehensive snapshot coverage

### What is Not Tested ⚠️
- **Animation Timing**: Transition animations not validated in detail
- **Responsive Breakpoints**: Only basic responsive testing, not full breakpoint validation
- **Portal Behavior**: Advanced portal rendering edge cases not covered
- **Performance**: No performance benchmarking or memory leak testing

### Known Limitations
1. **CSS-in-JS Testing**: Some design system styles may not fully resolve in jsdom environment
2. **Animation Testing**: Transition animations are difficult to test comprehensively in jsdom
3. **Focus Trap Edge Cases**: Complex focus management scenarios may vary in test vs. browser environment

## Test Patterns Used

### Theme Testing Pattern
```tsx
const colorSchemes = ['light', 'dark', 'highContrast'] as const;
colorSchemes.forEach(theme => {
  const { container } = render(<DsDrawer open />, { colorScheme: theme });
  // Validate theme-specific behavior
});
```

### Design System Validation
```tsx
// Test design system CSS variables
const computedStyle = window.getComputedStyle(paper);
const backgroundStyle = computedStyle.background;
const isValidBackground = backgroundStyle.includes('var(--ds-colour-surfaceBackground)');
expect(isValidBackground).toBe(true);
```

### Event Testing Pattern
```tsx
const handleClose = vi.fn();
render(<DsDrawer open onClose={handleClose} />);
await user.keyboard('{Escape}');
expect(handleClose).toHaveBeenCalledWith(expect.any(Object), 'escapeKeyDown');
```

## Maintenance Notes

### When to Update Tests
- **New Props Added**: Add corresponding validation tests
- **Design System Changes**: Update CSS variable validation
- **Theme Changes**: Verify theme testing still covers all modes
- **Accessibility Updates**: Add new ARIA attribute tests

### Common Failure Points
- **CSS Variable Resolution**: May fail if design system styles change
- **Focus Management**: Modal focus behavior can be sensitive to DOM structure changes  
- **Theme Integration**: Color scheme tests may need updates if theme system changes

## Integration with CI/CD
These tests are designed to:
- ✅ Run in automated CI environments (jsdom compatible)
- ✅ Generate snapshot artifacts for visual regression detection
- ✅ Validate accessibility compliance
- ✅ Ensure design system consistency across updates

The test suite provides comprehensive coverage of DsDrawer functionality while maintaining fast execution times suitable for development workflows.
