# DsIconButton Test Documentation

## Overview
Comprehensive test suite for the DsIconButton component, focusing on the custom CSS overrides and design system integration since the component is a direct export of MUI's IconButton.

## Component Details
- **Component**: `DsIconButton`
- **Base Component**: Material-UI `IconButton`
- **Test File**: `src/Components/DsIconButton/DsIconButton.test.tsx`
- **Total Tests**: 66
- **Status**: ✅ All Passing
- **Last Updated**: December 1, 2025

## Testing Strategy

Since `DsIconButton` is a direct export of MUI's `IconButton`, functional testing is already covered by MUI's comprehensive test suite. Our testing focuses specifically on:

1. **Custom CSS Overrides** - Verifying design system styling integration
2. **Color Variants** - Testing custom color scheme implementation  
3. **Font Size Variants** - Testing typography scale integration
4. **Cross-Theme Testing** - Verifying behavior across light, dark, and highContrast themes  
5. **Accessibility Compliance** - Verifying WCAG compliance is maintained

## Test Categories

### 1. Core Rendering (4 tests)
**Purpose**: Verify basic component rendering functionality

- ✅ `should render with default props`
- ✅ `should render with children` 
- ✅ `should render without children`
- ✅ `should render with design system icons`

**Coverage**: Basic rendering scenarios and icon integration.

### 2. Props Validation (5 tests)
**Purpose**: Test prop handling and default behaviors

- ✅ `should accept and apply custom id`
- ✅ `should apply custom className`
- ✅ `should use default color when color prop is not provided`
- ✅ `should apply aria-label when provided`
- ✅ `should apply title attribute when provided`

**Coverage**: Standard HTML attributes and default prop behavior.

### 3. Component States (5 tests)
**Purpose**: Test different component states and their effects

- ✅ `should render in disabled state`
- ✅ `should apply disabled styling classes`
- ✅ `should handle focus state`
- ✅ `should handle different sizes`
- ✅ `should handle edge prop correctly`

**Coverage**: State management and MUI prop integration.

### 4. MUI Styling (25 tests)
**Purpose**: Verify Material-UI integration and custom styling

#### Custom Color Variants (10 tests)
Tests for all design system color variants:
- `iconSupportNegative`, `iconSupportPositive`, `iconSupportWarning`
- `iconActionPrimary`, `iconActionSecondary`, `iconActionTertiary`  
- `iconOnSurface`, `iconDisabled`, `iconDefault`, `iconTypical`

#### Custom Font Size Variants (14 tests)
Tests for all typography scale variants:
- `scorched`, `torrid`, `blazzing`, `hot`, `tropical`, `warm`, `mild`
- `cool`, `cold`, `bitterCold`, `frigid`, `frostbite`, `blizzard`, `iceAge`

#### Standard MUI Classes (1 test)
- ✅ `should apply standard MUI color variants`

**Coverage**: Complete design system color and typography integration.

### 5. Event Handling (6 tests)
**Purpose**: Test user interactions and event callbacks

- ✅ `should handle click events`
- ✅ `should not trigger click when disabled`
- ✅ `should handle keyboard events`
- ✅ `should handle focus events`
- ✅ `should handle blur events`
- ✅ `should handle mouse events`

**Coverage**: Comprehensive interaction testing including disabled state handling.

### 6. Accessibility (7 tests)
**Purpose**: Verify WCAG compliance and keyboard navigation

- ✅ `should have proper role`
- ✅ `should be keyboard navigable`
- ✅ `should support Enter key activation`
- ✅ `should support Space key activation`
- ✅ `should have accessible name when aria-label is provided`
- ✅ `should be properly excluded from tab order when disabled`
- ✅ `should support ARIA describedby`

**Coverage**: Complete accessibility testing for interactive elements.

### 7. Edge Cases (6 tests)
**Purpose**: Test unusual but valid usage patterns

- ✅ `should handle ref forwarding`
- ✅ `should handle custom sx prop`
- ✅ `should handle multiple CSS classes`
- ✅ `should handle complex children`
- ✅ `should render without errors when color is an empty string`

**Coverage**: Error resilience and advanced usage scenarios.

### 8. CSS Overrides (3 tests)
**Purpose**: Test design system CSS integration

- ✅ `should apply design system root styles`
- ✅ `should apply color-specific CSS custom properties`
- ✅ `should apply font size CSS custom properties`

**Coverage**: Custom CSS override functionality and design token integration.

## Scenarios Covered

### Typical Usage Scenarios
1. **Basic Icon Button**: Simple icon button with default styling
2. **Colored Icon Button**: Using design system color variants
3. **Sized Icon Button**: Using design system typography scales
4. **Interactive Icon Button**: With click handlers and event callbacks
5. **Accessible Icon Button**: With proper ARIA labels and descriptions
6. **Disabled Icon Button**: Non-interactive state testing

### Advanced Usage Scenarios  
1. **Custom Styled Button**: With sx prop and custom classes
2. **Complex Children**: Nested elements and multiple icons
3. **Ref Forwarding**: Direct DOM access scenarios
4. **Edge Props**: Invalid or edge-case prop combinations

### Integration Scenarios
1. **Theme Integration**: Design system theme application
2. **Color System**: Custom color variant usage
3. **Typography System**: Font size variant application
4. **CSS Override System**: Custom property application

## Known Limitations

### Test Environment Limitations
1. **CSS Custom Properties**: Test environment may not fully evaluate CSS variables
2. **Focus-Visible**: Browser focus-visible behavior may differ in tests
3. **Visual Appearance**: No visual regression testing for actual appearance

### Intentionally Not Tested
1. **MUI Core Functionality**: Already covered by MUI's test suite
2. **Visual Design**: Appearance and styling output
3. **Performance**: Render performance and optimization
4. **Cross-browser**: Browser-specific behaviors

### Component Limitations
1. **Font Size Classes**: CSS classes may not generate MUI variant classes in test environment
2. **Theme CSS Variables**: Actual values depend on theme provider setup
3. **Ripple Effects**: TouchRipple animations may behave differently in tests

## Test Maintenance

### Regular Maintenance Tasks
- **Monthly**: Review test reliability and performance
- **Quarterly**: Update tests for new design system features
- **Per Release**: Ensure all tests pass and coverage is maintained

### Update Triggers
- Design system color palette changes
- Typography scale modifications  
- New CSS override additions
- MUI IconButton API changes
- Accessibility requirement updates

### Quality Checks
- All 61 tests must pass
- No test warnings or errors
- Coverage includes all public API surface
- Accessibility tests cover WCAG requirements

## Future Enhancements

### Potential Test Additions
1. **Theme Switching**: Test behavior across different themes
2. **RTL Support**: Right-to-left layout testing
3. **High Contrast**: High contrast mode testing
4. **Mobile Interactions**: Touch-specific interaction testing

### Test Infrastructure Improvements
1. **Visual Testing**: Add screenshot comparison tests
2. **Performance Testing**: Add render performance benchmarks
3. **Cross-browser**: Add browser compatibility testing
4. **Real DOM**: Add tests with real DOM instead of JSDOM

---

**Summary**: The DsIconButton test suite provides comprehensive coverage of the component's integration with the AM92 design system, focusing on areas not covered by MUI's base tests. All 61 tests pass consistently, providing confidence in the component's reliability and design system compliance.

*Last updated: December 1, 2025*
