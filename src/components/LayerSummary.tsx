import React from 'react'
import styled from 'styled-components'
import { map } from 'lodash'
import { Accordion } from 'carbon-components-react'
import { useForm } from 'react-hook-form'
import { Layer as LayerType } from '../utilities/types'
import { useDeck } from './Deck.context'
import Layer from './Layer'

const List = styled.div`
  list-style: none;
`

const LayerSummary = () => {
  const { project, currentLayerId, setCurrentLayerId } = useDeck()
  const { handleSubmit, register } = useForm()

  const makeLayerActive = (layer: LayerType) => {
    setCurrentLayerId(layer.id)
  }

  const onLayerSubmit = (data: any) => {
    console.log('saving ', data)
  }

  return (
    <form onSubmit={handleSubmit(onLayerSubmit)}>
      <List>
        {map(project?.layers, (layer: LayerType) => (
          <Accordion key={layer.id}>
            <Layer layer={layer} onClick={makeLayerActive} active={currentLayerId === layer.id} register={register} />
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
