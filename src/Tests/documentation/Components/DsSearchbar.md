# DsSearchbar Component Test Documentation

## Overview
The DsSearchbar component is a class component that extends DsAutocomplete functionality for search-specific use cases. It provides a search input with autocomplete capabilities, custom onChange handling, and search-specific styling.

## Test Summary
- **Total Tests**: 33
- **Test Categories**: 11
- **All Tests Passing**: ✅
- **Theme Coverage**: Complete (light, dark, high contrast)
- **Snapshot Coverage**: Complete

## Component Architecture
```tsx
<DsSearchbar
  name={string}                    // Required - form field identifier
  onChange={(name, value) => {}}   // Required - custom onChange signature
  options={Array<any>}             // Required - search options array
  placeholder={string}             // Optional - search input placeholder
  startAdornmentProps={object}     // Optional - search icon customization
  value={any}                      // Optional - controlled component value
  disabled={boolean}               // Optional - disable search functionality
  getOptionLabel={(option) => {}}  // Optional - label extraction for objects
  {...DsAutocompleteProps}         // All other DsAutocomplete props
/>
```

## Test Categories

### 1. Core Rendering (6 tests)
**Purpose**: Verify basic component rendering and search-specific features
- ✅ Renders with required props (name, onChange, options)
- ✅ Default placeholder ("Search here") functionality
- ✅ Custom placeholder handling
- ✅ Search icon start adornment display (ri-search-line)
- ✅ Search variant input base styling (ds-variant="search")
- ✅ FullWidth autocomplete functionality by default

**Key Insights**: Component maintains search-specific defaults while extending autocomplete functionality.

### 2. Props Validation (2 tests)
**Purpose**: Ensure custom props and behavior work correctly
- ✅ Custom onChange handler with (name, value) signature validation
- ✅ Custom startAdornmentProps application and testing

**Key Insights**: Core differentiator is the custom onChange signature that transforms MUI's standard callback.

### 3. Component States (3 tests)
**Purpose**: Test different component states and value handling
- ✅ Disabled state handling
- ✅ Controlled value state management
- ✅ Null value graceful handling (empty string display)

**Key Insights**: Component handles all standard form input states while maintaining search functionality.

### 4. Custom Paper Component (1 test)
**Purpose**: Verify custom dropdown paper styling
- ✅ Paper component with custom horizontal spacing (glacial margin)

**Key Insights**: Dropdown uses custom spacing for better visual integration.

### 5. Search Functionality (4 tests)
**Purpose**: Test core search and autocomplete behavior
- ✅ Option filtering based on typed input
- ✅ onChange callback execution on option selection
- ✅ Clear button functionality when value is present
- ✅ Complex object options with getOptionLabel support

**Key Insights**: Full autocomplete functionality with search-optimized defaults (autoHighlight, no popup icon).

### 6. Event Handling (2 tests)
**Purpose**: Test keyboard navigation and user interactions
- ✅ Keyboard navigation and selection (arrow keys + enter)
- ✅ Dropdown closing on Escape key press

**Key Insights**: Standard keyboard accessibility maintained from underlying autocomplete.

### 7. Form Integration (1 test)
**Purpose**: Test form integration and controlled component behavior
- ✅ Controlled component behavior with value updates and synchronization

**Key Insights**: Component works correctly as a controlled form input with proper state management.

### 8. Accessibility (2 tests)
**Purpose**: Ensure WCAG compliance and screen reader support
- ✅ Proper ARIA attributes for combobox behavior (aria-autocomplete, aria-expanded)
- ✅ Accessible option list when opened (listbox role, option roles)

**Key Insights**: Component maintains full accessibility through underlying MUI Autocomplete.

### 9. Edge Cases (3 tests)
**Purpose**: Test boundary conditions and error handling
- ✅ Empty options array graceful handling (no crash, still interactive)
- ✅ Special characters in option selection (preserves characters correctly)
- ✅ Large option lists performance (tested with 1000+ items)

**Key Insights**: Component is robust and handles edge cases without performance degradation.

### 10. Theme Testing (3 tests)
**Purpose**: Verify design system theme compatibility
- ✅ Proper theme application across color schemes (data-mui-color-scheme validation)
- ✅ **Actual palette value validation** (validates against real theme colors)
- ✅ Consistent functionality across all themes (light, dark, highContrast)

**Key Insights**: Full theme integration with proper color inheritance and cross-theme consistency.

### 11. Snapshot Testing (6 tests)
**Purpose**: Visual regression protection
- ✅ Default props configuration snapshot
- ✅ Custom placeholder snapshot
- ✅ Controlled value snapshot
- ✅ Disabled state snapshot
- ✅ Complex options (object array) snapshot
- ✅ Cross-theme snapshots (light, dark, highContrast)

**Key Insights**: Comprehensive visual regression coverage for major configurations.

## Test Scenarios Covered

### Happy Path Scenarios
1. **Basic Search Input**
   ```tsx
   <DsSearchbar
     name="search"
     onChange={(name, value) => {}}
     options={['iPhone', 'iPad']}
   />
   ```
   - Default placeholder and search icon
   - Option filtering on type
   - Custom onChange signature

2. **Product Search with Objects**
   ```tsx
   <DsSearchbar
     name="product-search"
     onChange={(name, value) => {}}
     options={products}
     getOptionLabel={product => product.name}
   />
   ```
   - Complex object handling
   - Custom label extraction
   - Object value in onChange callback

3. **Controlled Search Component**
   ```tsx
   <DsSearchbar
     name="search"
     value={searchValue}
     onChange={(name, value) => setSearchValue(value)}
     options={filteredOptions}
   />
   ```
   - Controlled component pattern
   - External state management
   - Value synchronization

### Edge Cases Tested
1. **Empty State Handling**
   ```tsx
   <DsSearchbar name="search" onChange={() => {}} options={[]} />
   ```
   - No options available
   - Still allows typing
   - No dropdown shown

2. **Special Characters**
   ```tsx
   options={['user@email.com', 'product#123', 'item$price']}
   ```
   - Preserves special characters
   - Proper filtering and selection
   - No encoding issues

3. **Large Dataset Performance**
   ```tsx
   options={Array.from({length: 1000}, (_, i) => `Item ${i}`)}
   ```
   - Performance with 1000+ options
   - No significant lag
   - Proper virtualization

## Known Issues and Limitations

### Component Architecture Notes
- **Class Component**: Uses legacy class component pattern (stable but older)
- **MUI ID Generation**: Snapshots sensitive to auto-generated MUI IDs
- **Custom onChange**: Transforms standard (event, value) to (name, value) signature

### Integration Considerations
- **Form Libraries**: Compatible with React Hook Form and Formik through custom onChange
- **CSS Variables**: Uses design system CSS variables that may need polyfills
- **Paper Spacing**: Custom dropdown spacing uses --ds-spacing-glacial variable

## Performance Characteristics
- **Option Filtering**: Efficient built-in MUI filtering with virtualization
- **Re-render Optimization**: Minimal re-renders on value changes
- **Large Lists**: Tested with 1000+ options without performance issues
- **Memory Usage**: Class component lifecycle optimized for stability

## Contributing
When adding new features to DsSearchbar:
1. Follow the 11-category test structure
2. Ensure custom onChange signature is preserved
3. Test search-specific styling and behavior
4. Include theme testing for visual changes
5. Add real-world search scenario tests
6. Update snapshot tests when DOM structure changes
7. Verify accessibility compliance

## Related Components
- **DsAutocomplete**: Base autocomplete functionality
- **DsInputBase**: Search variant input styling
- **DsInputAdornment**: Start adornment container
- **DsRemixIcon**: Search and clear icons
- **DsPaper**: Custom dropdown paper component

## Known Issues & Limitations
1. **Class Component Pattern**: Uses older class component architecture
2. **MUI ID Generation**: Snapshot tests sensitive to MUI auto-generated IDs
3. **Paper Spacing**: Uses CSS variables for spacing that may not work in all environments

---
*Last updated: 6 Jan, 2026*
