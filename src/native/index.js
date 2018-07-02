// flow
/**
 * @class ShimmerImage component
 * Not yet implemented.
 */

import React, { Component } from 'react'
import { Image } from 'react-native'

type Props = {
  text: string,
  src: string,
  children: React.ReactChildren,
}

export default class ShimmerImage extends Component<Props> {
  render() {
    return (
      <Image {...this.props}> {this.props.children}</Image>
    )
  }
}
