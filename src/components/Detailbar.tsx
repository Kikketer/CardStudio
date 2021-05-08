import React from 'react'
import { Select, SelectItem, ButtonSet, Button } from 'carbon-components-react'
import LayerSummary from './LayerSummary'
import { useEditor } from './Editor.context'

const Detailbar = () => {
  const { isEditingMaster, setIsEditingMaster } = useEditor()

  const label = isEditingMaster ? 'Save' : 'Edit'

  return (
    <aside>
      <ButtonSet>
        <Button kind={isEditingMaster ? 'secondary' : 'primary'} onClick={() => setIsEditingMaster(!isEditingMaster)}>
          {label} Master
        </Button>
      </ButtonSet>
      <Select id="card" labelText="Card">
        <SelectItem value="card1" text="Tornado" />
        <SelectItem value="card2" text="Cheese" />
      </Select>
      <LayerSummary />
    </aside>
  )
}

export default Detailbar
