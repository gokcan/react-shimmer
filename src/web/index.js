// @flow
/**
 * @class ShimmerImage
 * @version 2.0.0
 * @author github.com/gokcan
 */

import * as React from 'react'
import * as PropTypes from 'prop-types'
import cl from './styles.css'
import 'regenerator-runtime/runtime'

import IntendedError from './IntendedError'

type Props = {
  src: string,
  color?: string,
  duration?: number,
  width: number,
  height: number,
  style?: Object,
  onError?: (err: string) => void,
  onLoad?: (image: Image) => void,
  fallback?: React.Element<*>,
  delay?: number,
}

type State = {
  isLoading: boolean,
  src: string,
  error?: string
}

export default class ShimmerImage extends React.Component<Props, State> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    color: PropTypes.string,
    duration: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object,
    onError: PropTypes.func,
    onLoad: PropTypes.func,
    fallback: PropTypes.element,
    delay: PropTypes.number
  }

  state: State = {
    isLoading: false,
    src: '',
    error: ''
  };

  timeoutId: ?TimeoutID = null;
  img = null;
  forceReject = null;

  componentDidMount() {
    this.startImageLoadingProcess()
  }

  componentDidUpdate(prevProps: Props) {
    const { src } = this.props
    if (src && src !== prevProps.src) {
      this.safeClearTimeout()
      this.startImageLoadingProcess()
    }
  }

  componentWillUnmount() {
    // The component might be cancelled(unmounted) before the 'delay' timeout finishes.
    this.safeClearTimeout()
    this.forceReject = null
    this.img = null
  }

  startImageLoadingProcess = async () => {
    const { src, delay, width, height, fallback } = this.props
    if (!fallback && !(width && height)) {
      this.setState({ error: 'Height and Width props must be provided!' })
    }
    /*
     * To avoid instant loading 'flash' while downloading images with high-speed internet connection
     * (or downloading smaller images that do not cause much loading-time),
     * user may want to give delay before starting to show the shimmer loading indicator.
     * However, given delay should be not more than 1 second. If it is just ignore it.
     */
    if (delay && delay > 0 && delay <= 1000) {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = null
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
      // If this is a intended(forced) rejection, don't make it visible to user.
      if (!(error instanceof IntendedError)) {
        this.setState({ error, isLoading: false })
      }
    }
  }

  loadImage = async (uri: string) => {
    const { onLoad } = this.props
    return new Promise((resolve, reject) => {
      const img: Image = new Image()
      if (this.img) {
        this.img.onload = null
        this.img.onerror = null
        // Previous promise call must be cancelled for decode().
        this.forceReject && this.forceReject(new IntendedError())
      }
      this.img = img
      img.src = uri
      this.forceReject = reject
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

  safeClearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  render() {
    const { src, error, isLoading } = this.state
    const { width, height, color, duration, style, onError, fallback, ...passed } = this.props
    const { ...passedStyles } = style
    const passedProps = { ...passed, ...{ src, width, height } }
    const backgroundSize = `${width * 10}px ${height}px`

    const shimmerStyles = {
      backgroundColor: color,
      backgroundSize,
      // $FlowFixMe
      animationDuration: `${(duration / 1000).toFixed(1)}s`
    }

    if (error) {
      // $FlowFixMe
      return onError ? onError(error) : null
    } else if (isLoading) {
      if (fallback) {
        return fallback
      } else {
        return (
          <div className={cl.shimmerdiv} style={{ ...passedStyles }}>
            <span className={cl.shimmer} style={{ ...shimmerStyles, ...{ height, width } }} />
          </div>)
      }
    } else if (src) {
      return <img {...passedProps} style={{ ...passedStyles }} />
    }

    return null
  }
}
