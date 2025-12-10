# DsTag Test Coverage

## Test File Location
`src/Components/DsTag/DsTag.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with basic props
- Tag text rendering
- Custom class name application
- Tag without text variations

### Props Validation
- Custom `id` and `name` attribute handling
- Prop forwarding validation
- Custom styling prop passthrough

### Component States
- Disabled state functionality
- Active state styling
- Hover state styling

### Styling
- Default styling classes application
- Color variants (primary, secondary, success, error, warning, info)
- Size variants (small, medium, large)
- Full width layout behavior
- Custom styling overrides

### Event Handling
#### Mouse Events
- onClick event handling
- onMouseEnter event handling
- onMouseLeave event handling

#### Keyboard Events
- onKeyDown event handling
- onKeyUp event handling
- Enter key interaction
- Space key interaction

### Accessibility
- ARIA attributes for accessibility
- Keyboard navigation support
- Screen reader compatibility

### Edge Cases
- Very long tag text handling
- Empty string values
- Null/undefined prop handling
- Special character rendering
- Unicode text support

### Component Integration
- Parent component prop passthrough
- Style override validation
- Theme integration testing

### Performance
- Component mounting performance
- Re-render optimization
- Large text handling

### Error Handling
- Invalid prop type handling
- Error boundary compatibility
- Graceful failure scenarios

## Props Coverage

- **`id`** (`string`) - Unique identifier for the tag element
- **`name`** (`string`) - Name attribute for the tag
- **`text`** (`string`) - Text content of the tag
- **`color`** (`'primary'` | `'secondary'` | `'success'` | `'error'` | `'warning'` | `'info'`) - Theme color variant
- **`size`** (`'small'` | `'medium'`) - Size variant of the tag
- **`disabled`** (`boolean`) - Disable user interaction
- **`onClick`** (`function`) - Click event handler
- **`sx`** (`object`) - Custom styling object for component theming

## Testing Patterns Established

### Tag Testing Strategies
- Role-based queries (`getByRole("button")`)
- Text content queries
- Attribute validation (id, name, etc.)
- State attribute testing (disabled, active, etc.)

### Accessibility Validation
- ARIA attribute verification
- Keyboard navigation patterns
- Screen reader compatibility

### Component Composition Testing
- Sub-component prop forwarding
- Style override validation
- Theme integration testing
