// flow
/**
 * @class ShimmerImage
 */

import React, { Component } from 'react'
// import styles from './styles.css'

type Props = {
  src: string,
}

const placeholder = './placeholder.png'

export default class ShimmerImage extends Component<Props> {
  async componentWillMount() {
    const { src } = this.props
    this.setState({ isLoading: true, src: placeholder })
    try {
      const uri = await this.loadImage(src)
      this.setState({ isLoading: false, src: uri })
    } catch (error) {
      this.setState({ error })
    }
  }

  loadImage = (uri) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = uri
      img.onload = () => {
        resolve(uri)
      }
      img.onerror = () => {
        reject(new Error('An Error occurred while trying to download an image'))
      }
    })
  }

  render() {
    const { src, error } = this.state
    const { ...passed } = this.props
    let passedProps = {...passed, ...{src}}

    return (!error ? <img {...passedProps} /> : null)
  }
}
