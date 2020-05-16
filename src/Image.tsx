/**
 * @class SuspenseImage
 * @version 3.0.0
 * @author github.com/gokcan
 */

import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'

import IntendedError from './IntendedError'

interface Props {
  src: string
  fallback: ReactNode
  errorFallback?: (err: string) => ReactNode
  onLoad?: (image: any) => any
  delay?: number
  NativeImgProps?: React.ImgHTMLAttributes<HTMLImageElement>
}

interface State {
  isLoading: boolean
  src: string
  error?: string
}

export default class SuspenseImage extends React.Component<Props, State> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    fallback: PropTypes.element.isRequired,
    errorFallback: PropTypes.func,
    onLoad: PropTypes.func,
    delay: PropTypes.number,
    NativeImgProps: PropTypes.object
  }

  state: State = {
    isLoading: false,
    src: '',
    error: ''
  }

  timeoutId?: NodeJS.Timeout
  img?: HTMLImageElement
  forceReject?: any

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
    this.forceReject = undefined
    this.img = undefined
  }

  startImageLoadingProcess = async () => {
    const { src, delay = 100, fallback } = this.props
    if (!fallback) {
      this.setState({ error: 'Fallback must be provided.' })
    }
    /*
     * To avoid instant loading 'flash' while downloading images with high-speed internet connection
     * (or downloading smaller images that do not need much loading-time),
     * user may want to give delay before starting to show the loading indicator.
     */
    if (delay && delay > 0) {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = undefined
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

  private loadImage = async (uri: string): Promise<string> => {
    const { onLoad } = this.props
    return new Promise((resolve, reject) => {
      const img: HTMLImageElement = new Image()
      if (this.img) {
        this.img.onload = null
        this.img.onerror = null
        // Previous promise call must be cancelled for decode().
        this.forceReject && this.forceReject(new IntendedError())
      }
      this.img = img
      img.src = uri
      this.forceReject = reject
      img.decode !== undefined
        ? img
            .decode()
            .then(() => {
              resolve(img.src)
              if (onLoad) onLoad(img)
            })
            .catch(() => {
              reject(new Error('An Error occurred while trying to decode an image'))
            })
        : (img.onload = () => {
            resolve(img.src)
            if (onLoad) onLoad(img)
          })
      img.onerror = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }
    })
  }

  safeClearTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }

  render() {
    const { src, error, isLoading } = this.state
    const { fallback, errorFallback, NativeImgProps } = this.props

    if (isLoading) {
      return fallback
    } else if (error) {
      return errorFallback ? errorFallback(error) : <span>Failed to load image</span>
    } else if (src) {
      return <img src={src} {...NativeImgProps} />
    }

    return null
  }
}

export { SuspenseImage as Image }
