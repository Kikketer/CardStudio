import React, { useState } from 'react'
import styled from 'styled-components'
import { map } from 'lodash'
import { Accordion, AccordionItem } from 'carbon-components-react'
import { useForm } from 'react-hook-form'
import { Layer as LayerType } from './Types'
import { useDeck } from './Deck.context'
import Layer from './Layer'
import { useEditor } from './Editor.context'

const List = styled.div`
  list-style: none;
`

const Item = styled.div`
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
  const { project, selectLayerById } = useDeck()
  const { handleSubmit, register } = useForm()

  const makeLayerActive = (layer: LayerType) => {
    setActiveLayer(layer)
    selectLayerById(layer.id)
  }

  const onSave = (data: any) => {
    console.log('saving ', data)
  }

  return (
    <form onSubmit={handleSubmit(onSave)}>
      <List>
        {map(project?.layers, (layer: LayerType) => (
          <Accordion key={layer.id}>
            <Layer layer={layer} onClick={makeLayerActive} active={activeLayer?.id === layer.id} register={register} />
          </Accordion>
        ))}
      </List>
      <button type="submit" style={{ display: 'none' }}>
        Save
      </button>
    </form>
  )
}

LayerSummary.defaultProps = {
  layers: [],
}

export default LayerSummary
