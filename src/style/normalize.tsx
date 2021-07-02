import { css, Global } from '@emotion/react';
import emotionNormalize from 'emotion-normalize';
import * as React from 'react';

const NormalizeStyle = React.memo(() => {
  const globalStyles = css`
    ${emotionNormalize}
  `;

  return <Global styles={globalStyles} />;
});

NormalizeStyle.displayName = 'NormalizeStyle';

export default NormalizeStyle;
