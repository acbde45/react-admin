import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import CaptchaField from '@/components/CaptchaField';
import Copyright from '@/components/Copyright';
import PhoneNumberMaskInputCustom from '@/components/PhoneNumberMaskInputCustom';

enum LoginTab {
  Pass,
  Captcha,
}

interface IFormInput {
  userName: string;
  password: string;
  phoneNumber: string;
  captcha: string;
  rememberMe: boolean;
}

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = React.useState<LoginTab>(LoginTab.Pass);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      userName: undefined,
      password: undefined,
      phoneNumber: undefined,
      captcha: undefined,
      rememberMe: true,
    },
  });

  const handleTabsChange = (event: React.SyntheticEvent, value: LoginTab): void => {
    reset();
    setCurrentTab(value);
  };

  const handleBeforeFetch = (): boolean => {
    return true;
  };

  const handleFetchCaptcha = (): void => {};

  const validate = (data: IFormInput): boolean => {
    const { userName, password, phoneNumber, captcha } = data;
    clearErrors();
    if (currentTab === LoginTab.Pass) {
      if (!userName) {
        setError('userName', { message: '请输入用户名' });
      } else if (!/^([a-z0-9])[a-z0-9.]{2,23}$/i.test(userName)) {
        setError('userName', { message: '用户名不合法，请检查后重试' });
      } else if (!password) {
        setError('password', { message: '请输入密码' });
      } else if (password?.length < 5) {
        setError('password', { message: '密码过短，请检查后重试' });
      } else if (password?.length > 12) {
        setError('password', { message: '密码过长，请检查后重试' });
      } else {
        return true;
      }
    } else if (currentTab === LoginTab.Captcha) {
      const parsedPhoneNumber = phoneNumber?.replace(/-/g, '');

      if (!phoneNumber) {
        setError('phoneNumber', { message: '请输入手机号' });
      } else if (!/^1[3456789]\d{9}$/.test(parsedPhoneNumber)) {
        setError('phoneNumber', { message: '手机号不合法，请检查后重试' });
      } else if (!/\d{6}/.test(captcha)) {
        setError('captcha', { message: '验证码不正确，请检查后重试' });
      } else {
        return true;
      }
    }
    return false;
  };

  const onSubmit = (data: IFormInput) => {
    const isValid = validate(data);
    if (!isValid) return;

    // eslint-disable-next-line no-console
    console.log(data);
    navigate('/app/home');
  };

  const computeTabSx = React.useCallback(
    (value: LoginTab) => {
      return {
        bgcolor: currentTab === value ? 'primary.main' : '',
        color: currentTab === value ? 'white' : 'text.primary',
      };
    },
    [currentTab]
  );

  const firstError = Object.entries(errors)?.[0];

  const alert = React.useMemo(() => {
    if (firstError) {
      return (
        <Alert severity="warning" sx={{ mb: 1 }}>
          {firstError[1].message}
        </Alert>
      );
    }
    return null;
  }, [firstError]);

  const fields = React.useMemo(() => {
    if (currentTab === LoginTab.Pass) {
      return (
        <>
          <TextField
            key="userName"
            error={firstError?.[0] === 'userName'}
            margin="normal"
            fullWidth
            label="用户名"
            autoFocus
            size="small"
            {...register('userName')}
          />
          <TextField
            key="password"
            error={firstError?.[0] === 'password'}
            margin="normal"
            fullWidth
            label="密码"
            type="password"
            size="small"
            {...register('password')}
          />
        </>
      );
    }
    return (
      <>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              key="phoneNumber"
              error={firstError?.[0] === 'phoneNumber'}
              margin="normal"
              fullWidth
              label="手机号"
              autoFocus
              size="small"
              InputProps={{
                inputComponent: PhoneNumberMaskInputCustom,
              }}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
          name="phoneNumber"
        />
        <Controller
          key="captcha"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CaptchaField
              error={firstError?.[0] === 'captcha'}
              margin="normal"
              fullWidth
              label="验证码"
              size="small"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              beforeFetch={handleBeforeFetch}
              onFetchCaptcha={handleFetchCaptcha}
            />
          )}
          name="captcha"
        />
      </>
    );
  }, [currentTab, register, firstError, control]);

  return (
    <>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '84%',
          minHeight: 450,
        }}
      >
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pb: 1,
          }}
          variant="outlined"
        >
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              centered
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{ hidden: true }}
              value={currentTab}
              onChange={handleTabsChange}
            >
              <Tab label="密码登陆" value={LoginTab.Pass} sx={computeTabSx(LoginTab.Pass)} />
              <Tab label="短信登陆" value={LoginTab.Captcha} sx={computeTabSx(LoginTab.Captcha)} />
            </Tabs>
          </Box>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2, ml: 3, mr: 3 }}>
            {alert}
            {fields}

            <FormControlLabel
              control={
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox onBlur={onBlur} onChange={onChange} checked={value} color="primary" />
                  )}
                  name="rememberMe"
                  defaultValue={true}
                />
              }
              label="记住帐号"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              登 陆
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                  忘记密码?
                </Link>
              </Grid>
              <Grid item>
                <Link href="" variant="body2">
                  没有帐号？注册
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </>
  );
}

const memoized = React.memo(Login);

memoized.displayName = 'Login';

export default memoized;
