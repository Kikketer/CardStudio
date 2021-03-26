import React from 'react'
import LayerSummary from './LayerSummary'

const Detailbar = () => {
  return (
    <aside>
      <select>
        <option>Card A</option>
        <option>Card B</option>
      </select>
      <LayerSummary />
    </aside>
  )
}

export default Detailbar
