# DsChip Test Coverage

## Test File Location
`src/Components/DsChip/DsChip.test.tsx`

## Test Cases

### Core Rendering
- Renders with default props
- Renders with an icon

### Props Validation
- **`label`** (`string`) – Ensures label text renders correctly
- **`color`** (`primary` | `secondary` | `default`) – Applies correct MUI color classes
- **`type`** (`status` | `nudge`) – Validates custom type attribute
- **`size`** (`small` | `medium`) – Ensures correct size classes
- **`disabled`** (`boolean`) – Applies disabled state

### Component States
- Disabled state rendering (`Mui-disabled`)
- Clickable state when `onClick` is provided

### MUI Styling
- Validates correct MUI Chip classes
- Size‑based class application (`MuiChip-sizeSmall`, etc.)
- Custom icon rendering (`DsRemixIcon` integration)

### Theme Testing Framework
- Complete theme mode coverage wtih various colors for **`type`** (`status` ) 
- Complete theme mode coverage wtih various colors for **`type`** (`nudge`) 

### Event Handling
- Handles click events with `onClick`
- Ensures event handlers fire correctly

### Accessibility
- Accepts and applies ARIA attributes (`aria-label`)
- Keyboard accessibility for clickable chips

### Edge Cases
- Handles long labels without breaking
- Renders gracefully without optional props

### Real‑world Scenarios
- Renders multiple chips together
- Works in UI groups and lists

## Coverage Report
Last updated: 26 November 2025
