import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';
import { Pagination } from './Pagination';
import boundaryStyles from './PaginationBoundary.module.css';
import itemStyles from './PaginationItem.module.css';

import ellipsisStyles from './PaginationEllipsis.module.css';

describe('<Pagination />', () => {
  it('should render correctly', () => {
    const { container } = render(<Pagination />);

    expect(container).toMatchSnapshot();
  });

  it('should assign the custom class', () => {
    render(<Pagination class="custom-pagination" />);

    expect(screen.getByRole('list')).toHaveClass('custom-pagination');
  });

  it('should leave the active page under parent control', async () => {
    const user = userEvent.setup();
    const onPageClick = vi.fn();
    const { rerender } = render(<Pagination pages={5} activePage={1} onPageClick={onPageClick} />);

    await user.click(screen.getByRole('button', { name: '2' }));

    expect(onPageClick).toHaveBeenCalledWith(2);
    expect(screen.getByRole('button', { name: '1' })).toHaveClass(itemStyles.isActive!);
    expect(screen.getByRole('button', { name: '2' })).not.toHaveClass(itemStyles.isActive!);

    rerender(<Pagination pages={5} activePage={2} onPageClick={onPageClick} />);

    expect(screen.getByRole('button', { name: '2' })).toHaveClass(itemStyles.isActive!);
  });

  it('should activate a page with Enter', async () => {
    const user = userEvent.setup();
    const onPageClick = vi.fn();
    render(<Pagination pages={5} onPageClick={onPageClick} />);
    screen.getByRole('button', { name: '2' }).focus();

    await user.keyboard('{Enter}');

    expect(onPageClick).toHaveBeenCalledExactlyOnceWith(2);
  });

  it('should activate a page with Space', async () => {
    const user = userEvent.setup();
    const onPageClick = vi.fn();
    render(<Pagination pages={5} onPageClick={onPageClick} />);
    screen.getByRole('button', { name: '2' }).focus();

    await user.keyboard(' ');

    expect(onPageClick).toHaveBeenCalledExactlyOnceWith(2);
  });

  describe('when a size is passed to segmented pagination', () => {
    it('should apply the small size to boundaries, page numbers, and ellipses', () => {
      render(<Pagination pages={10} pagesPerSegment={3} size="sm" />);

      expect(screen.getByRole('button', { name: 'first' })).toHaveClass(boundaryStyles['size-sm']!);
      expect(screen.getByRole('button', { name: 'previous' })).toHaveClass(
        boundaryStyles['size-sm']!,
      );
      expect(screen.getByRole('button', { name: 'next' })).toHaveClass(boundaryStyles['size-sm']!);
      expect(screen.getByRole('button', { name: 'last' })).toHaveClass(boundaryStyles['size-sm']!);
      expect(screen.getByRole('button', { name: '1' })).toHaveClass(itemStyles['size-sm']!);
      expect(screen.getByRole('button', { name: '2' })).toHaveClass(itemStyles['size-sm']!);
      expect(screen.getByRole('button', { name: '10' })).toHaveClass(itemStyles['size-sm']!);
      expect(screen.getAllByText('...')[0]).toHaveClass(ellipsisStyles['size-sm']!);
      expect(screen.getAllByText('...')[1]).toHaveClass(ellipsisStyles['size-sm']!);
    });

    it('should apply the medium size to boundaries, page numbers, and ellipses', () => {
      render(<Pagination pages={10} pagesPerSegment={3} size="md" />);

      expect(screen.getByRole('button', { name: 'first' })).toHaveClass(boundaryStyles['size-md']!);
      expect(screen.getByRole('button', { name: 'previous' })).toHaveClass(
        boundaryStyles['size-md']!,
      );
      expect(screen.getByRole('button', { name: 'next' })).toHaveClass(boundaryStyles['size-md']!);
      expect(screen.getByRole('button', { name: 'last' })).toHaveClass(boundaryStyles['size-md']!);
      expect(screen.getByRole('button', { name: '1' })).toHaveClass(itemStyles['size-md']!);
      expect(screen.getByRole('button', { name: '2' })).toHaveClass(itemStyles['size-md']!);
      expect(screen.getByRole('button', { name: '10' })).toHaveClass(itemStyles['size-md']!);
      expect(screen.getAllByText('...')[0]).toHaveClass(ellipsisStyles['size-md']!);
      expect(screen.getAllByText('...')[1]).toHaveClass(ellipsisStyles['size-md']!);
    });

    it('should apply the large size to boundaries, page numbers, and ellipses', () => {
      render(<Pagination pages={10} pagesPerSegment={3} size="lg" />);

      expect(screen.getByRole('button', { name: 'first' })).toHaveClass(boundaryStyles['size-lg']!);
      expect(screen.getByRole('button', { name: 'previous' })).toHaveClass(
        boundaryStyles['size-lg']!,
      );
      expect(screen.getByRole('button', { name: 'next' })).toHaveClass(boundaryStyles['size-lg']!);
      expect(screen.getByRole('button', { name: 'last' })).toHaveClass(boundaryStyles['size-lg']!);
      expect(screen.getByRole('button', { name: '1' })).toHaveClass(itemStyles['size-lg']!);
      expect(screen.getByRole('button', { name: '2' })).toHaveClass(itemStyles['size-lg']!);
      expect(screen.getByRole('button', { name: '10' })).toHaveClass(itemStyles['size-lg']!);
      expect(screen.getAllByText('...')[0]).toHaveClass(ellipsisStyles['size-lg']!);
      expect(screen.getAllByText('...')[1]).toHaveClass(ellipsisStyles['size-lg']!);
    });
  });

  describe('when the `id` prop is passed in', () => {
    it('should assign the HTML id', () => {
      render(<Pagination id="pagination" />);

      const pagination = screen.getByText('first').closest('ul');

      expect(pagination).toHaveAttribute('id', 'pagination');
    });
  });

  describe('when the `size` prop is passed in', () => {
    it('should assign the corresponding size class', () => {
      const { rerender } = render(<Pagination size="sm" />);
      const pagination1 = screen.getByText('first').closest('button');

      expect(pagination1).toHaveClass(boundaryStyles['size-sm']!);

      rerender(<Pagination size="md" />);
      const pagination2 = screen.getByText('first').closest('button');

      expect(pagination2).toHaveClass(boundaryStyles['size-md']!);

      rerender(<Pagination size="lg" />);
      const pagination3 = screen.getByText('first').closest('button');

      expect(pagination3).toHaveClass(boundaryStyles['size-lg']!);
    });
  });

  it('should render the component at least with next, previous, last and first', () => {
    render(<Pagination />);

    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('previous')).toBeInTheDocument();
    expect(screen.getByText('next')).toBeInTheDocument();
    expect(screen.getByText('last')).toBeInTheDocument();
  });

  describe('when the `ariaLabel` prop is passed in', () => {
    it('should assign the HTML aria-label attribute', () => {
      render(<Pagination ariaLabel="test aria" />);
      const pagination = screen.getByText('first').closest('ul');

      expect(pagination).toHaveAttribute('aria-label', 'test aria');
    });
  });

  describe('when `pages` prop is defined', () => {
    it('should render specified number of pages plus next, previous, last, first', () => {
      render(<Pagination pages={5} />);

      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('first')).toBeInTheDocument();
      expect(screen.getByText('previous')).toBeInTheDocument();
      expect(screen.getByText('next')).toBeInTheDocument();
      expect(screen.getByText('last')).toBeInTheDocument();
    });

    describe('and the `activePage` prop is passed in', () => {
      it('should set the page as active', () => {
        render(<Pagination pages={5} activePage={2} />);
        const secondPage = screen.getByText('2');

        expect(secondPage.closest('button')).toHaveClass(itemStyles.isActive!);
      });

      describe('and the `activePage` is the first page', () => {
        it('should disable the previous and first buttons', () => {
          const { getByText } = render(<Pagination pages={5} activePage={1} />);

          expect(getByText('previous').closest('button')).toHaveClass(boundaryStyles.isDisabled!);
          expect(getByText('first').closest('button')).toHaveClass(boundaryStyles.isDisabled!);
          expect(getByText('previous').closest('button')).toBeDisabled();
          expect(getByText('first').closest('button')).toBeDisabled();
        });
      });

      describe('and the `activePage` is the last page', () => {
        it('should disable the next and last buttons', () => {
          render(<Pagination pages={5} activePage={5} />);

          expect(screen.getByText('next').closest('button')).toHaveClass(
            boundaryStyles.isDisabled!,
          );
          expect(screen.getByText('last').closest('button')).toHaveClass(
            boundaryStyles.isDisabled!,
          );
          expect(screen.getByRole('button', { name: 'next' })).toBeDisabled();
          expect(screen.getByRole('button', { name: 'last' })).toBeDisabled();
        });
      });
    });

    describe('and the user clicks on any of the pages', () => {
      it('should call the passed `onPageClick` prop with the page number', () => {
        const onPageClickMock = vi.fn();
        render(<Pagination pages={5} onPageClick={onPageClickMock} />);
        const secondPage = screen.getByText('2');

        fireEvent.click(secondPage);

        expect(onPageClickMock).toHaveBeenCalledWith(2);
      });
    });

    describe('and the user clicks more than once the same active page', () => {
      it('should call `onPageClick` again when the active page is clicked', () => {
        const onPageClickMock = vi.fn();
        const { rerender } = render(
          <Pagination activePage={1} pages={5} onPageClick={onPageClickMock} />,
        );
        const secondPage = screen.getByText('2');
        fireEvent.click(secondPage);

        rerender(<Pagination activePage={2} pages={5} onPageClick={onPageClickMock} />);
        fireEvent.click(secondPage);

        expect(onPageClickMock).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('when the `pages` props has an invalid value', () => {
    it('should render without breaking', () => {
      render(<Pagination pages={0} pagesPerSegment={1} />);

      expect(screen.queryByText('first')).toBeInTheDocument();
      expect(screen.queryByText('previous')).toBeInTheDocument();
      expect(screen.queryByText('next')).toBeInTheDocument();
      expect(screen.queryByText('last')).toBeInTheDocument();
    });
  });

  describe('when the user clicks the `next` button', () => {
    it('should call `onNextClick`', () => {
      const onNextClickMock = vi.fn();
      render(<Pagination pages={5} onNextClick={onNextClickMock} />);
      const secondPage = screen.getByText('2');
      const nextButton = screen.getByText('next');

      fireEvent.click(secondPage);
      fireEvent.click(nextButton);

      expect(onNextClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the user clicks the `previous` button', () => {
    it('should call `onPrevClick`', () => {
      const onPrevClickMock = vi.fn();
      render(<Pagination activePage={2} pages={5} onPrevClick={onPrevClickMock} />);
      const secondPage = screen.getByText('2');
      const previousButton = screen.getByText('previous');

      fireEvent.click(secondPage);
      fireEvent.click(previousButton);

      expect(onPrevClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the user clicks the `first` button', () => {
    it('should call `onFirstClick`', () => {
      const onFirstClickMock = vi.fn();
      render(<Pagination activePage={5} pages={5} onFirstClick={onFirstClickMock} />);
      const fifthPage = screen.getByText('5');
      const firstButton = screen.getByText('first');

      fireEvent.click(fifthPage);
      fireEvent.click(firstButton);

      expect(onFirstClickMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('when the user clicks the `last` button', () => {
    it('should call `onLastClick`', () => {
      const onLastClick = vi.fn();
      render(<Pagination pages={5} onLastClick={onLastClick} />);
      const firstPage = screen.getByText('1');
      const lastButton = screen.getByText('last');

      fireEvent.click(firstPage);
      fireEvent.click(lastButton);

      expect(onLastClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('when `pagesPerSegment` prop is defined', () => {
    it('should include page 1 in the first segment of three pages', () => {
      render(<Pagination pages={10} pagesPerSegment={3} />);

      expect(
        screen.getAllByRole('button', { name: /^\d+$/ }).map((page) => page.textContent),
      ).toEqual(['1', '2', '3', '10']);
    });

    it('should include page 1 in the first segment of five pages', () => {
      render(<Pagination pages={10} pagesPerSegment={5} />);

      expect(
        screen.getAllByRole('button', { name: /^\d+$/ }).map((page) => page.textContent),
      ).toEqual(['1', '2', '3', '4', '5', '10']);
    });

    it('should include the last page in its segment without duplicating it', () => {
      render(<Pagination pages={6} pagesPerSegment={3} activePage={6} />);

      expect(
        screen.getAllByRole('button', { name: /^\d+$/ }).map((page) => page.textContent),
      ).toEqual(['1', '4', '5', '6']);
      expect(screen.getByRole('button', { name: '6' })).toHaveClass(itemStyles.isActive!);
    });

    it('should not duplicate endpoints when all pages fit in one segment', () => {
      render(<Pagination pages={3} pagesPerSegment={3} />);

      expect(
        screen.getAllByRole('button', { name: /^\d+$/ }).map((page) => page.textContent),
      ).toEqual(['1', '2', '3']);
    });

    it('should render a single page only once', () => {
      render(<Pagination pages={1} pagesPerSegment={1} />);

      expect(screen.getAllByRole('button', { name: /^\d+$/ })).toHaveLength(1);
      expect(screen.getByRole('button', { name: '1' })).toHaveClass(itemStyles.isActive!);
    });

    it('should disable boundary actions at the first and last pages', () => {
      const onFirstClick = vi.fn();
      const onPrevClick = vi.fn();
      const onNextClick = vi.fn();
      const onLastClick = vi.fn();
      const { rerender } = render(
        <Pagination
          pages={20}
          pagesPerSegment={3}
          activePage={1}
          onFirstClick={onFirstClick}
          onPrevClick={onPrevClick}
        />,
      );

      expect(screen.getByRole('button', { name: 'first' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'previous' })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: 'first' }));
      fireEvent.click(screen.getByRole('button', { name: 'previous' }));
      expect(onFirstClick).not.toHaveBeenCalled();
      expect(onPrevClick).not.toHaveBeenCalled();

      rerender(
        <Pagination
          pages={20}
          pagesPerSegment={3}
          activePage={20}
          onNextClick={onNextClick}
          onLastClick={onLastClick}
        />,
      );

      expect(screen.getByRole('button', { name: 'next' })).toBeDisabled();
      expect(screen.getByRole('button', { name: 'last' })).toBeDisabled();
      fireEvent.click(screen.getByRole('button', { name: 'next' }));
      fireEvent.click(screen.getByRole('button', { name: 'last' }));
      expect(onNextClick).not.toHaveBeenCalled();
      expect(onLastClick).not.toHaveBeenCalled();
    });

    it('should render two ellipses', () => {
      render(<Pagination pages={5} pagesPerSegment={2} />);

      expect(screen.queryAllByText('...')).toHaveLength(2);
    });

    describe('when the user clicks the ellipsis', () => {
      it('should NOT call the `onPageClick` prop', () => {
        const onPageClickMock = vi.fn();
        render(<Pagination pages={5} pagesPerSegment={3} onPageClick={onPageClickMock} />);
        const ellipsisButtons = screen.getAllByText('...');

        expect(ellipsisButtons[0]).toBeDisabled();
        expect(ellipsisButtons[1]).toBeDisabled();
        fireEvent.click(ellipsisButtons[0]!);
        fireEvent.click(ellipsisButtons[1]!);

        expect(onPageClickMock).not.toHaveBeenCalled();
      });
    });

    describe('when the user clicks the `next` button', () => {
      describe('and the active page is set to the page before the right ellipsis', () => {
        it('should move the active range to the right', () => {
          let activePage = 3;
          const setActivePage = (num: number) => (activePage = num);
          const { rerender } = render(
            <Pagination
              activePage={activePage}
              pages={10}
              pagesPerSegment={3}
              onNextClick={() => setActivePage(activePage + 1)}
            />,
          );
          const pageBeforeEllipsis = screen.getByText('3');
          const nextButton = screen.getByText('next');
          fireEvent.click(pageBeforeEllipsis);

          expect(screen.queryByText('1')).toBeInTheDocument();
          expect(screen.queryByText('2')).toBeInTheDocument();
          expect(screen.queryByText('3')).toBeInTheDocument();
          expect(screen.queryByText('4')).not.toBeInTheDocument();
          expect(screen.queryByText('5')).not.toBeInTheDocument();
          expect(screen.queryByText('6')).not.toBeInTheDocument();
          expect(screen.queryByText('7')).not.toBeInTheDocument();
          expect(screen.queryByText('8')).not.toBeInTheDocument();
          expect(screen.queryByText('9')).not.toBeInTheDocument();
          expect(screen.queryByText('10')).toBeInTheDocument();

          fireEvent.click(nextButton);
          rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

          expect(screen.queryByText('1')).toBeInTheDocument();
          expect(screen.queryByText('2')).not.toBeInTheDocument();
          expect(screen.queryByText('3')).not.toBeInTheDocument();
          expect(screen.queryByText('4')).toBeInTheDocument();
          expect(screen.queryByText('5')).toBeInTheDocument();
          expect(screen.queryByText('6')).toBeInTheDocument();
          expect(screen.queryByText('7')).not.toBeInTheDocument();
          expect(screen.queryByText('8')).not.toBeInTheDocument();
          expect(screen.queryByText('9')).not.toBeInTheDocument();
          expect(screen.queryByText('10')).toBeInTheDocument();
        });
      });
    });

    describe('when the user clicks the `previous` button', () => {
      describe('and the active page is set to the page before the left ellipsis', () => {
        it('should move the active range to the left', () => {
          let activePage = 1;
          const setActivePage = (num: number) => (activePage = num);
          const { rerender } = render(
            <Pagination
              activePage={activePage}
              pages={10}
              pagesPerSegment={3}
              onNextClick={() => setActivePage(4)}
              onPrevClick={() => setActivePage(3)}
            />,
          );
          const pageBeforeEllipsis = screen.getByText('3');
          const nextButton = screen.getByText('next');

          fireEvent.click(pageBeforeEllipsis);
          fireEvent.click(nextButton);
          rerender(
            <Pagination
              activePage={activePage}
              pages={10}
              pagesPerSegment={3}
              onPrevClick={() => setActivePage(3)}
            />,
          );

          expect(screen.queryByText('1')).toBeInTheDocument();
          expect(screen.queryByText('2')).not.toBeInTheDocument();
          expect(screen.queryByText('3')).not.toBeInTheDocument();
          expect(screen.queryByText('4')).toBeInTheDocument();
          expect(screen.queryByText('5')).toBeInTheDocument();
          expect(screen.queryByText('6')).toBeInTheDocument();
          expect(screen.queryByText('7')).not.toBeInTheDocument();
          expect(screen.queryByText('8')).not.toBeInTheDocument();
          expect(screen.queryByText('9')).not.toBeInTheDocument();
          expect(screen.queryByText('10')).toBeInTheDocument();

          fireEvent.click(screen.getByText('previous'));
          rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

          expect(screen.queryByText('1')).toBeInTheDocument();
          expect(screen.queryByText('2')).toBeInTheDocument();
          expect(screen.queryByText('3')).toBeInTheDocument();
          expect(screen.queryByText('4')).not.toBeInTheDocument();
          expect(screen.queryByText('5')).not.toBeInTheDocument();
          expect(screen.queryByText('6')).not.toBeInTheDocument();
          expect(screen.queryByText('7')).not.toBeInTheDocument();
          expect(screen.queryByText('8')).not.toBeInTheDocument();
          expect(screen.queryByText('9')).not.toBeInTheDocument();
          expect(screen.queryByText('10')).toBeInTheDocument();
        });
      });
    });

    describe('when the user clicks the `first` button', () => {
      it('should move to the first range', () => {
        let activePage = 1;
        const setActivePage = (num: number) => (activePage = num);
        const { rerender } = render(
          <Pagination
            activePage={activePage}
            pages={10}
            pagesPerSegment={3}
            onFirstClick={() => setActivePage(1)}
            onLastClick={() => setActivePage(10)}
          />,
        );
        const lastButton = screen.getByText('last');

        fireEvent.click(lastButton);
        rerender(
          <Pagination
            activePage={activePage}
            pages={10}
            pagesPerSegment={3}
            onFirstClick={() => setActivePage(1)}
          />,
        );

        expect(screen.queryByText('1')).toBeInTheDocument();
        expect(screen.queryByText('2')).not.toBeInTheDocument();
        expect(screen.queryByText('3')).not.toBeInTheDocument();
        expect(screen.queryByText('4')).not.toBeInTheDocument();
        expect(screen.queryByText('5')).not.toBeInTheDocument();
        expect(screen.queryByText('6')).not.toBeInTheDocument();
        expect(screen.queryByText('7')).not.toBeInTheDocument();
        expect(screen.queryByText('8')).not.toBeInTheDocument();
        expect(screen.queryByText('9')).not.toBeInTheDocument();
        expect(screen.queryByText('10')).toBeInTheDocument();

        fireEvent.click(screen.getByText('first'));
        rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

        expect(screen.queryByText('1')).toBeInTheDocument();
        expect(screen.queryByText('2')).toBeInTheDocument();
        expect(screen.queryByText('3')).toBeInTheDocument();
        expect(screen.queryByText('4')).not.toBeInTheDocument();
        expect(screen.queryByText('5')).not.toBeInTheDocument();
        expect(screen.queryByText('6')).not.toBeInTheDocument();
        expect(screen.queryByText('7')).not.toBeInTheDocument();
        expect(screen.queryByText('8')).not.toBeInTheDocument();
        expect(screen.queryByText('9')).not.toBeInTheDocument();
        expect(screen.queryByText('10')).toBeInTheDocument();
      });
    });

    describe('when the user click the `last` button', () => {
      it('should move to the last range', () => {
        let activePage = 1;
        const setActivePage = (num: number) => (activePage = num);
        const { getByText, queryByText, rerender } = render(
          <Pagination
            activePage={activePage}
            pages={10}
            pagesPerSegment={3}
            onLastClick={() => setActivePage(10)}
          />,
        );
        const lastButton = getByText('last');

        fireEvent.click(lastButton);
        rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

        expect(queryByText('1')).toBeInTheDocument();
        expect(queryByText('2')).not.toBeInTheDocument();
        expect(queryByText('3')).not.toBeInTheDocument();
        expect(queryByText('4')).not.toBeInTheDocument();
        expect(queryByText('5')).not.toBeInTheDocument();
        expect(queryByText('6')).not.toBeInTheDocument();
        expect(queryByText('7')).not.toBeInTheDocument();
        expect(queryByText('8')).not.toBeInTheDocument();
        expect(queryByText('9')).not.toBeInTheDocument();
        expect(queryByText('10')).toBeInTheDocument();
      });
    });
  });

  describe('and the user clicks the first page', () => {
    it('should show the first range', () => {
      let activePage = 1;
      const setActivePage = (num: number) => (activePage = num);
      const { getByText, queryByText, rerender } = render(
        <Pagination
          activePage={activePage}
          pages={10}
          pagesPerSegment={3}
          onNextClick={() => setActivePage(4)}
        />,
      );
      const pageBeforeEllipsis = getByText('3');
      const nextButton = getByText('next');

      fireEvent.click(pageBeforeEllipsis);
      fireEvent.click(nextButton);
      rerender(
        <Pagination
          activePage={activePage}
          pages={10}
          onPageClick={(page) => setActivePage(page)}
          pagesPerSegment={3}
        />,
      );

      expect(queryByText('1')).toBeInTheDocument();
      expect(queryByText('2')).not.toBeInTheDocument();
      expect(queryByText('3')).not.toBeInTheDocument();
      expect(queryByText('4')).toBeInTheDocument();
      expect(queryByText('5')).toBeInTheDocument();
      expect(queryByText('6')).toBeInTheDocument();
      expect(queryByText('7')).not.toBeInTheDocument();
      expect(queryByText('8')).not.toBeInTheDocument();
      expect(queryByText('9')).not.toBeInTheDocument();
      expect(queryByText('10')).toBeInTheDocument();

      fireEvent.click(getByText('1'));
      rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

      expect(queryByText('1')).toBeInTheDocument();
      expect(queryByText('2')).toBeInTheDocument();
      expect(queryByText('3')).toBeInTheDocument();
      expect(queryByText('4')).not.toBeInTheDocument();
      expect(queryByText('5')).not.toBeInTheDocument();
      expect(queryByText('6')).not.toBeInTheDocument();
      expect(queryByText('7')).not.toBeInTheDocument();
      expect(queryByText('8')).not.toBeInTheDocument();
      expect(queryByText('9')).not.toBeInTheDocument();
      expect(queryByText('10')).toBeInTheDocument();
    });
  });

  describe('and the user clicks the last page', () => {
    it('should show the last range', () => {
      let activePage = 1;
      const setActivePage = (num: number) => (activePage = num);
      const { getByText, queryByText, rerender } = render(
        <Pagination
          activePage={activePage}
          pages={10}
          pagesPerSegment={3}
          onPageClick={(page) => setActivePage(page)}
        />,
      );
      const lastPage = getByText('10');

      expect(queryByText('1')).toBeInTheDocument();
      expect(queryByText('2')).toBeInTheDocument();
      expect(queryByText('3')).toBeInTheDocument();
      expect(queryByText('4')).not.toBeInTheDocument();
      expect(queryByText('5')).not.toBeInTheDocument();
      expect(queryByText('6')).not.toBeInTheDocument();
      expect(queryByText('7')).not.toBeInTheDocument();
      expect(queryByText('8')).not.toBeInTheDocument();
      expect(queryByText('9')).not.toBeInTheDocument();
      expect(queryByText('10')).toBeInTheDocument();

      fireEvent.click(lastPage);
      rerender(<Pagination activePage={activePage} pages={10} pagesPerSegment={3} />);

      expect(queryByText('1')).toBeInTheDocument();
      expect(queryByText('2')).not.toBeInTheDocument();
      expect(queryByText('3')).not.toBeInTheDocument();
      expect(queryByText('4')).not.toBeInTheDocument();
      expect(queryByText('5')).not.toBeInTheDocument();
      expect(queryByText('6')).not.toBeInTheDocument();
      expect(queryByText('7')).not.toBeInTheDocument();
      expect(queryByText('8')).not.toBeInTheDocument();
      expect(queryByText('9')).not.toBeInTheDocument();
      expect(queryByText('10')).toBeInTheDocument();
    });
  });
});
