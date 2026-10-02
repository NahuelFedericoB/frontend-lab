import type { FormEvent } from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';
import type { ButtonProps } from './Button.types';
import styles from './Button.module.css';

const content = 'Button';
const renderWithContent = (props: ButtonProps = {}) =>
  render(<Button {...props}>{content}</Button>);

describe('<Button />', () => {
  it('renders correctly', () => {
    const { container } = render(<Button />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <button
          class="_button_0829c1 _primary_0829c1 _size-md_0829c1"
          type="button"
        />
      </div>
    `);
  });

  describe('the `id` prop', () => {
    it('assigns the id attribute', () => {
      renderWithContent({ id: 'test id' });

      expect(screen.getByRole('button')).toHaveAttribute('id', 'test id');
    });
  });

  describe('the `className` prop', () => {
    it('assigns the custom class alongside the component classes', () => {
      renderWithContent({ className: 'test-class' });

      expect(screen.getByRole('button')).toHaveClass('test-class');
      expect(screen.getByRole('button')).toHaveClass(styles.primary!);
    });
  });

  describe('the `ariaLabel` prop', () => {
    it('assigns the aria-label attribute', () => {
      renderWithContent({ ariaLabel: 'test aria label' });

      expect(screen.getByRole('button', { name: 'test aria label' })).toHaveAttribute(
        'aria-label',
        'test aria label',
      );
    });
  });

  describe('the `color` prop', () => {
    it('assigns the `primary` color class', () => {
      renderWithContent({ color: 'primary' });

      expect(screen.getByRole('button')).toHaveClass(styles.primary!);
    });

    it('assigns the `light` color class', () => {
      renderWithContent({ color: 'light' });

      expect(screen.getByRole('button')).toHaveClass(styles.light!);
    });

    it('assigns the `danger` color class', () => {
      renderWithContent({ color: 'danger' });

      expect(screen.getByRole('button')).toHaveClass(styles.danger!);
    });

    it('assigns the `success` color class', () => {
      renderWithContent({ color: 'success' });

      expect(screen.getByRole('button')).toHaveClass(styles.success!);
    });

    it('assigns the `warning` color class', () => {
      renderWithContent({ color: 'warning' });

      expect(screen.getByRole('button')).toHaveClass(styles.warning!);
    });
  });

  describe('the `disabled` prop', () => {
    it('disables the button and prevents click callbacks', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderWithContent({ disabled: true, onClick });
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveClass(styles.disabled!);
      await user.click(button);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('the `size` prop', () => {
    it('assigns the `xxs` size class', () => {
      renderWithContent({ size: 'xxs' });

      expect(screen.getByRole('button')).toHaveClass(styles['size-xxs']!);
    });

    it('assigns the `xs` size class', () => {
      renderWithContent({ size: 'xs' });

      expect(screen.getByRole('button')).toHaveClass(styles['size-xs']!);
    });

    it('assigns the `sm` size class', () => {
      renderWithContent({ size: 'sm' });

      expect(screen.getByRole('button')).toHaveClass(styles['size-sm']!);
    });

    it('assigns the `md` size class', () => {
      renderWithContent({ size: 'md' });

      expect(screen.getByRole('button')).toHaveClass(styles['size-md']!);
    });

    it('assigns the `lg` size class', () => {
      renderWithContent({ size: 'lg' });

      expect(screen.getByRole('button')).toHaveClass(styles['size-lg']!);
    });
  });

  describe('the `type` prop', () => {
    it('assigns the type attribute', () => {
      renderWithContent({ type: 'submit' });

      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('preserves native submit and reset behavior and defaults to a non-submitting button', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn((event: FormEvent<HTMLFormElement>) => event.preventDefault());
      render(
        <form onSubmit={onSubmit}>
          <label>
            Name
            <input defaultValue="Initial name" />
          </label>
          <Button>Default</Button>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </form>,
      );

      await user.click(screen.getByRole('button', { name: 'Default' }));
      expect(onSubmit).not.toHaveBeenCalled();
      await user.click(screen.getByRole('button', { name: 'Submit' }));
      expect(onSubmit).toHaveBeenCalledTimes(1);
      await user.clear(screen.getByRole('textbox', { name: 'Name' }));
      await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Edited name');
      await user.click(screen.getByRole('button', { name: 'Reset' }));
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Initial name');
    });
  });

  describe('forwarded events', () => {
    it('executes the click callback', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });

      fireEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('executes blur and mouseleave callbacks', () => {
      const onBlur = vi.fn();
      const onMouseLeave = vi.fn();
      renderWithContent({ onBlur, onMouseLeave });
      const button = screen.getByRole('button');

      fireEvent.blur(button);
      fireEvent.mouseLeave(button);

      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });
  });

  describe('the `disableFocus` prop', () => {
    it('assigns tabindex -1 and the noPointerEvents class', () => {
      renderWithContent({ disableFocus: true });
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('tabindex', '-1');
      expect(button).toHaveClass(styles.noPointerEvents!);
    });
  });

  it('preserves the original default attributes and classes', () => {
    renderWithContent();
    const button = screen.getByRole('button', { name: content });

    expect(button).toBeEnabled();
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass(styles.primary!, styles['size-md']!);
    expect(button).not.toHaveAttribute('id');
    expect(button).not.toHaveAttribute('aria-label');
    expect(button).not.toHaveAttribute('tabindex');
  });

  it('omits nullable attributes when explicitly set to null', () => {
    renderWithContent({ id: null, ariaLabel: null, type: null });
    const button = screen.getByRole('button');

    expect(button).not.toHaveAttribute('id');
    expect(button).not.toHaveAttribute('aria-label');
    expect(button).not.toHaveAttribute('type');
  });

  describe('keyboard handler', () => {
    it('activates only once over the full Enter key cycle', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderWithContent({ onClick });
      screen.getByRole('button').focus();

      await user.keyboard('{Enter}');

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates only once over the full Space key cycle', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();
      renderWithContent({ onClick });
      screen.getByRole('button').focus();

      await user.keyboard(' ');

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates once and prevents the default action for Enter', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByRole('button');
      const event = createEvent.keyDown(button, { key: 'Enter' });

      fireEvent(button, event);

      expect(event.defaultPrevented).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates once and prevents the default action for Space', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByRole('button');
      const event = createEvent.keyDown(button, { key: ' ' });

      fireEvent(button, event);

      expect(event.defaultPrevented).toBe(true);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('leaves Tab unchanged without activating the button', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByRole('button');
      const event = createEvent.keyDown(button, { key: 'Tab' });

      fireEvent(button, event);

      expect(event.defaultPrevented).toBe(false);
      expect(onClick).not.toHaveBeenCalled();
    });

    it('leaves Escape unchanged without activating the button', () => {
      const onClick = vi.fn();
      renderWithContent({ onClick });
      const button = screen.getByRole('button');
      const event = createEvent.keyDown(button, { key: 'Escape' });

      fireEvent(button, event);

      expect(event.defaultPrevented).toBe(false);
      expect(onClick).not.toHaveBeenCalled();
    });
  });
});
