import React from 'react'
import styled from 'styled-components'
import { useDeck } from './Deck.context'

const List = styled.ul`
  list-style: none;
`

const Item = styled.li`
  border-bottom: 1px solid var(--border);
`

const LayerSummary = () => {
  const { layers } = useDeck()

  const onEditLayer = () => {
    // TODO Show modal
  }

  return (
    <List>
      {layers?.map((layer) => (
        <Item key={layer.id}>
          <button type="button" onClick={onEditLayer}>
            {layer.type}
          </button>
        </Item>
      ))}
    </List>
  )
}

LayerSummary.defaultProps = {
  layers: [],
}

export default LayerSummary