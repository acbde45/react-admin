import * as React from 'react';

/* @ts-ignore */
import { IMaskInput } from 'react-imask';

/* tslint:enable */

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  [key: string]: unknown;
}

const CaptchaMaskInputCustom = React.forwardRef<HTMLInputElement, IProps>(function CaptchaMaskInputCustom(
  props: IProps,
  ref: any
) {
  const { name, onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="000000"
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

const memoized = React.memo(CaptchaMaskInputCustom);

memoized.displayName = 'CaptchaMaskInputCustom';

export default memoized;
