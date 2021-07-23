import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useRoutes } from 'react-router-dom';

import Pace from '@/components/Pace';

import routes from './routes';
import GlobalStyles from './style/global';
import theme from './style/theme';

export default function App(): JSX.Element {
  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Pace color={theme.palette.primary.light} />
      {routing}
    </ThemeProvider>
  );
}
