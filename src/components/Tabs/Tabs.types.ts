import type { ReactNode } from 'react';

export interface TabsProps {
  id?: string | null | undefined;
  ariaLabel?: string | null;
  className?: string | null;
  onSelect?: ((tabKey: string) => void) | null;
  fullHeight?: boolean;
  activeTab?: string;
  children?: ReactNode;
}
