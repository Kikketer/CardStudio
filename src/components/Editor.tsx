import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import json5 from 'json5'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import bg from '../images/repeated-square.png'
import cardOverlay from '../images/usgamedeck.png'

const config =
  '{"name":"Demo Deck","layers":[{"type":"Rect","left":100,"top":100,"fill":"red","width":20,"height":20},{"type":"Image","left":100,"top":100}]}'

const Container = styled.main`
  background-image: url(${bg});
  background-repeat: repeat;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 50px;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
`

const Edtr = styled.div`
  overflow: scroll;
  display: grid;
  align-items: center;
  justify-content: center;
`

const Editor = () => {
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
        // TODO Get the msw to catch any image asks and turn them into messages
        fabric.Image.fromURL('./test.png', () => {
          canvas.current.renderAll()
        })
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

    renderCard()
  }, [])

  return (
    <Container>
      <Edtr>
        <canvas id="the-card" />
      </Edtr>
    </Container>
  )
}

export default Editor
