/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'

type ImageProps = {
  url: string
  draggable: boolean
  onClick?: (e: any) => void
  onTap?: (e: any) => void
}

const Img = ({ url, draggable = true, onClick = () => {}, onTap = () => {} }: ImageProps): JSX.Element => {
  const [image] = useImage(url)

  return <Image image={image} draggable={draggable} onClick={onClick} onTap={onTap} />
}

Img.displayName = 'Image'

export default Img
