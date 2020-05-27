### Breathing Loader

## Usage

```jsx
import React from 'react'
import Image, { Breathing } from 'react-shimmer'

function App(props) {
  return (
    <div>
      <Image
        src='https://source.unsplash.com/random'
        fallback={<Breathing />}
      />
    </div>
  )
}
```

or as a standalone placeholder:

```jsx
import React from 'react'
import { Breathing } from 'react-shimmer'

function App(props) {
  return (
    <div>
      <Breathing />
    </div>
  )
}
```

### Properties

Property | Type | Required | Default value | Description
:--- | :--- | :--- | :--- | :---
`className`|string|no|| Override default styles with className
`width`|number|no||
`height`|number|no||
`duration`|number|no|`1000`| Animation duration (ms)
-----

## License

MIT © [gokcan](https://github.com/gokcan)
