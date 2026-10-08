export interface MultiTextFieldSelectOption {
  label: string;
  value: string;
}

export interface MultiTextFieldSelectProps {
  id?: string | null;
  class?: string | null;
  ariaLabel?: string | null;
  ariaLabelledBy?: string | null;
  ariaDescribedBy?: string | null;
  clearButtonAriaLabel?: string | null;
  disabled?: boolean;
  invalid?: boolean;
  name?: string | null;
  noOptionsMessage?: string;
  onselectoption?: (
    values: MultiTextFieldSelectOption[],
    currentValue?: MultiTextFieldSelectOption | null,
    checked?: boolean | null,
  ) => void;
  options?: MultiTextFieldSelectOption[];
  placeholder?: string;
  value?: MultiTextFieldSelectOption[];
  size?: 'sm' | 'md' | 'lg';
  disableInput?: boolean;
  clearable?: boolean;
}
