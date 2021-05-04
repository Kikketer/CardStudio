import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import { ipcRenderer } from 'electron'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { changeDpiDataUrl } from 'changedpi'
import { Button, View } from '@adobe/react-spectrum'
import Select from '@spectrum-icons/workflow/Select'
import Save from '@spectrum-icons/workflow/SaveFloppy'
import Open from '@spectrum-icons/workflow/FolderOpen'
import Add from '@spectrum-icons/workflow/AddCircle'
import Generate from '@spectrum-icons/workflow/ExperienceExport'
import { useDeck } from './Deck.context'

type ToolbarButtonProps = {
  active: boolean
  children: ReactNode
}

const Aside = styled.aside`
  height: 100%;
  overflow-y: scroll;

  button {
    border-radius: 0;
  }
`

const ToolbarButton = ({ active, children, onPress }: ToolbarButtonProps & any) => {
  return (
    <Button variant={active ? 'cta' : 'primary'} width={50} minWidth={50} isQuiet onPress={onPress}>
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
    <View backgroundColor="default" elementType="aside">
      <ToolbarButton onPress={openFile}>
        <Open />
      </ToolbarButton>
      <ToolbarButton>
        <Save />
      </ToolbarButton>
      <ToolbarButton active={activeTool === 'select'}>
        <Select />
      </ToolbarButton>
      <ToolbarButton onPress={addRect}>
        <Add />
      </ToolbarButton>
      <ToolbarButton onPress={generateCards}>
        <Generate />
      </ToolbarButton>
      {/* <ToolbarButton onPress={getFiles}>Get Files</ToolbarButton> */}
    </View>
  )
}

export default Toolbar
