# DsHeader Test Coverage

## Test File Location
`src/Components/DsHeader/DsHeader.test.tsx`

## Component Overview
DsHeader is a layout composition component that provides a flexible header structure with logo support and children positioning. It serves as a container for navigation elements, branding, and user interface controls typically found in application headers.

## Test Cases (22 Tests - Optimized Coverage)

### Core Rendering (2 tests)
- logoUrl prop rendering with DsImage integration
- Children rendering within positioned container

### Props Validation (3 tests)
- Custom BoxProps application to children container
- Custom StackProps application to children stack layout
- Handling both logoUrl and logo props simultaneously

### Component States (3 tests)
- Empty state with no logo or children
- logoUrl-only state with image rendering
- Children-only state without logo

### MUI Styling (1 test)
- MUI styling and design system variables integration with proper CSS class application

### Component Functionality (4 tests)
- DsImage rendering with correct props when logoUrl provided
- Logo element rendering when custom logo provided
- Missing/empty logoUrl graceful handling
- Logo prop and logoUrl prop combination behavior

### Accessibility (1 test)
- Proper accessibility structure and keyboard navigation for interactive elements

### Edge Cases (3 tests)
- Null/undefined logoUrl handling without crashes
- Null children handling without crashes
- Complex logo elements with multiple components

### Real-world Scenarios (2 tests)
- Typical navigation header with logo and menu icon
- Header with custom logo component and navigation buttons

### Snapshot Testing (3 tests)
- Default props visual regression protection
- logoUrl-only configuration snapshot
- Full configuration with all props snapshot

## Design System Integration

### Layout Composition
- **Main Container**: DsBox with responsive height variables
- **Children Container**: DsBox with absolute positioning
- **Children Layout**: DsStack for flexible child arrangement
- **Logo Integration**: DsImage component with proper srcSet handling

### CSS Variable Usage
- **Height Variables**: `var(--ds-rules-headerMobileHeight)` and `var(--ds-rules-headerDesktopHeight)`
- **Background Color**: `var(--ds-colour-surfacePrimary)`
- **Elevation**: `var(--ds-elevation-3)`
- **Spacing Variables**: `var(--ds-spacing-cool)`, `var(--ds-spacing-mild)`, etc.

### Responsive Design
- **Mobile/Desktop Heights**: Responsive height adjustment via MUI breakpoints
- **Spacing Adaptation**: Responsive padding for different screen sizes
- **Overflow Handling**: Hidden overflow for clean header appearance

## Testing Strategy

### No Theme Testing
DsHeader **does not include theme testing** because:
- **Layout Component**: Focuses on structural composition, not color theming
- **CSS Variables Only**: Uses design system CSS variables that are theme-agnostic
- **No Theme-Dependent Styling**: Component behavior doesn't change across themes
- **Composition Pattern**: Acts as a container for other themed components

This follows the established pattern for simple layout components that don't have theme-specific behaviors.

### Props Testing Focus
- **logoUrl vs logo**: Testing the conditional rendering logic
- **BoxProps/StackProps**: Testing proper prop forwarding to sub-components
- **sx Prop Merging**: Ensuring custom styles integrate with design system styles
- **Children Handling**: Testing flexible content composition

### Integration Testing
- **DsImage Integration**: Testing logo image rendering with proper props
- **DsStack Integration**: Testing children layout management
- **DsBox Integration**: Testing container styling and positioning

## Coverage Report

The DsHeader test suite provides **optimized coverage with 22 tests** across **8 categories**, focusing on essential layout composition, prop handling, and component integration while eliminating redundant tests.

### Testing Approach
- **Composition Focus**: Tests core component assembly and layout behavior
- **Essential Prop Validation**: Streamlined testing of critical prop combinations
- **Integration Testing**: Tests key interactions with sub-components (DsImage, DsStack, DsBox)
- **Real-world Scenarios**: Tests most common usage patterns for navigation headers
- **Optimized Coverage**: Removed redundant tests while maintaining comprehensive functionality coverage

### Coverage Scope
- **Tested**: Essential layout composition, critical prop handling, conditional rendering, accessibility, key edge cases
- **Optimized**: Removed redundant styling tests, duplicate prop validations, and excessive snapshot variations
- **Not Tested**: Theme variations (not applicable for layout components), complex interaction patterns

## Helper Functions (Minimal Overhead)

### Testing Utilities
The tests use standard testing utilities without custom helpers to maintain clarity:
- **`screen.getByRole()`**: For finding interactive elements
- **`document.querySelector()`**: For DOM structure validation
- **`container.firstChild`**: For main component element access
- **`toHaveClass()`**: For MUI CSS class validation

### Validation Patterns
- **MUI Class Validation**: Verifying proper MUI component integration
- **Conditional Rendering**: Testing logo and children display logic
- **Prop Forwarding**: Ensuring custom props reach target components
- **Structure Validation**: Confirming proper DOM hierarchy

## Technical Implementation

### Architecture
- Layout composition component combining DsBox containers and DsStack layout
- Conditional rendering for logoUrl (DsImage) and logo (custom element)
- Absolute positioning for children container to enable flexible positioning
- Responsive design via MUI breakpoint system

### Testing Approach
- **DOM Structure Testing**: Validates proper component hierarchy
- **Conditional Logic Testing**: Tests logo rendering logic
- **Prop Integration Testing**: Tests custom prop forwarding
- **Accessibility Testing**: Ensures proper semantic structure

### Design Decisions
- **No Complex State**: Pure functional component with no internal state
- **Flexible Children**: Accepts any React element as children
- **Dual Logo Support**: Supports both URL-based images and custom logo elements
- **Responsive Positioning**: Automatic adaptation to mobile/desktop layouts

## Component Usage Patterns

### Basic Header with Logo
```tsx
<DsHeader logoUrl="https://example.com/logo.svg" />
```

### Header with Menu Icon
```tsx
<DsHeader logoUrl="https://example.com/logo.svg">
  <DsRemixIcon className="ri-menu-line" />
</DsHeader>
```

### Header with Custom Logo and Actions
```tsx
<DsHeader logo={<CustomLogo />}>
  <DsButton>Profile</DsButton>
</DsHeader>
```

### Header with Responsive Behavior
```tsx
<DsHeader 
  logoUrl="https://example.com/logo.svg"
  BoxProps={{ sx: { display: { xs: 'none', md: 'block' } } }}
>
  <DsRemixIcon className="ri-menu-line" />
</DsHeader>
```

## Quick Reference

**Test Command**: `npm test -- DsHeader.test.tsx`

**Total Coverage**: 22 tests across 8 categories (optimized from 46)

**Key Features**: Layout composition, logo rendering, children positioning, responsive design, accessibility support

**Component Type**: Layout composition component with conditional logo rendering and flexible children support

---
*Last updated: December 22, 2025*