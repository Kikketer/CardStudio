import React, { useContext, ReactNode, useState, useEffect } from 'react'
import json5 from 'json5'
import { DeckContextProps, Project, LoadProjectProps } from '../utilities/Types'

export declare interface ActionProps {
  children: ReactNode
}

const mockProject = {
  name: 'Demo Deck',
  width: 720,
  height: 1125,
  items: [
    { id: 'layer1', type: 'Rect', left: 100, top: 100, fill: 'red', width: 50, height: 50 },
    { id: 'layer4', type: 'Rect', left: 10, top: 10, fill: 'blue', width: 50, height: 50 },
    { id: 'layer3', type: 'Image', left: 100, top: 100, path: 'art/Tornado.png' },
  ],
  cards: [{ id: 'card-id-1', name: 'Tornado', variables: { title: 'Tornado', image: 'art/Tornado.png' } }],
  path: '/Users/chris/Documents/CardStudio/demo-project/',
}

const DeckContext = React.createContext({} as DeckContextProps)

const DeckProvider = ({ children }: ActionProps) => {
  // const canvas = useRef<fabric.Canvas | undefined>()
  const [zoomFactor, setZoomFactor] = useState(0.5)
  const [project, setProject] = useState<Project | undefined>(mockProject)
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>(undefined)

  useEffect(() => {
    // TODO
  }, [zoomFactor])

  useEffect(() => {
    console.log(JSON.stringify(project))
  }, [project])

  const loadProject = ({ path, content }: LoadProjectProps) => {
    setProject(undefined)

    if (!path || !content) return

    const p: Project = json5.parse(content)
    p.path = path
    setProject(p)
  }

  return (
    <DeckContext.Provider
      value={{ project, zoomFactor, setZoomFactor, loadProject, selectedItemId, setSelectedItemId }}
    >
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
