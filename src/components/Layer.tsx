/**
 * @author Chris Weed (chris@cjweed.com) 2021
 */

import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { AccordionItem, TextInput } from 'carbon-components-react'
import { omit } from 'lodash'
import { danger01 } from '@carbon/themes'
import { LayerItem } from '../utilities/types'
import { SUPPORTED_TYPES } from '../utilities/constants'

const EntryLine: any = styled.tr``

const EntryLabel: any = styled.label`
  display: block;
  text-align: right;
  margin-right: 5px;
`

const Error = styled.p`
  color: ${danger01};
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

const Layer = ({ layer, onClick, register }: LayerItem): JSX.Element | null => {
  const whenClicked = () => {
    // TS-BS: told me to do default props, but can't use it here
    if (onClick && SUPPORTED_TYPES[layer.type]) {
      onClick(layer)
    }
  }

  /**
   * For layers, the `id` and `type` are the only two guaranteed
   * we build the form based on the rest
   */
  return (
    <AccordionItem
      onClick={whenClicked}
      title={`${layer.name || layer.type}${!SUPPORTED_TYPES[layer.type] ? ` ⚠️` : ''}`}
    >
      {getLayerForm(layer, register)}
      {!SUPPORTED_TYPES[layer.type] && (
        <Error>
          <span role="img" aria-label="warning">
            ⚠️
          </span>{' '}
          Invalid Type
        </Error>
      )}
    </AccordionItem>
  )
}

Layer.displayName = 'Layer'

Layer.defaultProps = {
  active: false,
  onClick: () => {},
}

export default Layer