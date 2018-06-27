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
}

type State = {
  isLoading: boolean,
  src: string,
  error?: string | boolean,
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
    const { src } = this.props
    this.setState({ isLoading: true })
    try {
      const uri = await this.loadImage(src)
      this.setState({ isLoading: false, src: uri })
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  loadImage = (uri) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = uri
      img.onload = () => {
        this.setState({ width: img.width, height: img.height })
        if (this.props.onLoad) {
          this.props.onLoad(img)
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
