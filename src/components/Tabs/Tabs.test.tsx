import { useState } from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Tab } from '../Tab/Tab';
import { Tabs } from './Tabs';

function TabItems({
  activeTab,
  onSelect = null,
}: {
  activeTab: string;
  onSelect?: ((tabKey: string) => void) | null;
}) {
  return (
    <>
      <Tab tabKey="overview" title="Overview" activeTab={activeTab} onSelect={onSelect}>
        Overview content
      </Tab>
      <Tab tabKey="disabled" title="Disabled" activeTab={activeTab} onSelect={onSelect} disabled>
        Disabled content
      </Tab>
      <Tab tabKey="details" title="Details" activeTab={activeTab} onSelect={onSelect}>
        Details content
      </Tab>
    </>
  );
}

function ControlledTabs({ initialTab = 'overview' }: { initialTab?: string }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <Tabs activeTab={activeTab} onSelect={setActiveTab}>
      <TabItems activeTab={activeTab} onSelect={setActiveTab} />
    </Tabs>
  );
}

describe('<Tabs />', () => {
  it('emits the clicked key and waits for activeTab to change before switching the panel', () => {
    const onSelect = vi.fn();
    const { rerender } = render(
      <Tabs activeTab="overview" onSelect={onSelect}>
        <TabItems activeTab="overview" onSelect={onSelect} />
      </Tabs>,
    );

    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));

    expect(onSelect).toHaveBeenCalledExactlyOnceWith('details');
    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();

    rerender(
      <Tabs activeTab="details" onSelect={onSelect}>
        <TabItems activeTab="details" onSelect={onSelect} />
      </Tabs>,
    );

    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('uses the updated selection and callback in both the tabs and keyboard handler', () => {
    const firstOnSelect = vi.fn();
    const nextOnSelect = vi.fn();
    const { rerender } = render(
      <Tabs activeTab="overview" onSelect={firstOnSelect}>
        <TabItems activeTab="overview" onSelect={firstOnSelect} />
      </Tabs>,
    );

    rerender(
      <Tabs activeTab="details" onSelect={nextOnSelect}>
        <TabItems activeTab="details" onSelect={nextOnSelect} />
      </Tabs>,
    );
    fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));
    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Enter' });

    expect(firstOnSelect).not.toHaveBeenCalled();
    expect(nextOnSelect).toHaveBeenCalledTimes(2);
    expect(nextOnSelect).toHaveBeenNthCalledWith(1, 'overview');
    expect(nextOnSelect).toHaveBeenNthCalledWith(2, 'details');
    expect(screen.getByText('Details content')).toBeInTheDocument();
  });

  it('moves right past the active panel and disabled tab, then wraps to the first tab', () => {
    render(<ControlledTabs />);
    const tablist = screen.getByRole('tablist');
    tablist.focus();
    const firstArrow = createEvent.keyDown(tablist, { key: 'ArrowRight' });

    fireEvent(tablist, firstArrow);

    expect(firstArrow.defaultPrevented).toBe(true);
    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Details' }), { key: 'ArrowRight' });

    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('moves left past a disabled tab, then wraps to the last tab', () => {
    render(<ControlledTabs initialTab="details" />);
    const tablist = screen.getByRole('tablist');
    tablist.focus();
    const firstArrow = createEvent.keyDown(tablist, { key: 'ArrowLeft' });

    fireEvent(tablist, firstArrow);

    expect(firstArrow.defaultPrevented).toBe(true);
    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();

    fireEvent.keyDown(screen.getByRole('tab', { name: 'Overview' }), { key: 'ArrowLeft' });

    expect(screen.getByText('Details content')).toBeInTheDocument();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Details' })).toHaveFocus();
  });

  it('stops searching to the right when every tab is disabled', () => {
    const onSelect = vi.fn();
    render(
      <Tabs activeTab="overview" onSelect={onSelect}>
        <Tab tabKey="overview" title="Overview" activeTab="overview" onSelect={onSelect} disabled>
          Overview content
        </Tab>
        <Tab tabKey="details" title="Details" activeTab="overview" onSelect={onSelect} disabled>
          Details content
        </Tab>
      </Tabs>,
    );
    const tablist = screen.getByRole('tablist');
    tablist.focus();

    fireEvent.keyDown(tablist, { key: 'ArrowRight' });

    expect(onSelect).not.toHaveBeenCalled();
    expect(tablist).toHaveFocus();
    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
  });

  it('stops searching to the left when every tab is disabled', () => {
    const onSelect = vi.fn();
    render(
      <Tabs activeTab="overview" onSelect={onSelect}>
        <Tab tabKey="overview" title="Overview" activeTab="overview" onSelect={onSelect} disabled>
          Overview content
        </Tab>
        <Tab tabKey="details" title="Details" activeTab="overview" onSelect={onSelect} disabled>
          Details content
        </Tab>
      </Tabs>,
    );
    const tablist = screen.getByRole('tablist');
    tablist.focus();

    fireEvent.keyDown(tablist, { key: 'ArrowLeft' });

    expect(onSelect).not.toHaveBeenCalled();
    expect(tablist).toHaveFocus();
    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
  });

  it('emits the active key for Enter and stops the keyboard event from bubbling', () => {
    const onSelect = vi.fn();
    const onParentKeyDown = vi.fn();
    render(
      <div onKeyDown={onParentKeyDown}>
        <Tabs activeTab="overview" onSelect={onSelect}>
          <TabItems activeTab="overview" onSelect={onSelect} />
        </Tabs>
      </div>,
    );

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledExactlyOnceWith('overview');
    expect(onParentKeyDown).not.toHaveBeenCalled();
  });

  it('emits the active key for Space and stops the keyboard event from bubbling', () => {
    const onSelect = vi.fn();
    const onParentKeyDown = vi.fn();
    render(
      <div onKeyDown={onParentKeyDown}>
        <Tabs activeTab="details" onSelect={onSelect}>
          <TabItems activeTab="details" onSelect={onSelect} />
        </Tabs>
      </div>,
    );

    fireEvent.keyDown(screen.getByRole('tablist'), { key: ' ' });

    expect(onSelect).toHaveBeenCalledExactlyOnceWith('details');
    expect(onParentKeyDown).not.toHaveBeenCalled();
  });

  it('leaves the selected panel unchanged when no onSelect callback is provided', () => {
    render(
      <Tabs activeTab="overview">
        <TabItems activeTab="overview" />
      </Tabs>,
    );
    const tablist = screen.getByRole('tablist');
    const arrow = createEvent.keyDown(tablist, { key: 'ArrowRight' });

    fireEvent.click(screen.getByRole('tab', { name: 'Details' }));
    fireEvent(tablist, arrow);
    fireEvent.keyDown(tablist, { key: 'Enter' });

    expect(arrow.defaultPrevented).toBe(false);
    expect(screen.getByText('Overview content')).toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
  });

  it('does not select a tab through the keyboard when no active tab exists', () => {
    const onSelect = vi.fn();
    render(
      <Tabs activeTab="" onSelect={onSelect}>
        <TabItems activeTab="" onSelect={onSelect} />
      </Tabs>,
    );
    const tablist = screen.getByRole('tablist');
    const arrow = createEvent.keyDown(tablist, { key: 'ArrowRight' });

    fireEvent(tablist, arrow);
    fireEvent.keyDown(tablist, { key: 'Enter' });
    fireEvent.keyDown(tablist, { key: ' ' });

    expect(arrow.defaultPrevented).toBe(false);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.queryByText('Overview content')).not.toBeInTheDocument();
    expect(screen.queryByText('Details content')).not.toBeInTheDocument();
    expect(screen.queryByText('Disabled content')).not.toBeInTheDocument();
  });

  it('leaves Tab available for native focus navigation without selecting a tab', () => {
    const onSelect = vi.fn();
    const onParentKeyDown = vi.fn();
    render(
      <div onKeyDown={onParentKeyDown}>
        <Tabs activeTab="overview" onSelect={onSelect}>
          <TabItems activeTab="overview" onSelect={onSelect} />
        </Tabs>
      </div>,
    );
    const tablist = screen.getByRole('tablist');
    const event = createEvent.keyDown(tablist, { key: 'Tab' });

    fireEvent(tablist, event);

    expect(event.defaultPrevented).toBe(false);
    expect(onSelect).not.toHaveBeenCalled();
    expect(onParentKeyDown).toHaveBeenCalledTimes(1);
  });
});
