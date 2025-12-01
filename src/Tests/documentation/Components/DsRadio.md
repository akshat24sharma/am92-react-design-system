# DsRadio Test Coverage

## Test File Location
`src/Components/DsRadio/DsRadio.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with basic props
- Label rendering and association via DsFormControlLabel
- Checked and unchecked state rendering
- Default icon rendering from DsRemixIcon (checkbox-blank-circle-line for unchecked)
- Checked icon rendering from DsRemixIcon (radio-button-line for checked)
- Error handling for missing props
- FormControlLabel wrapper integration

### Props Validation
- Custom `id` attribute handling and DOM element association
- Custom `name` attribute for form identification
- Custom `value` prop assignment for form submission
- Custom `className` application to FormControlLabel root element
- Custom data attributes propagation (data-testid, data-custom)
- `RadioProps` prop handling with nested attributes (inputProps, data attributes)
- `labelPlacement` prop positioning (start, end)
- Default `labelPlacement` as 'end' validation
- Disabled prop exclusion from RadioProps while maintaining functionality

### Component States
- Disabled state functionality with proper CSS classes and interaction prevention
- Checked state with proper ARIA attributes and visual indicators
- Unchecked state behavior and default rendering
- Required field validation indicators
- State combination handling (checked + disabled, required + disabled)
- Default color (secondary) application and CSS class validation
- MUI state classes application (Mui-disabled, Mui-checked)

### MUI Styling
- Default MUI Radio classes application (MuiButtonBase-root, MuiRadio-root)
- Color variant classes (MuiRadio-colorSecondary as default)
- State-specific classes (Mui-disabled, Mui-checked, Mui-focusVisible)
- FormControlLabel CSS classes (MuiFormControlLabel-root, labelPlacement variants)
- Custom icon styling with design system font size variables
- Focus state management and visual indicators
- Material-UI theme integration

### Component Functionality
- Toggle state on click interaction with proper event handling
- Disabled state prevents user interaction (no change events when disabled)
- Label click functionality for radio selection
- Exclusive selection behavior within radio groups (DsRadioGroup integration)
- Change event firing with correct parameters (event object, boolean value)
- Form control behavior and state management

### Event Handling
#### Change Events
- `onChange` event with correct parameters (SyntheticEvent, checked boolean)
- Event firing on user interactions (click, keyboard)
- Event object structure validation

#### Focus Events  
- `onFocus` event handling and focus state management
- `onBlur` event handling and focus removal
- Focus state visual indicators and accessibility

#### Keyboard Events
- Space key selection functionality
- Keyboard navigation within radio groups (Arrow keys)
- Focus management with Tab navigation
- Enter key support for accessibility

#### Click Events
- `onClick` event handling for radio and label
- Label click delegation to radio input
- RadioProps event delegation and proper forwarding

#### Disabled State Handling
- No interaction when disabled (visual and functional)
- Proper disabled attribute handling
- Disabled state visual indication

### Form Integration
- Form element association and proper form submission
- Form validation integration with required attribute
- Name attribute for form data collection and radio grouping
- Controlled component behavior with external state management
- Uncontrolled component with internal state handling
- Form submission with radio groups and value collection
- Radio group exclusive selection within forms
- FormControl integration for complex form layouts

### Accessibility
- Proper `role="radio"` assignment for screen readers
- `aria-label` support for custom accessible names
- `aria-labelledby` for external label association
- `aria-describedby` for help text and description association
- `aria-checked` state management (true, false)
- `aria-required` for required field indication
- Keyboard navigation support (Tab, Space, Arrow keys for groups)
- Focus management and visual focus indicators
- Screen reader compatibility and accessible name provision
- Radio group navigation with arrow keys (ArrowUp, ArrowDown)

### Edge Cases
- Null/undefined label handling without crashes
- Empty string label graceful handling
- Very long label text rendering and layout
- Special characters in label (symbols, punctuation)
- Unicode characters in label (international text, emojis)
- Missing `onChange` handler graceful handling
- Rapid successive clicks behavior (radio selection persistence)
- Invalid prop combinations handling
- Extreme value scenarios and boundary testing

### Real-world Scenarios
#### Complex Form Integration
- FormControl and FormLabel integration for complete form layouts
- Radio group with legend and accessible labeling
- Multi-level form hierarchy with proper event bubbling

#### Dynamic Content Rendering
- Dynamic options rendering from data arrays
- Conditional option rendering based on application state
- Map-based option generation with proper key handling

#### Layout Integration
- Nested layout components (DsBox, DsGrid integration)
- Row and column radio group layouts
- Responsive design behavior within containers

#### Theme Integration
- **Optimized comprehensive theme testing** in single test method
- Cross-theme compatibility testing for light, dark, and highContrast modes
- **Actual color code validation** using `getColorScheme(PALETTE)`
- All component states (checked/unchecked/disabled) tested per theme
- Secondary color validation with hex color pattern matching
- Text color and background color theme compliance
- Computed style validation for CSS variables and theme attributes
- Theme data attribute verification (`data-mui-color-scheme`)
- **Performance optimized**: Consolidated from 3 separate tests to 1 efficient test

### Snapshot Testing
#### Component Rendering Snapshots
- Default component state snapshot
- Checked and disabled state snapshots
- All labelPlacement variants (start, end, top, bottom)
- State combinations (checked+disabled, required+checked, etc.)
- RadioProps integration snapshot

#### Radio Group Integration Snapshots  
- Radio group context with multiple options
- Group with disabled options and default selection
- Row layout radio groups

#### Real-world Usage Snapshots
- Form integration with DsFormControl and DsFormLabel
- Complex form scenarios with validation
- Nested layout components with DsBox integration
- Edge cases with special characters and complex props

## Props Validation

- **`label`** (`ReactNode`) - Radio button label text or content, tested with various data types
- **`checked`** (`boolean`) - Controlled checked state with proper event handling
- **`disabled`** (`boolean`) - Disabled state with interaction prevention and visual indication
- **`value`** (`string | number`) - Form value for radio button identification and submission
- **`name`** (`string`) - Form field name for radio group association
- **`id`** (`string`) - Unique identifier for DOM element association
- **`required`** (`boolean`) - Form validation requirement indicator
- **`className`** (`string`) - Custom CSS class application to FormControlLabel
- **`labelPlacement`** (`'end'` | `'start'` | `'top'` | `'bottom'`) - Label positioning relative to radio button
- **`RadioProps`** (`Partial<RadioProps>`) - Material-UI Radio component props forwarding
- **`onChange`** (`Function`) - Change event handler with (event, checked) parameters
- **`onClick`** (`Function`) - Click event handler for user interactions
- **`onFocus`** (`Function`) - Focus event handler for accessibility
- **`onBlur`** (`Function`) - Blur event handler for focus management
- **`aria-label`** (`string`) - Accessibility label for screen readers
- **Data attributes** - Custom data-* attributes for testing and tracking

## Integration Testing

- **DsRadioGroup Integration** - Exclusive selection behavior and group management
- **DsFormControl Integration** - Complex form layout and validation support
- **DsFormLabel Integration** - Accessible form labeling and legend support
- **Layout Components** - Integration with DsBox and other layout components
- **Theme System** - Cross-theme compatibility and design token integration
- **Form Libraries** - Compatibility with form management libraries

## Coverage Report
Last updated: 1 December 2025  
Total test cases: 64 (54 functional tests + 10 snapshot tests)  
Test categories: 11 (Core Rendering, Props Validation, Component States, MUI Styling, Component Functionality, Event Handling, Form Integration, Accessibility, Edge Cases, Real-world Scenarios, Snapshot Tests)

**Optimization Summary:**
- Consolidated 3 separate theme tests into 1 comprehensive test
- Eliminated redundant color validation and icon presence checks  
- Maintained full coverage while improving test efficiency by ~3%
