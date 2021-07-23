import { Button, InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';

import CaptchaMaskInputCustom from '@/components/CaptchaMaskInputCustom';
import { isPromise } from '@/utils/core';

function noop(): void {}

interface IProps {
  /**
   * x秒后重发
   */
  countDownNum?: string | number;
  /**
   * 在onFetchCaptcha事件触发之前调用，如果返回值为false那么后续操作不执行
   */
  beforeFetch?: Promise<boolean> | (() => boolean) | boolean;
  /**
   * 用来调用后端发送验证码到手机的接口的钩子函数
   */
  onFetchCaptcha?: () => void;
  [key: string]: unknown;
}

/**
 * 封装了处理验证码的TextField
 */
function CaptchaField(props: IProps): JSX.Element {
  const { countDownNum = 60, beforeFetch = true, onFetchCaptcha = noop, ...rest } = props;
  const buttonTextOriginal = '获取验证码';
  const [buttonText, setButtonText] = React.useState(buttonTextOriginal);
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect((): (() => void) => {
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
      setTimerId(null);
      setButtonText(buttonTextOriginal);
    };
  }, []);

  const countdown = (): void => {
    onFetchCaptcha();
    if (!timerId) {
      const tt = setInterval((): void => {
        setButtonText(text => {
          const count = parseInt(text, 10) - 1;
          if (Number.isNaN(count)) {
            return countDownNum + '秒后重发';
          }
          if (count > 0 && count < countDownNum) {
            return count + '秒后重发';
          }

          if (tt) {
            clearInterval(tt);
          }
          setTimerId(null);
          return buttonTextOriginal;
        });
      }, 1000);
      setTimerId(tt);
    }
  };

  const handleClick = (): void => {
    if (isPromise(beforeFetch)) {
      beforeFetch.then(flag => {
        if (flag) {
          countdown();
        }
      });
    } else if (typeof beforeFetch === 'function' && beforeFetch()) {
      countdown();
    } else if (beforeFetch) {
      countdown();
    }
  };

  return (
    <TextField
      {...rest}
      InputProps={{
        inputComponent: CaptchaMaskInputCustom,
        endAdornment: (
          <InputAdornment position="end">
            <Button variant="text" sx={{ ml: 1, marginRight: '-14px' }} onClick={handleClick}>
              {buttonText}
            </Button>
          </InputAdornment>
        ),
      }}
    />
  );
}

const memoized = React.memo(CaptchaField);

export default memoized;
