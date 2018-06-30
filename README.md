# react-shimmer

> A powerful, customisable, `<img>` component that simulates a [**shimmer**](https://github.com/facebook/Shimmer) effect while the image is __loading__. (with zero dependencies!) Currently compatible with React, but **RN** compatibility is also on the way.

[![NPM](https://img.shields.io/npm/v/react-shimmer.svg)](https://www.npmjs.com/package/react-shimmer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![](https://cdn.rawgit.com/gokcan/react-shimmer/master/media/rs-demo.gif)

## Install

```bash
npm install --save react-shimmer
```

## Usage

```jsx
import React, { Component } from 'react'

import ShimmerImage from 'react-shimmer'

export default class App extends Component {
  render () {
    return (
      <div>
        <ShimmerImage 
          src={'https://example.com/test.jpg'}
          width={120} height={120}
          style={{objectFit: 'cover'}} // Style your <img> as you would normally do.
          delay={25}
          duration={0.9} // Customize the animation duration (s).
        />
      </div>
    )
  }
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`src`|string|yes||
`color`|string|no|`#f6f7f8`| Background color of the loader.
`duration`|number|no|`1.6`| Animation duration (s) Higher value == slower animation. 
`width`|number|yes||
`height`|number|yes||
`style`|object|no||
`onError`|func|no||
`onLoad`|func|no||
`loadingIndicatorSource`|string|no||
`delay`|number|no|| Delay the starting time of the animation. (ms)
-----

## Contributing
---
Feel free to send PRs. 

## License

MIT © [gokcan](https://github.com/gokcan)
