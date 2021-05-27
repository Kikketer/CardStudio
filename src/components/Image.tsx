/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import { Image } from 'react-konva'
import useImage from 'use-image'
import { Item } from '../utilities/Types'

type ImageProps = {
  path: string
  draggable?: boolean
  onClick?: (e: any) => void
  onTap?: (e: any) => void
}

const Img = React.forwardRef(
  ({ path, draggable = true, ...rest }: ImageProps & Item, ref: any): JSX.Element => {
    const [image] = useImage(path)

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Image ref={ref} image={image} draggable={draggable} {...rest} />
  }
)

Img.displayName = 'Image'

export default Img
