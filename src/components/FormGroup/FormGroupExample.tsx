import { Button } from '../Button/Button';
import { Label } from '../Label/Label';
import { PasswordField } from '../PasswordField/PasswordField';
import { TextField } from '../TextField/TextField';

import { FormGroup } from './FormGroup';
import type { FormGroupDemoOptions } from './FormGroupControls';

import styles from './FormGroup.demo.module.css';

export function FormGroupExample({ hint, hintColor, error }: FormGroupDemoOptions) {
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        window.alert('Form submitted');
      }}
    >
      <FormGroup hint={hint} hintColor={hintColor} error={error} hintId="username-hint">
        <Label for="username">Username</Label>
        <TextField
          id="username"
          name="username"
          placeholder="Enter your username"
          ariaDescribedBy="username-hint"
        />
      </FormGroup>
      <FormGroup hint="Keep your password private." hintId="password-hint">
        <Label for="password">Password</Label>
        <PasswordField
          id="password"
          name="password"
          placeholder="Enter your password"
          ariaDescribedBy="password-hint"
        />
      </FormGroup>
      <Button type="submit">Sign in</Button>
    </form>
  );
}
