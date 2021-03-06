### Shimmer Loader

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

or as a standalone placeholder:

```jsx
import React from 'react'
import { Shimmer } from 'react-shimmer'

function App(props) {
  return (
    <div>
      <Shimmer width={280} height={60} />
    </div>
  )
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`width`|number|yes||
`height`|number|yes||
`className`|string|no|| Override default styles with className
`duration`|number|no|`1600`| Animation duration (ms)
-----

## License

MIT © [gokcan](https://github.com/gokcan)
