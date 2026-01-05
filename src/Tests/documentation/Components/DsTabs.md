# DsTabs Test Coverage

## Test File Location
`src/Components/DsTabs/DsTabs.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with tablist and basic props
- Multiple tab children rendering with proper tab count validation
- Empty tabs handling without crashes (no children scenario)
- Complex tab content with nested React components (DsBox, DsTypography integration)
- Icon and label combination tabs with proper accessible names
- MUI Tabs root element structure and class application
- Tab panel and tablist relationship validation

### Props Validation
- Custom `value` prop for controlled tab selection state
- Default `indicatorColor` and `textColor` prop acceptance and application
- Custom indicator colors (primary, secondary) with proper styling
- Custom text colors with theme-aware styling integration
- All MUI Tabs props forwarding (id, className, orientation, variant, scrollButtons)
- Custom data attributes propagation (data-testid, data-custom)
- `sx` prop handling for custom styling and theme integration
- Proper prop validation without breaking component functionality

### Component States
- Selected tab state with proper `aria-selected="true"` attributes
- Disabled tab functionality with interaction prevention and visual indication
- Orientation states (horizontal, vertical) with proper ARIA orientation attributes
- Variant states (standard, scrollable, fullWidth) with layout behavior validation
- Multiple state combinations (selected + disabled, vertical + scrollable)
- MUI state classes application (Mui-disabled, Mui-selected, Mui-focusVisible)
- Focus state management and keyboard navigation state persistence

### MUI Styling
- Default MUI Tabs classes (MuiTabs-root, MuiTabs-list, MuiTabs-flexContainer)
- Indicator styling presence and proper DOM structure
- Scroller functionality with MuiTabs-scroller element validation
- Custom sx prop styling application with theme variable integration
- Root element class hierarchy and CSS-in-JS integration
- Theme-aware styling with proper CSS custom properties
- Material-UI component composition and style inheritance

### Variant Behavior
- **Container variant** (`ds-variant="container"`) custom styling application
- Standard variant behavior without ds-variant prop specified
- Container variant with other MUI props combination (orientation, colors)
- Custom design system styling vs MUI default styling differentiation
- Border radius and visual styling specific to container variant
- Indicator behavior differences between variants (hidden in container)
- Theme integration with variant-specific design tokens

### Event Handling
#### Selection Events
- `onChange` event with correct parameters (event, newValue)
- Tab selection via mouse click with proper value updates
- Event firing sequence and state management validation

#### Keyboard Events
- Arrow key navigation (Left/Right for horizontal, Up/Down for vertical)
- Home key navigation to first tab
- End key navigation to last tab
- Enter and Space key activation for focused tabs
- Tab key focus management within and outside tab list
- Keyboard navigation with disabled tabs (proper skipping behavior)

#### Mouse Events
- `onClick` event handling for individual tabs
- Mouse hover events (`onMouseEnter`, `onMouseLeave`) for interactive tabs
- Label click delegation and proper focus management
- Disabled tab interaction prevention (no events when disabled)

#### Focus Events
- Focus management with proper tabindex attributes
- Visual focus indicators and accessibility compliance
- Focus trapping within tab navigation for keyboard users

### Accessibility
- Proper `role="tablist"` for the main container
- Individual tab `role="tab"` assignments
- `aria-selected` state management (true/false) for active tab
- `aria-orientation` for vertical tab layouts
- `aria-label` and `aria-labelledby` support for accessible naming
- `aria-describedby` for additional descriptive content association
- Keyboard navigation compliance with ARIA Authoring Practices
- Screen reader compatibility and proper accessible name computation
- Focus management for users with disabilities
- Tab order and focus indicators for keyboard-only navigation

### Form Integration
- Integration with form libraries for tab-based form sections
- Form control behavior within tab panels
- Form validation state management across tabs
- Tab-based wizard and multi-step form navigation
- Form data persistence when switching between tabs
- Error state handling and validation display per tab
- Form submission with active tab state tracking

### Edge Cases
- Null/undefined children handling without component crashes
- Empty label strings and whitespace-only labels
- Very large number of tabs with scrolling behavior
- Special characters in tab labels (symbols, punctuation, HTML entities)
- Unicode characters in labels (international text, emojis)
- Missing `onChange` handler graceful handling
- Rapid tab switching and state consistency
- Dynamic tab addition and removal during runtime
- Invalid value prop handling (out of range, non-numeric)
- Extreme content scenarios and layout stress testing

### Real-world Scenarios
#### Navigation Implementation
- Website navigation tabs with proper routing integration
- Dashboard navigation with icon and text combinations
- Multi-level navigation with nested tab structures

#### Content Management
- Controlled tab panels with conditional content rendering
- Dynamic content loading based on active tab
- Tab content lazy loading and performance optimization

#### Layout Integration
- Scrollable tabs for overflow handling with many options
- Full-width tabs for equal distribution across container
- Vertical orientation for sidebar navigation patterns
- Nested layout components (DsBox, DsGrid) integration
- Responsive behavior within different container sizes

#### Form Sections
- Container variant for form section organization
- Multi-step forms with tab-based navigation
- Form validation per tab section with error indicators

#### Theme Integration
- **Comprehensive cross-theme compatibility testing** across light, dark, and highContrast modes
- Theme-specific color application and design token integration
- Custom design system variables (border radius, spacing, colors)
- Theme data attributes verification (`data-mui-color-scheme`)
- Visual consistency across all themes and variants
- Theme provider integration and fallback behavior testing

### Snapshot Testing
#### Basic Component States
- Default tabs configuration with standard props
- Selected tab state with proper visual indicators
- Different orientations (horizontal, vertical) visual validation
- All MUI variants (standard, scrollable, fullWidth) snapshots
- Container variant (`ds-variant="container"`) visual verification

#### Color Variations
- Different color combinations (primary, secondary indicators and text)
- Theme-specific color applications across light/dark modes
- Custom color overrides with sx prop styling

#### State Combinations
- Disabled tabs visual appearance and interaction states
- Complex state combinations (selected + disabled, vertical + scrollable)
- Icon and text combination tabs with proper visual hierarchy

#### Real-world Usage
- Navigation scenario with realistic tab labels and content
- Form section implementation with container variant
- Custom styling applications with complex sx prop usage

## Props Validation

- **`children`** (`ReactNode`) - Tab components (DsTab) as child elements
- **`value`** (`number | string`) - Controlled active tab index or identifier
- **`onChange`** (`(event, newValue) => void`) - Tab selection change handler
- **`orientation`** (`'horizontal' | 'vertical'`) - Tab layout direction
- **`variant`** (`'standard' | 'scrollable' | 'fullWidth'`) - Tab display behavior
- **`indicatorColor`** (`'primary' | 'secondary'`) - Active tab indicator color
- **`textColor`** (`'primary' | 'secondary' | 'inherit'`) - Tab text color scheme
- **`scrollButtons`** (`'auto' | 'desktop' | 'on' | 'off'`) - Scroll button behavior
- **`ds-variant`** (`'container'`) - Custom design system variant with container styling
- **`sx`** (`SxProps`) - Custom styling with theme integration
- **`className`** (`string`) - Custom CSS class application
- **`id`** (`string`) - Unique identifier for the tabs component
- **ARIA attributes** - Accessibility labels and descriptions
- **Data attributes** - Custom data-* attributes for testing and analytics

## Integration Testing

- **DsTab Integration** - Individual tab component composition and interaction
- **DsBox Integration** - Layout and container component compatibility
- **Theme System** - Design system theme provider and token integration
- **Form Libraries** - Compatibility with form management solutions
- **Router Integration** - Navigation library compatibility for routing
- **Layout Components** - Grid and container system integration

## Performance Considerations

- **Lazy Loading** - Tab content rendering optimization
- **Virtual Scrolling** - Large tab list performance handling
- **Event Handler Optimization** - Efficient event delegation and handling
- **Re-render Prevention** - Proper memoization for performance-critical scenarios
- **Accessibility Performance** - Screen reader and assistive technology optimization


