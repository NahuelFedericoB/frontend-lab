export default function getScrollLeft(element: HTMLElement | null): number {
  let scrollLeft = 0;
  let styles: CSSStyleDeclaration | null = null;

  while (element) {
    element = element.parentElement;

    if (element) {
      styles = getComputedStyle(element);
    }

    if (
      element &&
      (styles?.overflow === 'auto' ||
        styles?.overflow === 'scroll' ||
        styles?.overflowX === 'auto' ||
        styles?.overflowX === 'scroll')
    ) {
      scrollLeft += element.scrollLeft;
    }
  }

  return scrollLeft;
}
