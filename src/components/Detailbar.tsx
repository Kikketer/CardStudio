import React from 'react'
import { Select, SelectItem, ButtonSet, Button } from 'carbon-components-react'
import styled from 'styled-components'
import LayerSummary from './LayerSummary'
import { useEditor } from './Editor.context'
import { useDeck } from './Deck.context'

const Aside = styled.aside`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-row-gap: 15px;
`

const Detailbar = () => {
  const { project } = useDeck()
  const { isEditingMaster, setIsEditingMaster } = useEditor()

  const label = isEditingMaster ? 'Save' : 'Edit'

  return (
    <Aside>
      {project?.layers?.length && (
        <>
          <ButtonSet>
            <Button
              kind={isEditingMaster ? 'secondary' : 'primary'}
              onClick={() => setIsEditingMaster(!isEditingMaster)}
            >
              {label} Master
            </Button>
          </ButtonSet>
          <Select id="card" labelText="Preview">
            <SelectItem value="card1" text="Tornado" />
            <SelectItem value="card2" text="Cheese" />
          </Select>
          <div>
            <h2 className="bx--label">Layers</h2>
            <LayerSummary />
          </div>
        </>
      )}
    </Aside>
  )
}

export default Detailbar
