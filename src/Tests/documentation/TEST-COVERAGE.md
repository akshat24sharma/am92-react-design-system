# Test Documentation Index

## Components
- [DsAccordion](./Components/DsAccordion.md) - 52 tests across 10 categories
- [DsAvatar](./Components/DsAvatar.md) -  45 tests across 10 categories and theme testing
- [DsBadge](./Components/DsBadge.tests.md) - 59 tests across 12 categories with badge content handling, theme testing, and comprehensive snapshot coverage ✨
- [DsBottomSheet](./Components/DsBottomSheet.md) - 61 tests with modal behavior and theme testing
- [DsButton](./Components/DsButton.md) - 12 tests with form submission and icon handling
- [DsCheckbox](./Components/DsCheckbox.md) - 75 tests across 12 categories (Enhanced Theme Testing)
- [DsChip](./Components/DsChip.md) - 22 tests across 10 categories with theme testing and comprehensive snapshot coverage
- [DsDatePicker](./Components/DsDatePicker.md) - 61 tests across 12 categories with MUI X DatePicker integration, calendar interaction, and cancel functionality
- [DsDialog](./Components/DsDialog.md) - 68 tests across 11 categories with comprehensive theme and snapshot testing
- [DsDivider](./Components/DsDivider.md) - 29 tests across 10 categories with theme compatibility and snapshot coverage
- [DsDrawer](./components/DsDrawer.tests.md) - 54 tests across 12 categories with Material-UI integration, design system overrides, theme testing, and real-world drawer scenarios ✨
- [DsIconButton](./Components/DsIconButton.tests.md) - 66 tests across 10 categories with design system integration, theme testing, and snapshot testing ✨
- [DsInputAdornment](./Components/DsInputAdornment.md) -  56 tests across 11 categories and theme testing
- [DsInputBase](./Components/DsInputBase.tests.md) - 78 tests across 12 categories with comprehensive form functionality, custom variants (otp/search), theme testing, and real-world scenarios ✨
- [DsLink](./Components/DsLink.md) -  22 tests across 9 categories and theme testing
- [DsList](./Components/DsList.md) -  22 tests across 8 categories and theme testing
- [DsLoader](./Components/DsLoader.tests.md) - 38 tests across 9 categories (optimized from 48) with animation testing, theme compatibility, and error handling documentation ✅
- [DsMenu](./Components/DsMenu.md) - 21 tests across 7 categories with MUI Menu integration, portal rendering, and comprehensive accessibility testing 
- [DsMenuItem](./Components/DsMenuItem.md) -  49 tests across 10 categories and theme testing
- [DsOtp](./Components/DsOtp.md) - 64 tests across 13 categories and theme testing
- [DsProgressTracker](./Components/DsProgressTracker.tests.md) - 36 tests across 12 categories with stepper functionality, progress tracking, theme testing, and comprehensive variant coverage ✨
- [DsRadio](./Components/DsRadio.md) - 64 tests across 11 categories with radio group integration, optimized theme testing, and snapshot testing
- [DsRemixIcon](./Components/DsRemixIcon.md) -  25 tests across 7 categories and theme testing
- [DsSelect](./Components/DsSelect.md) -  67 tests across 12 categories (Enhanced Theme Testing)
- [DsSkeleton](./Components/DsSkeleton.md) -  46 tests across 9 categories and theme testing
- [DsSwitch](./components/DsSwitch.tests.md) - 66 tests across 12 categories with toggle functionality, comprehensive theme testing, and real-world scenarios 🎯 (49 passing, 17 requiring adjustment)
- [DsTab](./Components/DsTab.md) - 25 tests across 10 categories with container variant support, theme testing, and comprehensive interaction coverage
- [DsTable](./Components/DsTable.md) - 25 tests across 10 categories with theme testing and comprehensive snapshot coverage
- [DsTabs](./Components/DsTabs.md) - 57 tests across 11 categories and theme testing
- [DsTag](./Components/DsTag.md) -  26 tests across 10 categories and theme testing
- [DsTextField](./Components/DsTextField.md) - 78 tests across 15 categories with ref handling
- [DsToggle](./Components/DsToggle.md) - 52 tests across 12 categories with comprehensive theme testing and snapshot coverage 
- [DsTooltip](./Components/DsTooltip.md) -  36 tests across 10 categories and theme testing
- [DsAutocomplete](./Components/DsAutocomplete.md) - 31 tests across 13 categories and theme testing
- [DsTagGroup](./Components/DsTagGroup.md) - 46 tests across 12 categories and theme testing
- [DsBottomNavigation](./Components/DsBottomNavigation.md) - 43 tests across 12 categories and theme testing
- [DsAppBar](./Components/DsAppBar.md) - 51 tests across 11 categories and theme testing
- [DsTextFieldPassword](./Components/DsTextFieldPassword.md) - 43 tests across 12 categories and theme testing
- [DsInputLabel](./Components/DsInputLabel.md) - 47 tests across 12 categories and theme testing
- [DsFileUploader](./Components/DsFileUploader.md) - 41 tests across 12 categories and theme testing

## Running Tests
```bash
npm test                 # Run all tests
npm run test:coverage    # Generate coverage report
npm run test:ui          # Run tests with Vitest UI
npm run test:watch       # Run tests in watch mode
npm run test:single      # Run single test file
```

## Testing with Design System Theme 🎯
All tests now **automatically include your design system theme** by default:

```tsx
// ✅ New Way - Auto-includes light theme
import { render, screen } from '../../Tests/Mocks/testUtils';
render(<DsCheckbox />); // Uses secondary color (design system default)

// ✅ Test different themes  
render(<DsCheckbox />, { colorScheme: 'dark' });

// ✅ Edge case - no theme
import { renderWithoutTheme } from '../../Tests/Mocks/testUtils';
renderWithoutTheme(<DsCheckbox />); // Uses primary color (MUI default)
```

See [TESTING_GUIDELINES.md](./TESTING_GUIDELINES.md) for complete documentation.

## Coverage Reports
The coverage infrastructure generates multiple report formats:
- **HTML Report**: `coverage/index.html` - Interactive browser-based coverage explorer
- **Text Report**: Terminal output with summary table
- **LCOV Report**: `coverage/lcov.info` - For IDE integrations and CI/CD
- **JSON Report**: `coverage/coverage-final.json` - Machine-readable coverage data

### Viewing Coverage
1. Run: `npm run test:coverage`
2. Open: `coverage/index.html` in your browser
3. Browse by file/folder to see line-by-line coverage
4. Red lines = uncovered, green lines = covered

## Test Statistics
- **Total Components Documented:** 43
- **Total Tests:** 2026 across all tested components
- **Testing Framework:** Vitest with jsdom environment
- **Testing Library:** React Testing Library + userEvent
- **Theme Testing Coverage:** Complete (light, dark, highContrast)
- **Modern MUI Patterns:** slotProps system, deprecated pattern support
- **Overall Coverage:** 57.84% statements, 73.19% branches, 17.85% functions
- **Component Coverage Target:** 90% (currently not met)
- **Global Coverage Target:** 80% (currently not met)

## Test Guidelines
1. Each component should have its own test file
2. Test files should follow the pattern: `ComponentName.test.tsx`
3. Tests should cover:
   - **Core Rendering** - Basic component display and prop handling
   - **Props Validation** - All component props and their variants (including slotProps)
   - **Component States** - Different states (disabled, error, success, checked, etc.)
   - **MUI Styling** - Material-UI specific classes and themes
   - **Component Functionality** - Core behaviors and interactions
   - **Event Handling** - User interactions (click, keyboard, focus, etc.)
   - **Form Integration** - Form behavior, validation, and data collection
   - **Accessibility** - ARIA attributes, keyboard navigation, screen readers
   - **Edge Cases** - Unusual scenarios and boundary conditions
   - **Real-world Scenarios** - Common usage patterns and integrations
   - **🎨 Theme Testing** - **MANDATORY** - All theme modes (light, dark, highContrast)
   - **📸 Snapshot Testing** - **MANDATORY** - Visual regression protection
4. **🚨 CRITICAL RULES:**
   - **NEVER use hardcoded colors** in theme tests
   - **ALWAYS test all three themes** (light, dark, highContrast)
   - **ALWAYS use design system components** in tests (never raw HTML)
   - **ALWAYS use explicit imports** for theme testing utilities

## Testing Patterns
- Use `@vitest-environment jsdom` for component testing
- Prefer `userEvent` over `fireEvent` for realistic interactions
- Use semantic queries (`getByRole`, `getByLabelText`) when possible
- Test accessibility compliance (ARIA attributes, keyboard navigation)
- Include comprehensive prop testing with TypeScript types
- Document Material-UI specific testing patterns
- Test both controlled and uncontrolled component behaviors
- **🎨 Use explicit theme testing imports:** `import { renderWithTheme, testAllThemes } from "../../Tests/Mocks/themeTestUtils"`
- **📸 Always include comprehensive snapshot testing** as final test category
- **🚨 Never use hardcoded colors** - use `getColorScheme(PALETTE)` for theme validation

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
- Use class-based queries for MUI components: `.MuiButton-root`, `.MuiTextField-root`, `.MuiCheckbox-root`
- Test theme integration and color variants across light, dark, and highContrast modes
- Validate accessibility features provided by MUI
- Handle collapsed/expanded states in complex components
- **Modern slotProps system testing** instead of deprecated inputProps patterns
- **CSS Variables theme testing** with `data-mui-color-scheme` attributes
- **Direct theme configuration usage** via `getColorScheme(PALETTE)` function

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
1. Follow the established 12-category testing framework (enhanced from original 10)
2. Create corresponding documentation in `Components/` folder following DsCheckbox.md pattern
3. Update this index with component test statistics
4. Ensure all tests pass before committing changes
5. **🎨 MANDATORY: Include comprehensive theme testing** across light, dark, and highContrast modes
6. **📸 MANDATORY: Include snapshot testing** for visual regression protection
7. **🚨 CRITICAL: Never use hardcoded colors** - always use actual theme configuration
8. **✅ REQUIRED: Use design system components** exclusively in test scenarios

---
*Last updated: December 2, 2025*