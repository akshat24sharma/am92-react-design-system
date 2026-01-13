# DsNotistack Component Tests

## Overview

The `DsNotistack` test suite validates the notification provider component that wraps the notistack library for displaying toast notifications with custom DsToast components. The test suite contains 33 tests organized across 10 categories, ensuring comprehensive coverage of the component's provider functionality, notification management, and integration with the underlying notistack library.

## Test Validation & Improvements

The test suite has been reviewed and streamlined to focus on essential behavior validation:

### Current Structure:
- **Total Tests**: 29 tests across 10 categories
- **Test Approach**: Behavior-focused testing with actual user interactions
- **Hook Integration**: Uses `enqueueNotistack` function for consistent notification creation
- **MUI Integration**: Tests actual MUI Alert close button functionality

### Key Optimizations:
- **Simplified TestAppWithHook**: Removed custom close functionality, tests actual MUI close button
- **Enhanced Close Button Testing**: Tests real MUI `.MuiAlert-action` button interaction
- **Streamlined Provider Context**: Tests direct `enqueueNotistack` usage pattern
- **Theme Integration**: Comprehensive cross-theme testing with dynamic variant handling

## Component Architecture

`DsNotistack` consists of:

### Core Components
- **DsNotistackProvider**: Main provider component wrapping SnackbarProvider
- **Alert Components**: Variant-specific components (default, success, error, warning, info)
- **Utility Functions**: `enqueueNotistack`, `closeNotistack`, `generateKeyNotistack`, `useNotistack`

### Provider Configuration
- **Default Anchor**: `{ vertical: 'top', horizontal: 'center' }`
- **Duplicate Prevention**: Enabled by default with `preventDuplicate`
- **Custom Components**: Maps variants to custom DsToast alert components
- **Auto-hide Duration**: Configurable timing for notification dismissal

## Test Categories & Scenarios

### 1. Core Rendering (3 tests)
Tests fundamental provider rendering and context provision:
- Provider renders children correctly
- Handles empty children gracefully
- Provides notistack context to descendants

### 2. Props Validation (2 tests)
Validates provider prop handling and configuration:
- Custom autoHideDuration acceptance and application
- maxSnack limit configuration with default value of 3

### 3. Component States (1 test)
Tests notification variant management:
- Multiple notifications handling simultaneously

### 4. Component Functionality (3 tests)
Tests core notification provider functionality:
- Duplicate prevention mechanism
- Message-timestamp key format validation
- Programmatic notification dismissal using MUI Alert action button

### 5. Event Handling (1 test)
Validates user interaction and event management:
- Close button functionality through MUI Alert action

### 6. Accessibility (2 tests)
Ensures proper accessibility support:
- ARIA role provision for notifications
- Screen reader announcement verification

### 7. Edge Cases (5 tests)
Handles boundary conditions and error scenarios:
- Empty message notification display
- Undefined message handling
- Invalid variant graceful degradation
- Rapid successive notification management
- Invalid key handling with closeNotistack

### 8. Real-world Scenarios (2 tests)
Tests common usage patterns and workflows:
- Async operation success notifications
- Notification queue management

### 9. Theme Testing (5 tests)
Validates cross-theme functionality:
- Default, success, error, warning, and info variant notifications across all themes
- Theme configuration validation using PALETTE constants

### 10. Snapshot Testing (5 tests)
Provides visual regression testing:
- Default provider configuration snapshots
- Custom anchor origin configuration
- Custom autoHideDuration settings
- maxSnack configuration variations
- Cross-theme visual consistency## Test Implementation Details

### Provider Testing Strategy
The test suite focuses on provider functionality rather than individual toast components, testing:
- Provider context establishment and management
- Configuration prop handling and defaults
- Integration with underlying notistack library
- Custom component integration and rendering

### Notification Testing Approach
Tests validate notification lifecycle management:
- Enqueueing with various configurations
- Dismissal through multiple mechanisms
- Queue management and limitations
- Timing and auto-hide behavior

### Integration Testing Focus
Emphasizes provider integration points:
- Theme system compatibility
- Form submission workflows
- Accessibility compliance
- Error boundary and edge case handling

## Key Testing Utilities

### Test Components
- **TestApp**: Basic notification trigger component
- **TestAppWithProvider**: Custom provider configuration wrapper
- **TestAppWithHook**: useNotistack hook testing component using `enqueueNotistack` function
- **AsyncTestComponent**: Async operation simulation
- **FileUploadComponent**: Upload progress notification simulation

### Testing Patterns
- Provider wrapping for context testing
- User interaction simulation with userEvent
- Async notification timing validation
- Theme switching and validation
- Accessibility attribute verification
- MUI Alert action button testing for notification dismissal

## Expected Behavior Validation

### Notification Management
- Single duplicate prevention with same message/variant
- Unique key generation using message + timestamp format
- Proper queue management respecting maxSnack limits
- Graceful handling of edge cases and invalid inputs
- Notification dismissal through MUI Alert action buttons

### Provider Functionality
- Consistent context provision across component tree
- Theme-agnostic behavior maintenance
- Configuration prop merging and default application
- Integration with custom DsToast components
- Hook-based notification management using `enqueueNotistack` function

### Accessibility Compliance
- Proper ARIA role attribution for notifications
- Screen reader compatibility and announcements
- Keyboard navigation support for dismissal
- Focus management preservation during operations

This test suite ensures the `DsNotistack` provider component maintains reliable notification management functionality while integrating seamlessly with the design system's theming, accessibility, and user interaction requirements.