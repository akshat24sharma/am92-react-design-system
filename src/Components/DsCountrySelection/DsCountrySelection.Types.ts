import type React from "react";
import { DsSelectProps } from "../../Components/DsSelect";
import { DsTextFieldProps } from "../../Components/DsTextField";
import { DsFormControlProps } from "../../Components/DsFormControl";
import { DsAutocompleteProps } from "../../Components/DsAutocomplete";

export interface ICountryType {
  code: string;
  label: string;
  phone: string;
}


export interface IDsSearchableSelectProps extends Omit<
  DsSelectProps,
  "renderValue" | "options"
> {
  onCountryChange?: (country: ICountryType) => void;
  selectedCountry: ICountryType;
  renderValue?: (country: ICountryType) => React.ReactNode;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key },
    option: ICountryType,
    selected: boolean,
  ) => React.ReactNode;
  countries: readonly ICountryType[];
  autocompleteProps?: Partial<
    DsAutocompleteProps<ICountryType, false, false, false>
  >;
  countryFlag: boolean;
}

export interface IDsCountrySelectionValue {
  country: ICountryType;
  phoneNumber: string;
}

export interface DsCountrySelectionProps extends Omit<DsTextFieldProps, "onChange"> {
  name: string;
  onChange?: (name: string, value: IDsCountrySelectionValue) => void;
  selectedCountry?: ICountryType;
  formControlProps?: Partial<DsFormControlProps>;
  selectProps?: Partial<
    Omit<
      IDsSearchableSelectProps,
      "countries" | "selectedCountry" | "onCountryChange" | "countryFlag" | "autocompleteProps"
    >
  >;
  textFieldProps?: Partial<DsTextFieldProps>;
  autocompleteProps?: Partial<
    DsAutocompleteProps<ICountryType, false, false, false>
  >;
  countryFilter?: (countries: readonly ICountryType[]) => ICountryType[];
  countryFlag?: boolean
}

export const DsCountrySelectionDefaultProps: Partial<DsCountrySelectionProps> =
  {
    placeholder: "Enter phone number",
    name: "",
    fullWidth: true,
    countryFlag: false
  };
