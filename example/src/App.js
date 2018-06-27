import React, { Component } from 'react'

import ShimmerImage from 'react-shimmer'

export default class App extends Component {
  render () {
    return (
      <div>
        <ShimmerImage 
          src={'https://www.hdwallpapers.in/download/lexus_lc_500_yellow_4k_8k-5120x2880.jpg'}
          delay={250} 
        />
      </div>
    )
  }
}
