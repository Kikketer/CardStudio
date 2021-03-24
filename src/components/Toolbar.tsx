import React from 'react'
import styled from 'styled-components'

const Aside = styled.aside`
  height: 100%;
  display: grid;
  overflow-y: scroll;
`

const Toolbar = () => {
  return (
    <Aside>
      <p>Toolbar</p>
    </Aside>
  )
}

export default Toolbar
