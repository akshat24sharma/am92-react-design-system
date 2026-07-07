import React, { type FC, useCallback, useState, type ReactNode } from "react";
import type { AutocompleteRenderInputParams } from "@mui/material";
import { DsAutocomplete } from "../../../Components/DsAutocomplete";
import { DsInputAdornment } from "../../../Components/DsInputAdornment";
import { DsMenuItem } from "../../../Components/DsMenuItem";
import { DsPaper } from "../../../Components/DsPaper";
import { DsRemixIcon } from "../../../Components/DsRemixIcon";
import { DsSelect } from "../../../Components/DsSelect";
import { DsStack } from "../../../Components/DsStack";
import { DsTypography } from "../../../Components/DsTypography";
import { DsInputBase } from "../../../Components/DsInputBase";
import type {
  ICountryType,
  IDsSearchableSelectProps,
} from "../DsCountrySelection.Types";

// Renders the Autocomplete dropdown panel as a DsPaper instead of MUI's default Popper.
function PopperComponent(props: any) {
  // Remove Autocomplete Popper-specific props that DsPaper doesn't need.
  const { disablePortal, anchorEl, open, ...other } = props;
  return <DsPaper {...other} />;
}

const EMPTY_OPTIONS: never[] = [];

// Matches a country by label or dial code against the search input.
const filterCountries = (
  options: ICountryType[],
  { inputValue }: { inputValue: string },
) => {
  // Strip a leading "+" so searching "+91" or "91" both match the dial code.
  const search = inputValue.replace("+", "").trim().toLowerCase();

  return options.filter(
    (option) =>
      option.label.toLowerCase().includes(search) ||
      option.phone.includes(search),
  );
};

const defaultNoOptionsText: ReactNode = (
  <DsStack gap="var(--ds-spacing-glacial)" direction="row" alignItems="center">
    <DsRemixIcon className="ri-information-line" color="iconDisabled" />
    <DsTypography variant="bodyRegularMedium" color="textTertiary">
      No results found
    </DsTypography>
  </DsStack>
);

// Renders the country search input as a DsInputBase with a search icon.
const renderSearchInput = (params: AutocompleteRenderInputParams) => {
  const {
    InputLabelProps,
    InputProps,
    helperText,
    FormHelperTextProps,
    ...restParams
  } = params as any;
  return (
    <DsInputBase
      {...restParams}
      {...InputProps}
      ds-variant="search"
      placeholder="Search"
      aria-label="Search countries"
      startAdornment={
        <DsInputAdornment position="start">
          <DsRemixIcon
            className="ri-search-line"
            color="iconDisabled"
            fontSize="cool"
          />
        </DsInputAdornment>
      }
      sx={{
        mt: "var(--ds-spacing-glacial)",
        mx: "var(--ds-spacing-bitterCold)",
        width: "calc(100% - var(--ds-spacing-warm))",
      }}
    />
  );
};

// Default display for the selected country: flag + dial code.
const defaultRenderValue = (country: ICountryType): React.ReactNode => (
  <DsStack
    direction="row"
    gap="var(--ds-spacing-quickFreeze)"
    alignItems="center"
  >
    <DsRemixIcon
      className={`fi fi-${country.code}`}
      sx={{
        width: "26px",
        borderRadius: "var(--ds-radius-quickFreeze)",
        aspectRatio: 4 / 3,
      }}
    />
    <DsTypography variant="bodyRegularMedium">+{country.phone}</DsTypography>
  </DsStack>
);

// Default row for each country in the dropdown list: flag + dial code + label.
const defaultRenderOption = (
  props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
  option: ICountryType,
  selected: boolean,
): React.ReactNode => {
  const { key, ...optionProps } = props;

  return (
    <DsMenuItem
      key={key}
      {...optionProps}
      sx={{
        display: "flex",
        width: "100%",
        p: "var(--ds-spacing-frostbite) var(--ds-spacing-bitterCold) !important",
        border: "none !important",
      }}
    >
      <DsRemixIcon
        className={`fi fi-${option.code}`}
        sx={{
          width: "26px",
          borderRadius: "var(--ds-radius-quickFreeze)",
          aspectRatio: 4 / 3,
          mr: "calc(var(--ds-spacing-glacial) + var(--ds-spacing-deepFreeze))",
        }}
      />

      <DsTypography
        variant={selected ? "bodyBoldMedium" : "bodyRegularMedium"}
        sx={{ mr: "var(--ds-spacing-quickFreeze)" }}
      >
        +({option.phone})
      </DsTypography>

      <DsTypography variant={selected ? "bodyBoldMedium" : "bodyRegularMedium"}>
        {option.label}
      </DsTypography>
    </DsMenuItem>
  );
};

const DsSearchableSelect: FC<IDsSearchableSelectProps> = ({
  onCountryChange,
  error,
  success,
  disabled,
  selectedCountry,
  renderValue: renderValueProp = defaultRenderValue,
  renderOption: renderOptionProp = defaultRenderOption,
  countries,
  autocompleteProps,
  ...selectProps
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  /**
   * Close dropdown and reset search state.
   */
  const handleClose = useCallback(() => {
    setInputValue("");
    setSelectOpen(false);
  }, []);

  // Open the dropdown and reset search state.
  const handleOpen = useCallback(() => {
    setSelectOpen(true);
    setInputValue("");
  }, []);

  // Close the dropdown when the user presses Escape inside the Autocomplete.
  const handleAutocompleteClose = useCallback(
    (_event: React.SyntheticEvent, reason: string) => {
      if (reason === "escape") {
        handleClose();
      }
    },
    [handleClose],
  );

  // Track the search text as the user types, ignoring resets.
  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, newInputValue: string, reason: string) => {
      if (reason === "reset") return;
      setInputValue(newInputValue);
    },
    [],
  );

  // Select a country and close the dropdown.
  const handleAutocompleteChange = useCallback(
    (
      event: React.SyntheticEvent,
      newValue: ICountryType | null,
      reason: string,
    ) => {
      if (!newValue) return;
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Backspace" ||
          (event as React.KeyboardEvent).key === "Delete") &&
        reason === "removeOption"
      ) {
        return;
      }
      onCountryChange?.(newValue);
      setInputValue("");
      setSelectOpen(false);
    },
    [onCountryChange],
  );

  // Wraps renderOptionProp with the "is this the selected country" flag.
  const renderCountryOption = useCallback(
    (
      props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
      option: ICountryType,
    ) => renderOptionProp(props, option, selectedCountry.code === option.code),
    [renderOptionProp, selectedCountry],
  );

  return (
    <DsSelect
      {...selectProps}
      native={false}
      open={selectOpen}
      onOpen={handleOpen}
      onClose={handleClose}
      options={EMPTY_OPTIONS}
      error={error}
      success={success}
      disabled={disabled}
      renderValue={() => renderValueProp(selectedCountry)}
      IconComponent={(props) => (
        <DsRemixIcon
          {...props}
          className={`${props.className} ri-arrow-down-s-fill`}
        />
      )}
      sx={{
        maxWidth: "fit-content",
        "& .MuiSelect-select": {
          paddingRight:
            "calc(var(--ds-spacing-cool) + var(--ds-spacing-deepFreeze)) !important",
        },
        ...selectProps.sx,
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      }}
    >
      <DsAutocomplete
        getOptionLabel={(option) => option.label}
        popupIcon={false}
        clearIcon={<DsRemixIcon className="ri-close-line" />}
        {...autocompleteProps}
        slots={{
          popper: PopperComponent,
          ...autocompleteProps?.slots,
        }}
        slotProps={{
          ...autocompleteProps?.slotProps,
          popper: {
            sx: {
              width: "100% !important",
              minWidth: "288px",
              boxShadow: "none",
              ".MuiPaper-root": {
                boxShadow: "none",
              },
            },
            ...autocompleteProps?.slotProps?.popper,
          },
        }}
        filterOptions={filterCountries}
        open
        value={selectedCountry}
        options={countries}
        inputValue={inputValue}
        onClose={handleAutocompleteClose}
        onInputChange={handleInputChange}
        onChange={handleAutocompleteChange}
        noOptionsText={defaultNoOptionsText}
        renderOption={renderCountryOption}
        renderInput={renderSearchInput}
      />
    </DsSelect>
  );
};

DsSearchableSelect.displayName = "DsSearchableSelect";
export default React.memo(DsSearchableSelect);
