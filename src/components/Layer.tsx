/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React from 'react'
import styled from 'styled-components'
import { AccordionItem } from 'carbon-components-react'
import { LayerItem } from './Types'
import { SUPPORTED_TYPES } from './constants'

type ButtonProps = {
  active: boolean
}

const StyledLayer: any = styled(AccordionItem)`
  background: ${({ active }: ButtonProps) => (active ? 'lightgrey' : 'transparent')};
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
    <StyledLayer type="button" onClick={whenClicked} active={active} title={layer.name || layer.type}>
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
