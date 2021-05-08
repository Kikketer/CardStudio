import React from 'react'
import styled from 'styled-components'
import { map } from 'lodash'
import { useDeck } from './Deck.context'

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
  const { project } = useDeck()

  const onEditLayer = () => {
    // TODO Show modal
  }

  return (
    <>
      <List>
        {map(project?.layers, (layer: Layer) => (
          <Item key={layer.id}>
            <button type="button" onClick={onEditLayer}>
              {layer.type}
            </button>
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
