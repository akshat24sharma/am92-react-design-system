# DsOtp Test Coverage

## Test File Location
`src/Components/DsOtp/DsOtp.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with 6 OTP input fields
- Custom length OTP rendering (3, 4, 5, 6, 8 digits)
- Label text rendering and association with input group
- Helper text display and proper positioning
- Input field type validation (type="tel" for optimal mobile keyboards)
- Default name attribute generation (otp.0, otp.1, etc.)
- Empty state rendering without optional props
- Container structure validation with proper DOM hierarchy

### Props Validation
- Custom `name` attribute propagation to individual inputs
- Custom `length` prop creating correct number of inputs  
- `initialOtp` value pre-population and truncation to length
- Custom `label` and `helperText` content display
- Boolean state props (`disabled`, `error`, `success`, `autoFocus`)
- `color` variant prop validation across all supported values
- Event handler props assignment (`onChange`, `onKeyDown`, `onFocus`, `onPaste`)
- Fallback value handling when required props are missing

### Component States
- **Disabled State**: All inputs disabled with proper ARIA attributes
- **Error State**: Red styling and `aria-invalid="true"` on all inputs
- **Success State**: Green styling with `MuiInputBase-colorSuccess` classes
- **Default State**: Standard appearance with proper focus management
- **State Combinations**: Disabled + Error, Success + Custom Color
- **ds-variant="otp"**: Custom design system variant attribute
- **Color Variants**: Primary, secondary, error, warning, info, success
- **Auto-focus State**: First input receives focus on component mount

### MUI Styling
- Default MUI FormControl classes (`MuiFormControl-root`)
- OTP variant attribute (`ds-variant="otp"`) on all input bases
- Error state classes (`Mui-error`) when error prop is true
- Disabled state classes (`Mui-disabled`) when disabled prop is true
- Success color classes (`MuiInputBase-colorSuccess`) for success state
- Input base classes (`MuiInputBase-root`) on all input containers
- TextField root classes for proper Material-UI integration
- Theme-aware CSS custom properties integration

### Component Functionality
#### Input Management
- Single digit input acceptance with automatic focus advancement
- Non-numeric character filtering and rejection
- Maximum one character per input field enforcement
- Automatic focus movement between adjacent inputs
- Input value persistence and state management

#### Navigation Behavior
- Forward navigation on valid digit entry
- Backward navigation on backspace from empty field
- Focus management between first and last inputs
- Tab navigation integration with external form elements
- Keyboard accessibility for arrow key navigation

#### Auto-completion
- Complete OTP detection and `onComplete` callback firing
- Partial OTP handling without premature completion
- Value validation before completion callback execution
- State synchronization across all input fields

### Event Handling
#### Change Events
- `onChange` event firing on any input modification
- Event object structure with input reference and value
- State change propagation across component instance
- Multiple rapid changes handling without state corruption

#### Keyboard Events
- `onKeyDown` event handling for all keyboard interactions
- Backspace navigation between inputs
- Enter key handling for form submission compatibility
- Number key input validation and filtering
- Arrow key navigation (optional enhancement)

#### Focus Events
- `onFocus` event handling for individual input focus
- Focus state management and visual indicators
- Blur event handling for focus loss
- Text selection on focus for better user experience
- Focus restoration after external interactions

#### Paste Events
- `onPaste` event handling with clipboard data processing
- Multi-digit paste distribution across inputs
- Non-numeric character filtering from pasted content
- Paste content truncation to available input length
- Complete OTP detection from single paste operation
- Empty paste handling without state corruption

#### Disabled State Handling
- Event prevention when component is disabled
- Focus prevention on disabled inputs
- Visual disabled state indication
- Proper disabled attribute propagation

### Form Integration
- HTML form element association and submission behavior
- Form data collection via individual input names
- Controlled component behavior with external state management
- Form validation integration and error handling
- Required field validation (when implemented)
- Form reset functionality and state clearing
- Name attribute customization for form field identification
- Integration with design system form components

### Accessibility
#### ARIA Attributes
- `role="textbox"` on each individual input field
- `aria-invalid` state management for error conditions
- `type="tel"` for optimal mobile keyboard presentation
- Proper label association for screen reader announcements
- Helper text association via `aria-describedby` relationships

#### Keyboard Navigation
- Tab order integration with surrounding form elements
- Backspace navigation between inputs
- Enter key form submission compatibility
- Number key input acceptance and validation
- Arrow key navigation (enhanced accessibility)
- Focus trap behavior within OTP component group

#### Screen Reader Support
- Label announcements for input group context
- Individual input identification for screen readers
- Error state announcements and feedback
- Helper text reading and context provision
- State change notifications (success, error, completion)
- Focus management announcements for navigation feedback

### Edge Cases
- Null/undefined `onComplete` handler graceful handling
- Zero length OTP rendering (empty component)
- Large length values (20+ inputs) handling and performance
- Rapid input changes and state consistency maintenance
- Complex paste scenarios (empty, very long, mixed content)
- Initial OTP longer than specified length (truncation)
- Undefined initial OTP handling (graceful fallback)
- Event handler absence and safe calling patterns

### Real-world Scenarios
#### Phone Verification Flow
- Complete SMS verification implementation pattern
- Auto-focus on component mount for immediate input
- Error recovery with clear visual feedback
- Resend functionality integration
- Timer display and expiration handling
- Success state confirmation and navigation

#### Two-Factor Authentication
- Authenticator app code entry pattern
- 6-digit code validation and processing
- Custom name attributes for form identification
- Integration with authentication flow navigation
- Error handling for invalid codes
- Success confirmation and dashboard redirection

#### PIN Entry System
- 4-digit PIN entry for security verification
- Custom helper text for context-specific guidance
- Error state with retry attempt feedback
- Success state with immediate validation
- Security considerations for sensitive data

#### Error Recovery Flow
- Invalid code handling with user-friendly messaging
- Clear input functionality for retry attempts
- State management for error/success transitions
- Visual feedback consistency across error states
- Helper text updates based on current context

### Ref and Imperative Handle
#### API Methods
- `resetOtpValues()` method for programmatic clearing
- `domNode` reference for direct DOM access
- Imperative control testing with external triggers
- Ref persistence across component re-renders
- Method availability and proper API exposure

#### Integration Testing
- Ref-based control from parent components
- External reset functionality (Clear button)
- DOM node access for advanced manipulations
- Ref forwarding through component hierarchy
- Imperative vs declarative control patterns

### Theme Testing
#### Color Scheme Validation
- **Light Theme**: Default colors and proper contrast ratios
- **Dark Theme**: Dark mode color adaptation and visibility
- **High Contrast**: Enhanced accessibility color compliance
- CSS custom properties resolution (`var(--ds-colour-supportPositive)`)
- `data-mui-color-scheme` attribute validation across themes
- Theme switching preservation and state consistency

#### CSS Variables Integration
- Design system color token usage validation
- Border color custom property application
- Background color integration (where applicable)
- Theme-specific color expectations mapping:
  - Light: `PALETTE.successGreen`
  - Dark: `PALETTE.successGreenDark`  
  - High Contrast: `PALETTE.highContrast2`

#### Cross-theme Consistency
- Component structure preservation across themes
- CSS class application consistency
- Accessibility maintenance in all theme modes
- Visual hierarchy preservation
- Interactive state consistency

### Snapshot Testing
#### Basic State Snapshots
- Default props rendering (6 inputs, no label)
- Custom length variations (3, 4, 5, 6, 8 digits)
- Label and helper text combinations
- Initial OTP value pre-population
- Auto-focus state capture

#### Component State Snapshots
- Disabled state visual representation
- Error state styling and attributes
- Success state styling and color classes
- Combined states (disabled + error)
- ds-variant attribute presence verification

#### Color Variant Snapshots
- Primary color scheme application
- Secondary, error, warning, info, success variants
- Theme-specific color rendering
- CSS class application for color variants

#### Theme-based Snapshots
- Light theme complete rendering
- Dark theme visual adaptation
- High contrast accessibility compliance
- Success state across all themes
- Error state theme consistency

#### Real-world Scenario Snapshots
- Phone verification complete flow
- 2FA authentication implementation
- Form integration context
- Complex layouts with surrounding elements

#### Accessibility Snapshots
- ARIA attribute structure preservation
- Screen reader compatible markup
- Keyboard navigation structure
- Focus management state capture

## Props Coverage

- **`onComplete`** (`(value: string) => void`) - **Required** - Callback fired when OTP entry is complete
- **`length`** (`number`, default: `6`) - Number of OTP input fields to render
- **`initialOtp`** (`string`) - Pre-populated OTP value, truncated to specified length
- **`name`** (`string`, default: `"otp"`) - Base name for input fields (generates otp.0, otp.1, etc.)
- **`label`** (`string`) - Label text displayed above the input group
- **`helperText`** (`string`) - Helper text displayed below the input group
- **`disabled`** (`boolean`, default: `false`) - Disable all input interactions
- **`error`** (`boolean`, default: `false`) - Error state styling and ARIA attributes
- **`success`** (`boolean`, default: `false`) - Success state styling with green colors
- **`color`** (`'primary'` | `'secondary'` | `'error'` | `'warning'` | `'info'` | `'success'`, default: `'primary'`) - Theme color variant
- **`autoFocus`** (`boolean`, default: `false`) - Auto-focus first input on component mount
- **`onChange`** (`(event: React.ChangeEvent<HTMLInputElement>) => void`) - Change event handler for any input
- **`onKeyDown`** (`(event: React.KeyboardEvent<HTMLInputElement>) => void`) - Keyboard event handler
- **`onFocus`** (`(event: React.FocusEvent<HTMLInputElement>) => void`) - Focus event handler
- **`onPaste`** (`(event: React.ClipboardEvent<HTMLInputElement>) => void`) - Paste event handler with processing

## Ref API Coverage

- **`resetOtpValues()`** - Programmatically clear all input values
- **`domNode`** (`HTMLDivElement | null`) - Direct reference to root DOM element

## Testing Patterns Established

### OTP Testing Strategies
- Role-based queries (`getAllByRole("textbox")`) for multiple inputs
- Input length validation via array length assertion
- State validation through input value inspection
- Focus management testing with `.toHaveFocus()` assertions
- Event simulation with realistic user typing patterns

### Multi-input Component Testing
- Individual input state validation within component group
- Cross-input interaction testing (navigation, auto-advance)
- Bulk operation testing (paste, reset, validation)
- Sequential interaction patterns (type, backspace, navigate)

### Theme Testing Methodology
- **NEVER use computed style assertions** - CSS variables don't resolve in jsdom
- **ALWAYS use CSS class validation** - Test class application over style values
- **Complete theme coverage** - Test light, dark, AND highContrast modes
- **Theme configuration validation** - Use actual theme data for expectations
- **CSS custom property awareness** - Document expected variables without testing resolution

### Form Integration Testing
- Name attribute generation and uniqueness validation
- Form data collection simulation and verification
- Integration with design system form components
- Controlled component behavior with external state management

### Event Simulation Patterns
- **Typing simulation**: `user.type(input, "1")` for realistic input
- **Paste simulation**: `fireEvent.paste()` with clipboard data mocking
- **Navigation testing**: Focus management with keyboard interactions
- **Event handler verification**: Mock function call validation

### Accessibility Testing Framework
- ARIA attribute validation across all component states
- Keyboard navigation pattern verification
- Screen reader compatibility through semantic markup
- Focus management testing with complex interaction flows

### Snapshot Testing Strategy
- **Named snapshots** - Clear identification for each scenario
- **Theme-specific coverage** - Separate snapshots per color scheme
- **State combination coverage** - All meaningful prop combinations
- **Real-world pattern documentation** - Complete usage examples
- **Design system integration** - Component composition patterns

## Testing Architecture Innovations

### Custom Hook Integration
- `userEvent.setup()` for realistic user interaction simulation
- `createRef<DsOtpRef>()` for imperative API testing
- `waitFor()` for asynchronous state change validation
- `testAllThemes()` utility for comprehensive theme coverage

### Design System Integration Testing
- Exclusive use of design system components in test scenarios
- Real-world composition patterns with `DsPaper`, `DsTypography`, `DsButton`
- Form integration with design system form components
- Theme provider integration testing

### Advanced Event Testing
- **Clipboard API simulation** - Mock clipboard data for paste operations
- **Complex keyboard sequences** - Multi-step navigation patterns
- **Focus management validation** - Complex focus flow testing
- **Event bubbling control** - Proper event handling in component hierarchy

### Performance-aware Testing
- Efficient theme testing with proper cleanup (`unmount()`)
- Reduced test count through parameterized testing
- Bulk validation patterns for similar test cases
- Memory leak prevention with proper component teardown

