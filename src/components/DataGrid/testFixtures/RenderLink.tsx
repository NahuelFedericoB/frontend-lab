import type { DataGridComponentProps } from '../DataGrid.types';

export function RenderLink({ values }: DataGridComponentProps) {
  return <a href="#">{String(values.id)}</a>;
}
