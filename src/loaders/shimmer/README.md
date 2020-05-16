### Shimmer Loader

## Usage

```jsx
import React from 'react'
import Image, { Shimmer } from 'react-shimmer'

function App(props) {
  return (
    <div>
      <Image
        src='https://source.unsplash.com/random/800x600'
        fallback={<Shimmer width={800} height={600} />}
      />
    </div>
  )
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`width`|number|yes||
`height`|number|yes||
`color`|string|no|`#f6f7f8`| Background color of the loader
`duration`|number|no|`1600`| Animation duration (ms)
-----

## License

MIT © [gokcan](https://github.com/gokcan)
