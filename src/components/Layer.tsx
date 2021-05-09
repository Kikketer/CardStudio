/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AccordionItem, TextInput } from 'carbon-components-react'
import { omit } from 'lodash'
import { LayerItem } from './Types'
import { SUPPORTED_TYPES } from './constants'

type ButtonProps = {
  active: boolean
}

const StyledLayer: any = styled(AccordionItem)`
  background: ${({ active }: ButtonProps) => (active ? 'lightgrey' : 'transparent')};
`

const EntryLine: any = styled.tr``

const EntryLabel: any = styled.label`
  display: block;
  text-align: right;
  margin-right: 5px;
`

const getLayerForm = (layer: Layer) => {
  const entryItems = omit(layer, ['id', 'type'])
  const result: Array<ReactNode> = []
  if (Object.keys(entryItems)?.length) {
    Object.keys(entryItems).reduce((acc, key) => {
      acc.push(
        <EntryLine key={key}>
          <td>
            <EntryLabel htmlFor={key}>{key}:</EntryLabel>
          </td>
          <td>
            <TextInput id={key} value={entryItems[key]} />
          </td>
        </EntryLine>
      )
      return acc
    }, result)
  }

  return (
    <table>
      <tbody>{result}</tbody>
    </table>
  )
}

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

  /**
   * For layers, the `id` and `type` are the only two guaranteed
   * we build the form based on the rest
   */

  return (
    <StyledLayer type="button" onClick={whenClicked} active={active} title={layer.name || layer.type}>
      {getLayerForm(layer)}
    </StyledLayer>
  )
}

Layer.displayName = 'Layer'

Layer.defaultProps = {
  active: false,
  onClick: () => {},
}

export default Layer
