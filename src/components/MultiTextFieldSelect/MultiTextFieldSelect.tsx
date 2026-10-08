import handleKeyDown from '../../utils/handleKeyDown';

import { TextField } from '../TextField/TextField';
import type { MultiTextFieldSelectProps } from './MultiTextFieldSelect.types';
import { MultiTextFieldSelectMenu } from './MultiTextFieldSelectMenu';
import { useMultiTextFieldSelect } from './useMultiTextFieldSelect';

import styles from './MultiTextFieldSelect.module.css';

export function MultiTextFieldSelect({
  id = null,
  class: className = null,
  ariaLabel = null,
  ariaLabelledBy = null,
  ariaDescribedBy = null,
  clearButtonAriaLabel = 'Clear Button',
  disabled = false,
  invalid = false,
  name = null,
  noOptionsMessage = 'No options',
  placeholder = '',
  size = 'md',
  disableInput = false,
  clearable = true,
  ...selectionProps
}: MultiTextFieldSelectProps) {
  const {
    containerRef,
    dataListRef,
    options,
    value,
    inputValue,
    internalValue,
    checkbox,
    highlightedOption,
    hiddenOptions,
    isMenuOpen,
    areAllOptionsHidden,
    handleInput,
    handleOnFocus,
    handleOnClick,
    handleClearClick,
    handleSelectOption,
    handleOptionOnKeyDown,
    handleOptionMouseEnter,
  } = useMultiTextFieldSelect(selectionProps);

  return (
    <div
      ref={containerRef}
      className={[
        styles.textFieldSelectContainer,
        className,
        value.length > 0 && styles.clearIconPadding,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        type="hidden"
        aria-hidden="true"
        name={name ?? undefined}
        value={internalValue}
        tabIndex={-1}
      />
      <TextField
        class={`${styles.textFieldInput} ${styles.addSpace} ${styles[`size-${size}`]}`}
        list=""
        ariaLabel={ariaLabel}
        ariaDescribedBy={ariaDescribedBy}
        ariaLabelledBy={ariaLabelledBy}
        invalid={invalid}
        size={size}
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        readonly={disableInput}
        value={inputValue}
        onclick={handleOnClick}
        oninput={handleInput}
        onfocus={handleOnFocus}
        onkeydown={handleOptionOnKeyDown}
      />
      {value.length > 0 && clearable && !disabled && (
        <i
          aria-label={clearButtonAriaLabel ?? undefined}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          role="button"
          className={`${styles.clearIcon} ${styles[`clearIcon-size-${size}`]}`}
          onClick={handleClearClick}
          onKeyDown={handleKeyDown}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="m6 6 12 12M6 18 18 6" />
          </svg>
        </i>
      )}
      <i className={`${styles.arrow} ${styles[`arrow-${size}`]}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </i>
      <MultiTextFieldSelectMenu
        dataListRef={dataListRef}
        options={options}
        checkbox={checkbox}
        highlightedOption={highlightedOption}
        hiddenOptions={hiddenOptions}
        isMenuOpen={isMenuOpen}
        areAllOptionsHidden={areAllOptionsHidden}
        handleSelectOption={handleSelectOption}
        handleOptionMouseEnter={handleOptionMouseEnter}
        handleOptionOnKeyDown={handleOptionOnKeyDown}
        size={size}
        noOptionsMessage={noOptionsMessage}
      />
    </div>
  );
}
