# DsRadioGroup Test Coverage

## Test File Location
`src/Components/DsRadioGroup/DsRadioGroup.test.tsx`

## Component Overview
DsRadioGroup is a lightweight MUI RadioGroup wrapper with design system spacing integration. It focuses specifically on custom spacing styles via the sx prop while maintaining full MUI RadioGroup functionality.

## Test Cases (14 Tests - Focused on Design System Extensions)

### Core Rendering (2 tests)
- MUI RadioGroup rendering with design system styling classes
- Edge case: rendering without theme context

### Design System Styling (6 tests)
- Custom sx prop application while preserving design system spacing
- Complex sx merging with custom child selectors and design system styles
- Design system spacing between radio items via CSS selector `'> *:nth-last-child(n+2)'`
- Empty sx prop handling
- Undefined sx prop handling  
- sx prop merging order verification (custom sx can override design system)

### Snapshot Testing (6 tests)
- Default props rendering
- Selected value state snapshots
- Row layout visual regression protection
- Custom styling variations snapshots
- Cross-theme snapshot consistency
- Name prop integration snapshots

## Design System Customizations Tested

### Custom Spacing Implementation
- **CSS Selector**: `'> *:nth-last-child(n+2)'` targets all but last child
- **Spacing Variable**: `marginBottom: 'var(--ds-spacing-glacial)'`
- **MUI Integration**: Spreads after design system styles for proper override capability

### sx Prop Merging
- **Custom styles**: Applied while preserving design system spacing
- **Child selectors**: Custom `'> *'` selectors work alongside design system selectors
- **Override capability**: Custom sx can override design system styles when needed
- **Edge cases**: Handles empty `{}` and `undefined` sx props gracefully

## Coverage Report

The DsRadioGroup test suite provides **focused coverage with 14 tests** across **3 categories**, specifically targeting design system extensions rather than comprehensive MUI RadioGroup testing.

### Testing Strategy
- **Design System Focus**: Tests only the custom spacing and sx prop merging functionality
- **Helper Functions**: Optimized with reusable helper functions to reduce code duplication
- **Efficient Coverage**: Streamlined to focus on component-specific customizations
- **Simple Wrapper Approach**: No theme testing needed for components using only CSS variables

## Technical Implementation

### Architecture
- Lightweight wrapper around MUI RadioGroup with only custom spacing via sx prop
- Design system spacing: `'> *:nth-last-child(n+2)': { marginBottom: 'var(--ds-spacing-glacial)' }`
- sx prop merging: `...props.sx` spreads after design system styles

### Testing Approach
- **Focused Testing**: Only tests design system customizations, not full MUI RadioGroup functionality
- **Helper Functions**: 4 reusable helpers eliminate code duplication
- **DOM Structure Validation**: Ensures CSS selectors have correct elements to target
- **Computed Style Testing**: Verifies CSS variable application and spacing logic
- **No Theme Testing**: Simple wrappers using only CSS variables don't need cross-theme testing

### Coverage Scope
- **Tested**: Design system spacing, sx prop merging, visual regression
- **Not Tested**: MUI RadioGroup internals (form validation, event handling, accessibility), theme testing (not needed for simple wrappers using CSS variables)

## Helper Functions (Code Optimization)

### Testing Utilities
- **`getRadioGroup(container)`**: Single DOM query for MUI RadioGroup element
- **`getRadioItems(container)`**: Reusable selection of radio form control labels
- **`verifyDesignSystemSpacing(radioItems)`**: Centralized spacing validation logic
- **`renderRadioGroupWithItems(sx?, itemCount?)`**: Parameterized component rendering

### Optimization Results
- **58% reduction** in code lines (from 206 to 86 lines)
- **DRY principle** applied to eliminate repetitive DOM queries and validation logic
- **Maintainable**: Changes to spacing logic only need one update in helper function

## Test Environment Considerations

### CSS Testing Limitations
- CSS variables (`var(--ds-spacing-glacial)`) resolved at runtime by browser, not fully testable in jsdom
- CSS selectors (`'> *:nth-last-child(n+2)'`) applied by browser CSS engine
- Tests verify DOM structure supports CSS rather than testing actual CSS application

### Approach
- **DOM Structure Validation**: Ensures elements exist for CSS selectors to target
- **Computed Style Testing**: Verifies spacing logic through `window.getComputedStyle()`
- **sx Prop Merging**: Tests that custom styles are applied via `toHaveStyle()`

## Quick Reference

**Test Command**: `npm test -- DsRadioGroup.test.tsx`

**Total Coverage**: 14 focused tests across 3 categories

**Key Features**: Design system spacing, sx prop merging, visual regression testing

**Component Type**: Simple MUI wrapper with only spacing customization

---
*Last updated: December 22, 2025*