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
import { Cursor_132 } from '@carbon/icons-react'
import { useDeck } from './Deck.context'
import { openFile } from './NativeUtils'

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

const ToolbarButton = ({ active, renderIcon, onClick, iconDescription }: ToolbarButtonProps & any) => {
  return (
    <Button
      type="button"
      kind={active ? 'secondary' : 'ghost'}
      onClick={onClick}
      renderIcon={renderIcon}
      hasIconOnly
      iconDescription={iconDescription}
    />
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

  return (
    <Aside>
      <ToolbarButton
        active={activeTool === 'cursor'}
        onClick={() => setActiveTool('cursor')}
        renderIcon={Cursor_132}
        iconDescription="Select"
      />
      <ToolbarButton
        active={activeTool === 'test'}
        renderIcon={Cursor_132}
        onClick={() => setActiveTool('test')}
        iconDescription="Select"
      />
      <ToolbarButton active={activeTool === 'select'} renderIcon={Cursor_132} />
      <ToolbarButton onClick={addRect} renderIcon={Cursor_132} />
      <ToolbarButton onClick={generateCards} renderIcon={Cursor_132} />
      {/* <ToolbarButton onPress={getFiles}>Get Files</ToolbarButton> */}
    </Aside>
  )
}

export default Toolbar
