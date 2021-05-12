/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type ImageProps = {
  url: string
  draggable: boolean
}

const Img = ({ url, draggable = true }: ImageProps): JSX.Element => {
  const [image] = useImage(url)

  return <Image image={image} draggable={draggable} />
}

Img.displayName = 'Image'

export default Img
