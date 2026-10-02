import { ButtonDemo } from '../components/Button/Button.demo';
import { TabDemo } from '../components/Tab/Tab.demo';
import { TabsDemo } from '../components/Tabs/Tabs.demo';
import type { ComponentDefinition } from './types';

// Add each reviewed React component here with its dedicated demo.
export const componentRegistry: readonly ComponentDefinition[] = [
  {
    slug: 'button',
    name: 'Button',
    description: 'A button with five color variants, five sizes, and keyboard interaction.',
    category: 'Actions',
    Demo: ButtonDemo,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Controlled tabs with custom titles, disabled states, and keyboard navigation.',
    category: 'Navigation',
    Demo: TabsDemo,
  },
  {
    slug: 'tab',
    name: 'Tab',
    description: 'An individual tab with a custom title, controlled content',
    category: 'Navigation',
    Demo: TabDemo,
  },
];
