# Test Documentation Index

## Components
- [DsAccordion](./Components/DsAccordion.md) - 53 tests across 10 categories
- [DsButton](./Components/DsButton.md) - Basic component testing coverage
- [DsTextField](./Components/DsTextField.md) - 80 tests across 15 categories

## Running Tests
```bash
npm test                 # Run all tests
npm run test:coverage    # Generate coverage report
npm run test:vitest      # Run specific component tests with Vitest
```

## Test Statistics
- **Total Components Documented:** 3
- **Total Tests:** 133+ across all documented components
- **Testing Framework:** Vitest with jsdom environment
- **Testing Library:** React Testing Library + userEvent

## Test Guidelines
1. Each component should have its own test file
2. Test files should follow the pattern: `ComponentName.test.tsx`
3. Tests should cover:
   - **Core Rendering** - Basic component display and prop handling
   - **Props Validation** - All component props and their variants
   - **Component States** - Different states (disabled, error, success, etc.)
   - **MUI Styling** - Material-UI specific classes and themes
   - **Component Functionality** - Core behaviors and interactions
   - **Event Handling** - User interactions (click, keyboard, focus, etc.)
   - **Accessibility** - ARIA attributes, keyboard navigation, screen readers
   - **Edge Cases** - Unusual scenarios and boundary conditions
   - **Real-world Scenarios** - Common usage patterns and integrations
   - **Performance** - Component mounting and rendering optimization

## Testing Patterns
- Use `@vitest-environment jsdom` for component testing
- Prefer `userEvent` over `fireEvent` for realistic interactions
- Use semantic queries (`getByRole`, `getByLabelText`) when possible
- Test accessibility compliance (ARIA attributes, keyboard navigation)
- Include comprehensive prop testing with TypeScript types
- Document Material-UI specific testing patterns
- Test both controlled and uncontrolled component behaviors

## Testing Tools & Framework

### Core Testing Stack
- **Vitest** - Fast unit test runner with jsdom environment
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - Realistic user interaction simulation
- **jsdom** - DOM implementation for testing environment

### Query Strategies
- `screen.getByRole()` - Preferred for accessible element selection
- `screen.getByText()` - Content-based element finding
- `screen.getByTestId()` - Fallback for complex scenarios
- `document.querySelector()` - Direct DOM queries for MUI classes

### Material-UI Testing Patterns
- Use class-based queries for MUI components: `.MuiButton-root`, `.MuiTextField-root`
- Test theme integration and color variants
- Validate accessibility features provided by MUI
- Handle collapsed/expanded states in complex components

## Best Practices

### Test Organization
- Group tests by functionality using `describe()` blocks
- Use descriptive test names that explain the expected behavior
- Include both positive and negative test cases
- Test error boundaries and edge conditions

### Component Testing Standards
- Test all public props and their effects
- Verify accessibility compliance (WCAG guidelines)
- Test keyboard navigation and focus management
- Validate form integration and submission behavior
- Include performance considerations for large datasets

### Documentation Standards
- Maintain test documentation alongside component development
- Include prop coverage with TypeScript types
- Document testing patterns for reuse across components
- Track test metrics and coverage reports

## Contributing
When adding new component tests:
1. Follow the established 10-category testing framework
2. Create corresponding documentation in `Components/` folder
3. Update this index with component test statistics
4. Ensure all tests pass before committing changes

---
*Last updated: November 10, 2025*