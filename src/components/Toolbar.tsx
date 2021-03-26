import React from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { changeDpiDataUrl } from 'changedpi'
import { useDeck } from './Deck.context'

const Aside = styled.aside`
  height: 100%;
  display: grid;
  grid-template-rows: 50px;
  overflow-y: scroll;
  background: #656669;

  button {
    border-radius: 0;
  }
`

const Toolbar = () => {
  const { zoomFactor, canvas } = useDeck()

  // TODO Move these into a more utility function
  const addRect = () => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    })
    canvas.add(rect)
  }

  const generateCards = () => {
    const data = canvas.toDataURL({
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
    <Aside>
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="devfont devfont-cursor"
        >
          <path d="M10 20L4 4l16 6-7 3-3 7z" />
          <path d="M13 13l7 7" />
        </svg>
      </button>
      <button type="button" onClick={addRect}>
        Add
      </button>
      <button type="button" onClick={generateCards}>
        Gen
      </button>
      <button type="button" onClick={getFiles}>
        Get Files
      </button>
      <button type="button" onClick={openFile}>
        Open Project
      </button>
    </Aside>
  )
}

export default Toolbar
