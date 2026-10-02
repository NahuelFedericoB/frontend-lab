import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ButtonDemo } from './Button.demo';
import buttonSource from './Button.tsx?raw';
import cssSource from './Button.module.css?raw';
import testsSource from './Button.test.tsx?raw';
import keyboardSource from '../../utils/handleKeyDown.ts?raw';
import styles from './Button.module.css';

describe('Button demo', () => {
  it('keeps the preview and usage in sync for every displayed property', async () => {
    const user = userEvent.setup();
    render(<ButtonDemo />);

    const label = 'Continue "now" <please>';
    await user.clear(screen.getByRole('textbox', { name: 'Label' }));
    await user.type(screen.getByRole('textbox', { name: 'Label' }), label);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Color' }), 'danger');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Size' }), 'lg');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Type' }), 'reset');

    const button = within(screen.getByRole('region', { name: 'Preview' })).getByRole('button', {
      name: label,
    });
    expect(button).toHaveClass(styles.danger!, styles['size-lg']!);
    expect(button).toHaveAttribute('type', 'reset');
    const usage = screen.getByLabelText('Usage example');
    expect(usage).toHaveTextContent('color="danger"');
    expect(usage).toHaveTextContent('size="lg"');
    expect(usage).toHaveTextContent('type="reset"');
    expect(usage).toHaveTextContent("onClick={() => window.alert('Action executed')}");
    expect(usage).toHaveTextContent(`{${JSON.stringify(label)}}`);

    await user.click(screen.getByRole('checkbox', { name: 'Disabled' }));
    await user.click(screen.getByRole('checkbox', { name: 'Disable focus' }));
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('tabindex', '-1');
    expect(usage).toHaveTextContent('disabled');
    expect(usage).toHaveTextContent('disableFocus');

    await user.click(screen.getByRole('checkbox', { name: 'Disabled' }));
    await user.click(screen.getByRole('checkbox', { name: 'Disable focus' }));
    expect(button).toBeEnabled();
    expect(button).not.toHaveAttribute('tabindex');
    expect(usage).not.toHaveTextContent('disabled');
    expect(usage).not.toHaveTextContent('disableFocus');

    await user.selectOptions(screen.getByRole('combobox', { name: 'Color' }), 'warning');
    expect(button).toHaveClass(styles.warning!);
    expect(usage).toHaveTextContent('color="warning"');
  });

  it('shows the action alert once when the preview button is clicked', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    render(<ButtonDemo />);

    await user.click(within(screen.getByRole('region', { name: 'Preview' })).getByRole('button'));

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Action executed');
  });

  it('shows the action alert once over the full Enter key cycle', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    render(<ButtonDemo />);
    within(screen.getByRole('region', { name: 'Preview' }))
      .getByRole('button')
      .focus();

    await user.keyboard('{Enter}');

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Action executed');
  });

  it('shows the action alert once over the full Space key cycle', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    render(<ButtonDemo />);
    within(screen.getByRole('region', { name: 'Preview' }))
      .getByRole('button')
      .focus();

    await user.keyboard(' ');

    expect(alert).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith('Action executed');
  });

  it('does not show the action alert when the preview button is disabled', async () => {
    const user = userEvent.setup();
    const alert = vi.spyOn(window, 'alert').mockImplementation(() => undefined);
    render(<ButtonDemo />);
    await user.click(screen.getByRole('checkbox', { name: 'Disabled' }));
    const button = within(screen.getByRole('region', { name: 'Preview' })).getByRole('button');

    expect(button).toBeDisabled();
    await user.click(button);

    expect(alert).not.toHaveBeenCalled();
  });

  it('shows actual implementation, CSS, tests and keyboard source independently from demo changes', async () => {
    const user = userEvent.setup();
    render(<ButtonDemo />);

    await user.click(screen.getByRole('button', { name: 'Source' }));
    expect(screen.getByLabelText('Source code: Button.tsx').textContent).toBe(buttonSource);

    await user.selectOptions(screen.getByRole('combobox', { name: 'Color' }), 'success');
    expect(screen.getByLabelText('Source code: Button.tsx').textContent).toBe(buttonSource);

    await user.selectOptions(screen.getByRole('combobox', { name: 'File' }), 'Button.module.css');
    expect(screen.getByLabelText('Source code: Button.module.css').textContent).toBe(cssSource);

    await user.selectOptions(screen.getByRole('combobox', { name: 'File' }), 'Button.test.tsx');
    expect(screen.getByLabelText('Source code: Button.test.tsx').textContent).toBe(testsSource);

    await user.selectOptions(screen.getByRole('combobox', { name: 'File' }), 'handleKeyDown.ts');
    expect(screen.getByLabelText('Source code: handleKeyDown.ts').textContent).toBe(keyboardSource);

    await user.click(screen.getByRole('button', { name: 'Usage' }));
    expect(screen.getByLabelText('Usage example')).toHaveTextContent('color="success"');
  });
});
