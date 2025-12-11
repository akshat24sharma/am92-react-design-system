# DsInputAdornment Test Coverage

## Test File Location
`src/Components/DsInputAdornment/DsInputAdornment.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with required position prop
- Text content rendering via DsTypography
- Icon content rendering with RemixIcon integration
- Button content with interactive elements
- Complex nested content structures

### Props Validation
- Position prop handling (start/end values)
- Default position behavior
- Variant prop support (standard, outlined, filled)
- MUI InputAdornment prop forwarding
- Custom attributes and data handling
- Accessibility attribute support

### Position Behavior
- Start position margin and class application
- End position styling and positioning
- Dynamic position prop changes
- Re-rendering with position updates

### MUI Styling
- Default MUI InputAdornment classes application
- Design system color variables integration
- Custom sx prop styling support
- Variant-specific class handling
- SVG icon cursor pointer styling

### Content Handling
- Simple text content rendering
- Icon content with accessibility
- Interactive button elements
- Multiple children components
- Null/undefined children graceful handling
- Empty children scenarios

### Input Integration
- DsTextField startAdornment integration
- EndAdornment positioning with TextField
- Dual start and end adornments usage
- Interactive elements within TextField
- Form field enhancement patterns

### Accessibility
- ARIA label attribute support
- ARIA description associations
- Keyboard navigation for interactive content
- Custom role attribute handling
- Screen reader compatibility with TextField

### Edge Cases
- Dynamic position prop updates
- Variant prop changes and transitions
- Complex nested component structures
- Special character and symbol rendering
- Unicode text support
- Very long content handling
- Rapid prop changes performance

### Theme Testing
- Multi-theme consistency (light, dark, high-contrast)
- Theme color scheme attribute handling
- Design system integration across themes

### Real-world Scenarios
- Currency prefix implementation
- Search field with dual icons
- Password visibility toggle functionality
- Measurement fields with unit display
- Form validation context integration

### Snapshot Testing (Available)
- Default props visual regression
- Position-specific snapshots
- Variant-based visual testing
- Content type comparisons
- Theme-specific rendering
- Complex content scenarios
- TextField integration snapshots
- Custom styling validation

## Props Coverage

- **`position`** (`'start'` | `'end'`) - Required positioning of adornment within input field
- **`variant`** (`'standard'` | `'outlined'` | `'filled'`) - Visual variant matching TextField variant
- **`disablePointerEvents`** (`boolean`) - Disable pointer events on adornment content
- **`children`** (`ReactNode`) - Content to display within the adornment
- **`sx`** (`object`) - Custom styling object for component theming
- **`className`** (`string`) - Additional CSS classes for custom styling
- **`id`** (`string`) - Unique identifier for the adornment element
- **`data-*`** (`any`) - Custom data attributes for testing and tracking
- **`aria-label`** (`string`) - Accessibility label for screen readers
- **`aria-describedby`** (`string`) - Reference to descriptive text element
- **`role`** (`string`) - ARIA role for semantic meaning

## Testing Patterns Established

### Component Testing Strategies
- Class-based queries for MUI component validation
- Accessible queries for user-facing elements
- Text content and icon presence verification
- Position-specific class and styling validation

### Integration Testing
- TextField startAdornment and endAdornment usage
- Interactive element click and keyboard handling
- Form validation state integration
- Multi-adornment scenarios

### Theme Integration Testing
- Multi-theme consistency validation
- Color scheme attribute verification
- CSS variable application testing
- Design system integration patterns

### Accessibility Validation
- ARIA attribute verification and association
- Screen reader compatibility testing
- Keyboard navigation support
- Interactive content accessibility

### Content Handling Testing
- Text, icon, and button content rendering
- Complex nested component structures
- Null/undefined children graceful handling
- Special character and unicode support

