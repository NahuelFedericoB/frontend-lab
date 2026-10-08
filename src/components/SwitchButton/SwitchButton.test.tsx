import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { SwitchButton } from './SwitchButton';
import type { SwitchButtonProps } from './SwitchButton.types';

import styles from './SwitchButton.module.css';

const renderWithContent = (props: SwitchButtonProps) => render(<SwitchButton {...props} />);

describe('<SwitchButton />', () => {
  it('should render correctly', () => {
    const { container } = render(<SwitchButton />);

    expect(container).toMatchSnapshot();
  });

  describe('the `id` prop', () => {
    it('should assign the id attribute', () => {
      const id = 'test id';
      renderWithContent({ id });

      expect(screen.getByRole('button')).toHaveAttribute('id', id);
    });
  });

  describe('the className prop', () => {
    it('should assing the `class`', () => {
      const className = 'test class';
      renderWithContent({ class: className });

      expect(screen.getByRole('button')).toHaveClass(className);
    });
  });

  describe('the `ariaLabel` prop', () => {
    it('should assign the aria-label attribute', () => {
      const ariaLabel = 'test aria label';
      renderWithContent({ ariaLabel });

      expect(screen.queryByLabelText(ariaLabel)).toBeInTheDocument();
    });
  });

  describe('the `ariaDescribedBy` prop', () => {
    it('should assign the ariaDescribedBy attribute', async () => {
      const ariaDescribedBy = 'test ariaDescribedBy';
      renderWithContent({ ariaDescribedBy });

      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', ariaDescribedBy);
    });
  });

  describe('the `disabled` prop', () => {
    it('should disable the toggle', async () => {
      renderWithContent({ disabled: true });

      expect(screen.getByRole('button')).toHaveClass(styles.disabled!);
    });
  });

  describe('the `onclick` event', () => {
    it('should execute the passed callback', async () => {
      const onClick = vi.fn();
      renderWithContent({ onclick: onClick });
      const button = screen.getByRole('button');

      await fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('the `rightLabel` prop', () => {
    it('should show the passed right label', () => {
      const rightLabel = 'rightLabel Test';
      renderWithContent({ rightLabel });

      expect(screen.queryByText(rightLabel)).toBeInTheDocument();
    });
  });

  describe('the `leftLabel` prop', () => {
    it('should show the passed left label', () => {
      const leftLabel = 'leftLabel Test';
      renderWithContent({ leftLabel });

      expect(screen.queryByText(leftLabel)).toBeInTheDocument();
    });
  });

  describe('the `size` prop', () => {
    it('should assign the `xs` size class', () => {
      const size = 'xs';
      renderWithContent({ size });

      expect(screen.getByRole('button')).toHaveClass(styles[`size-${size}`]!);
    });

    it('should assign the `sm` size class', () => {
      const size = 'sm';
      renderWithContent({ size });

      expect(screen.getByRole('button')).toHaveClass(styles[`size-${size}`]!);
    });

    it('should assign the `md` size class', () => {
      const size = 'md';
      renderWithContent({ size });

      expect(screen.getByRole('button')).toHaveClass(styles[`size-${size}`]!);
    });

    it('should assign the `lg` size class', () => {
      const size = 'lg';
      renderWithContent({ size });

      expect(screen.getByRole('button')).toHaveClass(styles[`size-${size}`]!);
    });
  });

  describe('the `activeSide` prop', () => {
    describe('when the activeSide is `right`', () => {
      it('should apply the correct active class', () => {
        const activeSide = 'right';
        renderWithContent({ activeSide });
        const rightSide = screen.getByRole('button').querySelector(`.${styles.rightSide}`);
        const leftSide = screen.getByRole('button').querySelector(`.${styles.leftSide}`);

        expect(rightSide).toHaveClass(styles.activeFont!);
        expect(leftSide).not.toHaveClass(styles.activeFont!);
      });
    });

    describe('when the activeSide is `left`', () => {
      it('should apply the correct active class', () => {
        const activeSide = 'left';
        renderWithContent({ activeSide });
        const rightSide = screen.getByRole('button').querySelector(`.${styles.rightSide}`);
        const leftSide = screen.getByRole('button').querySelector(`.${styles.leftSide}`);

        expect(rightSide).not.toHaveClass(styles.activeFont!);
        expect(leftSide).toHaveClass(styles.activeFont!);
      });
    });
  });
});
