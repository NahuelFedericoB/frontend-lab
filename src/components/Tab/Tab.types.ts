import type { ReactNode } from 'react';

export interface TabProps {
  id?: string | null | undefined;
  className?: string | null;
  ariaLabel?: string | null;
  tabKey?: string;
  activeTab?: string;
  onSelect?: ((tabKey: string) => void) | null;
  disabled?: boolean;
  title?: ReactNode;
  children?: ReactNode;
}
