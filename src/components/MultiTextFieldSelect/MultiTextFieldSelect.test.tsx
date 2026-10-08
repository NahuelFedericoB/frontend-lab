import { render, screen, fireEvent } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { MultiTextFieldSelect } from './MultiTextFieldSelect';
import type { MultiTextFieldSelectProps as Props } from './MultiTextFieldSelect.types';

import textFieldStyles from '../TextField/TextField.module.css';
import labelStyles from '../Label/Label.module.css';

import styles from './MultiTextFieldSelect.module.css';

const placeholder = 'Search...';
const options = [
  { label: 'Barry', value: '1' },
  { label: 'John', value: '2' },
  { label: 'Jane', value: '3' },
];

const renderWithOptions = (props?: Props) =>
  render(<MultiTextFieldSelect options={options} placeholder={placeholder} {...props} />);

vi.useFakeTimers();

describe('MultiTextFieldSelect', () => {
  it('should render correctly', () => {
    const { container } = renderWithOptions();

    expect(container).toMatchSnapshot();
  });

  describe('the `id` prop', () => {
    it('should assign the id attribute', () => {
      const id = 'test id';
      renderWithOptions({ id });

      expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('id', id);
    });
  });

  describe('the `class` prop', () => {
    it('should assign the class attribute', () => {
      const className = 'test-class';
      renderWithOptions({ class: className });

      expect(screen.getByPlaceholderText(placeholder).closest('div')).toHaveClass(className);
    });
  });

  describe('the `ariaLabel` prop', () => {
    it('should assign the aria-label attribute', () => {
      const ariaLabel = 'test aria label';
      renderWithOptions({ ariaLabel });

      expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('aria-label', ariaLabel);
    });
  });

  describe('the `ariaDescribedBy` prop', () => {
    it('should assign the aria-label attribute', () => {
      const ariaDescribedBy = 'test aria description';
      renderWithOptions({ ariaDescribedBy });

      expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
        'aria-describedby',
        ariaDescribedBy,
      );
    });
  });

  describe('the `ariaLabelledBy` prop', () => {
    it('should assign the aria-label attribute', () => {
      const ariaLabelledBy = 'test aria labelled';
      renderWithOptions({ ariaLabelledBy });

      expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute(
        'aria-labelledby',
        ariaLabelledBy,
      );
    });
  });

  describe('the `disabled` prop', () => {
    it('should disable the input', () => {
      renderWithOptions({ disabled: true });

      expect(screen.getByPlaceholderText(placeholder)).toBeDisabled();
    });
  });

  describe('the `invalid` prop', () => {
    it('should add the invalid class', () => {
      renderWithOptions({ invalid: true });

      expect(screen.getByPlaceholderText(placeholder)).toHaveClass(textFieldStyles.invalid!);
    });
  });

  describe('the `name` prop', () => {
    it('should assign the name attribute to the internal input', () => {
      const name = 'test name';
      renderWithOptions({ name });

      expect(screen.getByPlaceholderText(placeholder).previousElementSibling).toHaveAttribute(
        'name',
        name,
      );
    });
  });

  describe('the `placeholder` prop', () => {
    it('should assign the placeholder attribute', () => {
      renderWithOptions();

      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
  });

  describe('the `size` prop', () => {
    it('should assign the `sm` size class', () => {
      const size = 'sm';
      renderWithOptions({ size });

      expect(screen.getByPlaceholderText(placeholder)).toHaveClass(
        textFieldStyles[`size-${size}`]!,
      );
      expect(screen.getByText(options[0]!.label)).toHaveClass(labelStyles[`size-${size}`]!);
      expect(screen.getByPlaceholderText(placeholder).nextElementSibling).toHaveClass(
        styles[`arrow-${size}`]!,
      );
    });

    it('should assign the `md` size class', () => {
      const size = 'md';
      renderWithOptions({ size });

      expect(screen.getByPlaceholderText(placeholder)).toHaveClass(
        textFieldStyles[`size-${size}`]!,
      );
      expect(screen.getByText(options[0]!.label)).toHaveClass(labelStyles[`size-${size}`]!);
      expect(screen.getByPlaceholderText(placeholder).nextElementSibling).toHaveClass(
        styles[`arrow-${size}`]!,
      );
    });

    it('should assign the `lg` size class', () => {
      const size = 'lg';
      renderWithOptions({ size });

      expect(screen.getByPlaceholderText(placeholder)).toHaveClass(
        textFieldStyles[`size-${size}`]!,
      );
      expect(screen.getByText(options[0]!.label)).toHaveClass(labelStyles[`size-${size}`]!);
      expect(screen.getByPlaceholderText(placeholder).nextElementSibling).toHaveClass(
        styles[`arrow-${size}`]!,
      );
    });
  });

  describe('the `value` prop', () => {
    it('should assign the value to the input', () => {
      const value = [options[0]!, options[1]!];
      renderWithOptions({ value });
      expect(screen.getByPlaceholderText(placeholder)).toHaveValue(
        `${options[0]!.label}, ${options[1]!.label} `,
      );
    });
  });

  describe('when there is a value set', () => {
    describe('and the `clearable` prop is false', () => {
      it('should NOT render the clear button', () => {
        const clearable = false;
        renderWithOptions({ value: [options[0]!], clearable });

        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });
    });

    describe('and the `clearable` prop is true', () => {
      it('should render the clear button', () => {
        const clearable = true;
        renderWithOptions({ value: [options[0]!], clearable });

        expect(screen.queryByRole('button')).toBeInTheDocument();
      });
    });

    describe('and the `clearButtonAriaLabel` is set', () => {
      it('should render the clear button', () => {
        const clearButtonAriaLabel = 'test clear button';
        renderWithOptions({ value: [options[0]!], clearButtonAriaLabel });

        expect(screen.queryByLabelText(clearButtonAriaLabel)).toBeInTheDocument();
      });
    });

    describe('when the clear button is clicked', () => {
      it('should clear the value', async () => {
        renderWithOptions();
        fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.click(screen.getByText(options[0]!.label));

        expect(screen.getByPlaceholderText(placeholder)).toHaveValue(`${options[0]!.label} `);

        await fireEvent.click(screen.getByLabelText('Clear Button'));

        expect(screen.getByPlaceholderText(placeholder)).toHaveValue('');
      });
    });
  });

  describe('the `onselectoption` prop', () => {
    it('should call the function with the selected value', () => {
      const onselectoption = vi.fn();
      renderWithOptions({ onselectoption });
      fireEvent.click(screen.getByPlaceholderText(placeholder));

      fireEvent.click(screen.getByText(options[0]!.label));

      expect(onselectoption).toHaveBeenCalledWith([options[0]!], options[0]!, true);
    });
  });

  describe('the options box', () => {
    describe('when the input is clicked', () => {
      it('should render the options', () => {
        renderWithOptions();
        fireEvent.click(screen.getByPlaceholderText(placeholder));

        expect(screen.getByText(options[0]!.label)).toBeInTheDocument();
        expect(screen.getByText(options[1]!.label)).toBeInTheDocument();
        expect(screen.getByText(options[2]!.label)).toBeInTheDocument();
      });
    });

    describe('when the input is focused', () => {
      describe('when the user types in the input', () => {
        it('should filter the options based on the input', async () => {
          renderWithOptions();
          await fireEvent.focus(screen.getByPlaceholderText(placeholder));
          await fireEvent.input(screen.getByPlaceholderText(placeholder), {
            target: { value: 'j' },
          });

          expect(
            screen.queryByText(options[0]!.label)!.closest(`.${styles.dropdownOption}`)!,
          ).toHaveAttribute('aria-hidden', 'true');
          expect(
            screen.getByText(options[1]!.label).closest(`.${styles.dropdownOption}`)!,
          ).toHaveAttribute('aria-hidden', 'false');
          expect(
            screen.getByText(options[2]!.label).closest(`.${styles.dropdownOption}`)!,
          ).toHaveAttribute('aria-hidden', 'false');
        });

        describe('when there is no match', () => {
          it('should render the `noOptionsMessage`', async () => {
            const noOptionsMessage = 'No options available';
            renderWithOptions({ noOptionsMessage });
            await fireEvent.focus(screen.getByPlaceholderText(placeholder));

            await fireEvent.input(screen.getByPlaceholderText(placeholder), {
              target: { value: 'z' },
            });

            expect(screen.getByText(noOptionsMessage)).toBeInTheDocument();
          });
        });
      });
    });

    describe('when the input lose focus', () => {
      it('should hide the options', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));

        await fireEvent.click(document.body);

        expect(screen.queryByText(options[0]!.label)!.closest('datalist')).toHaveStyle(
          'display: none',
        );
      });
    });

    describe('when the user mouse over an option', () => {
      it('should highlight the option', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));

        await fireEvent.mouseEnter(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        );

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);
      });
    });

    describe('when an option is clicked', () => {
      it('should call the `onselectoption` function and set the value', async () => {
        const onselectoption = vi.fn();
        renderWithOptions({ onselectoption });
        await fireEvent.click(screen.getByPlaceholderText(placeholder));

        await fireEvent.click(screen.getByText(options[0]!.label));

        expect(onselectoption).toHaveBeenCalledWith([options[0]!], options[0]!, true);
        expect(screen.getByPlaceholderText(placeholder)).toHaveValue(`${options[0]!.label} `);
      });
    });

    describe('when the user press the down arrow', () => {
      it('should highlight the next option', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);

        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowDown',
          code: 'ArrowDown',
        });

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).not.toHaveClass(styles.highlight!);
        expect(
          screen.getByText(options[1]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);
      });
    });

    describe('when the user press the down arrow and an option is already selected', () => {
      it('should highlight the next option', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));
        await fireEvent.click(
          screen.getByText(options[1]!.label).closest(`.${styles.dropdownOption}`)!,
        );
        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowDown',
          code: 'ArrowDown',
        });

        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowDown',
          code: 'ArrowDown',
        });

        expect(
          screen.getByText(options[2]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);
      });
    });

    describe('when the user press the up arrow', () => {
      it('should highlight the previous option', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);

        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowUp',
          code: 'ArrowUp',
        });

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).not.toHaveClass(styles.highlight!);
        expect(
          screen.getByText(options[2]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);
      });
    });

    describe('when the user press the up arrow and an option is already selected', () => {
      it('should highlight the previous option', async () => {
        renderWithOptions();
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));
        await fireEvent.click(screen.getByText(options[1]!.label));
        await fireEvent.mouseEnter(
          screen.getByText(options[1]!.label).closest(`.${styles.dropdownOption}`)!,
        );
        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowUp',
          code: 'ArrowUp',
        });

        expect(
          screen.getByText(options[0]!.label).closest(`.${styles.dropdownOption}`)!,
        ).toHaveClass(styles.highlight!);
      });
    });

    describe('when the user press the `Enter` key on a highlighted option', () => {
      it('should call the `onselectoption` function and set the value', async () => {
        const onselectoption = vi.fn();
        renderWithOptions({ onselectoption });
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));
        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowDown',
          code: 'ArrowDown',
        });

        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'Enter',
          code: 'Enter',
        });

        expect(onselectoption).toHaveBeenCalledWith([options[1]!], options[1]!, true);
        expect(screen.getByPlaceholderText(placeholder)).toHaveValue(`${options[1]!.label} `);
      });
    });

    describe('when the user press the `Enter` key on a selected option', () => {
      it('should call the `onselectoption` function and set the value', async () => {
        const onselectoption = vi.fn();
        renderWithOptions({ onselectoption });
        await fireEvent.click(screen.getByPlaceholderText(placeholder));
        await fireEvent.focus(screen.getByPlaceholderText(placeholder));
        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'ArrowDown',
          code: 'ArrowDown',
        });

        await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
          key: 'Enter',
          code: 'Enter',
        });

        expect(onselectoption).toHaveBeenCalledWith([options[1]!], options[1]!, true);
        expect(screen.getByPlaceholderText(placeholder)).toHaveValue(`${options[1]!.label} `);
      });
    });

    describe('when the user press the `Spacebar`', () => {
      describe('and there is an option set', () => {
        it('should ignore it', async () => {
          renderWithOptions({ value: [options[0]!] });
          await fireEvent.click(screen.getByPlaceholderText(placeholder));

          await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
            key: ' ',
            code: 'Space',
          });

          expect(screen.getByPlaceholderText(placeholder)).toHaveValue(`${options[0]!.label} `);
        });
      });
    });

    describe('when the user press the `Delete` or `Backspace` key', () => {
      describe('and there is an option set', () => {
        it('should clear the value', async () => {
          renderWithOptions({ value: [options[0]!] });
          await fireEvent.click(screen.getByPlaceholderText(placeholder));

          await fireEvent.keyDown(screen.getByPlaceholderText(placeholder), {
            key: 'Delete',
            code: 'Delete',
          });

          expect(screen.getByPlaceholderText(placeholder)).toHaveValue('');
        });
      });
    });
  });

  describe('the `disableInput` prop', () => {
    it('should set the input as readonly', () => {
      renderWithOptions({ disableInput: true });

      expect(screen.getByPlaceholderText(placeholder)).toHaveAttribute('readonly');
    });
  });
});
