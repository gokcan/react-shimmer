import React from 'react'

import cls from './styles.css'

interface Props {
  height: number
  width: number
  duration?: number
}

const calcShimmerStyle = (width: number, height: number, duration = 1600) => {
  const backgroundSize = `${width * 10}px ${height}px`
  const shimmerStyles = {
    backgroundSize,
    animationDuration: `${(duration / 1000).toFixed(1)}s`
  }
  return shimmerStyles
}

export const Shimmer: React.FC<Props> = ({ duration, height = 400, width = 400 }) => {
  const shimmerStyle = calcShimmerStyle(width, height, duration)
  const style = { ...shimmerStyle, ...{ height, width } }

  return (
    <div className={cls.root}>
      <span className={cls.shimmer} style={style} />
    </div>
  )
}
