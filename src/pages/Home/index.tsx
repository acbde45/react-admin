import * as React from 'react';

import WaveBorder from '@/components/WaveBorder';

function Home(): JSX.Element {
  return (
    <div>
      Home Page
      <WaveBorder lowerColor="lightblue" upperColor="#fff" />
    </div>
  );
}

const memoized = React.memo(Home);

memoized.displayName = 'Home';

export default memoized;
