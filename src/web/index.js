// flow
/**
 * @class ShimmerImage
 */

import React, { Component } from 'react'
import styles from './styles.css'

type Props = {
  src: string,
  onError?: (err: string) => void,
  onLoad?: (image: Image) => void,
  loadingIndicatorSource?: string,
  delay?: number,
}

type State = {
  isLoading: boolean,
  src: string,
  error?: string,
  width: number,
  height: number
}

export default class ShimmerImage extends Component<Props, State> {
  state: State = {
    isLoading: false,
    src: '',
    error: ''
  };

  async componentWillMount() {
    const { src, delay } = this.props

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
      const uri = await this.loadImage(src)
      this.setState({ isLoading: false, src: uri })
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  loadImage = (uri) => {
    const { onLoad } = this.props
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = uri
      img.onload = () => {
        this.setState({ width: img.width, height: img.height })
        if (onLoad) {
          onLoad(img)
        }
        resolve(uri)
      }
      img.onerror = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }
    })
  }

  render() {
    const { src, error, isLoading, width, height } = this.state
    const { onError, loadingIndicatorSource, ...passed } = this.props
    let passedProps = { ...passed, ...{ src, width, height } }

    if (error) {
      return onError ? onError(error) : null
    } else if (isLoading) {
      if (loadingIndicatorSource) {
        return <img src={loadingIndicatorSource} />
      } else {
        return (<div className={styles.shimmer}>
          <div className={styles.shimmerbg} /></div>)
      }
    } else {
      return <img {...passedProps} />
    }
  }
}
