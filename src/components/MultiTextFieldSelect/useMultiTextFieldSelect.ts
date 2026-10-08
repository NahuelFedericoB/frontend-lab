import {
  useEffect,
  useRef,
  useState,
  type InputEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import noop from '../../utils/noop';
import onClickOutside from '../../utils/onClickOutside';
import type {
  MultiTextFieldSelectOption,
  MultiTextFieldSelectProps,
} from './MultiTextFieldSelect.types';
import { handleOptionKeyDown } from './handleOptionKeyDown';

import styles from './MultiTextFieldSelect.module.css';

const emptyOptions: MultiTextFieldSelectOption[] = [];

export function useMultiTextFieldSelect({
  value = emptyOptions,
  options = emptyOptions,
  onselectoption = noop,
}: Pick<MultiTextFieldSelectProps, 'value' | 'options' | 'onselectoption'>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dataListRef = useRef<HTMLDataListElement>(null);
  const [selection, setSelection] = useState({ prop: value, value });
  const [highlightedOption, setHighlightedOption] = useState('');
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (selection.prop !== value) {
    setSelection({ prop: value, value });
  }

  const selectedValues = selection.value;
  const inputValue = selectedValues
    .map((item) => `${item.label} `)
    .join(',')
    .replaceAll(' ,', ', ');
  const internalValue = selectedValues.map((item) => item.value).join(',');
  const checkbox = selectedValues.reduce<Record<string, boolean>>((checked, item) => {
    checked[item.value] = true;
    return checked;
  }, {});
  const areAllOptionsHidden = options.every((item) => hiddenOptions.includes(item.value));

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const action = onClickOutside(node, () => setIsMenuOpen(false));
    return action.destroy;
  }, []);

  function setValue(nextValue: MultiTextFieldSelectOption[]) {
    setSelection({ prop: value, value: nextValue });
  }

  function selectOption(optionValue: string | undefined, optionId?: string) {
    const selectedOption = options.find(
      (item) => item.value === optionValue || item.value === optionId,
    ) || { label: '', value: '' };
    const nextValue = selectedValues.some((item) => item.value === selectedOption.value)
      ? selectedValues.filter((item) => item.value !== selectedOption.value)
      : [...selectedValues, selectedOption];

    setValue(nextValue);
    onselectoption(
      nextValue,
      selectedOption,
      nextValue.some((item) => item.value === selectedOption.value),
    );
    setHiddenOptions([]);
  }

  function handleSelectOption(event: MouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'LABEL') {
      event.stopPropagation();
      return;
    }

    selectOption(target.dataset.value, target.id);
  }

  function handleInput(event: InputEvent<HTMLInputElement>) {
    setIsMenuOpen(true);
    const elements = Array.from(dataListRef.current?.children || []).filter((element) =>
      element.classList.contains(styles.dropdownOption!),
    ) as HTMLElement[];
    const words = event.currentTarget.value.toLowerCase().split(' ');
    const lastWord = words[words.length - 1] || '';
    const hidden = elements
      .filter((item) => !item.querySelector('label')?.textContent?.toLowerCase().includes(lastWord))
      .map((item) => item.dataset.value || '');

    setHiddenOptions(hidden);
    setHighlightedOption(options.find((item) => !hidden.includes(item.value))?.value || '');
  }

  function handleOnFocus() {
    if (options.length > 0) {
      setHighlightedOption(options[0]!.value);
    }
  }

  function handleClearClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    setValue([]);
    const target = event.target as HTMLElement;
    (target.previousElementSibling as HTMLElement | null)?.focus();
    onselectoption([], { label: '', value: '' }, false);
  }

  function handleOptionOnKeyDown(event: KeyboardEvent<HTMLElement>) {
    handleOptionKeyDown(event, {
      dataList: dataListRef.current,
      value: selectedValues,
      inputValue,
      isMenuOpen,
      areAllOptionsHidden,
      onlyOneNotHidden: hiddenOptions.length === options.length - 1,
      showMenu: () => setIsMenuOpen(true),
      hideMenu: () => setIsMenuOpen(false),
      clearValues: () => setValue([]),
      removeLastValue: () => {
        const nextValue = selectedValues.slice(0, -1);
        setValue(nextValue);
        onselectoption(nextValue, { label: '', value: '' }, false);
      },
      highlightOption: setHighlightedOption,
      selectOption,
    });
  }

  return {
    containerRef,
    dataListRef,
    options,
    value: selectedValues,
    inputValue,
    internalValue,
    checkbox,
    highlightedOption,
    hiddenOptions,
    isMenuOpen,
    areAllOptionsHidden,
    handleInput,
    handleOnFocus,
    handleOnClick: () => setIsMenuOpen(true),
    handleClearClick,
    handleSelectOption,
    handleOptionOnKeyDown,
    handleOptionMouseEnter: (event: MouseEvent<HTMLDivElement>) =>
      setHighlightedOption(event.currentTarget.dataset.value || ''),
  };
}
