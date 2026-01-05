# DsBadge Component Tests

## Overview
Comprehensive test suite for the `DsBadge` component covering all functionality, edge cases, theme compatibility, and design system integration.

## Component Analysis
- **Base Component**: Material-UI Badge wrapper with custom defaults and styling
- **Default Props**: `color="secondary"`, `showZero=true`
- **Custom Styling**: Design system typography, spacing, and border radius variables
- **Total Test Cases**: 59 tests across 12 categories
- **Test File**: `src/Components/DsBadge/DsBadge.test.tsx`

## Test Categories

### 1. Core Rendering (4 tests)
- ✅ Basic rendering with default props
- ✅ Rendering without badge content (invisible badge)
- ✅ Rendering with different child components (icons, buttons)
- ✅ Complex children with nested components

### 2. Props Validation (5 tests)
- ✅ Default props application (`color="secondary"`, `showZero=true`)
- ✅ DsBadgeDefaultProps values verification
- ✅ Custom ID attribute handling
- ✅ Custom className support
- ✅ Custom sx prop integration

### 3. Component States (4 tests)
- ✅ Different color variants (primary, secondary, error, default)
- ✅ Variant types (standard, dot)
- ✅ Anchor origin positioning (all 4 corners)
- ✅ Invisible state handling

### 4. MUI Styling (5 tests)
- ✅ Default MUI class application
- ✅ Variant-specific CSS classes
- ✅ Color-specific CSS classes
- ✅ Position-specific CSS classes
- ✅ Overlap setting CSS classes

### 5. Badge Content (5 tests)
- ✅ Numeric content display
- ✅ String content display
- ✅ Component content (icons, etc.)
- ✅ Large number handling with max prop
- ✅ Large number handling with default max (99+)

### 6. Badge Visibility (5 tests)
- ✅ Zero values shown by default (`showZero=true`)
- ✅ Zero values hidden when `showZero=false`
- ✅ Non-zero values always shown
- ✅ Invisible prop override behavior
- ✅ Undefined/null content handling

### 7. Badge Positioning (3 tests)
- ✅ Default top-right positioning
- ✅ Custom anchor origins (all combinations)
- ✅ Overlap settings (rectangular, circular)

### 8. Theme Testing (3 tests)
- ✅ Cross-theme rendering (light, dark, highContrast)
- ✅ Color variant theme compatibility
- ✅ Functionality preservation across themes

### 9. Accessibility (5 tests)
- ✅ Proper ARIA attributes for screen readers
- ✅ Numeric content readability
- ✅ Text content readability
- ✅ Invisible badge handling for screen readers
- ✅ Keyboard navigation support for child elements

### 10. Edge Cases (7 tests)
- ✅ Null badge content graceful handling
- ✅ Negative number display
- ✅ Very large numbers (default max behavior)
- ✅ Very long text content handling
- ✅ Special character support
- ✅ Unicode character support
- ✅ Missing children graceful handling

### 11. Snapshot Testing (7 tests)
- ✅ Default props snapshot
- ✅ All color variant snapshots
- ✅ Different variant type snapshots
- ✅ Position variation snapshots
- ✅ Cross-theme snapshots
- ✅ Complex content snapshots
- ✅ Max value overflow snapshots

### 12. Real-world Scenarios (6 tests)
- ✅ Notification badge on icon button
- ✅ Shopping cart badge implementation
- ✅ Status indicator with dot variant
- ✅ Navigation menu with multiple badge types
- ✅ Dynamic badge content behavior
- ✅ Form validation indicator usage

## Key Testing Insights

### MUI Badge Behavior Discoveries
1. **Default Max Value**: MUI Badge has a default max value of 99, displaying "99+" for larger numbers
2. **Default Color Class**: The 'default' color variant doesn't apply a specific CSS class
3. **Invisible Badge**: Badges without content are rendered with `MuiBadge-invisible` class
4. **Zero Display**: With `showZero=true` (default), zero values are visible and displayed as "0"

### Theme Testing Implementation
- **Precise Color Validation**: Uses actual theme configuration via `getColorScheme(PALETTE)`
- **Cross-Theme Compatibility**: Tests all 3 color schemes (light, dark, highContrast)
- **Color Class Testing**: Validates MUI color class application for each theme
- **No Hardcoded Colors**: All color expectations derived from theme configuration

### Test Fixes Applied
1. **Badge Content Visibility**: Updated expectations for invisible badges with no content
2. **Color Class Handling**: Handled MUI's lack of `MuiBadge-colorDefault` class
3. **Max Value Behavior**: Adjusted expectations for MUI's default max=99 behavior
4. **Dynamic Content Testing**: Used separate instances instead of rerender to avoid DOM update issues

## Coverage Summary

### What Is Tested
- ✅ **Complete Props API**: All badge properties and their variants
- ✅ **Content Handling**: Numeric, string, and component content types
- ✅ **Visibility Logic**: Show/hide behavior including zero handling
- ✅ **Positioning System**: All anchor origins and overlap settings
- ✅ **Theme Integration**: Full design system theme compatibility
- ✅ **Accessibility Features**: Screen reader support and keyboard navigation
- ✅ **Edge Cases**: Error conditions and boundary scenarios
- ✅ **Real-World Usage**: Common implementation patterns

### What Is Intentionally Not Tested
- **MUI Badge Internal Logic**: We test the interface, not implementation details
- **CSS Variable Values**: We validate structure, not specific pixel values
- **Browser-Specific Rendering**: Test focuses on component behavior
- **Animation/Transition Effects**: Static testing environment limitations

## Known Limitations
1. **Rerender Testing**: Dynamic content updates tested with separate instances due to DOM update timing
2. **CSS Variable Testing**: Validates presence and structure rather than computed values
3. **Theme Color Specifics**: Tests theme application rather than exact color values
4. **Animation States**: Cannot test transition animations in jsdom environment

## Best Practices Demonstrated
- **Semantic Queries**: Prioritizes accessibility-focused element selection
- **Theme-Aware Testing**: Uses actual theme configuration for validation
- **Snapshot Coverage**: Comprehensive visual regression protection
- **Edge Case Handling**: Tests error conditions and boundary scenarios
- **Real-World Scenarios**: Validates common usage patterns and integrations

## Integration Notes
- **Design System Components**: Uses only DS components in tests (DsButton, DsIcon, etc.)
- **Theme Provider Integration**: Automatic theme application through test utilities
- **MUI Pattern Compliance**: Follows Material-UI testing best practices
- **Accessibility Focus**: Emphasizes screen reader and keyboard navigation testing

This test suite provides comprehensive coverage of the DsBadge component while following design system testing guidelines and demonstrating real-world usage patterns.
