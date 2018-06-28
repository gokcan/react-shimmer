import React, { Component } from 'react'

import ShimmerImage from 'react-shimmer'

export default class App extends Component {
  render () {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ShimmerImage 
          src={'https://www.hdwallpapers.in/download/lexus_lc_500_yellow_4k_8k-5120x2880.jpg'}
          width={120} height={120}
          style={{objectFit: 'cover'}} 
          delay={50}
        />
      </div>
    )
  }
}
