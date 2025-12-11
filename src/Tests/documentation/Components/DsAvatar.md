# DsAvatar Test Coverage

## Test File Location
`src/Components/DsAvatar/DsAvatar.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with basic props
- Text variant with children content display
- Icon variant with DsRemixIcon integration
- Image source rendering with proper attributes
- Fallback content when image fails to load
- Error handling for missing or invalid props

### Props Validation
- Custom `ds-size` prop with all valid values (S, M, L, XL, XXL, 3XL)
- Custom `ds-variant` prop with valid values (text, icon, undefined)
- All MUI Avatar props forwarding (id, className, sx, title)
- Alt text handling for screen readers
- Image source (src) attribute validation
- Custom data attributes propagation

### Component States
- Text content display when no image provided
- Empty children graceful handling
- Complex children content support (nested components)
- Image prioritization over children when both provided
- Fallback behavior on image load errors
- Various content types (text, icons, complex elements)

### MUI Styling
- Default MUI Avatar classes application
- Circular shape class by default
- Square variant support via MUI props
- Custom sx prop styling integration
- Color variant handling with theme colors
- CSS-in-JS integration with Material-UI theming
- Design system size mapping

### Event Handling
#### Click Events
- onClick event handling with proper parameters
- Event object validation and callback execution
- Interactive avatar behavior patterns

#### Keyboard Events
- onKeyDown event handling for accessibility
- Enter key activation support
- Focus management with Tab navigation
- Keyboard interaction patterns

#### Mouse Events
- onMouseEnter event handling
- onMouseLeave event handling  
- Hover state interactions
- Touch event compatibility

### Accessibility
- Proper img role for image avatars
- Custom ARIA labels support (aria-label)
- Alt text for screen readers (alt attribute)
- Focusable behavior when interactive
- ARIA describedby relationships
- Keyboard navigation support
- Screen reader compatibility

### Edge Cases
- Null children graceful handling
- Undefined children graceful handling
- Empty string children support
- Very long text content overflow handling
- Special characters in content (!@#$%^&*)
- Unicode characters support (🚀 测试 ñáéíóú αβγδε)
- Invalid image URLs graceful handling with console error suppression

### Theme Testing
- Consistent rendering across all themes (light, dark, highContrast)
- Theme color schemes proper application
- CSS Variables integration with data-mui-color-scheme
- Theme switching functionality preservation
- Without theme provider edge case handling

### Real-world Scenarios
#### User Profile Avatar
- Profile picture display with clickable interaction
- Name association and layout integration
- Click handler for profile navigation

#### Avatar Groups/Lists  
- Multiple avatar rendering in lists
- ARIA labels for individual identification
- Initials display patterns

#### Size Comparison Context
- Different sizes in same component hierarchy
- Visual consistency across size variants
- Layout integration with various sizes

#### Clickable Team Member Avatar
- Interactive avatar with keyboard support
- Click and Enter key activation
- Accessibility compliance for team interfaces

### Snapshot Testing
#### Basic States
- Default props snapshot
- All size variants (S through 3XL)
- All variant types (text, icon, default)

#### Theme Coverage
- Theme-specific snapshots across all modes
- Color consistency validation
- Visual regression prevention

#### Content Types
- Image source snapshot
- Complex content structure snapshot
- Various content type documentation

## Props Coverage

- **`ds-size`** (`'S'` | `'M'` | `'L'` | `'XL'` | `'XXL'` | `'3XL'`) - Avatar size variant
- **`ds-variant`** (`'text'` | `'icon'` | `undefined`) - Content type variant
- **`src`** (`string`) - Image source URL for image avatars
- **`alt`** (`string`) - Alternative text for image accessibility
- **`children`** (`React.ReactNode`) - Avatar content (text, icons, elements)
- **`id`** (`string`) - Unique identifier for the avatar element
- **`className`** (`string`) - Additional CSS classes for styling
- **`sx`** (`object`) - Custom styling object for Material-UI theming
- **`title`** (`string`) - Tooltip text for hover information
- **`variant`** (`'circular'` | `'square'` | `'rounded'`) - MUI Avatar shape variant
- **`onClick`** (`(event: React.MouseEvent) => void`) - Click event handler
- **`onKeyDown`** (`(event: React.KeyboardEvent) => void`) - Keyboard event handler
- **`onMouseEnter`** (`(event: React.MouseEvent) => void`) - Mouse enter event handler
- **`onMouseLeave`** (`(event: React.MouseEvent) => void`) - Mouse leave event handler
- **`aria-label`** (`string`) - ARIA label for accessibility
- **`aria-describedby`** (`string`) - ARIA describedby relationship
- **`tabIndex`** (`number`) - Tab order for keyboard navigation
- **`style`** (`object`) - Inline styles for custom appearance

## Testing Patterns Established

### Avatar Testing Strategies
- Class-based queries (`document.querySelector(".MuiAvatar-root")`)
- Text content queries for text variants
- Image role queries for image avatars
- Test ID queries for reliable element selection
- Event simulation with realistic user interactions

### Theme Testing Methodology
- **ALWAYS use testAllThemes utility** - Consistent theme coverage
- **Complete theme coverage** - Test light, dark, AND highContrast modes
- **CSS class validation** - Test class application instead of computed styles
- **Theme context verification** - Ensure data-mui-color-scheme attributes

### Content Testing Strategies
- Text content validation with toHaveTextContent
- Image attribute verification (src, alt)
- Complex children structure testing
- Fallback behavior validation
- Content prioritization testing

### Event Testing Patterns
- userEvent simulation for realistic interactions
- Event callback validation with vi.fn() mocks
- Keyboard and mouse event comprehensive coverage
- Focus management testing
- Type assertion for HTMLElement interactions

### Accessibility Validation
- ARIA attribute verification across all states
- Keyboard navigation pattern testing
- Screen reader compatibility validation
- Focus management verification
- Alternative text and labeling validation

### Snapshot Testing Strategy
- Comprehensive size and variant coverage
- Theme-specific visual regression protection
- Real-world usage pattern documentation
- Design system component integration verification

## Testing Architecture Innovations

### Design System Integration
- Exclusive use of design system size variants (ds-size)
- Design system variant system (ds-variant)
- Integration with DsRemixIcon, DsBox, DsTypography
- Consistent component composition patterns

### Modern Testing Patterns
- TypeScript-safe element selection with type assertions
- Comprehensive edge case handling
- Error suppression for graceful failure testing
- Theme provider edge case coverage

### Avatar-Specific Testing
- Image loading and fallback behavior
- Content prioritization logic
- Size variant visual consistency
- Interactive avatar patterns for user interfaces

### Test Efficiency Optimizations
- Parameterized testing for size and variant coverage
- Consolidated theme testing with testAllThemes
- Bulk testing utilities for consistent validation
- Snapshot-driven regression prevention
