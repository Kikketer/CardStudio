/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LayerItem } from './Types'
import { SUPPORTED_TYPES } from './constants'

type ButtonProps = {
  active: boolean
}

const StyledLayer: any = styled.button`
  width: 100%;
  border: 0;
  padding: 5px;
  background: ${({ active }: ButtonProps) => (active ? 'orange' : 'transparent')};
  text-align: left;

  p {
    margin: 0;
  }
`

const Layer = ({ layer, active, onClick }: LayerItem): JSX.Element | null => {
  const whenClicked = () => {
    // TS-BS: told me to do default props, but can't use it here
    if (onClick) {
      onClick(layer)
    }
  }

  if (!SUPPORTED_TYPES[layer.type]) {
    return null
  }

  return (
    <StyledLayer type="button" onClick={whenClicked} active={active}>
      <p>{layer.name || layer.type}</p>
    </StyledLayer>
  )
}

Layer.displayName = 'Layer'

Layer.defaultProps = {
  active: false,
  onClick: () => {},
}

export default Layer
