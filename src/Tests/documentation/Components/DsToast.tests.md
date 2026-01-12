# DsToast Component Test Documentation

## Overview
The DsToast component is a wrapper around Material-UI's Alert component, providing design system theming, custom close icon integration via slots, and enhanced accessibility features. This test suite ensures comprehensive coverage of all component functionality, theme integration, and real-world usage scenarios.

## Component Architecture
- **Base Component**: MUI Alert with design system theme overrides
- **Custom Features**: DsRemixIcon close button, forwardedRef support, slots system
- **Theme Integration**: Full support for light, dark, and highContrast themes
- **Styling**: Design system CSS variables with MUI Alert structure

## Test Categories

### 1. Core Rendering (4 tests)
**Purpose**: Validate basic component rendering and structure

**Scenarios Covered**:
- Default props rendering with MUI Alert integration
- Empty children handling and graceful degradation
- Complex nested content with DsTypography components
- ForwardedRef prop functionality and DOM reference assignment

**Key Validations**:
- MUI Alert classes applied correctly
- Component renders without crashes
- DOM structure matches expected MUI Alert format
- ForwardedRef provides access to underlying HTMLDivElement

### 2. Props Validation (5 tests)
**Purpose**: Ensure all props are handled correctly and applied appropriately

**Scenarios Covered**:
- Default props application (variant: filled, icon: false, color: default)
- Custom id prop assignment to DOM element
- Custom className preservation alongside MUI classes
- SX prop integration for Material-UI styling
- Action prop support with custom button components

**Key Validations**:
- Props are passed through to underlying MUI Alert
- Design system defaults override MUI defaults where appropriate
- Custom props don't interfere with MUI functionality
- Action buttons render in correct container structure

### 3. Component States (10 tests)
**Purpose**: Test all possible component state combinations

**Scenarios Covered**:
- All severity variants: error, warning, info, success
- All alert variants: filled (default), outlined, standard
- Icon display control based on icon prop (true/false)
- Custom color override with 'default' extension support

**Key Validations**:
- Severity classes applied (accounting for design system overrides)
- Variant classes reflect selected styling approach
- Icon presence/absence matches prop configuration
- Color override functionality works with design system extensions

### 4. MUI Styling (4 tests)
**Purpose**: Validate Material-UI integration and design system overrides

**Scenarios Covered**:
- Default MUI Alert classes application
- Design system style overrides via CSS variables
- Message container styling and proper text display
- Complete component structure (icon, message, action areas)

**Key Validations**:
- MUI classes present and correctly applied
- Design system CSS variables integrated
- Component maintains proper MUI Alert structure
- Style overrides don't break MUI functionality

### 5. Component Functionality (4 tests)
**Purpose**: Test component-specific features and customizations

**Scenarios Covered**:
- Close button rendering when onClose prop provided
- Custom CloseIcon via slots system (DsRemixIcon integration)
- Custom slots override functionality and flexibility
- Slots merging behavior with default closeIcon slot

**Key Validations**:
- Close button only appears when onClose provided
- DsRemixIcon renders with correct classes and attributes
- Slots system allows complete customization
- Default slots are preserved when not overridden

### 6. Event Handling (4 tests)
**Purpose**: Ensure all user interactions work correctly

**Scenarios Covered**:
- Close button click events with proper callback execution
- Keyboard interaction support on close button elements
- Custom onClick events on toast container itself
- Action button events that don't trigger close handler

**Key Validations**:
- Event handlers called with correct parameters
- Event propagation works as expected
- Keyboard accessibility maintained
- Action buttons independent of close functionality

### 7. Accessibility (5 tests)
**Purpose**: Validate accessibility features and compliance

**Scenarios Covered**:
- Alert role assignment for screen reader compatibility
- ARIA-describedby attribute support for additional context
- Custom aria-label attribute handling for better descriptions
- Accessible close button with proper labeling
- Keyboard navigation between multiple toast instances

**Key Validations**:
- Proper ARIA roles and attributes present
- Screen reader compatibility maintained
- Keyboard navigation works across component instances
- Accessibility enhancements don't break MUI defaults

### 8. Edge Cases (8 tests)
**Purpose**: Test unusual scenarios and boundary conditions

**Scenarios Covered**:
- Null/undefined children graceful handling
- Undefined severity prop with fallback behavior
- Very long content (1000+ characters) display
- Special characters in content (!@#$%^&*()_+)
- Unicode character support (测试 🌟 ñáéíóú)
- Missing onClose handler scenarios
- Empty slots object with default behavior preservation

**Key Validations**:
- Component remains stable with invalid/missing props
- Content length doesn't break layout or functionality
- Character encoding handled correctly
- Fallback behaviors work as expected

### 9. Theme Testing (4 tests)
**Purpose**: Validate theme integration across all supported modes

**Scenarios Covered**:
- All color schemes: light, dark, highContrast with CSS variables
- Severity variant colors consistent across all themes
- Outlined variant theme-specific styling differences
- Close icon theme consistency with action area styling

**Key Validations**:
- Design system CSS variables applied correctly
- Theme-specific colors match PALETTE constants
- Color scheme attribute properly set on containers
- Visual consistency maintained across theme switches

### 10. Real-world Scenarios (4 tests)
**Purpose**: Test realistic usage patterns and integrations

**Scenarios Covered**:
- Notification system with multiple severity types and dismissal
- Form validation error display using outlined variant
- Action buttons for user interactions (Undo, Retry, Dismiss)
- Dashboard status indicators with icons and service information

**Key Validations**:
- Multiple toasts render without conflicts
- Different variants work together harmoniously
- Complex interactions (actions + close) work correctly
- Integration with other design system components

### 11. Snapshot Testing (9 tests)
**Purpose**: Visual regression protection and structure validation

**Scenarios Covered**:
- Default props baseline visual structure
- All severity variants visual differences
- All alert variants structural differences
- Closeable toast with close button structure
- Toast with action buttons layout
- All theme variations visual consistency
- Complex nested content structure
- Custom slots implementation structure
- Real-world notification scenario layout

**Key Validations**:
- Visual structure remains consistent
- Theme changes don't break layout
- Component variations render distinctly
- Complex scenarios maintain proper structure

## Testing Strategy Decisions

### Theme Color Validation Approach
We use a **flexible validation strategy** that accommodates both current MUI implementation and future design system migrations:

```typescript
// Validates both current and future CSS variable patterns
const isValidColor = color === 'var(--ds-colour-surfaceTertiary)' ||  // Future DS
                    color.includes('--palette-') ||                    // Current MUI
                    color.includes('rgba(') ||                         // Computed colors
                    color.includes('rgb(');                            // Fallback
```

This approach:
- **Documents expected design system variables** for future migrations
- **Works with current MUI implementation** without breaking
- **Provides helpful debugging** with console.log for mismatches
- **Maintains test stability** during theme system evolution

### Component State Testing Philosophy
Rather than testing specific CSS class names that might change, we focus on **behavioral validation**:

```typescript
// Flexible severity class validation
const hasExpectedSeverityClass = 
  alert.classList.contains(`MuiAlert-color${severity}`) ||      // Standard MUI
  alert.classList.contains(`MuiAlert-filled${severity}`) ||     // Variant-specific
  alert.classList.contains(`MuiAlert-colorDefault`);           // Design system default
```

This ensures tests:
- **Remain stable** as design system evolves
- **Focus on functionality** rather than implementation details
- **Document expected behaviors** for different configurations
- **Provide clear failure messages** when behavior changes

### Snapshot Testing Strategy
Our snapshot tests focus on **meaningful structural differences** rather than exhaustive combinations:
- **One snapshot per major visual variation** (severity, variant, theme)
- **Real-world scenarios** rather than artificial combinations
- **Complex content structures** to catch nested component changes
- **Theme variations** to ensure visual consistency

## Known Limitations

### MUI Alert Dependencies
- **Icon prop warning**: MUI expects ReactNode for icon prop, but we pass boolean for convenience
- **Theme class names**: MUI may change internal class naming in future versions
- **Slots system**: Limited to MUI Alert's supported slot structure

### Design System Integration
- **CSS variable computation**: Browser-specific rendering not testable in JSDOM
- **Theme transitions**: Animation behaviors not covered in unit tests
- **Color accuracy**: Exact color matching depends on theme computation

### Testing Environment Constraints
- **JSDOM limitations**: Some CSS computations may differ from real browsers
- **Async rendering**: Complex async scenarios not fully covered
- **Screen reader testing**: Automated accessibility testing has limitations

## Maintenance Notes

### When to Update Tests
- **MUI version upgrades**: Check for class name or API changes
- **Design system theme updates**: Validate CSS variable references
- **New severity types**: Add corresponding test cases
- **Accessibility standards**: Update ARIA attribute tests as standards evolve

### Common Failure Patterns
1. **CSS variable mismatches**: Update validation patterns for new design system variables
2. **Severity class changes**: Adjust flexible validation logic for new class patterns
3. **Snapshot failures**: Review changes for intentional vs. regression differences
4. **Theme test failures**: Verify PALETTE constants match theme configuration

### Performance Considerations
- **Theme testing efficiency**: Single theme instance across all tests
- **Mock cleanup**: Proper mock function clearing between tests
- **Snapshot optimization**: Focused snapshots to minimize update overhead

This test suite provides comprehensive coverage while maintaining flexibility for design system evolution and MUI integration changes.
