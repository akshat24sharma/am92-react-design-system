# DsDivider Test Coverage

## Test File Location
`src/Components/DsDivider/DsDivider.test.tsx`

## Test Cases

### Rendering
- Core rendering (horizontal and vertical)
- Divider with text
- Custom className and styles

### Props Validation
- **`orientation`** (`'horizontal'` | `'vertical'`) - Ensures correct orientation classes are applied.
- **`className`** (`string`) - Custom class name application
- **`sx`** (`object`) - Custom styles application
- **`ds-size`** (`'M'` | `'L'`) - Size variants
- **`textAlign`** (`'left'` | `'right'`) - Text alignment options


### MUI Styling
- Default MUI Divider classes application
- Vertical and horizontal orientation class handling
- Variant classes: `inset`, `fullWidth`, `middle`
- Text alignment classes: `MuiDivider-textAlignLeft`, `MuiDivider-textAlignRight`
- Wrapper class (`MuiDivider-wrapper`) for dividers with children


### Accessibility
- `role="separator"` applied correctly
- Divider with children still maintains correct accessibility
- `aria-hidden` support

### Edge Cases
- Handles empty children gracefully
- Renders long text strings correctly
- Compatible inside layout containers (`DsBox`)

## Coverage Report
Last updated: 24 November 2025



