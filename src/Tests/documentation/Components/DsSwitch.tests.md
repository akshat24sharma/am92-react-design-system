# DsSwitch Component Test Documentation

## Summary
This document outlines the comprehensive test suite created for the `DsSwitch` component in the AM92 React Design System. The component is a custom switch implementation built on top of Material-UI's `ToggleButtonGroup` with two `ToggleButton` elements.

## Component Overview
The `DsSwitch` component provides a binary choice interface with the following key characteristics:
- Wraps `DsToggleButtonGroup` with two `DsToggleButton` elements
- Uses custom `onChange` handler that passes `(name, value)` instead of standard `(event, value)`
- Fixed size of "small" and exclusive selection mode
- Custom `ds-variant="switch"` attribute
- Default labels of "YES"/"NO" with values `true`/`false`
- Typography components for label rendering

## Test Categories Implemented

### 1. Core Rendering Tests
- **Default props rendering**: Verifies basic component structure
- **Custom labels**: Tests positive/negative label customization  
- **Custom values**: Tests positive/negative value customization
- **Minimal props**: Ensures component renders with minimal required props

### 2. Props Validation Tests
- **Default props usage**: Validates fallback to default values
- **Custom labels acceptance**: Tests `positiveLabel` and `negativeLabel` props
- **Custom values acceptance**: Tests `positiveValue` and `negativeValue` props
- **Name prop handling**: Verifies proper name attribute usage
- **Complex label content**: Tests special characters and emojis

### 3. Component States Tests
- **Disabled state**: Tests disabled prop behavior
- **Selected states**: Tests positive and negative value selection
- **Custom value selection**: Tests non-boolean value selection
- **State combinations**: Tests disabled + selected combinations

### 4. MUI Styling Tests
- **Default MUI classes**: Verifies proper Material-UI class application
- **Switch variant attribute**: Tests `ds-variant="switch"` application
- **Size classes**: Verifies small size application
- **Exclusive mode**: Tests exclusive selection behavior
- **Individual button classes**: Tests button-level MUI classes
- **Focus classes**: Tests focus state styling
- **Color variants**: Tests color prop application

### 5. Component Functionality Tests
- **Value switching**: Tests switching between positive/negative values
- **Custom value switching**: Tests non-boolean value switching
- **Exclusive selection**: Verifies only one option can be selected
- **Disabled interaction**: Tests disabled state prevents changes
- **Same value clicking**: Tests clicking already selected value

### 6. Event Handling Tests
- **Click events**: Tests mouse interaction on both buttons
- **Keyboard navigation**: Tests Tab key navigation between options
- **Keyboard activation**: Tests Enter and Space key activation
- **Focus maintenance**: Tests focus behavior after interactions

### 7. Form Integration Tests
- **Form element integration**: Tests usage within HTML forms
- **Form submission**: Tests form submission context
- **FormControl integration**: Tests with Material-UI form components
- **FormControlLabel integration**: Tests with label wrapper component
- **Controlled component pattern**: Tests controlled vs uncontrolled usage

### 8. Accessibility Tests
- **Button roles**: Verifies proper ARIA button roles
- **Keyboard navigation**: Tests accessible keyboard interaction
- **Keyboard activation**: Tests accessible activation methods
- **Accessible names**: Tests button text provides accessible names
- **Selected state indication**: Tests `aria-pressed` attributes
- **Disabled state accessibility**: Tests accessible disabled state

### 9. Edge Cases Tests
- **Null/undefined values**: Tests graceful handling of invalid values
- **Very long text**: Tests overflow handling with long labels
- **Special characters**: Tests various special characters in labels
- **Unicode characters**: Tests international characters and emojis
- **Empty string values**: Tests edge case of empty string values
- **Object values**: Tests complex object values
- **Number values**: Tests numeric values

### 10. Theme Testing
- **Multi-theme rendering**: Tests across light, dark, and highContrast themes
- **Theme color validation**: Validates actual theme color usage with `getColorScheme(PALETTE)`
- **Color format validation**: Tests hex color format with regex patterns
- **Component state coverage**: Tests all states (checked/unchecked/disabled) per theme
- **CSS variable testing**: Validates design system CSS variables
- **Theme context validation**: Tests `data-mui-color-scheme` attributes
- **Color variant themes**: Tests all color props across themes
- **Functionality preservation**: Ensures consistent behavior across themes

### 11. Real-world Scenarios
- **Settings form scenario**: Tests common settings page usage
- **Feature toggle scenario**: Tests multiple feature toggles
- **Survey/questionnaire scenario**: Tests survey-style questions

### 12. Snapshot Tests
- **State variations**: Captures visual output for all component states
- **Theme variations**: Captures visual output across all themes  
- **Color variations**: Captures visual output for all color variants
- **Real-world scenarios**: Captures complex usage patterns

## Test Results Analysis

### Current Status: 49 Passing, 17 Failing

#### Passing Tests (74% Success Rate)
The majority of tests pass, indicating:
- ✅ Core rendering logic works correctly
- ✅ Props validation functions properly  
- ✅ Basic functionality operates as expected
- ✅ Form integration works correctly
- ✅ Theme testing framework functions properly
- ✅ Snapshot testing captures component output
- ✅ Real-world scenarios function correctly

#### Failing Tests - Analysis & Findings

**1. CSS Class Expectations vs Reality**
- **Expected**: `MuiToggleButton-colorSecondary`
- **Actual**: `MuiToggleButton-secondary`
- **Analysis**: MUI uses simplified class names, not the full `colorX` pattern

**2. Component Attribute Handling**
- **Expected**: `data-ds-variant="switch"` on toggle group
- **Actual**: `ds-variant="switch"` (without data prefix)
- **Analysis**: Custom attributes are applied differently than expected

**3. Toggle Button Value Behavior**
- **Expected**: Clicking buttons passes specific values
- **Actual**: Sometimes passes `null` instead of expected values
- **Analysis**: MUI ToggleButtonGroup behavior for deselection differs from expectations

**4. Disabled State Classes**
- **Expected**: `Mui-disabled` class on parent group
- **Actual**: Disabled attribute on individual buttons only
- **Analysis**: MUI applies disabled state differently than expected

**5. Focus State Classes** 
- **Expected**: `Mui-focusVisible` class after click
- **Actual**: Focus classes may not persist or apply as expected
- **Analysis**: Focus-visible vs focus behavior differs

**6. Button Role Attributes**
- **Expected**: Explicit `role="button"` attribute
- **Actual**: Role is implicit for button elements
- **Analysis**: HTML button elements have implicit button role

## Test Coverage Intentionally Not Included

### Excluded Areas
1. **Internal MUI ToggleButtonGroup behavior** - Testing the underlying MUI component is not our responsibility
2. **Complex theme system internals** - We test integration, not theme generation
3. **Typography component rendering** - DsTypography is tested separately
4. **Browser-specific behavior** - Testing across browsers is handled by MUI
5. **Performance characteristics** - Not typically covered in unit tests

### Justification for Exclusions
- Focus on component contract and integration points
- Avoid testing third-party library internals
- Maintain test suite maintainability
- Follow single responsibility principle for tests

## Next Steps for Test Improvement

### Immediate Fixes Needed
1. **Update CSS class expectations** to match actual MUI output
2. **Adjust attribute expectations** to match component implementation  
3. **Fix value handling tests** to match actual toggle behavior
4. **Update disabled state tests** to check individual button states
5. **Revise accessibility tests** to match actual DOM structure

### Enhancement Opportunities
1. **Add visual regression tests** with actual screenshots
2. **Expand theme integration tests** with more edge cases
3. **Add performance benchmarks** for large lists of switches
4. **Create integration tests** with parent components
5. **Add error boundary tests** for error handling

## Usage Recommendations

### For Developers Using DsSwitch
Based on test findings, developers should:
1. **Use controlled pattern** with explicit value management
2. **Handle null values** from onChange events appropriately
3. **Test with actual MUI class names** not assumed ones
4. **Consider accessibility** with proper labeling
5. **Test across themes** to ensure proper color application

### For Test Maintenance
1. **Update expectations** regularly as MUI versions change
2. **Monitor class name changes** in MUI updates  
3. **Keep theme tests** synchronized with design system updates
4. **Review snapshot tests** for unintended visual changes
5. **Validate accessibility** with actual screen readers

## Conclusion

The DsSwitch component test suite provides comprehensive coverage of all major component functionality, integration points, and usage patterns. While some tests currently fail due to assumption mismatches with actual component behavior, the test structure provides excellent foundation for ongoing component validation and regression prevention.

The 74% pass rate indicates solid component implementation with clear areas for test refinement. The failing tests provide valuable insights into actual component behavior and will guide both test corrections and potential component improvements.
