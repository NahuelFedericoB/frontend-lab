import getScrollLeft from '../../utils/getScrollLeft';

import type { TooltipPlacement } from './Tooltip.types';

function getOffset(element: HTMLElement | null, axis: 'offsetLeft' | 'offsetTop') {
  let offset = 0;
  while (element) {
    offset += element[axis];
    element = element.offsetParent as HTMLElement | null;
  }
  return offset;
}

function getScrollTop(element: HTMLElement | null) {
  let scroll = 0;
  while (element) {
    element = element.parentElement;
    if (element) {
      const styles = getComputedStyle(element);
      if (
        ['auto', 'scroll'].includes(styles.overflow) ||
        ['auto', 'scroll'].includes(styles.overflowY)
      ) {
        scroll += element.scrollTop;
      }
    }
  }
  return scroll;
}

export function positionTooltip(
  tooltip: HTMLElement,
  target: HTMLElement,
  placement: TooltipPlacement,
) {
  tooltip.style.left = '0px';
  tooltip.style.top = '0px';
  const style = getComputedStyle(target);
  const paddingLeft = parseInt(style.paddingLeft, 10);
  const paddingRight = parseInt(style.paddingRight, 10);
  const paddingTop = parseInt(style.paddingTop, 10);
  const paddingBottom = parseInt(style.paddingBottom, 10);
  const left = getOffset(target, 'offsetLeft') - getScrollLeft(target);
  const top = getOffset(target, 'offsetTop') - getScrollTop(target);

  let x =
    left - tooltip.offsetWidth / 2 + target.offsetWidth / 2 + paddingLeft / 2 - paddingRight / 2;
  let y =
    top - tooltip.offsetHeight / 2 + target.offsetHeight / 2 + paddingTop / 2 - paddingBottom / 2;

  if (placement === 'left') x = left - tooltip.offsetWidth + paddingLeft - 10;
  if (placement === 'right') x = left + target.offsetWidth - paddingRight + 10;
  if (placement === 'top') y = top - tooltip.offsetHeight + paddingTop - 10;
  if (placement === 'bottom') y = top + target.offsetHeight - paddingBottom + 6;

  tooltip.style.left = `${x}px`;
  tooltip.style.top = `${y}px`;
}
