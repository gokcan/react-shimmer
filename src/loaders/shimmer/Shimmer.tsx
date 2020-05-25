import React from 'react'

import './styles.css'

export interface ShimmerProps {
  height: number
  width: number
  duration?: number
}

const calcShimmerStyle = (width: number, height: number, duration = 1600) => ({
  backgroundSize: `${width * 10}px ${height}px`,
  animationDuration: `${(duration / 1000).toFixed(1)}s`
})

export const Shimmer = ({ duration, height = 400, width = 400 }: ShimmerProps) => {
  const shimmerStyle = calcShimmerStyle(width, height, duration)
  const style = { ...shimmerStyle, ...{ height, width } }

  return <span className='shimmer' style={style} />
}
