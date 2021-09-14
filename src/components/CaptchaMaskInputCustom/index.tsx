import * as React from 'react';
import { IMaskInput } from 'react-imask';

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
  const maskInputProps: any = {
    ...other,
    mask: '000000',
    inputRef: ref,
    onAccept: (value: any) => onChange({ target: { name, value } }),
    overwrite: true,
  };

  return <IMaskInput {...maskInputProps} />;
});

const memoized = React.memo(CaptchaMaskInputCustom);

memoized.displayName = 'CaptchaMaskInputCustom';

export default memoized;
