/**
 * @class SuspenseImage
 * @version 3.0.2
 * @author github.com/gokcan
 */

import React, { ReactNode, ImgHTMLAttributes, Component } from 'react'
import PropTypes from 'prop-types'

import IntendedError from './IntendedError'

export interface ImageProps {
  src: string
  fallback: ReactNode
  errorFallback?: (err: string) => ReactNode
  onLoad?: (image: HTMLImageElement) => any
  delay?: number
  NativeImgProps?: ImgHTMLAttributes<HTMLImageElement>
}

interface State {
  isLoading: boolean
  src: string
  error?: string
}

const initialState = {
  isLoading: false,
  src: '',
  error: ''
}

export default class SuspenseImage extends Component<ImageProps, State> {
  static propTypes = {
    src: PropTypes.string.isRequired,
    fallback: PropTypes.element.isRequired,
    errorFallback: PropTypes.func,
    onLoad: PropTypes.func,
    delay: PropTypes.number,
    NativeImgProps: PropTypes.object
  }

  state: State = { ...initialState }

  timeoutId?: NodeJS.Timeout
  img?: HTMLImageElement
  forceReject?: (reason: Error) => void

  componentDidMount() {
    this.start()
  }

  componentDidUpdate(prevProps: ImageProps) {
    const { src } = this.props
    if (src && src !== prevProps.src) {
      this.safeClearTimeout()
      this.setState({ ...initialState }, () => this.start())
    }
  }

  componentWillUnmount() {
    // The component might be cancelled(unmounted) before the 'delay' timeout finishes.
    this.safeClearTimeout()
    this.forceReject = undefined
    this.img = undefined
  }

  private start = async () => {
    const { src, fallback, delay } = this.props
    if (!src || !fallback) {
      const errorMessage = 'src and fallback props must be provided.'
      if (process.env.NODE_ENV !== "production") {
        console.error(errorMessage)
      }
      this.setState({ error: errorMessage })
      return
    }
    /*
     * To avoid instant loading 'flash' while downloading images with high-speed internet connection
     * (or downloading smaller images that do not need much loading-time),
     * user may want to give delay before starting to show the loading indicator.
     */
    if (delay && delay > 0) {
      this.timeoutId = setTimeout(() => {
        this.timeoutId = undefined
        if (!this.state.src && !this.state.error) {
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
      // If this is an intended(forced) rejection, don't make it visible to user.
      if (!(error instanceof IntendedError)) {
        this.setState({ error, isLoading: false })
      }
    }
  }

  private loadImage = async (uri: string): Promise<string> => {
    const { onLoad } = this.props;
    return new Promise((resolve, reject) => {
      if (this.img) {
        this.img.onload = null
        this.img.onerror = null
        // Previous promise call must be cancelled for decode().
        this.forceReject && this.forceReject(new IntendedError())
      }

      const img = new Image()
      this.img = img
      this.forceReject = reject

      const onResolve = async () => {
        if (img.decode !== undefined) {
          try {
            await img.decode()
          } catch (e) {
            reject(new Error('An Error occurred while trying to decode an image'))
          }
        }
        resolve(img.src)
        if (onLoad) {
          onLoad(img)
        }
      }

      const onReject = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }

      img.onload = onResolve
      img.onerror = onReject
      img.src = uri
    })
  }

  private safeClearTimeout() {
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
      return errorFallback ? (
        errorFallback(error)
      ) : (
        <span role='button' aria-label='Image failed to load'>
          ❌
        </span>
      )
    } else if (src) {
      return <img src={src} {...NativeImgProps} />
    }

    return null
  }
}

export { SuspenseImage as Image }
