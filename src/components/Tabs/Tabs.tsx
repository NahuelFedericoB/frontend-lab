import type { KeyboardEvent } from 'react';

import type { TabsProps } from './Tabs.types';
import styles from './Tabs.module.css';

const isElementATab = (element: HTMLDivElement) => element?.getAttribute?.('role') === 'tab';
const isTabDisabled = (tab: HTMLDivElement) => tab?.getAttribute('aria-disabled') === 'true';
const isTabValid = (tab: HTMLDivElement) => isElementATab(tab) && !isTabDisabled(tab);

const findPrevNotDisabledTab = (
  tab: HTMLDivElement,
  startTab: HTMLDivElement = tab,
): HTMLDivElement | null => {
  const lastTab = tab.parentElement!.lastChild as HTMLDivElement;
  const prevTab = tab.previousElementSibling as HTMLDivElement | null;

  if (!prevTab) {
    if (isTabValid(lastTab)) {
      return lastTab;
    }

    return lastTab === startTab ? null : findPrevNotDisabledTab(lastTab, startTab);
  }

  if (isTabValid(prevTab)) {
    return prevTab;
  }

  return prevTab === startTab ? null : findPrevNotDisabledTab(prevTab, startTab);
};

const findNextNotDisabledTab = (
  tab: HTMLDivElement,
  startTab: HTMLDivElement = tab,
): HTMLDivElement | null => {
  const firstTab = tab.parentElement!.firstChild as HTMLDivElement;
  const nextTab = tab.nextElementSibling as HTMLDivElement | null;

  if (!nextTab) {
    if (isTabValid(firstTab)) {
      return firstTab;
    }

    return firstTab === startTab ? null : findNextNotDisabledTab(firstTab, startTab);
  }

  if (isTabValid(nextTab)) {
    return nextTab;
  }

  return nextTab === startTab ? null : findNextNotDisabledTab(nextTab, startTab);
};

export function Tabs({
  id = null,
  ariaLabel = null,
  className = null,
  onSelect = null,
  fullHeight = false,
  activeTab = '',
  children,
}: TabsProps) {
  const handleTabSelectViaKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!onSelect) {
      return;
    }

    const target = event.target as HTMLDivElement;
    const currentTab =
      isElementATab(target) && target.dataset.tabkey === activeTab
        ? target
        : Array.from(target.querySelectorAll<HTMLDivElement>('[role="tab"]')).find(
            (tab) => tab.dataset.tabkey === activeTab,
          );

    if (!currentTab) {
      return;
    }

    if (
      currentTab.getAttribute('disabled') === 'true' ||
      currentTab.getAttribute('role') === 'tablist'
    ) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
      onSelect(currentTab.dataset.tabkey!);

      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      event.stopPropagation();
      const prevTab = findPrevNotDisabledTab(currentTab);
      if (!prevTab) {
        return;
      }
      onSelect(prevTab.dataset.tabkey!);
      prevTab.focus();

      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      event.stopPropagation();
      const nextTab = findNextNotDisabledTab(currentTab);
      if (!nextTab) {
        return;
      }
      onSelect(nextTab.dataset.tabkey!);
      nextTab.focus();
    }
  };

  const classes = [styles.tabs, className, fullHeight && styles.fullHeight]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      id={id}
      aria-label={ariaLabel}
      className={classes}
      role="tablist"
      tabIndex={0}
      onKeyDown={handleTabSelectViaKeyboard}
    >
      {children}
    </div>
  );
}
