import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './styles.css';

const DEFAULT_DURATION_MS = 1600;
const DEFAULT_HEIGHT = 400;
const DEFAULT_WIDTH = 400;

export interface ShimmerProps {
  height: number;
  width: number;
  className?: string;
  duration?: number;
}

const calcShimmerStyle = (
  width: number,
  height: number,
  duration = DEFAULT_DURATION_MS
) => ({
  backgroundSize: `${width * 10}px ${height}px`,
  animationDuration: `${(duration / 1000).toFixed(1)}s`,
});

export const Shimmer = ({
  className,
  duration,
  height = DEFAULT_HEIGHT,
  width = DEFAULT_WIDTH,
}: ShimmerProps) => {
  const shimmerStyle = calcShimmerStyle(width, height, duration);
  const style = { ...shimmerStyle, ...{ height, width } };

  return <div className={clsx('shimmer', className)} style={style} />;
};

Shimmer.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  className: PropTypes.string,
  duration: PropTypes.number,
};
