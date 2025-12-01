# DsLink Test Coverage

## Test File Location
`src/Components/DsLink/DsLink.test.tsx`

## Test Cases

### Core Rendering
- Default component rendering with basic props.
- Rendering with `children` content.
- Rendering without `children` to ensure graceful handling.

### Props Validation
- `href` prop:
    - Correctly sets the link's URL.
    - Handles invalid or missing URLs gracefully.
- `target` prop:
    - Opens the link in a new tab when set to `_blank`.
    - Defaults to `_self` when not provided.
- `rel` prop:
    - Applies `noopener noreferrer` for security when `target="_blank"`.
    - Handles custom `rel` values correctly.
- `children` prop:
    - Renders the correct content inside the link.
    - Handles non-string content (e.g., JSX elements).

### Component Functionality
- Click interaction:
    - Navigates to the correct URL on click.
    - Prevents navigation when `href` is not provided.
- Keyboard interaction:
    - Focusable via the `Tab` key.
    - Activates the link on `Enter` key press.

### Accessibility
- Proper role assignment:
    - Ensures the link has the `role="link"` attribute.
- ARIA attributes:
    - Supports `aria-label` for screen readers.
    - Handles `aria-labelledby` for label association.
- Keyboard navigation:
    - Focus management with `Tab` and `Shift+Tab`.
    - Activation via `Enter` key.
- Screen reader compatibility:
    - Verifies that the link is announced correctly.

### Edge Cases
- Missing `href` prop:
    - Ensures the component renders without crashing.
    - Prevents navigation when `href` is not provided.
- Invalid `target` or `rel` values:
    - Graceful handling of unexpected values.
- Empty `children`:
    - Renders an empty link without errors.

### Snapshot Testing
#### Basic States
- Default rendering with `href` and `children`.
- Rendering with `target="_blank"` and `rel="noopener noreferrer"`.
- Rendering with custom `rel` values.
- Rendering without `children`.

#### Accessibility States
- Focused state snapshot.
- Keyboard navigation state snapshot.

### Real-world Scenarios
#### External Link
- Opens an external website in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

#### Internal Navigation
- Navigates within the application using relative URLs.

#### Button-like Link
- Renders a link styled as a button for accessibility.

## Props Coverage

- **`href`** (`string`) - The URL to navigate to when clicked.
- **`target`** (`string`) - Specifies where to open the linked document. Default is `_self`.
- **`rel`** (`string`) - Specifies the relationship between the current document and the linked document.
- **`children`** (`node`) - The content to be displayed inside the link.

## Testing Patterns Established

### Link Testing Strategies
- Role-based queries (`getByRole("link")`).
- State validation via ARIA attributes.
- Event simulation with realistic user interactions.

### Accessibility Validation
- ARIA attribute verification across all states.
- Keyboard navigation pattern testing.
- Screen reader compatibility validation.
- Focus management verification.

### Snapshot Testing 
- Comprehensive state coverage with named snapshots.
- Real-world usage pattern documentation.


This test suite ensures that the `DsLink` component is robust, accessible, and reliable for use across the AM92 React Design System.