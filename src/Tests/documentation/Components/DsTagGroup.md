# DsTagGroup Test Coverage

## Test File Location
`src/Components/DsTagGroup/DsTagGroup.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering in single and multi modes
- Tag group container rendering with proper MUI classes
- Child tag rendering and enumeration
- Single child element rendering
- Selected and unselected state rendering

### Props Validation
- Custom `name` attribute handling and validation
- String values in single mode
- Array values in multi mode
- DsStack prop passthrough (spacing, direction, alignItems)
- Value prop validation for both modes

### Component States
- Unselected tags in default state
- Selected tag highlighting in single mode
- Multiple selected tags in multi mode
- Delete icons for selected tags in multi mode
- Empty state handling

### MUI Styling
- Default MUI Stack classes application
- MUI Chip classes for child tags
- Selected state classes (MuiChip-colorSecondary)
- Unselected state classes (MuiChip-colorDefault)
- Proper spacing from DsStack integration

### Component Functionality
- Single selection logic in single mode
- Deselection functionality in single mode
- Multi-selection logic in multi mode
- Tag removal via delete icon in multi mode
- Selection state management

### Event Handling
#### Mouse Events
- onClick events for unselected tags
- onDelete events for selected tags in multi mode
- Rapid consecutive click handling

#### Keyboard Events
- Keyboard focus management
- Enter key interaction
- Keyboard navigation between tags
- Accessibility keyboard support

### Form Integration
- Form element compatibility
- Form submission with selected values
- Controlled component pattern support
- Value synchronization with parent components

### Accessibility
- Proper ARIA attributes for tags
- Keyboard navigation between tags
- Accessible names for screen readers
- Delete button accessibility in multi mode
- Tabindex and focus management

### Edge Cases
- Null/undefined values handling
- Empty array in multi mode
- Special character support in labels
- Unicode character rendering
- Very large number of tags (performance testing)

### Real-world Scenarios
- Category filter implementation
- Skill selector functionality
- Priority selector in single mode
- Multi-category selection patterns

### Theme Testing
- Cross-theme rendering (light, dark, highContrast)
- Color variant support across themes
- Theme integration validation
- Functionality preservation across themes

### Snapshot Testing
- Key component states snapshots
- Cross-theme visual regression testing
- Complex real-world scenario snapshots

## Props Coverage

- **`name`** (`string`) - Name identifier for the tag group
- **`value`** (`string | string[]`) - Current selected value(s)
- **`multi`** (`boolean`) - Enable multi-selection mode
- **`onChange`** (`function`) - Selection change event handler
- **`children`** (`ReactNode`) - DsTag components as children
- **`spacing`** (`number`) - Spacing between tags (from DsStack)
- **`direction`** (`'row' | 'column'`) - Layout direction (from DsStack)
- **`alignItems`** (`string`) - Alignment configuration (from DsStack)
- **`color`** (`'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`) - Theme color variant

## Testing Patterns Established

### TagGroup Testing Strategies
- Helper function usage for consistent setup (`renderSingleModeTagGroup`, `renderMultiModeTagGroup`)
- Role-based queries (`getAllByRole("button")`)
- Closest element selection for MUI class validation
- State-based testing with value prop variations

### Selection Logic Validation
- Single mode: string value selection/deselection
- Multi mode: array value addition/removal
- onChange handler parameter validation
- State synchronization testing

### Accessibility Validation
- ARIA attribute verification across modes
- Keyboard navigation flow testing
- Focus management validation
- Screen reader compatibility

### Component Composition Testing
- DsTag children integration
- DsStack prop inheritance
- MUI component class application
- Theme integration across color schemes

### Real-world Usage Testing
- Filter implementation patterns
- Selector component behaviors
- Form integration scenarios
- Complex interaction workflows
