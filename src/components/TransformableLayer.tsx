/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode, useRef } from 'react'
import { Layer, Transformer } from 'react-konva'

type TransformableLayerProps = {
  children?: ReactNode
}

const TransformableLayer = ({ children }: TransformableLayerProps): JSX.Element => {
  const transformerRef = useRef<any>()

  // TODO Figure out how to know these types
  const selectLayer = (e: { target: { draw: () => void } }) => {
    transformerRef.current.nodes([e.target])
    e.target.draw()
  }

  return (
    <Layer onClick={selectLayer}>
      {children}
      <Transformer ref={transformerRef} />
    </Layer>
  )
}

TransformableLayer.displayName = 'TransformableLayer'

export default TransformableLayer
