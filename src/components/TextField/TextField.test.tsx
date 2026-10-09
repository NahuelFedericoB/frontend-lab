import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { TextField } from './TextField';
import type { TextFieldProps } from './TextField.types';

import styles from './TextField.module.css';

const placeholder = 'Placeholder';

const renderWithContent = (props?: TextFieldProps) =>
  render(<TextField placeholder={placeholder} {...props} />);

const getField = () => screen.getByPlaceholderText(placeholder);

describe('<TextField />', () => {
  it('should render correctly', () => {
    const { container } = renderWithContent();

    expect(container).toMatchSnapshot();
  });

  it('should assing the `id` prop', () => {
    const id = 'test id';
    renderWithContent({ id });

    expect(getField()).toHaveAttribute('id', id);
  });

  it('should assign the `class` prop', () => {
    const className = 'test class name';
    renderWithContent({ class: className });

    expect(getField()).toHaveClass(className);
  });

  it('should assign the `ariaLabel` prop', () => {
    const ariaLabel = 'test aria label';
    renderWithContent({ ariaLabel });

    expect(getField()).toHaveAttribute('aria-label', ariaLabel);
  });

  it('should assign the `ariaDescribedBy` prop', () => {
    const ariaDescribedBy = 'test aria described by';
    renderWithContent({ ariaDescribedBy });

    expect(getField()).toHaveAttribute('aria-describedby', ariaDescribedBy);
  });

  it('should assign the `ariaLabelledBy` prop', () => {
    const ariaLabelledBy = 'test aria labelled by';
    renderWithContent({ ariaLabelledBy });

    expect(getField()).toHaveAttribute('aria-labelledby', ariaLabelledBy);
  });

  it('should assing the `autofocus` prop', () => {
    renderWithContent({ autofocus: true });

    expect(getField()).toHaveFocus();
  });

  it('should assign the `size` `sm` prop', () => {
    renderWithContent({ size: 'sm' });

    expect(getField()).toHaveClass(styles['size-sm']!);
  });

  it('should assign the `size` `md` prop', () => {
    renderWithContent({ size: 'md' });

    expect(getField()).toHaveClass(styles['size-md']!);
  });

  it('should assign the `size` `lg` prop', () => {
    renderWithContent({ size: 'lg' });

    expect(getField()).toHaveClass(styles['size-lg']!);
  });

  it('should assing the `valid` prop', () => {
    renderWithContent({ valid: true });

    expect(getField()).toHaveClass(styles.valid!);
  });

  it('should assing the `invalid` prop', () => {
    renderWithContent({ invalid: true });

    expect(getField()).toHaveClass(styles.invalid!);
  });

  it('should assing the `value` prop', () => {
    const value = 'test value';
    renderWithContent({ value });

    expect(getField()).toHaveValue(value);
  });

  it('should assing the `placeholder` prop', () => {
    const placeholder = 'test placeholder';
    renderWithContent({ placeholder });

    expect(screen.queryByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('should assing the `disabled` prop', () => {
    renderWithContent({ disabled: true });

    expect(getField()).toHaveAttribute('disabled', '');
  });

  it('should assing the `readonly` prop', () => {
    renderWithContent({ readonly: true });

    expect(getField()).toHaveAttribute('readonly', '');
  });

  describe('when the readonly prop is set', () => {
    it('should set the aria-readonly attribute', () => {
      const placeholder = 'test placeholder';
      renderWithContent({ placeholder, readonly: true });

      expect(screen.queryByPlaceholderText(placeholder)).toHaveAttribute('aria-readonly', 'true');
    });
  });

  describe('when the readonly prop is NOT set', () => {
    it('should NOT set the aria-readonly attribute', () => {
      const placeholder = 'test placeholder';
      renderWithContent({ placeholder, readonly: false });

      expect(screen.queryByPlaceholderText(placeholder)).toHaveAttribute('aria-readonly', 'false');
    });
  });

  it('should assing the `maxlength` prop', () => {
    renderWithContent({ maxlength: 500 });

    expect(getField()).toHaveAttribute('maxlength', '500');
  });

  it('should assing the `autocomplete` prop', () => {
    const autocomplete = true;
    renderWithContent({ autocomplete });

    expect(getField()).toHaveAttribute('autocomplete', 'on');
  });

  it('should assing the `name` prop', () => {
    const name = 'test name';
    renderWithContent({ name });

    expect(getField()).toHaveAttribute('name', name);
  });

  it('should assing the `list` prop', () => {
    const list = 'test list';
    renderWithContent({ list });

    expect(getField()).toHaveAttribute('list', list);
  });

  it('should assing the `tabindex` prop', () => {
    renderWithContent({ tabindex: -1 });

    expect(getField()).toHaveAttribute('tabindex', '-1');
  });

  it('should call the `onclick` prop', () => {
    const onclick = vi.fn();
    renderWithContent({ onclick });

    fireEvent.click(getField());

    expect(onclick).toHaveBeenCalledTimes(1);
  });

  it('should call the `oninput` prop', () => {
    const oninput = vi.fn();
    renderWithContent({ oninput });

    fireEvent.input(getField());

    expect(oninput).toHaveBeenCalledTimes(1);
  });

  it('should call the `onchange` prop', () => {
    const onchange = vi.fn();
    renderWithContent({ onchange });

    fireEvent.change(getField(), { target: { value: 'test value' } });

    expect(onchange).toHaveBeenCalledTimes(1);
  });

  it('should call the `onkeydown` prop', () => {
    const onkeydown = vi.fn();
    renderWithContent({ onkeydown });

    fireEvent.keyDown(getField());

    expect(onkeydown).toHaveBeenCalledTimes(1);
  });

  it('should call the `onkeyup` prop', () => {
    const onkeyup = vi.fn();
    renderWithContent({ onkeyup });

    fireEvent.keyUp(getField());

    expect(onkeyup).toHaveBeenCalledTimes(1);
  });

  it('should call the `onfocus` prop', () => {
    const onfocus = vi.fn();
    renderWithContent({ onfocus });

    fireEvent.focus(getField());

    expect(onfocus).toHaveBeenCalledTimes(1);
  });

  it('should call the `onblur` prop', () => {
    const onblur = vi.fn();
    renderWithContent({ onblur });

    fireEvent.blur(getField());

    expect(onblur).toHaveBeenCalledTimes(1);
  });

  it('should call the `onfocusout` prop', () => {
    const onfocusout = vi.fn();
    renderWithContent({ onfocusout });

    fireEvent.focusOut(getField());

    expect(onfocusout).toHaveBeenCalledTimes(1);
  });

  it('should call the `onmouseenter` prop', () => {
    const onmouseenter = vi.fn();
    renderWithContent({ onmouseenter });

    fireEvent.mouseEnter(getField());

    expect(onmouseenter).toHaveBeenCalledTimes(1);
  });

  it('should call the `onmouseleave` prop', () => {
    const onmouseleave = vi.fn();
    renderWithContent({ onmouseleave });

    fireEvent.mouseLeave(getField());

    expect(onmouseleave).toHaveBeenCalledTimes(1);
  });
});
