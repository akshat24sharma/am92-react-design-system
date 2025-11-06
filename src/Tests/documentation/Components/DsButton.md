# DsButton Test Coverage

## Test File Location
`src/Components/DsButton/DsButton.test.tsx`

## Test Cases

### Rendering
- Basic disabled state
- Size variants (small, medium, large)
- Color variants (secondary)
- Text variant
- Icon support (start/end)
- Full width mode

### Interactions
- Click handling
- Form submission
- Keyboard navigation
  - Enter key
  - Space key

### Props Validation

- **`disabled`** (`boolean`) - Basic disabled state functionality
- **`size`** (`'small'` | `'medium'` | `'large'`) - All size variants tested
- **`color`** (`'primary'` | `'secondary'`) - Color theme variants
- **`variant`** (`'text'` | `'contained'`) - Visual style variants
- **`startIcon`** (`ReactNode`) - Icon positioning at start, tested with DsRemixIcon
- **`endIcon`** (`ReactNode`) - Icon positioning at end, tested with DsRemixIcon
- **`fullWidth`** (`boolean`) - Full container width behavior
- **`type`** (`'button'` | `'submit'`) - Form submission context testing
- **`onClick`** (`Function`) - Click event handler functionality

## Coverage Report
Last updated: 24 October 2025