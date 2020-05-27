import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import './styles.css'

export interface BreathingProps {
  className?: string
  height?: number
  width?: number
}

export const Breathing = ({ className, height, width }: BreathingProps) => {
  const style = { height, width }
  return <div className={clsx('breathing', className)} style={style} />
}

Breathing.propTypes = {
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
