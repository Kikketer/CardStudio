/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type ImageProps = {
  url: string
}

const Img = ({ url }: ImageProps): JSX.Element => {
  const [image] = useImage(url)

  return <Image image={image} />
}

Img.displayName = 'Image'

export default Img
