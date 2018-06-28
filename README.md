# react-shimmer

> A shared Image placeholder component that has a shimmer effect.

[![NPM](https://img.shields.io/npm/v/react-shimmer.svg)](https://www.npmjs.com/package/react-shimmer) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<img src="https://media.giphy.com/media/1lwSA2rwDIhmT2VhiV/giphy.gif" width="466" height="254" />

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
          width={120} height={120} // You MUST provide w/h.
          style={{objectFit: 'cover'}} // Style your <img> as you would normally do.
          delay={25}
        />
      </div>
    )
  }
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
src|string|yes||
color|string|no|| Background color of the loader.
duration|number|no|| Animation duration.
width|number|yes||
height|number|yes||
style|object|no||
onError|func|no||
onLoad|func|no||
loadingIndicatorSource|string|no||
delay|number|no|| Delay the starting time of the animation. (ms)
-----

## License

MIT © [gokcan](https://github.com/gokcan)
