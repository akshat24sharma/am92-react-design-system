
# DsMenu Test Coverage

## Test File Location
`src/Components/DsMenu/DsMenu.test.tsx`

## Test Cases

### Rendering
- Renders menu when open
- Does not render when closed
- Applies MUI classes and design system overrides
- Renders menu items as children

### Props Validation
- **`open`** (`boolean`) — Default closed, opens when true
- **`disableAutoFocusItem`** (`boolean`) — Prevents auto-focus on first item
- **`id`/`className`** — Applied to Paper component
- **`anchorEl`** — Positions menu relative to anchor
- **`MenuListProps`** — Prop forwarding to MenuList

### Component Functionality
- Handles `onClose` via backdrop click and Escape key
- Menu item click events trigger correctly
- Focus management validated (manual focus, arrow navigation)

### Accessibility
- Proper ARIA role: `role="menu"`
- Keyboard navigation between items
- ARIA attributes (e.g., `aria-label`) applied via MenuListProps
- Disabled items have correct `aria-disabled` attribute

### Theme Testing
- Renders correctly across all color schemes (light, dark, highContrast)
- Design system style overrides validated (borderRadius, boxShadow)
- Portal rendering handled in theme context

### Real-world Scenarios
- Dropdown menu with button trigger
- Context menu with multiple options
- Nested menu structure and disabled items

### Snapshot Testing
- Open menu snapshot
- Closed menu snapshot
- Multiple menu items snapshot

## Coverage Report
Last updated: 5 December 2025