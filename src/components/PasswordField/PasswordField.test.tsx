import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { PasswordField } from './PasswordField';
import type { PasswordFieldProps } from './PasswordField.types';

const renderWithOptions = (props: PasswordFieldProps = {}) => render(<PasswordField {...props} />);

describe('<PasswordField />', () => {
  it('should render correctly', () => {
    const { container } = renderWithOptions();

    expect(container).toMatchSnapshot();
  });
});
