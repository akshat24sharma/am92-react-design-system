# DsTable Test Coverage

## Test File Location
`src/Components/DsTable/DsTable.test.tsx`

## Test Cases

### Rendering
- Renders table without crashing
- Renders inside `DsTableContainer`
- Supports header + body rendering
- Supports rendering rows and cells (children)

### Component Composition
- Renders `DsTableHead`, `DsTableBody`, `DsTableRow`, `DsTableCell` correctly
- Ensures proper DOM structure: `<table>`, `<thead>`, `<tbody>`
- Multiple rows and cells render accurately

### Props Validation
- **`stickyHeader`** (`boolean`) — Applies MUI sticky header class
- **`sx`** (`object`) — Custom style overrides applied correctly
- **`size`** (`'small' | 'medium'`, if supported) — Validates class updates
- **`aria-label`** (`string`) — Applied correctly to table root

### MUI Styling
- Default MUI Table root class applied (`MuiTable-root`)
- Sticky header class applied (`MuiTable-stickyHeader`)
- Style inheritance validated for nested elements
- Background/layout overrides applied using `sx`

### Event Handling
- Click events on rows trigger correctly
- Interactive elements inside cells (e.g., buttons) function as expected
- Maintains correct `role="row"` for interactivity

### Accessibility
- Proper semantic role: `role="table"`
- Supports `aria-label` and naming attributes
- Ensures semantic structure including `<thead>` and `<tbody>`
- Rows and cells accessible via keyboard and screen readers

### Edge Cases
- Renders empty table body without errors
- Handles uneven rows gracefully (different number of cells)
- Renders large datasets correctly (50+ rows)
- Supports dynamic row rendering

### Real-world Scenarios
- Table with interactive components inside cells (e.g., buttons, icons)
- Renders inside scrollable `DsTableContainer`
- Handles grouped row structures and mixed content
- Works with composed design-system wrappers (e.g., layout components)

## Coverage Report
Last updated: 26 November 2025
