export interface SwitchButtonProps {
  id?: string | null;
  class?: string | null;
  ariaLabel?: string | null;
  ariaDescribedBy?: string | null;
  leftLabel?: string;
  rightLabel?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  activeSide?: 'left' | 'right';
  disabled?: boolean;
  onclick?: VoidFunction;
}
