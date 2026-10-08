import { Checkbox } from '../Checkbox/Checkbox';
import { Label } from '../Label/Label';
import type { MultiTextFieldSelectProps } from './MultiTextFieldSelect.types';
import type { useMultiTextFieldSelect } from './useMultiTextFieldSelect';

import styles from './MultiTextFieldSelect.module.css';

interface MultiTextFieldSelectMenuProps extends Pick<
  ReturnType<typeof useMultiTextFieldSelect>,
  | 'dataListRef'
  | 'options'
  | 'checkbox'
  | 'highlightedOption'
  | 'hiddenOptions'
  | 'isMenuOpen'
  | 'areAllOptionsHidden'
  | 'handleSelectOption'
  | 'handleOptionMouseEnter'
  | 'handleOptionOnKeyDown'
> {
  size: NonNullable<MultiTextFieldSelectProps['size']>;
  noOptionsMessage: string;
}

export function MultiTextFieldSelectMenu({
  dataListRef,
  options,
  checkbox,
  highlightedOption,
  hiddenOptions,
  isMenuOpen,
  areAllOptionsHidden,
  handleSelectOption,
  handleOptionMouseEnter,
  handleOptionOnKeyDown,
  size,
  noOptionsMessage,
}: MultiTextFieldSelectMenuProps) {
  return (
    <datalist
      ref={dataListRef}
      className={styles.dataList}
      style={{ display: isMenuOpen ? 'block' : 'none' }}
    >
      {options.map((option) => (
        <div
          key={option.value}
          className={[
            styles.dropdownOption,
            styles[`size-${size}`],
            highlightedOption === option.value && styles.highlight,
            hiddenOptions.includes(option.value) && styles.hidden,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-hidden={hiddenOptions.includes(option.value)}
          onClick={handleSelectOption}
          onMouseEnter={handleOptionMouseEnter}
          onKeyDown={handleOptionOnKeyDown}
          data-value={option.value}
          tabIndex={-1}
        >
          <div className={styles.checkboxContainer}>
            <Checkbox
              id={option.value}
              checked={checkbox[option.value] ?? false}
              size={size}
              class={styles.checkbox!}
            />
            <Label for={option.value} class={styles.label!} size={size}>
              {option.label}
            </Label>
          </div>
        </div>
      ))}
      {areAllOptionsHidden && (
        <div tabIndex={-1} className={styles.noOptionsMessage}>
          {noOptionsMessage}
        </div>
      )}
    </datalist>
  );
}
