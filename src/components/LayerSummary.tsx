import React, { useState } from 'react'
import styled from 'styled-components'
import { map } from 'lodash'
import { Layer as LayerType } from './Types'
import { useDeck } from './Deck.context'
import Layer from './Layer'
import { useEditor } from './Editor.context'

const List = styled.ul`
  list-style: none;
`

const Item = styled.li`
  border-bottom: 1px solid var(--border);
`

const Line = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid grey;
`

const LayerSummary = () => {
  const { activeLayer, setActiveLayer } = useEditor()
  const { project } = useDeck()

  const makeLayerActive = (layer: LayerType) => {
    setActiveLayer(layer)
  }

  return (
    <>
      <List>
        {map(project?.layers, (layer: LayerType) => (
          <Item key={layer.id}>
            <Layer layer={layer} onClick={makeLayerActive} active={activeLayer?.id === layer.id} />
          </Item>
        ))}
      </List>
    </>
  )
}

LayerSummary.defaultProps = {
  layers: [],
}

export default LayerSummary
