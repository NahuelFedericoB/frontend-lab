import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { Spinner } from './Spinner';

import styles from './Spinner.module.css';

describe('<Spinner />', () => {
  const getSpinner = () => screen.getByRole('status');

  it('renders correctly', () => {
    const { container } = render(<Spinner />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="_loadingIndicator_12c993"
        >
          <div
            class="_spinner_12c993 _size-md_12c993"
            role="status"
            style="color: var(--primary);"
          />
          <div
            class="_message_12c993 _text-md_12c993"
          />
        </div>
      </div>
    `);
  });

  it('assigns the size prop', () => {
    const { rerender } = render(<Spinner size="xs" />);
    expect(getSpinner()).toHaveClass(styles['size-xs']!);

    rerender(<Spinner size="sm" />);
    expect(getSpinner()).toHaveClass(styles['size-sm']!);

    rerender(<Spinner size="md" />);
    expect(getSpinner()).toHaveClass(styles['size-md']!);

    rerender(<Spinner size="lg" />);
    expect(getSpinner()).toHaveClass(styles['size-lg']!);

    rerender(<Spinner size="xl" />);
    expect(getSpinner()).toHaveClass(styles['size-xl']!);
  });

  it('assigns the predefined color prop', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--primary);');

    rerender(<Spinner color="secondary" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--secondary);');

    rerender(<Spinner color="success" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--success);');

    rerender(<Spinner color="danger" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--danger);');

    rerender(<Spinner color="warning" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--warning);');

    rerender(<Spinner color="info" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--info);');

    rerender(<Spinner color="dark" />);
    expect(getSpinner()).toHaveAttribute('style', 'color: var(--dark);');
  });

  it('applies a custom color', () => {
    render(<Spinner color="black" />);

    expect(getSpinner()).toHaveAttribute('style', 'color: black;');
  });

  it('renders the supplied content with the message size', () => {
    render(<Spinner size="lg">Loading users...</Spinner>);

    expect(screen.getByText('Loading users...')).toHaveClass(styles['text-lg']!);
  });
});
