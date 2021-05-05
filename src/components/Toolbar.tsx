import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { changeDpiDataUrl } from 'changedpi'
import { Button } from 'carbon-components-react'
import { useDeck } from './Deck.context'

type ToolbarButtonProps = {
  active?: boolean
  children: ReactNode
}

const Aside = styled.aside`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  button {
    border-radius: 0;
  }
`

const ToolbarButton = ({ active, children, onClick }: ToolbarButtonProps & any) => {
  return (
    <Button type="button" kind={active ? 'secondary' : 'ghost'} onClick={onClick}>
      {children}
    </Button>
  )
}

const Toolbar = () => {
  const { zoomFactor, canvas, setProjectPath } = useDeck()
  const [activeTool, setActiveTool] = useState<string>('')

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
      const projectPath = result.path.substr(0, result.path.indexOf(result.name))
      console.log('Path: ', projectPath)
      setProjectPath(projectPath)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Aside>
      <ToolbarButton onClick={openFile}>A</ToolbarButton>
      <ToolbarButton active={activeTool === 'test'} onClick={() => setActiveTool('test')}>
        B
      </ToolbarButton>
      <ToolbarButton active={activeTool === 'select'}>C</ToolbarButton>
      <ToolbarButton onClick={addRect}>D</ToolbarButton>
      <ToolbarButton onClick={generateCards}>E</ToolbarButton>
      {/* <ToolbarButton onPress={getFiles}>Get Files</ToolbarButton> */}
    </Aside>
  )
}

export default Toolbar
