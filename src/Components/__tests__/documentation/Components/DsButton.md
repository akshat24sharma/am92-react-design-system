# DsButton Test Coverage

## Test File Location
`src/Components/DsButton/DsButton.test.tsx`

## Test Cases

### Rendering
- ✅ Basic disabled state
- ✅ Size variants (small, medium, large)
- ✅ Color variants (secondary)
- ✅ Text variant
- ✅ Icon support (start/end)
- ✅ Full width mode

### Interactions
- ✅ Click handling
- ✅ Form submission
- ✅ Keyboard navigation
  - ✅ Enter key
  - ✅ Space key

### Props Validation
| Prop | Type | Tested | Notes |
|------|------|--------|-------|
| disabled | boolean | ✅ | |
| size | 'small' \| 'medium' \| 'large' | ✅ | All variants tested |
| color | 'primary' \| 'secondary' | ✅ | |
| variant | 'text' \| 'contained' | ✅ | |
| startIcon | ReactNode | ✅ | Tested with DsRemixIcon |
| endIcon | ReactNode | ✅ | Tested with DsRemixIcon |
| fullWidth | boolean | ✅ | |
| type | 'button' \| 'submit' | ✅ | Tested in form context |
| onClick | Function | ✅ | |

## Coverage Report
Last updated: 24 October 2025