# react-shimmer

> A shared Image placeholder component that has a shimmer effect.

[![NPM](https://img.shields.io/npm/v/react-shimmer.svg)](https://www.npmjs.com/package/react-shimmer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-shimmer
```

## Usage

```jsx
import React, { Component } from 'react'

import ShimmerImage from 'react-shimmer'

class Example extends Component {
  render () {
    return (
      <ShimmerImage 
        src={'./path/to/your/image'} // Local or remote image uri.
        loadingIndicatorSource={'./path/to/your/loading-indicator'} // Not required. Default is a "shimmer animation".
      />
    )
  }
}
```

## License

MIT © [gokcan](https://github.com/gokcan)
