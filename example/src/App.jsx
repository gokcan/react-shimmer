import React from 'react'
import Image, { Shimmer } from 'react-shimmer';

export default function App() {
  return (
    <div>
      <div style={{ width: 400 }}>
        <Image
          src='https://source.unsplash.com/random/400x300'
          fallback={(
            <Shimmer 
            shimmerColor="linear-gradient(to right, red 8%, rgb(222, 222, 222) 18%,  red 33%)"
              width="100%" 
              height={300}/>
          )}/>
      </div>
      
      <Image
        src='https://source.unsplash.com/random/400x300'
        fallback={(
          <Shimmer 
            width={400} 
            height={300}/>
        )}/>
    </div>
  )
}
