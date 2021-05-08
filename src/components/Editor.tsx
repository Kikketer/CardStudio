import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import bg from '../images/grid.svg'
import cardOverlay from '../images/usgamedeck.png'
import { useDeck } from './Deck.context'
import { drawCard } from './CardGenUtils'

const Container = styled.main`
  background-image: url(${bg});
  background-repeat: repeat;
  background-size: 16px 16px;
  background-color: white;
  height: 100%;
  overflow: scroll;
  padding: 16px;
`

// TODO Find out why the canvas is 150px high by default
const StyledEditor = styled.div``

const Editor = () => {
  const { project } = useDeck()
  const editor = useRef(null)
  const canvas = useRef<fabric.Canvas>(null)
  const zoomFactor = 0.5

  useEffect(() => {
    canvas.current = new fabric.Canvas('the-card', {
      margin: 'auto',
      backgroundColor: 'white',
      height: 1124 * zoomFactor,
      width: 750 * zoomFactor,
    })
    canvas.current.setBackgroundImage(cardOverlay, () => canvas.current.renderAll())
    canvas.current.setZoom(zoomFactor)
  }, [])

  useEffect(() => {
    console.log('Project path has changed ', project)
    // canvas.current = new fabric.Canvas('the-card', {
    //   margin: 'auto',
    //   backgroundColor: 'white',
    //   height: 1124 * zoomFactor,
    //   width: 750 * zoomFactor,
    // })
    // canvas.current.setBackgroundImage(cardOverlay, () => canvas.current.renderAll())
    // canvas.current.setZoom(zoomFactor)

    if (project) {
      drawCard(project, canvas.current)
    }
  }, [project, drawCard])

  return (
    <Container>
      <StyledEditor ref={editor}>
        {/* <img src="file:///Users/chris/Documents/CardStudio/demo-project/art/Tornado.png" alt="shiz" /> */}
        <canvas id="the-card" />
      </StyledEditor>
    </Container>
  )
}

export default Editor
