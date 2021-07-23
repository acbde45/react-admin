import * as React from 'react';
// @ts-ignore
import { IMaskInput } from 'react-imask';

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  [key: string]: unknown;
}

const PhoneNumberMaskInputCustom = React.forwardRef<HTMLInputElement, IProps>(function PhoneNumberMaskInputCustom(
  props: IProps,
  ref: any
) {
  const { name, onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="#00-0000-0000"
      definitions={{
        '#': /1/,
      }}
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name, value } })}
      overwrite
    />
  );
});

const memoized = React.memo(PhoneNumberMaskInputCustom);

memoized.displayName = 'PhoneNumberMaskInputCustom';

export default memoized;
