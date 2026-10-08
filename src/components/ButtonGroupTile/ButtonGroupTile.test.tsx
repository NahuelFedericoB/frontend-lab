import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ButtonGroupTile } from './ButtonGroupTile';
import type { ButtonGroupTileProps } from './ButtonGroupTile.types';

import styles from './ButtonGroupTile.module.css';

const content = 'ButtonGroupTile';
const renderWithContent = (props: ButtonGroupTileProps = {}) =>
  render(<ButtonGroupTile {...props}>{content}</ButtonGroupTile>);

describe('<ButtonGroupTile />', () => {
  it('should render correctly', () => {
    const { container } = renderWithContent();

    expect(container).toMatchSnapshot();
  });

  describe('the `id` prop', () => {
    it('should assign the id attribute', () => {
      const id = 'test id';
      renderWithContent({ id });

      expect(screen.getByText(content)).toHaveAttribute('id', id);
    });
  });

  describe('the `ariaLabel` prop', () => {
    it('should assign the aria-label attribute', () => {
      const ariaLabel = 'test aria label';
      renderWithContent({ ariaLabel });

      expect(screen.getByText(content)).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('the `vertical` prop', () => {
    it('should assign the `vertical` class', () => {
      renderWithContent({ vertical: true });

      expect(screen.getByText(content)).toHaveClass(styles.vertical!);
    });
  });

  describe('the `disable` prop', () => {
    it('should disable the button', () => {
      renderWithContent({ disabled: true });

      expect(screen.getByText(content)).toHaveClass(styles.disabled!);
    });
  });

  describe('the `size` prop', () => {
    it('should assign the `sm` size class', () => {
      const size = 'sm';
      renderWithContent({ size });

      expect(screen.getByText(content)).toHaveClass(styles[`size-${size}`]!);
    });

    it('should assign the `md` size class', () => {
      const size = 'md';
      renderWithContent({ size });

      expect(screen.getByText(content)).toHaveClass(styles[`size-${size}`]!);
    });

    it('should assign the `lg` size class', () => {
      const size = 'lg';
      renderWithContent({ size });

      expect(screen.getByText(content)).toHaveClass(styles[`size-${size}`]!);
    });
  });

  describe('the `active` prop', () => {
    it('should show the button as active', () => {
      renderWithContent({ active: true });

      expect(screen.getByText(content)).toHaveClass(styles.active!);
    });
  });

  describe('the `on:click` event', () => {
    it('should execute the passed callback', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByText(content);

      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should execute on Enter and Space keydown', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByText(content);

      fireEvent.keyDown(button, { key: 'Enter' });
      fireEvent.keyDown(button, { key: ' ' });

      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should ignore any other key', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByText(content);

      fireEvent.keyDown(button, { key: 'A' });

      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
