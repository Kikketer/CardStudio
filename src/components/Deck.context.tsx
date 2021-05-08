import React, { useContext, ReactNode, useState, useRef, useEffect, Dispatch, SetStateAction } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { fabric } from 'fabric-browseronly'
import json5 from 'json5'
import { reverse } from 'lodash'
import cardOverlay from '../images/usgamedeck.png'
import { DeckContextProps, Project, LoadProjectProps } from './Types'

export declare interface ActionProps {
  children: ReactNode
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  const canvas = useRef<fabric.Canvas>(
    new fabric.Canvas('the-card', {
      margin: 'auto',
      backgroundColor: 'white',
    })
  )
  // TODO this is the layer where we will hold onto the deck information
  const [layers, setLayers] = useState<Layer[]>([])
  const [zoomFactor, setZoomFactor] = useState(0.5)
  // const [projectPath, setProjectPath] = useState('')
  const [project, setProject] = useState<Project | undefined>()

  useEffect(() => {
    // Setup the canvas
    // TODO unload and rerender when card changes
  }, [])

  useEffect(() => {
    canvas.current.setWidth(750 * zoomFactor)
    canvas.current.setHeight(1125 * zoomFactor)
    canvas.current.setBackgroundImage(cardOverlay, () => canvas.current.renderAll())
    canvas.current.setZoom(zoomFactor)
  }, [zoomFactor])

  const loadProject = ({ path, content }: LoadProjectProps) => {
    setProject(undefined)

    if (!path || !content) return

    const p: Project = json5.parse(content)
    p.path = path
    // Reverse the layers so we can simply use .map to read through them
    // NOTE: the JSON5 has "layers on top are on top", rendering them means top layer is last
    // reverse(p.layers)
    setProject(p)
  }

  return (
    <DeckContext.Provider value={{ layers, canvas: canvas.current, zoomFactor, loadProject, project }}>
      {children}
    </DeckContext.Provider>
  )
}

const useDeck = (): DeckContextProps => {
  const context = useContext(DeckContext)
  if (!context) throw new Error('useDeck must be used within a DeckProvider')
  return context
}

DeckProvider.displayName = 'StoreProvider'

export { DeckProvider, useDeck }
