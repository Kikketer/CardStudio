import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import { ipcRenderer } from 'electron'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { changeDpiDataUrl } from 'changedpi'
import json5 from 'json5'
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
        fabric.Image.fromURL('./test.png', (img) => {
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

  const addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    })
    canvas.current.add(rect)
  }

  const generateCards = () => {
    const data = canvas.current.toDataURL({
      multiplier: 1 / zoomFactor,
    })
    const highRes = changeDpiDataUrl(data, 300)
    ipcRenderer.send('generate-card', highRes)
  }

  const getFiles = async () => {
    console.log('Do it...')
    try {
      const result = await ipcRenderer.invoke('app:get-files')
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  const openFile = async () => {
    try {
      const result = await ipcRenderer.invoke('app:on-fs-dialog-open')
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Edtr>
        <canvas id="the-card" />
      </Edtr>
      <div>
        <button style={{ margin: 0 }} type="button" onClick={addRect}>
          Add
        </button>
        <button style={{ margin: 0 }} type="button" onClick={generateCards}>
          Gen
        </button>
        <button style={{ margin: 0 }} type="button" onClick={getFiles}>
          Get Files
        </button>
        <button style={{ margin: 0 }} type="button" onClick={openFile}>
          Open Project
        </button>
      </div>
    </Container>
  )
}

export default Editor
