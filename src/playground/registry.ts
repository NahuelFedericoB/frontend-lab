import { CheckboxDemo } from '../components/Checkbox/Checkbox.demo';
import { MultiTextFieldSelectDemo } from '../components/MultiTextFieldSelect/MultiTextFieldSelect.demo';
import { SwitchButtonDemo } from '../components/SwitchButton/SwitchButton.demo';
import { TooltipDemo } from '../components/Tooltip/Tooltip.demo';
import { ButtonDemo } from '../components/Button/Button.demo';
import { ButtonGroupDemo } from '../components/ButtonGroup/ButtonGroup.demo';
import { ButtonGroupTileDemo } from '../components/ButtonGroupTile/ButtonGroupTile.demo';
import { TabDemo } from '../components/Tab/Tab.demo';
import { TabsDemo } from '../components/Tabs/Tabs.demo';
import { DataGridDemo } from '../components/DataGrid/DataGrid.demo';
import { SpinnerDemo } from '../components/Spinner/Spinner.demo';
import { PaginationDemo } from '../components/Pagination/Pagination.demo';
import type { ComponentDefinition } from './types';

export const componentRegistry: readonly ComponentDefinition[] = [
  {
    slug: 'button',
    name: 'Button',
    description: 'A button with five color variants, five sizes, and keyboard interaction.',
    category: 'Actions',
    Demo: ButtonDemo,
  },
  {
    slug: 'button-group',
    name: 'ButtonGroup',
    description: 'A group of buttons arranged horizontally or vertically with custom content.',
    category: 'Actions',
    Demo: ButtonGroupDemo,
  },
  {
    slug: 'button-group-tile',
    name: 'ButtonGroupTile',
    description:
      'An individual button tile with three sizes, active and disabled states, and keyboard interaction.',
    category: 'Actions',
    Demo: ButtonGroupTileDemo,
  },
  {
    slug: 'checkbox',
    name: 'Checkbox',
    description:
      'A checkbox with three sizes, validation styles, and disabled and indeterminate states.',
    category: 'Inputs',
    Demo: CheckboxDemo,
  },
  {
    slug: 'multi-text-field-select',
    name: 'MultiTextFieldSelect',
    description:
      'A searchable multi-select field with keyboard navigation, three sizes, and optional clearing.',
    category: 'Inputs',
    Demo: MultiTextFieldSelectDemo,
  },
  {
    slug: 'switch-button',
    name: 'SwitchButton',
    description:
      'A controlled two-sided switch with custom labels, four sizes, and keyboard interaction.',
    category: 'Inputs',
    Demo: SwitchButtonDemo,
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
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Controlled pagination with simple and segmented views and three sizes.',
    category: 'Navigation',
    Demo: PaginationDemo,
  },
  {
    slug: 'data-grid',
    name: 'DataGrid',
    description:
      'A data grid with column reordering, resizing, row selection, and custom cell formatters.',
    category: 'Data display',
    Demo: DataGridDemo,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    description:
      'A tooltip with custom content and four placements, shown when hovering over its target.',
    category: 'Feedback',
    Demo: TooltipDemo,
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    description:
      'A loading indicator with five sizes, predefined or custom colors, and optional content.',
    category: 'Feedback',
    Demo: SpinnerDemo,
  },
];
