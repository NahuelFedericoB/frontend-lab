import type { KeyboardEvent } from 'react';

export default function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
  if (event.key === 'Tab') {
    return;
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    (event.target as HTMLElement).click();
  }
}
