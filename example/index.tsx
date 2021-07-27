import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { randomBytes } from 'crypto';

import { Image, Shimmer } from '../.';

const getRandomSource = () =>
  `https://picsum.photos/2000/1440?q=${randomBytes(8).toString('hex')}`;

const App = () => {
  const [source, setSource] = React.useState('');

  React.useEffect(() => {
    setRandom();
  }, []);

  const setRandom = () => {
    setSource(getRandomSource());
  };

  return (
    <div>
      <div
        style={{
          height: 160,
          width: 240,
          borderRadius: 3,
          overflow: 'hidden', // for inner image to not overflow when borderRadius set.
          backgroundColor: '#f6f7f8', // default shimmer bg color.
        }}
      >
        <Image src={source} fallback={<Shimmer width={240} height={160} />} />
      </div>
      <button
        onClick={() => {
          setRandom();
        }}
      >
        Reload image
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
