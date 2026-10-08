import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupProps } from './ButtonGroup.types';

import styles from './ButtonGroup.module.css';

const content = 'ButtonGroup';
const renderWithContent = (props: ButtonGroupProps = {}) =>
  render(<ButtonGroup {...props}>{content}</ButtonGroup>);

describe('<ButtonGroup />', () => {
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
});
