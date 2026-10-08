import type { KeyboardEvent } from 'react';

import type { MultiTextFieldSelectOption } from './MultiTextFieldSelect.types';
import { findNextNotHidden, findPrevNotHidden } from './optionNavigation';

import styles from './MultiTextFieldSelect.module.css';

interface KeyboardOptions {
  dataList: HTMLDataListElement | null;
  value: MultiTextFieldSelectOption[];
  inputValue: string;
  isMenuOpen: boolean;
  areAllOptionsHidden: boolean;
  onlyOneNotHidden: boolean;
  showMenu: () => void;
  hideMenu: () => void;
  clearValues: () => void;
  removeLastValue: () => void;
  highlightOption: (value: string) => void;
  selectOption: (value: string | undefined) => void;
}

export function handleOptionKeyDown(event: KeyboardEvent<HTMLElement>, options: KeyboardOptions) {
  if (event.key === 'Tab') {
    options.hideMenu();
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    if (!options.value.length) {
      options.clearValues();
    }
    options.hideMenu();
  }

  if (options.areAllOptionsHidden) {
    return;
  }

  const elements = Array.from(options.dataList?.children || []) as HTMLElement[];
  const currentOption =
    elements.find((item) => item.classList.contains(styles.highlight!)) ||
    elements.find((item) => item.classList.contains(styles.active!));

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    if (!options.isMenuOpen) {
      options.showMenu();
      return;
    }

    const nextOption =
      event.key === 'ArrowDown'
        ? findNextNotHidden(currentOption, options.onlyOneNotHidden)
        : findPrevNotHidden(currentOption, options.onlyOneNotHidden);
    options.highlightOption(nextOption?.dataset.value || '');
  }

  if (event.key === 'Enter' && options.isMenuOpen) {
    event.preventDefault();
    options.selectOption(currentOption?.dataset.value);
  }

  const words = options.inputValue.split(',');
  const lastWord = words[words.length - 1]?.trim() || '';
  const selectedOption = options.value.find(
    (item) => item.label.toLowerCase() === lastWord.toLowerCase(),
  );

  if ((event.key === 'Backspace' || event.key === 'Delete') && selectedOption) {
    event.preventDefault();
    options.removeLastValue();
  }
}
