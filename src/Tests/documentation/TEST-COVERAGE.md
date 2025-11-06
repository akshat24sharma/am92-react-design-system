# Test Documentation Index

## Components
- [DsButton](./components/DsButton.md)

## Running Tests
```bash
npm test                 # Run all tests
npm run test:coverage    # Generate coverage report
```

## Test Guidelines
1. Each component should have its own test file
2. Test files should follow the pattern: `ComponentName.test.tsx`
3. Tests should cover:
   - Rendering
   - Props validation
   - User interactions
   - Accessibility
   - Edge cases