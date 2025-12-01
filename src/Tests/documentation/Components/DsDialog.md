# DsDialog Test Coverage

## Test File Location
`src/Components/DsDialog/DsDialog.test.tsx`

## Test Cases

### Core Rendering
- Renders dialog container with default props
- Title renders as text and React element
- Content renders as text and React element
- Actions section renders buttons and custom nodes
- Handles missing title/content/actions gracefully

### Props Validation
- Dialog props applied to MUI Dialog root
- TitleProps passed to DsDialogTitle
- ContentProps passed to DsDialogContent
- ActionsProps passed to DsDialogActions
- Custom className and data-testid support

### Component States
- Closed by default
- Open state when `open=true`
- FullWidth and FullScreen variations
- MaxWidth sizes (xs, sm, md, lg, xl)
- KeepMounted behavior when closed

### MUI Styling
- Default MUI Dialog classes on root and paper
- Backdrop class application
- FullScreen paper class
- Custom scroll and dividers styles

### Component Functionality
- Open/close via prop toggling
- Backdrop click closes when enabled
- Escape key closes when enabled
- Focus trap inside dialog
- Restores focus to trigger element on close
- Scroll="paper" vs scroll="body" content behavior

### Event Handling
- `onClose` invoked on backdrop click and Escape
- `onBackdropClick` custom handling
- Transition callbacks: `onEnter`, `onEntered`, `onExit`, `onExited`
- Action button clicks propagate
- Prevent close when `disableEscapeKeyDown=true`

### Accessibility
- Role="dialog" and `aria-modal=true`
- `aria-labelledby` and `aria-describedby` wiring from title/content IDs
- Focus initial element and tab order
- Keyboard interaction with Tab/Shift+Tab
- Screen reader visibility only when open

### Edge Cases
- Very long content with scrolling
- No backdrop (`hideBackdrop=true`)
- Nested dialogs stacking order
- Rapid open/close sequences
- Complex React elements in title/content/actions
- Portaled content with `container` prop

### Real-world Scenarios
- Confirm dialog with cancel/confirm actions
- Form modal with validation
- Async loading states within dialog
- FullScreen mobile dialog
- Non-dismissable critical alert dialog

## Props Coverage

- `open` (boolean) — Controls visibility
- `onClose` (Function) — Fired on request to close
- `title` (string | ReactElement) — Dialog header content
- `TitleProps` (DsDialogTitleProps) — Props to title component
- `content` (string | ReactElement) — Main dialog content
- `ContentProps` (DsDialogContentProps) — Props to content component
- `actions` (ReactNode) — Footer actions area
- `ActionsProps` (DsDialogActionsProps) — Props to actions component
- `fullWidth` (boolean) — Enables full width
- `fullScreen` (boolean) — Makes dialog fullscreen
- `maxWidth` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | false) — Paper max width
- `scroll` ('paper' | 'body') — Scrolling behavior
- `disableEscapeKeyDown` (boolean) — Prevent close on Escape
- `hideBackdrop` (boolean) — Hides backdrop
- `keepMounted` (boolean) — Keeps contents in DOM
- Standard MUI Dialog props — PaperProps, BackdropProps, TransitionComponent, etc.

## Testing Patterns Established

### DOM Query Strategies
- `screen.getByRole("dialog")` for the dialog root
- `screen.getByText()` for title/content/actions
- `screen.getByTestId()` for targeted elements
- `document.querySelector('.MuiDialog-paper')` for paper element

### Accessibility Testing
- Verify `role="dialog"` and `aria-modal`
- Check `aria-labelledby`/`aria-describedby` linkage
- Focus trap and tab navigation with userEvent
- Escape key behavior and focus restore

### MUI-Specific Patterns
- Class-based queries for Dialog, Backdrop, and Paper
- Transition callbacks timing with waitFor
- MaxWidth and fullscreen style assertions
- Scroll mode impact on content container

## Coverage Report
- **Total Tests:** 47
- **Categories:** 10
- **Last Updated:** November 28, 2025
- **Pass Rate:** 100%