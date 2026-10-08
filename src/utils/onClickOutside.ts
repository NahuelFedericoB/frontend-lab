export default function onClickOutside(node: HTMLElement, onOutside: () => void) {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node) && !event.defaultPrevented) {
      onOutside();
    }
  };

  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    },
  };
}
