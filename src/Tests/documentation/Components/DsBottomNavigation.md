# DsBottomNavigation Test Coverage

## Test File Location
`src/Components/DsBottomNavigation/DsBottomNavigation.test.tsx`

## Test Cases

### Core Rendering
- Basic component rendering with default props
- Selected state rendering with highlighted navigation items
- Default MUI classes application and styling validation
- Rendering without icons using text-only labels
- Single navigation action handling

### Props Validation
- **`value`** (`string` | `number`) - Current selected navigation value, supports both string and numeric identifiers
- **`onChange`** (`Function`) - Callback fired when navigation selection changes, receives the new value
- **`showLabels`** (`boolean`) - Controls visibility of navigation item labels
- **`sx`** (`SxProps`) - Custom styling props passed through to Material-UI component
- **`component`** (`string` | `Component`) - Custom root component, defaults to "div"

### Component States
- Default unselected state when no value is provided
- Selected state with proper highlighting and Mui-selected class
- Individual action disabled state preventing interaction
- Label visibility control through showLabels prop

### MUI Styling
- Default MUI BottomNavigation classes application (.MuiBottomNavigation-root)
- MUI BottomNavigationAction classes for individual items
- Selected state classes (Mui-selected) applied correctly
- Disabled state classes for non-interactive items

### Navigation Functionality
- Selection change handling through onClick events
- String value-based selection (primary navigation pattern)
- Prevention of change events for already selected items
- Disabled item interaction blocking

### Event Handling
- Click events on navigation actions with proper value passing
- Keyboard navigation support (Enter and Space keys)
- Navigation between multiple actions using arrow keys
- Mouse hover events for interactive feedback

### Form Integration
- Integration within form elements without submission conflicts
- Controlled component pattern with external state management
- Form submission handling with navigation state preservation

### Accessibility
- Proper ARIA attributes for navigation structure
- Keyboard navigation support between navigation items
- Accessible names derived from action labels
- Screen reader compatibility with action announcements
- Keyboard navigation skipping disabled items appropriately

### Edge Cases
- Empty children handling without component crashes
- Invalid value prop graceful handling
- Null value prop acceptance and default behavior
- Very long labels (1000+ characters) rendering correctly
- Special characters and Unicode support in labels
- Large number of navigation items (10+ actions) performance

### Real-world Scenarios
- Mobile app navigation with tab switching functionality
- Tab navigation system for multi-section interfaces
- Conditional navigation items based on user permissions
- Badge notifications integration with navigation actions

### Theme Testing
- Complete theme mode coverage across light/dark/highContrast themes
- CSS custom properties validation for color schemes
- Theme-specific color application for navigation elements
- Functionality preservation across all theme variations

### Snapshot Testing
- Visual regression testing for key component states
- Theme-specific snapshot validation
- Complex real-world scenario snapshot preservation

## Props Coverage

- **`value`** (`string` | `number`) - Currently selected navigation item identifier, supports both string and numeric values
- **`onChange`** (`(event: React.SyntheticEvent, newValue: string | number) => void`) - Selection change callback with event and new value
- **`showLabels`** (`boolean`) - Controls whether navigation item labels are visible, defaults to false for icon-only mode
- **`sx`** (`SxProps<Theme>`) - Material-UI styling system props for custom appearance
- **`component`** (`React.ElementType`) - Root component override, allows custom wrapper elements
- **`children`** (`ReactNode`) - DsBottomNavigationAction components defining navigation items
- **Standard MUI BottomNavigationProps** - All other Material-UI BottomNavigation props supported

## Testing Patterns Established

### DOM Query Strategies
- `document.querySelector('.MuiBottomNavigation-root')` for root navigation container
- `screen.getAllByRole("button")` for navigation action items
- `screen.getByText()` for label content verification
- Class-based queries for Material-UI specific elements

### Event Testing
- `userEvent.click()` for navigation selection simulation
- `userEvent.keyboard()` for accessibility testing
- `fireEvent.click()` for direct DOM event handling
- Hover and focus event testing with userEvent

### MUI-Specific Patterns
- Material-UI class validation (.MuiBottomNavigation-root, .MuiBottomNavigationAction-root)
- Selected state class checking (Mui-selected)
- Theme integration testing with CSS custom properties
- Icon integration testing with DsRemixIcon components

### Accessibility Testing
- ARIA attribute validation for navigation structure
- Keyboard navigation pattern testing
- Screen reader compatibility verification
- Focus management and disabled item handling


## Component Integration
- **DsBottomNavigationAction** - Individual navigation items with icons and labels
- **DsRemixIcon** - Icon system integration for navigation actions
- **Theme System** - Complete AM92 design system theme support
- **Material-UI BottomNavigation** - Direct re-export with full MUI prop compatibility
