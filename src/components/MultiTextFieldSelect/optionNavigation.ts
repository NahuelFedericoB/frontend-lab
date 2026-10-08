function filterHiddenOptions(options?: HTMLCollection) {
  return Array.from(options || []).filter(
    (option) => option.getAttribute('aria-hidden') === 'false',
  ) as HTMLElement[];
}

export function findNextNotHidden(
  currentOption: HTMLElement | undefined,
  onlyOneNotHidden: boolean,
) {
  if (onlyOneNotHidden) {
    return currentOption;
  }

  const options = filterHiddenOptions(currentOption?.parentElement?.children);
  const nextIndex =
    options.findIndex((item) => item.dataset.value === currentOption?.dataset.value) + 1;

  if (nextIndex === options.length) {
    return options[0];
  }

  return options[nextIndex];
}

export function findPrevNotHidden(
  currentOption: HTMLElement | undefined,
  onlyOneNotHidden: boolean,
) {
  if (onlyOneNotHidden) {
    return currentOption;
  }

  const options = filterHiddenOptions(currentOption?.parentElement?.children);
  const prevIndex =
    options.findIndex((item) => item.dataset.value === currentOption?.dataset.value) - 1;

  if (prevIndex < 0) {
    return options[options.length - 1];
  }

  return options[prevIndex];
}
