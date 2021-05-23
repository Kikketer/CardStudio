/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode, useRef, useEffect } from 'react'
import { Layer, Transformer } from 'react-konva'

type TransformableLayerProps = {
  children?: ReactNode
  onSelect?: (id: string) => void
  isSelected?: boolean
  id: string
}

const TransformableLayer = ({
  children,
  id,
  onSelect = () => {},
  isSelected = false,
}: TransformableLayerProps): JSX.Element => {
  const transformerRef = useRef<any>()
  const layer = useRef<any>()

  useEffect(() => {
    console.log('Is selected? ', isSelected)
    if (isSelected) {
      transformerRef.current.nodes([layer.current])
      console.log('drawing...')
      layer.current.draw()
    }
  }, [isSelected])

  const onSelectLayer = (e: any) => {
    // eslint-disable-next-line no-underscore-dangle
    console.log('Selected a layer! ', e.target._id)
    // eslint-disable-next-line no-underscore-dangle
    onSelect(e.target._id)
  }

  return (
    <Layer ref={layer} id={id} onClick={onSelectLayer}>
      {children}
      <Transformer ref={transformerRef} />
    </Layer>
  )
}

TransformableLayer.displayName = 'TransformableLayer'

export default TransformableLayer
