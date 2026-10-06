import type { SourceFile } from '../../playground/types';
import grid from './DataGrid.tsx?raw';
import types from './DataGrid.types.ts?raw';
import css from './DataGrid.module.css?raw';
import interactionTests from './DataGrid.interactions.test.tsx?raw';
import tests from './DataGrid.test.tsx?raw';

export const sources: readonly SourceFile[] = [
  { name: 'DataGrid.tsx', code: grid },
  { name: 'DataGrid.types.ts', code: types },
  { name: 'DataGrid.module.css', code: css },
  { name: 'DataGrid.test.tsx', code: tests },
  { name: 'DataGrid.interactions.test.tsx', code: interactionTests },
];
