/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import { Layer as LayerProps } from './Types'

const Layer = ({ name, type }: LayerProps): JSX.Element => {
  return (
    <div>
      <p>{name || type}</p>
    </div>
  )
}

Layer.displayName = 'Layer'

Layer.defaultProps = {}

export default Layer
