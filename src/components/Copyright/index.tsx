import { Link, Typography } from '@material-ui/core';
import * as React from 'react';

interface IProps {
  [key: string]: unknown;
}

function Copyright(props: IProps): JSX.Element {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright ©'}
      <Link color="inherit" href="https://material-ui.com/">
        {'Your Website'}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const memoized = React.memo(Copyright);

memoized.displayName = 'Copyright';

export default memoized;
