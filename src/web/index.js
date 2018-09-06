// @flow
/**
 * @class ShimmerImage
 * @version 1.0.1 (Minor release)
 * @author github.com/gokcan
 */

import React, { Component } from 'react'
import * as PropTypes from 'prop-types'
import cl from './styles.css'
import 'regenerator-runtime/runtime'

type Props = {
  src: string,
  color?: string,
  duration?: number,
  width: number,
  height: number,
  style?: Object,
  onError?: (err: string) => void,
  onLoad?: (image: Image) => void,
  loadingIndicatorSource?: string,
  delay?: number,
}

type State = {
  isLoading: boolean,
  src: string,
  error?: string
}

export default class ShimmerImage extends Component<Props, State> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    color: PropTypes.string,
    duration: PropTypes.number,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    style: PropTypes.object,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    loadingIndicatorSource: PropTypes.string,
    delay: PropTypes.number
  }

  state: State = {
    isLoading: false,
    src: '',
    error: ''
  };

  async componentDidMount() {
    const { src, delay, width, height } = this.props
    if (!(width && height)) {
      this.setState({ error: 'Height and Width props must be provided!' })
    }
    /*
     * To avoid instant loading 'flash' while downloading images with high-speed internet connection
     * (or downloading smaller images that do not cause much loading-time),
     * user may want to give delay before starting to show the shimmer loading indicator.
     * However, given delay should be not more than 1 second. If it is just ignore it.
     */
    if (delay && delay > 0 && delay <= 1000) {
      setTimeout(() => {
        if (!this.state.src) {
          this.setState({ isLoading: true })
        }
      }, delay)
    } else {
      this.setState({ isLoading: true })
    }

    try {
      const uri: string = await this.loadImage(src)
      this.setState({ isLoading: false, src: uri })
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  loadImage = async (uri: string) => {
    const { onLoad } = this.props
    return new Promise((resolve, reject) => {
      const img: Image = new Image()
      img.src = uri
      // $FlowFixMe
      img.decode !== undefined
        ? img.decode().then(() => {
          resolve(img.src)
          if (onLoad) onLoad(img)
        }).catch(() => {
          reject(new Error('An Error occurred while trying to decode an image'))
        })
        : img.onload = () => {
          resolve(img.src)
          if (onLoad) onLoad(img)
        }
      img.onerror = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }
    })
  }

  render() {
    const { src, error, isLoading } = this.state
    const { width, height, color, duration, style, onError, loadingIndicatorSource, ...passed } = this.props
    const { ...passedStyles } = style
    const passedProps = { ...passed, ...{ src, width, height } }
    const backgroundSize = `${width * 10}px ${height}px`

    const shimmerStyles = {
      backgroundColor: color,
      backgroundSize,
      // $FlowFixMe
      animationDuration: `${duration}s`
    }

    if (error) {
      return onError ? onError(error) : null
    } else if (isLoading) {
      if (loadingIndicatorSource) {
        return <img src={loadingIndicatorSource} />
      } else {
        return (
          <div className={cl.shimmerdiv} style={{...passedStyles}}>
            <span className={cl.shimmer} style={{...shimmerStyles, ...{height, width}}} />
          </div>)
      }
    } else if (src) {
      return <img {...passedProps} style={{ ...passedStyles }} />
    }

    return null
  }
}
