import { css, Global } from '@emotion/react';

export default function GlobalStyles(): JSX.Element | null {
  const styles = css`
    html {
      height: 100%;
      width: 100%;
    }
    body {
      height: 100%;
      width: '100%';
    }
    a {
      textdecoration: none;
    }
    #root {
      height: 100%;
      width: 100%;
    }
  `;

  return <Global styles={styles} />;
}
