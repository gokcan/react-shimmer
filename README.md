<p align='center'> 
  <img alt='Logo' src='https://cdn.rawgit.com/gokcan/react-shimmer/master/media/logo.png' width=40%>
</p>

> A powerful, customizable, `<img>` component that simulates a [**shimmer**](https://github.com/facebook/Shimmer) effect while __loading__. (with zero dependencies!) Currently compatible with React, but **React Native** compatibility is also on the way.

<p align="center">
  <a href="https://www.npmjs.com/package/react-shimmer">
    <img alt= "NPM" src="https://img.shields.io/npm/v/react-shimmer.svg">
  </a>
  <a href="https://standardjs.com">
    <img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg">
  </a>
  <a href="https://circleci.com/gh/gokcan/react-shimmer">
    <img alt="Circle CI Status" src="https://circleci.com/gh/gokcan/react-shimmer.svg?style=shield">
  </a>
  <a href="https://codeclimate.com/github/gokcan/react-shimmer/maintainability">
    <img alt= "Maintainability" src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability">
  </a>
</p>

<p align="center">
  <img alt="Header" src="https://cdn.rawgit.com/gokcan/react-shimmer/master/media/header.png" width=85%>
</p>

### [__Live Demo__](https://stackblitz.com/edit/react-shimmer-demo?embed=1&file=index.js)

![](https://cdn.rawgit.com/gokcan/react-shimmer/master/media/demo.gif)

## Install

```bash
npm i react-shimmer
```

or

```bash
yarn add react-shimmer
```

## Usage

```jsx
import React from 'react'
import Image from 'react-shimmer'

function App(props) {
  return (
    <div>
      <Image
        src="https://example.com/test.jpg"
        width={640} height={480}
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
```

or you can use the `fallback` prop:

```jsx
import React from 'react'
import Image from 'react-shimmer'
import Spinner from './Spinner'

function App(props) {
  return (
    <div>
      <Image
        src="https://example.com/test.jpg"
        fallback={<Spinner />}
      />
    </div>
  )
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`src`|string|yes||
`color`|string|no|`#f6f7f8`| Background color of the loader.
`duration`|number|no|`1600`| Animation duration (ms) Higher value == slower animation.
`width`|number|yes (no if `fallback` is present)||
`height`|number|yes (no if `fallback` is present)||
`style`|object|no||
`onError`|func|no||
`onLoad`|func|no||
`fallback`|React.Element|no||
`delay`|number|no|| Delay the starting time of the animation. (ms)
-----

## Contributing
---

Feel free to send PRs.

## License

MIT © [gokcan](https://github.com/gokcan)
