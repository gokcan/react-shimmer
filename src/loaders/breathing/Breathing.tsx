import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import './styles.css';

export interface BreathingProps {
  className?: string;
  duration?: number;
  height?: number;
  width?: number;
}

const DEFAULT_DURATION_MS = 1000;

export const Breathing = ({
  className,
  duration = DEFAULT_DURATION_MS,
  height,
  width,
}: BreathingProps) => {
  const style = {
    height,
    width,
    animationDuration: `${(duration / 1000).toFixed(1)}s`,
  };
  return <div className={clsx('breathing', className)} style={style} />;
};

Breathing.propTypes = {
  className: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
