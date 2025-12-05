# DsToggle Test Coverage

## Test File Location
`src/Components/DsToggle/DsToggle.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with basic props (name, value, onChange)
- Toggle switch rendering with Material-UI Switch component
- Checked and unchecked state rendering
- Component integration with design system theme
- Error handling for missing required props
- Basic DOM structure and element hierarchy

### Props Validation
- Custom `name` attribute handling for form identification
- Custom `value` prop assignment for toggle state (boolean)
- Custom `onChange` callback with custom signature (name, value)
- Custom `id` attribute for DOM element association
- Custom `className` application to switch wrapper
- `disabled` prop handling with interaction prevention
- `color` prop variants (though hardcoded to secondary in implementation)
- `size` prop variants (small, medium) for different form contexts
- `inputProps` for underlying Switch component customization
- Focus event handlers (`onFocus`, `onBlur`) integration

### Component States
- Disabled state functionality with proper CSS classes and interaction prevention
- Checked state with proper ARIA attributes and visual indicators
- Unchecked state behavior and default rendering
- State combination handling (checked + disabled)
- Default color (secondary) application and hardcoded behavior
- MUI state classes application (Mui-disabled, Mui-checked, Mui-focusVisible)

### MUI Styling
- Default MUI Switch classes application (MuiSwitch-input, MuiSwitch-switchBase)
- Color variant classes (MuiSwitch-colorSecondary as default and hardcoded)
- State-specific classes (Mui-disabled, Mui-checked, Mui-focusVisible)
- Custom styling integration with Material-UI theming
- Focus state management and visual indicators
- Switch thumb and track styling with design system integration

### Component Functionality
- Toggle state on click interaction with proper event handling
- Disabled state prevents user interaction (no change events when disabled)
- Custom onChange signature with (name, value) parameters instead of standard event
- State synchronization between parent component and toggle
- Form control behavior and state management
- Controlled component pattern with external state management

### Event Handling
#### Change Events
- `onChange` event with custom parameters (name string, value boolean)
- Event firing on user interactions (click, keyboard)
- Custom event signature different from standard MUI Switch

#### Focus Events
- `onFocus` event handling and focus state management
- `onBlur` event handling and focus removal
- Focus state visual indicators and accessibility

#### Keyboard Events
- Space key toggle functionality
- Enter key support for accessibility
- Keyboard navigation with Tab key
- Focus management within forms

#### Disabled State Handling
- No interaction when disabled (visual and functional)
- Proper disabled attribute handling
- Disabled state prevents onChange callback execution

### Form Integration
- Form element association and proper form submission
- Name attribute for form data collection
- Controlled component behavior with external state management
- Form validation integration with toggle states
- Multiple toggle form scenarios with proper state management
- Form reset functionality and state synchronization

### Accessibility
- Proper `role="switch"` assignment for screen readers
- `aria-checked` state management (true, false)
- `aria-disabled` for disabled field indication
- Keyboard navigation support (Tab, Space, Enter)
- Focus management and visual focus indicators
- Screen reader compatibility and accessible name provision
- External labeling support with proper association
- Descriptive content association for help text

### Edge Cases
- Null/undefined onChange handler graceful handling
- Rapid successive clicks behavior and state consistency
- Empty name attribute handling without crashes
- Very long name values and performance implications
- Special characters in name attribute (symbols, unicode)
- Invalid value prop combinations (null, undefined)
- Missing required props graceful degradation

### Real-world Scenarios
#### Settings and Preferences
- User preference toggles in settings panels
- Privacy and visibility control toggles
- Notification preference management

#### Feature Management
- Feature flag configuration for developers/admins
- Dynamic feature toggle scenarios
- A/B testing toggle controls

#### Form Integration
- Multiple toggles in complex forms
- Form validation with toggle requirements
- Nested form structures with toggle groups

### Theme Testing
- **Comprehensive theme testing** across light, dark, and highContrast modes
- **Actual color code validation** using `getColorScheme(PALETTE)`
- All component states (checked/unchecked/disabled) tested per theme
- Secondary color validation with hex color pattern matching
- Text color and background color theme compliance
- Theme data attribute verification (`data-mui-color-scheme`)
- Cross-theme compatibility ensuring functionality preservation
- Design system color integration testing

### Snapshot Testing
#### Component State Snapshots
- Default component state snapshot
- Checked and unchecked state snapshots
- Disabled state with proper visual indication
- Size variant snapshots (small, medium)
- Color variant snapshots (though hardcoded to secondary)

#### Form Integration Snapshots
- Toggle within form controls with labels
- Multiple toggles in form scenarios
- Complex form layouts with design system components

#### Real-world Usage Snapshots
- Settings panel integration
- Feature flag configuration interfaces
- Privacy control scenarios
- Theme-specific visual regression protection

## Integration Testing
- **Material-UI Switch Integration** - Complete MUI Switch functionality inheritance
- **Design System Theme Integration** - Cross-theme compatibility and color validation
- **Form Integration** - Working within form elements and form validation libraries
- **Layout Components** - Integration with DsBox and other design system components
- **Accessibility Integration** - Screen reader support and keyboard navigation patterns

## Coverage Report
Last updated: 5 December 2025  
Total test cases: 52 (44 functional tests + 8 snapshot tests)  
Test categories: 12 (Core Rendering, Props Validation, Component States, MUI Styling, Component Functionality, Event Handling, Form Integration, Accessibility, Edge Cases, Real-world Scenarios, Theme Testing, Snapshot Testing)

**Compliance Status:**
- ✅ Follows mandatory 12-category structure
- ✅ Theme Testing as dedicated section (not embedded)
- ✅ Snapshot Testing as final mandatory section
- ✅ Uses design system components exclusively in test scenarios
- ✅ Comprehensive accessibility testing with ARIA validation
- ✅ Cross-theme compatibility testing (light, dark, highContrast)

**Component Characteristics:**
- Hardcoded secondary color regardless of color prop
- Custom onChange signature with (name, value) parameters
- Full Material-UI Switch functionality inheritance
- Complete design system theme integration

**Testing Framework Features:**
- Theme color validation using `getColorScheme(PALETTE)`
- Comprehensive accessibility testing with ARIA validation
- Real-world scenario coverage for practical usage patterns
- Cross-theme compatibility testing for light, dark, and highContrast modes