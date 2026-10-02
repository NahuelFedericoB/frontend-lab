import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Tab } from './Tab';
import styles from './Tab.module.css';

describe('<Tab />', () => {
  it('emits its key on click and waits for the parent to update activeTab', () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <Tab tabKey="details" activeTab="overview" onSelect={onSelect} title="Details">
        Details content
      </Tab>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Details', selected: false }));

    expect(onSelect).toHaveBeenCalledExactlyOnceWith('details');
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveAttribute('aria-selected', 'false');

    rerender(
      <Tab tabKey="details" activeTab="details" onSelect={onSelect} title="Details">
        Details content
      </Tab>,
    );

    expect(screen.getByRole('tab', { name: 'Details', selected: true })).toBeInTheDocument();
    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledTimes(1);

    rerender(
      <Tab tabKey="details" activeTab="overview" onSelect={onSelect} title="Details">
        Details content
      </Tab>,
    );

    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details', selected: false })).toBeInTheDocument();
  });

  it('uses the latest callback supplied by the parent', () => {
    const firstOnSelect = vi.fn();
    const nextOnSelect = vi.fn();
    const { rerender } = render(<Tab tabKey="details" title="Details" onSelect={firstOnSelect} />);

    rerender(<Tab tabKey="details" title="Details" onSelect={nextOnSelect} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));

    expect(firstOnSelect).not.toHaveBeenCalled();
    expect(nextOnSelect).toHaveBeenCalledExactlyOnceWith('details');
  });

  it('exposes the disabled state while leaving selection controlled by activeTab', () => {
    render(
      <Tab tabKey="overview" activeTab="overview" title="Overview" disabled>
        Overview content
      </Tab>,
    );
    const tab = screen.getByRole('tab', { name: 'Overview', selected: true });

    expect(tab).toHaveAttribute('aria-disabled', 'true');
    expect(tab).toHaveClass(styles.disabled!);
    expect(screen.getByText('Overview content')).toBeInTheDocument();
  });

  it('supports rendering and clicking without an onSelect callback', () => {
    render(
      <Tab tabKey="overview" activeTab="overview" title="Overview" onSelect={null}>
        Overview content
      </Tab>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));

    expect(screen.getByRole('tab', { name: 'Overview', selected: true })).toBeInTheDocument();
    expect(screen.getByText('Overview content')).toBeInTheDocument();
  });

  it('applies the supplied attributes and omits them when set to null', () => {
    const { rerender } = render(
      <Tab
        tabKey="overview"
        title="Overview"
        id="overview-tab"
        ariaLabel="Project overview"
        className="custom-tab"
      />,
    );
    const tab = screen.getByRole('tab', { name: 'Project overview' });

    expect(tab).toHaveAttribute('id', 'overview-tab');
    expect(tab).toHaveAttribute('data-tabkey', 'overview');
    expect(tab).toHaveClass('custom-tab');

    rerender(
      <Tab tabKey="overview" title="Overview" id={null} ariaLabel={null} className={null} />,
    );

    expect(screen.getByRole('tab', { name: 'Overview' })).not.toHaveAttribute('id');
    expect(screen.getByRole('tab', { name: 'Overview' })).not.toHaveAttribute('aria-label');
    expect(screen.getByRole('tab', { name: 'Overview' })).not.toHaveClass('custom-tab');
  });
});
