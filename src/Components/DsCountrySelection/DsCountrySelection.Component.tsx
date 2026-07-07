import React, { type FC, useCallback, useRef, useState } from "react";
import { DsFormControl } from "../../Components/DsFormControl";
import { DsHelperText } from "../../Components/DsHelperText";
import { DsInputLabel } from "../../Components/DsInputLabel";
import { DsStack } from "../../Components/DsStack";
import { DsTextField } from "../../Components/DsTextField";
import DsSearchableSelect from "./Components/DsSearchableSelect";

import {
  type ICountryType,
  DsCountrySelectionDefaultProps,
  type DsCountrySelectionProps,
} from "./DsCountrySelection.Types";

import { countries } from "./Constants";

const DEFAULT_COUNTRY =
  countries.find((country) => country.code === "in") ?? countries[0];

export const DsCountrySelection: FC<DsCountrySelectionProps> = (InProps) => {
  const props = { ...DsCountrySelectionDefaultProps, ...InProps };
  const {
    label,
    helperText,
    error,
    success,
    required,
    disabled,
    fullWidth,
    value,
    placeholder,
    onChange,
    formControlProps,
    selectProps,
    textFieldProps,
    autocompleteProps,
    name,
    countryFilter,
    selectedCountry: initialSelectedCountry,
  } = props;

  // whether the parent is controlling
  const isPhoneControlledRef = useRef(value !== undefined);
  const isCountryControlledRef = useRef(initialSelectedCountry !== undefined);

  const [internalPhoneValue, setInternalPhoneValue] = useState<string>(
    (value as string) ?? "",
  );

  // Initialize with India unless a country is supplied via props.
  const [selectedCountry, setSelectedCountry] = useState<ICountryType>(
    initialSelectedCountry ?? DEFAULT_COUNTRY,
  );

  // if controlled, always read straight from the prop
  // uncontrolled, read from our own internal state.
  const phoneValue = isPhoneControlledRef.current
    ? ((value as string) ?? "")
    : internalPhoneValue;
  const countryValue = isCountryControlledRef.current
    ? (initialSelectedCountry as ICountryType)
    : selectedCountry;

  // `countryFilter` is typically an inline arrow function from the caller, so
  // its reference changes every render. Computing it lazily via useState
  // keeps the filtering work to a single run instead of re-running on every
  // parent re-render.
  const [filteredCountries] = useState(() =>
    countryFilter ? countryFilter(countries) : countries,
  );

  const handleCountryChange = useCallback(
    (country: ICountryType) => {
      if (!isCountryControlledRef.current) {
        setSelectedCountry(country);
      }
      onChange?.(name, {
        country,
        phoneNumber: phoneValue,
      });
    },
    [name, onChange, phoneValue],
  );

  const handlePhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      // phone number should only contain digits
      const phoneNumber = event.target.value.replace(/\D/g, "");

      if (!isPhoneControlledRef.current) {
        setInternalPhoneValue(phoneNumber);
      }

      onChange?.(name, {
        country: countryValue,
        phoneNumber,
      });
    },
    [name, onChange, countryValue],
  );
  return (
    <DsFormControl
      fullWidth={fullWidth}
      required={required}
      {...formControlProps}
    >
      {label && (
        <DsInputLabel
          label={label}
          error={error}
          success={success}
          disabled={disabled}
          required={required}
        />
      )}
      <DsStack gap="var(--ds-spacing-glacial)" direction="row" alignItems="center">
        <DsSearchableSelect
          error={error}
          success={success}
          disabled={disabled}
          countries={filteredCountries}
          autocompleteProps={autocompleteProps}
          selectedCountry={countryValue}
          onCountryChange={handleCountryChange}
          {...selectProps}
        />
        <DsTextField
          name={name}
          type="tel"
          placeholder={placeholder}
          error={error}
          success={success}
          disabled={disabled}
          required={required}
          {...textFieldProps}
          value={phoneValue}
          onChange={handlePhoneChange}
          sx={{ flex: 1, ...textFieldProps?.sx }}
        />
      </DsStack>
      <DsHelperText helperText={helperText} success={success} error={error} />
    </DsFormControl>
  );
};
