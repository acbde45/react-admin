import * as React from 'react';
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
  const maskInputProps: any = {
    ...other,
    mask: '#00-0000-0000',
    definitions: {
      '#': /1/,
    },
    inputRef: ref,
    onAccept: (value: any) => onChange({ target: { name, value } }),
    overwrite: true,
  };

  return <IMaskInput {...maskInputProps} />;
});

const memoized = React.memo(PhoneNumberMaskInputCustom);

memoized.displayName = 'PhoneNumberMaskInputCustom';

export default memoized;
