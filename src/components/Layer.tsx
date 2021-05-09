/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AccordionItem, TextInput } from 'carbon-components-react'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { LayerItem } from './Types'
import { SUPPORTED_TYPES } from './constants'

type ButtonProps = {
  isActive: boolean
}

const StyledLayer: any = styled(AccordionItem)`
  background: ${({ isActive }: ButtonProps) => (isActive ? 'lightgrey' : 'transparent')};
`

const EntryLine: any = styled.tr``

const EntryLabel: any = styled.label`
  display: block;
  text-align: right;
  margin-right: 5px;
`

const getLayerForm = (layer: Layer, register: (T: string) => void) => {
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput defaultValue={entryItems[key]} labelText="" id={key} {...register(`${layer.id}-${key}`)} />
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

const Layer = ({ layer, active, onClick, register }: LayerItem): JSX.Element | null => {
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
    <StyledLayer onClick={whenClicked} isActive={active} title={layer.name || layer.type}>
      {getLayerForm(layer, register)}
    </StyledLayer>
  )
}

Layer.displayName = 'Layer'

Layer.defaultProps = {
  active: false,
  onClick: () => {},
}

export default Layer
