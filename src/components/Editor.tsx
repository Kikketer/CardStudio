import React from 'react'
import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import bg from '../images/grid.svg'

const Container = styled.main`
  // background-image: url(${bg});
  // background-repeat: repeat;
  // background-size: 16px 16px;
  // background-color: white;
  height: 100%;
  overflow: scroll;
  padding: 16px;
`

/**
 * The editor.  Check the Deck Context for the logic involved with this <canvas>
 *
 * @constructor
 */
const Editor = () => {
  return (
    <Container>
      <canvas id="the-card" />
    </Container>
  )
}

export default Editor
