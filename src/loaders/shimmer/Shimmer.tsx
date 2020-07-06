import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './styles.css'

const DEFAULT_DURATION_MS = 1600
const DEFAULT_HEIGHT = 400
const DEFAULT_WIDTH = 400
const DEFAULT_SHIMMER_COLOR = 'linear-gradient(to right, rgb(238, 238, 238) 8%, rgb(222, 222, 222) 18%,  rgb(238, 238, 238) 33%)'

export interface ShimmerProps {
  height: number | string
  width: number | string
  className?: string
  duration?: number
  shimmerColor?: string
}

const calcShimmerStyle = (width: number | string, height: number | string, duration = DEFAULT_DURATION_MS) => {
  let backgroundWidth = '0';
  if (typeof width == 'string' && width != null) {
    const number = width.match(/\d+/g) || [];
    if (number.length > 0) {
      const value = Number(number);
      backgroundWidth = `${value * 10}%`;
    }
  }
  else {
    backgroundWidth = `${width * 10}px`;
  }

  return {
    backgroundSize: `${backgroundWidth} ${height}px`,
    animationDuration: `${(duration / 1000).toFixed(1)}s`
  }
}

export const Shimmer = ({ className, duration, height = DEFAULT_HEIGHT, width = DEFAULT_WIDTH, shimmerColor = DEFAULT_SHIMMER_COLOR }: ShimmerProps) => {
  const shimmerStyle = calcShimmerStyle(width, height, duration)
  const style = { ...shimmerStyle, ...{ 
    height, 
    width,
    backgroundImage: shimmerColor
  } }

  return <div className={clsx('shimmer', className)} style={style} />
}

Shimmer.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
  shimmerColor: PropTypes.string
}
