import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import json5 from 'json5'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import bg from '../images/grid.svg'
import cardOverlay from '../images/usgamedeck.png'
import { useDeck } from './Deck.context'

const config =
  '{"name":"Demo Deck","layers":[{"type":"Rect","left":100,"top":100,"fill":"red","width":20,"height":20},{"type":"Image","left":100,"top":100,"path":"art/Tornado.png"}]}'

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
  const { projectPath } = useDeck()
  const editor = useRef(null)
  const canvas = useRef<fabric.Canvas>(null)
  const zoomFactor = 0.5

  const renderCard = () => {
    const conf = json5.parse(config)
    console.log('Config ', conf)
    conf.layers.forEach((layer: any) => {
      const { type, ...options } = layer
      // Images are different...
      console.log('rendering layer ', type)
      if (type.match(/^image$/i)) {
        console.log('Rendering image ', options)
        // TODO Get the msw to catch any image asks and turn them into messages
        fabric.Image.fromURL(
          `file://${projectPath}/${options.path}`,
          (oImg: any) => {
            canvas.current.add(oImg)
            canvas.current.renderAll()
          },
          options
        )
      } else {
        const thing = new fabric[type](options)
        canvas.current.add(thing)
      }
    })
  }

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
    console.log('Project path has changed ', projectPath)
    if (projectPath) {
      // canvas.current = new fabric.Canvas('the-card', {
      //   margin: 'auto',
      //   backgroundColor: 'white',
      //   height: 1124 * zoomFactor,
      //   width: 750 * zoomFactor,
      // })
      // canvas.current.setBackgroundImage(cardOverlay, () => canvas.current.renderAll())
      // canvas.current.setZoom(zoomFactor)

      renderCard()
    }
  }, [projectPath, renderCard])

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
