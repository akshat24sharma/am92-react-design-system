# DsList Test Coverage

## Test File Location

`src/Tests/documentation/Components/DsList.test.tsx`

## Test Cases

### Core Rendering
- Basic component rendering with default props
- Rendering list items from an array of data
- Handling empty data gracefully
- Rendering nested lists with parent and child items

### Props Validation
- Handling of `className`
- Handling of `disablePadding` when set to true and false
- Handling of custom data attributes
- Handling of `dense` prop for compact spacing
- Handling of `button` prop for interactive list items
- Handling of `selected` and `disabled` props on list items

### Styling
- Application of default MUI classes for `list` and `listitem`
- Application of subheader classes for `list`
- Custom inline styles applied to the `DsList` component

### Event Handling
- Handling click events on list items
- Ensuring event handlers are called the correct number of times

### Edge Cases
- Empty `items` array handling
- Very long text as list items
- Very large data sets (1000+ items)
- Nested lists with multiple levels of hierarchy

### Snapshot Testing
- Default rendering of `DsList`
- Rendering with `dense` prop
- Rendering nested lists
- Rendering with custom inline styles
- Rendering across all themes (`light`, `dark`, `highContrast`)