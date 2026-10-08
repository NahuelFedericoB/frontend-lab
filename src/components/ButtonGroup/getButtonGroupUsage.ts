import type { ButtonGroupDemoOptions } from './ButtonGroupControls';

export function getButtonGroupUsage(options: ButtonGroupDemoOptions) {
  const tileProps = `size="${options.size}"${options.disabled ? ' disabled' : ''}`;

  return [
    "import { ButtonGroup } from './components/ButtonGroup/ButtonGroup';",
    "import { ButtonGroupTile } from './components/ButtonGroupTile/ButtonGroupTile';",
    '',
    'export function ButtonGroupExample() {',
    '  return (',
    '    <div className="flex flex-col gap-y-3">',
    '      <div>',
    '        <ButtonGroup>',
    ...[1, 2, 3, 4].flatMap((number) => [
      `          <ButtonGroupTile ${tileProps}>`,
      `            <div className="font-bold text-lab-link">${number}</div>`,
      '          </ButtonGroupTile>',
    ]),
    '        </ButtonGroup>',
    '      </div>',
    '      <div>',
    '        <ButtonGroup vertical>',
    ...[1, 2, 3, 4].flatMap((number) => [
      `          <ButtonGroupTile vertical ${tileProps}>`,
      `            <div className="font-bold text-lab-link">${number}</div>`,
      '          </ButtonGroupTile>',
    ]),
    '        </ButtonGroup>',
    '      </div>',
    '      <div>',
    '        <ButtonGroup>',
    ...[options.leftLabel, options.middleLabel, options.rightLabel].flatMap((label) => [
      `          <ButtonGroupTile ${tileProps}>`,
      `            <div className="text-xl font-bold text-lab-link">{${JSON.stringify(label)}}</div>`,
      '          </ButtonGroupTile>',
    ]),
    '        </ButtonGroup>',
    '      </div>',
    '      <div>',
    '        <ButtonGroup>',
    ...[
      { label: 'Delete', path: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7' },
      { label: 'Download', path: 'M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6' },
      { label: 'Edit', path: 'm16 3 5 5L8 21H3v-5L16 3Zm-3 3 5 5' },
    ].flatMap(({ label, path }) => [
      `          <ButtonGroupTile ariaLabel="${label}" ${tileProps}>`,
      '            <svg',
      '              className="inline-block h-3.5 w-3.5 text-lab-link"',
      '              viewBox="0 0 24 24"',
      '              fill="none"',
      '              stroke="currentColor"',
      '              strokeWidth="1.8"',
      '              strokeLinecap="round"',
      '              strokeLinejoin="round"',
      '              aria-hidden="true"',
      '            >',
      `              <path d="${path}" />`,
      '            </svg>',
      '          </ButtonGroupTile>',
    ]),
    '        </ButtonGroup>',
    '      </div>',
    '    </div>',
    '  );',
    '}',
  ].join('\n');
}
